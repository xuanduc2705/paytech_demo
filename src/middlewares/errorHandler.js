const logger = {
  info: console.log,
  error: console.error,
};
const errorResponse = (res, status, message, code) => {
  status = typeof status === 'number' ? status : 400;
  return res.status(status).json({
    status: 'error',
    code,
    message,
  });
};
export const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    messageage: err.messageage,
    stack: err.stack,
    status: err.status,
    code: err.code,
    path: req.path,
    method: req.method,
    requestId: req.id,
  });

  const isDevelopment = process.env.NODE_ENV === 'development';
  const messageage = isDevelopment ? err.messageage : 'Internal Server Error';

  errorResponse(res, err.status || 500, messageage, err.code || 'INTERNAL_ERROR');
};
