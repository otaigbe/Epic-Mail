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

messagesImpl.getAllSentEmails = (req, res) => {
  messageFunctions.getAllSentEmails(req, res);
};

messagesImpl.getMessageById = (req, res) => {
  messageFunctions.getMessageById(req, res);
};

messagesImpl.deleteMessageById = (req, res) => {
  messageFunctions.deleteMessageById(req, res);
};

messagesImpl.testingCloudMail = (req, res) => {
  messageFunctions.testingCloudMail(req, res);
};
export default messagesImpl;
