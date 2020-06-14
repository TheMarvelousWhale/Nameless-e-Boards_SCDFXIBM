# Detailed Solution 

Below is the detailed solution for SCDFxIBM Innovation Challenge 2020 from Team Nameless. We propose e-Boards to enhance the efficiency of resources deployment together with real time monitor of firefighters' physical conditions during operations and trainings. The running tests can be found under "Running tests" section. 

The architecture of the system is below: 
![diagram](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/DesignDiagram.svg?raw=true)

**I. Hardware**

We have 3 sensors connected to an rpi4 board that will be worn by the firefighters. The sensors will transmit real time json data (details in figure) to IBM Flask, where it will be stored in the IBM CLoudant Database. 

Sensor Selection: 

[Heart Rate Sensor (Chest strap)](https://wiki.seeedstudio.com/Grove-Chest_Strap_Heart_Rate_Sensor/)  -- wireless, lowpower consumption (survive up to half year) and high sensitivity. Effective distance is 30cm more than sufficient.  

[Temperature Sensor](https://www.adafruit.com/product/3984) - can withstand up to 500 degree Celsius and are five time faster due to it using platinum sensors. The temperature require an [RTD amplifier](https://thepihut.com/products/adafruit-pt100-rtd-temperature-sensor-amplifier-max31865?ref=isp_rel_prd&isp_ref_pos=3) (Wheat Stone bridge circuit, due to small voltage output), which can be safely mounted on the rpi board, amking it compact.  

[Pressure Sensor] there is already a reading on the meter attached to the cylinder. We will need an ADC to fit on the meter and convert the readings into digital signal that rpi can process. This will be dependent on the meter that scdf FRs use.

(Optional) [GSR Sensor](https://wiki.seeedstudio.com/Grove-GSR_Sensor/) -- this is used to measure skin resistance and thus detect sharp changes in resistance that corresponds to strong emotions, which can be used to detect distressing situation. 

*--Notes: About hardware interfacing *
*The code for interfacing these hardware endpoints are dependent on the manufactureres and the API given. There might be additional interfacing and hardware required depends on the hardware you choose. Hence for the live demo purpose, we have abstracted this layer and provide the sampledata.csv* 


**II. React Webapp**
We use React.js to build a webapp that pulls the sensor data asynchronously from Cloudant (via Flask) to show to the staging OIC the physical conditions of his men. 

**III. IBM Cloud**
We use IBM Flask App as the controller of sensor data. The sensor data gathered at the rpi modules for each responders will do a POST request to a the IBM Flask App service url to update the sensor data at a regular intervals. Flask will then store this data to CloudantDB for persistence storage. 

React will make POST request to Flask at the same service url, and Flask will retrieve the corresponding data based on the id of the rpi and send back to React to display the data. 

(Optionally) Webapp and Rpi can make call to the deployed ML model to get a risk level estimation based on the current physical condition. Due to lack of labelled data, this cannot be done in hackathon, but IBM AutoAI enables very swift training and optimizing of model via csv file. 

## Running tests

In the ideal case, after setting up correctly following instructions from [setup.md](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Setup.md), running rpi_code.py will produce changes  at demonicmushy.dyndns.org:3000. Expected output is:

![Expected_output](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/expected_output.jpg)

You will see the data changes in near-realtime at the e-BACO Board. On the site you can see e-staging board


_To run data input simulation:_
On one machine, run rpi_code.py. It should give this screen:


![rpi success](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/test_outputs/RPI_Simulation_Success.PNG)

If you get 405/404 or 'server could not handle your request method', please feel free to check for errors in Flask/ contact us in case we have torn down the Flask Web App.

An rpi error looks like this, but sometimes it does not signify failure. 


![rpi server_fail](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/test_outputs/RPI_Simulation_ServerHandle.PNG)


_To check Flask operations:_

You can use https://reqbin.com/ to try sending test GET/POST requests given at our [flask_testcase.txt](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/flask_testcase.txt) 

_To check React operations:_
You can check using the error message output at the host. 

**_Credentials:_**
Credentials that you need to fill in 
Cloundant Credentials: /Flask-Cloudant/server/routes/index.py
Watson ML Credentials: /AutoAI/wml_config.py

## Challenges and Mitigations

We aim achieve near-realtime performance by using shorter-polling interval between nodes of our Technology stack. There is imminent latency issue presence as our tech stack involves multiple services. 

Nonetheless. using IBM CLoud Service offers the option to upgrade bandwidth with their paid plans and hence this should not be a dealbreaker for larger implementation. 





