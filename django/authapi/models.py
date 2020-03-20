from django.db import models

# Create your models here.

class Member(models.Model):
  # Member specs
  username = models.CharField(max_length=50)
  password = models.CharField(max_length=50)
  email = models.CharField(max_length=200)

  def __str__(self):
    return self.email

  class Meta:
    ordering = ['id']