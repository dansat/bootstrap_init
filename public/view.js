var path = __dirname + '/views/';

exports.initDicom = function(req, res) {
    console.log('Initializing index html..')
    res.sendfile(path + "index.html");
}

exports.findContact = function(req, res) {
    res.sendfile(path + "source.html");
}

exports.findAbout = function(req, res) {
    res.sendfile(path + "about.html");
}

exports.exceptDicom = function(req, res) {
    res.sendfile(path + "404.html");
}

