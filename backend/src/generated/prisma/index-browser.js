
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
  provider: 'provider',
  role: 'role',
  name: 'name',
  profilePicture: 'profilePicture',
  isVerified: 'isVerified',
  isActive: 'isActive',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.MenteeProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  username: 'username',
  dateOfBirth: 'dateOfBirth',
  contactNumber: 'contactNumber',
  education: 'education',
  catHistory: 'catHistory',
  otherMbaScore: 'otherMbaScore',
  workExperience: 'workExperience',
  certifications: 'certifications',
  expectations: 'expectations',
  skillsets: 'skillsets',
  resumeUrl: 'resumeUrl',
  linkedInUrl: 'linkedInUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MentorProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  username: 'username',
  bio: 'bio',
  linkedInUrl: 'linkedInUrl',
  contactNumber: 'contactNumber',
  expertiseTags: 'expertiseTags',
  ugCollegeProfile: 'ugCollegeProfile',
  pgCollegeProfile: 'pgCollegeProfile',
  workExperience: 'workExperience',
  certifications: 'certifications',
  collegeDocumentUrl: 'collegeDocumentUrl',
  approvalStatus: 'approvalStatus',
  isVerified: 'isVerified',
  totalSessions: 'totalSessions',
  totalEarnings: 'totalEarnings',
  averageRating: 'averageRating',
  timezone: 'timezone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MentorServiceScalarFieldEnum = {
  id: 'id',
  mentorProfileId: 'mentorProfileId',
  serviceId: 'serviceId',
  title: 'title',
  description: 'description',
  price: 'price',
  durationMinutes: 'durationMinutes',
  bufferMinutes: 'bufferMinutes',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AvailabilityWindowScalarFieldEnum = {
  id: 'id',
  mentorProfileId: 'mentorProfileId',
  dayOfWeek: 'dayOfWeek',
  specificDate: 'specificDate',
  startTime: 'startTime',
  endTime: 'endTime',
  timezone: 'timezone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AvailabilityWindowServiceScalarFieldEnum = {
  id: 'id',
  windowId: 'windowId',
  mentorServiceId: 'mentorServiceId',
  createdAt: 'createdAt'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  menteeId: 'menteeId',
  mentorProfileId: 'mentorProfileId',
  mentorServiceId: 'mentorServiceId',
  startTime: 'startTime',
  endTime: 'endTime',
  status: 'status',
  paymentId: 'paymentId',
  meetingLink: 'meetingLink',
  purposeOfCall: 'purposeOfCall',
  notes: 'notes',
  cancelledReason: 'cancelledReason',
  rescheduledFromId: 'rescheduledFromId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  razorpayOrderId: 'razorpayOrderId',
  razorpayPaymentId: 'razorpayPaymentId',
  razorpaySignature: 'razorpaySignature',
  amount: 'amount',
  currency: 'currency',
  paymentStatus: 'paymentStatus',
  paidAt: 'paidAt',
  refundedAmount: 'refundedAmount',
  refundReason: 'refundReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  paymentId: 'paymentId',
  invoiceNumber: 'invoiceNumber',
  invoiceUrl: 'invoiceUrl',
  generatedAt: 'generatedAt'
};

exports.Prisma.SessionFeedbackScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  mentorProfileId: 'mentorProfileId',
  strengths: 'strengths',
  weaknesses: 'weaknesses',
  recommendations: 'recommendations',
  createdAt: 'createdAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  bookingId: 'bookingId',
  mentorProfileId: 'mentorProfileId',
  authorId: 'authorId',
  rating: 'rating',
  review: 'review',
  createdAt: 'createdAt'
};

exports.Prisma.PayoutScalarFieldEnum = {
  id: 'id',
  mentorProfileId: 'mentorProfileId',
  amount: 'amount',
  transactionId: 'transactionId',
  processedAt: 'processedAt',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
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
exports.AuthProvider = exports.$Enums.AuthProvider = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE'
};

exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  MENTOR: 'MENTOR',
  MENTEE: 'MENTEE'
};

exports.MentorApprovalStatus = exports.$Enums.MentorApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED'
};

exports.DayOfWeek = exports.$Enums.DayOfWeek = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

exports.Prisma.ModelName = {
  User: 'User',
  MenteeProfile: 'MenteeProfile',
  MentorProfile: 'MentorProfile',
  Service: 'Service',
  MentorService: 'MentorService',
  AvailabilityWindow: 'AvailabilityWindow',
  AvailabilityWindowService: 'AvailabilityWindowService',
  Booking: 'Booking',
  Payment: 'Payment',
  Invoice: 'Invoice',
  SessionFeedback: 'SessionFeedback',
  Review: 'Review',
  Payout: 'Payout'
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
