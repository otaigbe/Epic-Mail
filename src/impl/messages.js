import messageFunctions from '../helper/api/v1/messages';

const messagesImpl = {};

messagesImpl.sendMail = (req, res) => {
  messageFunctions.sendMail(req, res);
};


export default messagesImpl;
