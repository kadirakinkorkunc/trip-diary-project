from rest_framework import serializers
from .models import *
from authapi.serializers import UserSerializer
from django.contrib.auth import get_user_model

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
  owner = UserSerializer()
  class Meta:
    model = Post
    fields = ('title','place','notes','start_date','end_date','created_at','id','owner','tags')

  def create(self, validated_data):
    owner_data = validated_data.pop('owner')
    popped_tags = validated_data.pop('tags')
    username = owner_data.pop('username')
    owner = get_user_model().objects.get_or_create(username = username)[0]
    post = Post.objects.create(owner=owner, **validated_data)
    post.tags.set(popped_tags)
    return post

  def update(self, instance, validated_data):
    owner_data = validated_data.pop('owner')
    username = owner_data.pop('username')
    owner = get_user_model().objects.get_or_create(username=username)[0]
    instance.owner = owner
    instance.name = validated_data['name']
    return instance




