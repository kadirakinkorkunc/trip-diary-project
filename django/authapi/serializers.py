from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth import get_user_model

#modelserializer handle the data for us conversion between python objects with others like json
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = get_user_model()
    fields = '__all__'# all Post variables are defined with __all__
    extra_kwargs = {
      'username': {
        'validators': [UnicodeUsernameValidator()],
      }
    }
