const snackBar = () => {
  const x = document.getElementById('snackbar');
  x.className = 'show';
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
};

const getAllReceivedMessages = async (token, e, tablename) => {
  const baseUrl = '/api/v1/messages';
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    document.querySelector('.inbox-count').innerHTML = fetchResult.data.length;
    if (typeof fetchResult.data.length === 'undefined') {
      document.querySelector('.inbox-count').innerHTML = 0;
      document.getElementById('snackbar').innerHTML = fetchResult.message;
      snackBar();
    }
    wrapResultWithHtml('Inbox', 'receivedMails', fetchResult);
    document.getElementById('snackbar').innerHTML = fetchResult.message;
    snackBar();
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    document.getElementById('display-message').style.color = 'red';
    document.getElementById('display-message').innerHTML = fetchResult.error.message;
  }
};

const convertFormDataToJson = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return JSON.stringify(object);
};

const getAllSentMessages = async (token, e) => {
  const baseUrl = '/api/v1/messages/sent';
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    if (typeof fetchResult.data.length === 'undefined') {
      document.querySelector('.sent-count').innerHTML = 0;
      document.getElementById('snackbar').innerHTML = fetchResult.message;
      snackBar();
    }
    wrapResultWithHtml('Sent Mails', 'sentMails', fetchResult);
    document.getElementById('snackbar').innerHTML = fetchResult.message;
    snackBar();
  }
};


const messageDisplayTab = async (e, button, token) => {
  const id = e.target.querySelector('.mailId').textContent;
  const baseUrl = `/api/v1/messages/${Number(id)}`;
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  console.log(fetchResult);
  if (fetchResult.status === 'Success') {
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    let tabButton = `<span class="tablinks active ${id}"  onclick="openMail(event, '${id}')">${fetchResult.data.subject}<i class="fa fa-close close-tab" ></i></span>`;
    tabButton = document.createRange().createContextualFragment(tabButton);
    document.getElementsByClassName('tab')[0].appendChild(tabButton);
    let tabContent = `<div id=${id} class="tabcontent ${id}"><p>${fetchResult.data.messagebody}</p><hr><div class="reply"></div><div class="replyArea"></div>
                      ${button}</div>`;
    tabContent = document.createRange().createContextualFragment(tabContent);
    for (let i = 0; i < document.getElementsByClassName('tabcontent').length; i++) {
      document.getElementsByClassName('tabcontent')[i].style.display = 'none';
    }
    document.getElementById('tabcontentDisplayarea').appendChild(tabContent);
  }
};


const closeCurrentTab = (e) => {
  const activetabContent = e.target.parentElement.parentElement.parentElement.querySelector('.tabcontent[style="display: block;"]');
  if (activetabContent.nextElementSibling !== null) {
    activetabContent.nextElementSibling.style.display = 'block';
    e.target.parentElement.nextElementSibling.className += ' active';
    activetabContent.parentElement.removeChild(activetabContent);
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
  } else if (activetabContent.previousElementSibling !== null && e.target.parentElement.previousElementSibling !== null) {
    activetabContent.previousElementSibling.style.display = 'block';
    e.target.parentElement.previousElementSibling.className += ' active';
    activetabContent.parentElement.removeChild(activetabContent);
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
  } else {
    activetabContent.parentElement.removeChild(activetabContent);
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
  }
};

const on = () => {
  document.getElementById('overlay').style.display = 'block';
};

const off = () => {
  document.getElementById('overlay').style.display = 'none';
};

const closeComposeWindow = (e) => {
  off();
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
  document.getElementById('compose').disabled = false;
};


const createComposeWindow = (e, fetchResult) => {
  on();
  let modal = `<div id="myModal" class="modal">
<div class="bar"><button type="button" class="close-btn">
</button></div>
<form id="create-message">
<div id="details">
<input type="text" class="to" name="receiver" placeholder="To"><br>
<input type="text" name="subject" class="topic" placeholder="Subject">
</div>
<textarea class="message-compose"></textarea>
</form>
<button type="button" class="save">Save As Draft</button>
<button type="button" class="send">Send</button></div>`;
  modal = document.createRange().createContextualFragment(modal);
  document.getElementById('composeWindow').appendChild(modal);
  e.target.disabled = true;
  if (e.target.classList.contains('draftMail')) {
    document.querySelector('.to').value = fetchResult.data.receiver;
    document.querySelector('.topic').value = fetchResult.data.subject;
    document.querySelector('.message-compose').value = fetchResult.data.messagebody;
  }
  document.querySelector('.close-btn').addEventListener('click', closeComposeWindow);
};

const sendMail = async (e, token) => {
  const form = e.target.parentElement.querySelector('#create-message');
  const messagebody = e.target.parentElement.querySelector('.message-compose').value;
  let formdata = new FormData(form);
  formdata.append('message', messagebody);
  formdata = convertFormDataToJson(formdata);
  const baseUrl = '/api/v1/messages';
  const fetchResult = await customFetchWithBody(baseUrl, 'POST', token, JSON.parse(formdata));
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};

const getAllGroups = async (e, token) => {
  const baseUrl = '/api/v1/groups';
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    if (typeof fetchResult.data.length === 'undefined') {
      document.querySelector('.group-count').innerHTML = 0;
      document.getElementById('snackbar').innerHTML = 'You haven\'t created any groups';
      snackBar();
    }
    wrapInAccordion(fetchResult);
    document.getElementById('snackbar').innerHTML = fetchResult.message;
    snackBar();
  }
};


const wrapResultInListTags = (fetchResult) => {
  console.log(fetchResult);
  let html = '<ul class="groupMembers">';
  for (let i = 0; i < fetchResult.data.length; i++) {
    html += `<li data-userid=${fetchResult.data[i].userid} data-groupid=${fetchResult.data[i].groupid}><span>${fetchResult.data[i].username}</span><i class="fas fa-trash-alt"></i></li>`;
  }
  html += '</ul>';
  return html;
};


const getAllGroupMembers = async (e, token, id) => {
  const baseUrl = `/api/v1/groups/${Number(id)}/members`;
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    const html = wrapResultInListTags(fetchResult);
    return html;
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};

const toggleAccordion = async (e, token) => {
  const panel = e.target.nextElementSibling;
  e.target.classList.toggle('active');
  let caret = e.target.querySelector('.fa-angle-right');
  if (panel.style.display === 'block') {
    caret = e.target.querySelector('.fa-angle-down');
    caret.setAttribute('class', 'fas fa-angle-right');
    panel.style.display = 'none';
  } else {
    caret.setAttribute('class', 'fas fa-angle-down');
    panel.style.display = 'block';
  }
  const id = e.target.querySelector('.groupId').textContent.trim();
  const html = await getAllGroupMembers(e, token, id);
  panel.innerHTML = html;
};

const toggleSlideUpDown = () => {
  if (document.getElementById('createGroup').style.display === 'block') {
    document.getElementById('createGroup').style.display = 'none';
  } else {
    document.getElementById('createGroup').style.display = 'block';
  }
};

const createGroup = async (e, token) => {
  const baseUrl = '/api/v1/groups';
  const form = document.getElementById('groupForm');
  let formData = new FormData(form);
  formData = convertFormDataToJson(formData);
  const fetchResult = await customFetchWithBody(baseUrl, 'POST', token, JSON.parse(formData));
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    document.getElementById('viewGroup-btn').click();
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};

const selectAllCheckboxesForDeletion = (e) => {
  const checkboxes = document.getElementsByClassName('check-box');
  console.log(e.target.checked);
  if (e.target.checked === true) {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
  }
  if (e.target.checked === false) {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }
};


const deleteMessages = (token) => {
  const selectedMessages = document.getElementsByClassName('check-box');
  let messagesToBeDeleted = Array.from(selectedMessages);
  const messageIds = [];
  messagesToBeDeleted = messagesToBeDeleted.filter((node) => {
    if (node.checked === true) {
      const messageId = node.parentElement.querySelector('.mailId').textContent.trim();
      messageIds.push(messageId);
      node.parentElement.parentElement.removeChild(node.parentElement);
      return messageId;
    }
  });
  if (messageIds.length === 0) {
    alert('Select the message(s) you want to delete');
  }
  console.log(messageIds);
  let fetchResult;
  messageIds.map(async (currentValue) => {
    const url = `/api/v1/messages/${Number(currentValue)}`;
    fetchResult = await customFetch(url, 'DELETE', token);
    if (fetchResult.status === 'Success') {
      console.log(fetchResult);
      snackBar();
    }
    if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
      console.log(fetchResult);
    }
  });
};


const saveMessageAsDraft = async (e, token) => {
  const form = e.target.parentElement.querySelector('#create-message');
  const messagebody = e.target.parentElement.querySelector('.message-compose').value;
  let formdata = new FormData(form);
  formdata.append('message', messagebody);
  formdata = convertFormDataToJson(formdata);
  const baseUrl = '/api/v1/messages/draft';
  const fetchResult = await customFetchWithBody(baseUrl, 'POST', token, JSON.parse(formdata));
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    document.getElementById('snackbar').innerHTML = 'Message saved as Draft';
    snackBar();
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};

const getAllDraftMessages = async (e, token) => {
  const baseUrl = '/api/v1/messages/draft';
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    wrapResultWithHtml('Draft', 'draftMail', fetchResult);
    document.getElementById('snackbar').innerHTML = fetchResult.message;
    snackBar();
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};


const getDraftMessageById = async (e, token) => {
  const id = e.target.querySelector('.mailId').textContent.trim();
  const baseUrl = `/api/v1/messages/draft/${Number(id)}`;
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    createComposeWindow(e, fetchResult);
    
  }
};


const closeMemberModal = (e) => {
  off();
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
};


const createSearchForm = (e) => {
  const groupId = e.target.parentElement.querySelector('.groupId').textContent.trim();
  on();
  let modal = `<div id="memberModal" class="memberarea"><div class="bar"><button type="button" class="close-btn"></button>
  </div><form id="member-search-form"><div id="details"><span class="originating-group-id" style="display: none;">${groupId}</span>
<input type="text" class="membername" name="useremail" placeholder="Insert user email"><br><button type="button" id="addUser" class="add-user">Add User To Group</button></div>
<div id="member-name-display-area"></div>
</form></div>`;
  modal = document.createRange().createContextualFragment(modal);
  document.getElementById('memberholder').appendChild(modal);
  e.target.disabled = true;
  document.querySelector('.close-btn').addEventListener('click', closeMemberModal);
};

const addUserToGroup = async (e, token) => {
  const groupId = e.target.parentElement.querySelector('.originating-group-id').textContent.trim();
  const url = `/api/v1/groups/${Number(groupId)}/users`;
  const form = document.getElementById('member-search-form');
  let formdata = new FormData(form);
  formdata = convertFormDataToJson(formdata);
  const fetchResult = await customFetchWithBody(url, 'POST', token, JSON.parse(formdata));
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    document.getElementById('snackbar').innerHTML = 'member added to group';
    snackBar();
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};


const deleteGroupById = async (e, token) => {
  if (confirm('Are you sure you want to delete this group? This action is irreversible')) {
    const groupId = e.target.parentElement.querySelector('.groupId').textContent.trim();
    const url = `/api/v1/groups/${groupId}`;
    const fetchResult = await customFetch(url, 'DELETE', token);
    if (fetchResult.status === 'Success') {
      document.getElementById('snackbar').innerHTML = 'Group successfully deleted';
      snackBar();
      document.getElementById('viewGroup-btn').click();
    }
  } else {
  }
};

const renameTheGroup = async (e, token) => {
  const { value } = e.target;
  if (e.which === 13 || e.keyCode === 13) {
    if (value === '') {
      alert('Enter group name');
      return false;
    }
    const id = e.target.getAttribute('data-groupId');
    const url = `/api/v1/groups/${Number(id)}/name`;
    const groupObj = { groupname: value };
    const fetchResult = await customFetchWithBody(url, 'PATCH', token, groupObj);
    if (fetchResult.status === 'Success') {
      document.getElementById('viewGroup-btn').click();
      document.getElementById('snackbar').innerHTML = 'Group successfully renamed';
      snackBar();
    }
    if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
      console.log(fetchResult);
    }
  }
};

const makeGroupNameEditable = (e) => {
  const teamName = e.target.parentElement.textContent.trim();
  const id = e.target.parentElement.querySelector('.groupId').textContent.trim();
  const makeContentEditable = `<input type="text" placeholder="${teamName}" class="edit-group-name" data-groupId="${Number(id)}" name="groupname" minlength='2' required>`;
  e.target.parentElement.innerHTML = makeContentEditable;
};


const deleteUserFromGroup = async (e, token) => {
  const groupMemberId = e.target.parentElement.getAttribute('data-userid').trim();
  const groupId = e.target.parentElement.getAttribute('data-groupid').trim();
  const url = `/api/v1/groups/${Number(groupId)}/users/${Number(groupMemberId)}`;
  console.log(url);
  const fetchResult = await customFetch(url, 'DELETE', token);
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    document.getElementById('snackbar').innerHTML = 'member deleted from group';
    snackBar();
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};


const sendMessagesToAllInAGroup = async (e, token) => {
  const groupId = e.target.getAttribute('data-groupId');
  const form = e.target.parentElement.querySelector('#create-message');
  const messagebody = e.target.parentElement.querySelector('.message-compose').value;
  let formdata = new FormData(form);
  formdata.append('message', messagebody);
  formdata = convertFormDataToJson(formdata);
  const url = `/api/v1/groups/${Number(groupId)}/messages`;
  const fetchResult = await customFetchWithBody(url, 'POST', token, JSON.parse(formdata));
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};

const createGroupMessageComposeWindow = (e, token) => {
  const groupId = e.target.parentElement.querySelector('.groupId').textContent.trim();
  on();
  let modal = `<div id="myModal" class="modal">
                <div class="bar"><button type="button" class="close-btn">
                </button></div>
                <form id="create-message">
                <div id="details">
                <input type="text" name="subject" class="topic" placeholder="Subject">
                </div>
                <textarea class="message-compose"></textarea>
                </form>
                <button type="button" class="group-send" id="group-send" data-groupId=${groupId}>Send to Group Members</button></div>`;
  modal = document.createRange().createContextualFragment(modal);
  document.getElementById('composeWindow').appendChild(modal);
  e.target.disabled = true;
  document.querySelector('.close-btn').addEventListener('click', closeComposeWindow);
};

const params = new URLSearchParams(window.location.search);
const tokenParam = params.get('token');
document.getElementById('sent').addEventListener('click', getAllSentMessages.bind(this, tokenParam));
document.getElementById('inbox').addEventListener('click', getAllReceivedMessages.bind(this, tokenParam, 'inbox'));
document.getElementById('sent').click();
document.getElementById('viewGroup-btn').click();
document.getElementById('inbox').click();

document.addEventListener('click', (event) => {
  if (event.target.matches('.receivedMails')) {
    messageDisplayTab(event, '<button type="button" onclick="createReplySection(event);" class="reply-to-mail-btn">Reply</button>', tokenParam);
  }
  if (event.target.matches('.close-tab')) {
    closeCurrentTab(event);
  }
  if (event.target.matches('.sentMails')) {
    messageDisplayTab(event, '<button type="button" onclick="retractMail(event);" class="retract-mail-btn">Retract Mail</button>', tokenParam);
  }
  if (event.target.matches('#compose')) {
    createComposeWindow(event, null);
  }
  if (event.target.matches('.send')) {
    sendMail(event, tokenParam);
  }
  if (event.target.matches('#viewGroup-btn')) {
    getAllGroups(event, tokenParam);
  }
  if (event.target.matches('.grid-item')) {
    toggleAccordion(event, tokenParam);
  }
  if (event.target.matches('#createGroup-btn')) {
    toggleSlideUpDown();
  }
  if (event.target.matches('#submit-btn')) {
    createGroup(event, tokenParam);
  }
  if (event.target.matches('.check-box-top')) {
    selectAllCheckboxesForDeletion(event);
  }
  if (event.target.matches('.fa-trash')) {
    deleteMessages(tokenParam);
  }
  if (event.target.matches('.save')) {
    saveMessageAsDraft(event, tokenParam);
  }
  if (event.target.matches('#draft')) {
    getAllDraftMessages(event, tokenParam);
  }
  if (event.target.matches('.draftMail')) {
    getDraftMessageById(event, tokenParam);
  }
  if (event.target.matches('.fa-plus')) {
    createSearchForm(event);
  }
  if (event.target.matches('#addUser')) {
    addUserToGroup(event, tokenParam);
  }
  if (event.target.matches('.material-icons.delete')) {
    deleteGroupById(event, tokenParam);
  }
  if (event.target.matches('.material-icons.edit')) {
    makeGroupNameEditable(event);
  }
  if (event.target.matches('.fa-trash-alt')) {
    deleteUserFromGroup(event, tokenParam);
  }
  if (event.target.matches('.fa-send')) {
    createGroupMessageComposeWindow(event, tokenParam);
  }
  if (event.target.matches('#group-send')) {
    sendMessagesToAllInAGroup(event, tokenParam);
  }
}, false);

document.addEventListener('keypress', (event) => {
  renameTheGroup(event, tokenParam);
}, false);
