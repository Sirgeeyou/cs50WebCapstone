from django.http import JsonResponse, HttpResponse
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
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes

class MyTokenObtainPairView(TokenObtainPairView):
    # Add any additional customization here if needed
    pass

def remove_hotel(request):
    pass

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_hotel(request):
    if request.method == 'POST':
        # Get the currently authenticated user
        user = request.user

        # Load and parse the JSON data from the request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        # Assign the authenticated user to the hotel data
        data['user'] = user.id

        # Serialize the data and save it to the database
        serializer = HotelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)


def favorite_hotels(request):
    if request.method == "POST":
        return

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
                return JsonResponse({"success": True, "username": user.username, "jwtToken": jwt_token})
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
        password = request.POST.get("password")
        confirmPassword = request.POST.get("confirmPassword")
        if password != confirmPassword:
            return HttpResponse({"message": "Passwords must match."})

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email)
            user.save()
        except IntegrityError:
            return HttpResponse({"message": "Username already taken."})
        login(request, user)
        return HttpResponse({"message": "Registration successful."})
    else:
        return HttpResponse({"message": "Invalid request method."})
    

