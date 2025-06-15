from django.db import models

class Users(models.Model):
    fullname = models.CharField(max_length=255, null=False, blank=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Stored securely
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    country = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.fullname

class Profile_Details(models.Model):
    fullname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    country = models.CharField(max_length=50)

    # Optional health-related fields
    dosha_type = models.CharField(max_length=50, blank=True, null=True)
    weight = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    blood_pressure = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.fullname
