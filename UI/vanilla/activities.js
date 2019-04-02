const getAllReceivedMessages = async (token, e) => {
  const baseUrl = '/api/v1/messages';
  const fetchResult = await customFetch(baseUrl, 'GET', token);
  if (fetchResult.status === 'Success') {
    console.log(fetchResult);
    wrapResultWithHtml('Inbox', 'receivedMails', fetchResult);
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
    wrapResultWithHtml('Sent Mails', 'sentMails', fetchResult);
  }
};


const messageDisplayTab = async (e, button, token) => {
  console.log(e.target);
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


function closeCurrentTab(e) {
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
}

function on() {
  document.getElementById('overlay').style.display = 'block';
}

function off() {
  document.getElementById('overlay').style.display = 'none';
}

function closeComposeWindow(e) {
  off();
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
  document.getElementById('compose').disabled = false;
}


const createComposeWindow = (e) => {
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
    // console.log(e.target);
    const mailtitle = e.target.querySelector('.title').textContent;
    const sender = e.target.querySelector('.sender').textContent;
    document.querySelector('.to').value = sender;
    document.querySelector('.topic').value = mailtitle;
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
    console.log(fetchResult);
    wrapInAccordion(fetchResult);
  }
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

function selectAllCheckboxesForDeletion(e) {
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
}


function snackBar() {
  const x = document.getElementById('snackbar');
  x.className = 'show';
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
}


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
  }
  if (fetchResult.status === 'Failed' || fetchResult.status === 'failure') {
    console.log(fetchResult);
  }
};


const params = new URLSearchParams(window.location.search);
const tokenParam = params.get('token');
document.getElementById('sent').addEventListener('click', getAllSentMessages.bind(this, tokenParam));
document.getElementById('inbox').addEventListener('click', getAllReceivedMessages.bind(this, tokenParam));
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
    createComposeWindow(event);
  }
  if (event.target.matches('.send')) {
    sendMail(event, tokenParam);
  }
  if (event.target.matches('#viewGroup-btn')) {
    getAllGroups(event, tokenParam);
  }
  if (event.target.matches('.grid-item')) {
    toggleAccordion(event);
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
}, false);
