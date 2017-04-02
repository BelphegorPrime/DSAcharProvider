let express = require('express');
let fs = require('fs');
let moment = require('moment');
let parseString = require('xml2js').parseString;
let http = require('http');
let https = require('https');
let basicAuth = require('basic-auth');

let server = express();

let auth = (req, res, next)=> {
    let user = basicAuth(req);
    if (!user || !user.name || !user.pass || (user.name !== 'dsa' && user.pass !== 'asd')) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }else {
        return next();
    }
};

server.get('/',  (req, res)=> {
    console.time('handler name');
    console.log("hello")
    res.send("hello");
    console.timeEnd('handler name');
})

server.get('/beowulf',auth,  (req, res)=> {
    console.time('beowulf');
    fs.readFile('/home/pi/charakters/BeowulfLingardson.xml', 'utf8',  (err,data)=> {
        if (err) {
            return console.log(err);
        }
        parseString(data,  (err, result)=> {
            res.send(result["helden"]["held"][0]);
            console.timeEnd('beowulf');
        });
    });
});

server.get('/lidda',auth,  (req, res)=> {
    console.time('lidda');
    fs.readFile('/home/pi/charakters/LiddaDarben.xml', 'utf8',  (err,data)=> {
        if (err) {
            return console.log(err);
        }
        parseString(data,  (err, result)=> {
            res.send(result["helden"]["held"][0]);
            console.timeEnd('lidda');
        });
    });
});

server.get('/sergio',auth,  (req, res)=> {
    console.time('sergio');
    fs.readFile('/home/pi/charakters/SergioSartanas.xml', 'utf8',  (err,data)=> {
        if (err) {
            return console.log(err);
        }
        parseString(data,  (err, result)=> {
            res.send(result["helden"]["held"][0]);
            console.timeEnd('sergio');
        });
    });
});

server.get('/trollwulf',auth, (req, res)=>{
    console.time('trollwulf');
    fs.readFile('/home/pi/charakters/TrollwulfAnsgarson.xml', 'utf8',  (err,data)=> {
        if (err) {
            return console.log(err);
        }
        parseString(data,(err, result)=>{
            res.send(result["helden"]["held"][0]);
            console.timeEnd('trollwulf');
        });
    });
});

server.get('/ifrit',auth, (req, res)=>{
    console.time('ifrit');
    fs.readFile('/home/pi/charakters/IfritbenHaschmada.xml', 'utf8', (err,data)=>{
        if (err) {
            return console.log(err);
        }
        parseString(data, (err, result)=>{
            res.send(result["helden"]["held"][0]);
            console.timeEnd('ifrit');
        });
    });
});

server.get('/mugrom',auth, (req, res)=>{
    console.time('mugrom');
    fs.readFile('/home/pi/charakters/MugromgroschoJandidid.xml', 'utf8', (err,data)=>{
        if (err) {
            return console.log(err);
        }
        parseString(data, (err, result)=> {
            res.send(result["helden"]["held"][0]);
            console.timeEnd('mugrom');
        });
    });
});

server.get('/sumin',auth, (req, res)=>{
    console.time('sumin');
    fs.readFile('/home/pi/charakters/SuminKomar.xml', 'utf8', (err,data)=>{
        if (err) {
            return console.log(err);
        }
        parseString(data, (err, result)=>{
            res.send(result["helden"]["held"][0]);
            console.timeEnd('sumin');
        });
    });
});

server.get('/all',auth, (req, res)=>{
    console.time('all');
    fs.readdir('/home/pi/charakters/', (err, files) => {
        let all = [];
        files.forEach((file)=> {
            let content = fs.readFileSync("../charakters/"+file, 'utf8')
            parseString(content, (err, result)=>{
                all.push(result["helden"]["held"][0]);
            });
        });
        res.send(all);
        console.timeEnd('all');
    })
});

let httpServer = http.createServer(server);
let httpsServer = https.createServer({
    key: fs.readFileSync('/etc/apache2/ssl-keys/newkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/apache2/ssl-keys/cert.pem', 'utf8')
}, server);

httpServer.listen(3000,()=>{
    console.log('httpServer listening on port 3000!');
});
httpsServer.listen(8083,()=>{
    console.log('httpsServer listening on port 8083!');
})