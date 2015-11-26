
var express = require('express'),
    dicom = require('./routes/dicom'),
    view = require('./public/view');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     
    app.use(express.bodyParser());
    app.use(express.static('/img'));
    app.use('/img', express.static(__dirname + '/img'));
});

app.get('/', view.initDicom);
app.get('/source', view.findContact);
app.get('/about', view.findAbout);

app.get('/dicom', dicom.findAll);
app.get('/dicom/:id', dicom.findById);
app.post('/dicom', dicom.addDicom);
app.put('/dicom/:id', dicom.updateDicom);
app.delete('/dicom/:id', dicom.deleteDicom);

app.get('*', view.exceptDicom);

var server = app.listen(3000,function(){
    console.log('Listening on port 3000...');
});


