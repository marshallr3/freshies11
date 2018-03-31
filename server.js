// var express = require('express');
// var port = process.env.PORT || 3000;
// var app = express(),
// path = require('path'),
// publicDir = path.join(__dirname,'public');

// app.use(express.static(publicDir))

// app.listen(port);
// module.exports = app;

var express = require('express');
var app = express();
var http=require('http');
var server = http.createServer(function(req,res){
    res.end('test');
}); 
var io = require('socket.io')(server);
var fs = require('fs');
var port = process.env.PORT || 3000;
let path = require('path');
//console.log(path);
publicDir = path.join(__dirname,'public');

app.use(express.static(publicDir))
 
app.get('/', function(req, res)
{
    let html = fs.readFileSync('public/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});
// the first request that sends lambda all jobs
app.get("/all",function(req,res){
    fs.readFile('public/all.json', 'utf8',function(err, data)
    {
    // var json = JSON.parse(data);
    //console.log(typeof data);
    //console.log(data);
    res.end(data);
    });
//res.sendfile(path.join(__dirname+"/all.json"));
});

// io.on('connection', function(socket){
  
//     fs.writeFile("public/database.json", "this works", function(err){})

// });

app.get("/changeall",function(req,res){
    fs.readFile('public/all.json', 'utf8',function(err, data)
    {
     var json = JSON.parse(data);
    json.shipments.push(req.query);
     //console.log(typeof data);
    //console.log(data);
    fs.writeFile("public/all.json", JSON.stringify(json), function(err){})
    res.end("successful change all ");
    });

    
//res.sendfile(path.join(__dirname+"/all.json"));
});


// accept is the request  that lambda makes to eb to update the accepted jobs json on eb
app.get('/accept', function(req,res)
{    
    fs.readFile("public/accept.json", 'utf8',function (err, data)
    {console.log('a user connected');
        //console.log(data);
        var json = JSON.parse(data);
        //json.name = Math.random();
        //console.log(req.query);
        json.ships.push(req.query);
        fs.writeFile("public/accept.json", JSON.stringify(json), function(err){});
        res.end("success");
    });
});
console.log("local running");

server.on('listening',function(){
    console.log('ok, server is running');
});
server.listen(port);
// server.listen(3000, function(){
//     console.log('listening on *:3000');
//   });
app.listen(port);