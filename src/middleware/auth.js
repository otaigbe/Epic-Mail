/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      status: 'Unauthoutrized',
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
        status: 'Bad Request',
        message: 'Invalid Token!',
      });
    }
  }
};

export default auth;
