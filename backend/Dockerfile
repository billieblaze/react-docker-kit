FROM python:2.7

ADD ./requirements.txt /backend/requirements.txt
WORKDIR /backend

RUN pip install -r requirements.txt

ADD . /backend

CMD ["/usr/local/bin/uwsgi", "--http","0.0.0.0:5000","--gevent","1000","--http-websockets","--master","--wsgi-file","run.py", "--callable","app"]

EXPOSE 5000
