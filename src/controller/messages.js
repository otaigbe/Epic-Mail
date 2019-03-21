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
        message.status = 'sent';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, message.receiver, Number(req.user.id)];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertIntoMessageInboxOutbox, args);
        if (dboperationResult.rowCount === 1) {
          message.sender = req.user.email;
          return res.status(201).json(response.messageSuccess(message, 'Success'));
        }
        /* istanbul ignore next */
      } else if (message.receiver === undefined || message.receiver === req.user.email) {
        message.status = 'draft';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertMessageAsDraft, args);
        if (dboperationResult.rowCount === 1) {
          return res.status(201).json(response.messageSuccess(message, 'Success'));
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
    const receivedEmails = dbOperationResult.rows;
    return res.status(200).json(response.messageSuccess(receivedEmails, 'Success'));
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
    return res.status(200).json(response.messageSuccess(dbOperationResult.rows, 'Success'));
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
    return res.status(200).json(response.messageSuccess(dbOperationResult.rows, 'Success'));
  }

  /**
   * This fetches a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getMessageById(req, res) {
    const args = [req.params.messageId, req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectEmailByIdForParticularUser, args);
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json(response.messageSuccess(dbOperationResult.rows[0], 'Success'));
    }
    return res.status(404).json(response.failure(`Couldn't find message with id ${req.params.messageId}`, 'failure'));
  }

  /**
   * This deletes a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async deleteMessageById(req, res) {
    const args = [req.params.messageId, req.user.email];
    const dbOperationResult = await dbhelper.performTransactionalQuery(queries.deleteQueryByIdForParticularUser, args);
    if (dbOperationResult.rowCount === 1) {
      return res.status(200).json({
        status: 'Sucess',
        data: {
          message: 'The message was deleted successfully',
        },
      });
    } else {
      /* istanbul ignore next */
      return res.status(404).json(response.failure(`Couldn't find message with id ${req.params.messageId}`, 'failure'));
    }
  }
}
