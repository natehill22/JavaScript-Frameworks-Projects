var express = require('express'); //Imports express module which simplifies the process of building web servers and APIs
var app = express(); 

//Starting our server instance around our express configuration
var server = require('http').createServer(app);

//Defines a listener for get requests hitting ht home path (/, the starting page of the app)
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

//Serves files from the client directory and makes them accessible via url prefix
app.use('/client', express.static(__dirname + '/client'));

console.log("Server started."); //Prints status message to console


SOCKET_LIST = {}; //Defines an empty object to hold all the users joining the chat

var io = require('socket.io')(server); //Imports the socket.io module wrapped in the express server
//When a socket connects, functions are defined based on events or string the socket receives 
io.sockets.on('connection', function(socket){
    console.log('new user!');
    var socketId = Math.random(); //Generate a random id when user connects
    SOCKET_LIST[socketId] = socket; //Adds this id to the socket list
    
    //When sendMsgToServer event occurs, loop through socket list and send a message to every connected socket
    socket.on('sendMsgToServer', function(data){
        console.log('someone sent a message!');
        for (var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', data);
        }
    });

    //When socket disconnects remove them from our socket list
    socket.on('disconnect', function(){
        delete SOCKET_LIST[socketId];
    });
});

//App listens on port 4141
server.listen(4141);

