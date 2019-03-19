/* eslint-disable no-plusplus */
/* istanbul ignore file */
import store from '../fixtures/users';

export default class UsefulFunctions {
  static generateId() {
    const randNumber = Math.random() * 1000;
    return Math.floor(randNumber);
  }

  static generateFullEmailAddress(username) {
    return `${username}@epicmail.com`;
  }

  static insertIntoStorage(obj) {
    store.push(obj);
    return obj.id;
  }

  static insertMessageIntoStorage(storage, obj) {
    storage.push(obj);
    return obj.id;
  }


  static searchForAlreadyExistingUsername(obj) {
    return store.find((element) => {
      if (element.email === obj.email) {
        return obj.email;
      }
    });
  }

  static searchForUsernameAndPassword(obj) {
    return store.find(element => element.email === obj.email);
  }

  static searchAndAddToArrayType(array, storage, type) {
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].type === type) {
        array.push(storage[i]);
      }
    }
    return array;
  }

  static searchForMessageById(storage, messageId) {
    return storage.find((element) => {
      if (element.id === messageId) {
        return element;
      }
    });
  }

  static searchForMessageByIdIndex(storage, messageId) {
    return storage.findIndex((element) => {
      if (element.id === messageId) {
        return element;
      }
    });
  }

  static buildSqlStatement(message, argum) {
    // const argum = [1, 2, 3, 4, 5];
    let initial = `WITH insertres AS (
INSERT into users (firstname, lastname, username, password, email, alternateemail)
VALUES
`;
    for (let i = 0; i < argum.length; i++) {
      initial += `(${message.subject} , ${message.messageBody}, ${message.parentmessageid}, ${message.status}, ${message.sender}, ${argum[i]})`;
      if (i < argum.length - 1) {
        initial += `,
        `;
      }
    }
    initial += ` RETURNING messageid ),
insertres2 AS ( insert into inbox (messageid, status, receiverusername) values `;
    for (let i = 0; i < argum.length; i++) {
      initial += `((SELECT messageid FROM insertres), 'unread', ${argum[i]})`;

      if (i < argum.length - 1) {
        initial += `,
        `;
      }
    }

    initial += ') insert into sent (messageid, sender) values ';

    for (let i = 0; i < argum.length; i++) {
      initial += `((SELECT messageid FROM insertres), ${message.sender})`;

      if (i < argum.length - 1) {
        initial += `,
        `;
      }
    }
    initial += ' returning messageid';
    return initial;
  }
}
