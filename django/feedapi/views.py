from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from django.http import Http404
from rest_framework import status
# Create your views here.

# PostList -> view all posts and create post
class PostList(APIView):

  """
  Gets all posts
  """
  def get(self, request, format = None ):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

  def post(self, request, format =None):
    """
    Creates a post
    """
    serializer = PostSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# PostDetail -> get a post, delete and put
class PostDetail(APIView):
  def get_post(self, post_id):
    """
    Helper for getting a post
    """
    try:
      return Post.objects.get(pk = post_id)
    except Post.DoesNotExist:
      raise Http404

  def get(self,request,post_id,format=None):
    """
    Gets a post
    """
    post = self.get_post(post_id)
    serializer = PostSerializer(post)
    return Response(serializer.data)

  def put(self, request, post_id):
    """
    Updates a post
    """
    post = self.get_post(post_id)
    serializer = PostSerializer(post, data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status= status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, post_id, format = None):
    """
    Deletes a post
    """
    post = self.get_post(post_id)
    post.delete()
    return Response( status = status.HTTP_204_NO_CONTENT)

    
