/* eslint-disable consistent-return */
import Joi from 'joi';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import queries from '../model/queries';
import helper from '../helper/helper';

export default class MessagesController {
  /**
   * @async
   * @method - This sends a message created by a user or saves it as draft
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async sendMail(req, res) {
    const result = Joi.validate(req.body, schema.message, { convert: true });
    if (result.error === null) {
      const message = {};
      message.messageBody = req.body.message.trim();
      message.subject = req.body.subject.trim();
      message.parentmessageid = req.body.parentmessageid;
      message.receiver = req.body.receiver;
      if (message.receiver && message.receiver !== req.user.email) {
        const args2 = [req.body.receiver.trim()];
        const dboperationResult2 = await helper.wrapDbOperationInTryCatchBlock(res, queries.checkIfEmailExists, args2);
        if (dboperationResult2.rowCount === 0) {
          return res.status(404).json(response.failure('Receiver does not exist', {}));
        }
        const senderId = parseInt(req.user.id, 10);
        const args = [message.subject, message.messageBody, message.parentmessageid, req.user.email, message.receiver, senderId];
        const dboperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.insertIntoMessageInboxOutbox, args);
        if (dboperationResult.rowCount === 1) {
          message.sender = req.user.email;
          message.id = dboperationResult.rows[0].messageid;
          return res.status(201).json(response.success('Message sent successfully', message));
        }
      } else if (message.receiver === undefined || message.receiver === req.user.email) { 
        return res.status(400).json(response.failure('You can\'t send a message to youeself! Save the message as draft instead.', {}));
      }
    }
    errorHandler.validationError(res, result);
  }

  /**
   * @async
   * @method - This creates a new draft message
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async createDraftMessage(req, res) {
    const result = Joi.validate(req.body, schema.draft, { convert: true });
    if (result.error === null) {
      const message = {};
      message.status = 'draft';
      const args = [req.body.subject.trim(), req.body.message.trim(), message.parentmessageid, message.status, req.user.email, req.body.receiver];
      const dboperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.insertMessageAsDraft, args);
      if (dboperationResult.rowCount === 1) {
        return res.status(201).json(response.success('Message saved as draft', dboperationResult.rows[0]));
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }


  /**
   * @async
   * @method - This fetches all draft messages for a particular user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any additional data required if any
   */
  static async getAllDraftMessages(req, res) {
    const args = ['draft', req.user.email];
    const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.getAllDraftMessages, args);
    let draft = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      draft = 'You have no draft messages currently';
      return res.status(200).json(response.success(draft, {}));
    }
    return res.status(200).json(response.success('All Draft Messages', draft));
  }


  /**
   * @async
   * @method - This fetches all received emails
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllReceivedEmails(req, res) {
    const args = [req.user.email];
    const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.selectAllMessagesFromInboxBelongingToAParticularUser, args);
    let received = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      received = 'You have no received emails currently';
      return res.status(200).json(response.success(received, {}));
    }
    return res.status(200).json(response.success('All received messages', received));
  }

  /**
   * @async
   * @method - This gets all unread messages for a particular user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllUnreadEmails(req, res) {
    const args = [req.user.email, 'unread'];
    const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.selectAllUnreadMessagesForAParticularUser, args);
    let unread = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      unread = 'You have no unread emails currently';
      return res.status(200).json(response.success(unread, {}));
    }
    return res.status(200).json(response.success('All Unread messages', unread));
  }


  /**
   * @async
   * @method - This gets all sent messages sent by a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllSentEmails(req, res) {
    const args = [req.user.email];
    const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.selectAllSentEmailsForAParticularUser, args);
    let sent = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      sent = 'You have no sent emails currently';
      return res.status(200).json(response.success(sent, {}));
    }
    return res.status(200).json(response.success('Sent Messages', sent));
  }


  /**
   * @async
   * @method - This gets draft a message by Id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getDraftMessageById(req, res) {
    const result = Joi.validate(req.params, schema.messageId, { convert: true });
    if (result.error === null) {
      const args = ['draft', String(req.user.email), Number(req.params.messageId)];
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.getDraftMessageById, args);
      if (dbOperationResult.rowCount === 1) {
        return res.status(200).json(response.success('Message retrieved successfully', dbOperationResult.rows[0]));
      }
      return res.status(404).json(response.failure('Could not find the message you were looking for', {}));
    }
    errorHandler.validationError(res, result);
  }


  /**
   * @async
   * @method - This fetches a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getMessageById(req, res) {
    const result = Joi.validate(req.params, schema.messageId, { convert: true });
    if (result.error === null) {
      const args = [Number(req.params.messageId), String(req.user.email)];
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.selectEmailByIdForParticularUser, args);
      if (dbOperationResult.rowCount === 1) {
        return res.status(200).json(response.success('Message Found', dbOperationResult.rows[0]));
      }
      return res.status(404).json(response.failure('Could not find the message you were looking for', {}));
    }
    errorHandler.validationError(res, result);
  }

  /**
   * @async
   * @method - This deletes a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async deleteMessageById(req, res) {
    const result = Joi.validate(req.params, schema.messageId, { convert: true });
    if (result.error === null) {
      const args = [Number(req.params.messageId), req.user.email];
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.deleteQueryByIdForParticularUserFromInbox, args);
      if (dbOperationResult.rowCount === 1) {
        return res.status(200).json({
          status: 'Success',
          message: 'The message was deleted successfully',
        });
      }
      if (dbOperationResult.rowCount === 0) {
        return res.status(404).json(response.failure('Could not delete the message because it was not found', {}));
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }
}
