(function() {
  const socket = io('http://localhost:9000');

  socket.on('connect', () => {
    console.log('已連接 socket.io server!');
    setSocketEvent();
    $('.chat__text').keypress(sendTextByKeyboard);
    $('.chat__send').on('click', sendTextToServer);
  });

  function sendTextByKeyboard(e) {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      sendTextToServer();
    }
  }

  function sendTextToServer() {
    const textValue = $('.chat__text').val();
    if (textValue.trim() === '') return;
    socket.emit('message', {
      text: textValue,
      id: socket.id
    });
    appendChatBox('my-chat', textValue);
    $('.chat__text').val('');
  }

  function setSocketEvent() {
    socket.on('messageFromServer', msg => {
      if (msg.id !== socket.id) {
        appendChatBox('others-chat', msg.text);
      }
    });
  }

  function appendChatBox(cl, text) {
    const chatMsg = `<li class="${cl}"><span>${text}</span></li>`;
    $('.chat__box').append(chatMsg);
  }
})();
