var express = require('express');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var server = express();

server.get('/hello', function (req, res) {
    console.log(req)
    console.log(res)
})

server.get('/mugrom', function (req, res) {
    fs.readFile('/home/pi/charakters/MugromgroschoJandidid.xml', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        parseString(data, function (err, result) {
            res.send(result["helden"]["held"][0]);
        });

    });
});

server.listen(3000, function () {
    console.log('Server listening on port 3000!');
});