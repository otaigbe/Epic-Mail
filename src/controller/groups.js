/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import usefulFunc from '../helper/usefulFunc';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import dbhelpers from '../model/dbHelper';
import queries from '../model/queries';

export default class GroupsController {
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static async createGroup(req, res) {
    console.log(req.body);
    const result = Joi.validate(req.body, schema.group);
    if (result.error === null) {
      console.log('joi validated');
      const group = {};
      group.groupName = req.body.groupname;
      group.creator = req.body.creator;
      const args = [group.groupName, group.creator];
      const dbOperationResult1 = await dbhelpers.performTransactionalQuery(queries.checkIfUserAlreadyHasGroupWithGroupName, args);
      if (dbOperationResult1.rowCount > 0) {
        return res.status(400).json(response.groupFailure(`You Already have a group with name ${group.groupName}! Chooose a different group name`, 400));
      }
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.createGroup, args);
      return res.status(201).json(response.groupSuccess(group, `Group with id ${dbOperationResult.rows[0].groupid} has been created!`, 200));
    }
    errorHandler.validationError(res, result);
  }

  static async deleteGroupById(req, res) {
    const args = [req.params.groupId, 'otaigbe@epicmail.com'];
    const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
    if (dbOperationResult.rowCount === 1) {
      const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.deleteGroupById, args);
      return res.status(200).json(response.groupSuccess(null, `Deleted group with id of ${req.params.groupId}`, 200));
    }
    if (dbOperationResult.rowCount === 0) {
      return res.status(404).json(response.failure(`Couldn't find group with id ${req.params.groupId} belonging to you`, null, 404));
    }
  }

  static async getAllGroups(req, res) {
    const args = ['otaigbe@epicmail.com'];
    const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.selectAllGroupsCreatedByAUser, args);
    return res.status(200).json(response.groupSuccess(dbOperationResult.rows, 'Showing all groups created by User ---', 200));
  }

  static async renameAGroup(req, res) {
    const result = Joi.validate(req.body, schema.rename);
    if (result.error === null) {
      const args = [req.params.groupId, 'otaigbe@epicmail.com'];
      const args1 = [req.body.groupname, 'otaigbe@epicmail.com'];
      const args2 = [req.body.groupname, req.params.groupId, 'otaigbe@epicmail.com'];

      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
      if (dbOperationResult.rowCount === 1) {
        const dbOperationResult1 = await dbhelpers.performTransactionalQuery(queries.checkIfUserAlreadyHasGroupWithGroupName, args1);
        if (dbOperationResult1.rowCount > 0) {
          return res.status(400).json(response.groupFailure(`You Already have a group with name ${req.body.groupname}! Chooose a different group name`, 400));
        }
        if (dbOperationResult1.rowCount === 0) {
          const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.renameGroup, args2);
          return res.status(200).json(response.groupSuccess(null, `Group with id ${req.params.groupId} has been renamed to ${req.body.groupname}!`, 200));
        }
      } else if (dbOperationResult.rowCount === 0) {
        // not found
        return res.status(404).json(response.groupFailure(`Group with id ${req.params.groupId} doesnt exist for the creator`, 404));
      }
    }
    errorHandler.validationError(res, result);
  }

  static async addUserToGroup(req, res) {
    const result = Joi.validate(req.body, schema.addToGroup);
    if (result.error === null) {
      // check if user has agroup called groupname
      const args = [req.params.groupId, 'otaigbe@epicmail.com'];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.checkIfUserOwnsTheGroupAboutToBeDeleted, args);
      if (dbOperationResult.rowCount === 1) {
        const args2 = [req.params.groupId, req.body.userToBeAdded];
        // check if usertobeadded is not already a member
        const dbOperationResult3 = await dbhelpers.performTransactionalQuery(queries.CheckIfUserIsAlreadyAMember, args2);
        if (dbOperationResult3.rowCount > 0) {
          return res.status(200).json(response.groupSuccess(null, 'You are already a member of the Group!', 200));
        }
        // add user to group
        const dbOperationResult2 = await dbhelpers.performTransactionalQuery(queries.insertNewMembersIntoGroup, args2);
        return res.status(201).json(response.groupSuccess(null, 'User added to Group!', 201));
      }
      if (dbOperationResult.rowCount === 0) {
        return res.status(404).json(response.groupFailure(`Non existent Group with id ${req.params.groupId} for this user!`, 404));
      }
    }
  }

  static async deleteUserFromParticularGroup(req, res) {
    const epicmail = usefulFunc.generateFullEmailAddress(req.params.email);
    console.log(epicmail);
    const args = [req.params.groupId, epicmail];
    const dbOperationResult3 = await dbhelpers.performTransactionalQuery(queries.CheckIfUserIsAlreadyAMember, args);
    if (dbOperationResult3.rowCount > 0) {
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.deleteUserFromASpecificGroup, args);
      return res.status(200).json(response.groupSuccess(null, `user with email ${req.params.email} deleted from group`, 200));
    }
    if (dbOperationResult3.rowCount === 0) {
      return res.status(404).json(response.groupFailure(`You are not a member of Group with id ${req.params.groupId}! Nothing to delete`, 404));
    }
  }
}
