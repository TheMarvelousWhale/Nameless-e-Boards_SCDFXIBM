# -*- coding: utf-8 -*-
"""
Created on Thu Jun 11 11:21:50 2020

@author: hoang
"""



import urllib3, requests, json
from watson_machine_learning_client import WatsonMachineLearningAPIClient
from wml_config import my_credentials

"""
IT TOOK 4 HOURS THROUGH 40 DIFFERENT IBM DOCUMENTS TO GET US HERE TO AUTHENTICATE

WHY DOES THE IBM CORE AUTHenticator doesnt do WML

Side note: Current ML is trained on heart stroke -- We couldn't find heat related data

"""

service_url = my_credentials["url"]
apikey = my_credentials['apikey']
ml_instance_id = my_credentials["instance_id"]


wml_credentials = {
                   "url": service_url,
                   "apikey": apikey,
                   "instance_id": ml_instance_id
                  }

client = WatsonMachineLearningAPIClient(wml_credentials)


# Get an IAM token from IBM Cloud
iam_url     = "https://iam.bluemix.net/oidc/token"
iam_headers = { "Content-Type" : "application/x-www-form-urlencoded" }
iam_data    = "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
IBM_cloud_IAM_uid = "bx"
IBM_cloud_IAM_pwd = "bx"
response  = requests.post( iam_url, headers=iam_headers, data=iam_data, auth=( IBM_cloud_IAM_uid, IBM_cloud_IAM_pwd ) )
iam_token = response.json()["access_token"]



header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + iam_token, 'ML-Instance-ID': ml_instance_id}
payload_scoring = {"input_data": [
    {"fields": ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"], 
     "values": [[63,1,3,145,233,1,0,150,0,2.3,0,0,1]]}]}



response_scoring = requests.post('https://jp-tok.ml.cloud.ibm.com/v4/deployments/47df9743-a319-4370-ac8c-d8ef4d7d0d35/predictions', json=payload_scoring, headers=header)
print("Scoring response")
print(json.loads(response_scoring.text))