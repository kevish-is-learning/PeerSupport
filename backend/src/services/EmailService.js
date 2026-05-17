/**
 * Email Service
 *
 * Central dispatch for all transactional emails via Resend.
 * Each method is fire-and-forget (non-blocking) to avoid
 * slowing down API responses.
 *
 * If Resend is not configured (no API key), methods silently no-op.
 */

import { resend, FROM_EMAIL } from '../config/resend.js';
import {
  welcomeEmail,
  bookingConfirmedMenteeEmail,
  newBookingMentorEmail,
  bookingCancelledEmail,
  sessionCompletedMenteeEmail,
  sessionCompletedMentorEmail,
  paymentReceiptEmail,
} from '../emails/templates.js';

class EmailService {
  /**
   * Internal send helper — wraps Resend API call with error handling.
   * Never throws; logs errors and continues.
   */
  async _send(to, { subject, html }) {
    if (!resend) {
      console.log(`📧 [EmailService] Resend not configured — skipping email to ${to}: "${subject}"`);
      return null;
    }

    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to,
        subject,
        html,
      });

      if (error) {
        console.error(`📧 [EmailService] Failed to send email to ${to}:`, error);
        return null;
      }

      console.log(`📧 [EmailService] Email sent to ${to}: "${subject}" (id: ${data?.id})`);
      return data;
    } catch (err) {
      console.error(`📧 [EmailService] Unexpected error sending email to ${to}:`, err.message);
      return null;
    }
  }

  // ─── Welcome / Registration ──────────────────────────────────────────────

  /**
   * Send welcome email after user registration.
   * @param {{ name: string, email: string, role: string }} user
   */
  async sendWelcomeEmail({ name, email, role }) {
    const template = welcomeEmail({ name, email, role });
    return this._send(email, template);
  }

  // ─── Booking Confirmed ──────────────────────────────────────────────────

  /**
   * Send booking confirmation email to the mentee.
   */
  async sendBookingConfirmedToMentee({
    menteeEmail,
    menteeName,
    mentorName,
    serviceName,
    startTime,
    endTime,
    amount,
    bookingId,
  }) {
    const template = bookingConfirmedMenteeEmail({
      menteeName,
      mentorName,
      serviceName,
      startTime,
      endTime,
      amount,
      bookingId,
    });
    return this._send(menteeEmail, template);
  }

  /**
   * Send new booking alert to the mentor.
   */
  async sendNewBookingToMentor({
    mentorEmail,
    mentorName,
    menteeName,
    menteeEmail,
    serviceName,
    startTime,
    endTime,
    amount,
    purposeOfCall,
    bookingId,
  }) {
    const template = newBookingMentorEmail({
      mentorName,
      menteeName,
      menteeEmail,
      serviceName,
      startTime,
      endTime,
      amount,
      purposeOfCall,
      bookingId,
    });
    return this._send(mentorEmail, template);
  }

  // ─── Booking Cancelled ──────────────────────────────────────────────────

  /**
   * Send cancellation emails to both mentor and mentee.
   */
  async sendBookingCancelledEmails({
    menteeEmail,
    menteeName,
    mentorEmail,
    mentorName,
    serviceName,
    startTime,
    endTime,
    cancelledReason,
    cancelledByRole,
    bookingId,
  }) {
    // Email to mentee
    const menteeTemplate = bookingCancelledEmail({
      recipientName: menteeName,
      cancelledByRole,
      mentorName,
      menteeName,
      serviceName,
      startTime,
      endTime,
      cancelledReason,
      bookingId,
    });

    // Email to mentor
    const mentorTemplate = bookingCancelledEmail({
      recipientName: mentorName,
      cancelledByRole,
      mentorName,
      menteeName,
      serviceName,
      startTime,
      endTime,
      cancelledReason,
      bookingId,
    });

    // Send both in parallel (fire-and-forget)
    return Promise.all([
      this._send(menteeEmail, menteeTemplate),
      this._send(mentorEmail, mentorTemplate),
    ]);
  }

  // ─── Session Completed ──────────────────────────────────────────────────

  /**
   * Send session completed emails to both mentor and mentee.
   */
  async sendSessionCompletedEmails({
    menteeEmail,
    menteeName,
    mentorEmail,
    mentorName,
    serviceName,
    startTime,
    bookingId,
  }) {
    const menteeTemplate = sessionCompletedMenteeEmail({
      menteeName,
      mentorName,
      serviceName,
      startTime,
      bookingId,
    });

    const mentorTemplate = sessionCompletedMentorEmail({
      mentorName,
      menteeName,
      serviceName,
      startTime,
      bookingId,
    });

    return Promise.all([
      this._send(menteeEmail, menteeTemplate),
      this._send(mentorEmail, mentorTemplate),
    ]);
  }

  // ─── Payment Receipt ────────────────────────────────────────────────────

  /**
   * Send payment receipt email to the mentee.
   */
  async sendPaymentReceipt({
    menteeEmail,
    menteeName,
    mentorName,
    serviceName,
    amount,
    currency,
    paymentId,
    paidAt,
    bookingId,
    startTime,
  }) {
    const template = paymentReceiptEmail({
      menteeName,
      mentorName,
      serviceName,
      amount,
      currency,
      paymentId,
      paidAt,
      bookingId,
      startTime,
    });
    return this._send(menteeEmail, template);
  }
}

export default new EmailService();
