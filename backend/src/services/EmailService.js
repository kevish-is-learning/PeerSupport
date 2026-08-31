/**
 * Email Service
 *
 * Central dispatch for all transactional emails via SMTP (Nodemailer).
 * Each method is fire-and-forget (non-blocking) to avoid
 * slowing down API responses.
 *
 * If SMTP is not configured, methods silently no-op.
 */

import { transporter, FROM_EMAIL } from '../config/mailer.js';
import {
  welcomeEmail,
  bookingConfirmedMenteeEmail,
  newBookingMentorEmail,
  bookingCancelledEmail,
  sessionCompletedMenteeEmail,
  sessionCompletedMentorEmail,
  paymentReceiptEmail,
} from '../emails/templates.js';
import { generateInvoiceBuffer } from '../utils/invoiceGenerator.js';

class EmailService {
  /**
   * Internal send helper — wraps the SMTP transport call with error handling.
   * Never throws; logs errors and continues.
   */
  async _send(to, { subject, html, text, attachments }) {
    const recipient = typeof to === 'string' ? to.trim() : '';
    if (!recipient) {
      console.warn(`📧 [EmailService] Skipping "${subject}" — recipient email is missing`);
      return null;
    }

    if (!transporter) {
      console.log(`📧 [EmailService] SMTP not configured — skipping email to ${recipient}: "${subject}"`);
      return null;
    }

    try {
      const info = await transporter.sendMail({
        from: FROM_EMAIL,
        to: recipient,
        subject,
        html,
        text,
        attachments,
      });

      console.log(`📧 [EmailService] Email sent to ${recipient}: "${subject}" (id: ${info?.messageId})`);
      return info;
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
      recipientRole: 'MENTEE',
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
      recipientRole: 'MENTOR',
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

    try {
      const invoiceBuffer = await generateInvoiceBuffer({
        paymentId,
        amount,
        currency,
        paidAt,
        menteeName,
        menteeEmail,
        mentorName,
        serviceName,
        bookingId,
      });

      template.attachments = [
        {
          filename: `Invoice-${paymentId}.pdf`,
          content: invoiceBuffer,
        },
      ];
    } catch (err) {
      console.error(`📧 [EmailService] Failed to generate invoice PDF for payment ${paymentId}:`, err.message);
    }

    return this._send(menteeEmail, template);
  }
}

export default new EmailService();
