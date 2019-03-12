/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import usefulFunc from '../../misc/usefulFunc';
import schema from '../../misc/schema';
import errorHandler from '../../errorHandler/errorHandler';
import response from '../../misc/responseSchema';

const auth = {};

auth.signup = async (req, res) => {
  const result = Joi.validate(req.body, schema.userSchema);
  if (result.error === null) {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = usefulFunc.generateId();
    const userObj = {};
    userObj.id = userId;
    userObj.email = usefulFunc.generateFullEmailAddress(req.body.username);
    userObj.firstName = req.body.firstName;
    userObj.lastName = req.body.lastName;
    userObj.password = hashedPassword;
    userObj.username = req.body.username;
    userObj.alternateEmail = req.body.alternateEmail;
    const existentUsername = usefulFunc.searchForAlreadyExistingUsername(userObj);
    if (!existentUsername) {
      const id = usefulFunc.insertIntoStorage(userObj);
      return res.status(201).json(response.success('POST', req, userObj, `Account created!Welcome ${req.body.username}`, 201));
    }
    return res.status(409).json(response.failure('chosen username/email already exists, choose a unique username.', null, 409));
  } else {
    errorHandler.validationError(res, result);
  }
};

auth.signin = async (req, res) => {
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
};

export default auth;
