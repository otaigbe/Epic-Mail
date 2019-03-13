import messageFunctions from '../helper/api/v1/messages';

const messagesImpl = {};

messagesImpl.sendMail = (req, res) => {
  messageFunctions.sendMail(req, res);
};

messagesImpl.getAllReceivedEmails = (req, res) => {
  messageFunctions.getAllReceivedEmails(req, res);
};

export default messagesImpl;
