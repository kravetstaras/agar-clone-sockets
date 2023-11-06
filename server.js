const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const socketIo = require('socket.io');
const io = socketIo(expressServer);

module.exports = {
  app,
  io,
};
