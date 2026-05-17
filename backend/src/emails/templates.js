/**
 * Email Templates
 *
 * Premium, responsive HTML email templates for PeerSupport notifications.
 * Each template function accepts data and returns { subject, html }.
 */

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ─── Shared Layout ──────────────────────────────────────────────────────────

function layout(title, bodyContent) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    body { margin: 0; padding: 0; width: 100% !important; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    /* Base */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f0f0f0;
      color: #1a1a1a;
    }

    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    .email-card {
      background: #ffffff;
      border: 3px solid #1a1a1a;
      border-radius: 12px;
      box-shadow: 6px 6px 0px #1a1a1a;
      overflow: hidden;
    }

    .email-header {
      background: #1a1a1a;
      padding: 28px 32px;
      text-align: center;
    }

    .email-header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    .email-header .logo-accent {
      color: #fbbf24;
    }

    .email-body {
      padding: 32px;
    }

    .email-body h2 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }

    .email-body .subtitle {
      margin: 0 0 24px 0;
      font-size: 15px;
      color: #6b7280;
      line-height: 1.5;
    }

    .email-body p {
      margin: 0 0 16px 0;
      font-size: 15px;
      line-height: 1.6;
      color: #374151;
    }

    /* Info card (used for booking details, session details, etc.) */
    .info-card {
      background: #fffbeb;
      border: 2px solid #1a1a1a;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }

    .info-card .info-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 14px;
      border-bottom: 1px dashed #e5e7eb;
    }

    .info-card .info-row:last-child {
      border-bottom: none;
    }

    .info-card .info-label {
      font-weight: 700;
      color: #1a1a1a;
    }

    .info-card .info-value {
      color: #4b5563;
      text-align: right;
    }

    /* CTA Button */
    .cta-button {
      display: inline-block;
      background: #1a1a1a;
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      margin: 20px 0;
      border: 2px solid #1a1a1a;
      box-shadow: 4px 4px 0px #fbbf24;
      transition: all 0.2s;
    }

    .cta-button:hover {
      box-shadow: 2px 2px 0px #fbbf24;
      transform: translate(2px, 2px);
    }

    /* Status badge */
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-confirmed {
      background: #d1fae5;
      color: #065f46;
      border: 1.5px solid #065f46;
    }

    .status-cancelled {
      background: #fee2e2;
      color: #991b1b;
      border: 1.5px solid #991b1b;
    }

    .status-completed {
      background: #dbeafe;
      color: #1e40af;
      border: 1.5px solid #1e40af;
    }

    /* Divider */
    .divider {
      height: 2px;
      background: #e5e7eb;
      margin: 24px 0;
      border: none;
    }

    /* Footer */
    .email-footer {
      padding: 20px 32px;
      text-align: center;
      border-top: 2px solid #e5e7eb;
    }

    .email-footer p {
      margin: 4px 0;
      font-size: 12px;
      color: #9ca3af;
    }

    .email-footer a {
      color: #6b7280;
      text-decoration: underline;
    }

    /* Responsive */
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 12px 8px; }
      .email-body { padding: 24px 20px; }
      .email-header { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-card">
      <div class="email-header">
        <h1>Peer<span class="logo-accent">Support</span></h1>
      </div>
      ${bodyContent}
      <div class="email-footer">
        <p>© ${new Date().getFullYear()} PeerSupport. All rights reserved.</p>
        <p>
          <a href="${FRONTEND_URL}">Visit PeerSupport</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ─── Helper: format date/time in IST ─────────────────────────────────────────

function formatDateIST(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}

function formatTimeIST(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

function infoRow(label, value) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom: 1px dashed #e5e7eb;">
      <tr>
        <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #1a1a1a;">${label}</td>
        <td style="padding: 8px 0; font-size: 14px; color: #4b5563; text-align: right;">${value}</td>
      </tr>
    </table>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE: Welcome / Registration
// ═══════════════════════════════════════════════════════════════════════════════

export function welcomeEmail({ name, email, role }) {
  const roleName = role === 'MENTOR' ? 'Mentor' : 'Mentee';
  const dashboardUrl =
    role === 'MENTOR'
      ? `${FRONTEND_URL}/mentor/dashboard`
      : `${FRONTEND_URL}/mentee/dashboard`;

  const body = `
    <div class="email-body">
      <h2>Welcome to PeerSupport! 🎉</h2>
      <p class="subtitle">Your account has been created successfully.</p>

      <p>Hey <strong>${name || 'there'}</strong>,</p>
      <p>
        We're thrilled to have you join PeerSupport as a <strong>${roleName}</strong>.
        ${
          role === 'MENTOR'
            ? 'Share your expertise and help mentees achieve their goals.'
            : 'Connect with experienced mentors who can guide your journey.'
        }
      </p>

      <div class="info-card">
        ${infoRow('Email', email)}
        ${infoRow('Role', roleName)}
        ${infoRow('Joined', formatDateIST(new Date()))}
      </div>

      <p>Complete your profile to get started:</p>

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}/onboarding" class="cta-button">
          Complete Your Profile →
        </a>
      </div>

      <hr class="divider" />

      <p style="font-size: 13px; color: #9ca3af;">
        If you didn't create this account, please ignore this email or contact our support.
      </p>
    </div>`;

  return {
    subject: `Welcome to PeerSupport, ${name || 'there'}! 🚀`,
    html: layout('Welcome to PeerSupport', body),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE: Booking Confirmed (for Mentee)
// ═══════════════════════════════════════════════════════════════════════════════

export function bookingConfirmedMenteeEmail({
  menteeName,
  mentorName,
  serviceName,
  startTime,
  endTime,
  amount,
  bookingId,
}) {
  const body = `
    <div class="email-body">
      <h2>Booking Confirmed! ✅</h2>
      <p class="subtitle">Your session has been booked and payment verified.</p>

      <p>Hey <strong>${menteeName || 'there'}</strong>,</p>
      <p>
        Great news! Your session with <strong>${mentorName}</strong> has been confirmed.
        Here are the details:
      </p>

      <div class="info-card">
        ${infoRow('Mentor', mentorName)}
        ${infoRow('Service', serviceName || 'Mentoring Session')}
        ${infoRow('Date', formatDateIST(startTime))}
        ${infoRow('Time', `${formatTimeIST(startTime)} – ${formatTimeIST(endTime)}`)}
        ${infoRow('Amount Paid', `₹${amount}`)}
        ${infoRow('Status', '<span class="status-badge status-confirmed">Confirmed</span>')}
      </div>

      <p>You'll be able to join the meeting room 5 minutes before the scheduled time.</p>

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}/mentee/sessions" class="cta-button">
          View My Sessions →
        </a>
      </div>

      <hr class="divider" />

      <p style="font-size: 13px; color: #9ca3af;">
        Booking ID: ${bookingId}
      </p>
    </div>`;

  return {
    subject: `Session Confirmed with ${mentorName} — ${formatDateIST(startTime)}`,
    html: layout('Booking Confirmed', body),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE: New Booking Alert (for Mentor)
// ═══════════════════════════════════════════════════════════════════════════════

export function newBookingMentorEmail({
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
  const body = `
    <div class="email-body">
      <h2>New Session Booked! 📅</h2>
      <p class="subtitle">A mentee has booked a session with you.</p>

      <p>Hey <strong>${mentorName || 'Mentor'}</strong>,</p>
      <p>
        <strong>${menteeName}</strong> has booked a <strong>${serviceName || 'mentoring session'}</strong> with you.
      </p>

      <div class="info-card">
        ${infoRow('Mentee', menteeName)}
        ${infoRow('Email', menteeEmail)}
        ${infoRow('Service', serviceName || 'Mentoring Session')}
        ${infoRow('Date', formatDateIST(startTime))}
        ${infoRow('Time', `${formatTimeIST(startTime)} – ${formatTimeIST(endTime)}`)}
        ${infoRow('Earnings', `₹${amount}`)}
        ${purposeOfCall ? infoRow('Purpose', purposeOfCall) : ''}
      </div>

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}/mentor/sessions" class="cta-button">
          View Sessions →
        </a>
      </div>

      <hr class="divider" />

      <p style="font-size: 13px; color: #9ca3af;">
        Booking ID: ${bookingId}
      </p>
    </div>`;

  return {
    subject: `New Booking from ${menteeName} — ${formatDateIST(startTime)}`,
    html: layout('New Session Booked', body),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE: Booking Cancelled
// ═══════════════════════════════════════════════════════════════════════════════

export function bookingCancelledEmail({
  recipientName,
  cancelledByRole,
  mentorName,
  menteeName,
  serviceName,
  startTime,
  endTime,
  cancelledReason,
  bookingId,
}) {
  const cancelledBy = cancelledByRole === 'mentee' ? menteeName : mentorName;

  const body = `
    <div class="email-body">
      <h2>Session Cancelled ❌</h2>
      <p class="subtitle">A scheduled session has been cancelled.</p>

      <p>Hey <strong>${recipientName || 'there'}</strong>,</p>
      <p>
        The session between <strong>${menteeName}</strong> and <strong>${mentorName}</strong>
        has been cancelled by the <strong>${cancelledByRole}</strong>.
      </p>

      <div class="info-card">
        ${infoRow('Service', serviceName || 'Mentoring Session')}
        ${infoRow('Date', formatDateIST(startTime))}
        ${infoRow('Time', `${formatTimeIST(startTime)} – ${formatTimeIST(endTime)}`)}
        ${cancelledReason ? infoRow('Reason', cancelledReason) : ''}
        ${infoRow('Status', '<span class="status-badge status-cancelled">Cancelled</span>')}
      </div>

      ${
        cancelledByRole === 'mentor'
          ? `<p>If a payment was made, a refund will be initiated shortly.</p>`
          : ''
      }

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}" class="cta-button">
          Go to Dashboard →
        </a>
      </div>

      <hr class="divider" />

      <p style="font-size: 13px; color: #9ca3af;">
        Booking ID: ${bookingId}
      </p>
    </div>`;

  return {
    subject: `Session Cancelled — ${formatDateIST(startTime)}`,
    html: layout('Session Cancelled', body),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE: Session Completed
// ═══════════════════════════════════════════════════════════════════════════════

export function sessionCompletedMenteeEmail({
  menteeName,
  mentorName,
  serviceName,
  startTime,
  bookingId,
}) {
  const body = `
    <div class="email-body">
      <h2>Session Completed! 🎓</h2>
      <p class="subtitle">Hope you had a great session!</p>

      <p>Hey <strong>${menteeName || 'there'}</strong>,</p>
      <p>
        Your session with <strong>${mentorName}</strong> has been marked as completed.
        We hope it was a productive experience!
      </p>

      <div class="info-card">
        ${infoRow('Mentor', mentorName)}
        ${infoRow('Service', serviceName || 'Mentoring Session')}
        ${infoRow('Date', formatDateIST(startTime))}
        ${infoRow('Status', '<span class="status-badge status-completed">Completed</span>')}
      </div>

      <p>Your feedback helps mentors improve and helps others find the right mentor. Take a moment to leave a review:</p>

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}/mentee/sessions" class="cta-button">
          Leave a Review →
        </a>
      </div>
    </div>`;

  return {
    subject: `Session with ${mentorName} Completed — Share Your Feedback! ⭐`,
    html: layout('Session Completed', body),
  };
}

export function sessionCompletedMentorEmail({
  mentorName,
  menteeName,
  serviceName,
  startTime,
  bookingId,
}) {
  const body = `
    <div class="email-body">
      <h2>Session Completed! ✅</h2>
      <p class="subtitle">Another successful session in the books.</p>

      <p>Hey <strong>${mentorName || 'Mentor'}</strong>,</p>
      <p>
        Your session with <strong>${menteeName}</strong> has been marked as completed.
        Great job sharing your expertise!
      </p>

      <div class="info-card">
        ${infoRow('Mentee', menteeName)}
        ${infoRow('Service', serviceName || 'Mentoring Session')}
        ${infoRow('Date', formatDateIST(startTime))}
        ${infoRow('Status', '<span class="status-badge status-completed">Completed</span>')}
      </div>

      <p>Don't forget to provide feedback for your mentee to help them grow:</p>

      <div style="text-align: center;">
        <a href="${FRONTEND_URL}/mentor/sessions" class="cta-button">
          Give Feedback →
        </a>
      </div>
    </div>`;

  return {
    subject: `Session with ${menteeName} Completed`,
    html: layout('Session Completed', body),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE: Payment Receipt
// ═══════════════════════════════════════════════════════════════════════════════

export function paymentReceiptEmail({
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
  const body = `
    <div class="email-body">
      <h2>Payment Receipt 🧾</h2>
      <p class="subtitle">Your payment has been processed successfully.</p>

      <p>Hey <strong>${menteeName || 'there'}</strong>,</p>
      <p>Here's your payment receipt for the upcoming session:</p>

      <div class="info-card">
        ${infoRow('Payment ID', paymentId)}
        ${infoRow('Amount', `${currency === 'INR' ? '₹' : currency}${amount}`)}
        ${infoRow('Paid On', formatDateIST(paidAt))}
        ${infoRow('Mentor', mentorName)}
        ${infoRow('Service', serviceName || 'Mentoring Session')}
        ${startTime ? infoRow('Session Date', formatDateIST(startTime)) : ''}
        ${infoRow('Status', '<span class="status-badge status-confirmed">Paid</span>')}
      </div>

      <hr class="divider" />

      <p style="font-size: 13px; color: #9ca3af;">
        Booking ID: ${bookingId} · For any payment issues, contact support.
      </p>
    </div>`;

  return {
    subject: `Payment Receipt — ₹${amount} for session with ${mentorName}`,
    html: layout('Payment Receipt', body),
  };
}
