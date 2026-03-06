import express from 'express';
import mentorController from '../controllers/MentorController.js';
import { authenticateJWT, adminOnly, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

///////////////////////////
// APPLICATION ROUTES (Any authenticated user can apply)
///////////////////////////

// Submit mentor application
router.post('/apply', authenticateJWT, mentorController.submitApplication);

// Update mentor application (only if pending/rejected)
router.put('/apply', authenticateJWT, mentorController.updateApplication);

// Get my mentor application
router.get('/application/my', authenticateJWT, mentorController.getMyApplication);

// Approve application (admin only)
router.patch('/application/:applicationId/approve', authenticateJWT, adminOnly, mentorController.approveApplication);

///////////////////////////
// PROFILE ROUTES (Mentor only)
///////////////////////////

// Get mentor profile
router.get('/profile', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getProfile);

// Update mentor profile
router.put('/profile', authenticateJWT, authorizeRoles('MENTOR'), mentorController.updateProfile);

// Check if mentor can accept bookings
router.get('/can-accept-bookings', authenticateJWT, authorizeRoles('MENTOR'), mentorController.canAcceptBookings);

///////////////////////////
// SLOT MANAGEMENT (Mentor only)
///////////////////////////

// Create slots
router.post('/slots', authenticateJWT, authorizeRoles('MENTOR'), mentorController.createSlots);

// Get slots
router.get('/slots', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getSlots);

// Update slot
router.patch('/slots/:slotId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.updateSlot);

// Delete slot
router.delete('/slots/:slotId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.deleteSlot);

///////////////////////////
// BOOKING ROUTES (Mentor only)
///////////////////////////

// Get bookings
router.get('/bookings', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getBookings);

// Reschedule booking
router.patch('/bookings/:bookingId/reschedule', authenticateJWT, authorizeRoles('MENTOR'), mentorController.rescheduleBooking);

// Cancel booking
router.patch('/bookings/:bookingId/cancel', authenticateJWT, authorizeRoles('MENTOR'), mentorController.cancelBooking);

// Complete booking
router.patch('/bookings/:bookingId/complete', authenticateJWT, authorizeRoles('MENTOR'), mentorController.completeBooking);

///////////////////////////
// DASHBOARD & ANALYTICS (Mentor only)
///////////////////////////

// Get dashboard stats
router.get('/dashboard', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getDashboardStats);

// Get earnings history
router.get('/earnings', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getEarningsHistory);

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
// INCENTIVE ROUTES (Mentor only)
///////////////////////////

// Get incentives
router.get('/incentives', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getIncentives);

// Claim incentive
router.patch('/incentives/:incentiveId/claim', authenticateJWT, authorizeRoles('MENTOR'), mentorController.claimIncentive);

///////////////////////////
// RATINGS & REVIEWS (Mentor only)
///////////////////////////

// Get ratings and feedback
router.get('/ratings', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getRatingsAndFeedback);

///////////////////////////
// RESUME MANAGEMENT (Mentor only)
///////////////////////////

// Add resume
router.post('/resumes', authenticateJWT, authorizeRoles('MENTOR'), mentorController.addResume);

// Get resumes
router.get('/resumes', authenticateJWT, authorizeRoles('MENTOR'), mentorController.getResumes);

// Delete resume
router.delete('/resumes/:resumeId', authenticateJWT, authorizeRoles('MENTOR'), mentorController.deleteResume);

export default router;
