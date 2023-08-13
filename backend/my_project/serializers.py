from rest_framework import serializers
from .models import User, FavoriteHotel
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        print("Serializer username and password: ", username, password)
        user = authenticate(username=username, password=password)
        print("Authenticated user: ", user)
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        return user  # Return the authenticated user

    def create(self, validated_data):
        pass 
    
class HotelSerializer(serializers.ModelSerializer):    
    class Meta:
        model= FavoriteHotel
        fields = ['user', 'hotelId', 'hotelName', 'imgUrl']

