FROM python:3

#set env vars
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# install deps
RUN pip install -r /requirements.txt

# set work dir
RUN mkdir /code
WORKDIR /code


# copy proj. code
COPY . /code/



#container listens on the specified network ports at runtime.



EXPOSE 90