from django.urls import path
from feedapi import views

urlpatterns = [
  path('api/feed/', views.PostList.as_view(), name="post_list"),
]