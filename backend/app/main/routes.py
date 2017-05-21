from . import main
import time
import json
from flask import session, redirect, url_for, render_template, request, url_for, jsonify
from worker import celery
from celery.task.control import inspect, revoke
import celery.states as states
from flask_cors import CORS, cross_origin
from redis import Redis

from .. import socketio

redis = Redis(host='redis', port=6379)

@main.route('/api')
def hello():
    return "You should be using the SPA entry. But you can <a href='/add/1/2'>try me out</a>."

## format for data
sensor_hits_collection = {"type": "FeatureCollection", "features": [
 {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [70,30]
                    },
                    "properties": {
                        "title": "Sensor",
                        "icon": {
                            "iconUrl": 'http://a.tiles.mapbox.com/v3/marker/pin-l-embassy+f86767.png',
                        }
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [30,70]
                    },
                    "properties": {
                        "title": "Sensor",
                        "icon": {
                            "iconUrl": 'http://a.tiles.mapbox.com/v3/marker/pin-l-embassy+f86767.png',
                        }
                    }
                }
]}

## routes
@main.route('/api/ping')
def ping():
    count = redis.incr('hits')
    return 'Hello World! I have been seen {} times.\n'.format(count)


@main.route("/api/sensors")
def sensors():
    return json.dumps(sensor_hits_collection);


@main.route("/api/sensor_hit")
def sensor_hit():
    # todo: update this to use the ROS packets from MQTT's format
    message = {'type': 'distance', 'value': '5', 'time': '11/1/2017 12:01:12.2', 'location': [ 30, -80 ]}
    socketio.emit('message',message , namespace='/mapper')
    return "{'OK':'True'}"

@main.route("/api/location")
def location():
    message = {'type': 'location', 'time': '11/1/2017 12:01:12.2', 'location': [25, 30]}
    socketio.emit('message',message , namespace='/mapper')
    return "{'OK':'True'}"


# echo for connection confirmation
@socketio.on('connect', namespace='/mapper')
def connect():
    socketio.emit('connected', {'hello': 'there'}, namespace='/mapper')
    print 'connected to client'


@socketio.on('disconnect', namespace='/mapper')
def connect():
    socketio.emit('disconnected', namespace='/mapper')
    print 'disconnected to client'


@main.route('/api/list')
def list():
    i = inspect()
    print i.registered_tasks()
    return jsonify(results=i.registered_tasks())


@cross_origin()
@main.route('/api/add/<int:param1>/<int:param2>', methods=['GET', 'POST'])
def add(param1, param2):
    #clientId = request.sid
    task = celery.send_task('mytasks.add', args=[param1, param2], kwargs={})

    # initiate progress
    socketio.emit('progress', {'status': 10}, namespace='/mapper')
    time.sleep(1)

    # check progress
    res = celery.AsyncResult(task.id)
    if res.state == states.PENDING:
        socketio.emit('progress', {'status': 50}, namespace='/mapper')
    time.sleep(2)
    #clientId.socketio.emit('progress', {'status': 100, 'result': str(res.result)}, namespace='/cruncher')
    socketio.emit('progress', {'status': 100, 'result': str(res.result)}, namespace='/mapper')
    return jsonify(task_id=task.id, status_url=url_for('main.check_task', id=task.id, _external=True))


@main.route('/api/check/<string:id>')
def check_task(id):
    res = celery.AsyncResult(id)
    if res.state == states.PENDING:
        return res.state
    else:
        return str(res.result)


@main.route('/api/cancel/<string:id>')
def cancel_task(id):
    res = celery.AsyncResult(id)
    if res.state == states.PENDING:
        revoke(id, terminate=True)
        return "task '{id}' cancelled".format(id=id)
    else:
        return str(res.result)
