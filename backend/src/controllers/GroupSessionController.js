import groupSessionService from '../services/GroupSessionService.js';
import meetingService from '../services/MeetingService.js';
import { respond } from '../utils/controllerResponse.js';
import {
  createWebinarSchema,
  updateWebinarSchema,
  verifyGroupPaymentSchema,
} from '../validators/groupSession.validator.js';

/** Dates arrive as ISO strings; Prisma wants Date objects. */
const withDates = (data) => ({
  ...data,
  ...(data.startsAt ? { startsAt: new Date(data.startsAt) } : {}),
  ...(data.endsAt ? { endsAt: new Date(data.endsAt) } : {}),
});

class GroupSessionController {
  // ─── Webinars ────────────────────────────────────────────────────────────

  listWebinars(req, res) {
    return respond(res, {
      message: 'Webinars fetched',
      action: () =>
        groupSessionService.listWebinars({
          userId: req.user?.id,
          upcomingOnly: req.query.past !== 'true',
        }),
      data: (webinars) => ({ webinars }),
    });
  }

  getWebinar(req, res) {
    return respond(res, {
      message: 'Webinar fetched',
      action: () => groupSessionService.getWebinar(req.params.idOrSlug, { userId: req.user?.id }),
      data: (webinar) => ({ webinar }),
    });
  }

  listAllWebinars(req, res) {
    return respond(res, {
      message: 'Webinars fetched',
      action: () => groupSessionService.listWebinars({ userId: req.user?.id, includeAll: true }),
      data: (webinars) => ({ webinars }),
    });
  }

  createWebinar(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Webinar created',
      action: () => groupSessionService.createWebinar(withDates(createWebinarSchema.parse(req.body))),
      data: (webinar) => ({ webinar }),
    });
  }

  updateWebinar(req, res) {
    return respond(res, {
      message: 'Webinar updated',
      action: () =>
        groupSessionService.updateWebinar(req.params.id, withDates(updateWebinarSchema.parse(req.body))),
      data: (webinar) => ({ webinar }),
    });
  }

  deleteWebinar(req, res) {
    return respond(res, {
      message: 'Webinar removed',
      action: () => groupSessionService.deleteWebinar(req.params.id),
    });
  }

  registerForWebinar(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Registration started',
      action: () => groupSessionService.registerForWebinar(req.user.id, req.params.id),
    });
  }

  verifyWebinarPayment(req, res) {
    return respond(res, {
      message: 'Registration confirmed',
      action: () =>
        groupSessionService.verifyWebinarPayment(
          req.user.id,
          verifyGroupPaymentSchema.parse(req.body)
        ),
      data: (registration) => ({ registration }),
    });
  }

  cancelWebinarRegistration(req, res) {
    return respond(res, {
      message: 'Registration cancelled',
      action: () => groupSessionService.cancelWebinarRegistration(req.user.id, req.params.id),
    });
  }

  listMyWebinars(req, res) {
    return respond(res, {
      message: 'Your webinars fetched',
      action: () => groupSessionService.listMyWebinars(req.user.id),
      data: (webinars) => ({ webinars }),
    });
  }

  // ─── Video room ───────────────────────────────────────────────────

  getWebinarRoomToken(req, res) {
    return respond(res, {
      message: 'Room token issued',
      action: () => meetingService.getGroupRoomToken(req.user.id, { webinarId: req.params.id }),
    });
  }
}

export default new GroupSessionController();
