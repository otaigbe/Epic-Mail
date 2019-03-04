import authFunctions from '../../helper/api/v1/auth';

const signupImpl = {};

signupImpl.signup = (req, res) => {
  authFunctions.signup(req, res);
};

export default signupImpl;
