const cors = require("cors");
const app = require("express")();
app.use(cors()); //cross-origin-resource-sharing

const http = require("http").createServer(app);
const io = require("socket.io")(http);

//===HELPER-FUNCTION===//
const { addUser, getUser, getUsersOnline, removeUser } = require("./helper");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ Response: "Server is Running" }).status(200);
});

//====SOCKET.IO CONFIG====//
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("login", ({ currentUser, currentChannel }, cb) => {
    const { error, user } = addUser({
      id: socket.id,
      currentUser,
      currentChannel,
    });
    const users = [];

    if (error) return cb(error);

    socket.join(currentChannel); // join currentChannel
    let newuser = getUser(socket.id);
    users.push[newuser.name];
    socket.emit("message", { user: "admin", msg: `Welcome ${currentUser}` });
    socket.broadcast.to(currentChannel).emit("message", {
      user: "admin",
      msg: `${currentUser} joined the Chat`,
    }); // broadcast userJoin to others in currentChannel

    io.to(user.channel).emit("channelUsers", {
      room: user.currentChannel,
      users: getUsersOnline(currentChannel),
    });

    cb();
  });

  socket.on("chat message", (msg) => {
    const user = getUser(socket.id);
    io.to(user.channel).emit("message", {
      user: user.name,
      msg: msg,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.channel).emit("message", {
        user: "admin",
        msg: `${user.name} has left.`,
      });
      io.to(user.channel).emit("channelUsers", {
        room: user.currentChannel,
        users: getUsersOnline(user.channel),
      });
    }
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
