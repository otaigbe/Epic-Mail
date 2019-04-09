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
    modal += `<div class="message ${mailType}"><input type="checkbox" class="check-box">`;
    if (text === 'Inbox') {
      if (fetchResult.data[i].status === 'unread') {
        modal += '<i class="fas fa-envelope tooltip"><span class="tooltiptext">Unread</span></i>';
      }
      if (fetchResult.data[i].status === 'read') {
        modal += '<i class="fas fa-envelope-open tooltip"><span class="tooltiptext">read</span></i>';
      }
    }
    if (fetchResult.data[i].status === 'draft') {
      modal += '<i class="fas fa-pencil-alt tooltip"><span class="tooltiptext">draft</span></i>';
    }
    modal += `<span class="mailId" style="display:none;">${fetchResult.data[i].messageid}</span>
    <span class="sender">${fetchResult.data[i].sender}</span>
    <span class="title"><strong>${fetchResult.data[i].subject}</strong></span>
    <span class="sendDate">${fetchResult.data[i].createdon}</span>`;
    modal += '</div>';
  }
  modal += '</div></div></div>';
  document.getElementById('displayarea').innerHTML = modal;
}

async function wrapInAccordion(fetchResult) {
  let groupHtml = '<span id="reply"><h2>Groups</h2></span>';
  for (let i = 0; i < fetchResult.data.length; i++) {
    const span = document.createElement('span');
    span.setAttribute('class', 'tile');
    span.classList.add(fetchResult.data[i].groupname);
    const div = document.createElement('div');
    div.setAttribute('class', 'grid-item');
    const textNode = document.createTextNode(fetchResult.data[i].groupname);
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-plus');
    const iconSend = document.createElement('i');
    iconSend.setAttribute('class', 'fas fa-send');
    // const iconDelete = document.createElement('i');
    const spanDeleteWrapper = document.createElement('span');
    spanDeleteWrapper.setAttribute('class', 'material-icons');
    const textIcon = document.createTextNode('delete');
    spanDeleteWrapper.appendChild(textIcon);
    const iconRight = document.createElement('i');
    iconRight.setAttribute('class', 'fas fa-angle-right');
    const panel = document.createElement('div');
    panel.setAttribute('class', 'panel');
    const spanForId = document.createElement('span');
    spanForId.setAttribute('class', 'groupId');
    const textNodeForGroup = document.createTextNode(fetchResult.data[i].groupid);
    spanForId.setAttribute('style', 'display:none;');
    div.appendChild(textNode);
    div.appendChild(icon);
    div.appendChild(iconSend);
    // spanDeleteWrapper.appendChild(iconDelete);
    div.appendChild(spanDeleteWrapper);
    div.appendChild(iconRight);
    spanForId.appendChild(textNodeForGroup);
    div.appendChild(spanForId);
    
    // const form = `<form id="addUser">
    //       <input placeholder="search user" type="text" name="searchInput" required autofocus>
    //       <button type="button" id="searchUser-btn" onclick="searchAndCreateAddUserUI(this);"><i class="fas fa-search"></i></button>
    //       </form><span class="searchResults"></span>`;
    // const elem = document.createRange().createContextualFragment(form);
    // panel.appendChild(elem);
    panel.style.display = 'none';
    span.appendChild(div);
    span.appendChild(panel);
    groupHtml += span.innerHTML;
    document.getElementById('displayarea').style.display = 'none';
    document.getElementsByClassName('grid-container')[0].style.display = 'grid';
  }
  document.getElementsByClassName('grid-container')[0].innerHTML = groupHtml;
  document.getElementsByClassName('grid-container')[0].style.display = 'grid';
  document.getElementById('displayarea').style.display = 'none';
}



