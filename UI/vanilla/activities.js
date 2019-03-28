export default class Activities {
  static async getAllReceivedMessages(token) {
    const baseUrl = '/api/v1/messages';
    const fetchResult = await customFetch(baseUrl, 'GET', token);
    if (fetchResult.status === 'Success') {
      console.log(fetchResult);
      document.getElementById('inbox').addEventListener('click', wrapResultWithHtml.bind(this, 'Inbox', 'receivedMails', fetchResult));
    }
  }

  static convertFormDataToJson(formData) {
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return JSON.stringify(object);
  }
}
