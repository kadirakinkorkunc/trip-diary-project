from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Member
from .serializers import MemberSerializer
# Create your views here.


class MemberList(APIView):
  
  #get all posts
  def get(self, request, format = None):
    members = Member.objects.all()
    serializer = MemberSerializer(members, many = True)
    return Response(serializer.data)
