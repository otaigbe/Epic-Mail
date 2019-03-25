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
