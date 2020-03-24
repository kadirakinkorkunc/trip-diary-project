from rest_framework import serializers
from .models import Post


#modelserializer handle the data for us conversion between python objects with others like json
class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = '__all__'
  



