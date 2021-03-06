const createComposeWindow = function (e) {
  on();
  let modal = `<div id="myModal" class="modal">
<div class="bar"><button type="button" class="close-btn">
</button></div><div id="details"><input type="text" class="to" name="to" placeholder="To"><br><input type="text" class="cc" name="Cc" placeholder="Cc">
<input type="text" name="topic" class="topic" placeholder="Topic">
</div><div id="editor"><textarea class="message-compose"></textarea></div><button type="button" class="save">Save As Draft</button><button type="button" class="send">Send</button></div>`;
  modal = document.createRange().createContextualFragment(modal);
  document.getElementById('composeWindow').appendChild(modal);
  e.target.disabled = true;
  if (e.target.classList.contains('draftMail')) {
    console.log(e.target);
    const mailtitle = e.target.querySelector('.title').textContent;
    const sender = e.target.querySelector('.sender').textContent;
    document.querySelector('.to').value = sender;
    document.querySelector('.topic').value = mailtitle;
  }
  document.querySelector('.close-btn').addEventListener('click', closeComposeWindow);
};

function on() {
  document.getElementById('overlay').style.display = 'block';
}

function off() {
  document.getElementById('overlay').style.display = 'none';
}

function closeComposeWindow(e) {
  off();
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
  document.getElementById('compose').disabled = false;
}

document.getElementById('compose').addEventListener('click', createComposeWindow.bind(this));


function createReply() {
  const modal = `<div id="replyModal" class="replymodal">
<div class="bar"><button type="button" class="close-btn-reply">
</button></div><div id="details"><input type="text" name="to" placeholder="To"><br><input type="text" name="Cc" placeholder="Cc">
<input type="text" name="topic" placeholder="Topic"></div>
<div class="replyeditor"><textarea class="message-compose"></textarea></div><button type="button" class="send" >Send</button></div>`;
  return modal;
}
