import { ApiResponse } from './apiResponse.js';

export const getErrorStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

export const getErrorMessage = (error, fallback = 'Internal server error') => {
  if (error?.name === 'ZodError') {
    return error.issues?.map((issue) => issue.message).join('; ') || 'Validation failed';
  }

  return error?.message || fallback;
};

export const sendControllerError = (res, error, options = {}) => {
  const {
    fallback,
    extras = () => ({}),
  } = options;

  return res.status(getErrorStatusCode(error)).json({
    success: false,
    message: getErrorMessage(error, fallback),
    ...extras(error),
  });
};

export const respond = async (res, options) => {
  const {
    action,
    message,
    statusCode = 200,
    data = (result) => result,
    error,
  } = options;

  try {
    const result = await action();
    return res.status(statusCode).json(new ApiResponse(statusCode, message, data(result)));
  } catch (caughtError) {
    return sendControllerError(res, caughtError, error);
  }
};

export const respondJson = async (res, options) => {
  const {
    action,
    data = (result) => ({ success: true, data: result }),
    error,
  } = options;

  try {
    return res.json(data(await action()));
  } catch (caughtError) {
    return sendControllerError(res, caughtError, error);
  }
};
