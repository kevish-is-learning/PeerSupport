/**
 * Google Calendar Service
 *
 * Wraps the Google Calendar v3 API for creating, updating, and deleting
 * calendar events with auto-generated Google Meet links.
 *
 * Falls back gracefully when Calendar credentials are not configured —
 * returns null meet links so the rest of the workflow still functions.
 */

import crypto from 'crypto';
import {
  getCalendarClient,
  getCalendarId,
  getAdminEmail,
  isCalendarConfigured,
} from '../config/googleCalendar.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class GoogleCalendarService {
  /**
   * Create a Google Calendar event with a Google Meet conference.
   *
   * @param {Object} params
   * @param {string} params.summary       — Event title
   * @param {string} params.description   — Event description / notes
   * @param {Date|string} params.startTime — ISO datetime
   * @param {Date|string} params.endTime   — ISO datetime
   * @param {string[]} params.attendees   — List of attendee emails
   * @returns {{ eventId: string, meetLink: string, htmlLink: string } | null}
   */
  async createEvent({ summary, description, startTime, endTime, attendees = [] }) {
    const calendar = getCalendarClient();

    if (!calendar) {
      console.warn('Google Calendar not configured — skipping event creation');
      return null;
    }

    try {
      const attendeeList = attendees.map((email) => ({ email }));

      // Add admin email if not already in the list
      const adminEmail = getAdminEmail();
      if (adminEmail && !attendees.includes(adminEmail)) {
        attendeeList.push({ email: adminEmail });
      }

      const event = {
        summary,
        description,
        start: {
          dateTime: new Date(startTime).toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: new Date(endTime).toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        attendees: attendeeList,
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 30 },
            { method: 'popup', minutes: 10 },
            { method: 'popup', minutes: 5 },
          ],
        },
        guestsCanModify: false,
        guestsCanInviteOthers: false,
      };

      const response = await calendar.events.insert({
        calendarId: getCalendarId(),
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
      });

      const createdEvent = response.data;
      const meetLink =
        createdEvent.conferenceData?.entryPoints?.find(
          (ep) => ep.entryPointType === 'video'
        )?.uri || createdEvent.hangoutLink || null;

      return {
        eventId: createdEvent.id,
        meetLink,
        htmlLink: createdEvent.htmlLink,
      };
    } catch (err) {
      console.error('Google Calendar createEvent failed:', err.message, err.errors || '');
      throw createServiceError(
        502,
        `Failed to create Google Calendar event: ${err.message}`
      );
    }
  }

  /**
   * Update an existing Google Calendar event (for rescheduling).
   *
   * @param {string} eventId  — Google Calendar event ID
   * @param {Object} params
   * @param {string} [params.summary]
   * @param {string} [params.description]
   * @param {Date|string} [params.startTime]
   * @param {Date|string} [params.endTime]
   * @returns {{ eventId: string, meetLink: string, htmlLink: string } | null}
   */
  async updateEvent(eventId, { summary, description, startTime, endTime } = {}) {
    const calendar = getCalendarClient();

    if (!calendar) {
      console.warn('Google Calendar not configured — skipping event update');
      return null;
    }

    try {
      const patch = {};

      if (summary) patch.summary = summary;
      if (description !== undefined) patch.description = description;
      if (startTime) {
        patch.start = {
          dateTime: new Date(startTime).toISOString(),
          timeZone: 'Asia/Kolkata',
        };
      }
      if (endTime) {
        patch.end = {
          dateTime: new Date(endTime).toISOString(),
          timeZone: 'Asia/Kolkata',
        };
      }

      const response = await calendar.events.patch({
        calendarId: getCalendarId(),
        eventId,
        resource: patch,
        sendUpdates: 'all', // Sends updated invite to all attendees
      });

      const updatedEvent = response.data;
      const meetLink =
        updatedEvent.conferenceData?.entryPoints?.find(
          (ep) => ep.entryPointType === 'video'
        )?.uri || updatedEvent.hangoutLink || null;

      return {
        eventId: updatedEvent.id,
        meetLink,
        htmlLink: updatedEvent.htmlLink,
      };
    } catch (err) {
      console.error('Google Calendar updateEvent failed:', err.message, err.errors || '');
      throw createServiceError(
        502,
        `Failed to update Google Calendar event: ${err.message}`
      );
    }
  }

  /**
   * Delete / cancel a Google Calendar event.
   *
   * @param {string} eventId — Google Calendar event ID
   * @returns {boolean}
   */
  async deleteEvent(eventId) {
    const calendar = getCalendarClient();

    if (!calendar) {
      console.warn('Google Calendar not configured — skipping event deletion');
      return false;
    }

    try {
      await calendar.events.delete({
        calendarId: getCalendarId(),
        eventId,
        sendUpdates: 'all', // Notifies attendees of cancellation
      });

      return true;
    } catch (err) {
      // 404/410 = event already deleted — treat as success
      if (err.code === 404 || err.code === 410) {
        console.warn(`Google Calendar event ${eventId} already deleted`);
        return true;
      }

      console.error('Google Calendar deleteEvent failed:', err.message, err.errors || '');
      throw createServiceError(
        502,
        `Failed to delete Google Calendar event: ${err.message}`
      );
    }
  }
}

export default new GoogleCalendarService();
