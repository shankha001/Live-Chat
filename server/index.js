var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ Response: 'Server is Running' }).status(200);
});

//====SOCKET.IO CONFIG====//
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
