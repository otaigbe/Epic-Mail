import jwt from 'jsonwebtoken';

export default class Authentication {
  /**
   * @param {object} req client request Object
   * @param {object} res server response object
   * @param {object} next control structure to continue processing
   * @returns {JSON}
   */
  static auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({
        status: 'failure',
        message: 'No access token provided!',
      });
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(400).send({
          status: 'failure',
          message: 'Invalid Token!',
        });
      }
    }
  }
}
