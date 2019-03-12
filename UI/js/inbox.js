"use strict";
const viewMessages = function (text, mailType,e){
//	e.stopPropagation();
//	if (document.querySelector('.grid-container').style.display === "block"){
//		document.querySelector('.grid-container').style.display = "none";
//	}
	e.target.parentElement.parentElement.querySelector('.grid-container').style.display = "none";
		document.getElementById('displayarea').style.display = "block";

	console.log(e.target.parentElement.parentElement.querySelector('.grid-container'));
	let modal = ``;
	modal +=`<div id=
"tabcontentDisplayarea"><div class="tab">
  <span class="tablinks active"  onclick="openInBox(event, 'inBox');">${text}<i class="fa fa-close close-tab"></i></span>
</div><div class="tabcontent" id="inBox"><div class="mail">
  <div class="displayHeadings"><input type="checkbox" class="check-box-top"> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-refresh"></i> <i class="fa fa-bell" aria-hidden="true"></i> <span class="pagination"><i class="fa fa-arrow-circle-left custom" ></i><i class="fa fa-arrow-circle-right custom" ></i></span></div>`;
	for (let i=0; i< 10; i++){
modal += `<div class="message ${mailType}"><input type="checkbox" class="check-box"> <span class="mailId">${i}</span>
<span class="title">This is the message title</span>
<span class="title">${new Date()}</span>
</div>`;
}
	modal += `</div></div></div>`;

	document.getElementById('displayarea').innerHTML = modal;
};



const messageDisplayTab = function(button, e){
//	e.stopPropagation();
//	console.log(e);
	const topic = e.target.querySelector('.title').textContent;
//	const sender = e.target.querySelector('.sender').textContent;
//	const mailbody = e.target.querySelector('.mailbody').textContent;
	const mailId =e.target.querySelector('.mailId').textContent;
const mail = {};
	mail.id = mailId;
	mail.topic = topic;
//	mail.sender = sender;
//	mail.body = mailbody;
//console.log(mail);
	const tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
	const id = e.target.querySelector('.mailId').textContent;
	let tabButton = `<span class="tablinks active"  onclick="openMail(event, ${id})">${id}<i class="fa fa-close close-tab"></i></span>`;
	tabButton = document.createRange().createContextualFragment(tabButton);
	document.getElementsByClassName('tab')[0].appendChild(tabButton);
	let tabContent = `<div id=${id} class="tabcontent">
  <h3>${id}</h3><p>{Tokyo is the capital of Japan.}</p><hr>
<div class="reply">
</div>
<div class="replyArea"></div>
${button}
</div>`;
	tabContent = document.createRange().createContextualFragment(tabContent);
	for (let i=0; i < document.getElementsByClassName('tabcontent').length; i++ ) {
		document.getElementsByClassName('tabcontent')[i].style.display = 'none';
	}
document.getElementById('tabcontentDisplayarea').appendChild(tabContent);
console.log(e.currentTarget);
}



function openMail(evt, id){
//	evt.stopPropagation();
	const tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
//console.log('id ' + id);
const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
		evt.currentTarget.className +=" active";
    document.getElementById(id).style.display = 'block';
}


function openInBox(evt, inbox){
	const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
	document.getElementById(inbox).style.display = 'block';
	  const tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
	evt.currentTarget.className +=" active";
}

function createReplySection(evt){
let ui = createReply();
ui = document.createRange().createContextualFragment(ui);
evt.currentTarget.parentElement.querySelector('.replyArea').appendChild(ui);
//document.getElementById('reply').appendChild(ui);
evt.target.disabled= true;
const node = evt.currentTarget.parentElement.querySelector('.replyeditor');
var editor = new Quill(node, {theme: 'snow'});
evt.currentTarget.parentElement.querySelector('.send').addEventListener('click', function(e){
//	console.log(editor.getText());
//e.stopPropagation();
const text = document.createTextNode(editor.getText());
const hr = document.createElement('hr');
const replyButton = e.target.parentElement.querySelector('.close-btn-reply');
const replyArea = e.target.parentElement.parentElement.parentElement.querySelector('.replyArea').appendChild(hr);
e.target.parentElement.parentElement.parentElement.querySelector('.replyArea').appendChild(text);
e.target.parentElement.parentElement.parentElement.querySelector('.replyArea').appendChild(hr);
e.target.parentElement.querySelector('.close-btn-reply').click();
});
}


function closeComposeReplyWindow(e){
//	console.log(e.target);
e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.reply-to-mail-btn').disabled = false;
e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
}

function closeCurrentTab(e){
console.log(e.target);
const activetabContent = e.target.parentElement.parentElement.parentElement.querySelector('.tabcontent[style="display: block;"]');
if (activetabContent.nextElementSibling !== null){
activetabContent.nextElementSibling.style.display = 'block';
e.target.parentElement.nextElementSibling.className = " active";
activetabContent.parentElement.removeChild(activetabContent);
e.target.parentElement.parentElement.removeChild(e.target.parentElement);
	} else if (activetabContent.previousElementSibling !== null && e.target.parentElement.previousElementSibling !== null){
//console.log(activetabContent.previousElementSibling);
activetabContent.previousElementSibling.style.display = 'block';
e.target.parentElement.previousElementSibling.className = " active";
activetabContent.parentElement.removeChild(activetabContent);
e.target.parentElement.parentElement.removeChild(e.target.parentElement);
} else {
activetabContent.parentElement.removeChild(activetabContent);
e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}
}

const deleteMessage = function(e){
const checkBoxes = document.getElementsByClassName('check-box');
const checkedboxes = [];
for (let i=0; i<checkBoxes.length; i++){
if (checkBoxes[i].checked===true){
	checkedboxes.push(checkBoxes[i]); }
}
	if (checkedboxes.length === 0){
	  alert('Select Email(s) to be deleted');
	} else {
	for (let i=0; i<checkedboxes.length; i++){
	checkedboxes[i].parentElement.parentElement.removeChild(checkedboxes[i].parentElement);
		}
	}
		document.getElementsByClassName('check-box-top')[0].checked = false;

};

function cancelProp(e){
	e.stopPropagation();
}

function selectAllCheckboxesForDeletion(e){
	const checkboxes = document.getElementsByClassName('check-box');
	console.log(e.target.checked);
if (e.target.checked === true){
	for (let i=0; i<checkboxes.length; i++){
	checkboxes[i].checked= true;
}
}
if (e.target.checked === false){
	for (let i=0; i<checkboxes.length; i++){
	checkboxes[i].checked= false;
}
}

}


function getNewEmails(){

}


$('body').on('click', '#inbox', viewMessages.bind(this, "Inbox", "receivedMails"));
$('body').on('click', '#draft', viewMessages.bind(this, "Draft", "draftMail"));
$('body').on('click', '.draftMail', createComposeWindow.bind(this));
$('body').on('click', '.receivedMails', messageDisplayTab.bind(this, '<button type="button" onclick="createReplySection(event);" class="reply-to-mail-btn">Reply</button>'));
$('body').on('click', '.close-btn-reply', closeComposeReplyWindow);
$('body').on('click', '.close-tab', closeCurrentTab);
$('body').on('click', '#sent', viewMessages.bind(this, "Sent Mail", "sentMails"));
$('body').on('click', '.sentMails', messageDisplayTab.bind(this, '<button type="button" onclick="retractMail(event);" class="retract-mail-btn">Retract Mail</button>'));
$('body').on('click', '.fa-trash', deleteMessage.bind(this));
$('body').on('click', '.check-box', cancelProp);
$('body').on('click', '.check-box-top', selectAllCheckboxesForDeletion);
$('body').on('click', '.fa-refresh', getNewEmails);
document.getElementById('inbox').click();
