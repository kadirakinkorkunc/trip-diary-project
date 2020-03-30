from django.db import models
from datetime import date
from django.contrib.auth.admin import User
# Create your models here.

class Tag(models.Model):
  name = models.CharField(max_length=200, null=True)

  def __str__(self):
    return self.name

class Post(models.Model):
  # Post specs
  title = models.CharField(max_length=100, null=False)
  place = models.CharField(max_length=100, null=False)
  notes = models.CharField(max_length=10000, null=False)
  tags = models.ManyToManyField(Tag)
  start_date = models.DateField(null=True)
  end_date = models.DateField(null=True)
  created_at = models.DateField(auto_now=True)
  owner = models.ForeignKey(User , null = True, on_delete=models.SET_NULL) # has relation with Member class /one to many/

  class Meta:
    ordering = ['created_at']
  
  def __str__(self):
    return self.title

