function handleListener(data) {
  switch (data.type) {
    case 'READY':
      handleSend({
        type: 'INITIAL_DATA',
        message: localStorage.getItem('options')
      });
      break;
    case 'CLOSE':
      {
        const iframe = document.getElementById('flam-sdk-iframe');
        iframe.style.display = 'none';
      }
      break;
    case 'SUCCESS':
      window.successHandler(JSON.parse(data.message));
      break;
    case 'FAIL':
      window.failHandler(data.message);
      break;
    default:
      console.log(data);
  }
}

const handleSend = message => {
  const iframe = document.getElementById('flam-sdk-iframe');
  iframe.contentWindow.postMessage(message, 'http://localhost:3000/');
};

export { handleListener, handleSend };