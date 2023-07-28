from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Add custom fields or methods here
    pass

class FavoriteHotel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotelId = models.CharField(max_length=255)
    hotelName = models.CharField(max_length=255)
    imgUrl = models.URLField()

    def __str__(self):
        return f"{self.user.username} - {self.hotelName}"