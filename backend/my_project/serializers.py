from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError('Invalid username and/or password.')

        return user
