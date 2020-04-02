from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from datetime import datetime
from .serializers import *
from django.http import Http404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from _kafkaproducers import visitations as kafka
from django.contrib.auth.admin import User
import pytz
from django.utils import timezone

# Create your views here.

# PostList -> view all posts and create post
class PostList(APIView):
  # Authentication and authorization settings
  permission_classes = [IsAuthenticated]
  authentication_classes = [JSONWebTokenAuthentication]

  
  def get(self, request, format = None ):
    """
    Gets all posts
    """
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

  def post(self, request, format =None):
    """
    Creates a post
    """
    post = request.data                          ## copy dictionary to a variable
    authenticatedUserDataAsDict =  request.user.__class__.objects.filter(pk=request.user.id).values().first()
    post['owner'] = authenticatedUserDataAsDict        ## attach authenticated user to post end
    serializer = PostSerializer(data = post)      ## serialize the dict
    if serializer.is_valid():
      serializer.save()                           ## if data valid save it.
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) # if it's not raise http 400





# PostDetail -> get a post, delete and put
class PostDetail(APIView):

    # Authentication and authorization settings
  permission_classes = [IsAuthenticated]
  authentication_classes = [JSONWebTokenAuthentication]

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
    
    kafka.send_data(post.owner, request.user, post ) #for logging

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

class TagList(APIView):
      # Authentication and authorization settings
  permission_classes = [IsAuthenticated]
  authentication_classes = [JSONWebTokenAuthentication]

  """
  Get all of the tags
  """
  def get(self, request, format = None):
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)
