from rest_framework import serializers
from django.contrib.auth.models import User

#modelserializer handle the data for us conversion between python objects with others like json
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'# all Post variables are defined with __all__
