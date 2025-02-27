import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || 'something went wrong, try again later';
  res.status(statusCode).json({ error: message });
};

export default errorHandlerMiddleware;
