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
    <span class="mailId" style="display:none;">${i}</span>
    <span class="sender">${fetchResult.data[i].sender}</span>
    <span class="title"><strong>${fetchResult.data[i].subject}</strong></span>
    
    <span class="sendDate">${fetchResult.data[i].createdon}</span>
    </div>`;
  }
  modal += '</div></div></div>';
  document.getElementById('displayarea').innerHTML = modal;
}
