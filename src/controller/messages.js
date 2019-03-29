/* eslint-disable no-restricted-globals */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
import Joi from 'joi';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import dbhelper from '../model/dbHelper';
import queries from '../model/queries';

export default class MessagesController {
  /**
   * This sends a message created by a user or saves it as draft
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async sendMail(req, res) {
    if (req.body.receiver && !req.body.receiver.includes('@epicmail.com')) return res.status(400).json({ message: 'Your receiver address is in valid' });
    const result = Joi.validate(req.body, schema.message);
    if (result.error === null) {
      const message = {};
      message.messageBody = req.body.message;
      message.subject = req.body.subject;
      message.parentmessageid = req.body.parentmessageid;
      message.receiver = req.body.receiver;

      /* istanbul ignore next */
      if (message.receiver && message.receiver !== req.user.email) {
        const args2 = [req.body.receiver];
        const dboperationResult2 = await dbhelper.performTransactionalQuery(queries.checkIfEmailExists, args2);
        if (dboperationResult2.rowCount === 0) {
          return res.status(404).json(response.responseWithOutResource('Receiver does not exists', 'Not Found'));
        }
        message.status = 'sent';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, message.receiver, Number(req.user.id)];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertIntoMessageInboxOutbox, args);
        if (dboperationResult.rowCount === 1) {
          message.sender = req.user.email;
          message.id = dboperationResult.rows[0].messageid;
          return res.status(201).json(response.responseWithResource(message, 'Message sent successfully', 'Success'));
        }
        /* istanbul ignore next */
      } else if (message.receiver === undefined || message.receiver === req.user.email) {
        message.status = 'draft';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertMessageAsDraft, args);
        if (dboperationResult.rowCount === 1) {
          message.id = dboperationResult.rows[0].messageid;
          return res.status(201).json(response.responseWithResource(message, 'Message saved as draft', 'Success'));
        }
      }
    }
    errorHandler.validationError(res, result);
  }


  /**
   * This fetches all received emails
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllReceivedEmails(req, res) {
    const user = req.user;
    const args = [req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllMessagesFromInboxBelongingToAParticularUser, args);
    let received = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      received = 'You have no received emails currently';
      return res.status(200).json(response.success(received, {}));
    }
    return res.status(200).json(response.success('Success', received));
  }

  /**
   * This gets all unread messages for a particular user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllUnreadEmails(req, res) {
    const args = [req.user.email, 'unread'];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllUnreadMessagesForAParticularUser, args);
    let unread = dbOperationResult.rows;
    /* istanbul ignore next */
    if (dbOperationResult.rows.length === 0) {
      unread = 'You have no unread emails currently';
      return res.status(200).json(response.responseWithResource(unread, 'Success'));

    }
    return res.status(200).json(response.responseWithResource(unread, 'Unread Messages', 'Success'));
  }


  /**
   * This gets all sent messages sent by a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllSentEmails(req, res) {
    const args = [req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectAllSentEmailsForAParticularUser, args);
    let sent = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      sent = 'You have no sent emails currently';
      return res.status(200).json(response.success(sent, {}));
    }
    return res.status(200).json(response.success('Sent Messages', sent));
  }

  /**
   * This fetches a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getMessageById(req, res) {
    if (isNaN(req.params.messageId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    const args = [req.params.messageId, req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectEmailByIdForParticularUser, args);
    /* istanbul ignore next */
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json(response.responseWithResource(dbOperationResult.rows[0], 'Message Found', 'Success'));
    }
    return res.status(404).json(response.responseWithOutResource('Could not find the message you were looking for', 'failure'));
  }

  /**
   * This deletes a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async deleteMessageById(req, res) {
    if (isNaN(req.params.messageId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    const args = [req.params.messageId, req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.deleteQueryByIdForParticularUser, args);
    /* istanbul ignore next */
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json({
        status: 'Sucess',
        message: 'The message was deleted successfully',
      });
    } else {
      /* istanbul ignore next */
      return res.status(404).json(response.responseWithOutResource('Could not delete the message', 'Not Found'));
    }
  }
}
