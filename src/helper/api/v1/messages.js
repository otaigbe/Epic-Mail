/* eslint-disable prefer-destructuring */
import Joi from 'joi';
import usefulfunc from '../../misc/usefulFunc';
import schema from '../../misc/schema';
import errorHandler from '../../errorHandler/errorHandler';
import storage from '../../../fixtures/messages';
import response from '../../misc/responseSchema';


const messages = {};

messages.sendMail = (req, res) => {
  const result = Joi.validate(req.body, schema.message);
  if (result.error === null) {
    const message = {};
    message.to = req.body.to;
    message.cc = req.body.cc;
    message.messageBody = req.body.message;
    message.subject = req.body.subject;
    message.createdOn = Date.now();
    message.id = usefulfunc.generateId();
    message.parentMessageId = req.body.parentMessageId;
    message.from = req.body.from;
    const id = usefulfunc.insertMessageIntoStorage(storage, message);
    if (!id) {
      return res.status(501).json(response.failure('Something went wrong!Couldn\'t save message', null, 501));
    }
    if (message.from) {
      message.status = 'unread';
      message.type = 'received';
    } else if (message.to) {
      message.type = 'sent';
    }
    // console.log(message);
    return res.status(201).json(response.success('POST', req, message, 'message created and saved successfully', 201));
  }
  errorHandler.validationError(res, result);
};


export default messages;
