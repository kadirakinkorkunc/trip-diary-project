from rest_framework import serializers
from .models import *
from authapi.serializers import UserSerializer

#modelserializers handle the data for us conversion between python objects with others like json
class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ('id','name')
  
class PostSerializer(serializers.ModelSerializer):
  tags = serializers.SlugRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        slug_field='name'
     )
  #tags = TagSerializer
  owner = UserSerializer()
  class Meta:
    model = Post
    fields = ('title','place','notes','start_date','end_date','created_at','id','owner','tags')




