/* eslint-disable prefer-destructuring */
import Joi from 'joi';
import formidable from 'formidable';
import usefulfunc from '../../misc/usefulFunc';
import schema from '../../misc/schema';
import errorHandler from '../../errorHandler/errorHandler';
import storage from '../../../fixtures/messages';
import response from '../../misc/responseSchema';
import cloudStorage from '../../../fixtures/cloudmail';


const messages = {};

messages.sendMail = (req, res) => {
  console.log(req.body);
  const result = Joi.validate(req.body, schema.message);
  if (result.error === null) {
    const message = {};
    message.to = req.body.to;
    message.cc = req.body.cc;
    message.messageBody = req.body.message;
    message.subject = req.body.subject;
    message.createdOn = Date.now();
    message.id = usefulfunc.generateId();
    message.parentMessageId = req.body.parentMessageId;
    message.from = req.body.from;
    const id = usefulfunc.insertMessageIntoStorage(storage, message);
    if (!id) {
      return res.status(501).json(response.failure('Something went wrong!Couldn\'t save message', null, 501));
    }
    if (message.from) {
      message.status = 'unread';
      message.type = 'received';
    } else if (message.to) {
      message.type = 'sent';
    }
    // console.log(message);
    return res.status(201).json(response.success('POST', req, message, 'message created and saved successfully', 201));
  }
  errorHandler.validationError(res, result);
};

messages.getAllReceivedEmails = (req, res) => {
  const receivedEmails = [];
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].type === 'received') {
      receivedEmails.push(storage[i]);
    }
  }
  return res.status(200).json(response.success('GET', req, receivedEmails, `Showing all ${receivedEmails.length} received emails`, 200));
};

messages.getAllUnreadEmails = (req, res) => {
  const unreadEmails = [];
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].status === 'unread') {
      unreadEmails.push(storage[i]);
    }
  }
  return res.status(200).json(response.success('GET', req, unreadEmails, `Showing all ${unreadEmails.length} unread emails`, 200));
};

messages.getAllSentEmails = (req, res) => {
  let sentEmails = [];
  sentEmails = usefulfunc.searchAndAddToArrayType(sentEmails, storage, 'sent');
  return res.status(200).json(response.success('GET', req, sentEmails, `Showing all ${sentEmails.length} sent emails`, 200));
};

messages.getMessageById = (req, res) => {
  const messageId = req.params.messageId;
  const message = usefulfunc.searchForMessageById(storage, Number(messageId));
  if (message) {
    return res.status(200).json(response.success('GET', req, message, `Showing message with id of ${message.id}`, 200));
  }
  return res.status(404).json(response.failure(`Couldn't find message with id ${messageId}`, null, 404));
};

messages.deleteMessageById = (req, res) => {
  const messageId = req.params.messageId;
  const messageIndex = usefulfunc.searchForMessageByIdIndex(storage, Number(messageId));
  console.log(messageIndex);
  if (messageIndex !== -1) {
    storage.splice(messageIndex, 1);
    return res.status(202).json(response.success('DELETE', req, storage, `Deleted message with id of ${messageId} emails`, 202));
  }
  if (messageIndex === -1) {
    return res.status(404).json(response.failure(`Couldn't find any message with id ${messageId}!Deletion unsuccessful`, null, 404));
  }
};

messages.testingCloudMail = (req, res) => {    
  cloudStorage.push(req.body);
  return res.status(201).json(response.success('POST', req, req.body, 'CloudMail Matter', 201));
};

messages.getAllSentEmailsFromCloudMailServer = (req, res) => res.status(200).json(response.success('GET', req, cloudStorage, 'All Cloud mail messages', 200));
export default messages;
