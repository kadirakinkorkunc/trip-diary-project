from django.db import models
from datetime import date
from authapi.models import Member
# Create your models here.


class Post(models.Model):
  # Post specs
  title = models.CharField(max_length=100, null=False)
  notes = models.CharField(max_length=10000)
  start_date = models.DateField(null=True)
  end_date = models.DateField(null=True)
  created_at = models.DateField(default=date.today)
  owner_id = models.ForeignKey(Member, null = True, on_delete=models.SET_NULL) # has relation with Member class /one to many/

  def __str__(self):
    return self.title

  class Meta:
    ordering = ['created_at']