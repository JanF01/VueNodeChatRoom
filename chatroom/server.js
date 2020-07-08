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
    console.log(data);
    roomId = data.roomId;
    name = data.name;
  });

  socket.broadcast.emit();
});
