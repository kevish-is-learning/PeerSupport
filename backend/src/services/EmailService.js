import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail({ to, subject, html, text }) {
    try {
      const mailOptions = {
        from: `"PeerSupport" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendBookingConfirmationToMentee({ menteeEmail, menteeName, mentorName, slotDate, slotTime, bookingId }) {
    const subject = 'Booking Confirmed - PeerSupport';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .booking-details { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .btn { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed! 🎉</h1>
          </div>
          <div class="content">
            <p>Hi ${menteeName},</p>
            <p>Great news! Your mentoring session has been confirmed. Here are the details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Mentor</span>
                <span class="value">${mentorName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${slotDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time</span>
                <span class="value">${slotTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Booking ID</span>
                <span class="value">${bookingId}</span>
              </div>
            </div>
            
            <p>You'll receive the meeting link before your session. Make sure to prepare any questions you'd like to discuss!</p>
            
            <a href="${process.env.FRONTEND_URL}/dashboard/bookings" class="btn">View Booking</a>
            
            <div class="footer">
              <p>Best regards,<br>The PeerSupport Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: menteeEmail,
      subject,
      html,
      text: `Hi ${menteeName}, Your booking with ${mentorName} on ${slotDate} at ${slotTime} has been confirmed. Booking ID: ${bookingId}`,
    });
  }

  async sendBookingNotificationToMentor({ mentorEmail, mentorName, menteeName, slotDate, slotTime, bookingId, purpose, shareProfile }) {
    const subject = 'New Booking Received - PeerSupport';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .booking-details { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee; }
          .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; display: block; margin-bottom: 5px; }
          .value { color: #333; }
          .purpose-box { background: #f0f0f0; padding: 15px; border-radius: 6px; margin-top: 15px; }
          .btn { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
          .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .badge-green { background: #d4edda; color: #155724; }
          .badge-gray { background: #e9ecef; color: #6c757d; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Booking! 📅</h1>
          </div>
          <div class="content">
            <p>Hi ${mentorName},</p>
            <p>You have a new mentoring session booked. Here are the details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Mentee</span>
                <span class="value">${menteeName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${slotDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time</span>
                <span class="value">${slotTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Booking ID</span>
                <span class="value">${bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Profile Shared</span>
                <span class="value">
                  ${shareProfile 
                    ? '<span class="badge badge-green">Yes - Profile Available</span>' 
                    : '<span class="badge badge-gray">No</span>'}
                </span>
              </div>
            </div>
            
            <div class="purpose-box">
              <span class="label">Session Purpose</span>
              <p class="value">${purpose}</p>
            </div>
            
            <a href="${process.env.FRONTEND_URL}/dashboard/sessions" class="btn">View Session</a>
            
            <div class="footer">
              <p>Best regards,<br>The PeerSupport Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: mentorEmail,
      subject,
      html,
      text: `Hi ${mentorName}, You have a new booking from ${menteeName} on ${slotDate} at ${slotTime}. Purpose: ${purpose}. Booking ID: ${bookingId}`,
    });
  }

  async sendPaymentConfirmation({ email, name, amount, bookingId, paymentId }) {
    const subject = 'Payment Successful - PeerSupport';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #22c55e; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .payment-details { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee; }
          .amount { font-size: 32px; font-weight: bold; color: #22c55e; text-align: center; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Successful ✓</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Your payment has been processed successfully.</p>
            
            <div class="payment-details">
              <p class="amount">₹${amount}</p>
              <div class="detail-row">
                <span>Booking ID</span>
                <span>${bookingId}</span>
              </div>
              <div class="detail-row">
                <span>Payment ID</span>
                <span>${paymentId}</span>
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for using PeerSupport!</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
      text: `Hi ${name}, Your payment of ₹${amount} was successful. Booking ID: ${bookingId}, Payment ID: ${paymentId}`,
    });
  }
}

export default new EmailService();
