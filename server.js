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
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
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
let xi = 0;

io.on('connection', function(socket){
    xi++;
    console.log(xi);
    console.log('a user connected');
    fs.appendFileSync('public/database.json', xi, encoding='utf8');
    //fs.writeFile("public/database.json", "xi", function(err){})

});

    
//res.sendfile(path.join(__dirname+"/all.json"));



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
//app.listen(port);