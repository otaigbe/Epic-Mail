/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import usefulFunc from '../helper/usefulFunc';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import dbhelper from '../model/dbHelper';
import queries from '../model/queries';

export default class SignupController {
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static async signup(req, res) {
    const result = Joi.validate(req.body, schema.userSchema);
    if (result.error === null) {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // const userId = usefulFunc.generateId();
      const userObj = {};
      // userObj.id = userId;
      userObj.email = usefulFunc.generateFullEmailAddress(req.body.username);
      userObj.firstName = req.body.firstName;
      userObj.lastName = req.body.lastName;
      userObj.password = hashedPassword;
      userObj.username = req.body.username;
      userObj.alternateEmail = req.body.alternateEmail;
      const args = [userObj.username];
      const dbOperationResult = await dbhelper.performTransactionalQuery(queries.checkForAlreadyExistentUser, args);
      if (dbOperationResult.rowCount === 0) {
        const args2 = [userObj.firstName, userObj.lastName, userObj.username, userObj.password, userObj.email, userObj.alternateEmail];
        const dbOperationResult2 = await dbhelper.performTransactionalQuery(queries.insertNewUser, args2);
        return res.status(201).json(response.success(null, 201));
      }
      return res.status(409).json(response.failure('chosen username/email already exists, choose a unique username.', null, 409));
    }
    errorHandler.validationError(res, result);
  }
}
