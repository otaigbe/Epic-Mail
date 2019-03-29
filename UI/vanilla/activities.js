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
}, false);
