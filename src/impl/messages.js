import messageFunctions from '../helper/api/v1/messages';

const messagesImpl = {};

messagesImpl.sendMail = (req, res) => {
  messageFunctions.sendMail(req, res);
};

messagesImpl.getAllReceivedEmails = (req, res) => {
  messageFunctions.getAllReceivedEmails(req, res);
};

messagesImpl.getAllUnreadEmails = (req, res) => {
  messageFunctions.getAllUnreadEmails(req, res);
};


export default messagesImpl;
