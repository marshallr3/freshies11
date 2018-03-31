// // var express = require('express');
// // var port = process.env.PORT || 3000;
// // var app = express(),
// // path = require('path'),
// // publicDir = path.join(__dirname,'public');

// // app.use(express.static(publicDir))

// // app.listen(port);
// // module.exports = app;

// var express = require('express');
// var fs = require('fs');
// var port = process.env.PORT || 3000;
// var app = express();
// let path = require('path');
// //console.log(path);
// publicDir = path.join(__dirname,'public');

// app.use(express.static(publicDir))
 
// app.get('/', function(req, res)
// {
//     let html = fs.readFileSync('public/index.html');
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(html);
// });
// // the first request that sends lambda all jobs
// app.get("/all",function(req,res){
//     fs.readFile('public/all.json', 'utf8',function(err, data)
//     {
//     // var json = JSON.parse(data);
//     //console.log(typeof data);
//     //console.log(data);
//     res.end(data);
//     });
// //res.sendfile(path.join(__dirname+"/all.json"));
// });

// app.get("/changeall",function(req,res){
//     fs.readFile('public/all.json', 'utf8',function(err, data)
//     {
//      var json = JSON.parse(data);
//     json.shipments.push(req.query);
//      //console.log(typeof data);
//     //console.log(data);
//     fs.writeFile("public/all.json", JSON.stringify(json), function(err){})
//     res.end("successful change all ");
//     });

    
// //res.sendfile(path.join(__dirname+"/all.json"));
// });

// app.get("/resetall",function(req,res){
//     fs.readFile('public/all.json', 'utf8',function(err, data)
//     {
//      var json = JSON.stringify({"shipments":[{"Location":"Russellville","Depart":"Thursday at 3:30 p.m.","Money":"1.25","Arrive":"Friday at 5:00 a.m.","End":"Fayettville"},{"Location":"Russellville","Depart":"Friday at 9:00 a.m.","Money":"2.5","Arrive":"Friday at 3:00 p.m.","End":"Bentonville"},{"Location":"Springdale","Depart":"Thursday at 4:00 p.m.","Money":"1.75","End":"Houston","Arrive":"Saturday at 8:00 a.m."},{"Location":"Fayetteville","Depart":"Thursday at 7:00 p.m.","Money":".75","End":"Houston","Arrive":"Saturday at 11:00 a.m."}]});
//      //console.log(typeof data);
//     //console.log(data);
//     fs.writeFile("public/all.json", json, function(err){})
//     res.end("successful reset ");
//     });
// });
// // test is the request that gives lambda the accepted jobs
// app.get('/test', function(req, res)
// {
//     fs.readFile('public/accept.json', 'utf8',function(err, data)
//     {
//     // var json = JSON.parse(data);
//     //console.log(typeof data);
//      res.end(data);
//     });
// });
// app.get('/delete', function(req, res)
// {
//   fs.readFile('public/accept.json', 'utf8',function(err, data)
//     {
//     var json = JSON.parse(data);
//     json.ships= [];
//     fs.writeFile("public/accept.json", JSON.stringify(json), function(err){});
//     res.end("successful delete");
//     });
// });

// // accept is the request  that lambda makes to eb to update the accepted jobs json on eb
// app.get('/accept', function(req,res)
// {    
//     fs.readFile("public/accept.json", 'utf8',function (err, data)
//     {
//         //console.log(data);
//         var json = JSON.parse(data);
//         //json.name = Math.random();
//         //console.log(req.query);
//         json.ships.push(req.query);
//         fs.writeFile("public/accept.json", JSON.stringify(json), function(err){});
//         res.end("success");
//     });
// });

// console.log("local running");
// app.listen(port);
// module.exports = app;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});