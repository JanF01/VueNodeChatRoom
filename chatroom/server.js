const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
const http = require("http").Server(app);

const io = require("socket.io")(http);

http.listen(port);

app.use(morgan("tiny"));
app.use(bodyParser.json());

var rooms = {};

io.on("connection", (socket) => {
  console.log("Connected successfully: " + socket.id);
  var roomId = "";
  var name = "";

  socket.on("join", (data) => {
    var roomIndex = data.room in rooms;
    if (roomIndex != false) {
      if (roomId != "") {
        rooms[roomId].users.splice(rooms[roomId].users.indexOf(socket.id), 1)
        socket.leave(roomId);
      }
      roomId = data.room;
      name = data.name;
      rooms[roomId].users.push(socket.id);
      rooms[roomId].data.push("Server: " + "User " + data.name + " has connected");
      socket.join(roomId);

      io.in(roomId).emit("content", rooms[roomId].data)

    }

  });

  socket.on("create", (data) => {
    if (data.room in rooms == false) {
      console.log(data);
      name = data.name;
      roomId = data.room;
      rooms[data.room] = {
        users: [socket.id],
        data: []
      };
      rooms[data.room].data.push("Server: " + "User " + data.name + " has connected")
      socket.join(data.room);
      io.in(roomId).emit("content", rooms[roomId].data)
    }
  });

  socket.on("message", (data)=>{
    rooms[roomId].data.push(name + ": " + data.msg);
    io.in(roomId).emit("content", rooms[roomId].data)
  })

  socket.on("disconnect", () => {
    if (roomId != "") {
      rooms[roomId].users.splice(rooms[roomId].users.indexOf(name), 1)
      if (rooms[roomId].users.length < 1) {
        delete rooms[roomId];
      }
      socket.leave(roomId);
    }
  })

  socket.broadcast.emit();
});