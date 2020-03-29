package com.tripdiaryproject.kafkaconsumer.services;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class KafkaListenerService {

        @KafkaListener(
                topics = "${kafkaconsumer.topic}",
                groupId = "${kafkaconsumer.group.id}",
                containerFactory = "concurrentKafkaListenerContainerFactory",
                autoStartup = "true"
        )
        public void listen(@Payload String message){
            System.out.println(message);
        }



}
