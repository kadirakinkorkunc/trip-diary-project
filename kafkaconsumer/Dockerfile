FROM openjdk:8
VOLUME /tmp
ADD target/kafkaconsumer-0.0.1-SNAPSHOT.jar kafkaconsumer-0.0.1-SNAPSHOT.jar
EXPOSE 8070
ENTRYPOINT ["java","-jar","kafkaconsumer-0.0.1-SNAPSHOT.jar"]