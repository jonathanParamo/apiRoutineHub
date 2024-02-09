export function successResponse ( req, res, message, status ) {
  const statusCode = status || 200;
  const messageOk = message || '';

  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: messageOk,
  });
};

export function errorResponse ( req, res, message, status ) {
  const statusCode = status || 500;
  const messageError = message || 'Internal error, try again later';

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: messageError,
  });
};