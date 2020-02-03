(function() {
  const socket = io('http://localhost:9000');

  $(function() {
    setSocketEvent();

    $('.chat__text').keypress(function(e) {
      const code = e.keyCode ? e.keyCode : e.which;
      if (code == 13) {
        $('.chat__send').click();
      }
    });

    $('.chat__send').on('click', sendTextToServer);
  });

  function sendTextToServer() {
    const textValue = $('.chat__text').val();
    socket.emit('message', { text: textValue });
    $('.chat__text').val('');
  }

  function setSocketEvent() {
    socket.on('connect', () => {
      console.log('已連接 socket.io server!');
    });

    socket.on('welcome', msg => {
      console.log(msg.text);
    });

    socket.on('messageFromServer', msg => {
      const chatMsg = '<li>' + msg.text + '</li>';
      $('.chat__box').append(chatMsg);
    });
  }
})();
