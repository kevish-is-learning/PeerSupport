import { apiClient } from '../lib/api-client';
import { ApiResponse } from '../types';

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  bookingId: string;
  keyId: string;
}

export interface PaymentVerification {
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface PaymentDetails {
  id: string;
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: 'CREATED' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  booking?: {
    id: string;
    mentor: {
      id: string;
      name: string;
      email: string;
    };
    slot: {
      startTime: string;
      endTime: string;
    };
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const paymentService = {
  async createPaymentOrder(bookingId: string) {
    const response = await apiClient.post<ApiResponse<PaymentOrder>>(
      '/payments/create-order',
      { bookingId }
    );
    return response.data;
  },

  async verifyPayment(data: PaymentVerification) {
    const response = await apiClient.post<ApiResponse<{
      bookingId: string;
      paymentId: string;
      status: string;
    }>>(
      '/payments/verify',
      data
    );
    return response.data;
  },

  async handlePaymentFailure(razorpayOrderId: string) {
    const response = await apiClient.post<ApiResponse<{
      bookingId: string;
      status: string;
    }>>(
      '/payments/failure',
      { razorpayOrderId }
    );
    return response.data;
  },

  async getPaymentDetails(bookingId: string) {
    const response = await apiClient.get<ApiResponse<PaymentDetails>>(
      `/payments/booking/${bookingId}`
    );
    return response.data;
  },

  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  async initiatePayment({
    orderId,
    amount,
    currency,
    keyId,
    bookingId,
    userEmail,
    userName,
    onSuccess,
    onFailure,
  }: {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    bookingId: string;
    userEmail: string;
    userName: string;
    onSuccess: (response: any) => void;
    onFailure: (error: any) => void;
  }) {
    const scriptLoaded = await this.loadRazorpayScript();
    if (!scriptLoaded) {
      onFailure(new Error('Failed to load Razorpay SDK'));
      return;
    }

    const options = {
      key: keyId,
      amount: amount, // Amount in paise
      currency: currency,
      name: 'PeerSupport',
      description: `Session Booking - ${bookingId}`,
      order_id: orderId,
      handler: async (response: any) => {
        try {
          // Verify payment on backend
          const verifyResponse = await this.verifyPayment({
            bookingId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          onSuccess(verifyResponse);
        } catch (error) {
          onFailure(error);
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
      },
      theme: {
        color: '#000000',
      },
      modal: {
        ondismiss: () => {
          onFailure(new Error('Payment cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', async (response: any) => {
      try {
        await this.handlePaymentFailure(orderId);
      } catch (e) {
        console.error('Failed to handle payment failure:', e);
      }
      onFailure(response.error);
    });
    razorpay.open();
  },
};
