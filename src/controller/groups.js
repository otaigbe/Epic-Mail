/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
import Joi from 'joi';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import dbhelpers from '../model/dbHelper';
import queries from '../model/queries';

export default class GroupsController {
  /**
   * This creates a group for a user.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async createGroup(req, res) {
    const result = Joi.validate(req.body, schema.createGroup, { convert: false });
    if (result.error === null) {
      const group = {};
      group.groupName = req.body.groupname;
      group.creator = req.user.email;
      const args = [group.groupName, group.creator];
      const dbOperationResult1 = await dbhelpers.performTransactionalQuery(queries.checkIfUserAlreadyHasGroupWithGroupName, args);
      if (dbOperationResult1.rowCount > 0) {
        return res.status(409).json(response.failure(`You Already have a group with name ${group.groupName}! Chooose a different group name`, {}));
      }
      const args1 = [group.groupName, group.creator, Number(req.user.id)];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.createGroup, args1);
      group.id = dbOperationResult.rows[0].groupid;
      return res.status(201).json(response.success(`Group ${group.groupName} has been created!`, group));
    }
    errorHandler.validationError(res, result);
  }


  /**
   * This deletes a group created by a particular user. A user can only delete a group he created
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async deleteGroupById(req, res) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(req.params.groupId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    const args = [req.params.groupId, req.user.email];
    const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
    if (dbOperationResult.rowCount === 1) {
      const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.deleteGroupById, args);
      return res.status(200).json(response.responseWithOutResource('Deletion Successful', 'Success'));
    }
    /* istanbul ignore next */
    if (dbOperationResult.rowCount === 0) {
      return res.status(404).json(response.responseWithOutResource('Couldn\'t Delete the group you requested', 'Unsuccessful Operation'));
    }
  }

  /**
   * This gets all groups created by a particular user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async getAllGroups(req, res) {
    const args = [req.user.email];
    const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.selectAllGroupsCreatedByAUser, args);
    let groups = dbOperationResult.rows;
    if (dbOperationResult.rows.length === 0) {
      groups = 'You have not created any groups yet';
      return res.status(200).json(response.success(groups, {}));
    }
    return res.status(200).json(response.success(`Showing all groups created by ${req.user.email}`, groups));
  }

  /**
   * This renames a group
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async renameAGroup(req, res) {
    /* istanbul ignore next */
    if (isNaN(req.params.groupId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    const result = Joi.validate(req.body, schema.rename);
    if (result.error === null) {
      const args = [req.params.groupId, req.user.email];
      const args1 = [req.body.groupname, req.user.email];
      const args2 = [req.body.groupname, req.params.groupId, req.user.email];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
      if (dbOperationResult.rowCount === 1) {
        const dbOperationResult1 = await dbhelpers.performTransactionalQuery(queries.checkIfUserAlreadyHasGroupWithGroupName, args1);
        if (dbOperationResult1.rowCount > 0) {
          return res.status(409).json(response.responseWithOutResource(`You Already have a group with name ${req.body.groupname}! Chooose a different group name`, 'Conflict'));
        }
        /* istanbul ignore next */
        if (dbOperationResult1.rowCount === 0) {
          const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.renameGroup, args2);
          return res.status(200).json({
            status: 'Success',
            message: `Group with id ${req.params.groupId} has been renamed to ${req.body.groupname}!`,
          });
        }
      } else if (dbOperationResult.rowCount === 0) {
        return res.status(404).json(response.responseWithOutResource('Can\'t find the group you were looking for', 'Not Found'));
      }
    }
    errorHandler.validationError(res, result);
  }

  /**
   * This adds a user to a group
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async addUserToGroup(req, res) {
    /* istanbul ignore next */
    if (isNaN(req.params.groupId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    if (!req.body.useremail.includes('@epicmail.com')) return res.status(400).json(response.responseWithOutResource('Please Insert a valid email', 'Bad Request'));
    const result = Joi.validate(req.body, schema.addToGroup);
    if (result.error === null) {
      /* istanbul ignore next */
      if (req.body.useremail === req.user.email) return res.status(400).json({ status: 'Bad Request', message: 'You cannot add yourself to a group you own!'});
      const args = [req.params.groupId, req.user.email];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
      if (dbOperationResult.rowCount === 1) {
        const args2 = [req.params.groupId, req.body.useremail];
        const dbOperationResult3 = await dbhelpers.performTransactionalQuery(queries.CheckIfUserIsAlreadyAMember, args2);
        if (dbOperationResult3.rowCount > 0) {
          return res.status(200).json({ status: 'conflict', message: 'You are already a member of the Group!'});
        }
        const args3 = [req.params.groupId, req.body.useremail];
        const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.insertNewMembersIntoGroup, args3);
        return res.status(200).json({ status: 'Success', message: 'User added to Group!' });
      }
      /* istanbul ignore next */
      if (dbOperationResult.rowCount === 0) {
        return res.status(404).json(response.responseWithOutResource('The Group wasn\'t found!', 'Not found'));
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }

  /**
   * This deletes a particular user from  a particular group
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async deleteUserFromParticularGroup(req, res) {
    if (isNaN(req.params.groupId) === true || isNaN(req.params.userId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    const args = [req.params.groupId, Number(req.params.userId)];
    const dbOperationResult3 = await dbhelpers.performTransactionalQuery(queries.CheckIfUserIsAlreadyAMemberDel, args);
    if (dbOperationResult3.rowCount > 0) {
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.deleteUserFromASpecificGroup, args);
      return res.status(200).json({
        status: 'Success',
        data: {
          message: 'user deleted from group',
        },
      });
    }
    /* istanbul ignore next */
    if (dbOperationResult3.rowCount === 0) {
      return res.status(404).json(response.groupFailure('You are not a member of Group', 'Not found'));
    }
  }

  /**
   * This sends a mail to all members in a group
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async sendMailToAllMembersInAGroup(req, res) {
    /* istanbul ignore next */
    if (isNaN(req.params.groupId) === true) return res.status(400).json(response.responseWithOutResource('Please Insert only numbers', 'Bad Request'));
    const result = Joi.validate(req.body, schema.groupMessage);
    if (result.error === null) {
      const message = {};
      message.sender = req.user.email;
      message.messageBody = req.body.message;
      message.subject = req.body.subject;
      message.parentmessageid = req.body.parentmessageid;
      const args = [req.params.groupId];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.selectAllMembersOfAPraticularGroup, args);
      if (dbOperationResult.rowCount === 0) {
        return res.status(404).json({
          status: 'failure',
          error: {
            message: 'Group non existent or has no members',
          },
        });
      }
      dbOperationResult.rows.map(async (element) => {
        message.status = 'sent';
        const args2 = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, element.memberemail, Number(req.user.id)];
        const dboperationResult = await dbhelpers.performTransactionalQuery(queries.insertIntoMessageInboxOutbox, args2);
      });
      return res.status(201).json({
        status: 'success',
        message: 'Successfully sent the mails to all members in the group',
        data: message,
      });
    }
    errorHandler.validationError(res, result);
  }
}
