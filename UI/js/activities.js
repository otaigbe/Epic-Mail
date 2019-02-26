function createComposeWindow(e){
	let modal = `<div id="myModal" class="modal">
<div id="bar"><button type="button" class="close-btn"><i class="fa fa-close"></i>
</button></div><div id="details"><input type="text" name="to" placeholder="To"><br><input type="text" name="Cc" placeholder="Cc">
<input type="text" name="topic" placeholder="Topic">
</div><div id="editor"></div><button type="button" class="save">Save As Draft</button><button type="button" class="send">Send</button></div>`;
	modal = document.createRange().createContextualFragment(modal);
   document.getElementById('composeWindow').appendChild(modal);
	e.target.disabled= true;
var editor = new Quill('#editor', {theme: 'snow'});
}

function closeComposeWindow(e){
e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
document.getElementById('compose').disabled = false;
}



$('body').on('click', '#compose', createComposeWindow);
$('body').on('click', '.close-btn', closeComposeWindow);

function createReply(){
	let modal = `<div id="replyModal" class="replymodal">
<div id="bar"><button type="button" class="close-btn-reply"><i class="fa fa-close"></i>
</button></div><div id="details"><input type="text" name="to" placeholder="To"><br><input type="text" name="Cc" placeholder="Cc">
<input type="text" name="topic" placeholder="Topic"></div>
<div class="replyeditor"></div><button type="button" class="replysend" >Send</button></div>`;
	return modal;
}