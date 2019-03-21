/* eslint-disable consistent-return */
import Joi from 'joi';
import usefulFunc from '../helper/usefulFunc';
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
    const result = Joi.validate(req.body, schema.createGroup);
    if (result.error === null) {
      const group = {};
      group.groupName = req.body.groupname;
      group.creator = req.user.email;
      const args = [group.groupName, group.creator];
      const dbOperationResult1 = await dbhelpers.performTransactionalQuery(queries.checkIfUserAlreadyHasGroupWithGroupName, args);
      if (dbOperationResult1.rowCount > 0) {
        return res.status(400).json(response.groupFailure(`You Already have a group with name ${group.groupName}! Chooose a different group name`, 400));
      }
      const args1 = [group.groupName, group.creator, Number(req.user.id)];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.createGroup, args1);
      return res.status(201).json(response.groupSuccess(group, `Group ${group.groupName} has been created!`, 201));
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
    const args = [req.params.groupId, req.user.email];
    const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
    if (dbOperationResult.rowCount === 1) {
      const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.deleteGroupById, args);
      return res.status(200).json(response.groupSuccess(null, `Deleted group with id of ${req.params.groupId}`, 200));
    }
    /* istanbul ignore next */
    if (dbOperationResult.rowCount === 0) {
      return res.status(404).json(response.groupFailure(`Couldn't find group with id ${req.params.groupId} belonging to you`, 404));
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
    return res.status(200).json(response.groupsAll(dbOperationResult.rows, `Showing all groups created by ${req.user.email}`, 200));
  }

  /**
   * This renames a group
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async renameAGroup(req, res) {
    const result = Joi.validate(req.body, schema.rename);
    if (result.error === null) {
      const args = [req.params.groupId, req.user.email];
      const args1 = [req.body.groupname, req.user.email];
      const args2 = [req.body.groupname, req.params.groupId, req.user.email];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
      if (dbOperationResult.rowCount === 1) {
        const dbOperationResult1 = await dbhelpers.performTransactionalQuery(queries.checkIfUserAlreadyHasGroupWithGroupName, args1);
        if (dbOperationResult1.rowCount > 0) {
          return res.status(400).json(response.groupFailure(`You Already have a group with name ${req.body.groupname}! Chooose a different group name`, 400));
        }
        /* istanbul ignore next */
        if (dbOperationResult1.rowCount === 0) {
          const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.renameGroup, args2);
          return res.status(200).json({
            message: `Group with id ${req.params.groupId} has been renamed to ${req.body.groupname}!`,
            status: 200,
          });
        }
      } else if (dbOperationResult.rowCount === 0) {
        return res.status(404).json(response.groupFailure(`Group with id ${req.params.groupId} doesnt exist for the creator`, 404));
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
    const result = Joi.validate(req.body, schema.addToGroup);
    if (result.error === null) {
      const args = [req.params.groupId, req.user.email];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
      if (dbOperationResult.rowCount === 1) {
        const args2 = [req.params.groupId, req.body.useremail];
        const dbOperationResult3 = await dbhelpers.performTransactionalQuery(queries.CheckIfUserIsAlreadyAMember, args2);
        if (dbOperationResult3.rowCount > 0) {
          return res.status(200).json({ message: 'You are already a member of the Group!', status: 'conflict' });
        }
        const args3 = [req.params.groupId, req.body.useremail];
        const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.insertNewMembersIntoGroup, args3);
        return res.status(200).json({ message: 'User added to Group!', status: 'Success' });
      }
      if (dbOperationResult.rowCount === 0) {
        return res.status(404).json(response.groupFailure(`Non existent Group with id ${req.params.groupId} for this user!`, 404));
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
      return res.status(404).json(response.groupFailure('You are not a member of Group', 404));
    }
  }

  /**
   * This sends a mail to all members in a group
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} - containing the status message and any addition data required if any
   */
  static async sendMailToAllMembersInAGroup(req, res) {
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
        data: {
          message: 'Successfully sent the mails to all members in the group',
          resource: message,
        },
      });
    }
    errorHandler.validationError(res, result);
  }
}
