/* istanbul ignore file */
export default class Response {
  /**
 * @constructor
 * @param {object} token - The resource just created.
 * @param {string} message - The success message.
 * @param {string} code - The http status code returned.
 */
  static success(message, resource) {
    const data = resource;
    data.message = message;
    return {
      status: 'Success',
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
