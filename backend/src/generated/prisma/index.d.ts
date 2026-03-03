
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MentorProfile
 * 
 */
export type MentorProfile = $Result.DefaultSelection<Prisma.$MentorProfilePayload>
/**
 * Model MenteeProfile
 * 
 */
export type MenteeProfile = $Result.DefaultSelection<Prisma.$MenteeProfilePayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model SOPDocument
 * 
 */
export type SOPDocument = $Result.DefaultSelection<Prisma.$SOPDocumentPayload>
/**
 * Model Slot
 * 
 */
export type Slot = $Result.DefaultSelection<Prisma.$SlotPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model MentorFeedback
 * 
 */
export type MentorFeedback = $Result.DefaultSelection<Prisma.$MentorFeedbackPayload>
/**
 * Model Earnings
 * 
 */
export type Earnings = $Result.DefaultSelection<Prisma.$EarningsPayload>
/**
 * Model Webinar
 * 
 */
export type Webinar = $Result.DefaultSelection<Prisma.$WebinarPayload>
/**
 * Model WebinarRegistration
 * 
 */
export type WebinarRegistration = $Result.DefaultSelection<Prisma.$WebinarRegistrationPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model VerificationDocument
 * 
 */
export type VerificationDocument = $Result.DefaultSelection<Prisma.$VerificationDocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  MENTOR: 'MENTOR',
  MENTEE: 'MENTEE',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const VerificationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const SlotStatus: {
  AVAILABLE: 'AVAILABLE',
  BOOKED: 'BOOKED',
  BLOCKED: 'BLOCKED',
  CANCELLED: 'CANCELLED'
};

export type SlotStatus = (typeof SlotStatus)[keyof typeof SlotStatus]


export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const SessionMode: {
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  CHAT: 'CHAT'
};

export type SessionMode = (typeof SessionMode)[keyof typeof SessionMode]


export const SessionType: {
  ONE_ON_ONE: 'ONE_ON_ONE',
  GROUP: 'GROUP'
};

export type SessionType = (typeof SessionType)[keyof typeof SessionType]


export const PaymentStatus: {
  CREATED: 'CREATED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const WebinarType: {
  FREE: 'FREE',
  PAID: 'PAID'
};

export type WebinarType = (typeof WebinarType)[keyof typeof WebinarType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type SlotStatus = $Enums.SlotStatus

export const SlotStatus: typeof $Enums.SlotStatus

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type SessionMode = $Enums.SessionMode

export const SessionMode: typeof $Enums.SessionMode

export type SessionType = $Enums.SessionType

export const SessionType: typeof $Enums.SessionType

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type WebinarType = $Enums.WebinarType

export const WebinarType: typeof $Enums.WebinarType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.mentorProfile`: Exposes CRUD operations for the **MentorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorProfiles
    * const mentorProfiles = await prisma.mentorProfile.findMany()
    * ```
    */
  get mentorProfile(): Prisma.MentorProfileDelegate<ExtArgs>;

  /**
   * `prisma.menteeProfile`: Exposes CRUD operations for the **MenteeProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenteeProfiles
    * const menteeProfiles = await prisma.menteeProfile.findMany()
    * ```
    */
  get menteeProfile(): Prisma.MenteeProfileDelegate<ExtArgs>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs>;

  /**
   * `prisma.sOPDocument`: Exposes CRUD operations for the **SOPDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SOPDocuments
    * const sOPDocuments = await prisma.sOPDocument.findMany()
    * ```
    */
  get sOPDocument(): Prisma.SOPDocumentDelegate<ExtArgs>;

  /**
   * `prisma.slot`: Exposes CRUD operations for the **Slot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slots
    * const slots = await prisma.slot.findMany()
    * ```
    */
  get slot(): Prisma.SlotDelegate<ExtArgs>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.mentorFeedback`: Exposes CRUD operations for the **MentorFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorFeedbacks
    * const mentorFeedbacks = await prisma.mentorFeedback.findMany()
    * ```
    */
  get mentorFeedback(): Prisma.MentorFeedbackDelegate<ExtArgs>;

  /**
   * `prisma.earnings`: Exposes CRUD operations for the **Earnings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Earnings
    * const earnings = await prisma.earnings.findMany()
    * ```
    */
  get earnings(): Prisma.EarningsDelegate<ExtArgs>;

  /**
   * `prisma.webinar`: Exposes CRUD operations for the **Webinar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Webinars
    * const webinars = await prisma.webinar.findMany()
    * ```
    */
  get webinar(): Prisma.WebinarDelegate<ExtArgs>;

  /**
   * `prisma.webinarRegistration`: Exposes CRUD operations for the **WebinarRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebinarRegistrations
    * const webinarRegistrations = await prisma.webinarRegistration.findMany()
    * ```
    */
  get webinarRegistration(): Prisma.WebinarRegistrationDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.verificationDocument`: Exposes CRUD operations for the **VerificationDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationDocuments
    * const verificationDocuments = await prisma.verificationDocument.findMany()
    * ```
    */
  get verificationDocument(): Prisma.VerificationDocumentDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    MentorProfile: 'MentorProfile',
    MenteeProfile: 'MenteeProfile',
    Resume: 'Resume',
    SOPDocument: 'SOPDocument',
    Slot: 'Slot',
    Booking: 'Booking',
    Payment: 'Payment',
    Review: 'Review',
    MentorFeedback: 'MentorFeedback',
    Earnings: 'Earnings',
    Webinar: 'Webinar',
    WebinarRegistration: 'WebinarRegistration',
    Notification: 'Notification',
    VerificationDocument: 'VerificationDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "mentorProfile" | "menteeProfile" | "resume" | "sOPDocument" | "slot" | "booking" | "payment" | "review" | "mentorFeedback" | "earnings" | "webinar" | "webinarRegistration" | "notification" | "verificationDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MentorProfile: {
        payload: Prisma.$MentorProfilePayload<ExtArgs>
        fields: Prisma.MentorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          findFirst: {
            args: Prisma.MentorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          findMany: {
            args: Prisma.MentorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>[]
          }
          create: {
            args: Prisma.MentorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          createMany: {
            args: Prisma.MentorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>[]
          }
          delete: {
            args: Prisma.MentorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          update: {
            args: Prisma.MentorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          deleteMany: {
            args: Prisma.MentorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorProfilePayload>
          }
          aggregate: {
            args: Prisma.MentorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorProfile>
          }
          groupBy: {
            args: Prisma.MentorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<MentorProfileCountAggregateOutputType> | number
          }
        }
      }
      MenteeProfile: {
        payload: Prisma.$MenteeProfilePayload<ExtArgs>
        fields: Prisma.MenteeProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenteeProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenteeProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>
          }
          findFirst: {
            args: Prisma.MenteeProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenteeProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>
          }
          findMany: {
            args: Prisma.MenteeProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>[]
          }
          create: {
            args: Prisma.MenteeProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>
          }
          createMany: {
            args: Prisma.MenteeProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenteeProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>[]
          }
          delete: {
            args: Prisma.MenteeProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>
          }
          update: {
            args: Prisma.MenteeProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>
          }
          deleteMany: {
            args: Prisma.MenteeProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenteeProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenteeProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeProfilePayload>
          }
          aggregate: {
            args: Prisma.MenteeProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenteeProfile>
          }
          groupBy: {
            args: Prisma.MenteeProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenteeProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenteeProfileCountArgs<ExtArgs>
            result: $Utils.Optional<MenteeProfileCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      SOPDocument: {
        payload: Prisma.$SOPDocumentPayload<ExtArgs>
        fields: Prisma.SOPDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SOPDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SOPDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>
          }
          findFirst: {
            args: Prisma.SOPDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SOPDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>
          }
          findMany: {
            args: Prisma.SOPDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>[]
          }
          create: {
            args: Prisma.SOPDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>
          }
          createMany: {
            args: Prisma.SOPDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SOPDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>[]
          }
          delete: {
            args: Prisma.SOPDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>
          }
          update: {
            args: Prisma.SOPDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>
          }
          deleteMany: {
            args: Prisma.SOPDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SOPDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SOPDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SOPDocumentPayload>
          }
          aggregate: {
            args: Prisma.SOPDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSOPDocument>
          }
          groupBy: {
            args: Prisma.SOPDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SOPDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SOPDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<SOPDocumentCountAggregateOutputType> | number
          }
        }
      }
      Slot: {
        payload: Prisma.$SlotPayload<ExtArgs>
        fields: Prisma.SlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          findFirst: {
            args: Prisma.SlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          findMany: {
            args: Prisma.SlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          create: {
            args: Prisma.SlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          createMany: {
            args: Prisma.SlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>[]
          }
          delete: {
            args: Prisma.SlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          update: {
            args: Prisma.SlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          deleteMany: {
            args: Prisma.SlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SlotPayload>
          }
          aggregate: {
            args: Prisma.SlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlot>
          }
          groupBy: {
            args: Prisma.SlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SlotCountArgs<ExtArgs>
            result: $Utils.Optional<SlotCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      MentorFeedback: {
        payload: Prisma.$MentorFeedbackPayload<ExtArgs>
        fields: Prisma.MentorFeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorFeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorFeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>
          }
          findFirst: {
            args: Prisma.MentorFeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorFeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>
          }
          findMany: {
            args: Prisma.MentorFeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>[]
          }
          create: {
            args: Prisma.MentorFeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>
          }
          createMany: {
            args: Prisma.MentorFeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorFeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>[]
          }
          delete: {
            args: Prisma.MentorFeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>
          }
          update: {
            args: Prisma.MentorFeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>
          }
          deleteMany: {
            args: Prisma.MentorFeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorFeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorFeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorFeedbackPayload>
          }
          aggregate: {
            args: Prisma.MentorFeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorFeedback>
          }
          groupBy: {
            args: Prisma.MentorFeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorFeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorFeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<MentorFeedbackCountAggregateOutputType> | number
          }
        }
      }
      Earnings: {
        payload: Prisma.$EarningsPayload<ExtArgs>
        fields: Prisma.EarningsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EarningsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EarningsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>
          }
          findFirst: {
            args: Prisma.EarningsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EarningsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>
          }
          findMany: {
            args: Prisma.EarningsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>[]
          }
          create: {
            args: Prisma.EarningsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>
          }
          createMany: {
            args: Prisma.EarningsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EarningsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>[]
          }
          delete: {
            args: Prisma.EarningsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>
          }
          update: {
            args: Prisma.EarningsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>
          }
          deleteMany: {
            args: Prisma.EarningsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EarningsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EarningsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarningsPayload>
          }
          aggregate: {
            args: Prisma.EarningsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEarnings>
          }
          groupBy: {
            args: Prisma.EarningsGroupByArgs<ExtArgs>
            result: $Utils.Optional<EarningsGroupByOutputType>[]
          }
          count: {
            args: Prisma.EarningsCountArgs<ExtArgs>
            result: $Utils.Optional<EarningsCountAggregateOutputType> | number
          }
        }
      }
      Webinar: {
        payload: Prisma.$WebinarPayload<ExtArgs>
        fields: Prisma.WebinarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebinarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebinarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>
          }
          findFirst: {
            args: Prisma.WebinarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebinarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>
          }
          findMany: {
            args: Prisma.WebinarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>[]
          }
          create: {
            args: Prisma.WebinarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>
          }
          createMany: {
            args: Prisma.WebinarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebinarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>[]
          }
          delete: {
            args: Prisma.WebinarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>
          }
          update: {
            args: Prisma.WebinarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>
          }
          deleteMany: {
            args: Prisma.WebinarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebinarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WebinarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarPayload>
          }
          aggregate: {
            args: Prisma.WebinarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebinar>
          }
          groupBy: {
            args: Prisma.WebinarGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebinarGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebinarCountArgs<ExtArgs>
            result: $Utils.Optional<WebinarCountAggregateOutputType> | number
          }
        }
      }
      WebinarRegistration: {
        payload: Prisma.$WebinarRegistrationPayload<ExtArgs>
        fields: Prisma.WebinarRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebinarRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebinarRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>
          }
          findFirst: {
            args: Prisma.WebinarRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebinarRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>
          }
          findMany: {
            args: Prisma.WebinarRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>[]
          }
          create: {
            args: Prisma.WebinarRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>
          }
          createMany: {
            args: Prisma.WebinarRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebinarRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>[]
          }
          delete: {
            args: Prisma.WebinarRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>
          }
          update: {
            args: Prisma.WebinarRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.WebinarRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebinarRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WebinarRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebinarRegistrationPayload>
          }
          aggregate: {
            args: Prisma.WebinarRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebinarRegistration>
          }
          groupBy: {
            args: Prisma.WebinarRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebinarRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebinarRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<WebinarRegistrationCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      VerificationDocument: {
        payload: Prisma.$VerificationDocumentPayload<ExtArgs>
        fields: Prisma.VerificationDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          findFirst: {
            args: Prisma.VerificationDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          findMany: {
            args: Prisma.VerificationDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>[]
          }
          create: {
            args: Prisma.VerificationDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          createMany: {
            args: Prisma.VerificationDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>[]
          }
          delete: {
            args: Prisma.VerificationDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          update: {
            args: Prisma.VerificationDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          aggregate: {
            args: Prisma.VerificationDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationDocument>
          }
          groupBy: {
            args: Prisma.VerificationDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationDocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookingsAsMentor: number
    bookingsAsMentee: number
    notifications: number
    webinarRegistrations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookingsAsMentor?: boolean | UserCountOutputTypeCountBookingsAsMentorArgs
    bookingsAsMentee?: boolean | UserCountOutputTypeCountBookingsAsMenteeArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    webinarRegistrations?: boolean | UserCountOutputTypeCountWebinarRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsAsMentorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsAsMenteeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWebinarRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebinarRegistrationWhereInput
  }


  /**
   * Count Type MentorProfileCountOutputType
   */

  export type MentorProfileCountOutputType = {
    slots: number
    feedbackGiven: number
    earnings: number
  }

  export type MentorProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | MentorProfileCountOutputTypeCountSlotsArgs
    feedbackGiven?: boolean | MentorProfileCountOutputTypeCountFeedbackGivenArgs
    earnings?: boolean | MentorProfileCountOutputTypeCountEarningsArgs
  }

  // Custom InputTypes
  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfileCountOutputType
     */
    select?: MentorProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountFeedbackGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorFeedbackWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountEarningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EarningsWhereInput
  }


  /**
   * Count Type MenteeProfileCountOutputType
   */

  export type MenteeProfileCountOutputType = {
    resumes: number
    sopDocuments: number
  }

  export type MenteeProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumes?: boolean | MenteeProfileCountOutputTypeCountResumesArgs
    sopDocuments?: boolean | MenteeProfileCountOutputTypeCountSopDocumentsArgs
  }

  // Custom InputTypes
  /**
   * MenteeProfileCountOutputType without action
   */
  export type MenteeProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfileCountOutputType
     */
    select?: MenteeProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MenteeProfileCountOutputType without action
   */
  export type MenteeProfileCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }

  /**
   * MenteeProfileCountOutputType without action
   */
  export type MenteeProfileCountOutputTypeCountSopDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SOPDocumentWhereInput
  }


  /**
   * Count Type WebinarCountOutputType
   */

  export type WebinarCountOutputType = {
    registrations: number
  }

  export type WebinarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | WebinarCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * WebinarCountOutputType without action
   */
  export type WebinarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarCountOutputType
     */
    select?: WebinarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WebinarCountOutputType without action
   */
  export type WebinarCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebinarRegistrationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    googleId: string | null
    name: string | null
    profilePicture: string | null
    provider: string | null
    role: $Enums.Role | null
    isVerified: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    googleId: string | null
    name: string | null
    profilePicture: string | null
    provider: string | null
    role: $Enums.Role | null
    isVerified: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    googleId: number
    name: number
    profilePicture: number
    provider: number
    role: number
    isVerified: number
    isActive: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    name?: true
    profilePicture?: true
    provider?: true
    role?: true
    isVerified?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    name?: true
    profilePicture?: true
    provider?: true
    role?: true
    isVerified?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    name?: true
    profilePicture?: true
    provider?: true
    role?: true
    isVerified?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    googleId: string | null
    name: string | null
    profilePicture: string | null
    provider: string
    role: $Enums.Role
    isVerified: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    name?: boolean
    profilePicture?: boolean
    provider?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    mentorProfile?: boolean | User$mentorProfileArgs<ExtArgs>
    menteeProfile?: boolean | User$menteeProfileArgs<ExtArgs>
    bookingsAsMentor?: boolean | User$bookingsAsMentorArgs<ExtArgs>
    bookingsAsMentee?: boolean | User$bookingsAsMenteeArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    verification?: boolean | User$verificationArgs<ExtArgs>
    webinarRegistrations?: boolean | User$webinarRegistrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    name?: boolean
    profilePicture?: boolean
    provider?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    name?: boolean
    profilePicture?: boolean
    provider?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | User$mentorProfileArgs<ExtArgs>
    menteeProfile?: boolean | User$menteeProfileArgs<ExtArgs>
    bookingsAsMentor?: boolean | User$bookingsAsMentorArgs<ExtArgs>
    bookingsAsMentee?: boolean | User$bookingsAsMenteeArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    verification?: boolean | User$verificationArgs<ExtArgs>
    webinarRegistrations?: boolean | User$webinarRegistrationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs> | null
      menteeProfile: Prisma.$MenteeProfilePayload<ExtArgs> | null
      bookingsAsMentor: Prisma.$BookingPayload<ExtArgs>[]
      bookingsAsMentee: Prisma.$BookingPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      verification: Prisma.$VerificationDocumentPayload<ExtArgs> | null
      webinarRegistrations: Prisma.$WebinarRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      googleId: string | null
      name: string | null
      profilePicture: string | null
      provider: string
      role: $Enums.Role
      isVerified: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentorProfile<T extends User$mentorProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$mentorProfileArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    menteeProfile<T extends User$menteeProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$menteeProfileArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    bookingsAsMentor<T extends User$bookingsAsMentorArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsAsMentorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    bookingsAsMentee<T extends User$bookingsAsMenteeArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsAsMenteeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    verification<T extends User$verificationArgs<ExtArgs> = {}>(args?: Subset<T, User$verificationArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    webinarRegistrations<T extends User$webinarRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$webinarRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.mentorProfile
   */
  export type User$mentorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    where?: MentorProfileWhereInput
  }

  /**
   * User.menteeProfile
   */
  export type User$menteeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    where?: MenteeProfileWhereInput
  }

  /**
   * User.bookingsAsMentor
   */
  export type User$bookingsAsMentorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User.bookingsAsMentee
   */
  export type User$bookingsAsMenteeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.verification
   */
  export type User$verificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    where?: VerificationDocumentWhereInput
  }

  /**
   * User.webinarRegistrations
   */
  export type User$webinarRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    where?: WebinarRegistrationWhereInput
    orderBy?: WebinarRegistrationOrderByWithRelationInput | WebinarRegistrationOrderByWithRelationInput[]
    cursor?: WebinarRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebinarRegistrationScalarFieldEnum | WebinarRegistrationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MentorProfile
   */

  export type AggregateMentorProfile = {
    _count: MentorProfileCountAggregateOutputType | null
    _avg: MentorProfileAvgAggregateOutputType | null
    _sum: MentorProfileSumAggregateOutputType | null
    _min: MentorProfileMinAggregateOutputType | null
    _max: MentorProfileMaxAggregateOutputType | null
  }

  export type MentorProfileAvgAggregateOutputType = {
    pricePerSession: number | null
    rating: number | null
    totalReviews: number | null
  }

  export type MentorProfileSumAggregateOutputType = {
    pricePerSession: number | null
    rating: number | null
    totalReviews: number | null
  }

  export type MentorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    pricePerSession: number | null
    rating: number | null
    totalReviews: number | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedBadge: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    pricePerSession: number | null
    rating: number | null
    totalReviews: number | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedBadge: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileCountAggregateOutputType = {
    id: number
    userId: number
    bio: number
    expertise: number
    certifications: number
    pricePerSession: number
    rating: number
    totalReviews: number
    verificationStatus: number
    verifiedBadge: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorProfileAvgAggregateInputType = {
    pricePerSession?: true
    rating?: true
    totalReviews?: true
  }

  export type MentorProfileSumAggregateInputType = {
    pricePerSession?: true
    rating?: true
    totalReviews?: true
  }

  export type MentorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    pricePerSession?: true
    rating?: true
    totalReviews?: true
    verificationStatus?: true
    verifiedBadge?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    pricePerSession?: true
    rating?: true
    totalReviews?: true
    verificationStatus?: true
    verifiedBadge?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    expertise?: true
    certifications?: true
    pricePerSession?: true
    rating?: true
    totalReviews?: true
    verificationStatus?: true
    verifiedBadge?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MentorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorProfile to aggregate.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorProfiles
    **/
    _count?: true | MentorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MentorProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MentorProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorProfileMaxAggregateInputType
  }

  export type GetMentorProfileAggregateType<T extends MentorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorProfile[P]>
      : GetScalarType<T[P], AggregateMentorProfile[P]>
  }




  export type MentorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorProfileWhereInput
    orderBy?: MentorProfileOrderByWithAggregationInput | MentorProfileOrderByWithAggregationInput[]
    by: MentorProfileScalarFieldEnum[] | MentorProfileScalarFieldEnum
    having?: MentorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorProfileCountAggregateInputType | true
    _avg?: MentorProfileAvgAggregateInputType
    _sum?: MentorProfileSumAggregateInputType
    _min?: MentorProfileMinAggregateInputType
    _max?: MentorProfileMaxAggregateInputType
  }

  export type MentorProfileGroupByOutputType = {
    id: string
    userId: string
    bio: string
    expertise: string[]
    certifications: string[]
    pricePerSession: number
    rating: number
    totalReviews: number
    verificationStatus: $Enums.VerificationStatus
    verifiedBadge: boolean
    createdAt: Date
    updatedAt: Date
    _count: MentorProfileCountAggregateOutputType | null
    _avg: MentorProfileAvgAggregateOutputType | null
    _sum: MentorProfileSumAggregateOutputType | null
    _min: MentorProfileMinAggregateOutputType | null
    _max: MentorProfileMaxAggregateOutputType | null
  }

  type GetMentorProfileGroupByPayload<T extends MentorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], MentorProfileGroupByOutputType[P]>
        }
      >
    >


  export type MentorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    expertise?: boolean
    certifications?: boolean
    pricePerSession?: boolean
    rating?: boolean
    totalReviews?: boolean
    verificationStatus?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    slots?: boolean | MentorProfile$slotsArgs<ExtArgs>
    feedbackGiven?: boolean | MentorProfile$feedbackGivenArgs<ExtArgs>
    earnings?: boolean | MentorProfile$earningsArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    expertise?: boolean
    certifications?: boolean
    pricePerSession?: boolean
    rating?: boolean
    totalReviews?: boolean
    verificationStatus?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    bio?: boolean
    expertise?: boolean
    certifications?: boolean
    pricePerSession?: boolean
    rating?: boolean
    totalReviews?: boolean
    verificationStatus?: boolean
    verifiedBadge?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    slots?: boolean | MentorProfile$slotsArgs<ExtArgs>
    feedbackGiven?: boolean | MentorProfile$feedbackGivenArgs<ExtArgs>
    earnings?: boolean | MentorProfile$earningsArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MentorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MentorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      slots: Prisma.$SlotPayload<ExtArgs>[]
      feedbackGiven: Prisma.$MentorFeedbackPayload<ExtArgs>[]
      earnings: Prisma.$EarningsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      bio: string
      expertise: string[]
      certifications: string[]
      pricePerSession: number
      rating: number
      totalReviews: number
      verificationStatus: $Enums.VerificationStatus
      verifiedBadge: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mentorProfile"]>
    composites: {}
  }

  type MentorProfileGetPayload<S extends boolean | null | undefined | MentorProfileDefaultArgs> = $Result.GetResult<Prisma.$MentorProfilePayload, S>

  type MentorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorProfileCountAggregateInputType | true
    }

  export interface MentorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorProfile'], meta: { name: 'MentorProfile' } }
    /**
     * Find zero or one MentorProfile that matches the filter.
     * @param {MentorProfileFindUniqueArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorProfileFindUniqueArgs>(args: SelectSubset<T, MentorProfileFindUniqueArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorProfileFindUniqueOrThrowArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileFindFirstArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorProfileFindFirstArgs>(args?: SelectSubset<T, MentorProfileFindFirstArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileFindFirstOrThrowArgs} args - Arguments to find a MentorProfile
     * @example
     * // Get one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorProfiles
     * const mentorProfiles = await prisma.mentorProfile.findMany()
     * 
     * // Get first 10 MentorProfiles
     * const mentorProfiles = await prisma.mentorProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorProfileWithIdOnly = await prisma.mentorProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorProfileFindManyArgs>(args?: SelectSubset<T, MentorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorProfile.
     * @param {MentorProfileCreateArgs} args - Arguments to create a MentorProfile.
     * @example
     * // Create one MentorProfile
     * const MentorProfile = await prisma.mentorProfile.create({
     *   data: {
     *     // ... data to create a MentorProfile
     *   }
     * })
     * 
     */
    create<T extends MentorProfileCreateArgs>(args: SelectSubset<T, MentorProfileCreateArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorProfiles.
     * @param {MentorProfileCreateManyArgs} args - Arguments to create many MentorProfiles.
     * @example
     * // Create many MentorProfiles
     * const mentorProfile = await prisma.mentorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorProfileCreateManyArgs>(args?: SelectSubset<T, MentorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorProfiles and returns the data saved in the database.
     * @param {MentorProfileCreateManyAndReturnArgs} args - Arguments to create many MentorProfiles.
     * @example
     * // Create many MentorProfiles
     * const mentorProfile = await prisma.mentorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorProfiles and only return the `id`
     * const mentorProfileWithIdOnly = await prisma.mentorProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorProfile.
     * @param {MentorProfileDeleteArgs} args - Arguments to delete one MentorProfile.
     * @example
     * // Delete one MentorProfile
     * const MentorProfile = await prisma.mentorProfile.delete({
     *   where: {
     *     // ... filter to delete one MentorProfile
     *   }
     * })
     * 
     */
    delete<T extends MentorProfileDeleteArgs>(args: SelectSubset<T, MentorProfileDeleteArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorProfile.
     * @param {MentorProfileUpdateArgs} args - Arguments to update one MentorProfile.
     * @example
     * // Update one MentorProfile
     * const mentorProfile = await prisma.mentorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorProfileUpdateArgs>(args: SelectSubset<T, MentorProfileUpdateArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorProfiles.
     * @param {MentorProfileDeleteManyArgs} args - Arguments to filter MentorProfiles to delete.
     * @example
     * // Delete a few MentorProfiles
     * const { count } = await prisma.mentorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorProfileDeleteManyArgs>(args?: SelectSubset<T, MentorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorProfiles
     * const mentorProfile = await prisma.mentorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorProfileUpdateManyArgs>(args: SelectSubset<T, MentorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorProfile.
     * @param {MentorProfileUpsertArgs} args - Arguments to update or create a MentorProfile.
     * @example
     * // Update or create a MentorProfile
     * const mentorProfile = await prisma.mentorProfile.upsert({
     *   create: {
     *     // ... data to create a MentorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorProfile we want to update
     *   }
     * })
     */
    upsert<T extends MentorProfileUpsertArgs>(args: SelectSubset<T, MentorProfileUpsertArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileCountArgs} args - Arguments to filter MentorProfiles to count.
     * @example
     * // Count the number of MentorProfiles
     * const count = await prisma.mentorProfile.count({
     *   where: {
     *     // ... the filter for the MentorProfiles we want to count
     *   }
     * })
    **/
    count<T extends MentorProfileCountArgs>(
      args?: Subset<T, MentorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MentorProfileAggregateArgs>(args: Subset<T, MentorProfileAggregateArgs>): Prisma.PrismaPromise<GetMentorProfileAggregateType<T>>

    /**
     * Group by MentorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MentorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorProfileGroupByArgs['orderBy'] }
        : { orderBy?: MentorProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MentorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorProfile model
   */
  readonly fields: MentorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    slots<T extends MentorProfile$slotsArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany"> | Null>
    feedbackGiven<T extends MentorProfile$feedbackGivenArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$feedbackGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findMany"> | Null>
    earnings<T extends MentorProfile$earningsArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$earningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MentorProfile model
   */ 
  interface MentorProfileFieldRefs {
    readonly id: FieldRef<"MentorProfile", 'String'>
    readonly userId: FieldRef<"MentorProfile", 'String'>
    readonly bio: FieldRef<"MentorProfile", 'String'>
    readonly expertise: FieldRef<"MentorProfile", 'String[]'>
    readonly certifications: FieldRef<"MentorProfile", 'String[]'>
    readonly pricePerSession: FieldRef<"MentorProfile", 'Float'>
    readonly rating: FieldRef<"MentorProfile", 'Float'>
    readonly totalReviews: FieldRef<"MentorProfile", 'Int'>
    readonly verificationStatus: FieldRef<"MentorProfile", 'VerificationStatus'>
    readonly verifiedBadge: FieldRef<"MentorProfile", 'Boolean'>
    readonly createdAt: FieldRef<"MentorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"MentorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorProfile findUnique
   */
  export type MentorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile findUniqueOrThrow
   */
  export type MentorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile findFirst
   */
  export type MentorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorProfiles.
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorProfiles.
     */
    distinct?: MentorProfileScalarFieldEnum | MentorProfileScalarFieldEnum[]
  }

  /**
   * MentorProfile findFirstOrThrow
   */
  export type MentorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * Filter, which MentorProfile to fetch.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorProfiles.
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorProfiles.
     */
    distinct?: MentorProfileScalarFieldEnum | MentorProfileScalarFieldEnum[]
  }

  /**
   * MentorProfile findMany
   */
  export type MentorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * Filter, which MentorProfiles to fetch.
     */
    where?: MentorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorProfiles to fetch.
     */
    orderBy?: MentorProfileOrderByWithRelationInput | MentorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorProfiles.
     */
    cursor?: MentorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorProfiles.
     */
    skip?: number
    distinct?: MentorProfileScalarFieldEnum | MentorProfileScalarFieldEnum[]
  }

  /**
   * MentorProfile create
   */
  export type MentorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a MentorProfile.
     */
    data: XOR<MentorProfileCreateInput, MentorProfileUncheckedCreateInput>
  }

  /**
   * MentorProfile createMany
   */
  export type MentorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorProfiles.
     */
    data: MentorProfileCreateManyInput | MentorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorProfile createManyAndReturn
   */
  export type MentorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorProfiles.
     */
    data: MentorProfileCreateManyInput | MentorProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MentorProfile update
   */
  export type MentorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a MentorProfile.
     */
    data: XOR<MentorProfileUpdateInput, MentorProfileUncheckedUpdateInput>
    /**
     * Choose, which MentorProfile to update.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile updateMany
   */
  export type MentorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorProfiles.
     */
    data: XOR<MentorProfileUpdateManyMutationInput, MentorProfileUncheckedUpdateManyInput>
    /**
     * Filter which MentorProfiles to update
     */
    where?: MentorProfileWhereInput
  }

  /**
   * MentorProfile upsert
   */
  export type MentorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the MentorProfile to update in case it exists.
     */
    where: MentorProfileWhereUniqueInput
    /**
     * In case the MentorProfile found by the `where` argument doesn't exist, create a new MentorProfile with this data.
     */
    create: XOR<MentorProfileCreateInput, MentorProfileUncheckedCreateInput>
    /**
     * In case the MentorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorProfileUpdateInput, MentorProfileUncheckedUpdateInput>
  }

  /**
   * MentorProfile delete
   */
  export type MentorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
    /**
     * Filter which MentorProfile to delete.
     */
    where: MentorProfileWhereUniqueInput
  }

  /**
   * MentorProfile deleteMany
   */
  export type MentorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorProfiles to delete
     */
    where?: MentorProfileWhereInput
  }

  /**
   * MentorProfile.slots
   */
  export type MentorProfile$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    where?: SlotWhereInput
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    cursor?: SlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * MentorProfile.feedbackGiven
   */
  export type MentorProfile$feedbackGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    where?: MentorFeedbackWhereInput
    orderBy?: MentorFeedbackOrderByWithRelationInput | MentorFeedbackOrderByWithRelationInput[]
    cursor?: MentorFeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MentorFeedbackScalarFieldEnum | MentorFeedbackScalarFieldEnum[]
  }

  /**
   * MentorProfile.earnings
   */
  export type MentorProfile$earningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    where?: EarningsWhereInput
    orderBy?: EarningsOrderByWithRelationInput | EarningsOrderByWithRelationInput[]
    cursor?: EarningsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EarningsScalarFieldEnum | EarningsScalarFieldEnum[]
  }

  /**
   * MentorProfile without action
   */
  export type MentorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorProfile
     */
    select?: MentorProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorProfileInclude<ExtArgs> | null
  }


  /**
   * Model MenteeProfile
   */

  export type AggregateMenteeProfile = {
    _count: MenteeProfileCountAggregateOutputType | null
    _avg: MenteeProfileAvgAggregateOutputType | null
    _sum: MenteeProfileSumAggregateOutputType | null
    _min: MenteeProfileMinAggregateOutputType | null
    _max: MenteeProfileMaxAggregateOutputType | null
  }

  export type MenteeProfileAvgAggregateOutputType = {
    catScore: number | null
  }

  export type MenteeProfileSumAggregateOutputType = {
    catScore: number | null
  }

  export type MenteeProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dob: Date | null
    education10th: string | null
    education12th: string | null
    bachelors: string | null
    masters: string | null
    workExperience: string | null
    catScore: number | null
    expectations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dob: Date | null
    education10th: string | null
    education12th: string | null
    bachelors: string | null
    masters: string | null
    workExperience: string | null
    catScore: number | null
    expectations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileCountAggregateOutputType = {
    id: number
    userId: number
    dob: number
    education10th: number
    education12th: number
    bachelors: number
    masters: number
    workExperience: number
    certifications: number
    catScore: number
    expectations: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MenteeProfileAvgAggregateInputType = {
    catScore?: true
  }

  export type MenteeProfileSumAggregateInputType = {
    catScore?: true
  }

  export type MenteeProfileMinAggregateInputType = {
    id?: true
    userId?: true
    dob?: true
    education10th?: true
    education12th?: true
    bachelors?: true
    masters?: true
    workExperience?: true
    catScore?: true
    expectations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    dob?: true
    education10th?: true
    education12th?: true
    bachelors?: true
    masters?: true
    workExperience?: true
    catScore?: true
    expectations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    dob?: true
    education10th?: true
    education12th?: true
    bachelors?: true
    masters?: true
    workExperience?: true
    certifications?: true
    catScore?: true
    expectations?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MenteeProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenteeProfile to aggregate.
     */
    where?: MenteeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeProfiles to fetch.
     */
    orderBy?: MenteeProfileOrderByWithRelationInput | MenteeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenteeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenteeProfiles
    **/
    _count?: true | MenteeProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenteeProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenteeProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenteeProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenteeProfileMaxAggregateInputType
  }

  export type GetMenteeProfileAggregateType<T extends MenteeProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateMenteeProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenteeProfile[P]>
      : GetScalarType<T[P], AggregateMenteeProfile[P]>
  }




  export type MenteeProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenteeProfileWhereInput
    orderBy?: MenteeProfileOrderByWithAggregationInput | MenteeProfileOrderByWithAggregationInput[]
    by: MenteeProfileScalarFieldEnum[] | MenteeProfileScalarFieldEnum
    having?: MenteeProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenteeProfileCountAggregateInputType | true
    _avg?: MenteeProfileAvgAggregateInputType
    _sum?: MenteeProfileSumAggregateInputType
    _min?: MenteeProfileMinAggregateInputType
    _max?: MenteeProfileMaxAggregateInputType
  }

  export type MenteeProfileGroupByOutputType = {
    id: string
    userId: string
    dob: Date | null
    education10th: string | null
    education12th: string | null
    bachelors: string | null
    masters: string | null
    workExperience: string | null
    certifications: string[]
    catScore: number | null
    expectations: string | null
    createdAt: Date
    updatedAt: Date
    _count: MenteeProfileCountAggregateOutputType | null
    _avg: MenteeProfileAvgAggregateOutputType | null
    _sum: MenteeProfileSumAggregateOutputType | null
    _min: MenteeProfileMinAggregateOutputType | null
    _max: MenteeProfileMaxAggregateOutputType | null
  }

  type GetMenteeProfileGroupByPayload<T extends MenteeProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenteeProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenteeProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenteeProfileGroupByOutputType[P]>
            : GetScalarType<T[P], MenteeProfileGroupByOutputType[P]>
        }
      >
    >


  export type MenteeProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dob?: boolean
    education10th?: boolean
    education12th?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    certifications?: boolean
    catScore?: boolean
    expectations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resumes?: boolean | MenteeProfile$resumesArgs<ExtArgs>
    sopDocuments?: boolean | MenteeProfile$sopDocumentsArgs<ExtArgs>
    _count?: boolean | MenteeProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dob?: boolean
    education10th?: boolean
    education12th?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    certifications?: boolean
    catScore?: boolean
    expectations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    dob?: boolean
    education10th?: boolean
    education12th?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    certifications?: boolean
    catScore?: boolean
    expectations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MenteeProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resumes?: boolean | MenteeProfile$resumesArgs<ExtArgs>
    sopDocuments?: boolean | MenteeProfile$sopDocumentsArgs<ExtArgs>
    _count?: boolean | MenteeProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenteeProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MenteeProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenteeProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      resumes: Prisma.$ResumePayload<ExtArgs>[]
      sopDocuments: Prisma.$SOPDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dob: Date | null
      education10th: string | null
      education12th: string | null
      bachelors: string | null
      masters: string | null
      workExperience: string | null
      certifications: string[]
      catScore: number | null
      expectations: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["menteeProfile"]>
    composites: {}
  }

  type MenteeProfileGetPayload<S extends boolean | null | undefined | MenteeProfileDefaultArgs> = $Result.GetResult<Prisma.$MenteeProfilePayload, S>

  type MenteeProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MenteeProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MenteeProfileCountAggregateInputType | true
    }

  export interface MenteeProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenteeProfile'], meta: { name: 'MenteeProfile' } }
    /**
     * Find zero or one MenteeProfile that matches the filter.
     * @param {MenteeProfileFindUniqueArgs} args - Arguments to find a MenteeProfile
     * @example
     * // Get one MenteeProfile
     * const menteeProfile = await prisma.menteeProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenteeProfileFindUniqueArgs>(args: SelectSubset<T, MenteeProfileFindUniqueArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MenteeProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MenteeProfileFindUniqueOrThrowArgs} args - Arguments to find a MenteeProfile
     * @example
     * // Get one MenteeProfile
     * const menteeProfile = await prisma.menteeProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenteeProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, MenteeProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MenteeProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileFindFirstArgs} args - Arguments to find a MenteeProfile
     * @example
     * // Get one MenteeProfile
     * const menteeProfile = await prisma.menteeProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenteeProfileFindFirstArgs>(args?: SelectSubset<T, MenteeProfileFindFirstArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MenteeProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileFindFirstOrThrowArgs} args - Arguments to find a MenteeProfile
     * @example
     * // Get one MenteeProfile
     * const menteeProfile = await prisma.menteeProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenteeProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, MenteeProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MenteeProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenteeProfiles
     * const menteeProfiles = await prisma.menteeProfile.findMany()
     * 
     * // Get first 10 MenteeProfiles
     * const menteeProfiles = await prisma.menteeProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menteeProfileWithIdOnly = await prisma.menteeProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenteeProfileFindManyArgs>(args?: SelectSubset<T, MenteeProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MenteeProfile.
     * @param {MenteeProfileCreateArgs} args - Arguments to create a MenteeProfile.
     * @example
     * // Create one MenteeProfile
     * const MenteeProfile = await prisma.menteeProfile.create({
     *   data: {
     *     // ... data to create a MenteeProfile
     *   }
     * })
     * 
     */
    create<T extends MenteeProfileCreateArgs>(args: SelectSubset<T, MenteeProfileCreateArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MenteeProfiles.
     * @param {MenteeProfileCreateManyArgs} args - Arguments to create many MenteeProfiles.
     * @example
     * // Create many MenteeProfiles
     * const menteeProfile = await prisma.menteeProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenteeProfileCreateManyArgs>(args?: SelectSubset<T, MenteeProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenteeProfiles and returns the data saved in the database.
     * @param {MenteeProfileCreateManyAndReturnArgs} args - Arguments to create many MenteeProfiles.
     * @example
     * // Create many MenteeProfiles
     * const menteeProfile = await prisma.menteeProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenteeProfiles and only return the `id`
     * const menteeProfileWithIdOnly = await prisma.menteeProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenteeProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, MenteeProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MenteeProfile.
     * @param {MenteeProfileDeleteArgs} args - Arguments to delete one MenteeProfile.
     * @example
     * // Delete one MenteeProfile
     * const MenteeProfile = await prisma.menteeProfile.delete({
     *   where: {
     *     // ... filter to delete one MenteeProfile
     *   }
     * })
     * 
     */
    delete<T extends MenteeProfileDeleteArgs>(args: SelectSubset<T, MenteeProfileDeleteArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MenteeProfile.
     * @param {MenteeProfileUpdateArgs} args - Arguments to update one MenteeProfile.
     * @example
     * // Update one MenteeProfile
     * const menteeProfile = await prisma.menteeProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenteeProfileUpdateArgs>(args: SelectSubset<T, MenteeProfileUpdateArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MenteeProfiles.
     * @param {MenteeProfileDeleteManyArgs} args - Arguments to filter MenteeProfiles to delete.
     * @example
     * // Delete a few MenteeProfiles
     * const { count } = await prisma.menteeProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenteeProfileDeleteManyArgs>(args?: SelectSubset<T, MenteeProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenteeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenteeProfiles
     * const menteeProfile = await prisma.menteeProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenteeProfileUpdateManyArgs>(args: SelectSubset<T, MenteeProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MenteeProfile.
     * @param {MenteeProfileUpsertArgs} args - Arguments to update or create a MenteeProfile.
     * @example
     * // Update or create a MenteeProfile
     * const menteeProfile = await prisma.menteeProfile.upsert({
     *   create: {
     *     // ... data to create a MenteeProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenteeProfile we want to update
     *   }
     * })
     */
    upsert<T extends MenteeProfileUpsertArgs>(args: SelectSubset<T, MenteeProfileUpsertArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MenteeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileCountArgs} args - Arguments to filter MenteeProfiles to count.
     * @example
     * // Count the number of MenteeProfiles
     * const count = await prisma.menteeProfile.count({
     *   where: {
     *     // ... the filter for the MenteeProfiles we want to count
     *   }
     * })
    **/
    count<T extends MenteeProfileCountArgs>(
      args?: Subset<T, MenteeProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenteeProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenteeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenteeProfileAggregateArgs>(args: Subset<T, MenteeProfileAggregateArgs>): Prisma.PrismaPromise<GetMenteeProfileAggregateType<T>>

    /**
     * Group by MenteeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenteeProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenteeProfileGroupByArgs['orderBy'] }
        : { orderBy?: MenteeProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenteeProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenteeProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenteeProfile model
   */
  readonly fields: MenteeProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenteeProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenteeProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    resumes<T extends MenteeProfile$resumesArgs<ExtArgs> = {}>(args?: Subset<T, MenteeProfile$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany"> | Null>
    sopDocuments<T extends MenteeProfile$sopDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, MenteeProfile$sopDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenteeProfile model
   */ 
  interface MenteeProfileFieldRefs {
    readonly id: FieldRef<"MenteeProfile", 'String'>
    readonly userId: FieldRef<"MenteeProfile", 'String'>
    readonly dob: FieldRef<"MenteeProfile", 'DateTime'>
    readonly education10th: FieldRef<"MenteeProfile", 'String'>
    readonly education12th: FieldRef<"MenteeProfile", 'String'>
    readonly bachelors: FieldRef<"MenteeProfile", 'String'>
    readonly masters: FieldRef<"MenteeProfile", 'String'>
    readonly workExperience: FieldRef<"MenteeProfile", 'String'>
    readonly certifications: FieldRef<"MenteeProfile", 'String[]'>
    readonly catScore: FieldRef<"MenteeProfile", 'Float'>
    readonly expectations: FieldRef<"MenteeProfile", 'String'>
    readonly createdAt: FieldRef<"MenteeProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"MenteeProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenteeProfile findUnique
   */
  export type MenteeProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * Filter, which MenteeProfile to fetch.
     */
    where: MenteeProfileWhereUniqueInput
  }

  /**
   * MenteeProfile findUniqueOrThrow
   */
  export type MenteeProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * Filter, which MenteeProfile to fetch.
     */
    where: MenteeProfileWhereUniqueInput
  }

  /**
   * MenteeProfile findFirst
   */
  export type MenteeProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * Filter, which MenteeProfile to fetch.
     */
    where?: MenteeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeProfiles to fetch.
     */
    orderBy?: MenteeProfileOrderByWithRelationInput | MenteeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenteeProfiles.
     */
    cursor?: MenteeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenteeProfiles.
     */
    distinct?: MenteeProfileScalarFieldEnum | MenteeProfileScalarFieldEnum[]
  }

  /**
   * MenteeProfile findFirstOrThrow
   */
  export type MenteeProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * Filter, which MenteeProfile to fetch.
     */
    where?: MenteeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeProfiles to fetch.
     */
    orderBy?: MenteeProfileOrderByWithRelationInput | MenteeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenteeProfiles.
     */
    cursor?: MenteeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenteeProfiles.
     */
    distinct?: MenteeProfileScalarFieldEnum | MenteeProfileScalarFieldEnum[]
  }

  /**
   * MenteeProfile findMany
   */
  export type MenteeProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * Filter, which MenteeProfiles to fetch.
     */
    where?: MenteeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeProfiles to fetch.
     */
    orderBy?: MenteeProfileOrderByWithRelationInput | MenteeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenteeProfiles.
     */
    cursor?: MenteeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeProfiles.
     */
    skip?: number
    distinct?: MenteeProfileScalarFieldEnum | MenteeProfileScalarFieldEnum[]
  }

  /**
   * MenteeProfile create
   */
  export type MenteeProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a MenteeProfile.
     */
    data: XOR<MenteeProfileCreateInput, MenteeProfileUncheckedCreateInput>
  }

  /**
   * MenteeProfile createMany
   */
  export type MenteeProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenteeProfiles.
     */
    data: MenteeProfileCreateManyInput | MenteeProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenteeProfile createManyAndReturn
   */
  export type MenteeProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MenteeProfiles.
     */
    data: MenteeProfileCreateManyInput | MenteeProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenteeProfile update
   */
  export type MenteeProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a MenteeProfile.
     */
    data: XOR<MenteeProfileUpdateInput, MenteeProfileUncheckedUpdateInput>
    /**
     * Choose, which MenteeProfile to update.
     */
    where: MenteeProfileWhereUniqueInput
  }

  /**
   * MenteeProfile updateMany
   */
  export type MenteeProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenteeProfiles.
     */
    data: XOR<MenteeProfileUpdateManyMutationInput, MenteeProfileUncheckedUpdateManyInput>
    /**
     * Filter which MenteeProfiles to update
     */
    where?: MenteeProfileWhereInput
  }

  /**
   * MenteeProfile upsert
   */
  export type MenteeProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the MenteeProfile to update in case it exists.
     */
    where: MenteeProfileWhereUniqueInput
    /**
     * In case the MenteeProfile found by the `where` argument doesn't exist, create a new MenteeProfile with this data.
     */
    create: XOR<MenteeProfileCreateInput, MenteeProfileUncheckedCreateInput>
    /**
     * In case the MenteeProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenteeProfileUpdateInput, MenteeProfileUncheckedUpdateInput>
  }

  /**
   * MenteeProfile delete
   */
  export type MenteeProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
    /**
     * Filter which MenteeProfile to delete.
     */
    where: MenteeProfileWhereUniqueInput
  }

  /**
   * MenteeProfile deleteMany
   */
  export type MenteeProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenteeProfiles to delete
     */
    where?: MenteeProfileWhereInput
  }

  /**
   * MenteeProfile.resumes
   */
  export type MenteeProfile$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * MenteeProfile.sopDocuments
   */
  export type MenteeProfile$sopDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    where?: SOPDocumentWhereInput
    orderBy?: SOPDocumentOrderByWithRelationInput | SOPDocumentOrderByWithRelationInput[]
    cursor?: SOPDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SOPDocumentScalarFieldEnum | SOPDocumentScalarFieldEnum[]
  }

  /**
   * MenteeProfile without action
   */
  export type MenteeProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeProfile
     */
    select?: MenteeProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeProfileInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    menteeId: string | null
    name: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    menteeId: string | null
    name: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    menteeId: number
    name: number
    fileUrl: number
    createdAt: number
    _all: number
  }


  export type ResumeMinAggregateInputType = {
    id?: true
    menteeId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    menteeId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    menteeId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    menteeId: string
    name: string
    fileUrl: string
    createdAt: Date
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    menteeId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
  }

  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      mentee: Prisma.$MenteeProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menteeId: string
      name: string
      fileUrl: string
      createdAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentee<T extends MenteeProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenteeProfileDefaultArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */ 
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly menteeId: FieldRef<"Resume", 'String'>
    readonly name: FieldRef<"Resume", 'String'>
    readonly fileUrl: FieldRef<"Resume", 'String'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model SOPDocument
   */

  export type AggregateSOPDocument = {
    _count: SOPDocumentCountAggregateOutputType | null
    _min: SOPDocumentMinAggregateOutputType | null
    _max: SOPDocumentMaxAggregateOutputType | null
  }

  export type SOPDocumentMinAggregateOutputType = {
    id: string | null
    menteeId: string | null
    collegeName: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type SOPDocumentMaxAggregateOutputType = {
    id: string | null
    menteeId: string | null
    collegeName: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type SOPDocumentCountAggregateOutputType = {
    id: number
    menteeId: number
    collegeName: number
    fileUrl: number
    createdAt: number
    _all: number
  }


  export type SOPDocumentMinAggregateInputType = {
    id?: true
    menteeId?: true
    collegeName?: true
    fileUrl?: true
    createdAt?: true
  }

  export type SOPDocumentMaxAggregateInputType = {
    id?: true
    menteeId?: true
    collegeName?: true
    fileUrl?: true
    createdAt?: true
  }

  export type SOPDocumentCountAggregateInputType = {
    id?: true
    menteeId?: true
    collegeName?: true
    fileUrl?: true
    createdAt?: true
    _all?: true
  }

  export type SOPDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SOPDocument to aggregate.
     */
    where?: SOPDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOPDocuments to fetch.
     */
    orderBy?: SOPDocumentOrderByWithRelationInput | SOPDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SOPDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOPDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOPDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SOPDocuments
    **/
    _count?: true | SOPDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SOPDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SOPDocumentMaxAggregateInputType
  }

  export type GetSOPDocumentAggregateType<T extends SOPDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateSOPDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSOPDocument[P]>
      : GetScalarType<T[P], AggregateSOPDocument[P]>
  }




  export type SOPDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SOPDocumentWhereInput
    orderBy?: SOPDocumentOrderByWithAggregationInput | SOPDocumentOrderByWithAggregationInput[]
    by: SOPDocumentScalarFieldEnum[] | SOPDocumentScalarFieldEnum
    having?: SOPDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SOPDocumentCountAggregateInputType | true
    _min?: SOPDocumentMinAggregateInputType
    _max?: SOPDocumentMaxAggregateInputType
  }

  export type SOPDocumentGroupByOutputType = {
    id: string
    menteeId: string
    collegeName: string
    fileUrl: string
    createdAt: Date
    _count: SOPDocumentCountAggregateOutputType | null
    _min: SOPDocumentMinAggregateOutputType | null
    _max: SOPDocumentMaxAggregateOutputType | null
  }

  type GetSOPDocumentGroupByPayload<T extends SOPDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SOPDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SOPDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SOPDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], SOPDocumentGroupByOutputType[P]>
        }
      >
    >


  export type SOPDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    collegeName?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sOPDocument"]>

  export type SOPDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    collegeName?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sOPDocument"]>

  export type SOPDocumentSelectScalar = {
    id?: boolean
    menteeId?: boolean
    collegeName?: boolean
    fileUrl?: boolean
    createdAt?: boolean
  }

  export type SOPDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }
  export type SOPDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }

  export type $SOPDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SOPDocument"
    objects: {
      mentee: Prisma.$MenteeProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menteeId: string
      collegeName: string
      fileUrl: string
      createdAt: Date
    }, ExtArgs["result"]["sOPDocument"]>
    composites: {}
  }

  type SOPDocumentGetPayload<S extends boolean | null | undefined | SOPDocumentDefaultArgs> = $Result.GetResult<Prisma.$SOPDocumentPayload, S>

  type SOPDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SOPDocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SOPDocumentCountAggregateInputType | true
    }

  export interface SOPDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SOPDocument'], meta: { name: 'SOPDocument' } }
    /**
     * Find zero or one SOPDocument that matches the filter.
     * @param {SOPDocumentFindUniqueArgs} args - Arguments to find a SOPDocument
     * @example
     * // Get one SOPDocument
     * const sOPDocument = await prisma.sOPDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SOPDocumentFindUniqueArgs>(args: SelectSubset<T, SOPDocumentFindUniqueArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SOPDocument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SOPDocumentFindUniqueOrThrowArgs} args - Arguments to find a SOPDocument
     * @example
     * // Get one SOPDocument
     * const sOPDocument = await prisma.sOPDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SOPDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, SOPDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SOPDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentFindFirstArgs} args - Arguments to find a SOPDocument
     * @example
     * // Get one SOPDocument
     * const sOPDocument = await prisma.sOPDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SOPDocumentFindFirstArgs>(args?: SelectSubset<T, SOPDocumentFindFirstArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SOPDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentFindFirstOrThrowArgs} args - Arguments to find a SOPDocument
     * @example
     * // Get one SOPDocument
     * const sOPDocument = await prisma.sOPDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SOPDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, SOPDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SOPDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SOPDocuments
     * const sOPDocuments = await prisma.sOPDocument.findMany()
     * 
     * // Get first 10 SOPDocuments
     * const sOPDocuments = await prisma.sOPDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sOPDocumentWithIdOnly = await prisma.sOPDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SOPDocumentFindManyArgs>(args?: SelectSubset<T, SOPDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SOPDocument.
     * @param {SOPDocumentCreateArgs} args - Arguments to create a SOPDocument.
     * @example
     * // Create one SOPDocument
     * const SOPDocument = await prisma.sOPDocument.create({
     *   data: {
     *     // ... data to create a SOPDocument
     *   }
     * })
     * 
     */
    create<T extends SOPDocumentCreateArgs>(args: SelectSubset<T, SOPDocumentCreateArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SOPDocuments.
     * @param {SOPDocumentCreateManyArgs} args - Arguments to create many SOPDocuments.
     * @example
     * // Create many SOPDocuments
     * const sOPDocument = await prisma.sOPDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SOPDocumentCreateManyArgs>(args?: SelectSubset<T, SOPDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SOPDocuments and returns the data saved in the database.
     * @param {SOPDocumentCreateManyAndReturnArgs} args - Arguments to create many SOPDocuments.
     * @example
     * // Create many SOPDocuments
     * const sOPDocument = await prisma.sOPDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SOPDocuments and only return the `id`
     * const sOPDocumentWithIdOnly = await prisma.sOPDocument.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SOPDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, SOPDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SOPDocument.
     * @param {SOPDocumentDeleteArgs} args - Arguments to delete one SOPDocument.
     * @example
     * // Delete one SOPDocument
     * const SOPDocument = await prisma.sOPDocument.delete({
     *   where: {
     *     // ... filter to delete one SOPDocument
     *   }
     * })
     * 
     */
    delete<T extends SOPDocumentDeleteArgs>(args: SelectSubset<T, SOPDocumentDeleteArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SOPDocument.
     * @param {SOPDocumentUpdateArgs} args - Arguments to update one SOPDocument.
     * @example
     * // Update one SOPDocument
     * const sOPDocument = await prisma.sOPDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SOPDocumentUpdateArgs>(args: SelectSubset<T, SOPDocumentUpdateArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SOPDocuments.
     * @param {SOPDocumentDeleteManyArgs} args - Arguments to filter SOPDocuments to delete.
     * @example
     * // Delete a few SOPDocuments
     * const { count } = await prisma.sOPDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SOPDocumentDeleteManyArgs>(args?: SelectSubset<T, SOPDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SOPDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SOPDocuments
     * const sOPDocument = await prisma.sOPDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SOPDocumentUpdateManyArgs>(args: SelectSubset<T, SOPDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SOPDocument.
     * @param {SOPDocumentUpsertArgs} args - Arguments to update or create a SOPDocument.
     * @example
     * // Update or create a SOPDocument
     * const sOPDocument = await prisma.sOPDocument.upsert({
     *   create: {
     *     // ... data to create a SOPDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SOPDocument we want to update
     *   }
     * })
     */
    upsert<T extends SOPDocumentUpsertArgs>(args: SelectSubset<T, SOPDocumentUpsertArgs<ExtArgs>>): Prisma__SOPDocumentClient<$Result.GetResult<Prisma.$SOPDocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SOPDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentCountArgs} args - Arguments to filter SOPDocuments to count.
     * @example
     * // Count the number of SOPDocuments
     * const count = await prisma.sOPDocument.count({
     *   where: {
     *     // ... the filter for the SOPDocuments we want to count
     *   }
     * })
    **/
    count<T extends SOPDocumentCountArgs>(
      args?: Subset<T, SOPDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SOPDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SOPDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SOPDocumentAggregateArgs>(args: Subset<T, SOPDocumentAggregateArgs>): Prisma.PrismaPromise<GetSOPDocumentAggregateType<T>>

    /**
     * Group by SOPDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SOPDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SOPDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SOPDocumentGroupByArgs['orderBy'] }
        : { orderBy?: SOPDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SOPDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSOPDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SOPDocument model
   */
  readonly fields: SOPDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SOPDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SOPDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentee<T extends MenteeProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenteeProfileDefaultArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SOPDocument model
   */ 
  interface SOPDocumentFieldRefs {
    readonly id: FieldRef<"SOPDocument", 'String'>
    readonly menteeId: FieldRef<"SOPDocument", 'String'>
    readonly collegeName: FieldRef<"SOPDocument", 'String'>
    readonly fileUrl: FieldRef<"SOPDocument", 'String'>
    readonly createdAt: FieldRef<"SOPDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SOPDocument findUnique
   */
  export type SOPDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SOPDocument to fetch.
     */
    where: SOPDocumentWhereUniqueInput
  }

  /**
   * SOPDocument findUniqueOrThrow
   */
  export type SOPDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SOPDocument to fetch.
     */
    where: SOPDocumentWhereUniqueInput
  }

  /**
   * SOPDocument findFirst
   */
  export type SOPDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SOPDocument to fetch.
     */
    where?: SOPDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOPDocuments to fetch.
     */
    orderBy?: SOPDocumentOrderByWithRelationInput | SOPDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SOPDocuments.
     */
    cursor?: SOPDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOPDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOPDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SOPDocuments.
     */
    distinct?: SOPDocumentScalarFieldEnum | SOPDocumentScalarFieldEnum[]
  }

  /**
   * SOPDocument findFirstOrThrow
   */
  export type SOPDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SOPDocument to fetch.
     */
    where?: SOPDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOPDocuments to fetch.
     */
    orderBy?: SOPDocumentOrderByWithRelationInput | SOPDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SOPDocuments.
     */
    cursor?: SOPDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOPDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOPDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SOPDocuments.
     */
    distinct?: SOPDocumentScalarFieldEnum | SOPDocumentScalarFieldEnum[]
  }

  /**
   * SOPDocument findMany
   */
  export type SOPDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * Filter, which SOPDocuments to fetch.
     */
    where?: SOPDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SOPDocuments to fetch.
     */
    orderBy?: SOPDocumentOrderByWithRelationInput | SOPDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SOPDocuments.
     */
    cursor?: SOPDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SOPDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SOPDocuments.
     */
    skip?: number
    distinct?: SOPDocumentScalarFieldEnum | SOPDocumentScalarFieldEnum[]
  }

  /**
   * SOPDocument create
   */
  export type SOPDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a SOPDocument.
     */
    data: XOR<SOPDocumentCreateInput, SOPDocumentUncheckedCreateInput>
  }

  /**
   * SOPDocument createMany
   */
  export type SOPDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SOPDocuments.
     */
    data: SOPDocumentCreateManyInput | SOPDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SOPDocument createManyAndReturn
   */
  export type SOPDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SOPDocuments.
     */
    data: SOPDocumentCreateManyInput | SOPDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SOPDocument update
   */
  export type SOPDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a SOPDocument.
     */
    data: XOR<SOPDocumentUpdateInput, SOPDocumentUncheckedUpdateInput>
    /**
     * Choose, which SOPDocument to update.
     */
    where: SOPDocumentWhereUniqueInput
  }

  /**
   * SOPDocument updateMany
   */
  export type SOPDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SOPDocuments.
     */
    data: XOR<SOPDocumentUpdateManyMutationInput, SOPDocumentUncheckedUpdateManyInput>
    /**
     * Filter which SOPDocuments to update
     */
    where?: SOPDocumentWhereInput
  }

  /**
   * SOPDocument upsert
   */
  export type SOPDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the SOPDocument to update in case it exists.
     */
    where: SOPDocumentWhereUniqueInput
    /**
     * In case the SOPDocument found by the `where` argument doesn't exist, create a new SOPDocument with this data.
     */
    create: XOR<SOPDocumentCreateInput, SOPDocumentUncheckedCreateInput>
    /**
     * In case the SOPDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SOPDocumentUpdateInput, SOPDocumentUncheckedUpdateInput>
  }

  /**
   * SOPDocument delete
   */
  export type SOPDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
    /**
     * Filter which SOPDocument to delete.
     */
    where: SOPDocumentWhereUniqueInput
  }

  /**
   * SOPDocument deleteMany
   */
  export type SOPDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SOPDocuments to delete
     */
    where?: SOPDocumentWhereInput
  }

  /**
   * SOPDocument without action
   */
  export type SOPDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SOPDocument
     */
    select?: SOPDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SOPDocumentInclude<ExtArgs> | null
  }


  /**
   * Model Slot
   */

  export type AggregateSlot = {
    _count: SlotCountAggregateOutputType | null
    _min: SlotMinAggregateOutputType | null
    _max: SlotMaxAggregateOutputType | null
  }

  export type SlotMinAggregateOutputType = {
    id: string | null
    mentorId: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.SlotStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SlotMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.SlotStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SlotCountAggregateOutputType = {
    id: number
    mentorId: number
    startTime: number
    endTime: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SlotMinAggregateInputType = {
    id?: true
    mentorId?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SlotMaxAggregateInputType = {
    id?: true
    mentorId?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SlotCountAggregateInputType = {
    id?: true
    mentorId?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slot to aggregate.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Slots
    **/
    _count?: true | SlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SlotMaxAggregateInputType
  }

  export type GetSlotAggregateType<T extends SlotAggregateArgs> = {
        [P in keyof T & keyof AggregateSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlot[P]>
      : GetScalarType<T[P], AggregateSlot[P]>
  }




  export type SlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SlotWhereInput
    orderBy?: SlotOrderByWithAggregationInput | SlotOrderByWithAggregationInput[]
    by: SlotScalarFieldEnum[] | SlotScalarFieldEnum
    having?: SlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SlotCountAggregateInputType | true
    _min?: SlotMinAggregateInputType
    _max?: SlotMaxAggregateInputType
  }

  export type SlotGroupByOutputType = {
    id: string
    mentorId: string
    startTime: Date
    endTime: Date
    status: $Enums.SlotStatus
    createdAt: Date
    updatedAt: Date
    _count: SlotCountAggregateOutputType | null
    _min: SlotMinAggregateOutputType | null
    _max: SlotMaxAggregateOutputType | null
  }

  type GetSlotGroupByPayload<T extends SlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SlotGroupByOutputType[P]>
            : GetScalarType<T[P], SlotGroupByOutputType[P]>
        }
      >
    >


  export type SlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
    booking?: boolean | Slot$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slot"]>

  export type SlotSelectScalar = {
    id?: boolean
    mentorId?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
    booking?: boolean | Slot$bookingArgs<ExtArgs>
  }
  export type SlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $SlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Slot"
    objects: {
      mentor: Prisma.$MentorProfilePayload<ExtArgs>
      booking: Prisma.$BookingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorId: string
      startTime: Date
      endTime: Date
      status: $Enums.SlotStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["slot"]>
    composites: {}
  }

  type SlotGetPayload<S extends boolean | null | undefined | SlotDefaultArgs> = $Result.GetResult<Prisma.$SlotPayload, S>

  type SlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SlotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SlotCountAggregateInputType | true
    }

  export interface SlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Slot'], meta: { name: 'Slot' } }
    /**
     * Find zero or one Slot that matches the filter.
     * @param {SlotFindUniqueArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SlotFindUniqueArgs>(args: SelectSubset<T, SlotFindUniqueArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Slot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SlotFindUniqueOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SlotFindUniqueOrThrowArgs>(args: SelectSubset<T, SlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Slot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SlotFindFirstArgs>(args?: SelectSubset<T, SlotFindFirstArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Slot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SlotFindFirstOrThrowArgs>(args?: SelectSubset<T, SlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slots
     * const slots = await prisma.slot.findMany()
     * 
     * // Get first 10 Slots
     * const slots = await prisma.slot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slotWithIdOnly = await prisma.slot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SlotFindManyArgs>(args?: SelectSubset<T, SlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Slot.
     * @param {SlotCreateArgs} args - Arguments to create a Slot.
     * @example
     * // Create one Slot
     * const Slot = await prisma.slot.create({
     *   data: {
     *     // ... data to create a Slot
     *   }
     * })
     * 
     */
    create<T extends SlotCreateArgs>(args: SelectSubset<T, SlotCreateArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Slots.
     * @param {SlotCreateManyArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SlotCreateManyArgs>(args?: SelectSubset<T, SlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slots and returns the data saved in the database.
     * @param {SlotCreateManyAndReturnArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slots and only return the `id`
     * const slotWithIdOnly = await prisma.slot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SlotCreateManyAndReturnArgs>(args?: SelectSubset<T, SlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Slot.
     * @param {SlotDeleteArgs} args - Arguments to delete one Slot.
     * @example
     * // Delete one Slot
     * const Slot = await prisma.slot.delete({
     *   where: {
     *     // ... filter to delete one Slot
     *   }
     * })
     * 
     */
    delete<T extends SlotDeleteArgs>(args: SelectSubset<T, SlotDeleteArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Slot.
     * @param {SlotUpdateArgs} args - Arguments to update one Slot.
     * @example
     * // Update one Slot
     * const slot = await prisma.slot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SlotUpdateArgs>(args: SelectSubset<T, SlotUpdateArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Slots.
     * @param {SlotDeleteManyArgs} args - Arguments to filter Slots to delete.
     * @example
     * // Delete a few Slots
     * const { count } = await prisma.slot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SlotDeleteManyArgs>(args?: SelectSubset<T, SlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slots
     * const slot = await prisma.slot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SlotUpdateManyArgs>(args: SelectSubset<T, SlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Slot.
     * @param {SlotUpsertArgs} args - Arguments to update or create a Slot.
     * @example
     * // Update or create a Slot
     * const slot = await prisma.slot.upsert({
     *   create: {
     *     // ... data to create a Slot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slot we want to update
     *   }
     * })
     */
    upsert<T extends SlotUpsertArgs>(args: SelectSubset<T, SlotUpsertArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotCountArgs} args - Arguments to filter Slots to count.
     * @example
     * // Count the number of Slots
     * const count = await prisma.slot.count({
     *   where: {
     *     // ... the filter for the Slots we want to count
     *   }
     * })
    **/
    count<T extends SlotCountArgs>(
      args?: Subset<T, SlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SlotAggregateArgs>(args: Subset<T, SlotAggregateArgs>): Prisma.PrismaPromise<GetSlotAggregateType<T>>

    /**
     * Group by Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SlotGroupByArgs['orderBy'] }
        : { orderBy?: SlotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Slot model
   */
  readonly fields: SlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Slot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentor<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    booking<T extends Slot$bookingArgs<ExtArgs> = {}>(args?: Subset<T, Slot$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Slot model
   */ 
  interface SlotFieldRefs {
    readonly id: FieldRef<"Slot", 'String'>
    readonly mentorId: FieldRef<"Slot", 'String'>
    readonly startTime: FieldRef<"Slot", 'DateTime'>
    readonly endTime: FieldRef<"Slot", 'DateTime'>
    readonly status: FieldRef<"Slot", 'SlotStatus'>
    readonly createdAt: FieldRef<"Slot", 'DateTime'>
    readonly updatedAt: FieldRef<"Slot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Slot findUnique
   */
  export type SlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot findUniqueOrThrow
   */
  export type SlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot findFirst
   */
  export type SlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slots.
     */
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot findFirstOrThrow
   */
  export type SlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slot to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slots.
     */
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot findMany
   */
  export type SlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter, which Slots to fetch.
     */
    where?: SlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slots to fetch.
     */
    orderBy?: SlotOrderByWithRelationInput | SlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Slots.
     */
    cursor?: SlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slots.
     */
    skip?: number
    distinct?: SlotScalarFieldEnum | SlotScalarFieldEnum[]
  }

  /**
   * Slot create
   */
  export type SlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * The data needed to create a Slot.
     */
    data: XOR<SlotCreateInput, SlotUncheckedCreateInput>
  }

  /**
   * Slot createMany
   */
  export type SlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Slots.
     */
    data: SlotCreateManyInput | SlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Slot createManyAndReturn
   */
  export type SlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Slots.
     */
    data: SlotCreateManyInput | SlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Slot update
   */
  export type SlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * The data needed to update a Slot.
     */
    data: XOR<SlotUpdateInput, SlotUncheckedUpdateInput>
    /**
     * Choose, which Slot to update.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot updateMany
   */
  export type SlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Slots.
     */
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyInput>
    /**
     * Filter which Slots to update
     */
    where?: SlotWhereInput
  }

  /**
   * Slot upsert
   */
  export type SlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * The filter to search for the Slot to update in case it exists.
     */
    where: SlotWhereUniqueInput
    /**
     * In case the Slot found by the `where` argument doesn't exist, create a new Slot with this data.
     */
    create: XOR<SlotCreateInput, SlotUncheckedCreateInput>
    /**
     * In case the Slot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SlotUpdateInput, SlotUncheckedUpdateInput>
  }

  /**
   * Slot delete
   */
  export type SlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
    /**
     * Filter which Slot to delete.
     */
    where: SlotWhereUniqueInput
  }

  /**
   * Slot deleteMany
   */
  export type SlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slots to delete
     */
    where?: SlotWhereInput
  }

  /**
   * Slot.booking
   */
  export type Slot$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * Slot without action
   */
  export type SlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: SlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SlotInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    mentorId: string | null
    menteeId: string | null
    slotId: string | null
    status: $Enums.BookingStatus | null
    sessionMode: $Enums.SessionMode | null
    sessionType: $Enums.SessionType | null
    purpose: string | null
    meetingLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    menteeId: string | null
    slotId: string | null
    status: $Enums.BookingStatus | null
    sessionMode: $Enums.SessionMode | null
    sessionType: $Enums.SessionType | null
    purpose: string | null
    meetingLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    mentorId: number
    menteeId: number
    slotId: number
    status: number
    sessionMode: number
    sessionType: number
    purpose: number
    meetingLink: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingMinAggregateInputType = {
    id?: true
    mentorId?: true
    menteeId?: true
    slotId?: true
    status?: true
    sessionMode?: true
    sessionType?: true
    purpose?: true
    meetingLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    mentorId?: true
    menteeId?: true
    slotId?: true
    status?: true
    sessionMode?: true
    sessionType?: true
    purpose?: true
    meetingLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    mentorId?: true
    menteeId?: true
    slotId?: true
    status?: true
    sessionMode?: true
    sessionType?: true
    purpose?: true
    meetingLink?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    mentorId: string
    menteeId: string
    slotId: string
    status: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType: $Enums.SessionType
    purpose: string
    meetingLink: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    menteeId?: boolean
    slotId?: boolean
    status?: boolean
    sessionMode?: boolean
    sessionType?: boolean
    purpose?: boolean
    meetingLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentor?: boolean | UserDefaultArgs<ExtArgs>
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    slot?: boolean | SlotDefaultArgs<ExtArgs>
    payment?: boolean | Booking$paymentArgs<ExtArgs>
    feedback?: boolean | Booking$feedbackArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    menteeId?: boolean
    slotId?: boolean
    status?: boolean
    sessionMode?: boolean
    sessionType?: boolean
    purpose?: boolean
    meetingLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentor?: boolean | UserDefaultArgs<ExtArgs>
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    slot?: boolean | SlotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    mentorId?: boolean
    menteeId?: boolean
    slotId?: boolean
    status?: boolean
    sessionMode?: boolean
    sessionType?: boolean
    purpose?: boolean
    meetingLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | UserDefaultArgs<ExtArgs>
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    slot?: boolean | SlotDefaultArgs<ExtArgs>
    payment?: boolean | Booking$paymentArgs<ExtArgs>
    feedback?: boolean | Booking$feedbackArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | UserDefaultArgs<ExtArgs>
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    slot?: boolean | SlotDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      mentor: Prisma.$UserPayload<ExtArgs>
      mentee: Prisma.$UserPayload<ExtArgs>
      slot: Prisma.$SlotPayload<ExtArgs>
      payment: Prisma.$PaymentPayload<ExtArgs> | null
      feedback: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorId: string
      menteeId: string
      slotId: string
      status: $Enums.BookingStatus
      sessionMode: $Enums.SessionMode
      sessionType: $Enums.SessionType
      purpose: string
      meetingLink: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    mentee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    slot<T extends SlotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SlotDefaultArgs<ExtArgs>>): Prisma__SlotClient<$Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    payment<T extends Booking$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    feedback<T extends Booking$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, Booking$feedbackArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */ 
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly mentorId: FieldRef<"Booking", 'String'>
    readonly menteeId: FieldRef<"Booking", 'String'>
    readonly slotId: FieldRef<"Booking", 'String'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly sessionMode: FieldRef<"Booking", 'SessionMode'>
    readonly sessionType: FieldRef<"Booking", 'SessionType'>
    readonly purpose: FieldRef<"Booking", 'String'>
    readonly meetingLink: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
  }

  /**
   * Booking.payment
   */
  export type Booking$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Booking.feedback
   */
  export type Booking$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    bookingId: number
    razorpayOrderId: number
    razorpayPaymentId: number
    amount: number
    currency: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    bookingId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    amount?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    bookingId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    amount?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    bookingId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    amount?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    bookingId: string
    razorpayOrderId: string
    razorpayPaymentId: string | null
    amount: number
    currency: string
    status: $Enums.PaymentStatus
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    bookingId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      razorpayOrderId: string
      razorpayPaymentId: string | null
      amount: number
      currency: string
      status: $Enums.PaymentStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly bookingId: FieldRef<"Payment", 'String'>
    readonly razorpayOrderId: FieldRef<"Payment", 'String'>
    readonly razorpayPaymentId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    bookingId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    bookingId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    bookingId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    bookingId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    bookingId: string
    rating: number
    comment: string | null
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    bookingId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      rating: number
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly bookingId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model MentorFeedback
   */

  export type AggregateMentorFeedback = {
    _count: MentorFeedbackCountAggregateOutputType | null
    _min: MentorFeedbackMinAggregateOutputType | null
    _max: MentorFeedbackMaxAggregateOutputType | null
  }

  export type MentorFeedbackMinAggregateOutputType = {
    id: string | null
    mentorId: string | null
    bookingId: string | null
    feedbackPdfUrl: string | null
    createdAt: Date | null
  }

  export type MentorFeedbackMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    bookingId: string | null
    feedbackPdfUrl: string | null
    createdAt: Date | null
  }

  export type MentorFeedbackCountAggregateOutputType = {
    id: number
    mentorId: number
    bookingId: number
    feedbackPdfUrl: number
    createdAt: number
    _all: number
  }


  export type MentorFeedbackMinAggregateInputType = {
    id?: true
    mentorId?: true
    bookingId?: true
    feedbackPdfUrl?: true
    createdAt?: true
  }

  export type MentorFeedbackMaxAggregateInputType = {
    id?: true
    mentorId?: true
    bookingId?: true
    feedbackPdfUrl?: true
    createdAt?: true
  }

  export type MentorFeedbackCountAggregateInputType = {
    id?: true
    mentorId?: true
    bookingId?: true
    feedbackPdfUrl?: true
    createdAt?: true
    _all?: true
  }

  export type MentorFeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorFeedback to aggregate.
     */
    where?: MentorFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorFeedbacks to fetch.
     */
    orderBy?: MentorFeedbackOrderByWithRelationInput | MentorFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorFeedbacks
    **/
    _count?: true | MentorFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorFeedbackMaxAggregateInputType
  }

  export type GetMentorFeedbackAggregateType<T extends MentorFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorFeedback[P]>
      : GetScalarType<T[P], AggregateMentorFeedback[P]>
  }




  export type MentorFeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorFeedbackWhereInput
    orderBy?: MentorFeedbackOrderByWithAggregationInput | MentorFeedbackOrderByWithAggregationInput[]
    by: MentorFeedbackScalarFieldEnum[] | MentorFeedbackScalarFieldEnum
    having?: MentorFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorFeedbackCountAggregateInputType | true
    _min?: MentorFeedbackMinAggregateInputType
    _max?: MentorFeedbackMaxAggregateInputType
  }

  export type MentorFeedbackGroupByOutputType = {
    id: string
    mentorId: string
    bookingId: string
    feedbackPdfUrl: string | null
    createdAt: Date
    _count: MentorFeedbackCountAggregateOutputType | null
    _min: MentorFeedbackMinAggregateOutputType | null
    _max: MentorFeedbackMaxAggregateOutputType | null
  }

  type GetMentorFeedbackGroupByPayload<T extends MentorFeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], MentorFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type MentorFeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    bookingId?: boolean
    feedbackPdfUrl?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorFeedback"]>

  export type MentorFeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    bookingId?: boolean
    feedbackPdfUrl?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorFeedback"]>

  export type MentorFeedbackSelectScalar = {
    id?: boolean
    mentorId?: boolean
    bookingId?: boolean
    feedbackPdfUrl?: boolean
    createdAt?: boolean
  }

  export type MentorFeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }
  export type MentorFeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $MentorFeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorFeedback"
    objects: {
      mentor: Prisma.$MentorProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorId: string
      bookingId: string
      feedbackPdfUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["mentorFeedback"]>
    composites: {}
  }

  type MentorFeedbackGetPayload<S extends boolean | null | undefined | MentorFeedbackDefaultArgs> = $Result.GetResult<Prisma.$MentorFeedbackPayload, S>

  type MentorFeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorFeedbackFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorFeedbackCountAggregateInputType | true
    }

  export interface MentorFeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorFeedback'], meta: { name: 'MentorFeedback' } }
    /**
     * Find zero or one MentorFeedback that matches the filter.
     * @param {MentorFeedbackFindUniqueArgs} args - Arguments to find a MentorFeedback
     * @example
     * // Get one MentorFeedback
     * const mentorFeedback = await prisma.mentorFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorFeedbackFindUniqueArgs>(args: SelectSubset<T, MentorFeedbackFindUniqueArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorFeedback that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorFeedbackFindUniqueOrThrowArgs} args - Arguments to find a MentorFeedback
     * @example
     * // Get one MentorFeedback
     * const mentorFeedback = await prisma.mentorFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorFeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorFeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackFindFirstArgs} args - Arguments to find a MentorFeedback
     * @example
     * // Get one MentorFeedback
     * const mentorFeedback = await prisma.mentorFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorFeedbackFindFirstArgs>(args?: SelectSubset<T, MentorFeedbackFindFirstArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorFeedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackFindFirstOrThrowArgs} args - Arguments to find a MentorFeedback
     * @example
     * // Get one MentorFeedback
     * const mentorFeedback = await prisma.mentorFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorFeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorFeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorFeedbacks
     * const mentorFeedbacks = await prisma.mentorFeedback.findMany()
     * 
     * // Get first 10 MentorFeedbacks
     * const mentorFeedbacks = await prisma.mentorFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorFeedbackWithIdOnly = await prisma.mentorFeedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorFeedbackFindManyArgs>(args?: SelectSubset<T, MentorFeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorFeedback.
     * @param {MentorFeedbackCreateArgs} args - Arguments to create a MentorFeedback.
     * @example
     * // Create one MentorFeedback
     * const MentorFeedback = await prisma.mentorFeedback.create({
     *   data: {
     *     // ... data to create a MentorFeedback
     *   }
     * })
     * 
     */
    create<T extends MentorFeedbackCreateArgs>(args: SelectSubset<T, MentorFeedbackCreateArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorFeedbacks.
     * @param {MentorFeedbackCreateManyArgs} args - Arguments to create many MentorFeedbacks.
     * @example
     * // Create many MentorFeedbacks
     * const mentorFeedback = await prisma.mentorFeedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorFeedbackCreateManyArgs>(args?: SelectSubset<T, MentorFeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorFeedbacks and returns the data saved in the database.
     * @param {MentorFeedbackCreateManyAndReturnArgs} args - Arguments to create many MentorFeedbacks.
     * @example
     * // Create many MentorFeedbacks
     * const mentorFeedback = await prisma.mentorFeedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorFeedbacks and only return the `id`
     * const mentorFeedbackWithIdOnly = await prisma.mentorFeedback.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorFeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorFeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorFeedback.
     * @param {MentorFeedbackDeleteArgs} args - Arguments to delete one MentorFeedback.
     * @example
     * // Delete one MentorFeedback
     * const MentorFeedback = await prisma.mentorFeedback.delete({
     *   where: {
     *     // ... filter to delete one MentorFeedback
     *   }
     * })
     * 
     */
    delete<T extends MentorFeedbackDeleteArgs>(args: SelectSubset<T, MentorFeedbackDeleteArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorFeedback.
     * @param {MentorFeedbackUpdateArgs} args - Arguments to update one MentorFeedback.
     * @example
     * // Update one MentorFeedback
     * const mentorFeedback = await prisma.mentorFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorFeedbackUpdateArgs>(args: SelectSubset<T, MentorFeedbackUpdateArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorFeedbacks.
     * @param {MentorFeedbackDeleteManyArgs} args - Arguments to filter MentorFeedbacks to delete.
     * @example
     * // Delete a few MentorFeedbacks
     * const { count } = await prisma.mentorFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorFeedbackDeleteManyArgs>(args?: SelectSubset<T, MentorFeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorFeedbacks
     * const mentorFeedback = await prisma.mentorFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorFeedbackUpdateManyArgs>(args: SelectSubset<T, MentorFeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorFeedback.
     * @param {MentorFeedbackUpsertArgs} args - Arguments to update or create a MentorFeedback.
     * @example
     * // Update or create a MentorFeedback
     * const mentorFeedback = await prisma.mentorFeedback.upsert({
     *   create: {
     *     // ... data to create a MentorFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorFeedback we want to update
     *   }
     * })
     */
    upsert<T extends MentorFeedbackUpsertArgs>(args: SelectSubset<T, MentorFeedbackUpsertArgs<ExtArgs>>): Prisma__MentorFeedbackClient<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackCountArgs} args - Arguments to filter MentorFeedbacks to count.
     * @example
     * // Count the number of MentorFeedbacks
     * const count = await prisma.mentorFeedback.count({
     *   where: {
     *     // ... the filter for the MentorFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends MentorFeedbackCountArgs>(
      args?: Subset<T, MentorFeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MentorFeedbackAggregateArgs>(args: Subset<T, MentorFeedbackAggregateArgs>): Prisma.PrismaPromise<GetMentorFeedbackAggregateType<T>>

    /**
     * Group by MentorFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MentorFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: MentorFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MentorFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorFeedback model
   */
  readonly fields: MentorFeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorFeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentor<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MentorFeedback model
   */ 
  interface MentorFeedbackFieldRefs {
    readonly id: FieldRef<"MentorFeedback", 'String'>
    readonly mentorId: FieldRef<"MentorFeedback", 'String'>
    readonly bookingId: FieldRef<"MentorFeedback", 'String'>
    readonly feedbackPdfUrl: FieldRef<"MentorFeedback", 'String'>
    readonly createdAt: FieldRef<"MentorFeedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorFeedback findUnique
   */
  export type MentorFeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which MentorFeedback to fetch.
     */
    where: MentorFeedbackWhereUniqueInput
  }

  /**
   * MentorFeedback findUniqueOrThrow
   */
  export type MentorFeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which MentorFeedback to fetch.
     */
    where: MentorFeedbackWhereUniqueInput
  }

  /**
   * MentorFeedback findFirst
   */
  export type MentorFeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which MentorFeedback to fetch.
     */
    where?: MentorFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorFeedbacks to fetch.
     */
    orderBy?: MentorFeedbackOrderByWithRelationInput | MentorFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorFeedbacks.
     */
    cursor?: MentorFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorFeedbacks.
     */
    distinct?: MentorFeedbackScalarFieldEnum | MentorFeedbackScalarFieldEnum[]
  }

  /**
   * MentorFeedback findFirstOrThrow
   */
  export type MentorFeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which MentorFeedback to fetch.
     */
    where?: MentorFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorFeedbacks to fetch.
     */
    orderBy?: MentorFeedbackOrderByWithRelationInput | MentorFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorFeedbacks.
     */
    cursor?: MentorFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorFeedbacks.
     */
    distinct?: MentorFeedbackScalarFieldEnum | MentorFeedbackScalarFieldEnum[]
  }

  /**
   * MentorFeedback findMany
   */
  export type MentorFeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which MentorFeedbacks to fetch.
     */
    where?: MentorFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorFeedbacks to fetch.
     */
    orderBy?: MentorFeedbackOrderByWithRelationInput | MentorFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorFeedbacks.
     */
    cursor?: MentorFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorFeedbacks.
     */
    skip?: number
    distinct?: MentorFeedbackScalarFieldEnum | MentorFeedbackScalarFieldEnum[]
  }

  /**
   * MentorFeedback create
   */
  export type MentorFeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a MentorFeedback.
     */
    data: XOR<MentorFeedbackCreateInput, MentorFeedbackUncheckedCreateInput>
  }

  /**
   * MentorFeedback createMany
   */
  export type MentorFeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorFeedbacks.
     */
    data: MentorFeedbackCreateManyInput | MentorFeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorFeedback createManyAndReturn
   */
  export type MentorFeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorFeedbacks.
     */
    data: MentorFeedbackCreateManyInput | MentorFeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MentorFeedback update
   */
  export type MentorFeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a MentorFeedback.
     */
    data: XOR<MentorFeedbackUpdateInput, MentorFeedbackUncheckedUpdateInput>
    /**
     * Choose, which MentorFeedback to update.
     */
    where: MentorFeedbackWhereUniqueInput
  }

  /**
   * MentorFeedback updateMany
   */
  export type MentorFeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorFeedbacks.
     */
    data: XOR<MentorFeedbackUpdateManyMutationInput, MentorFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which MentorFeedbacks to update
     */
    where?: MentorFeedbackWhereInput
  }

  /**
   * MentorFeedback upsert
   */
  export type MentorFeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the MentorFeedback to update in case it exists.
     */
    where: MentorFeedbackWhereUniqueInput
    /**
     * In case the MentorFeedback found by the `where` argument doesn't exist, create a new MentorFeedback with this data.
     */
    create: XOR<MentorFeedbackCreateInput, MentorFeedbackUncheckedCreateInput>
    /**
     * In case the MentorFeedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorFeedbackUpdateInput, MentorFeedbackUncheckedUpdateInput>
  }

  /**
   * MentorFeedback delete
   */
  export type MentorFeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
    /**
     * Filter which MentorFeedback to delete.
     */
    where: MentorFeedbackWhereUniqueInput
  }

  /**
   * MentorFeedback deleteMany
   */
  export type MentorFeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorFeedbacks to delete
     */
    where?: MentorFeedbackWhereInput
  }

  /**
   * MentorFeedback without action
   */
  export type MentorFeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorFeedback
     */
    select?: MentorFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorFeedbackInclude<ExtArgs> | null
  }


  /**
   * Model Earnings
   */

  export type AggregateEarnings = {
    _count: EarningsCountAggregateOutputType | null
    _avg: EarningsAvgAggregateOutputType | null
    _sum: EarningsSumAggregateOutputType | null
    _min: EarningsMinAggregateOutputType | null
    _max: EarningsMaxAggregateOutputType | null
  }

  export type EarningsAvgAggregateOutputType = {
    amount: number | null
  }

  export type EarningsSumAggregateOutputType = {
    amount: number | null
  }

  export type EarningsMinAggregateOutputType = {
    id: string | null
    mentorId: string | null
    bookingId: string | null
    amount: number | null
    createdAt: Date | null
  }

  export type EarningsMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    bookingId: string | null
    amount: number | null
    createdAt: Date | null
  }

  export type EarningsCountAggregateOutputType = {
    id: number
    mentorId: number
    bookingId: number
    amount: number
    createdAt: number
    _all: number
  }


  export type EarningsAvgAggregateInputType = {
    amount?: true
  }

  export type EarningsSumAggregateInputType = {
    amount?: true
  }

  export type EarningsMinAggregateInputType = {
    id?: true
    mentorId?: true
    bookingId?: true
    amount?: true
    createdAt?: true
  }

  export type EarningsMaxAggregateInputType = {
    id?: true
    mentorId?: true
    bookingId?: true
    amount?: true
    createdAt?: true
  }

  export type EarningsCountAggregateInputType = {
    id?: true
    mentorId?: true
    bookingId?: true
    amount?: true
    createdAt?: true
    _all?: true
  }

  export type EarningsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Earnings to aggregate.
     */
    where?: EarningsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Earnings to fetch.
     */
    orderBy?: EarningsOrderByWithRelationInput | EarningsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EarningsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Earnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Earnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Earnings
    **/
    _count?: true | EarningsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EarningsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EarningsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EarningsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EarningsMaxAggregateInputType
  }

  export type GetEarningsAggregateType<T extends EarningsAggregateArgs> = {
        [P in keyof T & keyof AggregateEarnings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEarnings[P]>
      : GetScalarType<T[P], AggregateEarnings[P]>
  }




  export type EarningsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EarningsWhereInput
    orderBy?: EarningsOrderByWithAggregationInput | EarningsOrderByWithAggregationInput[]
    by: EarningsScalarFieldEnum[] | EarningsScalarFieldEnum
    having?: EarningsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EarningsCountAggregateInputType | true
    _avg?: EarningsAvgAggregateInputType
    _sum?: EarningsSumAggregateInputType
    _min?: EarningsMinAggregateInputType
    _max?: EarningsMaxAggregateInputType
  }

  export type EarningsGroupByOutputType = {
    id: string
    mentorId: string
    bookingId: string
    amount: number
    createdAt: Date
    _count: EarningsCountAggregateOutputType | null
    _avg: EarningsAvgAggregateOutputType | null
    _sum: EarningsSumAggregateOutputType | null
    _min: EarningsMinAggregateOutputType | null
    _max: EarningsMaxAggregateOutputType | null
  }

  type GetEarningsGroupByPayload<T extends EarningsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EarningsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EarningsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EarningsGroupByOutputType[P]>
            : GetScalarType<T[P], EarningsGroupByOutputType[P]>
        }
      >
    >


  export type EarningsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    bookingId?: boolean
    amount?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["earnings"]>

  export type EarningsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    bookingId?: boolean
    amount?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["earnings"]>

  export type EarningsSelectScalar = {
    id?: boolean
    mentorId?: boolean
    bookingId?: boolean
    amount?: boolean
    createdAt?: boolean
  }

  export type EarningsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }
  export type EarningsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $EarningsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Earnings"
    objects: {
      mentor: Prisma.$MentorProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorId: string
      bookingId: string
      amount: number
      createdAt: Date
    }, ExtArgs["result"]["earnings"]>
    composites: {}
  }

  type EarningsGetPayload<S extends boolean | null | undefined | EarningsDefaultArgs> = $Result.GetResult<Prisma.$EarningsPayload, S>

  type EarningsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EarningsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EarningsCountAggregateInputType | true
    }

  export interface EarningsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Earnings'], meta: { name: 'Earnings' } }
    /**
     * Find zero or one Earnings that matches the filter.
     * @param {EarningsFindUniqueArgs} args - Arguments to find a Earnings
     * @example
     * // Get one Earnings
     * const earnings = await prisma.earnings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EarningsFindUniqueArgs>(args: SelectSubset<T, EarningsFindUniqueArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Earnings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EarningsFindUniqueOrThrowArgs} args - Arguments to find a Earnings
     * @example
     * // Get one Earnings
     * const earnings = await prisma.earnings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EarningsFindUniqueOrThrowArgs>(args: SelectSubset<T, EarningsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Earnings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsFindFirstArgs} args - Arguments to find a Earnings
     * @example
     * // Get one Earnings
     * const earnings = await prisma.earnings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EarningsFindFirstArgs>(args?: SelectSubset<T, EarningsFindFirstArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Earnings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsFindFirstOrThrowArgs} args - Arguments to find a Earnings
     * @example
     * // Get one Earnings
     * const earnings = await prisma.earnings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EarningsFindFirstOrThrowArgs>(args?: SelectSubset<T, EarningsFindFirstOrThrowArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Earnings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Earnings
     * const earnings = await prisma.earnings.findMany()
     * 
     * // Get first 10 Earnings
     * const earnings = await prisma.earnings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const earningsWithIdOnly = await prisma.earnings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EarningsFindManyArgs>(args?: SelectSubset<T, EarningsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Earnings.
     * @param {EarningsCreateArgs} args - Arguments to create a Earnings.
     * @example
     * // Create one Earnings
     * const Earnings = await prisma.earnings.create({
     *   data: {
     *     // ... data to create a Earnings
     *   }
     * })
     * 
     */
    create<T extends EarningsCreateArgs>(args: SelectSubset<T, EarningsCreateArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Earnings.
     * @param {EarningsCreateManyArgs} args - Arguments to create many Earnings.
     * @example
     * // Create many Earnings
     * const earnings = await prisma.earnings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EarningsCreateManyArgs>(args?: SelectSubset<T, EarningsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Earnings and returns the data saved in the database.
     * @param {EarningsCreateManyAndReturnArgs} args - Arguments to create many Earnings.
     * @example
     * // Create many Earnings
     * const earnings = await prisma.earnings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Earnings and only return the `id`
     * const earningsWithIdOnly = await prisma.earnings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EarningsCreateManyAndReturnArgs>(args?: SelectSubset<T, EarningsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Earnings.
     * @param {EarningsDeleteArgs} args - Arguments to delete one Earnings.
     * @example
     * // Delete one Earnings
     * const Earnings = await prisma.earnings.delete({
     *   where: {
     *     // ... filter to delete one Earnings
     *   }
     * })
     * 
     */
    delete<T extends EarningsDeleteArgs>(args: SelectSubset<T, EarningsDeleteArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Earnings.
     * @param {EarningsUpdateArgs} args - Arguments to update one Earnings.
     * @example
     * // Update one Earnings
     * const earnings = await prisma.earnings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EarningsUpdateArgs>(args: SelectSubset<T, EarningsUpdateArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Earnings.
     * @param {EarningsDeleteManyArgs} args - Arguments to filter Earnings to delete.
     * @example
     * // Delete a few Earnings
     * const { count } = await prisma.earnings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EarningsDeleteManyArgs>(args?: SelectSubset<T, EarningsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Earnings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Earnings
     * const earnings = await prisma.earnings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EarningsUpdateManyArgs>(args: SelectSubset<T, EarningsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Earnings.
     * @param {EarningsUpsertArgs} args - Arguments to update or create a Earnings.
     * @example
     * // Update or create a Earnings
     * const earnings = await prisma.earnings.upsert({
     *   create: {
     *     // ... data to create a Earnings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Earnings we want to update
     *   }
     * })
     */
    upsert<T extends EarningsUpsertArgs>(args: SelectSubset<T, EarningsUpsertArgs<ExtArgs>>): Prisma__EarningsClient<$Result.GetResult<Prisma.$EarningsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Earnings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsCountArgs} args - Arguments to filter Earnings to count.
     * @example
     * // Count the number of Earnings
     * const count = await prisma.earnings.count({
     *   where: {
     *     // ... the filter for the Earnings we want to count
     *   }
     * })
    **/
    count<T extends EarningsCountArgs>(
      args?: Subset<T, EarningsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EarningsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Earnings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EarningsAggregateArgs>(args: Subset<T, EarningsAggregateArgs>): Prisma.PrismaPromise<GetEarningsAggregateType<T>>

    /**
     * Group by Earnings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarningsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EarningsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EarningsGroupByArgs['orderBy'] }
        : { orderBy?: EarningsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EarningsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEarningsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Earnings model
   */
  readonly fields: EarningsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Earnings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EarningsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentor<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Earnings model
   */ 
  interface EarningsFieldRefs {
    readonly id: FieldRef<"Earnings", 'String'>
    readonly mentorId: FieldRef<"Earnings", 'String'>
    readonly bookingId: FieldRef<"Earnings", 'String'>
    readonly amount: FieldRef<"Earnings", 'Float'>
    readonly createdAt: FieldRef<"Earnings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Earnings findUnique
   */
  export type EarningsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * Filter, which Earnings to fetch.
     */
    where: EarningsWhereUniqueInput
  }

  /**
   * Earnings findUniqueOrThrow
   */
  export type EarningsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * Filter, which Earnings to fetch.
     */
    where: EarningsWhereUniqueInput
  }

  /**
   * Earnings findFirst
   */
  export type EarningsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * Filter, which Earnings to fetch.
     */
    where?: EarningsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Earnings to fetch.
     */
    orderBy?: EarningsOrderByWithRelationInput | EarningsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Earnings.
     */
    cursor?: EarningsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Earnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Earnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Earnings.
     */
    distinct?: EarningsScalarFieldEnum | EarningsScalarFieldEnum[]
  }

  /**
   * Earnings findFirstOrThrow
   */
  export type EarningsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * Filter, which Earnings to fetch.
     */
    where?: EarningsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Earnings to fetch.
     */
    orderBy?: EarningsOrderByWithRelationInput | EarningsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Earnings.
     */
    cursor?: EarningsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Earnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Earnings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Earnings.
     */
    distinct?: EarningsScalarFieldEnum | EarningsScalarFieldEnum[]
  }

  /**
   * Earnings findMany
   */
  export type EarningsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * Filter, which Earnings to fetch.
     */
    where?: EarningsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Earnings to fetch.
     */
    orderBy?: EarningsOrderByWithRelationInput | EarningsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Earnings.
     */
    cursor?: EarningsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Earnings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Earnings.
     */
    skip?: number
    distinct?: EarningsScalarFieldEnum | EarningsScalarFieldEnum[]
  }

  /**
   * Earnings create
   */
  export type EarningsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * The data needed to create a Earnings.
     */
    data: XOR<EarningsCreateInput, EarningsUncheckedCreateInput>
  }

  /**
   * Earnings createMany
   */
  export type EarningsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Earnings.
     */
    data: EarningsCreateManyInput | EarningsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Earnings createManyAndReturn
   */
  export type EarningsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Earnings.
     */
    data: EarningsCreateManyInput | EarningsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Earnings update
   */
  export type EarningsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * The data needed to update a Earnings.
     */
    data: XOR<EarningsUpdateInput, EarningsUncheckedUpdateInput>
    /**
     * Choose, which Earnings to update.
     */
    where: EarningsWhereUniqueInput
  }

  /**
   * Earnings updateMany
   */
  export type EarningsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Earnings.
     */
    data: XOR<EarningsUpdateManyMutationInput, EarningsUncheckedUpdateManyInput>
    /**
     * Filter which Earnings to update
     */
    where?: EarningsWhereInput
  }

  /**
   * Earnings upsert
   */
  export type EarningsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * The filter to search for the Earnings to update in case it exists.
     */
    where: EarningsWhereUniqueInput
    /**
     * In case the Earnings found by the `where` argument doesn't exist, create a new Earnings with this data.
     */
    create: XOR<EarningsCreateInput, EarningsUncheckedCreateInput>
    /**
     * In case the Earnings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EarningsUpdateInput, EarningsUncheckedUpdateInput>
  }

  /**
   * Earnings delete
   */
  export type EarningsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
    /**
     * Filter which Earnings to delete.
     */
    where: EarningsWhereUniqueInput
  }

  /**
   * Earnings deleteMany
   */
  export type EarningsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Earnings to delete
     */
    where?: EarningsWhereInput
  }

  /**
   * Earnings without action
   */
  export type EarningsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Earnings
     */
    select?: EarningsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarningsInclude<ExtArgs> | null
  }


  /**
   * Model Webinar
   */

  export type AggregateWebinar = {
    _count: WebinarCountAggregateOutputType | null
    _avg: WebinarAvgAggregateOutputType | null
    _sum: WebinarSumAggregateOutputType | null
    _min: WebinarMinAggregateOutputType | null
    _max: WebinarMaxAggregateOutputType | null
  }

  export type WebinarAvgAggregateOutputType = {
    price: number | null
  }

  export type WebinarSumAggregateOutputType = {
    price: number | null
  }

  export type WebinarMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    price: number | null
    type: $Enums.WebinarType | null
    startTime: Date | null
    endTime: Date | null
    meetingLink: string | null
    createdAt: Date | null
  }

  export type WebinarMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    price: number | null
    type: $Enums.WebinarType | null
    startTime: Date | null
    endTime: Date | null
    meetingLink: string | null
    createdAt: Date | null
  }

  export type WebinarCountAggregateOutputType = {
    id: number
    title: number
    description: number
    price: number
    type: number
    startTime: number
    endTime: number
    meetingLink: number
    createdAt: number
    _all: number
  }


  export type WebinarAvgAggregateInputType = {
    price?: true
  }

  export type WebinarSumAggregateInputType = {
    price?: true
  }

  export type WebinarMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    price?: true
    type?: true
    startTime?: true
    endTime?: true
    meetingLink?: true
    createdAt?: true
  }

  export type WebinarMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    price?: true
    type?: true
    startTime?: true
    endTime?: true
    meetingLink?: true
    createdAt?: true
  }

  export type WebinarCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    price?: true
    type?: true
    startTime?: true
    endTime?: true
    meetingLink?: true
    createdAt?: true
    _all?: true
  }

  export type WebinarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Webinar to aggregate.
     */
    where?: WebinarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webinars to fetch.
     */
    orderBy?: WebinarOrderByWithRelationInput | WebinarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebinarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webinars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webinars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Webinars
    **/
    _count?: true | WebinarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebinarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebinarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebinarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebinarMaxAggregateInputType
  }

  export type GetWebinarAggregateType<T extends WebinarAggregateArgs> = {
        [P in keyof T & keyof AggregateWebinar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebinar[P]>
      : GetScalarType<T[P], AggregateWebinar[P]>
  }




  export type WebinarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebinarWhereInput
    orderBy?: WebinarOrderByWithAggregationInput | WebinarOrderByWithAggregationInput[]
    by: WebinarScalarFieldEnum[] | WebinarScalarFieldEnum
    having?: WebinarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebinarCountAggregateInputType | true
    _avg?: WebinarAvgAggregateInputType
    _sum?: WebinarSumAggregateInputType
    _min?: WebinarMinAggregateInputType
    _max?: WebinarMaxAggregateInputType
  }

  export type WebinarGroupByOutputType = {
    id: string
    title: string
    description: string
    price: number | null
    type: $Enums.WebinarType
    startTime: Date
    endTime: Date
    meetingLink: string | null
    createdAt: Date
    _count: WebinarCountAggregateOutputType | null
    _avg: WebinarAvgAggregateOutputType | null
    _sum: WebinarSumAggregateOutputType | null
    _min: WebinarMinAggregateOutputType | null
    _max: WebinarMaxAggregateOutputType | null
  }

  type GetWebinarGroupByPayload<T extends WebinarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebinarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebinarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebinarGroupByOutputType[P]>
            : GetScalarType<T[P], WebinarGroupByOutputType[P]>
        }
      >
    >


  export type WebinarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    meetingLink?: boolean
    createdAt?: boolean
    registrations?: boolean | Webinar$registrationsArgs<ExtArgs>
    _count?: boolean | WebinarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webinar"]>

  export type WebinarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    meetingLink?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["webinar"]>

  export type WebinarSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    type?: boolean
    startTime?: boolean
    endTime?: boolean
    meetingLink?: boolean
    createdAt?: boolean
  }

  export type WebinarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | Webinar$registrationsArgs<ExtArgs>
    _count?: boolean | WebinarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WebinarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WebinarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Webinar"
    objects: {
      registrations: Prisma.$WebinarRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      price: number | null
      type: $Enums.WebinarType
      startTime: Date
      endTime: Date
      meetingLink: string | null
      createdAt: Date
    }, ExtArgs["result"]["webinar"]>
    composites: {}
  }

  type WebinarGetPayload<S extends boolean | null | undefined | WebinarDefaultArgs> = $Result.GetResult<Prisma.$WebinarPayload, S>

  type WebinarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebinarFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebinarCountAggregateInputType | true
    }

  export interface WebinarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Webinar'], meta: { name: 'Webinar' } }
    /**
     * Find zero or one Webinar that matches the filter.
     * @param {WebinarFindUniqueArgs} args - Arguments to find a Webinar
     * @example
     * // Get one Webinar
     * const webinar = await prisma.webinar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebinarFindUniqueArgs>(args: SelectSubset<T, WebinarFindUniqueArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Webinar that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WebinarFindUniqueOrThrowArgs} args - Arguments to find a Webinar
     * @example
     * // Get one Webinar
     * const webinar = await prisma.webinar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebinarFindUniqueOrThrowArgs>(args: SelectSubset<T, WebinarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Webinar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarFindFirstArgs} args - Arguments to find a Webinar
     * @example
     * // Get one Webinar
     * const webinar = await prisma.webinar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebinarFindFirstArgs>(args?: SelectSubset<T, WebinarFindFirstArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Webinar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarFindFirstOrThrowArgs} args - Arguments to find a Webinar
     * @example
     * // Get one Webinar
     * const webinar = await prisma.webinar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebinarFindFirstOrThrowArgs>(args?: SelectSubset<T, WebinarFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Webinars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Webinars
     * const webinars = await prisma.webinar.findMany()
     * 
     * // Get first 10 Webinars
     * const webinars = await prisma.webinar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webinarWithIdOnly = await prisma.webinar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebinarFindManyArgs>(args?: SelectSubset<T, WebinarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Webinar.
     * @param {WebinarCreateArgs} args - Arguments to create a Webinar.
     * @example
     * // Create one Webinar
     * const Webinar = await prisma.webinar.create({
     *   data: {
     *     // ... data to create a Webinar
     *   }
     * })
     * 
     */
    create<T extends WebinarCreateArgs>(args: SelectSubset<T, WebinarCreateArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Webinars.
     * @param {WebinarCreateManyArgs} args - Arguments to create many Webinars.
     * @example
     * // Create many Webinars
     * const webinar = await prisma.webinar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebinarCreateManyArgs>(args?: SelectSubset<T, WebinarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Webinars and returns the data saved in the database.
     * @param {WebinarCreateManyAndReturnArgs} args - Arguments to create many Webinars.
     * @example
     * // Create many Webinars
     * const webinar = await prisma.webinar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Webinars and only return the `id`
     * const webinarWithIdOnly = await prisma.webinar.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebinarCreateManyAndReturnArgs>(args?: SelectSubset<T, WebinarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Webinar.
     * @param {WebinarDeleteArgs} args - Arguments to delete one Webinar.
     * @example
     * // Delete one Webinar
     * const Webinar = await prisma.webinar.delete({
     *   where: {
     *     // ... filter to delete one Webinar
     *   }
     * })
     * 
     */
    delete<T extends WebinarDeleteArgs>(args: SelectSubset<T, WebinarDeleteArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Webinar.
     * @param {WebinarUpdateArgs} args - Arguments to update one Webinar.
     * @example
     * // Update one Webinar
     * const webinar = await prisma.webinar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebinarUpdateArgs>(args: SelectSubset<T, WebinarUpdateArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Webinars.
     * @param {WebinarDeleteManyArgs} args - Arguments to filter Webinars to delete.
     * @example
     * // Delete a few Webinars
     * const { count } = await prisma.webinar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebinarDeleteManyArgs>(args?: SelectSubset<T, WebinarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Webinars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Webinars
     * const webinar = await prisma.webinar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebinarUpdateManyArgs>(args: SelectSubset<T, WebinarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Webinar.
     * @param {WebinarUpsertArgs} args - Arguments to update or create a Webinar.
     * @example
     * // Update or create a Webinar
     * const webinar = await prisma.webinar.upsert({
     *   create: {
     *     // ... data to create a Webinar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Webinar we want to update
     *   }
     * })
     */
    upsert<T extends WebinarUpsertArgs>(args: SelectSubset<T, WebinarUpsertArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Webinars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarCountArgs} args - Arguments to filter Webinars to count.
     * @example
     * // Count the number of Webinars
     * const count = await prisma.webinar.count({
     *   where: {
     *     // ... the filter for the Webinars we want to count
     *   }
     * })
    **/
    count<T extends WebinarCountArgs>(
      args?: Subset<T, WebinarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebinarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Webinar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebinarAggregateArgs>(args: Subset<T, WebinarAggregateArgs>): Prisma.PrismaPromise<GetWebinarAggregateType<T>>

    /**
     * Group by Webinar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebinarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebinarGroupByArgs['orderBy'] }
        : { orderBy?: WebinarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebinarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebinarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Webinar model
   */
  readonly fields: WebinarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Webinar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebinarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registrations<T extends Webinar$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Webinar$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Webinar model
   */ 
  interface WebinarFieldRefs {
    readonly id: FieldRef<"Webinar", 'String'>
    readonly title: FieldRef<"Webinar", 'String'>
    readonly description: FieldRef<"Webinar", 'String'>
    readonly price: FieldRef<"Webinar", 'Float'>
    readonly type: FieldRef<"Webinar", 'WebinarType'>
    readonly startTime: FieldRef<"Webinar", 'DateTime'>
    readonly endTime: FieldRef<"Webinar", 'DateTime'>
    readonly meetingLink: FieldRef<"Webinar", 'String'>
    readonly createdAt: FieldRef<"Webinar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Webinar findUnique
   */
  export type WebinarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * Filter, which Webinar to fetch.
     */
    where: WebinarWhereUniqueInput
  }

  /**
   * Webinar findUniqueOrThrow
   */
  export type WebinarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * Filter, which Webinar to fetch.
     */
    where: WebinarWhereUniqueInput
  }

  /**
   * Webinar findFirst
   */
  export type WebinarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * Filter, which Webinar to fetch.
     */
    where?: WebinarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webinars to fetch.
     */
    orderBy?: WebinarOrderByWithRelationInput | WebinarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Webinars.
     */
    cursor?: WebinarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webinars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webinars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Webinars.
     */
    distinct?: WebinarScalarFieldEnum | WebinarScalarFieldEnum[]
  }

  /**
   * Webinar findFirstOrThrow
   */
  export type WebinarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * Filter, which Webinar to fetch.
     */
    where?: WebinarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webinars to fetch.
     */
    orderBy?: WebinarOrderByWithRelationInput | WebinarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Webinars.
     */
    cursor?: WebinarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webinars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webinars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Webinars.
     */
    distinct?: WebinarScalarFieldEnum | WebinarScalarFieldEnum[]
  }

  /**
   * Webinar findMany
   */
  export type WebinarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * Filter, which Webinars to fetch.
     */
    where?: WebinarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Webinars to fetch.
     */
    orderBy?: WebinarOrderByWithRelationInput | WebinarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Webinars.
     */
    cursor?: WebinarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Webinars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Webinars.
     */
    skip?: number
    distinct?: WebinarScalarFieldEnum | WebinarScalarFieldEnum[]
  }

  /**
   * Webinar create
   */
  export type WebinarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * The data needed to create a Webinar.
     */
    data: XOR<WebinarCreateInput, WebinarUncheckedCreateInput>
  }

  /**
   * Webinar createMany
   */
  export type WebinarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Webinars.
     */
    data: WebinarCreateManyInput | WebinarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Webinar createManyAndReturn
   */
  export type WebinarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Webinars.
     */
    data: WebinarCreateManyInput | WebinarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Webinar update
   */
  export type WebinarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * The data needed to update a Webinar.
     */
    data: XOR<WebinarUpdateInput, WebinarUncheckedUpdateInput>
    /**
     * Choose, which Webinar to update.
     */
    where: WebinarWhereUniqueInput
  }

  /**
   * Webinar updateMany
   */
  export type WebinarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Webinars.
     */
    data: XOR<WebinarUpdateManyMutationInput, WebinarUncheckedUpdateManyInput>
    /**
     * Filter which Webinars to update
     */
    where?: WebinarWhereInput
  }

  /**
   * Webinar upsert
   */
  export type WebinarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * The filter to search for the Webinar to update in case it exists.
     */
    where: WebinarWhereUniqueInput
    /**
     * In case the Webinar found by the `where` argument doesn't exist, create a new Webinar with this data.
     */
    create: XOR<WebinarCreateInput, WebinarUncheckedCreateInput>
    /**
     * In case the Webinar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebinarUpdateInput, WebinarUncheckedUpdateInput>
  }

  /**
   * Webinar delete
   */
  export type WebinarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
    /**
     * Filter which Webinar to delete.
     */
    where: WebinarWhereUniqueInput
  }

  /**
   * Webinar deleteMany
   */
  export type WebinarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Webinars to delete
     */
    where?: WebinarWhereInput
  }

  /**
   * Webinar.registrations
   */
  export type Webinar$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    where?: WebinarRegistrationWhereInput
    orderBy?: WebinarRegistrationOrderByWithRelationInput | WebinarRegistrationOrderByWithRelationInput[]
    cursor?: WebinarRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebinarRegistrationScalarFieldEnum | WebinarRegistrationScalarFieldEnum[]
  }

  /**
   * Webinar without action
   */
  export type WebinarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Webinar
     */
    select?: WebinarSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarInclude<ExtArgs> | null
  }


  /**
   * Model WebinarRegistration
   */

  export type AggregateWebinarRegistration = {
    _count: WebinarRegistrationCountAggregateOutputType | null
    _min: WebinarRegistrationMinAggregateOutputType | null
    _max: WebinarRegistrationMaxAggregateOutputType | null
  }

  export type WebinarRegistrationMinAggregateOutputType = {
    id: string | null
    webinarId: string | null
    userId: string | null
    paymentId: string | null
    createdAt: Date | null
  }

  export type WebinarRegistrationMaxAggregateOutputType = {
    id: string | null
    webinarId: string | null
    userId: string | null
    paymentId: string | null
    createdAt: Date | null
  }

  export type WebinarRegistrationCountAggregateOutputType = {
    id: number
    webinarId: number
    userId: number
    paymentId: number
    createdAt: number
    _all: number
  }


  export type WebinarRegistrationMinAggregateInputType = {
    id?: true
    webinarId?: true
    userId?: true
    paymentId?: true
    createdAt?: true
  }

  export type WebinarRegistrationMaxAggregateInputType = {
    id?: true
    webinarId?: true
    userId?: true
    paymentId?: true
    createdAt?: true
  }

  export type WebinarRegistrationCountAggregateInputType = {
    id?: true
    webinarId?: true
    userId?: true
    paymentId?: true
    createdAt?: true
    _all?: true
  }

  export type WebinarRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebinarRegistration to aggregate.
     */
    where?: WebinarRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebinarRegistrations to fetch.
     */
    orderBy?: WebinarRegistrationOrderByWithRelationInput | WebinarRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebinarRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebinarRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebinarRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebinarRegistrations
    **/
    _count?: true | WebinarRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebinarRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebinarRegistrationMaxAggregateInputType
  }

  export type GetWebinarRegistrationAggregateType<T extends WebinarRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateWebinarRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebinarRegistration[P]>
      : GetScalarType<T[P], AggregateWebinarRegistration[P]>
  }




  export type WebinarRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebinarRegistrationWhereInput
    orderBy?: WebinarRegistrationOrderByWithAggregationInput | WebinarRegistrationOrderByWithAggregationInput[]
    by: WebinarRegistrationScalarFieldEnum[] | WebinarRegistrationScalarFieldEnum
    having?: WebinarRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebinarRegistrationCountAggregateInputType | true
    _min?: WebinarRegistrationMinAggregateInputType
    _max?: WebinarRegistrationMaxAggregateInputType
  }

  export type WebinarRegistrationGroupByOutputType = {
    id: string
    webinarId: string
    userId: string
    paymentId: string | null
    createdAt: Date
    _count: WebinarRegistrationCountAggregateOutputType | null
    _min: WebinarRegistrationMinAggregateOutputType | null
    _max: WebinarRegistrationMaxAggregateOutputType | null
  }

  type GetWebinarRegistrationGroupByPayload<T extends WebinarRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebinarRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebinarRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebinarRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], WebinarRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type WebinarRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webinarId?: boolean
    userId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    webinar?: boolean | WebinarDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webinarRegistration"]>

  export type WebinarRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    webinarId?: boolean
    userId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    webinar?: boolean | WebinarDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webinarRegistration"]>

  export type WebinarRegistrationSelectScalar = {
    id?: boolean
    webinarId?: boolean
    userId?: boolean
    paymentId?: boolean
    createdAt?: boolean
  }

  export type WebinarRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webinar?: boolean | WebinarDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WebinarRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webinar?: boolean | WebinarDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WebinarRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebinarRegistration"
    objects: {
      webinar: Prisma.$WebinarPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      webinarId: string
      userId: string
      paymentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["webinarRegistration"]>
    composites: {}
  }

  type WebinarRegistrationGetPayload<S extends boolean | null | undefined | WebinarRegistrationDefaultArgs> = $Result.GetResult<Prisma.$WebinarRegistrationPayload, S>

  type WebinarRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebinarRegistrationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebinarRegistrationCountAggregateInputType | true
    }

  export interface WebinarRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebinarRegistration'], meta: { name: 'WebinarRegistration' } }
    /**
     * Find zero or one WebinarRegistration that matches the filter.
     * @param {WebinarRegistrationFindUniqueArgs} args - Arguments to find a WebinarRegistration
     * @example
     * // Get one WebinarRegistration
     * const webinarRegistration = await prisma.webinarRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebinarRegistrationFindUniqueArgs>(args: SelectSubset<T, WebinarRegistrationFindUniqueArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WebinarRegistration that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WebinarRegistrationFindUniqueOrThrowArgs} args - Arguments to find a WebinarRegistration
     * @example
     * // Get one WebinarRegistration
     * const webinarRegistration = await prisma.webinarRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebinarRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, WebinarRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WebinarRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationFindFirstArgs} args - Arguments to find a WebinarRegistration
     * @example
     * // Get one WebinarRegistration
     * const webinarRegistration = await prisma.webinarRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebinarRegistrationFindFirstArgs>(args?: SelectSubset<T, WebinarRegistrationFindFirstArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WebinarRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationFindFirstOrThrowArgs} args - Arguments to find a WebinarRegistration
     * @example
     * // Get one WebinarRegistration
     * const webinarRegistration = await prisma.webinarRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebinarRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, WebinarRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WebinarRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebinarRegistrations
     * const webinarRegistrations = await prisma.webinarRegistration.findMany()
     * 
     * // Get first 10 WebinarRegistrations
     * const webinarRegistrations = await prisma.webinarRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webinarRegistrationWithIdOnly = await prisma.webinarRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebinarRegistrationFindManyArgs>(args?: SelectSubset<T, WebinarRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WebinarRegistration.
     * @param {WebinarRegistrationCreateArgs} args - Arguments to create a WebinarRegistration.
     * @example
     * // Create one WebinarRegistration
     * const WebinarRegistration = await prisma.webinarRegistration.create({
     *   data: {
     *     // ... data to create a WebinarRegistration
     *   }
     * })
     * 
     */
    create<T extends WebinarRegistrationCreateArgs>(args: SelectSubset<T, WebinarRegistrationCreateArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WebinarRegistrations.
     * @param {WebinarRegistrationCreateManyArgs} args - Arguments to create many WebinarRegistrations.
     * @example
     * // Create many WebinarRegistrations
     * const webinarRegistration = await prisma.webinarRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebinarRegistrationCreateManyArgs>(args?: SelectSubset<T, WebinarRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebinarRegistrations and returns the data saved in the database.
     * @param {WebinarRegistrationCreateManyAndReturnArgs} args - Arguments to create many WebinarRegistrations.
     * @example
     * // Create many WebinarRegistrations
     * const webinarRegistration = await prisma.webinarRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebinarRegistrations and only return the `id`
     * const webinarRegistrationWithIdOnly = await prisma.webinarRegistration.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebinarRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, WebinarRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WebinarRegistration.
     * @param {WebinarRegistrationDeleteArgs} args - Arguments to delete one WebinarRegistration.
     * @example
     * // Delete one WebinarRegistration
     * const WebinarRegistration = await prisma.webinarRegistration.delete({
     *   where: {
     *     // ... filter to delete one WebinarRegistration
     *   }
     * })
     * 
     */
    delete<T extends WebinarRegistrationDeleteArgs>(args: SelectSubset<T, WebinarRegistrationDeleteArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WebinarRegistration.
     * @param {WebinarRegistrationUpdateArgs} args - Arguments to update one WebinarRegistration.
     * @example
     * // Update one WebinarRegistration
     * const webinarRegistration = await prisma.webinarRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebinarRegistrationUpdateArgs>(args: SelectSubset<T, WebinarRegistrationUpdateArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WebinarRegistrations.
     * @param {WebinarRegistrationDeleteManyArgs} args - Arguments to filter WebinarRegistrations to delete.
     * @example
     * // Delete a few WebinarRegistrations
     * const { count } = await prisma.webinarRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebinarRegistrationDeleteManyArgs>(args?: SelectSubset<T, WebinarRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebinarRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebinarRegistrations
     * const webinarRegistration = await prisma.webinarRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebinarRegistrationUpdateManyArgs>(args: SelectSubset<T, WebinarRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebinarRegistration.
     * @param {WebinarRegistrationUpsertArgs} args - Arguments to update or create a WebinarRegistration.
     * @example
     * // Update or create a WebinarRegistration
     * const webinarRegistration = await prisma.webinarRegistration.upsert({
     *   create: {
     *     // ... data to create a WebinarRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebinarRegistration we want to update
     *   }
     * })
     */
    upsert<T extends WebinarRegistrationUpsertArgs>(args: SelectSubset<T, WebinarRegistrationUpsertArgs<ExtArgs>>): Prisma__WebinarRegistrationClient<$Result.GetResult<Prisma.$WebinarRegistrationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WebinarRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationCountArgs} args - Arguments to filter WebinarRegistrations to count.
     * @example
     * // Count the number of WebinarRegistrations
     * const count = await prisma.webinarRegistration.count({
     *   where: {
     *     // ... the filter for the WebinarRegistrations we want to count
     *   }
     * })
    **/
    count<T extends WebinarRegistrationCountArgs>(
      args?: Subset<T, WebinarRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebinarRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebinarRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebinarRegistrationAggregateArgs>(args: Subset<T, WebinarRegistrationAggregateArgs>): Prisma.PrismaPromise<GetWebinarRegistrationAggregateType<T>>

    /**
     * Group by WebinarRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebinarRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebinarRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebinarRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: WebinarRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebinarRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebinarRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebinarRegistration model
   */
  readonly fields: WebinarRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebinarRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebinarRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    webinar<T extends WebinarDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WebinarDefaultArgs<ExtArgs>>): Prisma__WebinarClient<$Result.GetResult<Prisma.$WebinarPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebinarRegistration model
   */ 
  interface WebinarRegistrationFieldRefs {
    readonly id: FieldRef<"WebinarRegistration", 'String'>
    readonly webinarId: FieldRef<"WebinarRegistration", 'String'>
    readonly userId: FieldRef<"WebinarRegistration", 'String'>
    readonly paymentId: FieldRef<"WebinarRegistration", 'String'>
    readonly createdAt: FieldRef<"WebinarRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebinarRegistration findUnique
   */
  export type WebinarRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which WebinarRegistration to fetch.
     */
    where: WebinarRegistrationWhereUniqueInput
  }

  /**
   * WebinarRegistration findUniqueOrThrow
   */
  export type WebinarRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which WebinarRegistration to fetch.
     */
    where: WebinarRegistrationWhereUniqueInput
  }

  /**
   * WebinarRegistration findFirst
   */
  export type WebinarRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which WebinarRegistration to fetch.
     */
    where?: WebinarRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebinarRegistrations to fetch.
     */
    orderBy?: WebinarRegistrationOrderByWithRelationInput | WebinarRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebinarRegistrations.
     */
    cursor?: WebinarRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebinarRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebinarRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebinarRegistrations.
     */
    distinct?: WebinarRegistrationScalarFieldEnum | WebinarRegistrationScalarFieldEnum[]
  }

  /**
   * WebinarRegistration findFirstOrThrow
   */
  export type WebinarRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which WebinarRegistration to fetch.
     */
    where?: WebinarRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebinarRegistrations to fetch.
     */
    orderBy?: WebinarRegistrationOrderByWithRelationInput | WebinarRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebinarRegistrations.
     */
    cursor?: WebinarRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebinarRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebinarRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebinarRegistrations.
     */
    distinct?: WebinarRegistrationScalarFieldEnum | WebinarRegistrationScalarFieldEnum[]
  }

  /**
   * WebinarRegistration findMany
   */
  export type WebinarRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which WebinarRegistrations to fetch.
     */
    where?: WebinarRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebinarRegistrations to fetch.
     */
    orderBy?: WebinarRegistrationOrderByWithRelationInput | WebinarRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebinarRegistrations.
     */
    cursor?: WebinarRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebinarRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebinarRegistrations.
     */
    skip?: number
    distinct?: WebinarRegistrationScalarFieldEnum | WebinarRegistrationScalarFieldEnum[]
  }

  /**
   * WebinarRegistration create
   */
  export type WebinarRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a WebinarRegistration.
     */
    data: XOR<WebinarRegistrationCreateInput, WebinarRegistrationUncheckedCreateInput>
  }

  /**
   * WebinarRegistration createMany
   */
  export type WebinarRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebinarRegistrations.
     */
    data: WebinarRegistrationCreateManyInput | WebinarRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebinarRegistration createManyAndReturn
   */
  export type WebinarRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WebinarRegistrations.
     */
    data: WebinarRegistrationCreateManyInput | WebinarRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebinarRegistration update
   */
  export type WebinarRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a WebinarRegistration.
     */
    data: XOR<WebinarRegistrationUpdateInput, WebinarRegistrationUncheckedUpdateInput>
    /**
     * Choose, which WebinarRegistration to update.
     */
    where: WebinarRegistrationWhereUniqueInput
  }

  /**
   * WebinarRegistration updateMany
   */
  export type WebinarRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebinarRegistrations.
     */
    data: XOR<WebinarRegistrationUpdateManyMutationInput, WebinarRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which WebinarRegistrations to update
     */
    where?: WebinarRegistrationWhereInput
  }

  /**
   * WebinarRegistration upsert
   */
  export type WebinarRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the WebinarRegistration to update in case it exists.
     */
    where: WebinarRegistrationWhereUniqueInput
    /**
     * In case the WebinarRegistration found by the `where` argument doesn't exist, create a new WebinarRegistration with this data.
     */
    create: XOR<WebinarRegistrationCreateInput, WebinarRegistrationUncheckedCreateInput>
    /**
     * In case the WebinarRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebinarRegistrationUpdateInput, WebinarRegistrationUncheckedUpdateInput>
  }

  /**
   * WebinarRegistration delete
   */
  export type WebinarRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
    /**
     * Filter which WebinarRegistration to delete.
     */
    where: WebinarRegistrationWhereUniqueInput
  }

  /**
   * WebinarRegistration deleteMany
   */
  export type WebinarRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebinarRegistrations to delete
     */
    where?: WebinarRegistrationWhereInput
  }

  /**
   * WebinarRegistration without action
   */
  export type WebinarRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebinarRegistration
     */
    select?: WebinarRegistrationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebinarRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model VerificationDocument
   */

  export type AggregateVerificationDocument = {
    _count: VerificationDocumentCountAggregateOutputType | null
    _min: VerificationDocumentMinAggregateOutputType | null
    _max: VerificationDocumentMaxAggregateOutputType | null
  }

  export type VerificationDocumentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    documentUrl: string | null
    status: $Enums.VerificationStatus | null
    createdAt: Date | null
  }

  export type VerificationDocumentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    documentUrl: string | null
    status: $Enums.VerificationStatus | null
    createdAt: Date | null
  }

  export type VerificationDocumentCountAggregateOutputType = {
    id: number
    userId: number
    documentUrl: number
    status: number
    createdAt: number
    _all: number
  }


  export type VerificationDocumentMinAggregateInputType = {
    id?: true
    userId?: true
    documentUrl?: true
    status?: true
    createdAt?: true
  }

  export type VerificationDocumentMaxAggregateInputType = {
    id?: true
    userId?: true
    documentUrl?: true
    status?: true
    createdAt?: true
  }

  export type VerificationDocumentCountAggregateInputType = {
    id?: true
    userId?: true
    documentUrl?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationDocument to aggregate.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationDocuments
    **/
    _count?: true | VerificationDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationDocumentMaxAggregateInputType
  }

  export type GetVerificationDocumentAggregateType<T extends VerificationDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationDocument[P]>
      : GetScalarType<T[P], AggregateVerificationDocument[P]>
  }




  export type VerificationDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationDocumentWhereInput
    orderBy?: VerificationDocumentOrderByWithAggregationInput | VerificationDocumentOrderByWithAggregationInput[]
    by: VerificationDocumentScalarFieldEnum[] | VerificationDocumentScalarFieldEnum
    having?: VerificationDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationDocumentCountAggregateInputType | true
    _min?: VerificationDocumentMinAggregateInputType
    _max?: VerificationDocumentMaxAggregateInputType
  }

  export type VerificationDocumentGroupByOutputType = {
    id: string
    userId: string
    documentUrl: string
    status: $Enums.VerificationStatus
    createdAt: Date
    _count: VerificationDocumentCountAggregateOutputType | null
    _min: VerificationDocumentMinAggregateOutputType | null
    _max: VerificationDocumentMaxAggregateOutputType | null
  }

  type GetVerificationDocumentGroupByPayload<T extends VerificationDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationDocumentGroupByOutputType[P]>
        }
      >
    >


  export type VerificationDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentUrl?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationDocument"]>

  export type VerificationDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentUrl?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationDocument"]>

  export type VerificationDocumentSelectScalar = {
    id?: boolean
    userId?: boolean
    documentUrl?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type VerificationDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VerificationDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationDocument"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      documentUrl: string
      status: $Enums.VerificationStatus
      createdAt: Date
    }, ExtArgs["result"]["verificationDocument"]>
    composites: {}
  }

  type VerificationDocumentGetPayload<S extends boolean | null | undefined | VerificationDocumentDefaultArgs> = $Result.GetResult<Prisma.$VerificationDocumentPayload, S>

  type VerificationDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationDocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationDocumentCountAggregateInputType | true
    }

  export interface VerificationDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationDocument'], meta: { name: 'VerificationDocument' } }
    /**
     * Find zero or one VerificationDocument that matches the filter.
     * @param {VerificationDocumentFindUniqueArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationDocumentFindUniqueArgs>(args: SelectSubset<T, VerificationDocumentFindUniqueArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VerificationDocument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationDocumentFindUniqueOrThrowArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VerificationDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentFindFirstArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationDocumentFindFirstArgs>(args?: SelectSubset<T, VerificationDocumentFindFirstArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VerificationDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentFindFirstOrThrowArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VerificationDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationDocuments
     * const verificationDocuments = await prisma.verificationDocument.findMany()
     * 
     * // Get first 10 VerificationDocuments
     * const verificationDocuments = await prisma.verificationDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationDocumentWithIdOnly = await prisma.verificationDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationDocumentFindManyArgs>(args?: SelectSubset<T, VerificationDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VerificationDocument.
     * @param {VerificationDocumentCreateArgs} args - Arguments to create a VerificationDocument.
     * @example
     * // Create one VerificationDocument
     * const VerificationDocument = await prisma.verificationDocument.create({
     *   data: {
     *     // ... data to create a VerificationDocument
     *   }
     * })
     * 
     */
    create<T extends VerificationDocumentCreateArgs>(args: SelectSubset<T, VerificationDocumentCreateArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VerificationDocuments.
     * @param {VerificationDocumentCreateManyArgs} args - Arguments to create many VerificationDocuments.
     * @example
     * // Create many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationDocumentCreateManyArgs>(args?: SelectSubset<T, VerificationDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationDocuments and returns the data saved in the database.
     * @param {VerificationDocumentCreateManyAndReturnArgs} args - Arguments to create many VerificationDocuments.
     * @example
     * // Create many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationDocuments and only return the `id`
     * const verificationDocumentWithIdOnly = await prisma.verificationDocument.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VerificationDocument.
     * @param {VerificationDocumentDeleteArgs} args - Arguments to delete one VerificationDocument.
     * @example
     * // Delete one VerificationDocument
     * const VerificationDocument = await prisma.verificationDocument.delete({
     *   where: {
     *     // ... filter to delete one VerificationDocument
     *   }
     * })
     * 
     */
    delete<T extends VerificationDocumentDeleteArgs>(args: SelectSubset<T, VerificationDocumentDeleteArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VerificationDocument.
     * @param {VerificationDocumentUpdateArgs} args - Arguments to update one VerificationDocument.
     * @example
     * // Update one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationDocumentUpdateArgs>(args: SelectSubset<T, VerificationDocumentUpdateArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VerificationDocuments.
     * @param {VerificationDocumentDeleteManyArgs} args - Arguments to filter VerificationDocuments to delete.
     * @example
     * // Delete a few VerificationDocuments
     * const { count } = await prisma.verificationDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDocumentDeleteManyArgs>(args?: SelectSubset<T, VerificationDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationDocumentUpdateManyArgs>(args: SelectSubset<T, VerificationDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationDocument.
     * @param {VerificationDocumentUpsertArgs} args - Arguments to update or create a VerificationDocument.
     * @example
     * // Update or create a VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.upsert({
     *   create: {
     *     // ... data to create a VerificationDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationDocument we want to update
     *   }
     * })
     */
    upsert<T extends VerificationDocumentUpsertArgs>(args: SelectSubset<T, VerificationDocumentUpsertArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VerificationDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentCountArgs} args - Arguments to filter VerificationDocuments to count.
     * @example
     * // Count the number of VerificationDocuments
     * const count = await prisma.verificationDocument.count({
     *   where: {
     *     // ... the filter for the VerificationDocuments we want to count
     *   }
     * })
    **/
    count<T extends VerificationDocumentCountArgs>(
      args?: Subset<T, VerificationDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationDocumentAggregateArgs>(args: Subset<T, VerificationDocumentAggregateArgs>): Prisma.PrismaPromise<GetVerificationDocumentAggregateType<T>>

    /**
     * Group by VerificationDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationDocumentGroupByArgs['orderBy'] }
        : { orderBy?: VerificationDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationDocument model
   */
  readonly fields: VerificationDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationDocument model
   */ 
  interface VerificationDocumentFieldRefs {
    readonly id: FieldRef<"VerificationDocument", 'String'>
    readonly userId: FieldRef<"VerificationDocument", 'String'>
    readonly documentUrl: FieldRef<"VerificationDocument", 'String'>
    readonly status: FieldRef<"VerificationDocument", 'VerificationStatus'>
    readonly createdAt: FieldRef<"VerificationDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationDocument findUnique
   */
  export type VerificationDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument findUniqueOrThrow
   */
  export type VerificationDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument findFirst
   */
  export type VerificationDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationDocuments.
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationDocuments.
     */
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * VerificationDocument findFirstOrThrow
   */
  export type VerificationDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationDocuments.
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationDocuments.
     */
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * VerificationDocument findMany
   */
  export type VerificationDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocuments to fetch.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationDocuments.
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * VerificationDocument create
   */
  export type VerificationDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a VerificationDocument.
     */
    data: XOR<VerificationDocumentCreateInput, VerificationDocumentUncheckedCreateInput>
  }

  /**
   * VerificationDocument createMany
   */
  export type VerificationDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationDocuments.
     */
    data: VerificationDocumentCreateManyInput | VerificationDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationDocument createManyAndReturn
   */
  export type VerificationDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VerificationDocuments.
     */
    data: VerificationDocumentCreateManyInput | VerificationDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationDocument update
   */
  export type VerificationDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a VerificationDocument.
     */
    data: XOR<VerificationDocumentUpdateInput, VerificationDocumentUncheckedUpdateInput>
    /**
     * Choose, which VerificationDocument to update.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument updateMany
   */
  export type VerificationDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationDocuments.
     */
    data: XOR<VerificationDocumentUpdateManyMutationInput, VerificationDocumentUncheckedUpdateManyInput>
    /**
     * Filter which VerificationDocuments to update
     */
    where?: VerificationDocumentWhereInput
  }

  /**
   * VerificationDocument upsert
   */
  export type VerificationDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the VerificationDocument to update in case it exists.
     */
    where: VerificationDocumentWhereUniqueInput
    /**
     * In case the VerificationDocument found by the `where` argument doesn't exist, create a new VerificationDocument with this data.
     */
    create: XOR<VerificationDocumentCreateInput, VerificationDocumentUncheckedCreateInput>
    /**
     * In case the VerificationDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationDocumentUpdateInput, VerificationDocumentUncheckedUpdateInput>
  }

  /**
   * VerificationDocument delete
   */
  export type VerificationDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter which VerificationDocument to delete.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument deleteMany
   */
  export type VerificationDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationDocuments to delete
     */
    where?: VerificationDocumentWhereInput
  }

  /**
   * VerificationDocument without action
   */
  export type VerificationDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MentorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    bio: 'bio',
    expertise: 'expertise',
    certifications: 'certifications',
    pricePerSession: 'pricePerSession',
    rating: 'rating',
    totalReviews: 'totalReviews',
    verificationStatus: 'verificationStatus',
    verifiedBadge: 'verifiedBadge',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorProfileScalarFieldEnum = (typeof MentorProfileScalarFieldEnum)[keyof typeof MentorProfileScalarFieldEnum]


  export const MenteeProfileScalarFieldEnum: {
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

  export type MenteeProfileScalarFieldEnum = (typeof MenteeProfileScalarFieldEnum)[keyof typeof MenteeProfileScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    menteeId: 'menteeId',
    name: 'name',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const SOPDocumentScalarFieldEnum: {
    id: 'id',
    menteeId: 'menteeId',
    collegeName: 'collegeName',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt'
  };

  export type SOPDocumentScalarFieldEnum = (typeof SOPDocumentScalarFieldEnum)[keyof typeof SOPDocumentScalarFieldEnum]


  export const SlotScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SlotScalarFieldEnum = (typeof SlotScalarFieldEnum)[keyof typeof SlotScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    menteeId: 'menteeId',
    slotId: 'slotId',
    status: 'status',
    sessionMode: 'sessionMode',
    sessionType: 'sessionType',
    purpose: 'purpose',
    meetingLink: 'meetingLink',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
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

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const MentorFeedbackScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    bookingId: 'bookingId',
    feedbackPdfUrl: 'feedbackPdfUrl',
    createdAt: 'createdAt'
  };

  export type MentorFeedbackScalarFieldEnum = (typeof MentorFeedbackScalarFieldEnum)[keyof typeof MentorFeedbackScalarFieldEnum]


  export const EarningsScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    bookingId: 'bookingId',
    amount: 'amount',
    createdAt: 'createdAt'
  };

  export type EarningsScalarFieldEnum = (typeof EarningsScalarFieldEnum)[keyof typeof EarningsScalarFieldEnum]


  export const WebinarScalarFieldEnum: {
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

  export type WebinarScalarFieldEnum = (typeof WebinarScalarFieldEnum)[keyof typeof WebinarScalarFieldEnum]


  export const WebinarRegistrationScalarFieldEnum: {
    id: 'id',
    webinarId: 'webinarId',
    userId: 'userId',
    paymentId: 'paymentId',
    createdAt: 'createdAt'
  };

  export type WebinarRegistrationScalarFieldEnum = (typeof WebinarRegistrationScalarFieldEnum)[keyof typeof WebinarRegistrationScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const VerificationDocumentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    documentUrl: 'documentUrl',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type VerificationDocumentScalarFieldEnum = (typeof VerificationDocumentScalarFieldEnum)[keyof typeof VerificationDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'SlotStatus'
   */
  export type EnumSlotStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SlotStatus'>
    


  /**
   * Reference to a field of type 'SlotStatus[]'
   */
  export type ListEnumSlotStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SlotStatus[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'SessionMode'
   */
  export type EnumSessionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionMode'>
    


  /**
   * Reference to a field of type 'SessionMode[]'
   */
  export type ListEnumSessionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionMode[]'>
    


  /**
   * Reference to a field of type 'SessionType'
   */
  export type EnumSessionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionType'>
    


  /**
   * Reference to a field of type 'SessionType[]'
   */
  export type ListEnumSessionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionType[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'WebinarType'
   */
  export type EnumWebinarTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebinarType'>
    


  /**
   * Reference to a field of type 'WebinarType[]'
   */
  export type ListEnumWebinarTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebinarType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    profilePicture?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    mentorProfile?: XOR<MentorProfileNullableRelationFilter, MentorProfileWhereInput> | null
    menteeProfile?: XOR<MenteeProfileNullableRelationFilter, MenteeProfileWhereInput> | null
    bookingsAsMentor?: BookingListRelationFilter
    bookingsAsMentee?: BookingListRelationFilter
    notifications?: NotificationListRelationFilter
    verification?: XOR<VerificationDocumentNullableRelationFilter, VerificationDocumentWhereInput> | null
    webinarRegistrations?: WebinarRegistrationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    provider?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    mentorProfile?: MentorProfileOrderByWithRelationInput
    menteeProfile?: MenteeProfileOrderByWithRelationInput
    bookingsAsMentor?: BookingOrderByRelationAggregateInput
    bookingsAsMentee?: BookingOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    verification?: VerificationDocumentOrderByWithRelationInput
    webinarRegistrations?: WebinarRegistrationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    profilePicture?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    mentorProfile?: XOR<MentorProfileNullableRelationFilter, MentorProfileWhereInput> | null
    menteeProfile?: XOR<MenteeProfileNullableRelationFilter, MenteeProfileWhereInput> | null
    bookingsAsMentor?: BookingListRelationFilter
    bookingsAsMentee?: BookingListRelationFilter
    notifications?: NotificationListRelationFilter
    verification?: XOR<VerificationDocumentNullableRelationFilter, VerificationDocumentWhereInput> | null
    webinarRegistrations?: WebinarRegistrationListRelationFilter
  }, "id" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    provider?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    profilePicture?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type MentorProfileWhereInput = {
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    id?: StringFilter<"MentorProfile"> | string
    userId?: StringFilter<"MentorProfile"> | string
    bio?: StringFilter<"MentorProfile"> | string
    expertise?: StringNullableListFilter<"MentorProfile">
    certifications?: StringNullableListFilter<"MentorProfile">
    pricePerSession?: FloatFilter<"MentorProfile"> | number
    rating?: FloatFilter<"MentorProfile"> | number
    totalReviews?: IntFilter<"MentorProfile"> | number
    verificationStatus?: EnumVerificationStatusFilter<"MentorProfile"> | $Enums.VerificationStatus
    verifiedBadge?: BoolFilter<"MentorProfile"> | boolean
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    slots?: SlotListRelationFilter
    feedbackGiven?: MentorFeedbackListRelationFilter
    earnings?: EarningsListRelationFilter
  }

  export type MentorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    expertise?: SortOrder
    certifications?: SortOrder
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    slots?: SlotOrderByRelationAggregateInput
    feedbackGiven?: MentorFeedbackOrderByRelationAggregateInput
    earnings?: EarningsOrderByRelationAggregateInput
  }

  export type MentorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    bio?: StringFilter<"MentorProfile"> | string
    expertise?: StringNullableListFilter<"MentorProfile">
    certifications?: StringNullableListFilter<"MentorProfile">
    pricePerSession?: FloatFilter<"MentorProfile"> | number
    rating?: FloatFilter<"MentorProfile"> | number
    totalReviews?: IntFilter<"MentorProfile"> | number
    verificationStatus?: EnumVerificationStatusFilter<"MentorProfile"> | $Enums.VerificationStatus
    verifiedBadge?: BoolFilter<"MentorProfile"> | boolean
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    slots?: SlotListRelationFilter
    feedbackGiven?: MentorFeedbackListRelationFilter
    earnings?: EarningsListRelationFilter
  }, "id" | "userId">

  export type MentorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    expertise?: SortOrder
    certifications?: SortOrder
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorProfileCountOrderByAggregateInput
    _avg?: MentorProfileAvgOrderByAggregateInput
    _max?: MentorProfileMaxOrderByAggregateInput
    _min?: MentorProfileMinOrderByAggregateInput
    _sum?: MentorProfileSumOrderByAggregateInput
  }

  export type MentorProfileScalarWhereWithAggregatesInput = {
    AND?: MentorProfileScalarWhereWithAggregatesInput | MentorProfileScalarWhereWithAggregatesInput[]
    OR?: MentorProfileScalarWhereWithAggregatesInput[]
    NOT?: MentorProfileScalarWhereWithAggregatesInput | MentorProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MentorProfile"> | string
    userId?: StringWithAggregatesFilter<"MentorProfile"> | string
    bio?: StringWithAggregatesFilter<"MentorProfile"> | string
    expertise?: StringNullableListFilter<"MentorProfile">
    certifications?: StringNullableListFilter<"MentorProfile">
    pricePerSession?: FloatWithAggregatesFilter<"MentorProfile"> | number
    rating?: FloatWithAggregatesFilter<"MentorProfile"> | number
    totalReviews?: IntWithAggregatesFilter<"MentorProfile"> | number
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"MentorProfile"> | $Enums.VerificationStatus
    verifiedBadge?: BoolWithAggregatesFilter<"MentorProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
  }

  export type MenteeProfileWhereInput = {
    AND?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    OR?: MenteeProfileWhereInput[]
    NOT?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    id?: StringFilter<"MenteeProfile"> | string
    userId?: StringFilter<"MenteeProfile"> | string
    dob?: DateTimeNullableFilter<"MenteeProfile"> | Date | string | null
    education10th?: StringNullableFilter<"MenteeProfile"> | string | null
    education12th?: StringNullableFilter<"MenteeProfile"> | string | null
    bachelors?: StringNullableFilter<"MenteeProfile"> | string | null
    masters?: StringNullableFilter<"MenteeProfile"> | string | null
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableListFilter<"MenteeProfile">
    catScore?: FloatNullableFilter<"MenteeProfile"> | number | null
    expectations?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    resumes?: ResumeListRelationFilter
    sopDocuments?: SOPDocumentListRelationFilter
  }

  export type MenteeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrderInput | SortOrder
    education10th?: SortOrderInput | SortOrder
    education12th?: SortOrderInput | SortOrder
    bachelors?: SortOrderInput | SortOrder
    masters?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrder
    catScore?: SortOrderInput | SortOrder
    expectations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    resumes?: ResumeOrderByRelationAggregateInput
    sopDocuments?: SOPDocumentOrderByRelationAggregateInput
  }

  export type MenteeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    OR?: MenteeProfileWhereInput[]
    NOT?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    dob?: DateTimeNullableFilter<"MenteeProfile"> | Date | string | null
    education10th?: StringNullableFilter<"MenteeProfile"> | string | null
    education12th?: StringNullableFilter<"MenteeProfile"> | string | null
    bachelors?: StringNullableFilter<"MenteeProfile"> | string | null
    masters?: StringNullableFilter<"MenteeProfile"> | string | null
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableListFilter<"MenteeProfile">
    catScore?: FloatNullableFilter<"MenteeProfile"> | number | null
    expectations?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    resumes?: ResumeListRelationFilter
    sopDocuments?: SOPDocumentListRelationFilter
  }, "id" | "userId">

  export type MenteeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrderInput | SortOrder
    education10th?: SortOrderInput | SortOrder
    education12th?: SortOrderInput | SortOrder
    bachelors?: SortOrderInput | SortOrder
    masters?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrder
    catScore?: SortOrderInput | SortOrder
    expectations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MenteeProfileCountOrderByAggregateInput
    _avg?: MenteeProfileAvgOrderByAggregateInput
    _max?: MenteeProfileMaxOrderByAggregateInput
    _min?: MenteeProfileMinOrderByAggregateInput
    _sum?: MenteeProfileSumOrderByAggregateInput
  }

  export type MenteeProfileScalarWhereWithAggregatesInput = {
    AND?: MenteeProfileScalarWhereWithAggregatesInput | MenteeProfileScalarWhereWithAggregatesInput[]
    OR?: MenteeProfileScalarWhereWithAggregatesInput[]
    NOT?: MenteeProfileScalarWhereWithAggregatesInput | MenteeProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MenteeProfile"> | string
    userId?: StringWithAggregatesFilter<"MenteeProfile"> | string
    dob?: DateTimeNullableWithAggregatesFilter<"MenteeProfile"> | Date | string | null
    education10th?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    education12th?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    bachelors?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    masters?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    workExperience?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableListFilter<"MenteeProfile">
    catScore?: FloatNullableWithAggregatesFilter<"MenteeProfile"> | number | null
    expectations?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    menteeId?: StringFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    mentee?: XOR<MenteeProfileRelationFilter, MenteeProfileWhereInput>
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    mentee?: MenteeProfileOrderByWithRelationInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    menteeId?: StringFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    mentee?: XOR<MenteeProfileRelationFilter, MenteeProfileWhereInput>
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    menteeId?: StringWithAggregatesFilter<"Resume"> | string
    name?: StringWithAggregatesFilter<"Resume"> | string
    fileUrl?: StringWithAggregatesFilter<"Resume"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type SOPDocumentWhereInput = {
    AND?: SOPDocumentWhereInput | SOPDocumentWhereInput[]
    OR?: SOPDocumentWhereInput[]
    NOT?: SOPDocumentWhereInput | SOPDocumentWhereInput[]
    id?: StringFilter<"SOPDocument"> | string
    menteeId?: StringFilter<"SOPDocument"> | string
    collegeName?: StringFilter<"SOPDocument"> | string
    fileUrl?: StringFilter<"SOPDocument"> | string
    createdAt?: DateTimeFilter<"SOPDocument"> | Date | string
    mentee?: XOR<MenteeProfileRelationFilter, MenteeProfileWhereInput>
  }

  export type SOPDocumentOrderByWithRelationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    collegeName?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    mentee?: MenteeProfileOrderByWithRelationInput
  }

  export type SOPDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SOPDocumentWhereInput | SOPDocumentWhereInput[]
    OR?: SOPDocumentWhereInput[]
    NOT?: SOPDocumentWhereInput | SOPDocumentWhereInput[]
    menteeId?: StringFilter<"SOPDocument"> | string
    collegeName?: StringFilter<"SOPDocument"> | string
    fileUrl?: StringFilter<"SOPDocument"> | string
    createdAt?: DateTimeFilter<"SOPDocument"> | Date | string
    mentee?: XOR<MenteeProfileRelationFilter, MenteeProfileWhereInput>
  }, "id">

  export type SOPDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    collegeName?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    _count?: SOPDocumentCountOrderByAggregateInput
    _max?: SOPDocumentMaxOrderByAggregateInput
    _min?: SOPDocumentMinOrderByAggregateInput
  }

  export type SOPDocumentScalarWhereWithAggregatesInput = {
    AND?: SOPDocumentScalarWhereWithAggregatesInput | SOPDocumentScalarWhereWithAggregatesInput[]
    OR?: SOPDocumentScalarWhereWithAggregatesInput[]
    NOT?: SOPDocumentScalarWhereWithAggregatesInput | SOPDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SOPDocument"> | string
    menteeId?: StringWithAggregatesFilter<"SOPDocument"> | string
    collegeName?: StringWithAggregatesFilter<"SOPDocument"> | string
    fileUrl?: StringWithAggregatesFilter<"SOPDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SOPDocument"> | Date | string
  }

  export type SlotWhereInput = {
    AND?: SlotWhereInput | SlotWhereInput[]
    OR?: SlotWhereInput[]
    NOT?: SlotWhereInput | SlotWhereInput[]
    id?: StringFilter<"Slot"> | string
    mentorId?: StringFilter<"Slot"> | string
    startTime?: DateTimeFilter<"Slot"> | Date | string
    endTime?: DateTimeFilter<"Slot"> | Date | string
    status?: EnumSlotStatusFilter<"Slot"> | $Enums.SlotStatus
    createdAt?: DateTimeFilter<"Slot"> | Date | string
    updatedAt?: DateTimeFilter<"Slot"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    booking?: XOR<BookingNullableRelationFilter, BookingWhereInput> | null
  }

  export type SlotOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentor?: MentorProfileOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
  }

  export type SlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mentorId_startTime_endTime?: SlotMentorIdStartTimeEndTimeCompoundUniqueInput
    AND?: SlotWhereInput | SlotWhereInput[]
    OR?: SlotWhereInput[]
    NOT?: SlotWhereInput | SlotWhereInput[]
    mentorId?: StringFilter<"Slot"> | string
    startTime?: DateTimeFilter<"Slot"> | Date | string
    endTime?: DateTimeFilter<"Slot"> | Date | string
    status?: EnumSlotStatusFilter<"Slot"> | $Enums.SlotStatus
    createdAt?: DateTimeFilter<"Slot"> | Date | string
    updatedAt?: DateTimeFilter<"Slot"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    booking?: XOR<BookingNullableRelationFilter, BookingWhereInput> | null
  }, "id" | "mentorId_startTime_endTime">

  export type SlotOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SlotCountOrderByAggregateInput
    _max?: SlotMaxOrderByAggregateInput
    _min?: SlotMinOrderByAggregateInput
  }

  export type SlotScalarWhereWithAggregatesInput = {
    AND?: SlotScalarWhereWithAggregatesInput | SlotScalarWhereWithAggregatesInput[]
    OR?: SlotScalarWhereWithAggregatesInput[]
    NOT?: SlotScalarWhereWithAggregatesInput | SlotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Slot"> | string
    mentorId?: StringWithAggregatesFilter<"Slot"> | string
    startTime?: DateTimeWithAggregatesFilter<"Slot"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Slot"> | Date | string
    status?: EnumSlotStatusWithAggregatesFilter<"Slot"> | $Enums.SlotStatus
    createdAt?: DateTimeWithAggregatesFilter<"Slot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Slot"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    mentorId?: StringFilter<"Booking"> | string
    menteeId?: StringFilter<"Booking"> | string
    slotId?: StringFilter<"Booking"> | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFilter<"Booking"> | $Enums.SessionMode
    sessionType?: EnumSessionTypeFilter<"Booking"> | $Enums.SessionType
    purpose?: StringFilter<"Booking"> | string
    meetingLink?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    mentor?: XOR<UserRelationFilter, UserWhereInput>
    mentee?: XOR<UserRelationFilter, UserWhereInput>
    slot?: XOR<SlotRelationFilter, SlotWhereInput>
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
    feedback?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    menteeId?: SortOrder
    slotId?: SortOrder
    status?: SortOrder
    sessionMode?: SortOrder
    sessionType?: SortOrder
    purpose?: SortOrder
    meetingLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentor?: UserOrderByWithRelationInput
    mentee?: UserOrderByWithRelationInput
    slot?: SlotOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
    feedback?: ReviewOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slotId?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    mentorId?: StringFilter<"Booking"> | string
    menteeId?: StringFilter<"Booking"> | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFilter<"Booking"> | $Enums.SessionMode
    sessionType?: EnumSessionTypeFilter<"Booking"> | $Enums.SessionType
    purpose?: StringFilter<"Booking"> | string
    meetingLink?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    mentor?: XOR<UserRelationFilter, UserWhereInput>
    mentee?: XOR<UserRelationFilter, UserWhereInput>
    slot?: XOR<SlotRelationFilter, SlotWhereInput>
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
    feedback?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }, "id" | "slotId">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    menteeId?: SortOrder
    slotId?: SortOrder
    status?: SortOrder
    sessionMode?: SortOrder
    sessionType?: SortOrder
    purpose?: SortOrder
    meetingLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    mentorId?: StringWithAggregatesFilter<"Booking"> | string
    menteeId?: StringWithAggregatesFilter<"Booking"> | string
    slotId?: StringWithAggregatesFilter<"Booking"> | string
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    sessionMode?: EnumSessionModeWithAggregatesFilter<"Booking"> | $Enums.SessionMode
    sessionType?: EnumSessionTypeWithAggregatesFilter<"Booking"> | $Enums.SessionType
    purpose?: StringWithAggregatesFilter<"Booking"> | string
    meetingLink?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    bookingId?: StringFilter<"Payment"> | string
    razorpayOrderId?: StringFilter<"Payment"> | string
    razorpayPaymentId?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    razorpayOrderId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    razorpayPaymentId?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }, "id" | "bookingId" | "razorpayOrderId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    bookingId?: StringWithAggregatesFilter<"Payment"> | string
    razorpayOrderId?: StringWithAggregatesFilter<"Payment"> | string
    razorpayPaymentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    bookingId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }, "id" | "bookingId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    bookingId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type MentorFeedbackWhereInput = {
    AND?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    OR?: MentorFeedbackWhereInput[]
    NOT?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    id?: StringFilter<"MentorFeedback"> | string
    mentorId?: StringFilter<"MentorFeedback"> | string
    bookingId?: StringFilter<"MentorFeedback"> | string
    feedbackPdfUrl?: StringNullableFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeFilter<"MentorFeedback"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type MentorFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    feedbackPdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    mentor?: MentorProfileOrderByWithRelationInput
  }

  export type MentorFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    OR?: MentorFeedbackWhereInput[]
    NOT?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    mentorId?: StringFilter<"MentorFeedback"> | string
    feedbackPdfUrl?: StringNullableFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeFilter<"MentorFeedback"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id" | "bookingId">

  export type MentorFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    feedbackPdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MentorFeedbackCountOrderByAggregateInput
    _max?: MentorFeedbackMaxOrderByAggregateInput
    _min?: MentorFeedbackMinOrderByAggregateInput
  }

  export type MentorFeedbackScalarWhereWithAggregatesInput = {
    AND?: MentorFeedbackScalarWhereWithAggregatesInput | MentorFeedbackScalarWhereWithAggregatesInput[]
    OR?: MentorFeedbackScalarWhereWithAggregatesInput[]
    NOT?: MentorFeedbackScalarWhereWithAggregatesInput | MentorFeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MentorFeedback"> | string
    mentorId?: StringWithAggregatesFilter<"MentorFeedback"> | string
    bookingId?: StringWithAggregatesFilter<"MentorFeedback"> | string
    feedbackPdfUrl?: StringNullableWithAggregatesFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MentorFeedback"> | Date | string
  }

  export type EarningsWhereInput = {
    AND?: EarningsWhereInput | EarningsWhereInput[]
    OR?: EarningsWhereInput[]
    NOT?: EarningsWhereInput | EarningsWhereInput[]
    id?: StringFilter<"Earnings"> | string
    mentorId?: StringFilter<"Earnings"> | string
    bookingId?: StringFilter<"Earnings"> | string
    amount?: FloatFilter<"Earnings"> | number
    createdAt?: DateTimeFilter<"Earnings"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type EarningsOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    mentor?: MentorProfileOrderByWithRelationInput
  }

  export type EarningsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: EarningsWhereInput | EarningsWhereInput[]
    OR?: EarningsWhereInput[]
    NOT?: EarningsWhereInput | EarningsWhereInput[]
    mentorId?: StringFilter<"Earnings"> | string
    amount?: FloatFilter<"Earnings"> | number
    createdAt?: DateTimeFilter<"Earnings"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id" | "bookingId">

  export type EarningsOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    _count?: EarningsCountOrderByAggregateInput
    _avg?: EarningsAvgOrderByAggregateInput
    _max?: EarningsMaxOrderByAggregateInput
    _min?: EarningsMinOrderByAggregateInput
    _sum?: EarningsSumOrderByAggregateInput
  }

  export type EarningsScalarWhereWithAggregatesInput = {
    AND?: EarningsScalarWhereWithAggregatesInput | EarningsScalarWhereWithAggregatesInput[]
    OR?: EarningsScalarWhereWithAggregatesInput[]
    NOT?: EarningsScalarWhereWithAggregatesInput | EarningsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Earnings"> | string
    mentorId?: StringWithAggregatesFilter<"Earnings"> | string
    bookingId?: StringWithAggregatesFilter<"Earnings"> | string
    amount?: FloatWithAggregatesFilter<"Earnings"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Earnings"> | Date | string
  }

  export type WebinarWhereInput = {
    AND?: WebinarWhereInput | WebinarWhereInput[]
    OR?: WebinarWhereInput[]
    NOT?: WebinarWhereInput | WebinarWhereInput[]
    id?: StringFilter<"Webinar"> | string
    title?: StringFilter<"Webinar"> | string
    description?: StringFilter<"Webinar"> | string
    price?: FloatNullableFilter<"Webinar"> | number | null
    type?: EnumWebinarTypeFilter<"Webinar"> | $Enums.WebinarType
    startTime?: DateTimeFilter<"Webinar"> | Date | string
    endTime?: DateTimeFilter<"Webinar"> | Date | string
    meetingLink?: StringNullableFilter<"Webinar"> | string | null
    createdAt?: DateTimeFilter<"Webinar"> | Date | string
    registrations?: WebinarRegistrationListRelationFilter
  }

  export type WebinarOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrderInput | SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    meetingLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    registrations?: WebinarRegistrationOrderByRelationAggregateInput
  }

  export type WebinarWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebinarWhereInput | WebinarWhereInput[]
    OR?: WebinarWhereInput[]
    NOT?: WebinarWhereInput | WebinarWhereInput[]
    title?: StringFilter<"Webinar"> | string
    description?: StringFilter<"Webinar"> | string
    price?: FloatNullableFilter<"Webinar"> | number | null
    type?: EnumWebinarTypeFilter<"Webinar"> | $Enums.WebinarType
    startTime?: DateTimeFilter<"Webinar"> | Date | string
    endTime?: DateTimeFilter<"Webinar"> | Date | string
    meetingLink?: StringNullableFilter<"Webinar"> | string | null
    createdAt?: DateTimeFilter<"Webinar"> | Date | string
    registrations?: WebinarRegistrationListRelationFilter
  }, "id">

  export type WebinarOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrderInput | SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    meetingLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WebinarCountOrderByAggregateInput
    _avg?: WebinarAvgOrderByAggregateInput
    _max?: WebinarMaxOrderByAggregateInput
    _min?: WebinarMinOrderByAggregateInput
    _sum?: WebinarSumOrderByAggregateInput
  }

  export type WebinarScalarWhereWithAggregatesInput = {
    AND?: WebinarScalarWhereWithAggregatesInput | WebinarScalarWhereWithAggregatesInput[]
    OR?: WebinarScalarWhereWithAggregatesInput[]
    NOT?: WebinarScalarWhereWithAggregatesInput | WebinarScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Webinar"> | string
    title?: StringWithAggregatesFilter<"Webinar"> | string
    description?: StringWithAggregatesFilter<"Webinar"> | string
    price?: FloatNullableWithAggregatesFilter<"Webinar"> | number | null
    type?: EnumWebinarTypeWithAggregatesFilter<"Webinar"> | $Enums.WebinarType
    startTime?: DateTimeWithAggregatesFilter<"Webinar"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Webinar"> | Date | string
    meetingLink?: StringNullableWithAggregatesFilter<"Webinar"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Webinar"> | Date | string
  }

  export type WebinarRegistrationWhereInput = {
    AND?: WebinarRegistrationWhereInput | WebinarRegistrationWhereInput[]
    OR?: WebinarRegistrationWhereInput[]
    NOT?: WebinarRegistrationWhereInput | WebinarRegistrationWhereInput[]
    id?: StringFilter<"WebinarRegistration"> | string
    webinarId?: StringFilter<"WebinarRegistration"> | string
    userId?: StringFilter<"WebinarRegistration"> | string
    paymentId?: StringNullableFilter<"WebinarRegistration"> | string | null
    createdAt?: DateTimeFilter<"WebinarRegistration"> | Date | string
    webinar?: XOR<WebinarRelationFilter, WebinarWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type WebinarRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    webinarId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    webinar?: WebinarOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WebinarRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebinarRegistrationWhereInput | WebinarRegistrationWhereInput[]
    OR?: WebinarRegistrationWhereInput[]
    NOT?: WebinarRegistrationWhereInput | WebinarRegistrationWhereInput[]
    webinarId?: StringFilter<"WebinarRegistration"> | string
    userId?: StringFilter<"WebinarRegistration"> | string
    paymentId?: StringNullableFilter<"WebinarRegistration"> | string | null
    createdAt?: DateTimeFilter<"WebinarRegistration"> | Date | string
    webinar?: XOR<WebinarRelationFilter, WebinarWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type WebinarRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    webinarId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WebinarRegistrationCountOrderByAggregateInput
    _max?: WebinarRegistrationMaxOrderByAggregateInput
    _min?: WebinarRegistrationMinOrderByAggregateInput
  }

  export type WebinarRegistrationScalarWhereWithAggregatesInput = {
    AND?: WebinarRegistrationScalarWhereWithAggregatesInput | WebinarRegistrationScalarWhereWithAggregatesInput[]
    OR?: WebinarRegistrationScalarWhereWithAggregatesInput[]
    NOT?: WebinarRegistrationScalarWhereWithAggregatesInput | WebinarRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebinarRegistration"> | string
    webinarId?: StringWithAggregatesFilter<"WebinarRegistration"> | string
    userId?: StringWithAggregatesFilter<"WebinarRegistration"> | string
    paymentId?: StringNullableWithAggregatesFilter<"WebinarRegistration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebinarRegistration"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type VerificationDocumentWhereInput = {
    AND?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    OR?: VerificationDocumentWhereInput[]
    NOT?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    id?: StringFilter<"VerificationDocument"> | string
    userId?: StringFilter<"VerificationDocument"> | string
    documentUrl?: StringFilter<"VerificationDocument"> | string
    status?: EnumVerificationStatusFilter<"VerificationDocument"> | $Enums.VerificationStatus
    createdAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type VerificationDocumentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    documentUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VerificationDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    OR?: VerificationDocumentWhereInput[]
    NOT?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    documentUrl?: StringFilter<"VerificationDocument"> | string
    status?: EnumVerificationStatusFilter<"VerificationDocument"> | $Enums.VerificationStatus
    createdAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type VerificationDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    documentUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: VerificationDocumentCountOrderByAggregateInput
    _max?: VerificationDocumentMaxOrderByAggregateInput
    _min?: VerificationDocumentMinOrderByAggregateInput
  }

  export type VerificationDocumentScalarWhereWithAggregatesInput = {
    AND?: VerificationDocumentScalarWhereWithAggregatesInput | VerificationDocumentScalarWhereWithAggregatesInput[]
    OR?: VerificationDocumentScalarWhereWithAggregatesInput[]
    NOT?: VerificationDocumentScalarWhereWithAggregatesInput | VerificationDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationDocument"> | string
    userId?: StringWithAggregatesFilter<"VerificationDocument"> | string
    documentUrl?: StringWithAggregatesFilter<"VerificationDocument"> | string
    status?: EnumVerificationStatusWithAggregatesFilter<"VerificationDocument"> | $Enums.VerificationStatus
    createdAt?: DateTimeWithAggregatesFilter<"VerificationDocument"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MentorProfileCreateInput = {
    id?: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    slots?: SlotCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
    earnings?: EarningsCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: SlotUncheckedCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
    earnings?: EarningsUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    slots?: SlotUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUncheckedUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileCreateManyInput = {
    id?: string
    userId: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileCreateInput = {
    id?: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
    resumes?: ResumeCreateNestedManyWithoutMenteeInput
    sopDocuments?: SOPDocumentCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUncheckedCreateInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeUncheckedCreateNestedManyWithoutMenteeInput
    sopDocuments?: SOPDocumentUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
    resumes?: ResumeUpdateManyWithoutMenteeNestedInput
    sopDocuments?: SOPDocumentUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUncheckedUpdateManyWithoutMenteeNestedInput
    sopDocuments?: SOPDocumentUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileCreateManyInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
    mentee: MenteeProfileCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    menteeId: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type ResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: MenteeProfileUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateManyInput = {
    id?: string
    menteeId: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOPDocumentCreateInput = {
    id?: string
    collegeName: string
    fileUrl: string
    createdAt?: Date | string
    mentee: MenteeProfileCreateNestedOneWithoutSopDocumentsInput
  }

  export type SOPDocumentUncheckedCreateInput = {
    id?: string
    menteeId: string
    collegeName: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type SOPDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: MenteeProfileUpdateOneRequiredWithoutSopDocumentsNestedInput
  }

  export type SOPDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOPDocumentCreateManyInput = {
    id?: string
    menteeId: string
    collegeName: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type SOPDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOPDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutSlotsInput
    booking?: BookingCreateNestedOneWithoutSlotInput
  }

  export type SlotUncheckedCreateInput = {
    id?: string
    mentorId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    booking?: BookingUncheckedCreateNestedOneWithoutSlotInput
  }

  export type SlotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutSlotsNestedInput
    booking?: BookingUpdateOneWithoutSlotNestedInput
  }

  export type SlotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUncheckedUpdateOneWithoutSlotNestedInput
  }

  export type SlotCreateManyInput = {
    id?: string
    mentorId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: UserCreateNestedOneWithoutBookingsAsMentorInput
    mentee: UserCreateNestedOneWithoutBookingsAsMenteeInput
    slot: SlotCreateNestedOneWithoutBookingInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    feedback?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    mentorId: string
    menteeId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    feedback?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: UserUpdateOneRequiredWithoutBookingsAsMentorNestedInput
    mentee?: UserUpdateOneRequiredWithoutBookingsAsMenteeNestedInput
    slot?: SlotUpdateOneRequiredWithoutBookingNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    mentorId: string
    menteeId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    bookingId: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    bookingId: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutFeedbackInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    bookingId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    bookingId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackCreateInput = {
    id?: string
    bookingId: string
    feedbackPdfUrl?: string | null
    createdAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutFeedbackGivenInput
  }

  export type MentorFeedbackUncheckedCreateInput = {
    id?: string
    mentorId: string
    bookingId: string
    feedbackPdfUrl?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutFeedbackGivenNestedInput
  }

  export type MentorFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackCreateManyInput = {
    id?: string
    mentorId: string
    bookingId: string
    feedbackPdfUrl?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarningsCreateInput = {
    id?: string
    bookingId: string
    amount: number
    createdAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutEarningsInput
  }

  export type EarningsUncheckedCreateInput = {
    id?: string
    mentorId: string
    bookingId: string
    amount: number
    createdAt?: Date | string
  }

  export type EarningsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutEarningsNestedInput
  }

  export type EarningsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarningsCreateManyInput = {
    id?: string
    mentorId: string
    bookingId: string
    amount: number
    createdAt?: Date | string
  }

  export type EarningsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarningsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarCreateInput = {
    id?: string
    title: string
    description: string
    price?: number | null
    type: $Enums.WebinarType
    startTime: Date | string
    endTime: Date | string
    meetingLink?: string | null
    createdAt?: Date | string
    registrations?: WebinarRegistrationCreateNestedManyWithoutWebinarInput
  }

  export type WebinarUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    price?: number | null
    type: $Enums.WebinarType
    startTime: Date | string
    endTime: Date | string
    meetingLink?: string | null
    createdAt?: Date | string
    registrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutWebinarInput
  }

  export type WebinarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    type?: EnumWebinarTypeFieldUpdateOperationsInput | $Enums.WebinarType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: WebinarRegistrationUpdateManyWithoutWebinarNestedInput
  }

  export type WebinarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    type?: EnumWebinarTypeFieldUpdateOperationsInput | $Enums.WebinarType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: WebinarRegistrationUncheckedUpdateManyWithoutWebinarNestedInput
  }

  export type WebinarCreateManyInput = {
    id?: string
    title: string
    description: string
    price?: number | null
    type: $Enums.WebinarType
    startTime: Date | string
    endTime: Date | string
    meetingLink?: string | null
    createdAt?: Date | string
  }

  export type WebinarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    type?: EnumWebinarTypeFieldUpdateOperationsInput | $Enums.WebinarType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    type?: EnumWebinarTypeFieldUpdateOperationsInput | $Enums.WebinarType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationCreateInput = {
    id?: string
    paymentId?: string | null
    createdAt?: Date | string
    webinar: WebinarCreateNestedOneWithoutRegistrationsInput
    user: UserCreateNestedOneWithoutWebinarRegistrationsInput
  }

  export type WebinarRegistrationUncheckedCreateInput = {
    id?: string
    webinarId: string
    userId: string
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type WebinarRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webinar?: WebinarUpdateOneRequiredWithoutRegistrationsNestedInput
    user?: UserUpdateOneRequiredWithoutWebinarRegistrationsNestedInput
  }

  export type WebinarRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webinarId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationCreateManyInput = {
    id?: string
    webinarId: string
    userId: string
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type WebinarRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    webinarId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationDocumentCreateInput = {
    id?: string
    documentUrl: string
    status?: $Enums.VerificationStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVerificationInput
  }

  export type VerificationDocumentUncheckedCreateInput = {
    id?: string
    userId: string
    documentUrl: string
    status?: $Enums.VerificationStatus
    createdAt?: Date | string
  }

  export type VerificationDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVerificationNestedInput
  }

  export type VerificationDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    documentUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationDocumentCreateManyInput = {
    id?: string
    userId: string
    documentUrl: string
    status?: $Enums.VerificationStatus
    createdAt?: Date | string
  }

  export type VerificationDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    documentUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MentorProfileNullableRelationFilter = {
    is?: MentorProfileWhereInput | null
    isNot?: MentorProfileWhereInput | null
  }

  export type MenteeProfileNullableRelationFilter = {
    is?: MenteeProfileWhereInput | null
    isNot?: MenteeProfileWhereInput | null
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type VerificationDocumentNullableRelationFilter = {
    is?: VerificationDocumentWhereInput | null
    isNot?: VerificationDocumentWhereInput | null
  }

  export type WebinarRegistrationListRelationFilter = {
    every?: WebinarRegistrationWhereInput
    some?: WebinarRegistrationWhereInput
    none?: WebinarRegistrationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebinarRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SlotListRelationFilter = {
    every?: SlotWhereInput
    some?: SlotWhereInput
    none?: SlotWhereInput
  }

  export type MentorFeedbackListRelationFilter = {
    every?: MentorFeedbackWhereInput
    some?: MentorFeedbackWhereInput
    none?: MentorFeedbackWhereInput
  }

  export type EarningsListRelationFilter = {
    every?: EarningsWhereInput
    some?: EarningsWhereInput
    none?: EarningsWhereInput
  }

  export type SlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EarningsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    expertise?: SortOrder
    certifications?: SortOrder
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileAvgOrderByAggregateInput = {
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
  }

  export type MentorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileSumOrderByAggregateInput = {
    pricePerSession?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type SOPDocumentListRelationFilter = {
    every?: SOPDocumentWhereInput
    some?: SOPDocumentWhereInput
    none?: SOPDocumentWhereInput
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SOPDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenteeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrder
    education10th?: SortOrder
    education12th?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    catScore?: SortOrder
    expectations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileAvgOrderByAggregateInput = {
    catScore?: SortOrder
  }

  export type MenteeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrder
    education10th?: SortOrder
    education12th?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrder
    catScore?: SortOrder
    expectations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrder
    education10th?: SortOrder
    education12th?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrder
    catScore?: SortOrder
    expectations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileSumOrderByAggregateInput = {
    catScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type MenteeProfileRelationFilter = {
    is?: MenteeProfileWhereInput
    isNot?: MenteeProfileWhereInput
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type SOPDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    collegeName?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type SOPDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    collegeName?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type SOPDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    collegeName?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSlotStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotStatus | EnumSlotStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotStatusFilter<$PrismaModel> | $Enums.SlotStatus
  }

  export type MentorProfileRelationFilter = {
    is?: MentorProfileWhereInput
    isNot?: MentorProfileWhereInput
  }

  export type BookingNullableRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type SlotMentorIdStartTimeEndTimeCompoundUniqueInput = {
    mentorId: string
    startTime: Date | string
    endTime: Date | string
  }

  export type SlotCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlotMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SlotMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSlotStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotStatus | EnumSlotStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotStatusWithAggregatesFilter<$PrismaModel> | $Enums.SlotStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSlotStatusFilter<$PrismaModel>
    _max?: NestedEnumSlotStatusFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type EnumSessionModeFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionMode | EnumSessionModeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionModeFilter<$PrismaModel> | $Enums.SessionMode
  }

  export type EnumSessionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionType | EnumSessionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypeFilter<$PrismaModel> | $Enums.SessionType
  }

  export type SlotRelationFilter = {
    is?: SlotWhereInput
    isNot?: SlotWhereInput
  }

  export type PaymentNullableRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type ReviewNullableRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    menteeId?: SortOrder
    slotId?: SortOrder
    status?: SortOrder
    sessionMode?: SortOrder
    sessionType?: SortOrder
    purpose?: SortOrder
    meetingLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    menteeId?: SortOrder
    slotId?: SortOrder
    status?: SortOrder
    sessionMode?: SortOrder
    sessionType?: SortOrder
    purpose?: SortOrder
    meetingLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    menteeId?: SortOrder
    slotId?: SortOrder
    status?: SortOrder
    sessionMode?: SortOrder
    sessionType?: SortOrder
    purpose?: SortOrder
    meetingLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumSessionModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionMode | EnumSessionModeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionModeWithAggregatesFilter<$PrismaModel> | $Enums.SessionMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionModeFilter<$PrismaModel>
    _max?: NestedEnumSessionModeFilter<$PrismaModel>
  }

  export type EnumSessionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionType | EnumSessionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SessionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionTypeFilter<$PrismaModel>
    _max?: NestedEnumSessionTypeFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type BookingRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type MentorFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    feedbackPdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    feedbackPdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    feedbackPdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type EarningsCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type EarningsAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EarningsMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type EarningsMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type EarningsSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumWebinarTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WebinarType | EnumWebinarTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWebinarTypeFilter<$PrismaModel> | $Enums.WebinarType
  }

  export type WebinarCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    meetingLink?: SortOrder
    createdAt?: SortOrder
  }

  export type WebinarAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type WebinarMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    meetingLink?: SortOrder
    createdAt?: SortOrder
  }

  export type WebinarMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    type?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    meetingLink?: SortOrder
    createdAt?: SortOrder
  }

  export type WebinarSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumWebinarTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebinarType | EnumWebinarTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWebinarTypeWithAggregatesFilter<$PrismaModel> | $Enums.WebinarType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebinarTypeFilter<$PrismaModel>
    _max?: NestedEnumWebinarTypeFilter<$PrismaModel>
  }

  export type WebinarRelationFilter = {
    is?: WebinarWhereInput
    isNot?: WebinarWhereInput
  }

  export type WebinarRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    webinarId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type WebinarRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    webinarId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type WebinarRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    webinarId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MenteeProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutUserInput
    connect?: MenteeProfileWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutMentorInput = {
    create?: XOR<BookingCreateWithoutMentorInput, BookingUncheckedCreateWithoutMentorInput> | BookingCreateWithoutMentorInput[] | BookingUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorInput | BookingCreateOrConnectWithoutMentorInput[]
    createMany?: BookingCreateManyMentorInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutMenteeInput = {
    create?: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput> | BookingCreateWithoutMenteeInput[] | BookingUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMenteeInput | BookingCreateOrConnectWithoutMenteeInput[]
    createMany?: BookingCreateManyMenteeInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type VerificationDocumentCreateNestedOneWithoutUserInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput
    connect?: VerificationDocumentWhereUniqueInput
  }

  export type WebinarRegistrationCreateNestedManyWithoutUserInput = {
    create?: XOR<WebinarRegistrationCreateWithoutUserInput, WebinarRegistrationUncheckedCreateWithoutUserInput> | WebinarRegistrationCreateWithoutUserInput[] | WebinarRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutUserInput | WebinarRegistrationCreateOrConnectWithoutUserInput[]
    createMany?: WebinarRegistrationCreateManyUserInputEnvelope
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
  }

  export type MentorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MenteeProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutUserInput
    connect?: MenteeProfileWhereUniqueInput
  }

  export type BookingUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<BookingCreateWithoutMentorInput, BookingUncheckedCreateWithoutMentorInput> | BookingCreateWithoutMentorInput[] | BookingUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorInput | BookingCreateOrConnectWithoutMentorInput[]
    createMany?: BookingCreateManyMentorInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutMenteeInput = {
    create?: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput> | BookingCreateWithoutMenteeInput[] | BookingUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMenteeInput | BookingCreateOrConnectWithoutMenteeInput[]
    createMany?: BookingCreateManyMenteeInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type VerificationDocumentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput
    connect?: VerificationDocumentWhereUniqueInput
  }

  export type WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WebinarRegistrationCreateWithoutUserInput, WebinarRegistrationUncheckedCreateWithoutUserInput> | WebinarRegistrationCreateWithoutUserInput[] | WebinarRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutUserInput | WebinarRegistrationCreateOrConnectWithoutUserInput[]
    createMany?: WebinarRegistrationCreateManyUserInputEnvelope
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MentorProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    upsert?: MentorProfileUpsertWithoutUserInput
    disconnect?: MentorProfileWhereInput | boolean
    delete?: MentorProfileWhereInput | boolean
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutUserInput, MentorProfileUpdateWithoutUserInput>, MentorProfileUncheckedUpdateWithoutUserInput>
  }

  export type MenteeProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutUserInput
    upsert?: MenteeProfileUpsertWithoutUserInput
    disconnect?: MenteeProfileWhereInput | boolean
    delete?: MenteeProfileWhereInput | boolean
    connect?: MenteeProfileWhereUniqueInput
    update?: XOR<XOR<MenteeProfileUpdateToOneWithWhereWithoutUserInput, MenteeProfileUpdateWithoutUserInput>, MenteeProfileUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithoutMentorNestedInput = {
    create?: XOR<BookingCreateWithoutMentorInput, BookingUncheckedCreateWithoutMentorInput> | BookingCreateWithoutMentorInput[] | BookingUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorInput | BookingCreateOrConnectWithoutMentorInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMentorInput | BookingUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: BookingCreateManyMentorInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMentorInput | BookingUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMentorInput | BookingUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput> | BookingCreateWithoutMenteeInput[] | BookingUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMenteeInput | BookingCreateOrConnectWithoutMenteeInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMenteeInput | BookingUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: BookingCreateManyMenteeInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMenteeInput | BookingUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMenteeInput | BookingUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type VerificationDocumentUpdateOneWithoutUserNestedInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput
    upsert?: VerificationDocumentUpsertWithoutUserInput
    disconnect?: VerificationDocumentWhereInput | boolean
    delete?: VerificationDocumentWhereInput | boolean
    connect?: VerificationDocumentWhereUniqueInput
    update?: XOR<XOR<VerificationDocumentUpdateToOneWithWhereWithoutUserInput, VerificationDocumentUpdateWithoutUserInput>, VerificationDocumentUncheckedUpdateWithoutUserInput>
  }

  export type WebinarRegistrationUpdateManyWithoutUserNestedInput = {
    create?: XOR<WebinarRegistrationCreateWithoutUserInput, WebinarRegistrationUncheckedCreateWithoutUserInput> | WebinarRegistrationCreateWithoutUserInput[] | WebinarRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutUserInput | WebinarRegistrationCreateOrConnectWithoutUserInput[]
    upsert?: WebinarRegistrationUpsertWithWhereUniqueWithoutUserInput | WebinarRegistrationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WebinarRegistrationCreateManyUserInputEnvelope
    set?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    disconnect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    delete?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    update?: WebinarRegistrationUpdateWithWhereUniqueWithoutUserInput | WebinarRegistrationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WebinarRegistrationUpdateManyWithWhereWithoutUserInput | WebinarRegistrationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WebinarRegistrationScalarWhereInput | WebinarRegistrationScalarWhereInput[]
  }

  export type MentorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    upsert?: MentorProfileUpsertWithoutUserInput
    disconnect?: MentorProfileWhereInput | boolean
    delete?: MentorProfileWhereInput | boolean
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutUserInput, MentorProfileUpdateWithoutUserInput>, MentorProfileUncheckedUpdateWithoutUserInput>
  }

  export type MenteeProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutUserInput
    upsert?: MenteeProfileUpsertWithoutUserInput
    disconnect?: MenteeProfileWhereInput | boolean
    delete?: MenteeProfileWhereInput | boolean
    connect?: MenteeProfileWhereUniqueInput
    update?: XOR<XOR<MenteeProfileUpdateToOneWithWhereWithoutUserInput, MenteeProfileUpdateWithoutUserInput>, MenteeProfileUncheckedUpdateWithoutUserInput>
  }

  export type BookingUncheckedUpdateManyWithoutMentorNestedInput = {
    create?: XOR<BookingCreateWithoutMentorInput, BookingUncheckedCreateWithoutMentorInput> | BookingCreateWithoutMentorInput[] | BookingUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorInput | BookingCreateOrConnectWithoutMentorInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMentorInput | BookingUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: BookingCreateManyMentorInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMentorInput | BookingUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMentorInput | BookingUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput> | BookingCreateWithoutMenteeInput[] | BookingUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMenteeInput | BookingCreateOrConnectWithoutMenteeInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMenteeInput | BookingUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: BookingCreateManyMenteeInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMenteeInput | BookingUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMenteeInput | BookingUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput
    upsert?: VerificationDocumentUpsertWithoutUserInput
    disconnect?: VerificationDocumentWhereInput | boolean
    delete?: VerificationDocumentWhereInput | boolean
    connect?: VerificationDocumentWhereUniqueInput
    update?: XOR<XOR<VerificationDocumentUpdateToOneWithWhereWithoutUserInput, VerificationDocumentUpdateWithoutUserInput>, VerificationDocumentUncheckedUpdateWithoutUserInput>
  }

  export type WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WebinarRegistrationCreateWithoutUserInput, WebinarRegistrationUncheckedCreateWithoutUserInput> | WebinarRegistrationCreateWithoutUserInput[] | WebinarRegistrationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutUserInput | WebinarRegistrationCreateOrConnectWithoutUserInput[]
    upsert?: WebinarRegistrationUpsertWithWhereUniqueWithoutUserInput | WebinarRegistrationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WebinarRegistrationCreateManyUserInputEnvelope
    set?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    disconnect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    delete?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    update?: WebinarRegistrationUpdateWithWhereUniqueWithoutUserInput | WebinarRegistrationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WebinarRegistrationUpdateManyWithWhereWithoutUserInput | WebinarRegistrationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WebinarRegistrationScalarWhereInput | WebinarRegistrationScalarWhereInput[]
  }

  export type MentorProfileCreateexpertiseInput = {
    set: string[]
  }

  export type MentorProfileCreatecertificationsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMentorProfileInput = {
    create?: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorProfileInput
    connect?: UserWhereUniqueInput
  }

  export type SlotCreateNestedManyWithoutMentorInput = {
    create?: XOR<SlotCreateWithoutMentorInput, SlotUncheckedCreateWithoutMentorInput> | SlotCreateWithoutMentorInput[] | SlotUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutMentorInput | SlotCreateOrConnectWithoutMentorInput[]
    createMany?: SlotCreateManyMentorInputEnvelope
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
  }

  export type MentorFeedbackCreateNestedManyWithoutMentorInput = {
    create?: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput> | MentorFeedbackCreateWithoutMentorInput[] | MentorFeedbackUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorFeedbackCreateOrConnectWithoutMentorInput | MentorFeedbackCreateOrConnectWithoutMentorInput[]
    createMany?: MentorFeedbackCreateManyMentorInputEnvelope
    connect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
  }

  export type EarningsCreateNestedManyWithoutMentorInput = {
    create?: XOR<EarningsCreateWithoutMentorInput, EarningsUncheckedCreateWithoutMentorInput> | EarningsCreateWithoutMentorInput[] | EarningsUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: EarningsCreateOrConnectWithoutMentorInput | EarningsCreateOrConnectWithoutMentorInput[]
    createMany?: EarningsCreateManyMentorInputEnvelope
    connect?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
  }

  export type SlotUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<SlotCreateWithoutMentorInput, SlotUncheckedCreateWithoutMentorInput> | SlotCreateWithoutMentorInput[] | SlotUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutMentorInput | SlotCreateOrConnectWithoutMentorInput[]
    createMany?: SlotCreateManyMentorInputEnvelope
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
  }

  export type MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput> | MentorFeedbackCreateWithoutMentorInput[] | MentorFeedbackUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorFeedbackCreateOrConnectWithoutMentorInput | MentorFeedbackCreateOrConnectWithoutMentorInput[]
    createMany?: MentorFeedbackCreateManyMentorInputEnvelope
    connect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
  }

  export type EarningsUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<EarningsCreateWithoutMentorInput, EarningsUncheckedCreateWithoutMentorInput> | EarningsCreateWithoutMentorInput[] | EarningsUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: EarningsCreateOrConnectWithoutMentorInput | EarningsCreateOrConnectWithoutMentorInput[]
    createMany?: EarningsCreateManyMentorInputEnvelope
    connect?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
  }

  export type MentorProfileUpdateexpertiseInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorProfileUpdatecertificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type UserUpdateOneRequiredWithoutMentorProfileNestedInput = {
    create?: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorProfileInput
    upsert?: UserUpsertWithoutMentorProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMentorProfileInput, UserUpdateWithoutMentorProfileInput>, UserUncheckedUpdateWithoutMentorProfileInput>
  }

  export type SlotUpdateManyWithoutMentorNestedInput = {
    create?: XOR<SlotCreateWithoutMentorInput, SlotUncheckedCreateWithoutMentorInput> | SlotCreateWithoutMentorInput[] | SlotUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutMentorInput | SlotCreateOrConnectWithoutMentorInput[]
    upsert?: SlotUpsertWithWhereUniqueWithoutMentorInput | SlotUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: SlotCreateManyMentorInputEnvelope
    set?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    disconnect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    delete?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    update?: SlotUpdateWithWhereUniqueWithoutMentorInput | SlotUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: SlotUpdateManyWithWhereWithoutMentorInput | SlotUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: SlotScalarWhereInput | SlotScalarWhereInput[]
  }

  export type MentorFeedbackUpdateManyWithoutMentorNestedInput = {
    create?: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput> | MentorFeedbackCreateWithoutMentorInput[] | MentorFeedbackUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorFeedbackCreateOrConnectWithoutMentorInput | MentorFeedbackCreateOrConnectWithoutMentorInput[]
    upsert?: MentorFeedbackUpsertWithWhereUniqueWithoutMentorInput | MentorFeedbackUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: MentorFeedbackCreateManyMentorInputEnvelope
    set?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    disconnect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    delete?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    connect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    update?: MentorFeedbackUpdateWithWhereUniqueWithoutMentorInput | MentorFeedbackUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: MentorFeedbackUpdateManyWithWhereWithoutMentorInput | MentorFeedbackUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: MentorFeedbackScalarWhereInput | MentorFeedbackScalarWhereInput[]
  }

  export type EarningsUpdateManyWithoutMentorNestedInput = {
    create?: XOR<EarningsCreateWithoutMentorInput, EarningsUncheckedCreateWithoutMentorInput> | EarningsCreateWithoutMentorInput[] | EarningsUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: EarningsCreateOrConnectWithoutMentorInput | EarningsCreateOrConnectWithoutMentorInput[]
    upsert?: EarningsUpsertWithWhereUniqueWithoutMentorInput | EarningsUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: EarningsCreateManyMentorInputEnvelope
    set?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    disconnect?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    delete?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    connect?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    update?: EarningsUpdateWithWhereUniqueWithoutMentorInput | EarningsUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: EarningsUpdateManyWithWhereWithoutMentorInput | EarningsUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: EarningsScalarWhereInput | EarningsScalarWhereInput[]
  }

  export type SlotUncheckedUpdateManyWithoutMentorNestedInput = {
    create?: XOR<SlotCreateWithoutMentorInput, SlotUncheckedCreateWithoutMentorInput> | SlotCreateWithoutMentorInput[] | SlotUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: SlotCreateOrConnectWithoutMentorInput | SlotCreateOrConnectWithoutMentorInput[]
    upsert?: SlotUpsertWithWhereUniqueWithoutMentorInput | SlotUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: SlotCreateManyMentorInputEnvelope
    set?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    disconnect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    delete?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    connect?: SlotWhereUniqueInput | SlotWhereUniqueInput[]
    update?: SlotUpdateWithWhereUniqueWithoutMentorInput | SlotUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: SlotUpdateManyWithWhereWithoutMentorInput | SlotUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: SlotScalarWhereInput | SlotScalarWhereInput[]
  }

  export type MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput = {
    create?: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput> | MentorFeedbackCreateWithoutMentorInput[] | MentorFeedbackUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorFeedbackCreateOrConnectWithoutMentorInput | MentorFeedbackCreateOrConnectWithoutMentorInput[]
    upsert?: MentorFeedbackUpsertWithWhereUniqueWithoutMentorInput | MentorFeedbackUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: MentorFeedbackCreateManyMentorInputEnvelope
    set?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    disconnect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    delete?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    connect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
    update?: MentorFeedbackUpdateWithWhereUniqueWithoutMentorInput | MentorFeedbackUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: MentorFeedbackUpdateManyWithWhereWithoutMentorInput | MentorFeedbackUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: MentorFeedbackScalarWhereInput | MentorFeedbackScalarWhereInput[]
  }

  export type EarningsUncheckedUpdateManyWithoutMentorNestedInput = {
    create?: XOR<EarningsCreateWithoutMentorInput, EarningsUncheckedCreateWithoutMentorInput> | EarningsCreateWithoutMentorInput[] | EarningsUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: EarningsCreateOrConnectWithoutMentorInput | EarningsCreateOrConnectWithoutMentorInput[]
    upsert?: EarningsUpsertWithWhereUniqueWithoutMentorInput | EarningsUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: EarningsCreateManyMentorInputEnvelope
    set?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    disconnect?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    delete?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    connect?: EarningsWhereUniqueInput | EarningsWhereUniqueInput[]
    update?: EarningsUpdateWithWhereUniqueWithoutMentorInput | EarningsUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: EarningsUpdateManyWithWhereWithoutMentorInput | EarningsUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: EarningsScalarWhereInput | EarningsScalarWhereInput[]
  }

  export type MenteeProfileCreatecertificationsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMenteeProfileInput = {
    create?: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ResumeCreateNestedManyWithoutMenteeInput = {
    create?: XOR<ResumeCreateWithoutMenteeInput, ResumeUncheckedCreateWithoutMenteeInput> | ResumeCreateWithoutMenteeInput[] | ResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutMenteeInput | ResumeCreateOrConnectWithoutMenteeInput[]
    createMany?: ResumeCreateManyMenteeInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type SOPDocumentCreateNestedManyWithoutMenteeInput = {
    create?: XOR<SOPDocumentCreateWithoutMenteeInput, SOPDocumentUncheckedCreateWithoutMenteeInput> | SOPDocumentCreateWithoutMenteeInput[] | SOPDocumentUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: SOPDocumentCreateOrConnectWithoutMenteeInput | SOPDocumentCreateOrConnectWithoutMenteeInput[]
    createMany?: SOPDocumentCreateManyMenteeInputEnvelope
    connect?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutMenteeInput = {
    create?: XOR<ResumeCreateWithoutMenteeInput, ResumeUncheckedCreateWithoutMenteeInput> | ResumeCreateWithoutMenteeInput[] | ResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutMenteeInput | ResumeCreateOrConnectWithoutMenteeInput[]
    createMany?: ResumeCreateManyMenteeInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type SOPDocumentUncheckedCreateNestedManyWithoutMenteeInput = {
    create?: XOR<SOPDocumentCreateWithoutMenteeInput, SOPDocumentUncheckedCreateWithoutMenteeInput> | SOPDocumentCreateWithoutMenteeInput[] | SOPDocumentUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: SOPDocumentCreateOrConnectWithoutMenteeInput | SOPDocumentCreateOrConnectWithoutMenteeInput[]
    createMany?: SOPDocumentCreateManyMenteeInputEnvelope
    connect?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
  }

  export type MenteeProfileUpdatecertificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMenteeProfileNestedInput = {
    create?: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeProfileInput
    upsert?: UserUpsertWithoutMenteeProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMenteeProfileInput, UserUpdateWithoutMenteeProfileInput>, UserUncheckedUpdateWithoutMenteeProfileInput>
  }

  export type ResumeUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<ResumeCreateWithoutMenteeInput, ResumeUncheckedCreateWithoutMenteeInput> | ResumeCreateWithoutMenteeInput[] | ResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutMenteeInput | ResumeCreateOrConnectWithoutMenteeInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutMenteeInput | ResumeUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: ResumeCreateManyMenteeInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutMenteeInput | ResumeUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutMenteeInput | ResumeUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type SOPDocumentUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<SOPDocumentCreateWithoutMenteeInput, SOPDocumentUncheckedCreateWithoutMenteeInput> | SOPDocumentCreateWithoutMenteeInput[] | SOPDocumentUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: SOPDocumentCreateOrConnectWithoutMenteeInput | SOPDocumentCreateOrConnectWithoutMenteeInput[]
    upsert?: SOPDocumentUpsertWithWhereUniqueWithoutMenteeInput | SOPDocumentUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: SOPDocumentCreateManyMenteeInputEnvelope
    set?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    disconnect?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    delete?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    connect?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    update?: SOPDocumentUpdateWithWhereUniqueWithoutMenteeInput | SOPDocumentUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: SOPDocumentUpdateManyWithWhereWithoutMenteeInput | SOPDocumentUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: SOPDocumentScalarWhereInput | SOPDocumentScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<ResumeCreateWithoutMenteeInput, ResumeUncheckedCreateWithoutMenteeInput> | ResumeCreateWithoutMenteeInput[] | ResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutMenteeInput | ResumeCreateOrConnectWithoutMenteeInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutMenteeInput | ResumeUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: ResumeCreateManyMenteeInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutMenteeInput | ResumeUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutMenteeInput | ResumeUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type SOPDocumentUncheckedUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<SOPDocumentCreateWithoutMenteeInput, SOPDocumentUncheckedCreateWithoutMenteeInput> | SOPDocumentCreateWithoutMenteeInput[] | SOPDocumentUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: SOPDocumentCreateOrConnectWithoutMenteeInput | SOPDocumentCreateOrConnectWithoutMenteeInput[]
    upsert?: SOPDocumentUpsertWithWhereUniqueWithoutMenteeInput | SOPDocumentUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: SOPDocumentCreateManyMenteeInputEnvelope
    set?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    disconnect?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    delete?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    connect?: SOPDocumentWhereUniqueInput | SOPDocumentWhereUniqueInput[]
    update?: SOPDocumentUpdateWithWhereUniqueWithoutMenteeInput | SOPDocumentUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: SOPDocumentUpdateManyWithWhereWithoutMenteeInput | SOPDocumentUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: SOPDocumentScalarWhereInput | SOPDocumentScalarWhereInput[]
  }

  export type MenteeProfileCreateNestedOneWithoutResumesInput = {
    create?: XOR<MenteeProfileCreateWithoutResumesInput, MenteeProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutResumesInput
    connect?: MenteeProfileWhereUniqueInput
  }

  export type MenteeProfileUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<MenteeProfileCreateWithoutResumesInput, MenteeProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutResumesInput
    upsert?: MenteeProfileUpsertWithoutResumesInput
    connect?: MenteeProfileWhereUniqueInput
    update?: XOR<XOR<MenteeProfileUpdateToOneWithWhereWithoutResumesInput, MenteeProfileUpdateWithoutResumesInput>, MenteeProfileUncheckedUpdateWithoutResumesInput>
  }

  export type MenteeProfileCreateNestedOneWithoutSopDocumentsInput = {
    create?: XOR<MenteeProfileCreateWithoutSopDocumentsInput, MenteeProfileUncheckedCreateWithoutSopDocumentsInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutSopDocumentsInput
    connect?: MenteeProfileWhereUniqueInput
  }

  export type MenteeProfileUpdateOneRequiredWithoutSopDocumentsNestedInput = {
    create?: XOR<MenteeProfileCreateWithoutSopDocumentsInput, MenteeProfileUncheckedCreateWithoutSopDocumentsInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutSopDocumentsInput
    upsert?: MenteeProfileUpsertWithoutSopDocumentsInput
    connect?: MenteeProfileWhereUniqueInput
    update?: XOR<XOR<MenteeProfileUpdateToOneWithWhereWithoutSopDocumentsInput, MenteeProfileUpdateWithoutSopDocumentsInput>, MenteeProfileUncheckedUpdateWithoutSopDocumentsInput>
  }

  export type MentorProfileCreateNestedOneWithoutSlotsInput = {
    create?: XOR<MentorProfileCreateWithoutSlotsInput, MentorProfileUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutSlotsInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutSlotInput = {
    create?: XOR<BookingCreateWithoutSlotInput, BookingUncheckedCreateWithoutSlotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutSlotInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingUncheckedCreateNestedOneWithoutSlotInput = {
    create?: XOR<BookingCreateWithoutSlotInput, BookingUncheckedCreateWithoutSlotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutSlotInput
    connect?: BookingWhereUniqueInput
  }

  export type EnumSlotStatusFieldUpdateOperationsInput = {
    set?: $Enums.SlotStatus
  }

  export type MentorProfileUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: XOR<MentorProfileCreateWithoutSlotsInput, MentorProfileUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutSlotsInput
    upsert?: MentorProfileUpsertWithoutSlotsInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutSlotsInput, MentorProfileUpdateWithoutSlotsInput>, MentorProfileUncheckedUpdateWithoutSlotsInput>
  }

  export type BookingUpdateOneWithoutSlotNestedInput = {
    create?: XOR<BookingCreateWithoutSlotInput, BookingUncheckedCreateWithoutSlotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutSlotInput
    upsert?: BookingUpsertWithoutSlotInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutSlotInput, BookingUpdateWithoutSlotInput>, BookingUncheckedUpdateWithoutSlotInput>
  }

  export type BookingUncheckedUpdateOneWithoutSlotNestedInput = {
    create?: XOR<BookingCreateWithoutSlotInput, BookingUncheckedCreateWithoutSlotInput>
    connectOrCreate?: BookingCreateOrConnectWithoutSlotInput
    upsert?: BookingUpsertWithoutSlotInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutSlotInput, BookingUpdateWithoutSlotInput>, BookingUncheckedUpdateWithoutSlotInput>
  }

  export type UserCreateNestedOneWithoutBookingsAsMentorInput = {
    create?: XOR<UserCreateWithoutBookingsAsMentorInput, UserUncheckedCreateWithoutBookingsAsMentorInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsAsMentorInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBookingsAsMenteeInput = {
    create?: XOR<UserCreateWithoutBookingsAsMenteeInput, UserUncheckedCreateWithoutBookingsAsMenteeInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsAsMenteeInput
    connect?: UserWhereUniqueInput
  }

  export type SlotCreateNestedOneWithoutBookingInput = {
    create?: XOR<SlotCreateWithoutBookingInput, SlotUncheckedCreateWithoutBookingInput>
    connectOrCreate?: SlotCreateOrConnectWithoutBookingInput
    connect?: SlotWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutBookingInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    connect?: PaymentWhereUniqueInput
  }

  export type ReviewCreateNestedOneWithoutBookingInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    connect?: ReviewWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    connect?: PaymentWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    connect?: ReviewWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type EnumSessionModeFieldUpdateOperationsInput = {
    set?: $Enums.SessionMode
  }

  export type EnumSessionTypeFieldUpdateOperationsInput = {
    set?: $Enums.SessionType
  }

  export type UserUpdateOneRequiredWithoutBookingsAsMentorNestedInput = {
    create?: XOR<UserCreateWithoutBookingsAsMentorInput, UserUncheckedCreateWithoutBookingsAsMentorInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsAsMentorInput
    upsert?: UserUpsertWithoutBookingsAsMentorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsAsMentorInput, UserUpdateWithoutBookingsAsMentorInput>, UserUncheckedUpdateWithoutBookingsAsMentorInput>
  }

  export type UserUpdateOneRequiredWithoutBookingsAsMenteeNestedInput = {
    create?: XOR<UserCreateWithoutBookingsAsMenteeInput, UserUncheckedCreateWithoutBookingsAsMenteeInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsAsMenteeInput
    upsert?: UserUpsertWithoutBookingsAsMenteeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsAsMenteeInput, UserUpdateWithoutBookingsAsMenteeInput>, UserUncheckedUpdateWithoutBookingsAsMenteeInput>
  }

  export type SlotUpdateOneRequiredWithoutBookingNestedInput = {
    create?: XOR<SlotCreateWithoutBookingInput, SlotUncheckedCreateWithoutBookingInput>
    connectOrCreate?: SlotCreateOrConnectWithoutBookingInput
    upsert?: SlotUpsertWithoutBookingInput
    connect?: SlotWhereUniqueInput
    update?: XOR<XOR<SlotUpdateToOneWithWhereWithoutBookingInput, SlotUpdateWithoutBookingInput>, SlotUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    upsert?: PaymentUpsertWithoutBookingInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutBookingInput, PaymentUpdateWithoutBookingInput>, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type ReviewUpdateOneWithoutBookingNestedInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    upsert?: ReviewUpsertWithoutBookingInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutBookingInput, ReviewUpdateWithoutBookingInput>, ReviewUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    upsert?: PaymentUpsertWithoutBookingInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutBookingInput, PaymentUpdateWithoutBookingInput>, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type ReviewUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    upsert?: ReviewUpsertWithoutBookingInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutBookingInput, ReviewUpdateWithoutBookingInput>, ReviewUncheckedUpdateWithoutBookingInput>
  }

  export type BookingCreateNestedOneWithoutPaymentInput = {
    create?: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentInput
    connect?: BookingWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type BookingUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentInput
    upsert?: BookingUpsertWithoutPaymentInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutPaymentInput, BookingUpdateWithoutPaymentInput>, BookingUncheckedUpdateWithoutPaymentInput>
  }

  export type BookingCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: BookingCreateOrConnectWithoutFeedbackInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: BookingCreateOrConnectWithoutFeedbackInput
    upsert?: BookingUpsertWithoutFeedbackInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutFeedbackInput, BookingUpdateWithoutFeedbackInput>, BookingUncheckedUpdateWithoutFeedbackInput>
  }

  export type MentorProfileCreateNestedOneWithoutFeedbackGivenInput = {
    create?: XOR<MentorProfileCreateWithoutFeedbackGivenInput, MentorProfileUncheckedCreateWithoutFeedbackGivenInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutFeedbackGivenInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MentorProfileUpdateOneRequiredWithoutFeedbackGivenNestedInput = {
    create?: XOR<MentorProfileCreateWithoutFeedbackGivenInput, MentorProfileUncheckedCreateWithoutFeedbackGivenInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutFeedbackGivenInput
    upsert?: MentorProfileUpsertWithoutFeedbackGivenInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutFeedbackGivenInput, MentorProfileUpdateWithoutFeedbackGivenInput>, MentorProfileUncheckedUpdateWithoutFeedbackGivenInput>
  }

  export type MentorProfileCreateNestedOneWithoutEarningsInput = {
    create?: XOR<MentorProfileCreateWithoutEarningsInput, MentorProfileUncheckedCreateWithoutEarningsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutEarningsInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MentorProfileUpdateOneRequiredWithoutEarningsNestedInput = {
    create?: XOR<MentorProfileCreateWithoutEarningsInput, MentorProfileUncheckedCreateWithoutEarningsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutEarningsInput
    upsert?: MentorProfileUpsertWithoutEarningsInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutEarningsInput, MentorProfileUpdateWithoutEarningsInput>, MentorProfileUncheckedUpdateWithoutEarningsInput>
  }

  export type WebinarRegistrationCreateNestedManyWithoutWebinarInput = {
    create?: XOR<WebinarRegistrationCreateWithoutWebinarInput, WebinarRegistrationUncheckedCreateWithoutWebinarInput> | WebinarRegistrationCreateWithoutWebinarInput[] | WebinarRegistrationUncheckedCreateWithoutWebinarInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutWebinarInput | WebinarRegistrationCreateOrConnectWithoutWebinarInput[]
    createMany?: WebinarRegistrationCreateManyWebinarInputEnvelope
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
  }

  export type WebinarRegistrationUncheckedCreateNestedManyWithoutWebinarInput = {
    create?: XOR<WebinarRegistrationCreateWithoutWebinarInput, WebinarRegistrationUncheckedCreateWithoutWebinarInput> | WebinarRegistrationCreateWithoutWebinarInput[] | WebinarRegistrationUncheckedCreateWithoutWebinarInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutWebinarInput | WebinarRegistrationCreateOrConnectWithoutWebinarInput[]
    createMany?: WebinarRegistrationCreateManyWebinarInputEnvelope
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
  }

  export type EnumWebinarTypeFieldUpdateOperationsInput = {
    set?: $Enums.WebinarType
  }

  export type WebinarRegistrationUpdateManyWithoutWebinarNestedInput = {
    create?: XOR<WebinarRegistrationCreateWithoutWebinarInput, WebinarRegistrationUncheckedCreateWithoutWebinarInput> | WebinarRegistrationCreateWithoutWebinarInput[] | WebinarRegistrationUncheckedCreateWithoutWebinarInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutWebinarInput | WebinarRegistrationCreateOrConnectWithoutWebinarInput[]
    upsert?: WebinarRegistrationUpsertWithWhereUniqueWithoutWebinarInput | WebinarRegistrationUpsertWithWhereUniqueWithoutWebinarInput[]
    createMany?: WebinarRegistrationCreateManyWebinarInputEnvelope
    set?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    disconnect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    delete?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    update?: WebinarRegistrationUpdateWithWhereUniqueWithoutWebinarInput | WebinarRegistrationUpdateWithWhereUniqueWithoutWebinarInput[]
    updateMany?: WebinarRegistrationUpdateManyWithWhereWithoutWebinarInput | WebinarRegistrationUpdateManyWithWhereWithoutWebinarInput[]
    deleteMany?: WebinarRegistrationScalarWhereInput | WebinarRegistrationScalarWhereInput[]
  }

  export type WebinarRegistrationUncheckedUpdateManyWithoutWebinarNestedInput = {
    create?: XOR<WebinarRegistrationCreateWithoutWebinarInput, WebinarRegistrationUncheckedCreateWithoutWebinarInput> | WebinarRegistrationCreateWithoutWebinarInput[] | WebinarRegistrationUncheckedCreateWithoutWebinarInput[]
    connectOrCreate?: WebinarRegistrationCreateOrConnectWithoutWebinarInput | WebinarRegistrationCreateOrConnectWithoutWebinarInput[]
    upsert?: WebinarRegistrationUpsertWithWhereUniqueWithoutWebinarInput | WebinarRegistrationUpsertWithWhereUniqueWithoutWebinarInput[]
    createMany?: WebinarRegistrationCreateManyWebinarInputEnvelope
    set?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    disconnect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    delete?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    connect?: WebinarRegistrationWhereUniqueInput | WebinarRegistrationWhereUniqueInput[]
    update?: WebinarRegistrationUpdateWithWhereUniqueWithoutWebinarInput | WebinarRegistrationUpdateWithWhereUniqueWithoutWebinarInput[]
    updateMany?: WebinarRegistrationUpdateManyWithWhereWithoutWebinarInput | WebinarRegistrationUpdateManyWithWhereWithoutWebinarInput[]
    deleteMany?: WebinarRegistrationScalarWhereInput | WebinarRegistrationScalarWhereInput[]
  }

  export type WebinarCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<WebinarCreateWithoutRegistrationsInput, WebinarUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: WebinarCreateOrConnectWithoutRegistrationsInput
    connect?: WebinarWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWebinarRegistrationsInput = {
    create?: XOR<UserCreateWithoutWebinarRegistrationsInput, UserUncheckedCreateWithoutWebinarRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWebinarRegistrationsInput
    connect?: UserWhereUniqueInput
  }

  export type WebinarUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<WebinarCreateWithoutRegistrationsInput, WebinarUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: WebinarCreateOrConnectWithoutRegistrationsInput
    upsert?: WebinarUpsertWithoutRegistrationsInput
    connect?: WebinarWhereUniqueInput
    update?: XOR<XOR<WebinarUpdateToOneWithWhereWithoutRegistrationsInput, WebinarUpdateWithoutRegistrationsInput>, WebinarUncheckedUpdateWithoutRegistrationsInput>
  }

  export type UserUpdateOneRequiredWithoutWebinarRegistrationsNestedInput = {
    create?: XOR<UserCreateWithoutWebinarRegistrationsInput, UserUncheckedCreateWithoutWebinarRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWebinarRegistrationsInput
    upsert?: UserUpsertWithoutWebinarRegistrationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWebinarRegistrationsInput, UserUpdateWithoutWebinarRegistrationsInput>, UserUncheckedUpdateWithoutWebinarRegistrationsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutVerificationInput = {
    create?: XOR<UserCreateWithoutVerificationInput, UserUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutVerificationNestedInput = {
    create?: XOR<UserCreateWithoutVerificationInput, UserUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationInput
    upsert?: UserUpsertWithoutVerificationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerificationInput, UserUpdateWithoutVerificationInput>, UserUncheckedUpdateWithoutVerificationInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumSlotStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotStatus | EnumSlotStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotStatusFilter<$PrismaModel> | $Enums.SlotStatus
  }

  export type NestedEnumSlotStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SlotStatus | EnumSlotStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SlotStatus[] | ListEnumSlotStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSlotStatusWithAggregatesFilter<$PrismaModel> | $Enums.SlotStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSlotStatusFilter<$PrismaModel>
    _max?: NestedEnumSlotStatusFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumSessionModeFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionMode | EnumSessionModeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionModeFilter<$PrismaModel> | $Enums.SessionMode
  }

  export type NestedEnumSessionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionType | EnumSessionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypeFilter<$PrismaModel> | $Enums.SessionType
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumSessionModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionMode | EnumSessionModeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionMode[] | ListEnumSessionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionModeWithAggregatesFilter<$PrismaModel> | $Enums.SessionMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionModeFilter<$PrismaModel>
    _max?: NestedEnumSessionModeFilter<$PrismaModel>
  }

  export type NestedEnumSessionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionType | EnumSessionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionType[] | ListEnumSessionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SessionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionTypeFilter<$PrismaModel>
    _max?: NestedEnumSessionTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumWebinarTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WebinarType | EnumWebinarTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWebinarTypeFilter<$PrismaModel> | $Enums.WebinarType
  }

  export type NestedEnumWebinarTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebinarType | EnumWebinarTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebinarType[] | ListEnumWebinarTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWebinarTypeWithAggregatesFilter<$PrismaModel> | $Enums.WebinarType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebinarTypeFilter<$PrismaModel>
    _max?: NestedEnumWebinarTypeFilter<$PrismaModel>
  }

  export type MentorProfileCreateWithoutUserInput = {
    id?: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: SlotCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
    earnings?: EarningsCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: SlotUncheckedCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
    earnings?: EarningsUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutUserInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
  }

  export type MenteeProfileCreateWithoutUserInput = {
    id?: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeCreateNestedManyWithoutMenteeInput
    sopDocuments?: SOPDocumentCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUncheckedCreateWithoutUserInput = {
    id?: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeUncheckedCreateNestedManyWithoutMenteeInput
    sopDocuments?: SOPDocumentUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileCreateOrConnectWithoutUserInput = {
    where: MenteeProfileWhereUniqueInput
    create: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateWithoutMentorInput = {
    id?: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutBookingsAsMenteeInput
    slot: SlotCreateNestedOneWithoutBookingInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    feedback?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutMentorInput = {
    id?: string
    menteeId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    feedback?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutMentorInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMentorInput, BookingUncheckedCreateWithoutMentorInput>
  }

  export type BookingCreateManyMentorInputEnvelope = {
    data: BookingCreateManyMentorInput | BookingCreateManyMentorInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutMenteeInput = {
    id?: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: UserCreateNestedOneWithoutBookingsAsMentorInput
    slot: SlotCreateNestedOneWithoutBookingInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    feedback?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutMenteeInput = {
    id?: string
    mentorId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    feedback?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutMenteeInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput>
  }

  export type BookingCreateManyMenteeInputEnvelope = {
    data: BookingCreateManyMenteeInput | BookingCreateManyMenteeInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VerificationDocumentCreateWithoutUserInput = {
    id?: string
    documentUrl: string
    status?: $Enums.VerificationStatus
    createdAt?: Date | string
  }

  export type VerificationDocumentUncheckedCreateWithoutUserInput = {
    id?: string
    documentUrl: string
    status?: $Enums.VerificationStatus
    createdAt?: Date | string
  }

  export type VerificationDocumentCreateOrConnectWithoutUserInput = {
    where: VerificationDocumentWhereUniqueInput
    create: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
  }

  export type WebinarRegistrationCreateWithoutUserInput = {
    id?: string
    paymentId?: string | null
    createdAt?: Date | string
    webinar: WebinarCreateNestedOneWithoutRegistrationsInput
  }

  export type WebinarRegistrationUncheckedCreateWithoutUserInput = {
    id?: string
    webinarId: string
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type WebinarRegistrationCreateOrConnectWithoutUserInput = {
    where: WebinarRegistrationWhereUniqueInput
    create: XOR<WebinarRegistrationCreateWithoutUserInput, WebinarRegistrationUncheckedCreateWithoutUserInput>
  }

  export type WebinarRegistrationCreateManyUserInputEnvelope = {
    data: WebinarRegistrationCreateManyUserInput | WebinarRegistrationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MentorProfileUpsertWithoutUserInput = {
    update: XOR<MentorProfileUpdateWithoutUserInput, MentorProfileUncheckedUpdateWithoutUserInput>
    create: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutUserInput, MentorProfileUncheckedUpdateWithoutUserInput>
  }

  export type MentorProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUncheckedUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type MenteeProfileUpsertWithoutUserInput = {
    update: XOR<MenteeProfileUpdateWithoutUserInput, MenteeProfileUncheckedUpdateWithoutUserInput>
    create: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    where?: MenteeProfileWhereInput
  }

  export type MenteeProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: MenteeProfileWhereInput
    data: XOR<MenteeProfileUpdateWithoutUserInput, MenteeProfileUncheckedUpdateWithoutUserInput>
  }

  export type MenteeProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUpdateManyWithoutMenteeNestedInput
    sopDocuments?: SOPDocumentUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUncheckedUpdateManyWithoutMenteeNestedInput
    sopDocuments?: SOPDocumentUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutMentorInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutMentorInput, BookingUncheckedUpdateWithoutMentorInput>
    create: XOR<BookingCreateWithoutMentorInput, BookingUncheckedCreateWithoutMentorInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutMentorInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutMentorInput, BookingUncheckedUpdateWithoutMentorInput>
  }

  export type BookingUpdateManyWithWhereWithoutMentorInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutMentorInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    mentorId?: StringFilter<"Booking"> | string
    menteeId?: StringFilter<"Booking"> | string
    slotId?: StringFilter<"Booking"> | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFilter<"Booking"> | $Enums.SessionMode
    sessionType?: EnumSessionTypeFilter<"Booking"> | $Enums.SessionType
    purpose?: StringFilter<"Booking"> | string
    meetingLink?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutMenteeInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutMenteeInput, BookingUncheckedUpdateWithoutMenteeInput>
    create: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutMenteeInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutMenteeInput, BookingUncheckedUpdateWithoutMenteeInput>
  }

  export type BookingUpdateManyWithWhereWithoutMenteeInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutMenteeInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type VerificationDocumentUpsertWithoutUserInput = {
    update: XOR<VerificationDocumentUpdateWithoutUserInput, VerificationDocumentUncheckedUpdateWithoutUserInput>
    create: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    where?: VerificationDocumentWhereInput
  }

  export type VerificationDocumentUpdateToOneWithWhereWithoutUserInput = {
    where?: VerificationDocumentWhereInput
    data: XOR<VerificationDocumentUpdateWithoutUserInput, VerificationDocumentUncheckedUpdateWithoutUserInput>
  }

  export type VerificationDocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationDocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationUpsertWithWhereUniqueWithoutUserInput = {
    where: WebinarRegistrationWhereUniqueInput
    update: XOR<WebinarRegistrationUpdateWithoutUserInput, WebinarRegistrationUncheckedUpdateWithoutUserInput>
    create: XOR<WebinarRegistrationCreateWithoutUserInput, WebinarRegistrationUncheckedCreateWithoutUserInput>
  }

  export type WebinarRegistrationUpdateWithWhereUniqueWithoutUserInput = {
    where: WebinarRegistrationWhereUniqueInput
    data: XOR<WebinarRegistrationUpdateWithoutUserInput, WebinarRegistrationUncheckedUpdateWithoutUserInput>
  }

  export type WebinarRegistrationUpdateManyWithWhereWithoutUserInput = {
    where: WebinarRegistrationScalarWhereInput
    data: XOR<WebinarRegistrationUpdateManyMutationInput, WebinarRegistrationUncheckedUpdateManyWithoutUserInput>
  }

  export type WebinarRegistrationScalarWhereInput = {
    AND?: WebinarRegistrationScalarWhereInput | WebinarRegistrationScalarWhereInput[]
    OR?: WebinarRegistrationScalarWhereInput[]
    NOT?: WebinarRegistrationScalarWhereInput | WebinarRegistrationScalarWhereInput[]
    id?: StringFilter<"WebinarRegistration"> | string
    webinarId?: StringFilter<"WebinarRegistration"> | string
    userId?: StringFilter<"WebinarRegistration"> | string
    paymentId?: StringNullableFilter<"WebinarRegistration"> | string | null
    createdAt?: DateTimeFilter<"WebinarRegistration"> | Date | string
  }

  export type UserCreateWithoutMentorProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMentorProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
  }

  export type SlotCreateWithoutMentorInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    booking?: BookingCreateNestedOneWithoutSlotInput
  }

  export type SlotUncheckedCreateWithoutMentorInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    booking?: BookingUncheckedCreateNestedOneWithoutSlotInput
  }

  export type SlotCreateOrConnectWithoutMentorInput = {
    where: SlotWhereUniqueInput
    create: XOR<SlotCreateWithoutMentorInput, SlotUncheckedCreateWithoutMentorInput>
  }

  export type SlotCreateManyMentorInputEnvelope = {
    data: SlotCreateManyMentorInput | SlotCreateManyMentorInput[]
    skipDuplicates?: boolean
  }

  export type MentorFeedbackCreateWithoutMentorInput = {
    id?: string
    bookingId: string
    feedbackPdfUrl?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackUncheckedCreateWithoutMentorInput = {
    id?: string
    bookingId: string
    feedbackPdfUrl?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackCreateOrConnectWithoutMentorInput = {
    where: MentorFeedbackWhereUniqueInput
    create: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput>
  }

  export type MentorFeedbackCreateManyMentorInputEnvelope = {
    data: MentorFeedbackCreateManyMentorInput | MentorFeedbackCreateManyMentorInput[]
    skipDuplicates?: boolean
  }

  export type EarningsCreateWithoutMentorInput = {
    id?: string
    bookingId: string
    amount: number
    createdAt?: Date | string
  }

  export type EarningsUncheckedCreateWithoutMentorInput = {
    id?: string
    bookingId: string
    amount: number
    createdAt?: Date | string
  }

  export type EarningsCreateOrConnectWithoutMentorInput = {
    where: EarningsWhereUniqueInput
    create: XOR<EarningsCreateWithoutMentorInput, EarningsUncheckedCreateWithoutMentorInput>
  }

  export type EarningsCreateManyMentorInputEnvelope = {
    data: EarningsCreateManyMentorInput | EarningsCreateManyMentorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMentorProfileInput = {
    update: XOR<UserUpdateWithoutMentorProfileInput, UserUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMentorProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMentorProfileInput, UserUncheckedUpdateWithoutMentorProfileInput>
  }

  export type UserUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SlotUpsertWithWhereUniqueWithoutMentorInput = {
    where: SlotWhereUniqueInput
    update: XOR<SlotUpdateWithoutMentorInput, SlotUncheckedUpdateWithoutMentorInput>
    create: XOR<SlotCreateWithoutMentorInput, SlotUncheckedCreateWithoutMentorInput>
  }

  export type SlotUpdateWithWhereUniqueWithoutMentorInput = {
    where: SlotWhereUniqueInput
    data: XOR<SlotUpdateWithoutMentorInput, SlotUncheckedUpdateWithoutMentorInput>
  }

  export type SlotUpdateManyWithWhereWithoutMentorInput = {
    where: SlotScalarWhereInput
    data: XOR<SlotUpdateManyMutationInput, SlotUncheckedUpdateManyWithoutMentorInput>
  }

  export type SlotScalarWhereInput = {
    AND?: SlotScalarWhereInput | SlotScalarWhereInput[]
    OR?: SlotScalarWhereInput[]
    NOT?: SlotScalarWhereInput | SlotScalarWhereInput[]
    id?: StringFilter<"Slot"> | string
    mentorId?: StringFilter<"Slot"> | string
    startTime?: DateTimeFilter<"Slot"> | Date | string
    endTime?: DateTimeFilter<"Slot"> | Date | string
    status?: EnumSlotStatusFilter<"Slot"> | $Enums.SlotStatus
    createdAt?: DateTimeFilter<"Slot"> | Date | string
    updatedAt?: DateTimeFilter<"Slot"> | Date | string
  }

  export type MentorFeedbackUpsertWithWhereUniqueWithoutMentorInput = {
    where: MentorFeedbackWhereUniqueInput
    update: XOR<MentorFeedbackUpdateWithoutMentorInput, MentorFeedbackUncheckedUpdateWithoutMentorInput>
    create: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput>
  }

  export type MentorFeedbackUpdateWithWhereUniqueWithoutMentorInput = {
    where: MentorFeedbackWhereUniqueInput
    data: XOR<MentorFeedbackUpdateWithoutMentorInput, MentorFeedbackUncheckedUpdateWithoutMentorInput>
  }

  export type MentorFeedbackUpdateManyWithWhereWithoutMentorInput = {
    where: MentorFeedbackScalarWhereInput
    data: XOR<MentorFeedbackUpdateManyMutationInput, MentorFeedbackUncheckedUpdateManyWithoutMentorInput>
  }

  export type MentorFeedbackScalarWhereInput = {
    AND?: MentorFeedbackScalarWhereInput | MentorFeedbackScalarWhereInput[]
    OR?: MentorFeedbackScalarWhereInput[]
    NOT?: MentorFeedbackScalarWhereInput | MentorFeedbackScalarWhereInput[]
    id?: StringFilter<"MentorFeedback"> | string
    mentorId?: StringFilter<"MentorFeedback"> | string
    bookingId?: StringFilter<"MentorFeedback"> | string
    feedbackPdfUrl?: StringNullableFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeFilter<"MentorFeedback"> | Date | string
  }

  export type EarningsUpsertWithWhereUniqueWithoutMentorInput = {
    where: EarningsWhereUniqueInput
    update: XOR<EarningsUpdateWithoutMentorInput, EarningsUncheckedUpdateWithoutMentorInput>
    create: XOR<EarningsCreateWithoutMentorInput, EarningsUncheckedCreateWithoutMentorInput>
  }

  export type EarningsUpdateWithWhereUniqueWithoutMentorInput = {
    where: EarningsWhereUniqueInput
    data: XOR<EarningsUpdateWithoutMentorInput, EarningsUncheckedUpdateWithoutMentorInput>
  }

  export type EarningsUpdateManyWithWhereWithoutMentorInput = {
    where: EarningsScalarWhereInput
    data: XOR<EarningsUpdateManyMutationInput, EarningsUncheckedUpdateManyWithoutMentorInput>
  }

  export type EarningsScalarWhereInput = {
    AND?: EarningsScalarWhereInput | EarningsScalarWhereInput[]
    OR?: EarningsScalarWhereInput[]
    NOT?: EarningsScalarWhereInput | EarningsScalarWhereInput[]
    id?: StringFilter<"Earnings"> | string
    mentorId?: StringFilter<"Earnings"> | string
    bookingId?: StringFilter<"Earnings"> | string
    amount?: FloatFilter<"Earnings"> | number
    createdAt?: DateTimeFilter<"Earnings"> | Date | string
  }

  export type UserCreateWithoutMenteeProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMenteeProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMenteeProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
  }

  export type ResumeCreateWithoutMenteeInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type ResumeUncheckedCreateWithoutMenteeInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutMenteeInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutMenteeInput, ResumeUncheckedCreateWithoutMenteeInput>
  }

  export type ResumeCreateManyMenteeInputEnvelope = {
    data: ResumeCreateManyMenteeInput | ResumeCreateManyMenteeInput[]
    skipDuplicates?: boolean
  }

  export type SOPDocumentCreateWithoutMenteeInput = {
    id?: string
    collegeName: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type SOPDocumentUncheckedCreateWithoutMenteeInput = {
    id?: string
    collegeName: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type SOPDocumentCreateOrConnectWithoutMenteeInput = {
    where: SOPDocumentWhereUniqueInput
    create: XOR<SOPDocumentCreateWithoutMenteeInput, SOPDocumentUncheckedCreateWithoutMenteeInput>
  }

  export type SOPDocumentCreateManyMenteeInputEnvelope = {
    data: SOPDocumentCreateManyMenteeInput | SOPDocumentCreateManyMenteeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMenteeProfileInput = {
    update: XOR<UserUpdateWithoutMenteeProfileInput, UserUncheckedUpdateWithoutMenteeProfileInput>
    create: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMenteeProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMenteeProfileInput, UserUncheckedUpdateWithoutMenteeProfileInput>
  }

  export type UserUpdateWithoutMenteeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMenteeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResumeUpsertWithWhereUniqueWithoutMenteeInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutMenteeInput, ResumeUncheckedUpdateWithoutMenteeInput>
    create: XOR<ResumeCreateWithoutMenteeInput, ResumeUncheckedCreateWithoutMenteeInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutMenteeInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutMenteeInput, ResumeUncheckedUpdateWithoutMenteeInput>
  }

  export type ResumeUpdateManyWithWhereWithoutMenteeInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutMenteeInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: StringFilter<"Resume"> | string
    menteeId?: StringFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    fileUrl?: StringFilter<"Resume"> | string
    createdAt?: DateTimeFilter<"Resume"> | Date | string
  }

  export type SOPDocumentUpsertWithWhereUniqueWithoutMenteeInput = {
    where: SOPDocumentWhereUniqueInput
    update: XOR<SOPDocumentUpdateWithoutMenteeInput, SOPDocumentUncheckedUpdateWithoutMenteeInput>
    create: XOR<SOPDocumentCreateWithoutMenteeInput, SOPDocumentUncheckedCreateWithoutMenteeInput>
  }

  export type SOPDocumentUpdateWithWhereUniqueWithoutMenteeInput = {
    where: SOPDocumentWhereUniqueInput
    data: XOR<SOPDocumentUpdateWithoutMenteeInput, SOPDocumentUncheckedUpdateWithoutMenteeInput>
  }

  export type SOPDocumentUpdateManyWithWhereWithoutMenteeInput = {
    where: SOPDocumentScalarWhereInput
    data: XOR<SOPDocumentUpdateManyMutationInput, SOPDocumentUncheckedUpdateManyWithoutMenteeInput>
  }

  export type SOPDocumentScalarWhereInput = {
    AND?: SOPDocumentScalarWhereInput | SOPDocumentScalarWhereInput[]
    OR?: SOPDocumentScalarWhereInput[]
    NOT?: SOPDocumentScalarWhereInput | SOPDocumentScalarWhereInput[]
    id?: StringFilter<"SOPDocument"> | string
    menteeId?: StringFilter<"SOPDocument"> | string
    collegeName?: StringFilter<"SOPDocument"> | string
    fileUrl?: StringFilter<"SOPDocument"> | string
    createdAt?: DateTimeFilter<"SOPDocument"> | Date | string
  }

  export type MenteeProfileCreateWithoutResumesInput = {
    id?: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
    sopDocuments?: SOPDocumentCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUncheckedCreateWithoutResumesInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sopDocuments?: SOPDocumentUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileCreateOrConnectWithoutResumesInput = {
    where: MenteeProfileWhereUniqueInput
    create: XOR<MenteeProfileCreateWithoutResumesInput, MenteeProfileUncheckedCreateWithoutResumesInput>
  }

  export type MenteeProfileUpsertWithoutResumesInput = {
    update: XOR<MenteeProfileUpdateWithoutResumesInput, MenteeProfileUncheckedUpdateWithoutResumesInput>
    create: XOR<MenteeProfileCreateWithoutResumesInput, MenteeProfileUncheckedCreateWithoutResumesInput>
    where?: MenteeProfileWhereInput
  }

  export type MenteeProfileUpdateToOneWithWhereWithoutResumesInput = {
    where?: MenteeProfileWhereInput
    data: XOR<MenteeProfileUpdateWithoutResumesInput, MenteeProfileUncheckedUpdateWithoutResumesInput>
  }

  export type MenteeProfileUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
    sopDocuments?: SOPDocumentUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sopDocuments?: SOPDocumentUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileCreateWithoutSopDocumentsInput = {
    id?: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
    resumes?: ResumeCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUncheckedCreateWithoutSopDocumentsInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    education10th?: string | null
    education12th?: string | null
    bachelors?: string | null
    masters?: string | null
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catScore?: number | null
    expectations?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: ResumeUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileCreateOrConnectWithoutSopDocumentsInput = {
    where: MenteeProfileWhereUniqueInput
    create: XOR<MenteeProfileCreateWithoutSopDocumentsInput, MenteeProfileUncheckedCreateWithoutSopDocumentsInput>
  }

  export type MenteeProfileUpsertWithoutSopDocumentsInput = {
    update: XOR<MenteeProfileUpdateWithoutSopDocumentsInput, MenteeProfileUncheckedUpdateWithoutSopDocumentsInput>
    create: XOR<MenteeProfileCreateWithoutSopDocumentsInput, MenteeProfileUncheckedCreateWithoutSopDocumentsInput>
    where?: MenteeProfileWhereInput
  }

  export type MenteeProfileUpdateToOneWithWhereWithoutSopDocumentsInput = {
    where?: MenteeProfileWhereInput
    data: XOR<MenteeProfileUpdateWithoutSopDocumentsInput, MenteeProfileUncheckedUpdateWithoutSopDocumentsInput>
  }

  export type MenteeProfileUpdateWithoutSopDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
    resumes?: ResumeUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileUncheckedUpdateWithoutSopDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    education10th?: NullableStringFieldUpdateOperationsInput | string | null
    education12th?: NullableStringFieldUpdateOperationsInput | string | null
    bachelors?: NullableStringFieldUpdateOperationsInput | string | null
    masters?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catScore?: NullableFloatFieldUpdateOperationsInput | number | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: ResumeUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type MentorProfileCreateWithoutSlotsInput = {
    id?: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
    earnings?: EarningsCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutSlotsInput = {
    id?: string
    userId: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
    earnings?: EarningsUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutSlotsInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutSlotsInput, MentorProfileUncheckedCreateWithoutSlotsInput>
  }

  export type BookingCreateWithoutSlotInput = {
    id?: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: UserCreateNestedOneWithoutBookingsAsMentorInput
    mentee: UserCreateNestedOneWithoutBookingsAsMenteeInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    feedback?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutSlotInput = {
    id?: string
    mentorId: string
    menteeId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    feedback?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutSlotInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutSlotInput, BookingUncheckedCreateWithoutSlotInput>
  }

  export type MentorProfileUpsertWithoutSlotsInput = {
    update: XOR<MentorProfileUpdateWithoutSlotsInput, MentorProfileUncheckedUpdateWithoutSlotsInput>
    create: XOR<MentorProfileCreateWithoutSlotsInput, MentorProfileUncheckedCreateWithoutSlotsInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutSlotsInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutSlotsInput, MentorProfileUncheckedUpdateWithoutSlotsInput>
  }

  export type MentorProfileUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type BookingUpsertWithoutSlotInput = {
    update: XOR<BookingUpdateWithoutSlotInput, BookingUncheckedUpdateWithoutSlotInput>
    create: XOR<BookingCreateWithoutSlotInput, BookingUncheckedCreateWithoutSlotInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutSlotInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutSlotInput, BookingUncheckedUpdateWithoutSlotInput>
  }

  export type BookingUpdateWithoutSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: UserUpdateOneRequiredWithoutBookingsAsMentorNestedInput
    mentee?: UserUpdateOneRequiredWithoutBookingsAsMenteeNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type UserCreateWithoutBookingsAsMentorInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsAsMentorInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsAsMentorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsAsMentorInput, UserUncheckedCreateWithoutBookingsAsMentorInput>
  }

  export type UserCreateWithoutBookingsAsMenteeInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsAsMenteeInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsAsMenteeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsAsMenteeInput, UserUncheckedCreateWithoutBookingsAsMenteeInput>
  }

  export type SlotCreateWithoutBookingInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutSlotsInput
  }

  export type SlotUncheckedCreateWithoutBookingInput = {
    id?: string
    mentorId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SlotCreateOrConnectWithoutBookingInput = {
    where: SlotWhereUniqueInput
    create: XOR<SlotCreateWithoutBookingInput, SlotUncheckedCreateWithoutBookingInput>
  }

  export type PaymentCreateWithoutBookingInput = {
    id?: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutBookingInput = {
    id?: string
    razorpayOrderId: string
    razorpayPaymentId?: string | null
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type ReviewCreateWithoutBookingInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUncheckedCreateWithoutBookingInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutBookingInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
  }

  export type UserUpsertWithoutBookingsAsMentorInput = {
    update: XOR<UserUpdateWithoutBookingsAsMentorInput, UserUncheckedUpdateWithoutBookingsAsMentorInput>
    create: XOR<UserCreateWithoutBookingsAsMentorInput, UserUncheckedCreateWithoutBookingsAsMentorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsAsMentorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsAsMentorInput, UserUncheckedUpdateWithoutBookingsAsMentorInput>
  }

  export type UserUpdateWithoutBookingsAsMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsAsMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutBookingsAsMenteeInput = {
    update: XOR<UserUpdateWithoutBookingsAsMenteeInput, UserUncheckedUpdateWithoutBookingsAsMenteeInput>
    create: XOR<UserCreateWithoutBookingsAsMenteeInput, UserUncheckedCreateWithoutBookingsAsMenteeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsAsMenteeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsAsMenteeInput, UserUncheckedUpdateWithoutBookingsAsMenteeInput>
  }

  export type UserUpdateWithoutBookingsAsMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsAsMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SlotUpsertWithoutBookingInput = {
    update: XOR<SlotUpdateWithoutBookingInput, SlotUncheckedUpdateWithoutBookingInput>
    create: XOR<SlotCreateWithoutBookingInput, SlotUncheckedCreateWithoutBookingInput>
    where?: SlotWhereInput
  }

  export type SlotUpdateToOneWithWhereWithoutBookingInput = {
    where?: SlotWhereInput
    data: XOR<SlotUpdateWithoutBookingInput, SlotUncheckedUpdateWithoutBookingInput>
  }

  export type SlotUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutSlotsNestedInput
  }

  export type SlotUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpsertWithoutBookingInput = {
    update: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutBookingInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: StringFieldUpdateOperationsInput | string
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpsertWithoutBookingInput = {
    update: XOR<ReviewUpdateWithoutBookingInput, ReviewUncheckedUpdateWithoutBookingInput>
    create: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutBookingInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutBookingInput, ReviewUncheckedUpdateWithoutBookingInput>
  }

  export type ReviewUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateWithoutPaymentInput = {
    id?: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: UserCreateNestedOneWithoutBookingsAsMentorInput
    mentee: UserCreateNestedOneWithoutBookingsAsMenteeInput
    slot: SlotCreateNestedOneWithoutBookingInput
    feedback?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPaymentInput = {
    id?: string
    mentorId: string
    menteeId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPaymentInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
  }

  export type BookingUpsertWithoutPaymentInput = {
    update: XOR<BookingUpdateWithoutPaymentInput, BookingUncheckedUpdateWithoutPaymentInput>
    create: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutPaymentInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutPaymentInput, BookingUncheckedUpdateWithoutPaymentInput>
  }

  export type BookingUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: UserUpdateOneRequiredWithoutBookingsAsMentorNestedInput
    mentee?: UserUpdateOneRequiredWithoutBookingsAsMenteeNestedInput
    slot?: SlotUpdateOneRequiredWithoutBookingNestedInput
    feedback?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateWithoutFeedbackInput = {
    id?: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: UserCreateNestedOneWithoutBookingsAsMentorInput
    mentee: UserCreateNestedOneWithoutBookingsAsMenteeInput
    slot: SlotCreateNestedOneWithoutBookingInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutFeedbackInput = {
    id?: string
    mentorId: string
    menteeId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutFeedbackInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
  }

  export type BookingUpsertWithoutFeedbackInput = {
    update: XOR<BookingUpdateWithoutFeedbackInput, BookingUncheckedUpdateWithoutFeedbackInput>
    create: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutFeedbackInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutFeedbackInput, BookingUncheckedUpdateWithoutFeedbackInput>
  }

  export type BookingUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: UserUpdateOneRequiredWithoutBookingsAsMentorNestedInput
    mentee?: UserUpdateOneRequiredWithoutBookingsAsMenteeNestedInput
    slot?: SlotUpdateOneRequiredWithoutBookingNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type MentorProfileCreateWithoutFeedbackGivenInput = {
    id?: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    slots?: SlotCreateNestedManyWithoutMentorInput
    earnings?: EarningsCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutFeedbackGivenInput = {
    id?: string
    userId: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: SlotUncheckedCreateNestedManyWithoutMentorInput
    earnings?: EarningsUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutFeedbackGivenInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutFeedbackGivenInput, MentorProfileUncheckedCreateWithoutFeedbackGivenInput>
  }

  export type MentorProfileUpsertWithoutFeedbackGivenInput = {
    update: XOR<MentorProfileUpdateWithoutFeedbackGivenInput, MentorProfileUncheckedUpdateWithoutFeedbackGivenInput>
    create: XOR<MentorProfileCreateWithoutFeedbackGivenInput, MentorProfileUncheckedCreateWithoutFeedbackGivenInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutFeedbackGivenInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutFeedbackGivenInput, MentorProfileUncheckedUpdateWithoutFeedbackGivenInput>
  }

  export type MentorProfileUpdateWithoutFeedbackGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    slots?: SlotUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutFeedbackGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUncheckedUpdateManyWithoutMentorNestedInput
    earnings?: EarningsUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileCreateWithoutEarningsInput = {
    id?: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    slots?: SlotCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutEarningsInput = {
    id?: string
    userId: string
    bio: string
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    pricePerSession: number
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slots?: SlotUncheckedCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutEarningsInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutEarningsInput, MentorProfileUncheckedCreateWithoutEarningsInput>
  }

  export type MentorProfileUpsertWithoutEarningsInput = {
    update: XOR<MentorProfileUpdateWithoutEarningsInput, MentorProfileUncheckedUpdateWithoutEarningsInput>
    create: XOR<MentorProfileCreateWithoutEarningsInput, MentorProfileUncheckedCreateWithoutEarningsInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutEarningsInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutEarningsInput, MentorProfileUncheckedUpdateWithoutEarningsInput>
  }

  export type MentorProfileUpdateWithoutEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    slots?: SlotUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutEarningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: SlotUncheckedUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type WebinarRegistrationCreateWithoutWebinarInput = {
    id?: string
    paymentId?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWebinarRegistrationsInput
  }

  export type WebinarRegistrationUncheckedCreateWithoutWebinarInput = {
    id?: string
    userId: string
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type WebinarRegistrationCreateOrConnectWithoutWebinarInput = {
    where: WebinarRegistrationWhereUniqueInput
    create: XOR<WebinarRegistrationCreateWithoutWebinarInput, WebinarRegistrationUncheckedCreateWithoutWebinarInput>
  }

  export type WebinarRegistrationCreateManyWebinarInputEnvelope = {
    data: WebinarRegistrationCreateManyWebinarInput | WebinarRegistrationCreateManyWebinarInput[]
    skipDuplicates?: boolean
  }

  export type WebinarRegistrationUpsertWithWhereUniqueWithoutWebinarInput = {
    where: WebinarRegistrationWhereUniqueInput
    update: XOR<WebinarRegistrationUpdateWithoutWebinarInput, WebinarRegistrationUncheckedUpdateWithoutWebinarInput>
    create: XOR<WebinarRegistrationCreateWithoutWebinarInput, WebinarRegistrationUncheckedCreateWithoutWebinarInput>
  }

  export type WebinarRegistrationUpdateWithWhereUniqueWithoutWebinarInput = {
    where: WebinarRegistrationWhereUniqueInput
    data: XOR<WebinarRegistrationUpdateWithoutWebinarInput, WebinarRegistrationUncheckedUpdateWithoutWebinarInput>
  }

  export type WebinarRegistrationUpdateManyWithWhereWithoutWebinarInput = {
    where: WebinarRegistrationScalarWhereInput
    data: XOR<WebinarRegistrationUpdateManyMutationInput, WebinarRegistrationUncheckedUpdateManyWithoutWebinarInput>
  }

  export type WebinarCreateWithoutRegistrationsInput = {
    id?: string
    title: string
    description: string
    price?: number | null
    type: $Enums.WebinarType
    startTime: Date | string
    endTime: Date | string
    meetingLink?: string | null
    createdAt?: Date | string
  }

  export type WebinarUncheckedCreateWithoutRegistrationsInput = {
    id?: string
    title: string
    description: string
    price?: number | null
    type: $Enums.WebinarType
    startTime: Date | string
    endTime: Date | string
    meetingLink?: string | null
    createdAt?: Date | string
  }

  export type WebinarCreateOrConnectWithoutRegistrationsInput = {
    where: WebinarWhereUniqueInput
    create: XOR<WebinarCreateWithoutRegistrationsInput, WebinarUncheckedCreateWithoutRegistrationsInput>
  }

  export type UserCreateWithoutWebinarRegistrationsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWebinarRegistrationsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWebinarRegistrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWebinarRegistrationsInput, UserUncheckedCreateWithoutWebinarRegistrationsInput>
  }

  export type WebinarUpsertWithoutRegistrationsInput = {
    update: XOR<WebinarUpdateWithoutRegistrationsInput, WebinarUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<WebinarCreateWithoutRegistrationsInput, WebinarUncheckedCreateWithoutRegistrationsInput>
    where?: WebinarWhereInput
  }

  export type WebinarUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: WebinarWhereInput
    data: XOR<WebinarUpdateWithoutRegistrationsInput, WebinarUncheckedUpdateWithoutRegistrationsInput>
  }

  export type WebinarUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    type?: EnumWebinarTypeFieldUpdateOperationsInput | $Enums.WebinarType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarUncheckedUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    type?: EnumWebinarTypeFieldUpdateOperationsInput | $Enums.WebinarType
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutWebinarRegistrationsInput = {
    update: XOR<UserUpdateWithoutWebinarRegistrationsInput, UserUncheckedUpdateWithoutWebinarRegistrationsInput>
    create: XOR<UserCreateWithoutWebinarRegistrationsInput, UserUncheckedCreateWithoutWebinarRegistrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWebinarRegistrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWebinarRegistrationsInput, UserUncheckedUpdateWithoutWebinarRegistrationsInput>
  }

  export type UserUpdateWithoutWebinarRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWebinarRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutVerificationInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingCreateNestedManyWithoutMenteeInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    webinarRegistrations?: WebinarRegistrationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerificationInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    name?: string | null
    profilePicture?: string | null
    provider?: string
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    bookingsAsMentor?: BookingUncheckedCreateNestedManyWithoutMentorInput
    bookingsAsMentee?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    webinarRegistrations?: WebinarRegistrationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerificationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerificationInput, UserUncheckedCreateWithoutVerificationInput>
  }

  export type UserUpsertWithoutVerificationInput = {
    update: XOR<UserUpdateWithoutVerificationInput, UserUncheckedUpdateWithoutVerificationInput>
    create: XOR<UserCreateWithoutVerificationInput, UserUncheckedCreateWithoutVerificationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerificationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerificationInput, UserUncheckedUpdateWithoutVerificationInput>
  }

  export type UserUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    bookingsAsMentor?: BookingUncheckedUpdateManyWithoutMentorNestedInput
    bookingsAsMentee?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    webinarRegistrations?: WebinarRegistrationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingCreateManyMentorInput = {
    id?: string
    menteeId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateManyMenteeInput = {
    id?: string
    mentorId: string
    slotId: string
    status?: $Enums.BookingStatus
    sessionMode: $Enums.SessionMode
    sessionType?: $Enums.SessionType
    purpose: string
    meetingLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type WebinarRegistrationCreateManyUserInput = {
    id?: string
    webinarId: string
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type BookingUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutBookingsAsMenteeNestedInput
    slot?: SlotUpdateOneRequiredWithoutBookingNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: UserUpdateOneRequiredWithoutBookingsAsMentorNestedInput
    slot?: SlotUpdateOneRequiredWithoutBookingNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    slotId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    sessionMode?: EnumSessionModeFieldUpdateOperationsInput | $Enums.SessionMode
    sessionType?: EnumSessionTypeFieldUpdateOperationsInput | $Enums.SessionType
    purpose?: StringFieldUpdateOperationsInput | string
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webinar?: WebinarUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type WebinarRegistrationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    webinarId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    webinarId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SlotCreateManyMentorInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.SlotStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorFeedbackCreateManyMentorInput = {
    id?: string
    bookingId: string
    feedbackPdfUrl?: string | null
    createdAt?: Date | string
  }

  export type EarningsCreateManyMentorInput = {
    id?: string
    bookingId: string
    amount: number
    createdAt?: Date | string
  }

  export type SlotUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneWithoutSlotNestedInput
  }

  export type SlotUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUncheckedUpdateOneWithoutSlotNestedInput
  }

  export type SlotUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSlotStatusFieldUpdateOperationsInput | $Enums.SlotStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarningsUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarningsUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarningsUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateManyMenteeInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type SOPDocumentCreateManyMenteeInput = {
    id?: string
    collegeName: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type ResumeUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOPDocumentUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOPDocumentUncheckedUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SOPDocumentUncheckedUpdateManyWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationCreateManyWebinarInput = {
    id?: string
    userId: string
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type WebinarRegistrationUpdateWithoutWebinarInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWebinarRegistrationsNestedInput
  }

  export type WebinarRegistrationUncheckedUpdateWithoutWebinarInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebinarRegistrationUncheckedUpdateManyWithoutWebinarInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorProfileCountOutputTypeDefaultArgs instead
     */
    export type MentorProfileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenteeProfileCountOutputTypeDefaultArgs instead
     */
    export type MenteeProfileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenteeProfileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebinarCountOutputTypeDefaultArgs instead
     */
    export type WebinarCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebinarCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorProfileDefaultArgs instead
     */
    export type MentorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenteeProfileDefaultArgs instead
     */
    export type MenteeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenteeProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResumeDefaultArgs instead
     */
    export type ResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResumeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SOPDocumentDefaultArgs instead
     */
    export type SOPDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SOPDocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SlotDefaultArgs instead
     */
    export type SlotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SlotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookingDefaultArgs instead
     */
    export type BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorFeedbackDefaultArgs instead
     */
    export type MentorFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorFeedbackDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EarningsDefaultArgs instead
     */
    export type EarningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EarningsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebinarDefaultArgs instead
     */
    export type WebinarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebinarDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebinarRegistrationDefaultArgs instead
     */
    export type WebinarRegistrationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebinarRegistrationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationDocumentDefaultArgs instead
     */
    export type VerificationDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationDocumentDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}