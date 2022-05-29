from os import name

import serial
from flask import Flask, json
from flask_cors import CORS

SerialPort = serial.Serial("COM5", 9600, timeout=2)

api = Flask(__name__)
CORS(api)


@api.route('/data', methods=['GET'])
def get_data():
    incoming_data = ""

    IncomingData = SerialPort.readline()
    if IncomingData:
        incoming_data = IncomingData.decode('utf-8')
        incoming_data = incoming_data.split(",")
        print(incoming_data)

    data = [{"Temp": incoming_data[1], "CO2": incoming_data[2], "Humidity": incoming_data[0]}]
    return json.dumps(data)


if __name__ == "__main__":
    api.run()
