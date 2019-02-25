function viewInbox(e){
	let modal = ``;
	modal +=`<div class="mail">
  <div class="displayHeadings"><input type="checkbox" class="check-box"> <i class="fa fa-refresh"></i> <i class="fa fa-bell" aria-hidden="true"></i> <span class="pagination"><i class="fa fa-arrow-circle-left custom" ></i><i class="fa fa-arrow-circle-right custom" ></i></span></div>`;
	for (let i=0; i< 10; i++){
		modal += `<div class="message"><input type="checkbox" class="check-box"> <span class="sender">'{sender}'</span>
<span class="title">'{title}'</span> <span class="sendDate">'{date}'</span>
</div>`
	}
	
	modal += `</div>`;
	document.getElementById('displayarea').innerHTML = modal;
}



$('body').on('click', '#inbox', viewInbox);
