/* istanbul ignore file */
export default class Response {
  /**
 * @constructor
 * @param {string} message - The success message.
 * @param {string} code - The http status code returned.
 */
  static success(message, resource) {
    const data = resource;
    return {
      status: 'Success',
      message,
      data,
    };
  }

  static failure(message, error) {
    const errorObj = error;
    errorObj.message = message;
    return {
      status: 'Failed',
      error: errorObj,
    };
  }
}
