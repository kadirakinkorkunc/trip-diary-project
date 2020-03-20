from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
# Create your views here.


class PostList(APIView):
  
  #get all posts
  def get(self, request, format = None):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many = True)
    return Response(serializer.data)
