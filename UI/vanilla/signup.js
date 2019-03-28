function convertFormDataToJson(formData) {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return JSON.stringify(object);
}

const baseUrl = '/api/v1/auth/signup';
async function gatherFormDetails() {
  const form = document.getElementById('signup');
  const formData = new FormData(form);
  const formdata = convertFormDataToJson(formData);
  const fetchResult = await customFetchWithBody(baseUrl, 'POST', null, JSON.parse(formdata));
  if (fetchResult.status === 'Success') {
    window.location.replace('/activities.html');
    const header = new Headers();
    header.set('x-auth-token', fetchResult.data.token);
  }
  if (fetchResult.status === 'failure') {
    document.getElementById('reply').style.color = 'red';
    document.getElementById('reply').innerHTML = fetchResult.error.message;

  }
}

document.getElementById('request-submit').addEventListener('click', gatherFormDetails);
