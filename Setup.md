### Step-By-Step Guide on how to set up our system

_Please refer to the Assets/DesignDiagram.svg for System Diagram_

0. IBM Account and Services:

Please ensure you have your IBM Account set up and running. If you are Lite user, you won't be able to use the AutoAI resources as we are already using Cloudant for our DB (and Watson ML requires another Cloudant Instance). 
The services we are using are IBM Flask App and Cloudant DB. 

1. Sensors

Connect the sensors to the Rpi through wires. Make sure to use harsh operations power supply to ensure rpi+sensors system can last more than 80mins (2x40mins round). Secure the wiring.  
*-- Notes: Implementation specific. Not gonna describe in details

2. Rpi 

- In our implementation, rpi will be connected to the Internet via cellular, due to the issue of wifi being limited in range and unreliability in its QoS. Make sure rpi's cellular adapter is active 
- Load rpi_code.py into the rpi
- (If sensors availables) Change the functions of the data distributor class to async wait on interupt of the chosen sensors. Remove the multi threading from the simulation (as we would have multiple rpi boards in the actual implementation)
- (Simulation setting) Double check the NUM_RPI and NUM_JOBS_PER_RPI (this shouldn't exceed the sampledata.csv num of rows)
- (Optional) Load AutoAi/wml_authcode.py and AutoAI/wml_config.py (change to your credentials) and include it in the rpi_code to authenticate with Watson ML service. 

*-- Notes: rpi 3-4 is recommended*

3. Flask + Cloudant

- Provide an instance of Flask Web App  - link it to your git flask repo and then deploy on IBM (make sure your IBM Plan has enough memory to cater for the app). 
- Provide an instance of Cloudant service. During creation, choose IAM with legacy authentication. Take note of your credentials 
- setup Flask in your environment with proper git. Additional packages to be installed are flask-cors and cloudant (py client lib)
- In IBM Flask App, clone the Flask-Cloudant into a separate repo and link it to the App. Deploy the app. You might need to change the urls variables (flask_url in rpi_code.py and the url in React if you are deploying your own Flask.
- Our code will initiallize the database. There is one GET route to initialize the data, and this will be called by ReactApp (can be used for initialization/reset purpose).  
- The main routing will be from 2 POST routes. ('./updateDocument') is used by rpi endpoints to update the Cloudant DB and ('./retrieveDocument') is used by React to retrieve data. 
- Double check your cloudant credential in Flask

*-- Notes: please ensure pipfile and pipfile.lock are properly defined as they gave us a 10 hours debugging session --*

4. React Web App

- Install react and npm on your environment
- Additional packages: axios 
- Double check all the credentials
- Host your app
*-- Notes: *

5. AutoAI (optional)

- Provide an instance of Watson Studio, Create a Project with Watson ML service instance and AutoAI Service
- Train a model based on input CSV
- Deploy the model from AutoAI 

*-- Notes: The quality of model is very dependent on the amount of labelled data provided in the csv*

**6. The run**

Once you have deployed everything (if you deploy your own Flask/React/Cloudant etc) triple check your api key and credentials across the applications (it will save you a lot of time!) and hopefully once u run the rpi simulation code (or your own sensors) the readings will stream seamlessly through Flask into Cloudant and React will pull your data from cloud and visualize in near-realtime! You can draw staging plan and fill in admin/logistic details on your react-hosted site as well! 

**_-- CONGRATULATIONS!! --_**
