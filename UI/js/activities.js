const createComposeWindow = function (e){
//	if(document.querySelector('.content')[0].style.display === "none" ){
//		document.querySelector('.content')[0].style.display= "block";
//	}
//			document.querySelector('.modal').style.display= "block";

		on();
	let modal = `<div id="myModal" class="modal">
<div class="bar"><button type="button" class="close-btn"><i class="fa fa-close"></i>
</button></div><div id="details"><input type="text" class="to" name="to" placeholder="To"><br><input type="text" class="cc" name="Cc" placeholder="Cc">
<input type="text" name="topic" class="topic" placeholder="Topic">
</div><div id="editor"></div><button type="button" class="save">Save As Draft</button><button type="button" class="send">Send</button></div>`;
modal = document.createRange().createContextualFragment(modal);
document.getElementById('composeWindow').appendChild(modal);
e.target.disabled = true;
var editor = new Quill('#editor', {
		theme: 'snow'
	});
	if (e.target.classList.contains('draftMail')){
	console.log(e.target);
	const mailbody = e.target.querySelector('.mailbody').textContent;
	const mailtitle = e.target.querySelector('.title').textContent;
	const sender = e.target.querySelector('.sender').textContent;
	editor.setText(`${mailbody}\n`);
	document.querySelector('.to').value = sender;
	document.querySelector('.topic').value = mailtitle;
	}
	
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function closeComposeWindow(e) {
	off();
e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	document.getElementById('compose').disabled = false;
}

$('body').on('click', '#compose', createComposeWindow.bind(this));
//$('body').on('click', '#compose', createComposeWindow);
$('body').on('click', '.close-btn', closeComposeWindow);


function createReply() {
	let modal = `<div id="replyModal" class="replymodal">
<div class="bar"><button type="button" class="close-btn-reply"><i class="fa fa-close"></i>
</button></div><div id="details"><input type="text" name="to" placeholder="To"><br><input type="text" name="Cc" placeholder="Cc">
<input type="text" name="topic" placeholder="Topic"></div>
<div class="replyeditor"></div><button type="button" class="send" >Send</button></div>`;
	return modal;
}