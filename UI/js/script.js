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