
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  googleId: 'googleId',
  name: 'name',
  profilePicture: 'profilePicture',
  provider: 'provider',
  role: 'role',
  isVerified: 'isVerified',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.MentorProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  bio: 'bio',
  headline: 'headline',
  expertise: 'expertise',
  certifications: 'certifications',
  pricePerSession: 'pricePerSession',
  rating: 'rating',
  totalReviews: 'totalReviews',
  verificationStatus: 'verificationStatus',
  verifiedBadge: 'verifiedBadge',
  phone: 'phone',
  location: 'location',
  socialLinks: 'socialLinks',
  education10th: 'education10th',
  education12th: 'education12th',
  bachelors: 'bachelors',
  masters: 'masters',
  workExperience: 'workExperience',
  catScore: 'catScore',
  catYear: 'catYear',
  catPercentile: 'catPercentile',
  reschedulePolicy: 'reschedulePolicy',
  cancellationPolicy: 'cancellationPolicy',
  refundPolicy: 'refundPolicy',
  balance: 'balance',
  totalEarnings: 'totalEarnings',
  pendingEarnings: 'pendingEarnings',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenteeProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dob: 'dob',
  education10th: 'education10th',
  education12th: 'education12th',
  bachelors: 'bachelors',
  masters: 'masters',
  workExperience: 'workExperience',
  certifications: 'certifications',
  catScore: 'catScore',
  expectations: 'expectations',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdminProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MentorApplicationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  bio: 'bio',
  headline: 'headline',
  phone: 'phone',
  location: 'location',
  socialLinks: 'socialLinks',
  expertise: 'expertise',
  education10th: 'education10th',
  education12th: 'education12th',
  bachelors: 'bachelors',
  masters: 'masters',
  workExperience: 'workExperience',
  catScore: 'catScore',
  catYear: 'catYear',
  catPercentile: 'catPercentile',
  certifications: 'certifications',
  resumes: 'resumes',
  pricePerSession: 'pricePerSession',
  status: 'status',
  rejectionReason: 'rejectionReason',
  reviewedAt: 'reviewedAt',
  reviewedBy: 'reviewedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResumeScalarFieldEnum = {
  id: 'id',
  menteeId: 'menteeId',
  name: 'name',
  fileUrl: 'fileUrl',
  createdAt: 'createdAt'
};

exports.Prisma.MentorResumeScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  name: 'name',
  fileUrl: 'fileUrl',
  createdAt: 'createdAt'
};

exports.Prisma.SlotScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  startTime: 'startTime',
  endTime: 'endTime',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  menteeId: 'menteeId',
  slotId: 'slotId',
  status: 'status',
  sessionMode: 'sessionMode',
  sessionType: 'sessionType',
  purpose: 'purpose',
  shareProfile: 'shareProfile',
  meetingLink: 'meetingLink',
  rescheduledFrom: 'rescheduledFrom',
  rescheduledAt: 'rescheduledAt',
  rescheduledBy: 'rescheduledBy',
  rescheduleReason: 'rescheduleReason',
  cancelledAt: 'cancelledAt',
  cancelledBy: 'cancelledBy',
  cancellationReason: 'cancellationReason',
  refundInitiated: 'refundInitiated',
  mentorNotes: 'mentorNotes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  razorpayOrderId: 'razorpayOrderId',
  razorpayPaymentId: 'razorpayPaymentId',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt'
};

exports.Prisma.MentorFeedbackScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  bookingId: 'bookingId',
  feedbackPdfUrl: 'feedbackPdfUrl',
  createdAt: 'createdAt'
};

exports.Prisma.EarningsScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  bookingId: 'bookingId',
  amount: 'amount',
  platformFee: 'platformFee',
  netAmount: 'netAmount',
  status: 'status',
  clearedAt: 'clearedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  type: 'type',
  amount: 'amount',
  balanceBefore: 'balanceBefore',
  balanceAfter: 'balanceAfter',
  status: 'status',
  reference: 'reference',
  description: 'description',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.WithdrawalScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  amount: 'amount',
  status: 'status',
  bankDetails: 'bankDetails',
  upiId: 'upiId',
  paymentMethod: 'paymentMethod',
  processedAt: 'processedAt',
  rejectionReason: 'rejectionReason',
  transactionRef: 'transactionRef',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PayoutScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  amount: 'amount',
  status: 'status',
  paymentMethod: 'paymentMethod',
  transactionRef: 'transactionRef',
  processedBy: 'processedBy',
  processedAt: 'processedAt',
  failureReason: 'failureReason',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IncentiveScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  type: 'type',
  title: 'title',
  description: 'description',
  amount: 'amount',
  status: 'status',
  criteria: 'criteria',
  expiresAt: 'expiresAt',
  claimedAt: 'claimedAt',
  createdAt: 'createdAt'
};

exports.Prisma.WebinarScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  price: 'price',
  type: 'type',
  startTime: 'startTime',
  endTime: 'endTime',
  meetingLink: 'meetingLink',
  createdAt: 'createdAt'
};

exports.Prisma.WebinarRegistrationScalarFieldEnum = {
  id: 'id',
  webinarId: 'webinarId',
  userId: 'userId',
  paymentId: 'paymentId',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.VerificationDocumentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  documentUrl: 'documentUrl',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  icon: 'icon',
  color: 'color',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  icon: 'icon',
  criteria: 'criteria',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserBadgeScalarFieldEnum = {
  id: 'id',
  odlUserId: 'odlUserId',
  badgeId: 'badgeId',
  awardedAt: 'awardedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  MENTOR: 'MENTOR',
  MENTEE: 'MENTEE',
  ADMIN: 'ADMIN'
};

exports.VerificationStatus = exports.$Enums.VerificationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.SlotStatus = exports.$Enums.SlotStatus = {
  AVAILABLE: 'AVAILABLE',
  BOOKED: 'BOOKED',
  BLOCKED: 'BLOCKED',
  CANCELLED: 'CANCELLED'
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

exports.SessionMode = exports.$Enums.SessionMode = {
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  CHAT: 'CHAT'
};

exports.SessionType = exports.$Enums.SessionType = {
  ONE_ON_ONE: 'ONE_ON_ONE',
  GROUP: 'GROUP'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  CREATED: 'CREATED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

exports.TransactionStatus = exports.$Enums.TransactionStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.TransactionType = exports.$Enums.TransactionType = {
  EARNING: 'EARNING',
  WITHDRAWAL: 'WITHDRAWAL',
  PAYOUT: 'PAYOUT',
  REFUND: 'REFUND',
  INCENTIVE: 'INCENTIVE',
  PLATFORM_FEE: 'PLATFORM_FEE'
};

exports.WithdrawalStatus = exports.$Enums.WithdrawalStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

exports.PayoutStatus = exports.$Enums.PayoutStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.WebinarType = exports.$Enums.WebinarType = {
  FREE: 'FREE',
  PAID: 'PAID'
};

exports.Prisma.ModelName = {
  User: 'User',
  MentorProfile: 'MentorProfile',
  MenteeProfile: 'MenteeProfile',
  AdminProfile: 'AdminProfile',
  MentorApplication: 'MentorApplication',
  Resume: 'Resume',
  MentorResume: 'MentorResume',
  Slot: 'Slot',
  Booking: 'Booking',
  Payment: 'Payment',
  Review: 'Review',
  MentorFeedback: 'MentorFeedback',
  Earnings: 'Earnings',
  Transaction: 'Transaction',
  Withdrawal: 'Withdrawal',
  Payout: 'Payout',
  Incentive: 'Incentive',
  Webinar: 'Webinar',
  WebinarRegistration: 'WebinarRegistration',
  Notification: 'Notification',
  VerificationDocument: 'VerificationDocument',
  Category: 'Category',
  Badge: 'Badge',
  UserBadge: 'UserBadge'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
