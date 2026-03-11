import express from 'express';
import menteeController from '../controllers/MenteeController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { uploadResume, handleUploadErrors } from '../middleware/upload.middleware.js';

const router = express.Router();

// All routes require authentication and MENTEE role
router.use(authenticateJWT);
router.use(authorizeRoles('MENTEE', 'ADMIN'));

// Dashboard
router.get('/dashboard/stats', menteeController.getDashboardStats);

// Mentors
router.get('/mentors', menteeController.getAllMentors);
router.get('/mentors/:mentorId', menteeController.getMentorById);
router.get('/mentors/:mentorId/services', menteeController.getMentorServices);
router.get('/mentors/:mentorId/reviews', menteeController.getMentorReviews);

// Webinars
router.get('/webinars', menteeController.getAllWebinars);
router.post('/webinars/:webinarId/register', menteeController.registerForWebinar);
router.get('/webinars/registrations/my', menteeController.getMyWebinarRegistrations);

// Resumes
router.post('/resumes/upload', uploadResume, handleUploadErrors, menteeController.uploadResume);
router.get('/resumes', menteeController.getResumes);
router.delete('/resumes/:resumeId', menteeController.deleteResume);

export default router;
