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
    const result = Joi.validate(req.body, schema.message, { convert: true });
    if (result.error === null) {
      const message = {};
      message.messageBody = req.body.message.trim();
      message.subject = req.body.subject.trim();
      message.parentmessageid = req.body.parentmessageid;
      message.receiver = req.body.receiver;
      if (message.receiver && message.receiver !== req.user.email) {
        const args2 = [req.body.receiver.trim()];
        const dboperationResult2 = await dbhelper.performTransactionalQuery(queries.checkIfEmailExists, args2);
        if (dboperationResult2.rowCount === 0) {
          return res.status(404).json(response.failure('Receiver does not exists', {}));
        }
        message.status = 'sent';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, message.receiver, Number(req.user.id)];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertIntoMessageInboxOutbox, args);
        if (dboperationResult.rowCount === 1) {
          message.sender = req.user.email;
          message.id = dboperationResult.rows[0].messageid;
          return res.status(201).json(response.success('Message sent successfully', message));
        }
      } else if (message.receiver === undefined || message.receiver === req.user.email) {
        message.status = 'draft';
        const args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
        const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertMessageAsDraft, args);
        if (dboperationResult.rowCount === 1) {
          message.id = dboperationResult.rows[0].messageid;
          return res.status(201).json(response.success('Message saved as draft', message));
        }
      }
    }
    errorHandler.validationError(res, result);
  }

/**
   * This creates a new draft message
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async createDraftMessage(req, res) {
    const result = Joi.validate(req.body, schema.message, { convert: true });
    if (result.error === null) {
      const message = {};
      message.status = 'draft';
      const args = [req.body.subject.trim(), req.body.message.trim(), message.parentmessageid, message.status, message.sender, req.body.receiver];
      const dboperationResult = await dbhelper.performTransactionalQuery(queries.insertMessageAsDraft, args);
      if (dboperationResult.rowCount === 1) {
        return res.status(201).json(response.success('Message saved as draft', dboperationResult.rows[0]));
      }
    } else {
      errorHandler.validationError(res, result);
    }
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
    const result = Joi.validate(req.params, schema.messageId, { convert: true });
    if (result.error === null) {
      const args = [Number(req.params.messageId), String(req.user.email)];
      const dbOperationResult = await dbhelper.performTransactionalQuery(queries.selectEmailByIdForParticularUser, args);
      if (dbOperationResult.rowCount === 1) {
        return res.status(200).json(response.success('Message Found', dbOperationResult.rows[0]));
      }
      return res.status(404).json(response.failure('Could not find the message you were looking for', {}));
    } else {
      errorHandler.validationError(res, result);
    }
  }

  /**
   * This deletes a message by id
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async deleteMessageById(req, res) {
    const result = Joi.validate(req.params, schema.messageId, { convert: true });
    if (result.error === null) {
      const args = [Number(req.params.messageId), req.user.email];
      const dbOperationResult = await dbhelper.performTransactionalQuery(queries.deleteQueryByIdForParticularUserFromInbox, args);
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
