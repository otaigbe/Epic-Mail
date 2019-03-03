import authFunctions from '../../helper/api/v1/auth';

const signinImpl = {};

signinImpl.signin = (req, res) => {
  authFunctions.signin(req, res);
};


export default signinImpl;
