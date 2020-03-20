from django.urls import path
from authapi import views

urlpatterns = [
  path('', views.MemberList.as_view(), name="member-list")
]