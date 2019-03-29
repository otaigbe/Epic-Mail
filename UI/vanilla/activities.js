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

const params = new URLSearchParams(window.location.search);
const tokenParam = params.get('token');
document.getElementById('sent').addEventListener('click', getAllSentMessages.bind(this, tokenParam));
document.getElementById('inbox').addEventListener('click', getAllReceivedMessages.bind(this, tokenParam));
document.getElementById('inbox').click();
