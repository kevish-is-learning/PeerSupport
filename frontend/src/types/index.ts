export enum Role {
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
  ADMIN = 'ADMIN',
}

export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  BLOCKED = 'BLOCKED',
  CANCELLED = 'CANCELLED',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  RESCHEDULED = 'RESCHEDULED',
  NO_SHOW = 'NO_SHOW',
}

export enum PaymentStatus {
  CREATED = 'CREATED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum SessionMode {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  CHAT = 'CHAT',
}

export enum SessionType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  GROUP = 'GROUP',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum TransactionType {
  EARNING = 'EARNING',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYOUT = 'PAYOUT',
  REFUND = 'REFUND',
  INCENTIVE = 'INCENTIVE',
  PLATFORM_FEE = 'PLATFORM_FEE',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum WithdrawalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
  current?: boolean;
}

export interface ResumeFile {
  name: string;
  fileUrl: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  profilePicture?: string;
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
  headline?: string;
  expertise: string[];
  certifications: string[];
  pricePerSession: number;
  rating: number;
  totalReviews: number;
  verificationStatus: VerificationStatus;
  verifiedBadge: boolean;
  
  // Personal Details
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
  
  // Education
  education10th?: string[];
  education12th?: string[];
  bachelors?: string[];
  masters?: string[];
  
  // Work Experience
  workExperience?: WorkExperience[];
  
  // CAT Score
  catScore?: number;
  catYear?: number;
  catPercentile?: number;
  
  // Policies
  reschedulePolicy?: number;
  cancellationPolicy?: number;
  refundPolicy?: string;
  
  // Earnings
  balance?: number;
  totalEarnings?: number;
  pendingEarnings?: number;
  
  user?: User;
  resumes?: MentorResume[];
}

export interface MenteeProfile {
  id: string;
  userId: string;
  dob?: string;
  education10th: string[]; // [instituteName, score, yearOfPassout]
  education12th: string[]; // [instituteName, score, yearOfPassout]
  bachelors: string[]; // [instituteName, score, yearOfPassout]
  masters: string[]; // [instituteName, score, yearOfPassout]
  workExperience?: string;
  certifications: string[];
  catScore?: number;
  expectations?: string;
  resumes?: Resume[];
  sopDocuments?: SOPDocument[];
}

export interface AdminProfile {
  id: string;
  userId: string;
  department?: string;
  permissions: string[];
  phoneNumber?: string;
  lastLoginAt?: string;
}

export interface Resume {
  id: string;
  menteeId: string;
  name: string;
  fileUrl: string;
  createdAt: string;
}

export interface SOPDocument {
  id: string;
  menteeId: string;
  collegeName: string;
  fileUrl: string;
  createdAt: string;
}

export interface MentorApplication {
  id: string;
  userId: string;
  
  // Step 1: Personal Details & Social Links
  bio: string;
  headline?: string;
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
  
  // Step 2: Expertise
  expertise: string[];
  
  // Step 3: Education
  education10th?: string[];
  education12th?: string[];
  bachelors?: string[];
  masters?: string[];
  
  // Step 4: Work Experience
  workExperience?: WorkExperience[];
  
  // Step 5: CAT Score
  catScore?: number;
  catYear?: number;
  catPercentile?: number;
  
  // Step 6: Certifications
  certifications: string[];
  
  // Step 7: Resumes
  resumes?: ResumeFile[];
  
  // Pricing
  pricePerSession: number;
  
  // Status
  status: ApplicationStatus;
  rejectionReason?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface MentorResume {
  id: string;
  mentorId: string;
  name: string;
  fileUrl: string;
  createdAt: string;
}

export interface Slot {
  id: string;
  mentorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  isBooked: boolean;
  booking?: Booking;
}

export interface Booking {
  id: string;
  mentorId: string;
  menteeId: string;
  slotId: string;
  status: BookingStatus;
  sessionMode: SessionMode;
  sessionType: SessionType;
  purpose: string;
  shareProfile: boolean;
  meetingLink?: string;
  
  // Scheduling
  scheduledAt: string;
  duration?: number;
  amount: number;
  notes?: string;
  
  // Reschedule
  rescheduledFrom?: string;
  rescheduledAt?: string;
  rescheduleReason?: string;
  
  // Cancellation
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationReason?: string;
  refundInitiated?: boolean;
  
  mentorNotes?: string;
  createdAt: string;
  updatedAt: string;
  
  mentor?: MentorProfile & { user?: User };
  mentee?: MenteeProfile & { user?: User };
  slot?: Slot;
  payment?: Payment;
  feedback?: Review;
}

export interface Payment {
  id: string;
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  booking?: Booking;
  mentee?: MenteeProfile & { user?: User };
}

export interface Earning {
  id: string;
  mentorId: string;
  bookingId: string;
  amount: number;
  platformFee: number;
  mentorAmount: number;
  netAmount: number;
  status: TransactionStatus;
  isPaid: boolean;
  clearedAt?: string;
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
  referenceId?: string;
  reference?: string;
  description: string;
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  mentorId: string;
  amount: number;
  status: WithdrawalStatus;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    bankName: string;
  };
  upiId?: string;
  paymentMethod: string;
  processedAt?: string;
  rejectionReason?: string;
  transactionRef?: string;
  createdAt: string;
}

export interface Incentive {
  id: string;
  mentorId: string;
  type: string;
  title: string;
  description?: string;
  amount: number;
  status: TransactionStatus;
  isClaimed: boolean;
  expiresAt?: string;
  claimedAt?: string;
  createdAt: string;
}

export interface DashboardStats {
  balance: number;
  availableBalance: number;
  pendingEarnings: number;
  totalEarnings: number;
  thisMonthEarnings: number;
  totalIncentives: number;
  completedSessions: number;
  upcomingSessions: number;
  averageRating: number;
  totalReviews: number;
  pendingWithdrawals: number;
  bookings: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
  rating: {
    average: number;
    count: number;
  };
  recentBookings: Array<{
    id: string;
    menteeName: string;
    scheduledAt: string;
    status: string;
  }>;
  recentReviews: Array<{
    id: string;
    menteeName: string;
    rating: number;
    review?: string;
  }>;
  verificationStatus: VerificationStatus;
}

export interface ProfileResponse {
  user: User;
  profile: MenteeProfile | MentorProfile | AdminProfile;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
