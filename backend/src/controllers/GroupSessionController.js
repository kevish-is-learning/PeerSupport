import groupSessionService from '../services/GroupSessionService.js';
import meetingService from '../services/MeetingService.js';
import { respond } from '../utils/controllerResponse.js';
import {
  createWebinarSchema,
  updateWebinarSchema,
  createDiscussionSchema,
  updateDiscussionSchema,
  registerDiscussionSchema,
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

  // ─── Group discussions ───────────────────────────────────────────────────

  listDiscussions(req, res) {
    return respond(res, {
      message: 'Group discussions fetched',
      action: () =>
        groupSessionService.listDiscussions({
          userId: req.user?.id,
          upcomingOnly: req.query.past !== 'true',
        }),
      data: (discussions) => ({ discussions }),
    });
  }

  getDiscussion(req, res) {
    return respond(res, {
      message: 'Group discussion fetched',
      action: () => groupSessionService.getDiscussion(req.params.id, { userId: req.user?.id }),
      data: (discussion) => ({ discussion }),
    });
  }

  listAllDiscussions(req, res) {
    return respond(res, {
      message: 'Group discussions fetched',
      action: () =>
        groupSessionService.listDiscussions({ userId: req.user?.id, includeAll: true }),
      data: (discussions) => ({ discussions }),
    });
  }

  createDiscussion(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Group discussion created',
      action: () =>
        groupSessionService.createDiscussion(withDates(createDiscussionSchema.parse(req.body))),
      data: (discussion) => ({ discussion }),
    });
  }

  updateDiscussion(req, res) {
    return respond(res, {
      message: 'Group discussion updated',
      action: () =>
        groupSessionService.updateDiscussion(
          req.params.id,
          withDates(updateDiscussionSchema.parse(req.body))
        ),
      data: (discussion) => ({ discussion }),
    });
  }

  deleteDiscussion(req, res) {
    return respond(res, {
      message: 'Group discussion removed',
      action: () => groupSessionService.deleteDiscussion(req.params.id),
    });
  }

  registerForDiscussion(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Registration started',
      action: () =>
        groupSessionService.registerForDiscussion(
          req.user.id,
          req.params.id,
          registerDiscussionSchema.parse(req.body ?? {})
        ),
    });
  }

  verifyDiscussionPayment(req, res) {
    return respond(res, {
      message: 'Registration confirmed',
      action: () =>
        groupSessionService.verifyDiscussionPayment(
          req.user.id,
          verifyGroupPaymentSchema.parse(req.body)
        ),
      data: (registration) => ({ registration }),
    });
  }

  cancelDiscussionRegistration(req, res) {
    return respond(res, {
      message: 'Registration cancelled',
      action: () => groupSessionService.cancelDiscussionRegistration(req.user.id, req.params.id),
    });
  }

  listMyDiscussions(req, res) {
    return respond(res, {
      message: 'Your group discussions fetched',
      action: () => groupSessionService.listMyDiscussions(req.user.id),
      data: (discussions) => ({ discussions }),
    });
  }

  listDiscussionParticipants(req, res) {
    return respond(res, {
      message: 'Participants fetched',
      action: () => groupSessionService.listDiscussionParticipants(req.params.id),
      data: (participants) => ({ participants }),
    });
  }

  // ─── Shared video room ───────────────────────────────────────────────────

  getWebinarRoomToken(req, res) {
    return respond(res, {
      message: 'Room token issued',
      action: () => meetingService.getGroupRoomToken(req.user.id, { webinarId: req.params.id }),
    });
  }

  getDiscussionRoomToken(req, res) {
    return respond(res, {
      message: 'Room token issued',
      action: () =>
        meetingService.getGroupRoomToken(req.user.id, { groupDiscussionId: req.params.id }),
    });
  }
}

export default new GroupSessionController();
