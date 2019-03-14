"use strict";
const viewMessages = function (text, mailType, email, looptotal, e){
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
	for (let i=0; i< looptotal; i++){
modal += `<div class="message ${mailType}"><input type="checkbox" class="check-box"> 
<span class="mailId" style="display:none;">${i}</span>
<span class="sender">${email}</span>
<span class="title"><strong>The message title ${i}</strong></span>

<span class="sendDate">${getCurrentTimeOfDay()}</span>
</div>`;
}
	modal += `</div></div></div>`;
	document.getElementById('displayarea').innerHTML = modal;
	addEventByClassName("receivedMails", messageDisplayTab.bind(this, '<button type="button" onclick="createReplySection(event);" class="reply-to-mail-btn">Reply</button>'));
	addEventByClassName("draftMail", createComposeWindow.bind(this));
//	$('body').on('click', '.close-btn-reply', closeComposeReplyWindow);
//	document.querySelector(".close-tab", closeCurrentTab);
	addEventByClassName("sentMails", messageDisplayTab.bind(this, '<button type="button" onclick="retractMail(event);" class="retract-mail-btn">Retract Mail</button>'));
	document.querySelector(".fa-trash").addEventListener("click", deleteMessage.bind(this));
	document.querySelector(".check-box").addEventListener("click", cancelProp);
	document.querySelector(".check-box-top").addEventListener("click", selectAllCheckboxesForDeletion);
};

function getCurrentTimeOfDay(){
	const date = new Date();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	return `${hour}:${minutes}`;
}

function addEventByClassName(className,custombindedFunction){
	const receivedMails = document.getElementsByClassName(className);
	for (let i=0; i< receivedMails.length; i++){
		receivedMails[i].addEventListener("click", custombindedFunction);
	}
}

function searchForIdInClassList(classes, element){
	const classArray = classes.split(" ");
	console.log(classArray);
parentElement.parentElement.parentElement.querySelectorAll('.tabcontent')
}

function findTabWithStyleAttribute(element){
const allTabAreas = document.querySelectorAll('.tabcontent');
	for (let i = 0; i< allTabAreas.length; i++){
//		if (allTabAreas[i].getAttribute('style'))
		console.log(allTabAreas[i].style.cssText);
	}
}


function closeCurrentTab(e){
const activetabContent = e.target.parentElement.parentElement.parentElement.querySelector('.tabcontent[style="display: block;"]');
if (activetabContent.nextElementSibling !== null){
activetabContent.nextElementSibling.style.display = 'block';
e.target.parentElement.nextElementSibling.className += " active";
activetabContent.parentElement.removeChild(activetabContent);
e.target.parentElement.parentElement.removeChild(e.target.parentElement);
	} else if (activetabContent.previousElementSibling !== null && e.target.parentElement.previousElementSibling !== null){
//console.log(activetabContent.previousElementSibling);
activetabContent.previousElementSibling.style.display = 'block';
e.target.parentElement.previousElementSibling.className += " active";
activetabContent.parentElement.removeChild(activetabContent);
e.target.parentElement.parentElement.removeChild(e.target.parentElement);
} else {
activetabContent.parentElement.removeChild(activetabContent);
e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}
}


const messageDisplayTab = function(button, e){
//	console.log(e);
	const topic = e.target.querySelector('.title').textContent;
	const sender = e.target.querySelector('.sender').textContent;
//	const mailbody = e.target.querySelector('.mailbody').textContent;
	const mailId =e.target.querySelector('.mailId').textContent;
const mail = {};
	mail.id = mailId;
//	mail.topic = topic;
//	mail.sender = sender;
//	mail.body = mailbody;
//console.log(mail);
	const tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
	const id = e.target.querySelector('.mailId').textContent;
	let tabButton = `<span class="tablinks active ${id}"  onclick="openMail(event, '${id}')">${topic}<i class="fa fa-close close-tab"></i></span>`;
	tabButton = document.createRange().createContextualFragment(tabButton);
	document.getElementsByClassName('tab')[0].appendChild(tabButton);
	let tabContent = `<div id=${id} class="tabcontent ${id}"><p>{Tokyo is the capital of Japan.}</p><hr>
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
//		addEventByClassName("close-tab", closeCurrentTab);

}





function closeComposeReplyWindow(e){
//	console.log(e.target);
e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.reply-to-mail-btn').disabled = false;
e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
}





function openMail(evt, id){
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
const text = document.createTextNode(editor.getText());
const hr = document.createElement('hr');
const replyButton = e.target.parentElement.querySelector('.close-btn-reply');
const replyArea = e.target.parentElement.parentElement.parentElement.querySelector('.replyArea').appendChild(hr);
e.target.parentElement.parentElement.parentElement.querySelector('.replyArea').appendChild(text);
e.target.parentElement.parentElement.parentElement.querySelector('.replyArea').appendChild(hr);
e.target.parentElement.querySelector('.close-btn-reply').click();
});
	
const body = document.querySelector("body");
body.querySelector('.close-btn-reply').addEventListener("click", closeComposeReplyWindow);	
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


document.getElementById("inbox").addEventListener("click", viewMessages.bind(this, "Inbox", "receivedMails", "me@epicmail.com",10));
document.getElementById("draft").addEventListener("click", viewMessages.bind(this, "Draft", "draftMail", "Draft", 4));
$('body').on('click', '.close-tab', closeCurrentTab);
document.getElementById('sent').addEventListener("click", viewMessages.bind(this, "Sent Mail", "sentMails","them@epicmail.com",7));
document.getElementById('inbox').click();
