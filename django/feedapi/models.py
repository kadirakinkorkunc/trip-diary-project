from django.db import models
from datetime import date
from authapi.models import Member
# Create your models here.


class Post(models.Model):
  title = models.CharField(max_length=100, null=False)
  notes = models.CharField()
  start_date = models.DateField(null=True)
  end_date = models.DateField(null=True)
  created_at = models.DateField(default=date.today)
  owner_id = models.ForeignKey(Member, null = False, on_delete=models.SET_NULL)

  def __str__(self):
    return self.title