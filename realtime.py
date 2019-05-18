import requests
import time
import json
while True:
    r = requests.post('http://localhost:3000/insert/Sensors',data = {"Sensor1":0.29,"Sensor0":0.46})
    print (r.json())
    
    time.sleep(59)
