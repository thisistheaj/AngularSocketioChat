var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + JSON.stringify(msg));
    io.emit('chat message ' + msg.recipient, msg);
    // io.emit('chat message', msg);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
