from django.urls import path
from feedapi import views

urlpatterns = [
  path('', views.PostList.as_view(), name="post_list"),
  path('<int:post_id>', views.PostDetail.as_view(), name="post_details"),
]