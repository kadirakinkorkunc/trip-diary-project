from django.db import models
from datetime import date
from django.contrib.auth.admin import User
# Create your models here.


class Post(models.Model):
  # Post specs
  title = models.CharField(max_length=100, null=False)
  place = models.CharField(max_length=100)
  notes = models.CharField(max_length=10000)
  start_date = models.DateField(null=True)
  end_date = models.DateField(null=True)
  created_at = models.DateField(default=date.today)
  owner = models.ForeignKey(User, null = True, on_delete=models.SET_NULL) # has relation with Member class /one to many/

  def __str__(self):
    return self.title

  class Meta:
    ordering = ['created_at']