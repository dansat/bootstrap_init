var path = __dirname + '/views/';
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('dicomdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'dicomdb' database");
        db.collection('dicom', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'dicom' collection doesn't exist. Creating it with sample data...");
                hardcodeDB();
            }
        });
    }
});


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving dicom: ' + id);
    db.collection('dicom', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('dicom', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addDicom = function(req, res) {
    var dicom = req.body;
    console.log('Adding dicom: ' + JSON.stringify(dicom));
    db.collection('dicom', function(err, collection) {
        collection.insert(dicom, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateDicom = function(req, res) {
    var id = req.params.id;
    var dicom = req.body;
    console.log('Updating dicom: ' + id);
    console.log(JSON.stringify(dicom));
    db.collection('dicom', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, dicom, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error --> : ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(dicom);
            }
        });
    });
}

exports.deleteDicom = function(req, res) {
    var id = req.params.id;
    console.log('Deleting dicom: ' + id);
    db.collection('dicom', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


/*--------------------------------------------------------------------------------------------------------------------*/
//hardcode if no SQl available

var hardcodeDB = function() {

    var dicom = [
    {
        name: "DICOM IMAGE 1",
        description: "this is the description of dicom image 1",
        picture: "dicom_image1.jpg"
    },
   ];

    db.collection('dicom', function(err, collection) {
        collection.insert(dicom, {safe:true}, function(err, result) {});
    });

};