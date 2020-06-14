from server import app
from flask import render_template, jsonify, request
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey

CLOUDANT_USERNAME = "<something something>-bluemix"
CLOUDANT_PASSWORD = "<very very long password>"
CLOUDANT_URL = "{0}.cloudantnosqldb.appdomain.cloud".format(CLOUDANT_USERNAME)


client = Cloudant(CLOUDANT_USERNAME, CLOUDANT_PASSWORD, url="https://{0}:{1}@{2}".format(CLOUDANT_USERNAME, CLOUDANT_PASSWORD, CLOUDANT_URL))
client.connect()

my_database = client.create_database("database3")

data_json = {
    'cat': "meow",
}

@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

@app.errorhandler(404)
@app.route("/error404")
def page_not_found(error):
    return app.send_static_file('404.html')

@app.errorhandler(500)
@app.route("/error500")
def requests_error(error):
    return app.send_static_file('500.html')

@app.route('/initialiseCloudant', methods=['GET'])
def initialiseCloudant():
    new_document = []
    for z in range(0,6):
        my_document = my_database[str((z+1))]
        if my_document.exists():
            my_document['bars']=0
            my_document['estTimeRemain']=0
            my_document['heartRate']=0
            my_document['o2ConRate']=0
            my_document['temp']=0
            my_document['timestamp']=0
            my_document.save()
        else:
            thisid = str(z+1)
            sample_data = {
                '_id': thisid,
                'bars': 0,
                'estTimeRemain': 0,
                'heartRate': 0,
                'o2ConRate': 0,
                'temp': 0,
                'timestamp': 0
            }
            new_document.append(my_database.create_document(sample_data))
    return jsonify({'data':new_document})


    for z in range(0,6):
        thisid = str(z+1)
        sample_data = {
            '_id': thisid,
            'bars': 0,
            'estTimeRemain': 0,
            'heartRate': 0,
            'o2ConRate': 0,
            'temp': 0,
            'timestamp': 0
        }
        new_document.append(my_database.create_document(sample_data))
    return jsonify({'data':new_document})

@app.route('/updateDocument', methods=['POST']) 
def updateDocument():
    args = request.json
    my_document = my_database[str(args['_id'])]
    my_document['bars']=args['bars']
    my_document['estTimeRemain']=args['estTimeRemain']
    my_document['heartRate']=args['heartRate']
    my_document['o2ConRate']=args['o2ConRate']
    my_document['temp']=args['temp']
    my_document['timestamp']=args['timestamp']
    my_document.save()
    return jsonify({'response':'done'})

@app.route('/retrieveDocument', methods=['POST']) 
def retrieveDocument():
    args = request.json
    my_document = my_database[str(args['uid'])]
    return_data = {
        '_id': my_document['_id'],
        'bars': my_document['bars'],
        'estTimeRemain': my_document['estTimeRemain'],
        'heartRate': my_document['heartRate'],
        'o2ConRate': my_document['o2ConRate'],
        'temp': my_document['temp'],
        'timestamp': my_document['timestamp']
    }

    return jsonify(return_data)


@app.route('/get_data', methods=['GET']) #For Debug
def get_data():
    return jsonify(data_json)


@app.route('/post_data', methods=['POST']) #For Debug
def post_data():
    args = request.json
    thisdata = args['cat']
    data_json['cat'] = thisdata
    return jsonify(data_json)