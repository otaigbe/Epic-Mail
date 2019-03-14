/* eslint-disable consistent-return */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import usefulFunc from '../helper/usefulFunc';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';

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
      const found = usefulFunc.searchForUsernameAndPassword(req.body);
      if (found) {
        const validPassword = await bcrypt.compare(req.body.password, found.password);
        if (!validPassword) {
          return res.status(400).json(response.failure('Invalid username or password.', null, 400));
        }
        return res.status(200).json(response.success('POST', req, found, `Welcome ${found.username}`, 200));
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }
}
