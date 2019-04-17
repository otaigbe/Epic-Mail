import Joi from 'joi';

export default class Schemas {
  /**
   * returns schema for validating user signup data
   * @returns {Object} schema for validation
   */
  static get userSchema() {
    return Joi.object({
      username: Joi.string().trim().min(2).required(),
      firstname: Joi.string().min(2).trim().required(),
      lastname: Joi.string().trim().min(2).required(),
      password: Joi.string().alphanum().min(4).trim()
        .max(50)
        .required(),
      alternateemail: Joi.string().email().min(5).trim()
        .required(),
    });
  }

  /**
   * returns schema for validating user signin data
   * @returns {Object} schema for validation
   */
  static get signinSchema() {
    return Joi.object({
      email: Joi.string().email().regex(/epicmail\.com$/).min(13)
        .trim()
        .required(),
      password: Joi.string().alphanum().trim().min(4)
        .max(50)
        .required(),
    });
  }

  /**
   * returns schema for validating message data
   * @returns {Object} schema for validation
   */
  static get message() {
    return Joi.object({
      parentmessageid: Joi.number().integer().max(1000000),
      subject: Joi.string().min(4).trim().required(),
      message: Joi.string().min(5).trim().required(),
      receiver: Joi.string().email().regex(/epicmail\.com$/).min(13)
        .trim(),
    });
  }

  /**
   * returns schema for validating group message data
   * @returns {Object} schema for validation
   */
  static get groupMessage() {
    return Joi.object({
      subject: Joi.string().min(3).trim().required(),
      message: Joi.string().min(4).trim().required(),
    });
  }

  /**
   * returns schema for validating create group data
   * @returns {Object} schema for validation
   */
  static get createGroup() {
    return Joi.object({
      groupname: Joi.string().trim().alphanum().min(4)
        .max(30)
        .required(),
    });
  }

  /**
   * returns schema for validating rename group data
   * @returns {Object} schema for validation
   */
  static get rename() {
    return Joi.object({
      groupname: Joi.string().alphanum().min(4).max(30)
        .trim()
        .required(),
    });
  }

  /**
   * returns schema for validating reset password data
   * @returns {Object} schema for validation
   */
  static get newpass() {
    return Joi.object({
      password: Joi.string().alphanum().min(4).max(50)
        .required(),
      confirmpassword: Joi.string().alphanum().min(4).max(50)
        .required(),
    });
  }

  /**
   * returns schema for validating add user to group data
   * @returns {Object} schema for validation
   */
  static get addToGroup() {
    return Joi.object({
      useremail: Joi.string().email().regex(/epicmail\.com$/).max(256)
        .trim()
        .required(),
    });
  }

  /**
   * returns schema for validating reset password data
   * @returns {Object} schema for validation
   */
  static get resetSchema() {
    return Joi.object({
      email: Joi.string().email().regex(/epicmail\.com$/).max(256)
        .trim()
        .required(),
    });
  }

  /**
   * returns schema for validating messageId request parameter data
   * @returns {Object} schema for validation
   */
  static get messageId() {
    return Joi.object({
      messageId: Joi.number().positive().integer().required(),
    });
  }

  /**
   * returns schema for validating draft message request data
   * @returns {Object} schema for validation
   */
  static get draft() {
    return Joi.object({
      subject: Joi.string().min(4).trim().required(),
      message: Joi.string().min(5).trim().required(),
      receiver: Joi.string().email().regex(/epicmail\.com$/).min(13)
        .trim(),
    });
  }

  /**
   * returns schema for validating groupId request parameters data
   * @returns {Object} schema for validation
   */
  static get groupId() {
    return Joi.object({
      groupId: Joi.number().positive().integer().required(),
    });
  }

  /**
   * returns schema for validating delete user from group request parameters data
   * @returns {Object} schema for validation
   */
  static get deleteUserFromGroup() {
    return Joi.object({
      groupId: Joi.number().positive().integer().required(),
      userId: Joi.number().positive().integer().required(),
    });
  }
}
