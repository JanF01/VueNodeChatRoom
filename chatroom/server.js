const Joi = require("joi");
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

var schema = new Joi.object({
  room: Joi.string()
    .min(1)
    .max(35)
    .required(),
  name: Joi.string()
    .min(1)
    .max(25)
    .required(),
});

var rooms = {};

io.on("connection", (socket) => {
  console.log("Connected successfully: " + socket.id);
  var roomId = "";
  var name = "";

  function leaveRoom() {
    rooms[roomId].users.splice(rooms[roomId].users.indexOf(socket.id), 1);
    rooms[roomId].data.push({
      initiator: "Server",
      content: "Server: User " + name + " has disconnected",
    });
    io.in(roomId).emit("chat", rooms[roomId].data);
    socket.leave(roomId);
    if (rooms[roomId].users.length < 1) {
      delete rooms[roomId];
    }
  }

  socket.on("join", (data) => {
    var roomIndex = data.room in rooms;
    if (roomIndex != false) {
      var valid = schema.validate({ room: data.room, name: data.name });
      if (valid.error === null) {
        if (roomId != "") {
          leaveRoom();
        }
        roomId = data.room;
        name = data.name;
        rooms[roomId].users.push(socket.id);
        rooms[roomId].data.push({
          initiator: "Server",
          content: "Server: " + "User " + data.name + " has connected",
        });
        socket.join(roomId);

        io.in(roomId).emit("content", rooms[roomId].data);
      } else {
        socket.emit("wrongData", true);
      }
    }
  });

  socket.on("create", (data) => {
    if (data.room in rooms == false) {
      var valid = schema.validate({ room: data.room, name: data.name });
      if (valid.error === null) {
        console.log(data);
        name = data.name;
        roomId = data.room;
        rooms[data.room] = {
          users: [socket.id],
          data: [],
        };
        rooms[data.room].data.push({
          initiator: "Server",
          content: "Server: " + "User " + data.name + " has connected",
        });
        socket.join(data.room);
        io.in(roomId).emit("content", rooms[roomId].data);
      } else {
        socket.emit("wrongData", true);
      }
    } else {
      socket.emit("nameUsed", true);
    }
  });

  socket.on("message", (data) => {
    rooms[roomId].data.push({
      initiator: "Chat",
      content: name + ": " + data.msg,
    });
    io.in(roomId).emit("chat", rooms[roomId].data);
  });

  socket.on("leave", (data) => {
    leaveRoom();
    socket.emit("left", true);
  });

  socket.on("disconnect", () => {
    if (roomId != "") {
      leaveRoom();
    }
  });

  socket.broadcast.emit();
});
