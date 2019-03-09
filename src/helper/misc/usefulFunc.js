import store from '../../fixtures/users';

const customFunctions = {};

customFunctions.generateId = () => {
  const randNumber = Math.random() * 1000;
  return Math.floor(randNumber);
};

customFunctions.generateFullEmailAddress = username => `${username}@epicmail.com`;

customFunctions.insertIntoStorage = (obj) => {
  store.push(obj);
  return obj.id;
};

customFunctions.insertMessageIntoStorage = (storage, obj) => {
  storage.push(obj);
  return obj.id;
};


customFunctions.searchForAlreadyExistingUsername = obj => store.find((element) => {
  console.log(element.email);
  console.log(obj.email);
  if (element.email === obj.email) {
    return obj.email;
  }
});

customFunctions.searchForUsernameAndPassword = obj => store.find(element => element.email === obj.email);

customFunctions.sendMail = () => {};

customFunctions.searchAndAddToArrayType = (array, storage, type) => {
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].type === type) {
      array.push(storage[i]);
    }
  }
  return array;
};

customFunctions.searchForMessageById = (storage, messageId) => storage.find((element) => {
  if (element.id === messageId) {
    return element;
  }
});

customFunctions.searchForMessageByIdIndex = (storage, messageId) => storage.findIndex((element) => {
  if (element.id === messageId) {
    return element;
  }
});

customFunctions.setCookieAndRedirect = (res, token, url) => {
  res.cookie('x-auth-token', token);
  return res.redirect(url);
};
export default customFunctions;
