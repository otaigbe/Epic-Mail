/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import queries from '../model/queries';
import helper from '../helper/helper';

export default class SignupController {
  /**
   * @method - This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} Success or failure message
   */
  static async signup(req, res) {
    const result = Joi.validate(req.body, schema.userSchema, { convert: false });
    if (result.error === null) {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userObj = {};
      userObj.email = helper.generateFullEmailAddress(req.body.username);
      userObj.firstName = req.body.firstname;
      userObj.lastName = req.body.lastname;
      userObj.password = hashedPassword;
      userObj.username = req.body.username;
      userObj.alternateEmail = req.body.alternateemail;
      const args = [userObj.username];
      const dbOperationResult = await helper.wrapDbOperationInTryCatchBlock(res, queries.checkForAlreadyExistentUser, args);
      if (dbOperationResult.rowCount === 0) {
        const args2 = [userObj.firstName, userObj.lastName, userObj.username, userObj.password, userObj.email, userObj.alternateEmail];
        const dbOperationResult2 = await helper.wrapDbOperationInTryCatchBlock(res, queries.insertNewUser, args2);
        const user = {};
        user.id = dbOperationResult2.rows[0].userid;
        user.username = userObj.username;
        user.email = userObj.email;
        const token = jwt.sign(user, process.env.SECRETKEY);
        user.token = token;
        res.set('x-auth-token', token);
        return res.status(201).json(response.success('Signup Successful!Login With your new email', user));
      }
      return res.status(409).json(response.failure('chosen username/email already exists, choose a unique username.', {}));
    }
    errorHandler.validationError(res, result);
  }
}
