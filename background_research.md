### I. Literature & Inspiration for our Project

The idea from this project is strongly inspired by some ideas in the literature below: 

1. [This pubmed paper](https://pubmed.ncbi.nlm.nih.gov/26170240/?from_single_result=Individualized+Prediction+of+Heat+Stress+in+Firefighters%3A+A+Data-Driven+Approach+Using+Classification+and+Regression+Trees  ) inspires the Watson ML module in our project. We also uses the strongly correlated predictor (CBT) to predict safety level as an alternative while ML model is being trained with more data 

2. [This paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5796472/) strongly influences our hardware design approach and sensors decision 

3. [This](https://www.researchgate.net/publication/328034537_A_random_forest_model_to_predict_heatstroke_occurrence_for_heatwave_in_China) and [this paper](https://pubmed.ncbi.nlm.nih.gov/21294631/) gives us insights into the Operational Safety and Associated Risks faced by First Responders. 

*-- Special Shoutout to our friends at Bukit Batok Fire Station for their invaluable insights to the unique challenges faced during trainings and ops by SCDF First Responders --*

### II. Hardware 

The implementation of hardware is heavily influenced by the available hardware in the market. The sensors we choose can be found [here](https://wiki.seeedstudio.com/Grove-Chest_Strap_Heart_Rate_Sensor/). They are lightweight, can withstand harsh operating conditions.
 
 For rpi, we will need a cellular adapter for each board to connect to IBM Flask App. Wifi was not chosen due to range and low QoS concerns.
 
 ### III. IBM Cloud Services
 
Flask was chosen to be the Controller. Other alternative is IBM Cloud Functions, albeit with much more limited capacity
We were constrained by our Lite Plan, so we had to make use of the resources available. Cloudant was chosen to be the DB. If this project was to scale up, ES might be a better selection because of its bandwidth. Cloudant authentication was a big issue. 

AutoAI was chosen for its scalability and deployment ease. The authentication was a big issue due to IBM Docs, but we have provided an example of wml_authcode.py

### IV. Other Softwares

React was chosen due to its ease of deployment and scalability as well as support. 
