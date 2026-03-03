
import Helpers from '../utils/helpers.js';

class BaseController {
 
  constructor(service) {
    this.service = service;
  }


  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }


  success(res, data, message = 'Success', statusCode = 200, meta = null) {
    res.status(statusCode).json(Helpers.successResponse(data, message, meta));
  }


  created(res, data, message = 'Created successfully') {
    this.success(res, data, message, 201);
  }

  noContent(res) {
    res.status(204).send();
  }
}

export default BaseController;
