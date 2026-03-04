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
  expertise: string[];
  certifications: string[];
  pricePerSession: number;
  rating: number;
  totalReviews: number;
  verificationStatus: VerificationStatus;
  verifiedBadge: boolean;
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
  bio: string;
  expertise: string[];
  certifications: string[];
  pricePerSession: number;
  status: ApplicationStatus;
  rejectionReason?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
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
