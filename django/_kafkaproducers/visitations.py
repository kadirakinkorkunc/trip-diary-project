from django.contrib.auth import get_user_model 
from feedapi.models import Post

def send_data(visitor_user: get_user_model(), owner_user: get_user_model(), visitedPost:Post):
  from kafka.errors import KafkaError
  from kafka import KafkaProducer

  producer = KafkaProducer( bootstrap_servers = ('kafka:29092') , api_version = (0,10,2))
  
  visitor = visitor_user.first_name + " " + visitor_user.last_name + "(username:" + visitor_user.username + ") "
  owner = owner_user.first_name + " " + owner_user.last_name + "(username:" + owner_user.username + ")"
  post = "'" + visitedPost.title + "' titled post."
  message =  visitor + "read " + owner + "'s " + post

  result = producer.send( 'visitations', message.encode() )

  try:
    record_metadata = result.get(timeout=10)
  except KafkaError:
    print("error->",KafkaError.__dict__.values())
    pass
