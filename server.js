// 引入第三方套件
const express = require('express');
const socketio = require('socket.io');

// 建立 express server
const app = express();
app.use(express.static(__dirname + '/public'));

// 初始化 socket.io server
const io = socketio(
  // 設定 express server 監聽 9000 port
  app.listen(9000, () => {
    console.log('Server listening on : 9000');
  })
);

io.on('connection', socket => {
  socket.on('message', msg => {
    console.log(msg);
    io.emit('messageFromServer', { text: msg.text, id: msg.id });
  });
});
