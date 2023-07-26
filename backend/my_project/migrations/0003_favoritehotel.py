# Generated by Django 4.2.1 on 2023-07-26 14:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_project', '0002_delete_customer'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavoriteHotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hotel_id', models.CharField(max_length=255)),
                ('hotel_name', models.CharField(max_length=255)),
                ('img_url', models.URLField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]