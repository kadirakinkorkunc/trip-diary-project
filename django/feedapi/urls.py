from django.urls import path
from . import views

url_patterns = [
  path('api/feed/', views.PostList.as_view(), name="post_list"),
]