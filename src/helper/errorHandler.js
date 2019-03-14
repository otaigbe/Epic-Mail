// const errorHandler = {};

// /* istanbul ignore next */
// errorHandler.validationError = (res, result) => res.status(422).json({
//   status: 400,
//   error: {
//     message: 'Something wrong with input!',
//     errorObj: result.error,
//   },
// });
// export default errorHandler;


export default class ErrorHandler {
  
  static validationError(res, result) {
    return res.status(400).json({
      status: 400,
      error: {
        message: 'Something wrong with input!',
        errorObj: result.error,
      },
    });
  }
}
