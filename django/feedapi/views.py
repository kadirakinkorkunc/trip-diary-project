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


def send_data(visitor_user:User, owner_user:User, visitedPost:Post, timestamp:date):
  from kafka.errors import KafkaError
  from kafka import KafkaProducer
  print("visitoruser->",visitor_user)
  print("owneruser->",owner_user)
  print("post->",visitedPost)
  print("visitoruser->",visitor_user)


  producer = KafkaProducer( bootstrap_servers = ('kafka:29092') , api_version = (0,10,2))
  

  visitor = visitor_user.first_name + " " + visitor_user.last_name + "(username:" + visitor_user.username + ") "
  owner = owner_user.first_name + owner_user.last_name + "(username:" + owner_user.username + ") "
  post = "'" + visitedPost.title + "' titled post."
  message = timestamp + "->" + visitor + "read" + owner + " 's " + post

  result = producer.send( 'visitations', message.encode() )

  try:
    record_metadata = result.get(timeout=10)
    print("RECORD METADATA ->", record_metadata)
  except KafkaError:
    print("error->",KafkaError.__dict__.values())
    # Decide what to do if produce request failed...

    pass



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
    
    send_data(post.owner, request.user, post, datetime.now().strftime("%d/%m/%Y %H:%M:%S") )

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
