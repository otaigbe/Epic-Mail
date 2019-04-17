import dbhelper from '../model/dbHelper';
/**
 * Class holding useful helper functions
 */
export default class Helpers {
  /**
   * This method auto generates an email from the username provided
   * @method
   * @param {string} username - username string
   */
  static generateFullEmailAddress(username) {
    return `${username}@epicmail.com`;
  }

  /**
 * This method performs the sql query
 * @method
 * @param {object} res - server response object
 * @param {object} query - SQL query
 * @param {array} args - an array of arguments to be used as input to the query
 * @param {Object} - Query result
 */
  static async wrapDbOperationInTryCatchBlock(res, query, args) {
    try {
      const dboperationResult = await dbhelper.performTransactionalQuery(query, args);
      return dboperationResult;
    } catch (error) {
      /* istanbul ignore next */
      return res.status(400).json({
        status: 'failure',
        error: {
          message: 'SQL Query Error',
        },
      });
    }
  }
}
