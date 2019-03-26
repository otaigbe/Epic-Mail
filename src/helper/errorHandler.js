export default class ErrorHandler {
  static validationError(res, result) {
    return res.status(400).json({
      status: 'failure',
      error: {
        message: result.error.message,
      },
    });
  }
}
