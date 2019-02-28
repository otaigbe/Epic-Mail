export default function (err, res) {
    res.status(501).json({
      message: 'Something went wrong!',
      Error: err.message,
    });
  }
  