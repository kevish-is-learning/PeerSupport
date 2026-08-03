/**
 * Transactional email templates for PeerSupport.
 *
 * Templates deliberately use table-based markup and inline styles for reliable
 * rendering in Gmail, Outlook, Apple Mail, and mobile clients. Each returns a
 * subject, HTML, and plain-text fallback.
 */

const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'hello@peersupport.com';
const IST_TIME_ZONE = 'Asia/Kolkata';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));
}

function safeText(value, fallback = 'Not available') {
  const text = String(value ?? '').trim();
  return escapeHtml(text || fallback);
}

function safeUrl(path = '') {
  const url = path.startsWith('http') ? path : `${FRONTEND_URL}${path}`;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ? escapeHtml(parsed.toString()) : FRONTEND_URL;
  } catch {
    return FRONTEND_URL;
  }
}

function validDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateIST(value) {
  const date = validDate(value);
  return date
    ? date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: IST_TIME_ZONE })
    : 'To be confirmed';
}

function formatTimeIST(value) {
  const date = validDate(value);
  return date
    ? date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: IST_TIME_ZONE })
    : 'To be confirmed';
}

function formatCurrency(amount, currency = 'INR') {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) return 'Amount to be confirmed';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(numericAmount);
  } catch {
    return `${currency} ${numericAmount.toFixed(2)}`;
  }
}

function dashboardPath(role) {
  return role === 'MENTOR' ? '/mentor/dashboard' : '/mentee/dashboard';
}

function sessionPath(role) {
  return role === 'MENTOR' ? '/mentor/bookings' : '/mentee/sessions';
}

function calendarUrl({ mentorName, serviceName, startTime, endTime, bookingId }) {
  const start = validDate(startTime);
  const end = validDate(endTime);
  if (!start || !end) return null;
  const toGoogleDate = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const details = `PeerSupport booking ${bookingId || ''}`.trim();
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${serviceName || 'Mentoring session'} with ${mentorName || 'PeerSupport'}`,
    dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function row(label, value, last = false) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:${last ? '0' : '1px solid #e5e7eb'};font:600 13px/18px Arial,sans-serif;color:#52525b;">${escapeHtml(label)}</td>
      <td align="right" style="padding:10px 0;border-bottom:${last ? '0' : '1px solid #e5e7eb'};font:600 13px/18px Arial,sans-serif;color:#18181b;">${value}</td>
    </tr>`;
}

function detailCard(rows) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;">
      <tr><td style="padding:8px 18px;">${rows.join('')}</td></tr>
    </table>`;
}

function status(label, tone = 'green') {
  const colors = {
    green: ['#ecfdf5', '#047857'],
    red: ['#fef2f2', '#b91c1c'],
    blue: ['#eff6ff', '#1d4ed8'],
    amber: ['#fffbeb', '#b45309'],
  };
  const [background, color] = colors[tone] || colors.green;
  return `<span style="display:inline-block;padding:3px 8px;border-radius:999px;background:${background};color:${color};font:700 11px/14px Arial,sans-serif;letter-spacing:.3px;text-transform:uppercase;">${escapeHtml(label)}</span>`;
}

function button(href, label, secondary = false) {
  const background = secondary ? '#ffffff' : '#18181b';
  const color = secondary ? '#18181b' : '#ffffff';
  const border = secondary ? '1px solid #d4d4d8' : '1px solid #18181b';
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table;margin:0 8px 10px 0;">
      <tr><td style="border-radius:8px;background:${background};border:${border};">
        <a href="${safeUrl(href)}" style="display:inline-block;padding:12px 18px;font:700 14px/18px Arial,sans-serif;color:${color};text-decoration:none;border-radius:8px;">${escapeHtml(label)} &rarr;</a>
      </td></tr>
    </table>`;
}

function layout({ title, preheader, content }) {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>${escapeHtml(title)}</title>
<style>
  @media screen and (max-width:620px){.container{width:100% !important}.content{padding:28px 22px !important}.mobile-block{display:block !important;width:100% !important}.mobile-hide{display:none !important}}
</style></head>
<body style="margin:0;padding:0;background:#f4f4f5;color:#18181b;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;"><tr><td align="center" style="padding:32px 12px;">
    <table class="container" role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #e4e4e7;border-radius:14px;overflow:hidden;">
      <tr><td style="padding:22px 32px;background:#18181b;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font:700 20px/24px Arial,sans-serif;color:#ffffff;letter-spacing:-.4px;">Peer<span style="color:#fbbf24;">Support</span></td>
          <td align="right" class="mobile-hide" style="font:600 12px/16px Arial,sans-serif;color:#a1a1aa;">Mentorship, made personal</td>
        </tr></table>
      </td></tr>
      <tr><td class="content" style="padding:34px 32px;">${content}</td></tr>
      <tr><td style="padding:22px 32px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="margin:0 0 6px;font:400 12px/18px Arial,sans-serif;color:#71717a;">Questions? <a href="mailto:${escapeHtml(SUPPORT_EMAIL)}" style="color:#3f3f46;text-decoration:underline;">Contact support</a></p>
        <p style="margin:0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">&copy; ${year} PeerSupport</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function message({ eyebrow, heading, intro, children }) {
  return `
    <p style="margin:0 0 10px;font:700 11px/14px Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:#71717a;">${escapeHtml(eyebrow)}</p>
    <h1 style="margin:0 0 12px;font:700 28px/34px Arial,sans-serif;letter-spacing:-.7px;color:#18181b;">${escapeHtml(heading)}</h1>
    <p style="margin:0;font:400 15px/24px Arial,sans-serif;color:#52525b;">${intro}</p>
    ${children}`;
}

export function welcomeEmail({ name, email, role }) {
  const isMentor = role === 'MENTOR';
  const roleName = isMentor ? 'Mentor' : 'Mentee';
  const body = message({
    eyebrow: 'Your account is ready',
    heading: `Welcome, ${name || 'there'}`,
    intro: `You’re now part of PeerSupport as a <strong>${roleName}</strong>. ${isMentor ? 'Set up your profile so mentees can find the experience you bring.' : 'Complete your profile, then find a mentor who can help you make progress.'}`,
    children: `${detailCard([
      row('Email', safeText(email, 'Not provided')),
      row('Role', roleName),
      row('Joined', escapeHtml(formatDateIST(new Date())), true),
    ])}
    <p style="margin:0 0 20px;font:400 15px/24px Arial,sans-serif;color:#52525b;">A complete profile helps make every introduction more useful.</p>
    ${button('/onboarding', 'Complete profile')}
    ${button(dashboardPath(role), 'Open dashboard', true)}
    <p style="margin:18px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">If you didn’t create this account, you can safely ignore this email.</p>`,
  });
  const firstNameText = String(name || 'there').trim() || 'there';
  return {
    subject: `Welcome to PeerSupport, ${firstNameText}`,
    html: layout({ title: 'Welcome to PeerSupport', preheader: 'Your PeerSupport account is ready.', content: body }),
    text: `Welcome, ${firstNameText}! Your PeerSupport ${roleName.toLowerCase()} account is ready. Complete your profile: ${safeUrl('/onboarding')}`,
  };
}

export function bookingConfirmedMenteeEmail({ menteeName, mentorName, serviceName, startTime, endTime, amount, bookingId }) {
  const mentor = safeText(mentorName, 'your mentor');
  const service = safeText(serviceName, 'Mentoring session');
  const calendar = calendarUrl({ mentorName, serviceName, startTime, endTime, bookingId });
  const body = message({
    eyebrow: 'Booking confirmed', heading: 'Your session is scheduled',
    intro: `Hi <strong>${safeText(menteeName, 'there')}</strong> — your session with <strong>${mentor}</strong> is confirmed. We’ll have the meeting room ready shortly before it begins.`,
    children: `${detailCard([
      row('Mentor', mentor), row('Session', service), row('Date', escapeHtml(formatDateIST(startTime))),
      row('Time', escapeHtml(`${formatTimeIST(startTime)} – ${formatTimeIST(endTime)} IST`)),
      row('Amount paid', escapeHtml(formatCurrency(amount))), row('Status', status('Confirmed'), true),
    ])}
    ${button(sessionPath('MENTEE'), 'View session')}
    ${calendar ? button(calendar, 'Add to calendar', true) : ''}
    <p style="margin:14px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">Booking ID: ${safeText(bookingId)}</p>`,
  });
  return {
    subject: `Confirmed: session with ${String(mentorName || 'your mentor').trim()} on ${formatDateIST(startTime)}`,
    html: layout({ title: 'Booking confirmed', preheader: `Your session with ${mentorName || 'your mentor'} is confirmed.`, content: body }),
    text: `Your PeerSupport session with ${mentorName || 'your mentor'} is confirmed for ${formatDateIST(startTime)}, ${formatTimeIST(startTime)} IST. View it: ${safeUrl(sessionPath('MENTEE'))}`,
  };
}

export function newBookingMentorEmail({ mentorName, menteeName, menteeEmail, serviceName, startTime, endTime, amount, purposeOfCall, bookingId }) {
  const mentee = safeText(menteeName, 'A mentee');
  const calendar = calendarUrl({ mentorName, serviceName, startTime, endTime, bookingId });
  const body = message({
    eyebrow: 'New booking', heading: 'A new session is on your calendar',
    intro: `Hi <strong>${safeText(mentorName, 'there')}</strong> — <strong>${mentee}</strong> has booked a session with you.`,
    children: `${detailCard([
      row('Mentee', mentee), row('Email', safeText(menteeEmail)), row('Session', safeText(serviceName, 'Mentoring session')),
      row('Date', escapeHtml(formatDateIST(startTime))), row('Time', escapeHtml(`${formatTimeIST(startTime)} – ${formatTimeIST(endTime)} IST`)),
      row('Earnings', escapeHtml(formatCurrency(amount))),
      ...(purposeOfCall ? [row('Goal for this session', safeText(purposeOfCall))] : []),
      row('Status', status('Confirmed'), true),
    ])}
    ${button(sessionPath('MENTOR'), 'Review booking')}
    ${calendar ? button(calendar, 'Add to calendar', true) : ''}
    <p style="margin:14px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">Booking ID: ${safeText(bookingId)}</p>`,
  });
  return {
    subject: `New booking: ${String(menteeName || 'a mentee').trim()} on ${formatDateIST(startTime)}`,
    html: layout({ title: 'New booking', preheader: 'A new mentoring session has been booked.', content: body }),
    text: `${menteeName || 'A mentee'} booked ${serviceName || 'a mentoring session'} for ${formatDateIST(startTime)}, ${formatTimeIST(startTime)} IST. Review it: ${safeUrl(sessionPath('MENTOR'))}`,
  };
}

export function bookingCancelledEmail({ recipientName, recipientRole, cancelledByRole, mentorName, menteeName, serviceName, startTime, endTime, cancelledReason, bookingId }) {
  const isMentorCancellation = cancelledByRole === 'mentor';
  const cancelledBy = isMentorCancellation ? safeText(mentorName, 'the mentor') : safeText(menteeName, 'the mentee');
  const body = message({
    eyebrow: 'Session update', heading: 'This session was cancelled',
    intro: `Hi <strong>${safeText(recipientName, 'there')}</strong> — ${cancelledBy} cancelled the scheduled session.`,
    children: `${detailCard([
      row('Session', safeText(serviceName, 'Mentoring session')), row('Date', escapeHtml(formatDateIST(startTime))),
      row('Time', escapeHtml(`${formatTimeIST(startTime)} – ${formatTimeIST(endTime)} IST`)),
      ...(cancelledReason ? [row('Reason', safeText(cancelledReason))] : []), row('Status', status('Cancelled', 'red'), true),
    ])}
    <p style="margin:0 0 20px;font:400 15px/24px Arial,sans-serif;color:#52525b;">${isMentorCancellation ? 'If you paid for this session, your refund will be initiated shortly.' : 'You can book another time whenever you’re ready.'}</p>
    ${recipientRole === 'MENTOR'
      ? button(sessionPath('MENTOR'), 'View bookings')
      : `${button('/mentee/find-mentors', 'Find a mentor')}${button(sessionPath('MENTEE'), 'View sessions', true)}`}
    <p style="margin:14px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">Booking ID: ${safeText(bookingId)}</p>`,
  });
  return {
    subject: `Cancelled: ${serviceName || 'your session'} on ${formatDateIST(startTime)}`,
    html: layout({ title: 'Session cancelled', preheader: 'A scheduled PeerSupport session has been cancelled.', content: body }),
    text: `Your PeerSupport session on ${formatDateIST(startTime)} was cancelled by ${isMentorCancellation ? 'the mentor' : 'the mentee'}. ${isMentorCancellation ? 'Your refund will be initiated shortly.' : ''}`,
  };
}

export function sessionCompletedMenteeEmail({ menteeName, mentorName, serviceName, startTime, bookingId }) {
  const body = message({
    eyebrow: 'Session complete', heading: 'Thanks for showing up',
    intro: `Hi <strong>${safeText(menteeName, 'there')}</strong> — your session with <strong>${safeText(mentorName, 'your mentor')}</strong> is complete. A quick review helps other mentees find the right support.`,
    children: `${detailCard([
      row('Mentor', safeText(mentorName, 'Your mentor')), row('Session', safeText(serviceName, 'Mentoring session')),
      row('Date', escapeHtml(formatDateIST(startTime))), row('Status', status('Completed', 'blue'), true),
    ])}
    ${button(sessionPath('MENTEE'), 'Leave a review')}
    <p style="margin:14px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">Booking ID: ${safeText(bookingId)}</p>`,
  });
  return {
    subject: `How was your session with ${String(mentorName || 'your mentor').trim()}?`,
    html: layout({ title: 'Session completed', preheader: 'Your session is complete — share your feedback.', content: body }),
    text: `Your session with ${mentorName || 'your mentor'} is complete. Leave a review: ${safeUrl(sessionPath('MENTEE'))}`,
  };
}

export function sessionCompletedMentorEmail({ mentorName, menteeName, serviceName, startTime, bookingId }) {
  const body = message({
    eyebrow: 'Session complete', heading: 'Another session, well done',
    intro: `Hi <strong>${safeText(mentorName, 'there')}</strong> — your session with <strong>${safeText(menteeName, 'your mentee')}</strong> is complete. Share feedback while the conversation is fresh.`,
    children: `${detailCard([
      row('Mentee', safeText(menteeName, 'Your mentee')), row('Session', safeText(serviceName, 'Mentoring session')),
      row('Date', escapeHtml(formatDateIST(startTime))), row('Status', status('Completed', 'blue'), true),
    ])}
    ${button(sessionPath('MENTOR'), 'Add feedback')}
    <p style="margin:14px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">Booking ID: ${safeText(bookingId)}</p>`,
  });
  return {
    subject: `Session complete: ${String(menteeName || 'your mentee').trim()}`,
    html: layout({ title: 'Session completed', preheader: 'Your mentoring session is complete.', content: body }),
    text: `Your session with ${menteeName || 'your mentee'} is complete. Add feedback: ${safeUrl(sessionPath('MENTOR'))}`,
  };
}

export function paymentReceiptEmail({ menteeName, mentorName, serviceName, amount, currency, paymentId, paidAt, bookingId, startTime }) {
  const amountLabel = formatCurrency(amount, currency || 'INR');
  const body = message({
    eyebrow: 'Payment receipt', heading: 'Payment received',
    intro: `Hi <strong>${safeText(menteeName, 'there')}</strong> — we received your payment of <strong>${escapeHtml(amountLabel)}</strong>. Your invoice is attached to this email.`,
    children: `${detailCard([
      row('Payment ID', safeText(paymentId)), row('Paid on', escapeHtml(formatDateIST(paidAt))), row('Amount', escapeHtml(amountLabel)),
      row('Mentor', safeText(mentorName, 'Your mentor')), row('Session', safeText(serviceName, 'Mentoring session')),
      ...(startTime ? [row('Session date', escapeHtml(formatDateIST(startTime)))] : []), row('Status', status('Paid'), true),
    ])}
    ${button(sessionPath('MENTEE'), 'View booking')}
    <p style="margin:14px 0 0;font:400 12px/18px Arial,sans-serif;color:#a1a1aa;">Booking ID: ${safeText(bookingId)}</p>`,
  });
  return {
    subject: `Receipt: ${amountLabel} paid to PeerSupport`,
    html: layout({ title: 'Payment receipt', preheader: `Your payment of ${amountLabel} was received.`, content: body }),
    text: `Payment received: ${amountLabel}. Payment ID: ${paymentId || 'Not available'}. Your invoice is attached. View booking: ${safeUrl(sessionPath('MENTEE'))}`,
  };
}
