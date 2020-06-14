# Team Nameless

Hi! We are team Nameless, comprises Raymond Toh, Shanjie Yong, Damien Cheng and Hoang Viet. We are a group of NTU Year 2 Students at the time of this project. 

**_a. Problem Description and proposed idea:_** 

We aim to tackle the issue of climate change and how it affect the performance of our First Responders during training and operations. Our proposed solution is the digitalization of BACO and staging boards to enhance strategic deployment of resources, together with use 3 different sensors to closely monitor first responders physical conditions during training and operation. All data is stored on IBM Cloud and visualized near-realtime on React Webapp.

With this implementation, we can proactively monitor the physical conditions of the first responders and flag out any potential risks. Also, we can reduce staging’s workload to focus on operationally-oriented tasks.
 
**_b. Pitch Video:_**

Our pitch video can be found on Youtube via [this link](https://youtu.be/3lg_noXvyjo)

**_c. Architecture of Our Solution:_**

Our architecture is as below: 

![DesignDiagram](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/DesignDiagram.png?raw=true)



**_d. Detailed Solution:_**

Detailed solution can be found in this repo under [detailed_solution.md](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/DesignDiagram.png)

A rough guide to the files in this repo: 
1. Flask-Cloudant: IBM Flask App with Cloudant integration/auth
2. React: React Webapp code 
3. Rpi: calculation of important metrics, code for simulation of sensor data
4. AutoAI: code snippet to enable python to auth with Watson ML 
5. research_background.md: Literature, Inspiration and Hardware specs
6. setup.md: Step-by-step guide to replicate our system on your endpoints 
7. detailed_solution.md: Detailed solution of our problems

**_e. Project Roadmap:_**


![Roadmap](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Assets/project_roadmap.png)


**_f. Setup Instructions:_**


The detailed setup and running instruction can be found in this repo under [setup.md](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/Setup.md) 


**_g. Running the tests:_**


The Test Cases for each node in our stack as well as expected output can be found in this repo under [running tests section](https://github.com/TheMarvelousWhale/Nameless-e-Boards_SCDFXIBM/blob/master/detailed_solution.md#running-tests)


**_h. Live Demo:_**


The demo video can be found on Youtube at [here](https://youtu.be/7WRQlVK01ZI) 


If you would like to use your own data, download rpi_code into your environment and modify the simulation code to take in your sensors data. Visit demonicmushy.dyndns.org:3000 to see your own data being populated on the BACO Board (Hopefully we haven't torn down our project by the time you are reading this D: ) 


**_i. Technology Used:_**


+ IBM Watson Studio's AutoAI and Watson ML
+ IBM Flask App
+ IBM Cloudant
+ IBM Functions (for debugging)
+ Rpi4, sensors and Python3
+ ReactJS 



