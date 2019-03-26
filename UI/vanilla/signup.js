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
  }
}

document.getElementById('request-submit').addEventListener('click', gatherFormDetails);
