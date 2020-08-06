const cors = require('cors');

const app = require('express')();
app.use(cors()); //cross-origin-resource-sharing

const http = require('http').createServer(app);
const io = require('socket.io')(http);

//===HELPER-FUNCTION===//
const { addUser } = require('./helper');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ Response: 'Server is Running' }).status(200);
});

//====SOCKET.IO CONFIG====//
io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('login', ({ currentUser, currentChannel }, cb) => {
    // console.log(currentChannel);
    // console.log(currentUser);
    const { error, user } = addUser({
      id: socket.id,
      currentUser,
      currentChannel,
    });

    if (error) return cb(error);

    socket.emit('message', { user: 'admin', text: 'welcome' });
    socket.broadcast
      .to(user.currentChannel)
      .emit('message', { user: 'admin', text: 'user joiner' });
    socket.join(user.currentChannel);
    cb();
  });

  socket.on('chat message', (msg) => {
    console.log('message:' + msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
