/* eslint-disable consistent-return */
/* istanbul ignore file */
import Joi from 'joi';
import mailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import schema from '../helper/schema';
import errorHandler from '../helper/errorHandler';
import response from '../helper/responseSchema';
import dbhelpers from '../model/dbHelper';
import queries from '../model/queries';
import mail from '../helper/mail';

export default class ResetController {
  /**
   * This sends the mail with the link for password resetting
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {JSON} Success or failure message including additional data
   */
  static async reset(req, res) {
    const result = Joi.validate(req.body, schema.resetSchema);
    if (result.error === null) {
      const args = [req.body.email];
      const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.searchForUser, args);
      if (dbOperationResult.rowCount > 0) {
        const alternate = dbOperationResult.rows[0].alternateemail;
        const user = {};
        user.id = dbOperationResult.rows[0].userid;
        user.username = dbOperationResult.rows[0].username;
        user.email = dbOperationResult.rows[0].email;
        const token = jwt.sign(user, process.env.SECRETKEY);
        const url = `https://otaigbe.github.io/Epic-Mail/UI/passwordReset.html?token=${token}`;
        const mailObj = mailer.createTransport(mail.transportOptions());
        const options = mail.mailOptions(url, alternate);
        const mailResponse = await mailObj.sendMail(options);
        return res.status(200).json({
          status: 200,
          data: mailResponse.info,
          message: 'Mail sent successfully',
        });
      }
      return res.status(404).json(response.failure('User was not found', 404));
    }
    errorHandler.validationError(res, result);
  }

  static async confirmReset(req, res) {
    const result = Joi.validate(req.body, schema.newpass);
    if (result.error === null) {
      if (req.body.password !== req.body.confirmpassword) return res.json({ message: 'verify your password' });
      const token = req.header('token');
      try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const args = [req.body.password, decoded.email, decoded.id];
        const dbOperationResult = await dbhelpers.performTransactionalQuery(queries.updatePassword, args);
        if (dbOperationResult.rowCount === 1) {
          return res.status(200).json({
            status: 'Success',
            data: {
              message: 'password updated successfully',
            },
          });
        }
      } catch (error) {
        return res.status(400).json({
          message: 'Invalid Token',
        });
      }
    } else {
      errorHandler.validationError(res, result);
    }
  }
}
