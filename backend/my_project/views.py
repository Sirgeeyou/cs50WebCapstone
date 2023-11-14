from django.http import JsonResponse
from django.contrib.auth import login, logout
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import User
from .serializers import LoginSerializer, HotelSerializer
from rest_framework.decorators import api_view
import json
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
from .models import FavoriteHotel

class MyTokenObtainPairView(TokenObtainPairView):
    # Add any additional customization here if needed
    pass

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
def remove_hotel(request, hotel_id):
    print("remove_hotel")
    if request.method == 'DELETE':
        # Get the currently authenticated user
        user = request.user
        print("hotel_id:", hotel_id)
        print("user:", user)
        # Check if the hotel exists in the user's favorites
        try:
            hotel = FavoriteHotel.objects.get(hotelId=hotel_id, user=user)
            print("hotel: ", hotel)
        except FavoriteHotel.DoesNotExist:
            return JsonResponse({'error': 'Hotel not found in favorites.'}, status=404)

        # Delete the hotel from the user's favorites
        hotel.delete()

        return JsonResponse({'message': 'Hotel removed from favorites.'}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)



@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def add_hotel(request):
    if request.method == 'POST':
        # Get the currently authenticated user
        user = request.user

        if user.is_authenticated:
            print("User is authenticated:", user)
        else:
            print("User is not authenticated.")

        # Load and parse the JSON data from the request body
        try:
            data = json.loads(request.body)
            print("data:", data)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        # Assign the authenticated user to the hotel data
        data['user'] = user.id
        print("DATAAAA: ", data)

        # Serialize the data and save it to the database
        serializer = HotelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)







@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def favorite_hotels(request):
    if request.method == "GET":
        # Get the currently authenticated user
        user = request.user

        # Retrieve favorite hotels for the current user from the database
        hotels = FavoriteHotel.objects.filter(user=user)

        # Serialize the data using the HotelSerializer
        serializer = HotelSerializer(hotels, many=True)

        # Return the serialized data as a JSON response
        return JsonResponse(serializer.data, safe=False)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print("REQUEST: ", data)
        username = data.get("username")
        password = data.get("password")
        print("request username: ", username)
        print("request password: ", password)
        
        # Instantiate the serializer and pass the data
        serializer = LoginSerializer(data=data)

        if serializer.is_valid():
            user = serializer.validated_data # Retrieve the authenticated user
            request.session.create()
            if user is not None:
                 # Generate JWT token
                refresh = RefreshToken.for_user(user)
                jwt_token = str(refresh.access_token)
                print("JWT Token: ", jwt_token)

                login(request, user)
                print("login successful")
                return JsonResponse({"success": True, "username": user.username, "jwtToken": jwt_token, "user_id": user.id})
        else:
            print("Serializer errors: ", serializer.errors)
            return JsonResponse({"success": False, "errors": serializer.errors}, status=400)

    return JsonResponse({"message": "Invalid request method."})



@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logout successful."})


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        confirmPassword = data.get("confirmPassword")

        # Ensure password matches confirmation
        if password != confirmPassword:
            return JsonResponse({"message": "Passwords must match."})

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            print("user: ", user)
            print("username: ", username)
            print("user.id: ", user.id)
            user.save()

            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            jwt_token = str(refresh.access_token)

            # Log in the user
            login(request, user)
            print("login succesful")
            return JsonResponse({"message": "Registration successful.", "username": username, "jwtToken": jwt_token, "user_id": user.id})
        except IntegrityError:
            return JsonResponse({"message": "Username already taken."})
    else:
        return JsonResponse({"message": "Invalid request method."})


    

