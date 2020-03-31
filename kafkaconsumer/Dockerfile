FROM maven:3.5-jdk-8 AS build  
COPY src /usr/src/app/src  
COPY pom.xml /usr/src/app  
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

FROM gcr.io/distroless/java  
COPY --from=build /usr/src/app/target/kafkaconsumer-0.0.1-SNAPSHOT.jar /usr/app/helloworld-0.0.1-SNAPSHOT.jar  
EXPOSE 8070  
ENTRYPOINT ["java","-jar","/usr/app/helloworld-0.0.1-SNAPSHOT.jar"]