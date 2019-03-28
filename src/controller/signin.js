/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import dbhelpers from '../model/dbHelper';
import queries from '../model/queries';

export default class SigninController {
  /**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static async signin(req, res) {
    const result = Joi.validate(req.body, schema.signinSchema, { convert: false });
    if (result.error === null) {
      const args = [req.body.email.trim()];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.searchForEmail, args);
      if (dbOperationResult.rowCount === 1) {
        const validPassword = await bcrypt.compare(req.body.password, dbOperationResult.rows[0].password);
        const user = {};
        user.id = dbOperationResult.rows[0].userid;
        user.username = dbOperationResult.rows[0].username;
        user.email = dbOperationResult.rows[0].email;
        if (!validPassword) {
          return res.status(400).json(response.failure('Invalid username or password.', {}));
        }
        const token = jwt.sign(user, process.env.SECRETKEY);
        user.token = token;
        res.set('x-auth-token', token);
        return res.status(200).json(response.success(`Welcome! ${user.username}`, user));
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }
}
