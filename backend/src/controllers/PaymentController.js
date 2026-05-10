import paymentService from '../services/PaymentService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

const formatError = (error) => {
  if (error?.name === 'ZodError') {
    return error.issues?.map((i) => i.message).join('; ') || 'Validation failed';
  }
  return error.message || 'Internal server error';
};

class PaymentController {
  /**
   * POST /api/payments/create-order
   * Body: { bookingId }
   */
  async createOrder(req, res) {
    try {
      const result = await paymentService.createOrder(req.user.id, req.body.bookingId);
      return res.status(200).json(new ApiResponse(200, 'Razorpay order created', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * POST /api/payments/verify
   * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId }
   */
  async verifyPayment(req, res) {
    try {
      const result = await paymentService.verifyPayment(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Payment verified', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * POST /api/payments/failure
   * Body: { razorpay_order_id, bookingId }
   */
  async handleFailure(req, res) {
    try {
      const result = await paymentService.handlePaymentFailure(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Payment failure recorded', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }
}

export default new PaymentController();
