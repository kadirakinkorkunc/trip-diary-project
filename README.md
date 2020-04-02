# Trip Diary Project Containers

We have six container in this project. No additional commands needed to setup project. With the docker-compose we can compose all the Dockerfiles with the given setup configuration in a file.

## Getting Started

These instructions will cover usage information and for the docker containers

### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

You need to open a command line in the project folder and start using the project with the command below.

```shell
docker-compose up --build
```
#### Useful Informations
* `localhost:8080` to access the site.
* ``localhost:90/admin` to access back-end admin 
* We have 10(1 to 10) user and 1 admin for demonstration. User informations have a pattern like;
  * username : user[index] 
  * password : [index]password[index]
  * you can access as a admin with username: root, password: root 

#### Useful File Locations
* `/logs/` - In your host file system Spring Boot Kafka Consumer Container has a shared volume for activity logs.


#### Volumes
* `/var/lib/postgresql/data` - Postgres Container has a named volume for keeping data persistent.


  

## Built With

* Angular 9.0.7
* Python Django 3.0.4
* Spring Framework 2.2.6 ( log4j2 for logging )
* Kafka
* Zookeeper

## Authors

* **Kadir Akın KORKUNÇ**  - (https://github.com/kadirakinkorkunc)

