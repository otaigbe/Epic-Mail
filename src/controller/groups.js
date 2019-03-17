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

}
