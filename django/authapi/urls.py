from django.urls import path
from authapi import views

urlpatterns = [
  path('api/auth/', views.MemberList.as_view(), name="member-list")
]