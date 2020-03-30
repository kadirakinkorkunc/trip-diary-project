FROM openjdk:8

#chaged working dir
WORKDIR /opt/app

ARG JAR_FILE=target/kafkaconsumer-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar
EXPOSE 8070
ENTRYPOINT ["java","-jar","app.jar"]