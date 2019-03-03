const errorHandler = {};

/* istanbul ignore next */
errorHandler.validationError = (res, result) => res.status(422).json({
  status: 422,
  error: {
    message: 'Something wrong with input!',
    errorObj: result.error,
  },
});
export default errorHandler;
