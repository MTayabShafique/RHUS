import requests
import time
while True:
    r = requests.get('http://192.168.1.8:3000/insert/service/'+"241,246,132,89")
    service = r.json()
    if service['heater'] == True:
        ##GPIO.output(31,GPIO.HIGH)
        print(" heater High")
    if service['heater'] == False:
        ##GPIO.output(31,GPIO.LOW)
        print(" heater low")
    if service['ac'] == True:
        ##GPIO.output(33,GPIO.HIGH)
        print(" ac High")
    if service['ac'] == False:
        ##GPIO.output(33,GPIO.LOW)
        print(" ac low")
    if service['lighting'] == True:
        ##GPIO.output(35,GPIO.HIGH)
        print(" lignting High")
    if service['lighting'] == False:
        ##GPIO.output(35,GPIO.LOW)
        print(" lighting low")
    if service['refigator'] == True:
        ##GPIO.output(37,GPIO.HIGH)
        print(" refigerator High")
    if service['refigator'] == False:
        ##GPIO.output(37,GPIO.LOW)
        print(" refigerator High")
    time.sleep(10)
