/* eslint-disable prefer-destructuring */
import Joi from 'joi';
import usefulfunc from '../helper/usefulFunc';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import storage from '../fixtures/messages';
import response from '../helper/responseSchema';

export default class MessagesController {
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */

  static sendMail(req, res) {
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
  }

  static getAllReceivedEmails(req, res) {
    const receivedEmails = [];
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].type === 'received') {
        receivedEmails.push(storage[i]);
      }
    }
    return res.status(200).json(response.success('GET', req, receivedEmails, `Showing all ${receivedEmails.length} received emails`, 200));
  }

  static getAllUnreadEmails(req, res) {
    const unreadEmails = [];
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].status === 'unread') {
        unreadEmails.push(storage[i]);
      }
    }
    return res.status(200).json(response.success('GET', req, unreadEmails, `Showing all ${unreadEmails.length} unread emails`, 200));
  }


  static getAllSentEmails(req, res) {
    let sentEmails = [];
    sentEmails = usefulfunc.searchAndAddToArrayType(sentEmails, storage, 'sent');
    return res.status(200).json(response.success('GET', req, sentEmails, `Showing all ${sentEmails.length} sent emails`, 200));
  }

  static getMessageById(req, res) {
    const messageId = req.params.messageId;
    const message = usefulfunc.searchForMessageById(storage, Number(messageId));
    if (message) {
      return res.status(200).json(response.success('GET', req, message, `Showing message with id of ${message.id}`, 200));
    }
    return res.status(404).json(response.failure(`Couldn't find message with id ${messageId}`, null, 404));
  }

  static deleteMessageById(req, res) {
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
  }
}
