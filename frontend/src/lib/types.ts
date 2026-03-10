export type Role = "MENTOR" | "MENTEE" | "ADMIN";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SlotStatus = "AVAILABLE" | "BOOKED" | "BLOCKED" | "CANCELLED";
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
export type TransactionType = "EARNING" | "WITHDRAWAL" | "PAYOUT" | "REFUND" | "INCENTIVE" | "PLATFORM_FEE";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
export type PayoutStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface User {
  id: string;
  email: string;
  name: string | null;
  profilePicture: string | null;
  provider: string;
  role: Role;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MentorProfile {
  id: string;
  userId: string;
  bio: string;
  headline: string | null;
  expertise: string[];
  certifications: string[];
  pricePerSession: number;
  rating: number;
  totalReviews: number;
  verificationStatus: string;
  verifiedBadge: boolean;
  phone: string | null;
  location: string | null;
  socialLinks: SocialLink[] | null;
  education10th: string[];
  education12th: string[];
  bachelors: string[];
  masters: string[];
  workExperience: WorkExperience[] | null;
  catScore: number | null;
  catYear: number | null;
  catPercentile: number | null;
  reschedulePolicy: number;
  cancellationPolicy: number;
  refundPolicy: string | null;
  balance: number;
  totalEarnings: number;
  pendingEarnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  description?: string;
}

export interface MentorApplication {
  id: string;
  userId: string;
  bio: string;
  headline: string | null;
  phone: string | null;
  location: string | null;
  socialLinks: SocialLink[] | null;
  expertise: string[];
  education10th: string[];
  education12th: string[];
  bachelors: string[];
  masters: string[];
  workExperience: WorkExperience[] | null;
  catScore: number | null;
  catYear: number | null;
  catPercentile: number | null;
  certifications: string[];
  resumes: { name: string; fileUrl: string }[] | null;
  pricePerSession: number;
  status: ApplicationStatus;
  rejectionReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Slot {
  id: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  booking?: Booking;
  createdAt: string;
}

export interface Booking {
  id: string;
  mentorId: string;
  menteeId: string;
  slotId: string;
  status: BookingStatus;
  sessionMode: string;
  sessionType: string;
  purpose: string;
  shareProfile: boolean;
  meetingLink: string | null;
  mentorNotes: string | null;
  rescheduledAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
  slot?: Slot;
  mentee?: User;
  mentor?: User;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Earnings {
  id: string;
  mentorId: string;
  bookingId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: TransactionStatus;
  clearedAt: string | null;
  createdAt: string;
}

export interface Transaction {
  id: string;
  mentorId: string;
  type: TransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: TransactionStatus;
  reference: string | null;
  description: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  mentorId: string;
  amount: number;
  status: string;
  bankDetails: Record<string, string> | null;
  upiId: string | null;
  paymentMethod: string;
  processedAt: string | null;
  rejectionReason: string | null;
  transactionRef: string | null;
  createdAt: string;
}

export interface Payout {
  id: string;
  mentorId: string;
  amount: number;
  status: PayoutStatus;
  paymentMethod: string;
  transactionRef: string | null;
  processedAt: string | null;
  failureReason: string | null;
  createdAt: string;
}

export interface Incentive {
  id: string;
  mentorId: string;
  type: string;
  title: string;
  description: string | null;
  amount: number;
  status: TransactionStatus;
  expiresAt: string | null;
  claimedAt: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  completedSessions: number;
  upcomingSessions: number;
  totalEarnings: number;
  pendingEarnings: number;
  balance: number;
  averageRating: number;
  totalReviews: number;
  recentBookings: Booking[];
  monthlyEarnings: { month: string; amount: number }[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
