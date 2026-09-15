/**
 * Group Session Routes — /api/webinars and /api/group-discussions
 *
 * Listings are public but personalised when a session cookie is present, so
 * they use optionalAuth to surface "you're registered" state.
 */

import { Router } from 'express';
import { authenticateJWT, optionalAuth } from '../middleware/auth.js';
import groupSessionController from '../controllers/GroupSessionController.js';

const webinarRouter = Router();

webinarRouter.get('/', optionalAuth, groupSessionController.listWebinars);
webinarRouter.get('/mine', authenticateJWT, groupSessionController.listMyWebinars);
webinarRouter.get('/:idOrSlug', optionalAuth, groupSessionController.getWebinar);

webinarRouter.post('/:id/register', authenticateJWT, groupSessionController.registerForWebinar);
webinarRouter.post('/verify-payment', authenticateJWT, groupSessionController.verifyWebinarPayment);
webinarRouter.delete('/:id/register', authenticateJWT, groupSessionController.cancelWebinarRegistration);
webinarRouter.get('/:id/room-token', authenticateJWT, groupSessionController.getWebinarRoomToken);

const discussionRouter = Router();

discussionRouter.get('/', optionalAuth, groupSessionController.listDiscussions);
discussionRouter.get('/mine', authenticateJWT, groupSessionController.listMyDiscussions);
discussionRouter.get('/:id', optionalAuth, groupSessionController.getDiscussion);

discussionRouter.post('/:id/register', authenticateJWT, groupSessionController.registerForDiscussion);
discussionRouter.post('/verify-payment', authenticateJWT, groupSessionController.verifyDiscussionPayment);
discussionRouter.delete('/:id/register', authenticateJWT, groupSessionController.cancelDiscussionRegistration);
discussionRouter.get('/:id/participants', authenticateJWT, groupSessionController.listDiscussionParticipants);
discussionRouter.get('/:id/room-token', authenticateJWT, groupSessionController.getDiscussionRoomToken);

export { webinarRouter, discussionRouter };
