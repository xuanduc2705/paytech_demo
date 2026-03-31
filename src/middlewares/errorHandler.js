const logger = {
  info: console.log,
  error: console.error,
};
const errorResponse = (res, status, mess, code) => {
  status = typeof status === 'number' ? status : 400;
  return res.status(status).json({
    status: 'error',
    code,
    mess,
  });
};
export const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    status: err.status,
    code: err.code,
    path: req.path,
    method: req.method,
    requestId: req.id,
  });

  const isDevelopment = process.env.NODE_ENV === 'development';
  const message = isDevelopment ? err.message : 'Internal Server Error';

  errorResponse(res, err.status || 500, message, err.code || 'INTERNAL_ERROR');
};
