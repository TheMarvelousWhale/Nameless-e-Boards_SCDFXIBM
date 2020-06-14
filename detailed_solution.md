# Detailed Solution 

Below is the detailed solution for SCDFxIBM Innovation Challenge 2020 from Team Nameless. We propose e-Boards to enhance the efficiency of resources deployment together with real time monitor of firefighters' physical conditions during operations and trainings. The running tests can be found under "Running tests" section. 

The architecture of the system is below: 
![diagram](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/DesignDiagram.svg?raw=true)

**I. Hardware**

We have 3 sensors connected to an rpi4 board that will be worn by the firefighters. The sensors will transmit real time json data (details in figure) to IBM Flask, where it will be stored in the IBM CLoudant Database. 

**II. React Webapp**
Asynchronously, the React Webapp will pull the data from Cloudant to show to the staging OIC the physical conditions of his men. 

**II. IBM Cloud**
Both the Webapp and Rpi can make call to the deployed ML model to get a risk level estimation based on the current physical condition. Due to lack of labelled data, this cannot be done in hackathon, but IBM AutoAI enables very swift training and optimizing of model via csv file. 

## Running tests
In the ideal case, after setting up correctly following instructions from [setup.md](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Setup.md), running rpi_code.py will produce changes  at demonicmushy.dyndns.org:3000. Expected output is:

![Expected_output](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/expected_output.jpg)

You will see the data changes in near-realtime at the e-BACO Board. On the site you can see e-staging board


_To run data input simulation:_
On one machine, run rpi_code.py. It should give this screen:


![rpi success](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/test_outputs/RPI_Simulation_Success.PNG)

If you get 405/404 or 'server could not handle your request method', please feel free to check for errors in Flask/ contact us in case we have torn down the Flask Web App.

An rpi error looks like this, but sometimes it does not signify failure. 


!(rpi server_fail)[https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/test_outputs/RPI_Simulation_ServerHandle.PNG]



_To check Flask operations:_

You can use https://reqbin.com/ to try sending test GET/POST requests given at our [flask_testcase.txt](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/flask_testcase.txt) 






