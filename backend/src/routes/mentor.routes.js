import express from 'express';
import mentorController from '../controllers/MentorController.js';
import { authenticateJWT, adminOnly, authorizeRoles } from '../middleware/auth.js';
import { uploadResume, handleUploadErrors } from '../middleware/upload.middleware.js';

const router = express.Router();

///////////////////////////
// NOTE: Mentor application and profile routes have been moved to user.routes.js
// to avoid duplication. Use the following routes instead:
// - POST /api/users/mentor-applications (submit application)
// - PUT /api/users/mentor-applications (update application)
// - GET /api/users/mentor-applications/my (get my application)
// - GET /api/users/profile/mentor (get mentor profile)
// - PUT /api/users/profile/mentor/:userId (update mentor profile)
///////////////////////////

///////////////////////////
// SERVICE MANAGEMENT (Mentor only)
///////////////////////////

// Create a service
router.post('/services', authenticateJWT, authorizeRoles('MENTOR'), mentorController.createService);

// Get all mentor's services
router.get('/services', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getServices);

// Get a specific service
router.get('/services/:serviceId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getService);

// Update a service
router.patch('/services/:serviceId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.updateService);

// Delete a service
router.delete('/services/:serviceId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.deleteService);

// Toggle service status
router.patch('/services/:serviceId/status', authenticateJWT, authorizeRoles('MENTOR'), mentorController.toggleServiceStatus);

///////////////////////////
// DASHBOARD & ANALYTICS (Mentor only)
///////////////////////////

// Get dashboard stats
router.get('/dashboard', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getDashboardStats);

// Get transactions
router.get('/transactions', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getTransactions);

///////////////////////////
// WITHDRAWAL ROUTES (Mentor only)
///////////////////////////

// Request withdrawal
router.post('/withdrawals', authenticateJWT, authorizeRoles('MENTOR'), mentorController.requestWithdrawal);

// Get withdrawals
router.get('/withdrawals', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getWithdrawals);

///////////////////////////
// RATINGS & REVIEWS (Mentor only)
///////////////////////////

// Get ratings and feedback
router.get('/ratings', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getRatingsAndFeedback);

///////////////////////////
// RESUME MANAGEMENT (Mentor only)
///////////////////////////

// Upload resume (file upload)
router.post('/resumes/upload', authenticateJWT, authorizeRoles('MENTOR'), uploadResume, handleUploadErrors, mentorController.uploadResume);

// Add resume (for backward compatibility)
router.post('/resumes', authenticateJWT, authorizeRoles('MENTOR'), mentorController.addResume);

// Get resumes
router.get('/resumes', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getResumes);

// Delete resume
router.delete('/resumes/:resumeId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.deleteResume);

export default router;
