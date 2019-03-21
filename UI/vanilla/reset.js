function sendToServer() {
  const urlArgs = new URLSearchParams(window.location.search);
  const token = urlArgs.get('token');
  console.log(token);
}


document.getElementById('request-submit').addEventListener('click', sendToServer);