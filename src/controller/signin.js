/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import usefulFunc from '../helper/usefulFunc';
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
    const result = Joi.validate(req.body, schema.signinSchema);
    if (result.error === null) {
      // const found = usefulFunc.searchForUsernameAndPassword(req.body);
      const args = [req.body.email];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.searchForEmail, args);
      if (dbOperationResult.rowCount === 1) {
        const validPassword = await bcrypt.compare(req.body.password, dbOperationResult.rows[0].password);
        if (!validPassword) {
          return res.status(400).json(response.failure('Invalid username or password.', null, 400));
        }
        return res.status(200).json(response.success('POST', req, null, `Welcome ${dbOperationResult.rows[0].username}`, 200));
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }
}
