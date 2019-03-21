export default class Response {
  /**
 * @constructor
 * @param {object} token - The resource just created.
 * @param {string} message - The success message.
 * @param {string} code - The http status code returned.
 */
  static success(token, message, code) {
    return {
      status: code,
      data: [{
        token,
        message,
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
      status: code,
      data: {
        resource,
        message,
      },
    };
  }

  static groupsAll(resource, message, code) {
    return {
      status: code,
      message,
      data: resource,
    };
  }

  /**
 * @constructor
 * @param {string} message - The failure message.
 * @param {object} errorObj - The error object
 * @param {integer} code - The http status code returned.
 */
  static failure(message, code) {
    return {
      status: code,
      error: {
        message,
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
