from django.urls import path
from feedapi import views

urlpatterns = [
  path('', views.PostList.as_view(), name="post_list"),
]