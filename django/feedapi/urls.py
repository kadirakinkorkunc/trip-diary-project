from django.urls import path
from feedapi import views
# when url have no attachment redirect to main page
  # otherwise with id refer to that post
urlpatterns = [
  path('', views.PostList.as_view(), name="post_list"),
  path('<int:post_id>', views.PostDetail.as_view(), name="post_details"),
]