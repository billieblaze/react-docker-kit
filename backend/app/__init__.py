import json

from gevent import monkey
monkey.patch_all()

from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()
# Import package
import paho.mqtt.client as mqtt

# Define Variables
MQTT_HOST = "192.168.1.99"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 45

# Define on connect event function
# We shall subscribe to our Topic in this function
def on_connect(mosq, obj, rc):
 mqttc.subscribe("current_location", 0)
 mqttc.subscribe("range_location", 0)

# Define on_message event function.
# This function will be invoked every time,
# a new message arrives for the subscribed topic
def on_message(msq, obj, msg):
 print "Topic: " + str(msg.topic)
 # print "QoS: " + str(msg.qos)
 #print "Payload: " + str(msg.payload)
 message = json.loads(msg.payload)
 
# message = ()
 socketio.emit('message', message, broadcast=True, namespace='/mapper')

# Initiate MQTT Client
mqttc = mqtt.Client()

# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect

# Connect with MQTT Broker
mqttc.connect_async(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)

# Continue monitoring the incoming messages for subscribed topic
mqttc.loop_start()


def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    app.config.from_object('configs')

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    socketio.init_app(app)

    return app
