from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import LoginSerializer, HotelSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
import json


from rest_framework.renderers import JSONRenderer


def remove_hotel(request):
    pass

@csrf_exempt
def add_hotel(request):
    if request.method == 'POST':
        # Get the currently authenticated user
        user = request.user
        print("user: ", user)
        # Check if the user is authenticated (optional)
        if not user.is_authenticated:
            return JsonResponse({'error': 'User is not authenticated.'}, status=401)

        # Load and parse the JSON data from the request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        # Combine the user ID with the other data you want to save
        data['user_id'] = user.id

        # Serialize the data and save it to the database
        serializer = HotelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


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
            login(request, user)
            return JsonResponse({"success": True, "username": user.username})
        else:
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
    

