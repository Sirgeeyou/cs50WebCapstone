# Generated by Django 4.2.1 on 2023-08-01 13:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_project', '0005_alter_favoritehotel_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favoritehotel',
            name='user',
            field=models.ForeignKey(default=11, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
