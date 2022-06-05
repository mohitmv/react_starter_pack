from flask_lib import FlaskLib
import flask_lib
import time
import os
import urllib.request
import math
import csv
import io
import json
import random

backend = FlaskLib()

@backend.api('/hi')
def hi(d):
	return "Hello"

@backend.api('/my_name')
def my_name(d):
	return {"name": "I am React"}

backend.run(port=5503)
