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

$(document).ready(function(){
  $("#createGroup-btn").click(function(){
    $("#createGroup").slideToggle('fast','linear',null);
  });
});

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
	const form = `<div><form id="addUser">
        <input placeholder="search user" type="text" name="searchInput" required autofocus>
<button type="button" id="searchUser-btn" onclick="searchAndCreateAddUserUI(this);"><i class="fas fa-search"></i></button>
		</form><span class="searchResults"></span></div>`;
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
}

document.getElementById('submit-btn').addEventListener('click', createNewGroup);

function toggleAccordion(e) {
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

$('body').on('click', '.grid-item', toggleAccordion);

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
