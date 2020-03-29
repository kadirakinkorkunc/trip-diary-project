

from django.contrib.auth.admin import User
from feedapi.models import Post
from datetime import date
def produceData(visitor_user:User, owner_user:User, visitedPost:Post, timestamp:date):
  from pykafka import KafkaClient # import for use
  


  client = KafkaClient(hosts="localhost:9092")  # set a client to a var
  topic = client.topics['visitation-log']   # get spesific topic from kafka server
  producer = topic.get_sync_producer()      # create producer for that topic
  visitor = visitor_user.first_name + " " + visitor_user.last_name + "(username:" + visitor_user.username + ") "
  owner = owner_user.first_name + owner_user.last_name + "(username:" + owner_user.username + ") "
  post = "'" + visitedPost.title + "' titled post."
  message = timestamp + "->" + visitor + "read" + owner + " 's " + post
  producer.produce(message.encode('ascii')) # produce a message to created producer