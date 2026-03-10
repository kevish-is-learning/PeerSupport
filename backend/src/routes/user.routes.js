import express from 'express';
import userController from '../controllers/UserController.js';
import { authenticateJWT, adminOnly, authorizeRoles } from '../middleware/auth.js';
import { uploadAvatar, handleUploadErrors } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public routes
router.get('/check-email', userController.checkEmailExists);

// Protected routes (authenticated users)
// Get current user profile by role (mentee, mentor, or admin profile)
router.get('/me', authenticateJWT, userController.getCurrentUserProfile);
router.put('/me', authenticateJWT, userController.updateCurrentUserProfile);
router.delete('/me', authenticateJWT, userController.deleteCurrentUserProfile);

// Avatar upload routes
router.post('/avatar', authenticateJWT, uploadAvatar, handleUploadErrors, userController.uploadAvatar);
router.delete('/avatar', authenticateJWT, userController.deleteAvatar);

// Mentee Profile Routes
router.post('/profile/mentee', authenticateJWT, authorizeRoles('MENTEE', 'ADMIN'), userController.createOrUpdateMenteeProfile);
router.get('/profile/mentee', authenticateJWT, authorizeRoles('MENTEE', 'ADMIN'), userController.getMenteeProfile);
router.get('/profile/mentee/:userId', authenticateJWT, userController.getMenteeProfile);
router.put('/profile/mentee/:userId', authenticateJWT, userController.createOrUpdateMenteeProfile);
router.delete('/profile/mentee', authenticateJWT, authorizeRoles('MENTEE', 'ADMIN'), userController.deleteMenteeProfile);
router.delete('/profile/mentee/:userId', authenticateJWT, adminOnly, userController.deleteMenteeProfile);

// Mentor Profile Routes
router.post('/profile/mentor', authenticateJWT, authorizeRoles('MENTOR', 'ADMIN'), userController.createOrUpdateMentorProfile);
router.get('/profile/mentor', authenticateJWT, authorizeRoles('MENTOR', 'ADMIN'), userController.getMentorProfile);
router.get('/profile/mentor/:userId', authenticateJWT, userController.getMentorProfile);
router.put('/profile/mentor/:userId', authenticateJWT, userController.createOrUpdateMentorProfile);
router.delete('/profile/mentor', authenticateJWT, authorizeRoles('MENTOR', 'ADMIN'), userController.deleteMentorProfile);
router.delete('/profile/mentor/:userId', authenticateJWT, adminOnly, userController.deleteMentorProfile);

// Admin Profile Routes (Admin only)
router.post('/profile/admin', authenticateJWT, adminOnly, userController.createOrUpdateAdminProfile);
router.get('/profile/admin', authenticateJWT, adminOnly, userController.getAdminProfile);
router.get('/profile/admin/:userId', authenticateJWT, adminOnly, userController.getAdminProfile);
router.put('/profile/admin/:userId', authenticateJWT, adminOnly, userController.createOrUpdateAdminProfile);
router.delete('/profile/admin', authenticateJWT, adminOnly, userController.deleteAdminProfile);
router.delete('/profile/admin/:userId', authenticateJWT, adminOnly, userController.deleteAdminProfile);

// Resume Routes (Mentee only)
router.post('/resumes', authenticateJWT, authorizeRoles('MENTEE', 'ADMIN'), userController.addResume);
router.get('/resumes', authenticateJWT, authorizeRoles('MENTEE', 'ADMIN'), userController.getResumes);
router.delete('/resumes/:resumeId', authenticateJWT, authorizeRoles('MENTEE', 'ADMIN'), userController.deleteResume);

// Mentor Application Routes
router.post('/mentor-applications', authenticateJWT, userController.submitMentorApplication);
router.put('/mentor-applications', authenticateJWT, userController.updateMentorApplication);
router.get('/mentor-applications/my', authenticateJWT, userController.getMyMentorApplication);
router.get('/mentor-applications', authenticateJWT, adminOnly, userController.getAllMentorApplications);
router.get('/mentor-applications/:applicationId', authenticateJWT, adminOnly, userController.getMentorApplicationById);
router.patch('/mentor-applications/:applicationId/approve', authenticateJWT, adminOnly, userController.approveMentorApplication);
router.patch('/mentor-applications/:applicationId/reject', authenticateJWT, adminOnly, userController.rejectMentorApplication);

// Admin routes
router.get('/', authenticateJWT, adminOnly, userController.getAllUsers);
router.get('/role/:role', authenticateJWT, adminOnly, userController.getUsersByRole);
router.post('/', authenticateJWT, adminOnly, userController.createUser);
router.get('/:id', authenticateJWT, adminOnly, userController.getUserById);
router.put('/:id', authenticateJWT, adminOnly, userController.updateUser);
router.patch('/:id/role', authenticateJWT, adminOnly, userController.updateUserRole);
router.patch('/:id/status', authenticateJWT, adminOnly, userController.toggleUserStatus);
router.patch('/:id/verify', authenticateJWT, adminOnly, userController.verifyUser);
router.delete('/:id', authenticateJWT, adminOnly, userController.deleteUser);
router.delete('/:id/permanent', authenticateJWT, adminOnly, userController.permanentDeleteUser);
router.patch('/:id/restore', authenticateJWT, adminOnly, userController.restoreUser);

export default router;
