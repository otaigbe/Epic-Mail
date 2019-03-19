export default class Response {
  /**
 * Represents a book.
 * @constructor
 * @param {string} method - The http method.
 * @param {object} req - The request object.
 * @param {object} resource - The resource just created.
 * @param {string} message - The success message.
 * @param {integer} code - The http status code returned.
 */
  static success(token, code) {
    return {
      status: code,
      data: [{
        token,
      }],
    };
  }

  static messageSuccess(resource, code) {
    return {
      status: code,
      data: [{
        resource,
      }],
    };
  }
  
  static groupSuccess(resource, message, code) {
    return {
      message,
      status: code,
      data: resource,
    };
  }


  /**
 * Represents a book.
 * @constructor
 * @param {string} message - The failure message.
 * @param {object} errorObj - The error object
 * @param {integer} code - The http status code returned.
 */
  static failure(message, errorObj, code) {
    return {
      status: code,
      error: {
        message,
        error: errorObj,
      },
    };
  }

  static groupFailure(message, code) {
    return {
      status: code,
      error: {
        message,
      },
    };
  }
}
