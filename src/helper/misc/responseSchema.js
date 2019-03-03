const response = {};

response.success = (method, req, resource, message, code) => ({
  status: code,
  data: {
    message,
    'request-type': method,
    url: req.originalUrl,
    resource,
  },
});

response.failure = (message, errorObj, code) => ({
  status: code,
  error: {
    message,
    error: errorObj,
  },
});

export default response;
