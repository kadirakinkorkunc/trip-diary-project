from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
# UserDetail -> get a user
class UserDetail(APIView):
    # Authentication and authorization settings
  permission_classes = [IsAuthenticated]
  authentication_classes = [JSONWebTokenAuthentication]

  def get_user(self, user_id):
    """
    Helper for getting a user
    """
    try:
      return User.objects.get(pk = user_id)
    except Post.DoesNotExist:
      raise Http404

  def get(self,request,user_id,format=None):
    """
    Gets a user
    """
    user = self.get_user(user_id)
    serializer = UserSerializer(user)
    print("response --> ", serializer.data)
    return Response(serializer.data)

  
class LoggedInUserDetail(APIView):
  
  # Authentication and authorization settings
  permission_classes = [IsAuthenticated]
  authentication_classes = [JSONWebTokenAuthentication]

  def get(self,request,format=None):
    """
    gets logged in user
    """
    user = request.user
    serializer = UserSerializer(user)
    print("user -->",serializer.data)
    return Response(serializer.data)

    
