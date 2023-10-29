import os
import threading
import numpy as np
from flask import Flask, jsonify, request, send_file


app = Flask(__name__)
port = "80"

@app.post("/")
def test():
    data = request.json
    return f"hello!!"


if __name__ == "__main__":
    app.run(debug=True,port=80,host='0.0.0.0')