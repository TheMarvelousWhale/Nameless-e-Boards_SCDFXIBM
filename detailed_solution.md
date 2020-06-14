#Detailed Solution 

Below is the detailed solution for SCDFxIBM Innovation Challenge 2020 from Team Nameless. We propose e-Boards to enhance the efficiency of resources deployment together with real time monitor of firefighters' physical conditions during operations and trainings.

The architecture of the system is below: 
![diagram](https://github.com/TheMarvelousWhale/SCDFxIBM-Inno-Challenge-2020/blob/master/Assets/DesignDiagram.svg?raw=true)

**I. Hardware**

We have 3 sensors connected to an rpi4 board that will be worn by the firefighters. The sensors will transmit real time json data (details in figure) to IBM Flask, where it will be stored in the IBM CLoudant Database. 

**II. React Webapp**
Asynchronously, the React Webapp will pull the data from Cloudant to show to the staging OIC the physical conditions of his men. 

**II. IBM Cloud**
Both the Webapp and Rpi can make call to the deployed ML model to get a risk level estimation based on the current physical condition. Due to lack of labelled data, this cannot be done in hackathon, but IBM AutoAI enables very swift training and optimizing of model via csv file. 