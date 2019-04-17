const convertFormDataToJson = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return JSON.stringify(object);
};

const baseUrl = '/api/v1/auth/signin';

const gatherFormDetails = async () => {
  document.getElementById('reply').innerHTML = 'processing...';
  const form = document.getElementById('signin');
  const formData = new FormData(form);
  const formdata = convertFormDataToJson(formData);
  const fetchResult = await customFetchWithBody(baseUrl, 'POST', null, JSON.parse(formdata));
  if (fetchResult.status === 'Success') {
    window.location.replace(`/activities.html?token=${fetchResult.data.token}`);
  }
  if (fetchResult.status === 'failure') {
    document.getElementById('reply').style.color = 'red';
    document.getElementById('reply').innerHTML = fetchResult.error.message;
  }
};
document.getElementById('request-submit').addEventListener('click', gatherFormDetails);
