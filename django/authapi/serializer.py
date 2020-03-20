from rest_framework import serializers
from .models import Member

#modelserializer handle the data for us conversion between python objects with others like json
class MemberSerializer(serializers.ModelSerializer):
  class Meta:
    model = Member
    fields = '__all__'