function openMail(evt, id) {
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  evt.currentTarget.className += ' active';
  document.getElementById(id).style.display = 'block';
}


function openInBox(evt, inbox) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  document.getElementById(inbox).style.display = 'block';
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  evt.currentTarget.className += ' active';
}




function wrapResultWithHtml(text, mailType, fetchResult) {
  document.querySelector('.grid-container').style.display = 'none';
  document.getElementById('displayarea').style.display = 'block';
  let modal = '';
  modal += `<div id=
    "tabcontentDisplayarea"><div class="tab">
      <span class="tablinks active"  onclick="openInBox(event, 'inBox');">${text}</span>
    </div><div class="tabcontent" id="inBox"><div class="mail">
      <div class="displayHeadings"><input type="checkbox" class="check-box-top"> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-refresh"></i> <i class="fa fa-bell" aria-hidden="true"></i> <span class="pagination"><i class="fa fa-arrow-circle-left custom" ></i><i class="fa fa-arrow-circle-right custom" ></i></span></div>`;
  for (let i = 0; i < fetchResult.data.length; i++) {
    modal += `<div class="message ${mailType}"><input type="checkbox" class="check-box"> 
    <span class="mailId" style="display:none;">${fetchResult.data[i].messageid}</span>
    <span class="sender">${fetchResult.data[i].sender}</span>
    <span class="title"><strong>${fetchResult.data[i].subject}</strong></span>
    
    <span class="sendDate">${fetchResult.data[i].createdon}</span>
    </div>`;
  }
  modal += '</div></div></div>';
  document.getElementById('displayarea').innerHTML = modal;
}
