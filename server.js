var express = require('express');
var fs = require('fs');
var moment = require('moment');
var parseString = require('xml2js').parseString;
var server = express();

var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/apache2/ssl-keys/newkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/apache2/ssl-keys/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

server.get('/', function (req, res) {
    console.log("hello")
    res.send("hello");
})

server.get('/mugrom', function (req, res) {
    fs.readFile('/home/pi/charakters/MugromgroschoJandidid.xml', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        parseString(data, function (err, result) {
            res.send(result["helden"]["held"][0]);
            console.log("/mugrom "+moment().format('H:mm:ss')+" Uhr am "+moment().format('DD.MM.YYYY'))
        });
    });
});

var httpServer = http.createServer(server);
var httpsServer = https.createServer(credentials, server);

httpServer.listen(3000, function () {
    console.log('httpServer listening on port 3000!');
});
httpsServer.listen(8083, function (){
    console.log('httpsServer listening on port 8083!');
})