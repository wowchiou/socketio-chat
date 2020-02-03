const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000, () => {
  console.log('Server listening on : 9000');
});

const io = socketio(expressServer);

io.on('connection', socket => {
  socket.emit('welcome', { text: '歡迎來到 socket.io server!' });

  socket.on('message', msg => {
    console.log(msg);
    io.emit('messageFromServer', { text: msg.text, id: msg.id });
  });
});
