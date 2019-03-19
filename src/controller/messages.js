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
      // message.sender = req.body.sender;
      message.messageBody = req.body.message;
      message.subject = req.body.subject;
      message.parentmessageid = req.body.parentmessageid;
      message.receiver = req.body.receiver;
      console.log(`receiver:  ${message.receiver}`);
      console.log('initiliazed message object');
      if (message.receiver && message.receiver !== req.user.email) {
        message.status = 'sent';
        console.log('reached inside');
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, message.receiver, Number(req.user.id)];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertIntoMessageInboxOutbox, args);
        if (dboperationResult.rowCount === 1) {
          message.sender = req.user.email;
          return res.status(201).json(response.messageSuccess(message, 201));
        }
      } else if (message.receiver === undefined || message.receiver === req.user.email) {
        message.status = 'draft';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertMessageAsDraft, args);
        if (dboperationResult.rowCount === 1) {
          return res.status(201).json(response.messageSuccess(message, 201));
        }
      }
    }
    errorHandler.validationError(res, result);
  }

  static async getAllReceivedEmails(req, res) {
    const user = req.user;
    console.log(user);
    const args = [req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllMessagesFromInboxBelongingToAParticularUser, args);
    const receivedEmails = dbOperationResult.rows;
    return res.status(200).json(response.messageSuccess(receivedEmails, 200));
  }

  static async getAllUnreadEmails(req, res) {
    console.log('entering get all received emails');
    const args = [req.user.email, 'unread'];
    console.log(req.user.email);
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllUnreadMessagesForAParticularUser, args);
    return res.status(200).json(response.messageSuccess(dbOperationResult.rows, 200));
  }


  static async getAllSentEmails(req, res) {
    const args = [req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllSentEmailsForAParticularUser, args);
    return res.status(200).json(response.messageSuccess(dbOperationResult.rows, 200));
  }

  static async getMessageById(req, res) {
    const args = [req.params.messageId, req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectEmailByIdForParticularUser, args);
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json(response.messageSuccess(dbOperationResult.rows[0], 200));
    }
    return res.status(404).json(response.failure(`Couldn't find message with id ${req.params.messageId}`, null, 404));
  }

  static async deleteMessageById(req, res) {
    const args = [req.params.messageId, req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.deleteQueryByIdForParticularUser, args);
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json(response.messageSuccess(null, 200));
    }
    if (dbOperationResult.rowCount === 0) {
      return res.status(404).json(response.failure(`Couldn't find message with id ${req.params.messageId}`, null, 404));
    }
  }
}
