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
          return res.status(201).json(response.groupFailure(`You Already have a group with name ${group.groupName}! Chooose a different group name`, 400));
      }
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.createGroup, args);
      return res.status(201).json(response.groupSuccess(group, 'Group created!', 200));
    } else {
    errorHandler.validationError(res, result);
    }
  }
}
