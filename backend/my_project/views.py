from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import LoginSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
import json


from rest_framework.renderers import JSONRenderer

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
            user = serializer.create(serializer.validated_data)  # Retrieve the authenticated user
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