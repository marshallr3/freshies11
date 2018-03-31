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

// io.on('connection', function(socket){
//     xi++;
//     console.log(xi);
//     console.log('a user connected');
//     fs.appendFileSync('public/database.json', xi, encoding='utf8');
//     //fs.writeFile("public/database.json", "xi", function(err){})

// });

// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//     });
//   });

//res.sendfile(path.join(__dirname+"/all.json"));
app.get('/test', function(req, res)
{
    fs.readFile('public/accept.json', 'utf8',function(err, data)
    {
    // var json = JSON.parse(data);
    //console.log(typeof data);
    io.emit('chat message' , msg);
     res.end(data);
    });
});
var value = 0;
function validation(x)
{

 fs.readFile('public/database.json', 'utf8', function(err, data)
    {
       var json1 = JSON.parse(data); 
       //console.log(json);
       for (i=0; i < json1.license.length; i++)
       {
           console.log(json1.license[i].plate)
           console.log("x.plate= " + x.plate)
           if (x.plate == json1.license[i].plate)
           {
               console.log("is equal");
               return true;
           }

       }
       return false;


       //return "false";
    });
    // console.log(value);
    // if (value)
    // {
    //     return "true";
    // }
    // elseeturn true;
    // {
    //     return "false";
    // }
}


// accept is the request  that lambda makes to eb to update the accepted jobs json on eb
app.get('/accept', function(req,res)
{    
    fs.readFile("public/accept.json", 'utf8',function (err, data)
    {
        //console.log(data);
        var json = JSON.parse(data);
      // console.log(json);
        //json.name = Math.random();
        // console.log(req.query);
       // json(req.query);
        fs.writeFile("public/accept.json", JSON.stringify(req.query), function(err){});
       // console.log("validation: " + validation(req.query));
       const sendData = (data) => {
        res.end(JSON.stringify(data));
    } 
        fs.readFile('public/database.json', 'utf8', function(err, data)
    {
       var json1 = JSON.parse(data); 
       //console.log(json);
       let dep = 0;
       for (i=0; i < json1.license.length; i++)
       {
           console.log(json1.license[i].plate)
           console.log("x.plate= " + req.query.plate)
           if (req.query.plate == json1.license[i].plate){

               console.log("is equal");
               if (req.query.lot == json1.license[i].lot)
               {
                 io.emit('chat message' , JSON.stringify({plate: req.query.plate, valid: "true", lot:req.query.lot, msg: "In Correct Lot" }));
                   sendData({valid: "true", msg:"In Correct Lot"});
                   dep = 1;
                   break;
               }
               else
               {
                io.emit('chat message' , JSON.stringify({plate: req.query.plate, valid: "false", lot:req.query.lot, msg: "Not In Correct Lot" }));
                   sendData({valid: "false", msg:"Not in correct lot"});
                   dep = 1;
                   break;
               }
           }

       }
       if (dep == 0){
       io.emit('chat message' , JSON.stringify({plate: req.query.plate, valid: "false", lot:req.query.lot, msg: "Not Found In Database" }));       
       sendData({valid :"false",msg:"Not in DB"});
       }


       //return "false";
    });
        //res.end(JSON.stringify({ valid : validation(req.query) }));
        //res.end("fuck");
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