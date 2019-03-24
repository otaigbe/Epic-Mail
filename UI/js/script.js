"use strict";
function displayModal(){
     document.getElementById("overlay").style.display = "block";
  document.getElementById("forgotPassword").style.display = "block";
}

function closeModal(element){
	document.getElementById("overlay").style.display = "none";
	  document.getElementById("forgotPassword").style.display = "none";
}

function displayForm(){
	console.log("Clicked");
	displayModal();
}


function toggleSlideUpDown(){
if (document.getElementById("createGroup").style.display === "block") {
document.getElementById("createGroup").style.display = "none";
} else {
document.getElementById("createGroup").style.display = "block";
	}
	
}



document.getElementById("createGroup-btn").addEventListener("click", toggleSlideUpDown);

function displayUsers(e){
	document.getElementById('displayarea').innerHTML = `<ul><li>user 1</li><li>user 2</li><li>user 3</li><li>user 4</li><li>user 5</li><li>user 6</li><li>user 7</li></ul>`;
}


function displayGroups(){
const span = document.createElement('span');
	span.setAttribute('class', 'tile');
	const div = document.createElement('div');
	div.setAttribute('class', 'grid-item');
	const textNode = document.createTextNode(groupName);
	const icon = document.createElement('i');
	icon.setAttribute('class', 'fas fa-plus');
	const panel = document.createElement('div');
	panel.setAttribute('class', 'panel');
	div.appendChild(textNode);
	div.appendChild(icon);
	const form = `<form id="addUser">
        <input placeholder="search user" type="text" name="searchInput" required autofocus>
<button type="button" id="searchUser-btn" onclick="searchAndCreateAddUserUI(this);"><i class="fas fa-search"></i></button>
		</form><span class="searchResults"></span>`;
	const elem = document.createRange().createContextualFragment(form);
	panel.appendChild(elem);
	panel.style.display="none";
	span.appendChild(div);
	span.appendChild(panel);

	document.getElementsByClassName('grid-container')[0].appendChild(span);
	document.getElementById('displayarea').style.display = "none";
	document.getElementsByClassName('grid-container')[0].style.display = "grid";
}


document.getElementById("viewGroup-btn").addEventListener("click", displayGroups);


function wrapCreatedGroupInAccordion(groupName){
	const span = document.createElement('span');
	span.setAttribute('class', 'tile');
	const div = document.createElement('div');
	div.setAttribute('class', 'grid-item');
	const textNode = document.createTextNode(groupName);
//	span.setAttribute('class', 'grid-item');
	const icon = document.createElement('i');
	icon.setAttribute('class', 'fas fa-plus');
	const panel = document.createElement('div');
	panel.setAttribute('class', 'panel');
	div.appendChild(textNode);
	div.appendChild(icon);
	const form = `<form id="addUser">
        <input placeholder="search user" type="text" name="searchInput" required autofocus>
<button type="button" id="searchUser-btn" onclick="searchAndCreateAddUserUI(this);"><i class="fas fa-search"></i></button>
		</form><span class="searchResults"></span>`;
	const elem = document.createRange().createContextualFragment(form);
	panel.appendChild(elem);
	panel.style.display="none";
	span.appendChild(div);
	span.appendChild(panel);

	document.getElementsByClassName('grid-container')[0].appendChild(span);
	document.getElementById('displayarea').style.display = "none";
	document.getElementsByClassName('grid-container')[0].style.display = "grid";
}

function createNewGroup(){
  const createGroupForm = document.getElementById('groupForm');
	const formData = new FormData(createGroupForm);
	console.log(formData.get('groupName'));
	wrapCreatedGroupInAccordion(formData.get('groupName'));
	createGroupForm.reset();
	const gridItems = document.getElementsByClassName('grid-item');
for (let i = 0; i<gridItems.length; i++){
	gridItems[i].addEventListener('click', toggleAccordion);
}
}

document.getElementById('submit-btn').addEventListener('click', createNewGroup);

function toggleAccordion(e) {
	// e.target && e.target.className === 'grid-item'
	if(e.target && e.target.matches(".grid-item")){ 
		console.log(e.target);
	const panel = e.target.parentElement.querySelector('.panel');
//	console.log(panel);
	e.target.classList.toggle("active");
	const caret = e.target.parentElement.querySelector('.fas');
	if (panel.style.display === "block") {
				caret.setAttribute('class', 'fas fa-plus');
				panel.style.display = "none";
			} else {
				caret.setAttribute('class', 'fas fa-minus');
				panel.style.display = "block";
			}
	}
	
}


function searchAndCreateAddUserUI(target){
	const form = target.parentElement;
	const formData = new FormData(form);
	const searchParam = formData.get('searchInput');
	console.log(target.parentElement.parentElement);
    // got to database
target.parentElement.parentElement.querySelector('.searchResults').innerHTML = `<button type="button" class="addUser-btn" onclick="addUserToGroup(this);">${searchParam}<span class="check"><i class="fas fa-check"></i></span></button>`;
	form.reset();
}

function addUserToGroup(target){
	console.log(target);
	const username = target.textContent;
}


