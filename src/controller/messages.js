/* eslint-disable prefer-destructuring */
import Joi from 'joi';
import usefulfunc from '../helper/usefulFunc';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import storage from '../fixtures/messages';
import response from '../helper/responseSchema';
import dbhelper from '../model/dbHelper';
import queries from '../model/queries';

export default class MessagesController {
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */

  static async sendMail(req, res) {
    console.log('entering sendmail function');
    const result = Joi.validate(req.body, schema.message);
    if (result.error === null) {
      console.log('joi validated');
      const message = {};
      message.sender = req.body.sender;
      message.messageBody = req.body.message;
      message.subject = req.body.subject;
      message.parentmessageid = req.body.parentmessageid;
      message.receiver = req.body.receiver;
      console.log(`reciver:  ${message.receiver}`);
      console.log('initiliazed message object');
      if (message.receiver && message.sender) {
        message.status = 'sent';
        console.log('reached inside');
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertIntoMessageInboxOutbox, args);
        if (dboperationResult.rowCount === 1) {
          return res.status(201).json(response.success('POST', req, message, 'message created and sent successfully', 201));
        }
        // console.log(dboperationResult);
      } else if (message.sender && message.receiver === undefined) {
        message.status = 'draft';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertMessageAsDraft, args);
        if (dboperationResult.rowCount === 1) {
          return res.status(201).json(response.success('POST', req, message, 'message saved successfully', 201));
        }
      }
    }
    errorHandler.validationError(res, result);
  }

  static async getAllReceivedEmails(req, res) {
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllMessagesFromInbox, null);
    const receivedEmails = dbOperationResult.rows;
    return res.status(200).json(response.success('GET', req, receivedEmails, 'Showing all received emails', 200));
  }

  static async getAllUnreadEmails(req, res) {
    console.log('entering get all received emails');
    const args = ['unread'];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllUnreadMessages, args);
    return res.status(200).json(response.success('GET', req, dbOperationResult.rows[0], 'Showing all unread emails', 200));
  }


  static async getAllSentEmails(req, res) {
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllSentEmails, null);
    return res.status(200).json(response.success('GET', req, dbOperationResult.rows[0], 'Showing all sent emails', 200));
  }

  static async getMessageById(req, res) {
    const args = [req.params.messageId];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectEmailById, args);
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json(response.success('GET', req, dbOperationResult.rows[0], `Showing message with id of ${req.params.messageId}`, 200));
    }
    return res.status(404).json(response.failure(`Couldn't find message with id ${req.params.messageId}`, null, 404));
  }

  static async deleteMessageById(req, res) {
    const args = [req.params.messageId];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.deleteQueryById, args);
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json(response.success('DELETE', null, null, `Showing message with id of ${req.params.messageId}`, 200));
    }
    if (dbOperationResult.rowCount === 0) {
      return res.status(404).json(response.failure(`Couldn't find message with id ${req.params.messageId}`, null, 404));
    }
  }
}
