
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
 * Model MenteeProfile
 * 
 */
export type MenteeProfile = $Result.DefaultSelection<Prisma.$MenteeProfilePayload>
/**
 * Model MentorProfile
 * 
 */
export type MentorProfile = $Result.DefaultSelection<Prisma.$MentorProfilePayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model MentorService
 * Links a mentor to a service with pricing and duration config.
 */
export type MentorService = $Result.DefaultSelection<Prisma.$MentorServicePayload>
/**
 * Model AvailabilityWindow
 * A time range during which a mentor is available.
 * Can be recurring (dayOfWeek set, specificDate null) or
 * one-off (specificDate set, dayOfWeek null).
 */
export type AvailabilityWindow = $Result.DefaultSelection<Prisma.$AvailabilityWindowPayload>
/**
 * Model AvailabilityWindowService
 * Which services are offered during a specific availability window.
 */
export type AvailabilityWindowService = $Result.DefaultSelection<Prisma.$AvailabilityWindowServicePayload>
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
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model SessionFeedback
 * 
 */
export type SessionFeedback = $Result.DefaultSelection<Prisma.$SessionFeedbackPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Payout
 * 
 */
export type Payout = $Result.DefaultSelection<Prisma.$PayoutPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthProvider: {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE'
};

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider]


export const Role: {
  ADMIN: 'ADMIN',
  MENTOR: 'MENTOR',
  MENTEE: 'MENTEE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const MentorApprovalStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED'
};

export type MentorApprovalStatus = (typeof MentorApprovalStatus)[keyof typeof MentorApprovalStatus]


export const DayOfWeek: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]


export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type AuthProvider = $Enums.AuthProvider

export const AuthProvider: typeof $Enums.AuthProvider

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type MentorApprovalStatus = $Enums.MentorApprovalStatus

export const MentorApprovalStatus: typeof $Enums.MentorApprovalStatus

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

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
   * `prisma.menteeProfile`: Exposes CRUD operations for the **MenteeProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenteeProfiles
    * const menteeProfiles = await prisma.menteeProfile.findMany()
    * ```
    */
  get menteeProfile(): Prisma.MenteeProfileDelegate<ExtArgs>;

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
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.mentorService`: Exposes CRUD operations for the **MentorService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorServices
    * const mentorServices = await prisma.mentorService.findMany()
    * ```
    */
  get mentorService(): Prisma.MentorServiceDelegate<ExtArgs>;

  /**
   * `prisma.availabilityWindow`: Exposes CRUD operations for the **AvailabilityWindow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailabilityWindows
    * const availabilityWindows = await prisma.availabilityWindow.findMany()
    * ```
    */
  get availabilityWindow(): Prisma.AvailabilityWindowDelegate<ExtArgs>;

  /**
   * `prisma.availabilityWindowService`: Exposes CRUD operations for the **AvailabilityWindowService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailabilityWindowServices
    * const availabilityWindowServices = await prisma.availabilityWindowService.findMany()
    * ```
    */
  get availabilityWindowService(): Prisma.AvailabilityWindowServiceDelegate<ExtArgs>;

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
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs>;

  /**
   * `prisma.sessionFeedback`: Exposes CRUD operations for the **SessionFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionFeedbacks
    * const sessionFeedbacks = await prisma.sessionFeedback.findMany()
    * ```
    */
  get sessionFeedback(): Prisma.SessionFeedbackDelegate<ExtArgs>;

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
   * `prisma.payout`: Exposes CRUD operations for the **Payout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payouts
    * const payouts = await prisma.payout.findMany()
    * ```
    */
  get payout(): Prisma.PayoutDelegate<ExtArgs>;
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "menteeProfile" | "mentorProfile" | "service" | "mentorService" | "availabilityWindow" | "availabilityWindowService" | "booking" | "payment" | "invoice" | "sessionFeedback" | "review" | "payout"
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
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      MentorService: {
        payload: Prisma.$MentorServicePayload<ExtArgs>
        fields: Prisma.MentorServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>
          }
          findFirst: {
            args: Prisma.MentorServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>
          }
          findMany: {
            args: Prisma.MentorServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>[]
          }
          create: {
            args: Prisma.MentorServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>
          }
          createMany: {
            args: Prisma.MentorServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>[]
          }
          delete: {
            args: Prisma.MentorServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>
          }
          update: {
            args: Prisma.MentorServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>
          }
          deleteMany: {
            args: Prisma.MentorServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorServicePayload>
          }
          aggregate: {
            args: Prisma.MentorServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorService>
          }
          groupBy: {
            args: Prisma.MentorServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorServiceCountArgs<ExtArgs>
            result: $Utils.Optional<MentorServiceCountAggregateOutputType> | number
          }
        }
      }
      AvailabilityWindow: {
        payload: Prisma.$AvailabilityWindowPayload<ExtArgs>
        fields: Prisma.AvailabilityWindowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailabilityWindowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailabilityWindowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>
          }
          findFirst: {
            args: Prisma.AvailabilityWindowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailabilityWindowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>
          }
          findMany: {
            args: Prisma.AvailabilityWindowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>[]
          }
          create: {
            args: Prisma.AvailabilityWindowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>
          }
          createMany: {
            args: Prisma.AvailabilityWindowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailabilityWindowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>[]
          }
          delete: {
            args: Prisma.AvailabilityWindowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>
          }
          update: {
            args: Prisma.AvailabilityWindowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>
          }
          deleteMany: {
            args: Prisma.AvailabilityWindowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailabilityWindowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AvailabilityWindowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowPayload>
          }
          aggregate: {
            args: Prisma.AvailabilityWindowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailabilityWindow>
          }
          groupBy: {
            args: Prisma.AvailabilityWindowGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityWindowGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailabilityWindowCountArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityWindowCountAggregateOutputType> | number
          }
        }
      }
      AvailabilityWindowService: {
        payload: Prisma.$AvailabilityWindowServicePayload<ExtArgs>
        fields: Prisma.AvailabilityWindowServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailabilityWindowServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailabilityWindowServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>
          }
          findFirst: {
            args: Prisma.AvailabilityWindowServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailabilityWindowServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>
          }
          findMany: {
            args: Prisma.AvailabilityWindowServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>[]
          }
          create: {
            args: Prisma.AvailabilityWindowServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>
          }
          createMany: {
            args: Prisma.AvailabilityWindowServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailabilityWindowServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>[]
          }
          delete: {
            args: Prisma.AvailabilityWindowServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>
          }
          update: {
            args: Prisma.AvailabilityWindowServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>
          }
          deleteMany: {
            args: Prisma.AvailabilityWindowServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailabilityWindowServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AvailabilityWindowServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailabilityWindowServicePayload>
          }
          aggregate: {
            args: Prisma.AvailabilityWindowServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailabilityWindowService>
          }
          groupBy: {
            args: Prisma.AvailabilityWindowServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityWindowServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailabilityWindowServiceCountArgs<ExtArgs>
            result: $Utils.Optional<AvailabilityWindowServiceCountAggregateOutputType> | number
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
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      SessionFeedback: {
        payload: Prisma.$SessionFeedbackPayload<ExtArgs>
        fields: Prisma.SessionFeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>
          }
          findFirst: {
            args: Prisma.SessionFeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>
          }
          findMany: {
            args: Prisma.SessionFeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>[]
          }
          create: {
            args: Prisma.SessionFeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>
          }
          createMany: {
            args: Prisma.SessionFeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionFeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>[]
          }
          delete: {
            args: Prisma.SessionFeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>
          }
          update: {
            args: Prisma.SessionFeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>
          }
          deleteMany: {
            args: Prisma.SessionFeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionFeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionFeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionFeedbackPayload>
          }
          aggregate: {
            args: Prisma.SessionFeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessionFeedback>
          }
          groupBy: {
            args: Prisma.SessionFeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionFeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionFeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<SessionFeedbackCountAggregateOutputType> | number
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
      Payout: {
        payload: Prisma.$PayoutPayload<ExtArgs>
        fields: Prisma.PayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findFirst: {
            args: Prisma.PayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findMany: {
            args: Prisma.PayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          create: {
            args: Prisma.PayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          createMany: {
            args: Prisma.PayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          delete: {
            args: Prisma.PayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          update: {
            args: Prisma.PayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          deleteMany: {
            args: Prisma.PayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          aggregate: {
            args: Prisma.PayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayout>
          }
          groupBy: {
            args: Prisma.PayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutCountAggregateOutputType> | number
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
    menteeBookings: number
    reviewsGiven: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menteeBookings?: boolean | UserCountOutputTypeCountMenteeBookingsArgs
    reviewsGiven?: boolean | UserCountOutputTypeCountReviewsGivenArgs
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
  export type UserCountOutputTypeCountMenteeBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type MentorProfileCountOutputType
   */

  export type MentorProfileCountOutputType = {
    mentorServices: number
    availabilityWindows: number
    mentorBookings: number
    reviews: number
    feedbacks: number
    payouts: number
  }

  export type MentorProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorServices?: boolean | MentorProfileCountOutputTypeCountMentorServicesArgs
    availabilityWindows?: boolean | MentorProfileCountOutputTypeCountAvailabilityWindowsArgs
    mentorBookings?: boolean | MentorProfileCountOutputTypeCountMentorBookingsArgs
    reviews?: boolean | MentorProfileCountOutputTypeCountReviewsArgs
    feedbacks?: boolean | MentorProfileCountOutputTypeCountFeedbacksArgs
    payouts?: boolean | MentorProfileCountOutputTypeCountPayoutsArgs
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
  export type MentorProfileCountOutputTypeCountMentorServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorServiceWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountAvailabilityWindowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityWindowWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountMentorBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionFeedbackWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountPayoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    mentorServices: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorServices?: boolean | ServiceCountOutputTypeCountMentorServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountMentorServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorServiceWhereInput
  }


  /**
   * Count Type MentorServiceCountOutputType
   */

  export type MentorServiceCountOutputType = {
    windowServices: number
    bookings: number
  }

  export type MentorServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    windowServices?: boolean | MentorServiceCountOutputTypeCountWindowServicesArgs
    bookings?: boolean | MentorServiceCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * MentorServiceCountOutputType without action
   */
  export type MentorServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorServiceCountOutputType
     */
    select?: MentorServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MentorServiceCountOutputType without action
   */
  export type MentorServiceCountOutputTypeCountWindowServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityWindowServiceWhereInput
  }

  /**
   * MentorServiceCountOutputType without action
   */
  export type MentorServiceCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type AvailabilityWindowCountOutputType
   */

  export type AvailabilityWindowCountOutputType = {
    windowServices: number
  }

  export type AvailabilityWindowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    windowServices?: boolean | AvailabilityWindowCountOutputTypeCountWindowServicesArgs
  }

  // Custom InputTypes
  /**
   * AvailabilityWindowCountOutputType without action
   */
  export type AvailabilityWindowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowCountOutputType
     */
    select?: AvailabilityWindowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvailabilityWindowCountOutputType without action
   */
  export type AvailabilityWindowCountOutputTypeCountWindowServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityWindowServiceWhereInput
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
    provider: $Enums.AuthProvider | null
    role: $Enums.Role | null
    name: string | null
    profilePicture: string | null
    isVerified: boolean | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    googleId: string | null
    provider: $Enums.AuthProvider | null
    role: $Enums.Role | null
    name: string | null
    profilePicture: string | null
    isVerified: boolean | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    googleId: number
    provider: number
    role: number
    name: number
    profilePicture: number
    isVerified: number
    isActive: number
    lastLoginAt: number
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
    provider?: true
    role?: true
    name?: true
    profilePicture?: true
    isVerified?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    provider?: true
    role?: true
    name?: true
    profilePicture?: true
    isVerified?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    provider?: true
    role?: true
    name?: true
    profilePicture?: true
    isVerified?: true
    isActive?: true
    lastLoginAt?: true
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
    provider: $Enums.AuthProvider
    role: $Enums.Role
    name: string
    profilePicture: string | null
    isVerified: boolean
    isActive: boolean
    lastLoginAt: Date | null
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
    provider?: boolean
    role?: boolean
    name?: boolean
    profilePicture?: boolean
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    menteeProfile?: boolean | User$menteeProfileArgs<ExtArgs>
    mentorProfile?: boolean | User$mentorProfileArgs<ExtArgs>
    menteeBookings?: boolean | User$menteeBookingsArgs<ExtArgs>
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    provider?: boolean
    role?: boolean
    name?: boolean
    profilePicture?: boolean
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    provider?: boolean
    role?: boolean
    name?: boolean
    profilePicture?: boolean
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menteeProfile?: boolean | User$menteeProfileArgs<ExtArgs>
    mentorProfile?: boolean | User$mentorProfileArgs<ExtArgs>
    menteeBookings?: boolean | User$menteeBookingsArgs<ExtArgs>
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      menteeProfile: Prisma.$MenteeProfilePayload<ExtArgs> | null
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs> | null
      menteeBookings: Prisma.$BookingPayload<ExtArgs>[]
      reviewsGiven: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      googleId: string | null
      provider: $Enums.AuthProvider
      role: $Enums.Role
      name: string
      profilePicture: string | null
      isVerified: boolean
      isActive: boolean
      lastLoginAt: Date | null
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
    menteeProfile<T extends User$menteeProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$menteeProfileArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    mentorProfile<T extends User$mentorProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$mentorProfileArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    menteeBookings<T extends User$menteeBookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$menteeBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    reviewsGiven<T extends User$reviewsGivenArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly provider: FieldRef<"User", 'AuthProvider'>
    readonly role: FieldRef<"User", 'Role'>
    readonly name: FieldRef<"User", 'String'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
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
   * User.menteeBookings
   */
  export type User$menteeBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * User.reviewsGiven
   */
  export type User$reviewsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
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
    otherMbaScore: number | null
  }

  export type MenteeProfileSumAggregateOutputType = {
    otherMbaScore: number | null
  }

  export type MenteeProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    dateOfBirth: Date | null
    contactNumber: string | null
    otherMbaScore: number | null
    workExperience: string | null
    certifications: string | null
    expectations: string | null
    resumeUrl: string | null
    linkedInUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    dateOfBirth: Date | null
    contactNumber: string | null
    otherMbaScore: number | null
    workExperience: string | null
    certifications: string | null
    expectations: string | null
    resumeUrl: string | null
    linkedInUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileCountAggregateOutputType = {
    id: number
    userId: number
    username: number
    dateOfBirth: number
    contactNumber: number
    education: number
    catHistory: number
    otherMbaScore: number
    workExperience: number
    certifications: number
    expectations: number
    skillsets: number
    resumeUrl: number
    linkedInUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MenteeProfileAvgAggregateInputType = {
    otherMbaScore?: true
  }

  export type MenteeProfileSumAggregateInputType = {
    otherMbaScore?: true
  }

  export type MenteeProfileMinAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    dateOfBirth?: true
    contactNumber?: true
    otherMbaScore?: true
    workExperience?: true
    certifications?: true
    expectations?: true
    resumeUrl?: true
    linkedInUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    dateOfBirth?: true
    contactNumber?: true
    otherMbaScore?: true
    workExperience?: true
    certifications?: true
    expectations?: true
    resumeUrl?: true
    linkedInUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    dateOfBirth?: true
    contactNumber?: true
    education?: true
    catHistory?: true
    otherMbaScore?: true
    workExperience?: true
    certifications?: true
    expectations?: true
    skillsets?: true
    resumeUrl?: true
    linkedInUrl?: true
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
    username: string
    dateOfBirth: Date
    contactNumber: string
    education: JsonValue
    catHistory: JsonValue | null
    otherMbaScore: number | null
    workExperience: string | null
    certifications: string | null
    expectations: string | null
    skillsets: string[]
    resumeUrl: string | null
    linkedInUrl: string | null
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
    username?: boolean
    dateOfBirth?: boolean
    contactNumber?: boolean
    education?: boolean
    catHistory?: boolean
    otherMbaScore?: boolean
    workExperience?: boolean
    certifications?: boolean
    expectations?: boolean
    skillsets?: boolean
    resumeUrl?: boolean
    linkedInUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    dateOfBirth?: boolean
    contactNumber?: boolean
    education?: boolean
    catHistory?: boolean
    otherMbaScore?: boolean
    workExperience?: boolean
    certifications?: boolean
    expectations?: boolean
    skillsets?: boolean
    resumeUrl?: boolean
    linkedInUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    username?: boolean
    dateOfBirth?: boolean
    contactNumber?: boolean
    education?: boolean
    catHistory?: boolean
    otherMbaScore?: boolean
    workExperience?: boolean
    certifications?: boolean
    expectations?: boolean
    skillsets?: boolean
    resumeUrl?: boolean
    linkedInUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MenteeProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MenteeProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MenteeProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenteeProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      username: string
      dateOfBirth: Date
      contactNumber: string
      education: Prisma.JsonValue
      catHistory: Prisma.JsonValue | null
      otherMbaScore: number | null
      workExperience: string | null
      certifications: string | null
      expectations: string | null
      skillsets: string[]
      resumeUrl: string | null
      linkedInUrl: string | null
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
    readonly username: FieldRef<"MenteeProfile", 'String'>
    readonly dateOfBirth: FieldRef<"MenteeProfile", 'DateTime'>
    readonly contactNumber: FieldRef<"MenteeProfile", 'String'>
    readonly education: FieldRef<"MenteeProfile", 'Json'>
    readonly catHistory: FieldRef<"MenteeProfile", 'Json'>
    readonly otherMbaScore: FieldRef<"MenteeProfile", 'Float'>
    readonly workExperience: FieldRef<"MenteeProfile", 'String'>
    readonly certifications: FieldRef<"MenteeProfile", 'String'>
    readonly expectations: FieldRef<"MenteeProfile", 'String'>
    readonly skillsets: FieldRef<"MenteeProfile", 'String[]'>
    readonly resumeUrl: FieldRef<"MenteeProfile", 'String'>
    readonly linkedInUrl: FieldRef<"MenteeProfile", 'String'>
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
    totalSessions: number | null
    totalEarnings: number | null
    averageRating: number | null
  }

  export type MentorProfileSumAggregateOutputType = {
    totalSessions: number | null
    totalEarnings: number | null
    averageRating: number | null
  }

  export type MentorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    bio: string | null
    linkedInUrl: string | null
    contactNumber: string | null
    ugCollegeProfile: string | null
    pgCollegeProfile: string | null
    workExperience: string | null
    certifications: string | null
    collegeDocumentUrl: string | null
    approvalStatus: $Enums.MentorApprovalStatus | null
    isVerified: boolean | null
    totalSessions: number | null
    totalEarnings: number | null
    averageRating: number | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    bio: string | null
    linkedInUrl: string | null
    contactNumber: string | null
    ugCollegeProfile: string | null
    pgCollegeProfile: string | null
    workExperience: string | null
    certifications: string | null
    collegeDocumentUrl: string | null
    approvalStatus: $Enums.MentorApprovalStatus | null
    isVerified: boolean | null
    totalSessions: number | null
    totalEarnings: number | null
    averageRating: number | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileCountAggregateOutputType = {
    id: number
    userId: number
    username: number
    bio: number
    linkedInUrl: number
    contactNumber: number
    expertiseTags: number
    ugCollegeProfile: number
    pgCollegeProfile: number
    workExperience: number
    certifications: number
    collegeDocumentUrl: number
    approvalStatus: number
    isVerified: number
    totalSessions: number
    totalEarnings: number
    averageRating: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorProfileAvgAggregateInputType = {
    totalSessions?: true
    totalEarnings?: true
    averageRating?: true
  }

  export type MentorProfileSumAggregateInputType = {
    totalSessions?: true
    totalEarnings?: true
    averageRating?: true
  }

  export type MentorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    bio?: true
    linkedInUrl?: true
    contactNumber?: true
    ugCollegeProfile?: true
    pgCollegeProfile?: true
    workExperience?: true
    certifications?: true
    collegeDocumentUrl?: true
    approvalStatus?: true
    isVerified?: true
    totalSessions?: true
    totalEarnings?: true
    averageRating?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    bio?: true
    linkedInUrl?: true
    contactNumber?: true
    ugCollegeProfile?: true
    pgCollegeProfile?: true
    workExperience?: true
    certifications?: true
    collegeDocumentUrl?: true
    approvalStatus?: true
    isVerified?: true
    totalSessions?: true
    totalEarnings?: true
    averageRating?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    bio?: true
    linkedInUrl?: true
    contactNumber?: true
    expertiseTags?: true
    ugCollegeProfile?: true
    pgCollegeProfile?: true
    workExperience?: true
    certifications?: true
    collegeDocumentUrl?: true
    approvalStatus?: true
    isVerified?: true
    totalSessions?: true
    totalEarnings?: true
    averageRating?: true
    timezone?: true
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
    username: string
    bio: string
    linkedInUrl: string | null
    contactNumber: string
    expertiseTags: string[]
    ugCollegeProfile: string | null
    pgCollegeProfile: string | null
    workExperience: string | null
    certifications: string | null
    collegeDocumentUrl: string | null
    approvalStatus: $Enums.MentorApprovalStatus
    isVerified: boolean
    totalSessions: number
    totalEarnings: number
    averageRating: number
    timezone: string
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
    username?: boolean
    bio?: boolean
    linkedInUrl?: boolean
    contactNumber?: boolean
    expertiseTags?: boolean
    ugCollegeProfile?: boolean
    pgCollegeProfile?: boolean
    workExperience?: boolean
    certifications?: boolean
    collegeDocumentUrl?: boolean
    approvalStatus?: boolean
    isVerified?: boolean
    totalSessions?: boolean
    totalEarnings?: boolean
    averageRating?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mentorServices?: boolean | MentorProfile$mentorServicesArgs<ExtArgs>
    availabilityWindows?: boolean | MentorProfile$availabilityWindowsArgs<ExtArgs>
    mentorBookings?: boolean | MentorProfile$mentorBookingsArgs<ExtArgs>
    reviews?: boolean | MentorProfile$reviewsArgs<ExtArgs>
    feedbacks?: boolean | MentorProfile$feedbacksArgs<ExtArgs>
    payouts?: boolean | MentorProfile$payoutsArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    bio?: boolean
    linkedInUrl?: boolean
    contactNumber?: boolean
    expertiseTags?: boolean
    ugCollegeProfile?: boolean
    pgCollegeProfile?: boolean
    workExperience?: boolean
    certifications?: boolean
    collegeDocumentUrl?: boolean
    approvalStatus?: boolean
    isVerified?: boolean
    totalSessions?: boolean
    totalEarnings?: boolean
    averageRating?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    username?: boolean
    bio?: boolean
    linkedInUrl?: boolean
    contactNumber?: boolean
    expertiseTags?: boolean
    ugCollegeProfile?: boolean
    pgCollegeProfile?: boolean
    workExperience?: boolean
    certifications?: boolean
    collegeDocumentUrl?: boolean
    approvalStatus?: boolean
    isVerified?: boolean
    totalSessions?: boolean
    totalEarnings?: boolean
    averageRating?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mentorServices?: boolean | MentorProfile$mentorServicesArgs<ExtArgs>
    availabilityWindows?: boolean | MentorProfile$availabilityWindowsArgs<ExtArgs>
    mentorBookings?: boolean | MentorProfile$mentorBookingsArgs<ExtArgs>
    reviews?: boolean | MentorProfile$reviewsArgs<ExtArgs>
    feedbacks?: boolean | MentorProfile$feedbacksArgs<ExtArgs>
    payouts?: boolean | MentorProfile$payoutsArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MentorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MentorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mentorServices: Prisma.$MentorServicePayload<ExtArgs>[]
      availabilityWindows: Prisma.$AvailabilityWindowPayload<ExtArgs>[]
      mentorBookings: Prisma.$BookingPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      feedbacks: Prisma.$SessionFeedbackPayload<ExtArgs>[]
      payouts: Prisma.$PayoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      username: string
      bio: string
      linkedInUrl: string | null
      contactNumber: string
      expertiseTags: string[]
      ugCollegeProfile: string | null
      pgCollegeProfile: string | null
      workExperience: string | null
      certifications: string | null
      collegeDocumentUrl: string | null
      approvalStatus: $Enums.MentorApprovalStatus
      isVerified: boolean
      totalSessions: number
      totalEarnings: number
      averageRating: number
      timezone: string
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
    mentorServices<T extends MentorProfile$mentorServicesArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$mentorServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findMany"> | Null>
    availabilityWindows<T extends MentorProfile$availabilityWindowsArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$availabilityWindowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findMany"> | Null>
    mentorBookings<T extends MentorProfile$mentorBookingsArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$mentorBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends MentorProfile$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    feedbacks<T extends MentorProfile$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findMany"> | Null>
    payouts<T extends MentorProfile$payoutsArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$payoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly username: FieldRef<"MentorProfile", 'String'>
    readonly bio: FieldRef<"MentorProfile", 'String'>
    readonly linkedInUrl: FieldRef<"MentorProfile", 'String'>
    readonly contactNumber: FieldRef<"MentorProfile", 'String'>
    readonly expertiseTags: FieldRef<"MentorProfile", 'String[]'>
    readonly ugCollegeProfile: FieldRef<"MentorProfile", 'String'>
    readonly pgCollegeProfile: FieldRef<"MentorProfile", 'String'>
    readonly workExperience: FieldRef<"MentorProfile", 'String'>
    readonly certifications: FieldRef<"MentorProfile", 'String'>
    readonly collegeDocumentUrl: FieldRef<"MentorProfile", 'String'>
    readonly approvalStatus: FieldRef<"MentorProfile", 'MentorApprovalStatus'>
    readonly isVerified: FieldRef<"MentorProfile", 'Boolean'>
    readonly totalSessions: FieldRef<"MentorProfile", 'Int'>
    readonly totalEarnings: FieldRef<"MentorProfile", 'Float'>
    readonly averageRating: FieldRef<"MentorProfile", 'Float'>
    readonly timezone: FieldRef<"MentorProfile", 'String'>
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
   * MentorProfile.mentorServices
   */
  export type MentorProfile$mentorServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    where?: MentorServiceWhereInput
    orderBy?: MentorServiceOrderByWithRelationInput | MentorServiceOrderByWithRelationInput[]
    cursor?: MentorServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MentorServiceScalarFieldEnum | MentorServiceScalarFieldEnum[]
  }

  /**
   * MentorProfile.availabilityWindows
   */
  export type MentorProfile$availabilityWindowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    where?: AvailabilityWindowWhereInput
    orderBy?: AvailabilityWindowOrderByWithRelationInput | AvailabilityWindowOrderByWithRelationInput[]
    cursor?: AvailabilityWindowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailabilityWindowScalarFieldEnum | AvailabilityWindowScalarFieldEnum[]
  }

  /**
   * MentorProfile.mentorBookings
   */
  export type MentorProfile$mentorBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MentorProfile.reviews
   */
  export type MentorProfile$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * MentorProfile.feedbacks
   */
  export type MentorProfile$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    where?: SessionFeedbackWhereInput
    orderBy?: SessionFeedbackOrderByWithRelationInput | SessionFeedbackOrderByWithRelationInput[]
    cursor?: SessionFeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionFeedbackScalarFieldEnum | SessionFeedbackScalarFieldEnum[]
  }

  /**
   * MentorProfile.payouts
   */
  export type MentorProfile$payoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    cursor?: PayoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
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
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorServices?: boolean | Service$mentorServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorServices?: boolean | Service$mentorServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      mentorServices: Prisma.$MentorServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentorServices<T extends Service$mentorServicesArgs<ExtArgs> = {}>(args?: Subset<T, Service$mentorServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly slug: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }

  /**
   * Service.mentorServices
   */
  export type Service$mentorServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    where?: MentorServiceWhereInput
    orderBy?: MentorServiceOrderByWithRelationInput | MentorServiceOrderByWithRelationInput[]
    cursor?: MentorServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MentorServiceScalarFieldEnum | MentorServiceScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model MentorService
   */

  export type AggregateMentorService = {
    _count: MentorServiceCountAggregateOutputType | null
    _avg: MentorServiceAvgAggregateOutputType | null
    _sum: MentorServiceSumAggregateOutputType | null
    _min: MentorServiceMinAggregateOutputType | null
    _max: MentorServiceMaxAggregateOutputType | null
  }

  export type MentorServiceAvgAggregateOutputType = {
    price: number | null
    durationMinutes: number | null
    bufferMinutes: number | null
  }

  export type MentorServiceSumAggregateOutputType = {
    price: number | null
    durationMinutes: number | null
    bufferMinutes: number | null
  }

  export type MentorServiceMinAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    serviceId: string | null
    price: number | null
    durationMinutes: number | null
    bufferMinutes: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorServiceMaxAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    serviceId: string | null
    price: number | null
    durationMinutes: number | null
    bufferMinutes: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorServiceCountAggregateOutputType = {
    id: number
    mentorProfileId: number
    serviceId: number
    price: number
    durationMinutes: number
    bufferMinutes: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorServiceAvgAggregateInputType = {
    price?: true
    durationMinutes?: true
    bufferMinutes?: true
  }

  export type MentorServiceSumAggregateInputType = {
    price?: true
    durationMinutes?: true
    bufferMinutes?: true
  }

  export type MentorServiceMinAggregateInputType = {
    id?: true
    mentorProfileId?: true
    serviceId?: true
    price?: true
    durationMinutes?: true
    bufferMinutes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorServiceMaxAggregateInputType = {
    id?: true
    mentorProfileId?: true
    serviceId?: true
    price?: true
    durationMinutes?: true
    bufferMinutes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorServiceCountAggregateInputType = {
    id?: true
    mentorProfileId?: true
    serviceId?: true
    price?: true
    durationMinutes?: true
    bufferMinutes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MentorServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorService to aggregate.
     */
    where?: MentorServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorServices to fetch.
     */
    orderBy?: MentorServiceOrderByWithRelationInput | MentorServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorServices
    **/
    _count?: true | MentorServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MentorServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MentorServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorServiceMaxAggregateInputType
  }

  export type GetMentorServiceAggregateType<T extends MentorServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorService[P]>
      : GetScalarType<T[P], AggregateMentorService[P]>
  }




  export type MentorServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorServiceWhereInput
    orderBy?: MentorServiceOrderByWithAggregationInput | MentorServiceOrderByWithAggregationInput[]
    by: MentorServiceScalarFieldEnum[] | MentorServiceScalarFieldEnum
    having?: MentorServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorServiceCountAggregateInputType | true
    _avg?: MentorServiceAvgAggregateInputType
    _sum?: MentorServiceSumAggregateInputType
    _min?: MentorServiceMinAggregateInputType
    _max?: MentorServiceMaxAggregateInputType
  }

  export type MentorServiceGroupByOutputType = {
    id: string
    mentorProfileId: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: MentorServiceCountAggregateOutputType | null
    _avg: MentorServiceAvgAggregateOutputType | null
    _sum: MentorServiceSumAggregateOutputType | null
    _min: MentorServiceMinAggregateOutputType | null
    _max: MentorServiceMaxAggregateOutputType | null
  }

  type GetMentorServiceGroupByPayload<T extends MentorServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorServiceGroupByOutputType[P]>
            : GetScalarType<T[P], MentorServiceGroupByOutputType[P]>
        }
      >
    >


  export type MentorServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    serviceId?: boolean
    price?: boolean
    durationMinutes?: boolean
    bufferMinutes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    windowServices?: boolean | MentorService$windowServicesArgs<ExtArgs>
    bookings?: boolean | MentorService$bookingsArgs<ExtArgs>
    _count?: boolean | MentorServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorService"]>

  export type MentorServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    serviceId?: boolean
    price?: boolean
    durationMinutes?: boolean
    bufferMinutes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorService"]>

  export type MentorServiceSelectScalar = {
    id?: boolean
    mentorProfileId?: boolean
    serviceId?: boolean
    price?: boolean
    durationMinutes?: boolean
    bufferMinutes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    windowServices?: boolean | MentorService$windowServicesArgs<ExtArgs>
    bookings?: boolean | MentorService$bookingsArgs<ExtArgs>
    _count?: boolean | MentorServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MentorServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $MentorServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorService"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
      windowServices: Prisma.$AvailabilityWindowServicePayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorProfileId: string
      serviceId: string
      /**
       * Price in INR
       */
      price: number
      /**
       * Session duration: 15, 30, 45, or 60 minutes
       */
      durationMinutes: number
      /**
       * Optional buffer between consecutive slots (minutes)
       */
      bufferMinutes: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mentorService"]>
    composites: {}
  }

  type MentorServiceGetPayload<S extends boolean | null | undefined | MentorServiceDefaultArgs> = $Result.GetResult<Prisma.$MentorServicePayload, S>

  type MentorServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorServiceCountAggregateInputType | true
    }

  export interface MentorServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorService'], meta: { name: 'MentorService' } }
    /**
     * Find zero or one MentorService that matches the filter.
     * @param {MentorServiceFindUniqueArgs} args - Arguments to find a MentorService
     * @example
     * // Get one MentorService
     * const mentorService = await prisma.mentorService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorServiceFindUniqueArgs>(args: SelectSubset<T, MentorServiceFindUniqueArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorServiceFindUniqueOrThrowArgs} args - Arguments to find a MentorService
     * @example
     * // Get one MentorService
     * const mentorService = await prisma.mentorService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceFindFirstArgs} args - Arguments to find a MentorService
     * @example
     * // Get one MentorService
     * const mentorService = await prisma.mentorService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorServiceFindFirstArgs>(args?: SelectSubset<T, MentorServiceFindFirstArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceFindFirstOrThrowArgs} args - Arguments to find a MentorService
     * @example
     * // Get one MentorService
     * const mentorService = await prisma.mentorService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorServices
     * const mentorServices = await prisma.mentorService.findMany()
     * 
     * // Get first 10 MentorServices
     * const mentorServices = await prisma.mentorService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorServiceWithIdOnly = await prisma.mentorService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorServiceFindManyArgs>(args?: SelectSubset<T, MentorServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorService.
     * @param {MentorServiceCreateArgs} args - Arguments to create a MentorService.
     * @example
     * // Create one MentorService
     * const MentorService = await prisma.mentorService.create({
     *   data: {
     *     // ... data to create a MentorService
     *   }
     * })
     * 
     */
    create<T extends MentorServiceCreateArgs>(args: SelectSubset<T, MentorServiceCreateArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorServices.
     * @param {MentorServiceCreateManyArgs} args - Arguments to create many MentorServices.
     * @example
     * // Create many MentorServices
     * const mentorService = await prisma.mentorService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorServiceCreateManyArgs>(args?: SelectSubset<T, MentorServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorServices and returns the data saved in the database.
     * @param {MentorServiceCreateManyAndReturnArgs} args - Arguments to create many MentorServices.
     * @example
     * // Create many MentorServices
     * const mentorService = await prisma.mentorService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorServices and only return the `id`
     * const mentorServiceWithIdOnly = await prisma.mentorService.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorService.
     * @param {MentorServiceDeleteArgs} args - Arguments to delete one MentorService.
     * @example
     * // Delete one MentorService
     * const MentorService = await prisma.mentorService.delete({
     *   where: {
     *     // ... filter to delete one MentorService
     *   }
     * })
     * 
     */
    delete<T extends MentorServiceDeleteArgs>(args: SelectSubset<T, MentorServiceDeleteArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorService.
     * @param {MentorServiceUpdateArgs} args - Arguments to update one MentorService.
     * @example
     * // Update one MentorService
     * const mentorService = await prisma.mentorService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorServiceUpdateArgs>(args: SelectSubset<T, MentorServiceUpdateArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorServices.
     * @param {MentorServiceDeleteManyArgs} args - Arguments to filter MentorServices to delete.
     * @example
     * // Delete a few MentorServices
     * const { count } = await prisma.mentorService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorServiceDeleteManyArgs>(args?: SelectSubset<T, MentorServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorServices
     * const mentorService = await prisma.mentorService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorServiceUpdateManyArgs>(args: SelectSubset<T, MentorServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorService.
     * @param {MentorServiceUpsertArgs} args - Arguments to update or create a MentorService.
     * @example
     * // Update or create a MentorService
     * const mentorService = await prisma.mentorService.upsert({
     *   create: {
     *     // ... data to create a MentorService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorService we want to update
     *   }
     * })
     */
    upsert<T extends MentorServiceUpsertArgs>(args: SelectSubset<T, MentorServiceUpsertArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceCountArgs} args - Arguments to filter MentorServices to count.
     * @example
     * // Count the number of MentorServices
     * const count = await prisma.mentorService.count({
     *   where: {
     *     // ... the filter for the MentorServices we want to count
     *   }
     * })
    **/
    count<T extends MentorServiceCountArgs>(
      args?: Subset<T, MentorServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MentorServiceAggregateArgs>(args: Subset<T, MentorServiceAggregateArgs>): Prisma.PrismaPromise<GetMentorServiceAggregateType<T>>

    /**
     * Group by MentorService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorServiceGroupByArgs} args - Group by arguments.
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
      T extends MentorServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorServiceGroupByArgs['orderBy'] }
        : { orderBy?: MentorServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MentorServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorService model
   */
  readonly fields: MentorServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    windowServices<T extends MentorService$windowServicesArgs<ExtArgs> = {}>(args?: Subset<T, MentorService$windowServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findMany"> | Null>
    bookings<T extends MentorService$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, MentorService$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the MentorService model
   */ 
  interface MentorServiceFieldRefs {
    readonly id: FieldRef<"MentorService", 'String'>
    readonly mentorProfileId: FieldRef<"MentorService", 'String'>
    readonly serviceId: FieldRef<"MentorService", 'String'>
    readonly price: FieldRef<"MentorService", 'Float'>
    readonly durationMinutes: FieldRef<"MentorService", 'Int'>
    readonly bufferMinutes: FieldRef<"MentorService", 'Int'>
    readonly isActive: FieldRef<"MentorService", 'Boolean'>
    readonly createdAt: FieldRef<"MentorService", 'DateTime'>
    readonly updatedAt: FieldRef<"MentorService", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorService findUnique
   */
  export type MentorServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * Filter, which MentorService to fetch.
     */
    where: MentorServiceWhereUniqueInput
  }

  /**
   * MentorService findUniqueOrThrow
   */
  export type MentorServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * Filter, which MentorService to fetch.
     */
    where: MentorServiceWhereUniqueInput
  }

  /**
   * MentorService findFirst
   */
  export type MentorServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * Filter, which MentorService to fetch.
     */
    where?: MentorServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorServices to fetch.
     */
    orderBy?: MentorServiceOrderByWithRelationInput | MentorServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorServices.
     */
    cursor?: MentorServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorServices.
     */
    distinct?: MentorServiceScalarFieldEnum | MentorServiceScalarFieldEnum[]
  }

  /**
   * MentorService findFirstOrThrow
   */
  export type MentorServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * Filter, which MentorService to fetch.
     */
    where?: MentorServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorServices to fetch.
     */
    orderBy?: MentorServiceOrderByWithRelationInput | MentorServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorServices.
     */
    cursor?: MentorServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorServices.
     */
    distinct?: MentorServiceScalarFieldEnum | MentorServiceScalarFieldEnum[]
  }

  /**
   * MentorService findMany
   */
  export type MentorServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * Filter, which MentorServices to fetch.
     */
    where?: MentorServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorServices to fetch.
     */
    orderBy?: MentorServiceOrderByWithRelationInput | MentorServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorServices.
     */
    cursor?: MentorServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorServices.
     */
    skip?: number
    distinct?: MentorServiceScalarFieldEnum | MentorServiceScalarFieldEnum[]
  }

  /**
   * MentorService create
   */
  export type MentorServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a MentorService.
     */
    data: XOR<MentorServiceCreateInput, MentorServiceUncheckedCreateInput>
  }

  /**
   * MentorService createMany
   */
  export type MentorServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorServices.
     */
    data: MentorServiceCreateManyInput | MentorServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorService createManyAndReturn
   */
  export type MentorServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorServices.
     */
    data: MentorServiceCreateManyInput | MentorServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MentorService update
   */
  export type MentorServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a MentorService.
     */
    data: XOR<MentorServiceUpdateInput, MentorServiceUncheckedUpdateInput>
    /**
     * Choose, which MentorService to update.
     */
    where: MentorServiceWhereUniqueInput
  }

  /**
   * MentorService updateMany
   */
  export type MentorServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorServices.
     */
    data: XOR<MentorServiceUpdateManyMutationInput, MentorServiceUncheckedUpdateManyInput>
    /**
     * Filter which MentorServices to update
     */
    where?: MentorServiceWhereInput
  }

  /**
   * MentorService upsert
   */
  export type MentorServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the MentorService to update in case it exists.
     */
    where: MentorServiceWhereUniqueInput
    /**
     * In case the MentorService found by the `where` argument doesn't exist, create a new MentorService with this data.
     */
    create: XOR<MentorServiceCreateInput, MentorServiceUncheckedCreateInput>
    /**
     * In case the MentorService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorServiceUpdateInput, MentorServiceUncheckedUpdateInput>
  }

  /**
   * MentorService delete
   */
  export type MentorServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
    /**
     * Filter which MentorService to delete.
     */
    where: MentorServiceWhereUniqueInput
  }

  /**
   * MentorService deleteMany
   */
  export type MentorServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorServices to delete
     */
    where?: MentorServiceWhereInput
  }

  /**
   * MentorService.windowServices
   */
  export type MentorService$windowServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    where?: AvailabilityWindowServiceWhereInput
    orderBy?: AvailabilityWindowServiceOrderByWithRelationInput | AvailabilityWindowServiceOrderByWithRelationInput[]
    cursor?: AvailabilityWindowServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailabilityWindowServiceScalarFieldEnum | AvailabilityWindowServiceScalarFieldEnum[]
  }

  /**
   * MentorService.bookings
   */
  export type MentorService$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MentorService without action
   */
  export type MentorServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorService
     */
    select?: MentorServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorServiceInclude<ExtArgs> | null
  }


  /**
   * Model AvailabilityWindow
   */

  export type AggregateAvailabilityWindow = {
    _count: AvailabilityWindowCountAggregateOutputType | null
    _min: AvailabilityWindowMinAggregateOutputType | null
    _max: AvailabilityWindowMaxAggregateOutputType | null
  }

  export type AvailabilityWindowMinAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    specificDate: Date | null
    startTime: Date | null
    endTime: Date | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailabilityWindowMaxAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    specificDate: Date | null
    startTime: Date | null
    endTime: Date | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailabilityWindowCountAggregateOutputType = {
    id: number
    mentorProfileId: number
    dayOfWeek: number
    specificDate: number
    startTime: number
    endTime: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AvailabilityWindowMinAggregateInputType = {
    id?: true
    mentorProfileId?: true
    dayOfWeek?: true
    specificDate?: true
    startTime?: true
    endTime?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailabilityWindowMaxAggregateInputType = {
    id?: true
    mentorProfileId?: true
    dayOfWeek?: true
    specificDate?: true
    startTime?: true
    endTime?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailabilityWindowCountAggregateInputType = {
    id?: true
    mentorProfileId?: true
    dayOfWeek?: true
    specificDate?: true
    startTime?: true
    endTime?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AvailabilityWindowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityWindow to aggregate.
     */
    where?: AvailabilityWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindows to fetch.
     */
    orderBy?: AvailabilityWindowOrderByWithRelationInput | AvailabilityWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailabilityWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailabilityWindows
    **/
    _count?: true | AvailabilityWindowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailabilityWindowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailabilityWindowMaxAggregateInputType
  }

  export type GetAvailabilityWindowAggregateType<T extends AvailabilityWindowAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailabilityWindow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailabilityWindow[P]>
      : GetScalarType<T[P], AggregateAvailabilityWindow[P]>
  }




  export type AvailabilityWindowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityWindowWhereInput
    orderBy?: AvailabilityWindowOrderByWithAggregationInput | AvailabilityWindowOrderByWithAggregationInput[]
    by: AvailabilityWindowScalarFieldEnum[] | AvailabilityWindowScalarFieldEnum
    having?: AvailabilityWindowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailabilityWindowCountAggregateInputType | true
    _min?: AvailabilityWindowMinAggregateInputType
    _max?: AvailabilityWindowMaxAggregateInputType
  }

  export type AvailabilityWindowGroupByOutputType = {
    id: string
    mentorProfileId: string
    dayOfWeek: $Enums.DayOfWeek | null
    specificDate: Date | null
    startTime: Date
    endTime: Date
    timezone: string
    createdAt: Date
    updatedAt: Date
    _count: AvailabilityWindowCountAggregateOutputType | null
    _min: AvailabilityWindowMinAggregateOutputType | null
    _max: AvailabilityWindowMaxAggregateOutputType | null
  }

  type GetAvailabilityWindowGroupByPayload<T extends AvailabilityWindowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailabilityWindowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailabilityWindowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailabilityWindowGroupByOutputType[P]>
            : GetScalarType<T[P], AvailabilityWindowGroupByOutputType[P]>
        }
      >
    >


  export type AvailabilityWindowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    dayOfWeek?: boolean
    specificDate?: boolean
    startTime?: boolean
    endTime?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    windowServices?: boolean | AvailabilityWindow$windowServicesArgs<ExtArgs>
    _count?: boolean | AvailabilityWindowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityWindow"]>

  export type AvailabilityWindowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    dayOfWeek?: boolean
    specificDate?: boolean
    startTime?: boolean
    endTime?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityWindow"]>

  export type AvailabilityWindowSelectScalar = {
    id?: boolean
    mentorProfileId?: boolean
    dayOfWeek?: boolean
    specificDate?: boolean
    startTime?: boolean
    endTime?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AvailabilityWindowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    windowServices?: boolean | AvailabilityWindow$windowServicesArgs<ExtArgs>
    _count?: boolean | AvailabilityWindowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvailabilityWindowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $AvailabilityWindowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailabilityWindow"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
      windowServices: Prisma.$AvailabilityWindowServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorProfileId: string
      /**
       * For recurring windows — e.g., every MONDAY
       */
      dayOfWeek: $Enums.DayOfWeek | null
      /**
       * For one-off overrides — e.g., 2026-05-15
       */
      specificDate: Date | null
      /**
       * Start time (stored as HH:mm in canonical 1970-01-01 UTC)
       */
      startTime: Date
      /**
       * End time (stored as HH:mm in canonical 1970-01-01 UTC)
       */
      endTime: Date
      /**
       * IANA timezone (default IST)
       */
      timezone: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["availabilityWindow"]>
    composites: {}
  }

  type AvailabilityWindowGetPayload<S extends boolean | null | undefined | AvailabilityWindowDefaultArgs> = $Result.GetResult<Prisma.$AvailabilityWindowPayload, S>

  type AvailabilityWindowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AvailabilityWindowFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AvailabilityWindowCountAggregateInputType | true
    }

  export interface AvailabilityWindowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailabilityWindow'], meta: { name: 'AvailabilityWindow' } }
    /**
     * Find zero or one AvailabilityWindow that matches the filter.
     * @param {AvailabilityWindowFindUniqueArgs} args - Arguments to find a AvailabilityWindow
     * @example
     * // Get one AvailabilityWindow
     * const availabilityWindow = await prisma.availabilityWindow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailabilityWindowFindUniqueArgs>(args: SelectSubset<T, AvailabilityWindowFindUniqueArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AvailabilityWindow that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AvailabilityWindowFindUniqueOrThrowArgs} args - Arguments to find a AvailabilityWindow
     * @example
     * // Get one AvailabilityWindow
     * const availabilityWindow = await prisma.availabilityWindow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailabilityWindowFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailabilityWindowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AvailabilityWindow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowFindFirstArgs} args - Arguments to find a AvailabilityWindow
     * @example
     * // Get one AvailabilityWindow
     * const availabilityWindow = await prisma.availabilityWindow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailabilityWindowFindFirstArgs>(args?: SelectSubset<T, AvailabilityWindowFindFirstArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AvailabilityWindow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowFindFirstOrThrowArgs} args - Arguments to find a AvailabilityWindow
     * @example
     * // Get one AvailabilityWindow
     * const availabilityWindow = await prisma.availabilityWindow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailabilityWindowFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailabilityWindowFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AvailabilityWindows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailabilityWindows
     * const availabilityWindows = await prisma.availabilityWindow.findMany()
     * 
     * // Get first 10 AvailabilityWindows
     * const availabilityWindows = await prisma.availabilityWindow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availabilityWindowWithIdOnly = await prisma.availabilityWindow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailabilityWindowFindManyArgs>(args?: SelectSubset<T, AvailabilityWindowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AvailabilityWindow.
     * @param {AvailabilityWindowCreateArgs} args - Arguments to create a AvailabilityWindow.
     * @example
     * // Create one AvailabilityWindow
     * const AvailabilityWindow = await prisma.availabilityWindow.create({
     *   data: {
     *     // ... data to create a AvailabilityWindow
     *   }
     * })
     * 
     */
    create<T extends AvailabilityWindowCreateArgs>(args: SelectSubset<T, AvailabilityWindowCreateArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AvailabilityWindows.
     * @param {AvailabilityWindowCreateManyArgs} args - Arguments to create many AvailabilityWindows.
     * @example
     * // Create many AvailabilityWindows
     * const availabilityWindow = await prisma.availabilityWindow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailabilityWindowCreateManyArgs>(args?: SelectSubset<T, AvailabilityWindowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailabilityWindows and returns the data saved in the database.
     * @param {AvailabilityWindowCreateManyAndReturnArgs} args - Arguments to create many AvailabilityWindows.
     * @example
     * // Create many AvailabilityWindows
     * const availabilityWindow = await prisma.availabilityWindow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailabilityWindows and only return the `id`
     * const availabilityWindowWithIdOnly = await prisma.availabilityWindow.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailabilityWindowCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailabilityWindowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AvailabilityWindow.
     * @param {AvailabilityWindowDeleteArgs} args - Arguments to delete one AvailabilityWindow.
     * @example
     * // Delete one AvailabilityWindow
     * const AvailabilityWindow = await prisma.availabilityWindow.delete({
     *   where: {
     *     // ... filter to delete one AvailabilityWindow
     *   }
     * })
     * 
     */
    delete<T extends AvailabilityWindowDeleteArgs>(args: SelectSubset<T, AvailabilityWindowDeleteArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AvailabilityWindow.
     * @param {AvailabilityWindowUpdateArgs} args - Arguments to update one AvailabilityWindow.
     * @example
     * // Update one AvailabilityWindow
     * const availabilityWindow = await prisma.availabilityWindow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailabilityWindowUpdateArgs>(args: SelectSubset<T, AvailabilityWindowUpdateArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AvailabilityWindows.
     * @param {AvailabilityWindowDeleteManyArgs} args - Arguments to filter AvailabilityWindows to delete.
     * @example
     * // Delete a few AvailabilityWindows
     * const { count } = await prisma.availabilityWindow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailabilityWindowDeleteManyArgs>(args?: SelectSubset<T, AvailabilityWindowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailabilityWindows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailabilityWindows
     * const availabilityWindow = await prisma.availabilityWindow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailabilityWindowUpdateManyArgs>(args: SelectSubset<T, AvailabilityWindowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AvailabilityWindow.
     * @param {AvailabilityWindowUpsertArgs} args - Arguments to update or create a AvailabilityWindow.
     * @example
     * // Update or create a AvailabilityWindow
     * const availabilityWindow = await prisma.availabilityWindow.upsert({
     *   create: {
     *     // ... data to create a AvailabilityWindow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailabilityWindow we want to update
     *   }
     * })
     */
    upsert<T extends AvailabilityWindowUpsertArgs>(args: SelectSubset<T, AvailabilityWindowUpsertArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AvailabilityWindows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowCountArgs} args - Arguments to filter AvailabilityWindows to count.
     * @example
     * // Count the number of AvailabilityWindows
     * const count = await prisma.availabilityWindow.count({
     *   where: {
     *     // ... the filter for the AvailabilityWindows we want to count
     *   }
     * })
    **/
    count<T extends AvailabilityWindowCountArgs>(
      args?: Subset<T, AvailabilityWindowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailabilityWindowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailabilityWindow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvailabilityWindowAggregateArgs>(args: Subset<T, AvailabilityWindowAggregateArgs>): Prisma.PrismaPromise<GetAvailabilityWindowAggregateType<T>>

    /**
     * Group by AvailabilityWindow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowGroupByArgs} args - Group by arguments.
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
      T extends AvailabilityWindowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailabilityWindowGroupByArgs['orderBy'] }
        : { orderBy?: AvailabilityWindowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvailabilityWindowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailabilityWindowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailabilityWindow model
   */
  readonly fields: AvailabilityWindowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailabilityWindow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailabilityWindowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    windowServices<T extends AvailabilityWindow$windowServicesArgs<ExtArgs> = {}>(args?: Subset<T, AvailabilityWindow$windowServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the AvailabilityWindow model
   */ 
  interface AvailabilityWindowFieldRefs {
    readonly id: FieldRef<"AvailabilityWindow", 'String'>
    readonly mentorProfileId: FieldRef<"AvailabilityWindow", 'String'>
    readonly dayOfWeek: FieldRef<"AvailabilityWindow", 'DayOfWeek'>
    readonly specificDate: FieldRef<"AvailabilityWindow", 'DateTime'>
    readonly startTime: FieldRef<"AvailabilityWindow", 'DateTime'>
    readonly endTime: FieldRef<"AvailabilityWindow", 'DateTime'>
    readonly timezone: FieldRef<"AvailabilityWindow", 'String'>
    readonly createdAt: FieldRef<"AvailabilityWindow", 'DateTime'>
    readonly updatedAt: FieldRef<"AvailabilityWindow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvailabilityWindow findUnique
   */
  export type AvailabilityWindowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindow to fetch.
     */
    where: AvailabilityWindowWhereUniqueInput
  }

  /**
   * AvailabilityWindow findUniqueOrThrow
   */
  export type AvailabilityWindowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindow to fetch.
     */
    where: AvailabilityWindowWhereUniqueInput
  }

  /**
   * AvailabilityWindow findFirst
   */
  export type AvailabilityWindowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindow to fetch.
     */
    where?: AvailabilityWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindows to fetch.
     */
    orderBy?: AvailabilityWindowOrderByWithRelationInput | AvailabilityWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityWindows.
     */
    cursor?: AvailabilityWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityWindows.
     */
    distinct?: AvailabilityWindowScalarFieldEnum | AvailabilityWindowScalarFieldEnum[]
  }

  /**
   * AvailabilityWindow findFirstOrThrow
   */
  export type AvailabilityWindowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindow to fetch.
     */
    where?: AvailabilityWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindows to fetch.
     */
    orderBy?: AvailabilityWindowOrderByWithRelationInput | AvailabilityWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityWindows.
     */
    cursor?: AvailabilityWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityWindows.
     */
    distinct?: AvailabilityWindowScalarFieldEnum | AvailabilityWindowScalarFieldEnum[]
  }

  /**
   * AvailabilityWindow findMany
   */
  export type AvailabilityWindowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindows to fetch.
     */
    where?: AvailabilityWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindows to fetch.
     */
    orderBy?: AvailabilityWindowOrderByWithRelationInput | AvailabilityWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailabilityWindows.
     */
    cursor?: AvailabilityWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindows.
     */
    skip?: number
    distinct?: AvailabilityWindowScalarFieldEnum | AvailabilityWindowScalarFieldEnum[]
  }

  /**
   * AvailabilityWindow create
   */
  export type AvailabilityWindowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailabilityWindow.
     */
    data: XOR<AvailabilityWindowCreateInput, AvailabilityWindowUncheckedCreateInput>
  }

  /**
   * AvailabilityWindow createMany
   */
  export type AvailabilityWindowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailabilityWindows.
     */
    data: AvailabilityWindowCreateManyInput | AvailabilityWindowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailabilityWindow createManyAndReturn
   */
  export type AvailabilityWindowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AvailabilityWindows.
     */
    data: AvailabilityWindowCreateManyInput | AvailabilityWindowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailabilityWindow update
   */
  export type AvailabilityWindowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailabilityWindow.
     */
    data: XOR<AvailabilityWindowUpdateInput, AvailabilityWindowUncheckedUpdateInput>
    /**
     * Choose, which AvailabilityWindow to update.
     */
    where: AvailabilityWindowWhereUniqueInput
  }

  /**
   * AvailabilityWindow updateMany
   */
  export type AvailabilityWindowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailabilityWindows.
     */
    data: XOR<AvailabilityWindowUpdateManyMutationInput, AvailabilityWindowUncheckedUpdateManyInput>
    /**
     * Filter which AvailabilityWindows to update
     */
    where?: AvailabilityWindowWhereInput
  }

  /**
   * AvailabilityWindow upsert
   */
  export type AvailabilityWindowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailabilityWindow to update in case it exists.
     */
    where: AvailabilityWindowWhereUniqueInput
    /**
     * In case the AvailabilityWindow found by the `where` argument doesn't exist, create a new AvailabilityWindow with this data.
     */
    create: XOR<AvailabilityWindowCreateInput, AvailabilityWindowUncheckedCreateInput>
    /**
     * In case the AvailabilityWindow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailabilityWindowUpdateInput, AvailabilityWindowUncheckedUpdateInput>
  }

  /**
   * AvailabilityWindow delete
   */
  export type AvailabilityWindowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
    /**
     * Filter which AvailabilityWindow to delete.
     */
    where: AvailabilityWindowWhereUniqueInput
  }

  /**
   * AvailabilityWindow deleteMany
   */
  export type AvailabilityWindowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityWindows to delete
     */
    where?: AvailabilityWindowWhereInput
  }

  /**
   * AvailabilityWindow.windowServices
   */
  export type AvailabilityWindow$windowServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    where?: AvailabilityWindowServiceWhereInput
    orderBy?: AvailabilityWindowServiceOrderByWithRelationInput | AvailabilityWindowServiceOrderByWithRelationInput[]
    cursor?: AvailabilityWindowServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailabilityWindowServiceScalarFieldEnum | AvailabilityWindowServiceScalarFieldEnum[]
  }

  /**
   * AvailabilityWindow without action
   */
  export type AvailabilityWindowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindow
     */
    select?: AvailabilityWindowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowInclude<ExtArgs> | null
  }


  /**
   * Model AvailabilityWindowService
   */

  export type AggregateAvailabilityWindowService = {
    _count: AvailabilityWindowServiceCountAggregateOutputType | null
    _min: AvailabilityWindowServiceMinAggregateOutputType | null
    _max: AvailabilityWindowServiceMaxAggregateOutputType | null
  }

  export type AvailabilityWindowServiceMinAggregateOutputType = {
    id: string | null
    windowId: string | null
    mentorServiceId: string | null
    createdAt: Date | null
  }

  export type AvailabilityWindowServiceMaxAggregateOutputType = {
    id: string | null
    windowId: string | null
    mentorServiceId: string | null
    createdAt: Date | null
  }

  export type AvailabilityWindowServiceCountAggregateOutputType = {
    id: number
    windowId: number
    mentorServiceId: number
    createdAt: number
    _all: number
  }


  export type AvailabilityWindowServiceMinAggregateInputType = {
    id?: true
    windowId?: true
    mentorServiceId?: true
    createdAt?: true
  }

  export type AvailabilityWindowServiceMaxAggregateInputType = {
    id?: true
    windowId?: true
    mentorServiceId?: true
    createdAt?: true
  }

  export type AvailabilityWindowServiceCountAggregateInputType = {
    id?: true
    windowId?: true
    mentorServiceId?: true
    createdAt?: true
    _all?: true
  }

  export type AvailabilityWindowServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityWindowService to aggregate.
     */
    where?: AvailabilityWindowServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindowServices to fetch.
     */
    orderBy?: AvailabilityWindowServiceOrderByWithRelationInput | AvailabilityWindowServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailabilityWindowServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindowServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindowServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailabilityWindowServices
    **/
    _count?: true | AvailabilityWindowServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailabilityWindowServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailabilityWindowServiceMaxAggregateInputType
  }

  export type GetAvailabilityWindowServiceAggregateType<T extends AvailabilityWindowServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailabilityWindowService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailabilityWindowService[P]>
      : GetScalarType<T[P], AggregateAvailabilityWindowService[P]>
  }




  export type AvailabilityWindowServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailabilityWindowServiceWhereInput
    orderBy?: AvailabilityWindowServiceOrderByWithAggregationInput | AvailabilityWindowServiceOrderByWithAggregationInput[]
    by: AvailabilityWindowServiceScalarFieldEnum[] | AvailabilityWindowServiceScalarFieldEnum
    having?: AvailabilityWindowServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailabilityWindowServiceCountAggregateInputType | true
    _min?: AvailabilityWindowServiceMinAggregateInputType
    _max?: AvailabilityWindowServiceMaxAggregateInputType
  }

  export type AvailabilityWindowServiceGroupByOutputType = {
    id: string
    windowId: string
    mentorServiceId: string
    createdAt: Date
    _count: AvailabilityWindowServiceCountAggregateOutputType | null
    _min: AvailabilityWindowServiceMinAggregateOutputType | null
    _max: AvailabilityWindowServiceMaxAggregateOutputType | null
  }

  type GetAvailabilityWindowServiceGroupByPayload<T extends AvailabilityWindowServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailabilityWindowServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailabilityWindowServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailabilityWindowServiceGroupByOutputType[P]>
            : GetScalarType<T[P], AvailabilityWindowServiceGroupByOutputType[P]>
        }
      >
    >


  export type AvailabilityWindowServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    windowId?: boolean
    mentorServiceId?: boolean
    createdAt?: boolean
    window?: boolean | AvailabilityWindowDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityWindowService"]>

  export type AvailabilityWindowServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    windowId?: boolean
    mentorServiceId?: boolean
    createdAt?: boolean
    window?: boolean | AvailabilityWindowDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availabilityWindowService"]>

  export type AvailabilityWindowServiceSelectScalar = {
    id?: boolean
    windowId?: boolean
    mentorServiceId?: boolean
    createdAt?: boolean
  }

  export type AvailabilityWindowServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    window?: boolean | AvailabilityWindowDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
  }
  export type AvailabilityWindowServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    window?: boolean | AvailabilityWindowDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
  }

  export type $AvailabilityWindowServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailabilityWindowService"
    objects: {
      window: Prisma.$AvailabilityWindowPayload<ExtArgs>
      mentorService: Prisma.$MentorServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      windowId: string
      mentorServiceId: string
      createdAt: Date
    }, ExtArgs["result"]["availabilityWindowService"]>
    composites: {}
  }

  type AvailabilityWindowServiceGetPayload<S extends boolean | null | undefined | AvailabilityWindowServiceDefaultArgs> = $Result.GetResult<Prisma.$AvailabilityWindowServicePayload, S>

  type AvailabilityWindowServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AvailabilityWindowServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AvailabilityWindowServiceCountAggregateInputType | true
    }

  export interface AvailabilityWindowServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailabilityWindowService'], meta: { name: 'AvailabilityWindowService' } }
    /**
     * Find zero or one AvailabilityWindowService that matches the filter.
     * @param {AvailabilityWindowServiceFindUniqueArgs} args - Arguments to find a AvailabilityWindowService
     * @example
     * // Get one AvailabilityWindowService
     * const availabilityWindowService = await prisma.availabilityWindowService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailabilityWindowServiceFindUniqueArgs>(args: SelectSubset<T, AvailabilityWindowServiceFindUniqueArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AvailabilityWindowService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AvailabilityWindowServiceFindUniqueOrThrowArgs} args - Arguments to find a AvailabilityWindowService
     * @example
     * // Get one AvailabilityWindowService
     * const availabilityWindowService = await prisma.availabilityWindowService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailabilityWindowServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailabilityWindowServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AvailabilityWindowService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceFindFirstArgs} args - Arguments to find a AvailabilityWindowService
     * @example
     * // Get one AvailabilityWindowService
     * const availabilityWindowService = await prisma.availabilityWindowService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailabilityWindowServiceFindFirstArgs>(args?: SelectSubset<T, AvailabilityWindowServiceFindFirstArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AvailabilityWindowService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceFindFirstOrThrowArgs} args - Arguments to find a AvailabilityWindowService
     * @example
     * // Get one AvailabilityWindowService
     * const availabilityWindowService = await prisma.availabilityWindowService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailabilityWindowServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailabilityWindowServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AvailabilityWindowServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailabilityWindowServices
     * const availabilityWindowServices = await prisma.availabilityWindowService.findMany()
     * 
     * // Get first 10 AvailabilityWindowServices
     * const availabilityWindowServices = await prisma.availabilityWindowService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availabilityWindowServiceWithIdOnly = await prisma.availabilityWindowService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailabilityWindowServiceFindManyArgs>(args?: SelectSubset<T, AvailabilityWindowServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AvailabilityWindowService.
     * @param {AvailabilityWindowServiceCreateArgs} args - Arguments to create a AvailabilityWindowService.
     * @example
     * // Create one AvailabilityWindowService
     * const AvailabilityWindowService = await prisma.availabilityWindowService.create({
     *   data: {
     *     // ... data to create a AvailabilityWindowService
     *   }
     * })
     * 
     */
    create<T extends AvailabilityWindowServiceCreateArgs>(args: SelectSubset<T, AvailabilityWindowServiceCreateArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AvailabilityWindowServices.
     * @param {AvailabilityWindowServiceCreateManyArgs} args - Arguments to create many AvailabilityWindowServices.
     * @example
     * // Create many AvailabilityWindowServices
     * const availabilityWindowService = await prisma.availabilityWindowService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailabilityWindowServiceCreateManyArgs>(args?: SelectSubset<T, AvailabilityWindowServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailabilityWindowServices and returns the data saved in the database.
     * @param {AvailabilityWindowServiceCreateManyAndReturnArgs} args - Arguments to create many AvailabilityWindowServices.
     * @example
     * // Create many AvailabilityWindowServices
     * const availabilityWindowService = await prisma.availabilityWindowService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailabilityWindowServices and only return the `id`
     * const availabilityWindowServiceWithIdOnly = await prisma.availabilityWindowService.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailabilityWindowServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailabilityWindowServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AvailabilityWindowService.
     * @param {AvailabilityWindowServiceDeleteArgs} args - Arguments to delete one AvailabilityWindowService.
     * @example
     * // Delete one AvailabilityWindowService
     * const AvailabilityWindowService = await prisma.availabilityWindowService.delete({
     *   where: {
     *     // ... filter to delete one AvailabilityWindowService
     *   }
     * })
     * 
     */
    delete<T extends AvailabilityWindowServiceDeleteArgs>(args: SelectSubset<T, AvailabilityWindowServiceDeleteArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AvailabilityWindowService.
     * @param {AvailabilityWindowServiceUpdateArgs} args - Arguments to update one AvailabilityWindowService.
     * @example
     * // Update one AvailabilityWindowService
     * const availabilityWindowService = await prisma.availabilityWindowService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailabilityWindowServiceUpdateArgs>(args: SelectSubset<T, AvailabilityWindowServiceUpdateArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AvailabilityWindowServices.
     * @param {AvailabilityWindowServiceDeleteManyArgs} args - Arguments to filter AvailabilityWindowServices to delete.
     * @example
     * // Delete a few AvailabilityWindowServices
     * const { count } = await prisma.availabilityWindowService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailabilityWindowServiceDeleteManyArgs>(args?: SelectSubset<T, AvailabilityWindowServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailabilityWindowServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailabilityWindowServices
     * const availabilityWindowService = await prisma.availabilityWindowService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailabilityWindowServiceUpdateManyArgs>(args: SelectSubset<T, AvailabilityWindowServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AvailabilityWindowService.
     * @param {AvailabilityWindowServiceUpsertArgs} args - Arguments to update or create a AvailabilityWindowService.
     * @example
     * // Update or create a AvailabilityWindowService
     * const availabilityWindowService = await prisma.availabilityWindowService.upsert({
     *   create: {
     *     // ... data to create a AvailabilityWindowService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailabilityWindowService we want to update
     *   }
     * })
     */
    upsert<T extends AvailabilityWindowServiceUpsertArgs>(args: SelectSubset<T, AvailabilityWindowServiceUpsertArgs<ExtArgs>>): Prisma__AvailabilityWindowServiceClient<$Result.GetResult<Prisma.$AvailabilityWindowServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AvailabilityWindowServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceCountArgs} args - Arguments to filter AvailabilityWindowServices to count.
     * @example
     * // Count the number of AvailabilityWindowServices
     * const count = await prisma.availabilityWindowService.count({
     *   where: {
     *     // ... the filter for the AvailabilityWindowServices we want to count
     *   }
     * })
    **/
    count<T extends AvailabilityWindowServiceCountArgs>(
      args?: Subset<T, AvailabilityWindowServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailabilityWindowServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailabilityWindowService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvailabilityWindowServiceAggregateArgs>(args: Subset<T, AvailabilityWindowServiceAggregateArgs>): Prisma.PrismaPromise<GetAvailabilityWindowServiceAggregateType<T>>

    /**
     * Group by AvailabilityWindowService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailabilityWindowServiceGroupByArgs} args - Group by arguments.
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
      T extends AvailabilityWindowServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailabilityWindowServiceGroupByArgs['orderBy'] }
        : { orderBy?: AvailabilityWindowServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvailabilityWindowServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailabilityWindowServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailabilityWindowService model
   */
  readonly fields: AvailabilityWindowServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailabilityWindowService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailabilityWindowServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    window<T extends AvailabilityWindowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvailabilityWindowDefaultArgs<ExtArgs>>): Prisma__AvailabilityWindowClient<$Result.GetResult<Prisma.$AvailabilityWindowPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    mentorService<T extends MentorServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorServiceDefaultArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the AvailabilityWindowService model
   */ 
  interface AvailabilityWindowServiceFieldRefs {
    readonly id: FieldRef<"AvailabilityWindowService", 'String'>
    readonly windowId: FieldRef<"AvailabilityWindowService", 'String'>
    readonly mentorServiceId: FieldRef<"AvailabilityWindowService", 'String'>
    readonly createdAt: FieldRef<"AvailabilityWindowService", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvailabilityWindowService findUnique
   */
  export type AvailabilityWindowServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindowService to fetch.
     */
    where: AvailabilityWindowServiceWhereUniqueInput
  }

  /**
   * AvailabilityWindowService findUniqueOrThrow
   */
  export type AvailabilityWindowServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindowService to fetch.
     */
    where: AvailabilityWindowServiceWhereUniqueInput
  }

  /**
   * AvailabilityWindowService findFirst
   */
  export type AvailabilityWindowServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindowService to fetch.
     */
    where?: AvailabilityWindowServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindowServices to fetch.
     */
    orderBy?: AvailabilityWindowServiceOrderByWithRelationInput | AvailabilityWindowServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityWindowServices.
     */
    cursor?: AvailabilityWindowServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindowServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindowServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityWindowServices.
     */
    distinct?: AvailabilityWindowServiceScalarFieldEnum | AvailabilityWindowServiceScalarFieldEnum[]
  }

  /**
   * AvailabilityWindowService findFirstOrThrow
   */
  export type AvailabilityWindowServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindowService to fetch.
     */
    where?: AvailabilityWindowServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindowServices to fetch.
     */
    orderBy?: AvailabilityWindowServiceOrderByWithRelationInput | AvailabilityWindowServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailabilityWindowServices.
     */
    cursor?: AvailabilityWindowServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindowServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindowServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailabilityWindowServices.
     */
    distinct?: AvailabilityWindowServiceScalarFieldEnum | AvailabilityWindowServiceScalarFieldEnum[]
  }

  /**
   * AvailabilityWindowService findMany
   */
  export type AvailabilityWindowServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * Filter, which AvailabilityWindowServices to fetch.
     */
    where?: AvailabilityWindowServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailabilityWindowServices to fetch.
     */
    orderBy?: AvailabilityWindowServiceOrderByWithRelationInput | AvailabilityWindowServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailabilityWindowServices.
     */
    cursor?: AvailabilityWindowServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailabilityWindowServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailabilityWindowServices.
     */
    skip?: number
    distinct?: AvailabilityWindowServiceScalarFieldEnum | AvailabilityWindowServiceScalarFieldEnum[]
  }

  /**
   * AvailabilityWindowService create
   */
  export type AvailabilityWindowServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailabilityWindowService.
     */
    data: XOR<AvailabilityWindowServiceCreateInput, AvailabilityWindowServiceUncheckedCreateInput>
  }

  /**
   * AvailabilityWindowService createMany
   */
  export type AvailabilityWindowServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailabilityWindowServices.
     */
    data: AvailabilityWindowServiceCreateManyInput | AvailabilityWindowServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailabilityWindowService createManyAndReturn
   */
  export type AvailabilityWindowServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AvailabilityWindowServices.
     */
    data: AvailabilityWindowServiceCreateManyInput | AvailabilityWindowServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailabilityWindowService update
   */
  export type AvailabilityWindowServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailabilityWindowService.
     */
    data: XOR<AvailabilityWindowServiceUpdateInput, AvailabilityWindowServiceUncheckedUpdateInput>
    /**
     * Choose, which AvailabilityWindowService to update.
     */
    where: AvailabilityWindowServiceWhereUniqueInput
  }

  /**
   * AvailabilityWindowService updateMany
   */
  export type AvailabilityWindowServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailabilityWindowServices.
     */
    data: XOR<AvailabilityWindowServiceUpdateManyMutationInput, AvailabilityWindowServiceUncheckedUpdateManyInput>
    /**
     * Filter which AvailabilityWindowServices to update
     */
    where?: AvailabilityWindowServiceWhereInput
  }

  /**
   * AvailabilityWindowService upsert
   */
  export type AvailabilityWindowServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailabilityWindowService to update in case it exists.
     */
    where: AvailabilityWindowServiceWhereUniqueInput
    /**
     * In case the AvailabilityWindowService found by the `where` argument doesn't exist, create a new AvailabilityWindowService with this data.
     */
    create: XOR<AvailabilityWindowServiceCreateInput, AvailabilityWindowServiceUncheckedCreateInput>
    /**
     * In case the AvailabilityWindowService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailabilityWindowServiceUpdateInput, AvailabilityWindowServiceUncheckedUpdateInput>
  }

  /**
   * AvailabilityWindowService delete
   */
  export type AvailabilityWindowServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
    /**
     * Filter which AvailabilityWindowService to delete.
     */
    where: AvailabilityWindowServiceWhereUniqueInput
  }

  /**
   * AvailabilityWindowService deleteMany
   */
  export type AvailabilityWindowServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailabilityWindowServices to delete
     */
    where?: AvailabilityWindowServiceWhereInput
  }

  /**
   * AvailabilityWindowService without action
   */
  export type AvailabilityWindowServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityWindowService
     */
    select?: AvailabilityWindowServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailabilityWindowServiceInclude<ExtArgs> | null
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
    menteeId: string | null
    mentorProfileId: string | null
    mentorServiceId: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.BookingStatus | null
    paymentId: string | null
    meetingLink: string | null
    purposeOfCall: string | null
    notes: string | null
    cancelledReason: string | null
    rescheduledFromId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    menteeId: string | null
    mentorProfileId: string | null
    mentorServiceId: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.BookingStatus | null
    paymentId: string | null
    meetingLink: string | null
    purposeOfCall: string | null
    notes: string | null
    cancelledReason: string | null
    rescheduledFromId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    menteeId: number
    mentorProfileId: number
    mentorServiceId: number
    startTime: number
    endTime: number
    status: number
    paymentId: number
    meetingLink: number
    purposeOfCall: number
    notes: number
    cancelledReason: number
    rescheduledFromId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingMinAggregateInputType = {
    id?: true
    menteeId?: true
    mentorProfileId?: true
    mentorServiceId?: true
    startTime?: true
    endTime?: true
    status?: true
    paymentId?: true
    meetingLink?: true
    purposeOfCall?: true
    notes?: true
    cancelledReason?: true
    rescheduledFromId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    menteeId?: true
    mentorProfileId?: true
    mentorServiceId?: true
    startTime?: true
    endTime?: true
    status?: true
    paymentId?: true
    meetingLink?: true
    purposeOfCall?: true
    notes?: true
    cancelledReason?: true
    rescheduledFromId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    menteeId?: true
    mentorProfileId?: true
    mentorServiceId?: true
    startTime?: true
    endTime?: true
    status?: true
    paymentId?: true
    meetingLink?: true
    purposeOfCall?: true
    notes?: true
    cancelledReason?: true
    rescheduledFromId?: true
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
    menteeId: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date
    endTime: Date
    status: $Enums.BookingStatus
    paymentId: string | null
    meetingLink: string | null
    purposeOfCall: string | null
    notes: string | null
    cancelledReason: string | null
    rescheduledFromId: string | null
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
    menteeId?: boolean
    mentorProfileId?: boolean
    mentorServiceId?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    paymentId?: boolean
    meetingLink?: boolean
    purposeOfCall?: boolean
    notes?: boolean
    cancelledReason?: boolean
    rescheduledFromId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
    payment?: boolean | Booking$paymentArgs<ExtArgs>
    review?: boolean | Booking$reviewArgs<ExtArgs>
    feedback?: boolean | Booking$feedbackArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    mentorProfileId?: boolean
    mentorServiceId?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    paymentId?: boolean
    meetingLink?: boolean
    purposeOfCall?: boolean
    notes?: boolean
    cancelledReason?: boolean
    rescheduledFromId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    menteeId?: boolean
    mentorProfileId?: boolean
    mentorServiceId?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    paymentId?: boolean
    meetingLink?: boolean
    purposeOfCall?: boolean
    notes?: boolean
    cancelledReason?: boolean
    rescheduledFromId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
    payment?: boolean | Booking$paymentArgs<ExtArgs>
    review?: boolean | Booking$reviewArgs<ExtArgs>
    feedback?: boolean | Booking$feedbackArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | UserDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    mentorService?: boolean | MentorServiceDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      mentee: Prisma.$UserPayload<ExtArgs>
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
      mentorService: Prisma.$MentorServicePayload<ExtArgs>
      payment: Prisma.$PaymentPayload<ExtArgs> | null
      review: Prisma.$ReviewPayload<ExtArgs> | null
      feedback: Prisma.$SessionFeedbackPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menteeId: string
      mentorProfileId: string
      mentorServiceId: string
      /**
       * Resolved UTC start/end — the actual booked time.
       */
      startTime: Date
      endTime: Date
      status: $Enums.BookingStatus
      /**
       * Razorpay payment ID (nullable — set on payment confirmation)
       */
      paymentId: string | null
      meetingLink: string | null
      purposeOfCall: string | null
      notes: string | null
      cancelledReason: string | null
      rescheduledFromId: string | null
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
    mentee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    mentorService<T extends MentorServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorServiceDefaultArgs<ExtArgs>>): Prisma__MentorServiceClient<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    payment<T extends Booking$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    review<T extends Booking$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Booking$reviewArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    feedback<T extends Booking$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, Booking$feedbackArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
    readonly menteeId: FieldRef<"Booking", 'String'>
    readonly mentorProfileId: FieldRef<"Booking", 'String'>
    readonly mentorServiceId: FieldRef<"Booking", 'String'>
    readonly startTime: FieldRef<"Booking", 'DateTime'>
    readonly endTime: FieldRef<"Booking", 'DateTime'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly paymentId: FieldRef<"Booking", 'String'>
    readonly meetingLink: FieldRef<"Booking", 'String'>
    readonly purposeOfCall: FieldRef<"Booking", 'String'>
    readonly notes: FieldRef<"Booking", 'String'>
    readonly cancelledReason: FieldRef<"Booking", 'String'>
    readonly rescheduledFromId: FieldRef<"Booking", 'String'>
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
   * Booking.review
   */
  export type Booking$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Booking.feedback
   */
  export type Booking$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    where?: SessionFeedbackWhereInput
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
    refundedAmount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
    refundedAmount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    razorpaySignature: string | null
    amount: number | null
    currency: string | null
    paymentStatus: $Enums.PaymentStatus | null
    paidAt: Date | null
    refundedAmount: number | null
    refundReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    razorpaySignature: string | null
    amount: number | null
    currency: string | null
    paymentStatus: $Enums.PaymentStatus | null
    paidAt: Date | null
    refundedAmount: number | null
    refundReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    bookingId: number
    razorpayOrderId: number
    razorpayPaymentId: number
    razorpaySignature: number
    amount: number
    currency: number
    paymentStatus: number
    paidAt: number
    refundedAmount: number
    refundReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    refundedAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    refundedAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    bookingId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    razorpaySignature?: true
    amount?: true
    currency?: true
    paymentStatus?: true
    paidAt?: true
    refundedAmount?: true
    refundReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    bookingId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    razorpaySignature?: true
    amount?: true
    currency?: true
    paymentStatus?: true
    paidAt?: true
    refundedAmount?: true
    refundReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    bookingId?: true
    razorpayOrderId?: true
    razorpayPaymentId?: true
    razorpaySignature?: true
    amount?: true
    currency?: true
    paymentStatus?: true
    paidAt?: true
    refundedAmount?: true
    refundReason?: true
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
    razorpayOrderId: string | null
    razorpayPaymentId: string | null
    razorpaySignature: string | null
    amount: number
    currency: string
    paymentStatus: $Enums.PaymentStatus
    paidAt: Date | null
    refundedAmount: number | null
    refundReason: string | null
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
    razorpaySignature?: boolean
    amount?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    refundedAmount?: boolean
    refundReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    invoice?: boolean | Payment$invoiceArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    razorpaySignature?: boolean
    amount?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    refundedAmount?: boolean
    refundReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    bookingId?: boolean
    razorpayOrderId?: boolean
    razorpayPaymentId?: boolean
    razorpaySignature?: boolean
    amount?: boolean
    currency?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    refundedAmount?: boolean
    refundReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    invoice?: boolean | Payment$invoiceArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      invoice: Prisma.$InvoicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      razorpayOrderId: string | null
      razorpayPaymentId: string | null
      razorpaySignature: string | null
      amount: number
      currency: string
      paymentStatus: $Enums.PaymentStatus
      paidAt: Date | null
      refundedAmount: number | null
      refundReason: string | null
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
    invoice<T extends Payment$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, Payment$invoiceArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
    readonly razorpaySignature: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly paymentStatus: FieldRef<"Payment", 'PaymentStatus'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly refundedAmount: FieldRef<"Payment", 'Float'>
    readonly refundReason: FieldRef<"Payment", 'String'>
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
   * Payment.invoice
   */
  export type Payment$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
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
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    paymentId: string | null
    invoiceNumber: string | null
    invoiceUrl: string | null
    generatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    paymentId: string | null
    invoiceNumber: string | null
    invoiceUrl: string | null
    generatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    paymentId: number
    invoiceNumber: number
    invoiceUrl: number
    generatedAt: number
    _all: number
  }


  export type InvoiceMinAggregateInputType = {
    id?: true
    paymentId?: true
    invoiceNumber?: true
    invoiceUrl?: true
    generatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    paymentId?: true
    invoiceNumber?: true
    invoiceUrl?: true
    generatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    paymentId?: true
    invoiceNumber?: true
    invoiceUrl?: true
    generatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    paymentId: string
    invoiceNumber: string
    invoiceUrl: string | null
    generatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    invoiceNumber?: boolean
    invoiceUrl?: boolean
    generatedAt?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    invoiceNumber?: boolean
    invoiceUrl?: boolean
    generatedAt?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    paymentId?: boolean
    invoiceNumber?: boolean
    invoiceUrl?: boolean
    generatedAt?: boolean
  }

  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      payment: Prisma.$PaymentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentId: string
      invoiceNumber: string
      invoiceUrl: string | null
      generatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
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
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payment<T extends PaymentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentDefaultArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Invoice model
   */ 
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly paymentId: FieldRef<"Invoice", 'String'>
    readonly invoiceNumber: FieldRef<"Invoice", 'String'>
    readonly invoiceUrl: FieldRef<"Invoice", 'String'>
    readonly generatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model SessionFeedback
   */

  export type AggregateSessionFeedback = {
    _count: SessionFeedbackCountAggregateOutputType | null
    _min: SessionFeedbackMinAggregateOutputType | null
    _max: SessionFeedbackMaxAggregateOutputType | null
  }

  export type SessionFeedbackMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    mentorProfileId: string | null
    strengths: string | null
    weaknesses: string | null
    recommendations: string | null
    createdAt: Date | null
  }

  export type SessionFeedbackMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    mentorProfileId: string | null
    strengths: string | null
    weaknesses: string | null
    recommendations: string | null
    createdAt: Date | null
  }

  export type SessionFeedbackCountAggregateOutputType = {
    id: number
    bookingId: number
    mentorProfileId: number
    strengths: number
    weaknesses: number
    recommendations: number
    createdAt: number
    _all: number
  }


  export type SessionFeedbackMinAggregateInputType = {
    id?: true
    bookingId?: true
    mentorProfileId?: true
    strengths?: true
    weaknesses?: true
    recommendations?: true
    createdAt?: true
  }

  export type SessionFeedbackMaxAggregateInputType = {
    id?: true
    bookingId?: true
    mentorProfileId?: true
    strengths?: true
    weaknesses?: true
    recommendations?: true
    createdAt?: true
  }

  export type SessionFeedbackCountAggregateInputType = {
    id?: true
    bookingId?: true
    mentorProfileId?: true
    strengths?: true
    weaknesses?: true
    recommendations?: true
    createdAt?: true
    _all?: true
  }

  export type SessionFeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionFeedback to aggregate.
     */
    where?: SessionFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionFeedbacks to fetch.
     */
    orderBy?: SessionFeedbackOrderByWithRelationInput | SessionFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SessionFeedbacks
    **/
    _count?: true | SessionFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionFeedbackMaxAggregateInputType
  }

  export type GetSessionFeedbackAggregateType<T extends SessionFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateSessionFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessionFeedback[P]>
      : GetScalarType<T[P], AggregateSessionFeedback[P]>
  }




  export type SessionFeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionFeedbackWhereInput
    orderBy?: SessionFeedbackOrderByWithAggregationInput | SessionFeedbackOrderByWithAggregationInput[]
    by: SessionFeedbackScalarFieldEnum[] | SessionFeedbackScalarFieldEnum
    having?: SessionFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionFeedbackCountAggregateInputType | true
    _min?: SessionFeedbackMinAggregateInputType
    _max?: SessionFeedbackMaxAggregateInputType
  }

  export type SessionFeedbackGroupByOutputType = {
    id: string
    bookingId: string
    mentorProfileId: string
    strengths: string | null
    weaknesses: string | null
    recommendations: string | null
    createdAt: Date
    _count: SessionFeedbackCountAggregateOutputType | null
    _min: SessionFeedbackMinAggregateOutputType | null
    _max: SessionFeedbackMaxAggregateOutputType | null
  }

  type GetSessionFeedbackGroupByPayload<T extends SessionFeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], SessionFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type SessionFeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    mentorProfileId?: boolean
    strengths?: boolean
    weaknesses?: boolean
    recommendations?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionFeedback"]>

  export type SessionFeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    mentorProfileId?: boolean
    strengths?: boolean
    weaknesses?: boolean
    recommendations?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionFeedback"]>

  export type SessionFeedbackSelectScalar = {
    id?: boolean
    bookingId?: boolean
    mentorProfileId?: boolean
    strengths?: boolean
    weaknesses?: boolean
    recommendations?: boolean
    createdAt?: boolean
  }

  export type SessionFeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }
  export type SessionFeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $SessionFeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionFeedback"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      mentorProfileId: string
      strengths: string | null
      weaknesses: string | null
      recommendations: string | null
      createdAt: Date
    }, ExtArgs["result"]["sessionFeedback"]>
    composites: {}
  }

  type SessionFeedbackGetPayload<S extends boolean | null | undefined | SessionFeedbackDefaultArgs> = $Result.GetResult<Prisma.$SessionFeedbackPayload, S>

  type SessionFeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFeedbackFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionFeedbackCountAggregateInputType | true
    }

  export interface SessionFeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SessionFeedback'], meta: { name: 'SessionFeedback' } }
    /**
     * Find zero or one SessionFeedback that matches the filter.
     * @param {SessionFeedbackFindUniqueArgs} args - Arguments to find a SessionFeedback
     * @example
     * // Get one SessionFeedback
     * const sessionFeedback = await prisma.sessionFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFeedbackFindUniqueArgs>(args: SelectSubset<T, SessionFeedbackFindUniqueArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SessionFeedback that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFeedbackFindUniqueOrThrowArgs} args - Arguments to find a SessionFeedback
     * @example
     * // Get one SessionFeedback
     * const sessionFeedback = await prisma.sessionFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SessionFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackFindFirstArgs} args - Arguments to find a SessionFeedback
     * @example
     * // Get one SessionFeedback
     * const sessionFeedback = await prisma.sessionFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFeedbackFindFirstArgs>(args?: SelectSubset<T, SessionFeedbackFindFirstArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SessionFeedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackFindFirstOrThrowArgs} args - Arguments to find a SessionFeedback
     * @example
     * // Get one SessionFeedback
     * const sessionFeedback = await prisma.sessionFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SessionFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SessionFeedbacks
     * const sessionFeedbacks = await prisma.sessionFeedback.findMany()
     * 
     * // Get first 10 SessionFeedbacks
     * const sessionFeedbacks = await prisma.sessionFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionFeedbackWithIdOnly = await prisma.sessionFeedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFeedbackFindManyArgs>(args?: SelectSubset<T, SessionFeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SessionFeedback.
     * @param {SessionFeedbackCreateArgs} args - Arguments to create a SessionFeedback.
     * @example
     * // Create one SessionFeedback
     * const SessionFeedback = await prisma.sessionFeedback.create({
     *   data: {
     *     // ... data to create a SessionFeedback
     *   }
     * })
     * 
     */
    create<T extends SessionFeedbackCreateArgs>(args: SelectSubset<T, SessionFeedbackCreateArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SessionFeedbacks.
     * @param {SessionFeedbackCreateManyArgs} args - Arguments to create many SessionFeedbacks.
     * @example
     * // Create many SessionFeedbacks
     * const sessionFeedback = await prisma.sessionFeedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionFeedbackCreateManyArgs>(args?: SelectSubset<T, SessionFeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SessionFeedbacks and returns the data saved in the database.
     * @param {SessionFeedbackCreateManyAndReturnArgs} args - Arguments to create many SessionFeedbacks.
     * @example
     * // Create many SessionFeedbacks
     * const sessionFeedback = await prisma.sessionFeedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SessionFeedbacks and only return the `id`
     * const sessionFeedbackWithIdOnly = await prisma.sessionFeedback.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionFeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionFeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SessionFeedback.
     * @param {SessionFeedbackDeleteArgs} args - Arguments to delete one SessionFeedback.
     * @example
     * // Delete one SessionFeedback
     * const SessionFeedback = await prisma.sessionFeedback.delete({
     *   where: {
     *     // ... filter to delete one SessionFeedback
     *   }
     * })
     * 
     */
    delete<T extends SessionFeedbackDeleteArgs>(args: SelectSubset<T, SessionFeedbackDeleteArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SessionFeedback.
     * @param {SessionFeedbackUpdateArgs} args - Arguments to update one SessionFeedback.
     * @example
     * // Update one SessionFeedback
     * const sessionFeedback = await prisma.sessionFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionFeedbackUpdateArgs>(args: SelectSubset<T, SessionFeedbackUpdateArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SessionFeedbacks.
     * @param {SessionFeedbackDeleteManyArgs} args - Arguments to filter SessionFeedbacks to delete.
     * @example
     * // Delete a few SessionFeedbacks
     * const { count } = await prisma.sessionFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionFeedbackDeleteManyArgs>(args?: SelectSubset<T, SessionFeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SessionFeedbacks
     * const sessionFeedback = await prisma.sessionFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionFeedbackUpdateManyArgs>(args: SelectSubset<T, SessionFeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SessionFeedback.
     * @param {SessionFeedbackUpsertArgs} args - Arguments to update or create a SessionFeedback.
     * @example
     * // Update or create a SessionFeedback
     * const sessionFeedback = await prisma.sessionFeedback.upsert({
     *   create: {
     *     // ... data to create a SessionFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SessionFeedback we want to update
     *   }
     * })
     */
    upsert<T extends SessionFeedbackUpsertArgs>(args: SelectSubset<T, SessionFeedbackUpsertArgs<ExtArgs>>): Prisma__SessionFeedbackClient<$Result.GetResult<Prisma.$SessionFeedbackPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SessionFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackCountArgs} args - Arguments to filter SessionFeedbacks to count.
     * @example
     * // Count the number of SessionFeedbacks
     * const count = await prisma.sessionFeedback.count({
     *   where: {
     *     // ... the filter for the SessionFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends SessionFeedbackCountArgs>(
      args?: Subset<T, SessionFeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SessionFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionFeedbackAggregateArgs>(args: Subset<T, SessionFeedbackAggregateArgs>): Prisma.PrismaPromise<GetSessionFeedbackAggregateType<T>>

    /**
     * Group by SessionFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFeedbackGroupByArgs} args - Group by arguments.
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
      T extends SessionFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: SessionFeedbackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SessionFeedback model
   */
  readonly fields: SessionFeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SessionFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionFeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the SessionFeedback model
   */ 
  interface SessionFeedbackFieldRefs {
    readonly id: FieldRef<"SessionFeedback", 'String'>
    readonly bookingId: FieldRef<"SessionFeedback", 'String'>
    readonly mentorProfileId: FieldRef<"SessionFeedback", 'String'>
    readonly strengths: FieldRef<"SessionFeedback", 'String'>
    readonly weaknesses: FieldRef<"SessionFeedback", 'String'>
    readonly recommendations: FieldRef<"SessionFeedback", 'String'>
    readonly createdAt: FieldRef<"SessionFeedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SessionFeedback findUnique
   */
  export type SessionFeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which SessionFeedback to fetch.
     */
    where: SessionFeedbackWhereUniqueInput
  }

  /**
   * SessionFeedback findUniqueOrThrow
   */
  export type SessionFeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which SessionFeedback to fetch.
     */
    where: SessionFeedbackWhereUniqueInput
  }

  /**
   * SessionFeedback findFirst
   */
  export type SessionFeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which SessionFeedback to fetch.
     */
    where?: SessionFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionFeedbacks to fetch.
     */
    orderBy?: SessionFeedbackOrderByWithRelationInput | SessionFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionFeedbacks.
     */
    cursor?: SessionFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionFeedbacks.
     */
    distinct?: SessionFeedbackScalarFieldEnum | SessionFeedbackScalarFieldEnum[]
  }

  /**
   * SessionFeedback findFirstOrThrow
   */
  export type SessionFeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which SessionFeedback to fetch.
     */
    where?: SessionFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionFeedbacks to fetch.
     */
    orderBy?: SessionFeedbackOrderByWithRelationInput | SessionFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionFeedbacks.
     */
    cursor?: SessionFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionFeedbacks.
     */
    distinct?: SessionFeedbackScalarFieldEnum | SessionFeedbackScalarFieldEnum[]
  }

  /**
   * SessionFeedback findMany
   */
  export type SessionFeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which SessionFeedbacks to fetch.
     */
    where?: SessionFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionFeedbacks to fetch.
     */
    orderBy?: SessionFeedbackOrderByWithRelationInput | SessionFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SessionFeedbacks.
     */
    cursor?: SessionFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionFeedbacks.
     */
    skip?: number
    distinct?: SessionFeedbackScalarFieldEnum | SessionFeedbackScalarFieldEnum[]
  }

  /**
   * SessionFeedback create
   */
  export type SessionFeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a SessionFeedback.
     */
    data: XOR<SessionFeedbackCreateInput, SessionFeedbackUncheckedCreateInput>
  }

  /**
   * SessionFeedback createMany
   */
  export type SessionFeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SessionFeedbacks.
     */
    data: SessionFeedbackCreateManyInput | SessionFeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SessionFeedback createManyAndReturn
   */
  export type SessionFeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SessionFeedbacks.
     */
    data: SessionFeedbackCreateManyInput | SessionFeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionFeedback update
   */
  export type SessionFeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a SessionFeedback.
     */
    data: XOR<SessionFeedbackUpdateInput, SessionFeedbackUncheckedUpdateInput>
    /**
     * Choose, which SessionFeedback to update.
     */
    where: SessionFeedbackWhereUniqueInput
  }

  /**
   * SessionFeedback updateMany
   */
  export type SessionFeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SessionFeedbacks.
     */
    data: XOR<SessionFeedbackUpdateManyMutationInput, SessionFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which SessionFeedbacks to update
     */
    where?: SessionFeedbackWhereInput
  }

  /**
   * SessionFeedback upsert
   */
  export type SessionFeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the SessionFeedback to update in case it exists.
     */
    where: SessionFeedbackWhereUniqueInput
    /**
     * In case the SessionFeedback found by the `where` argument doesn't exist, create a new SessionFeedback with this data.
     */
    create: XOR<SessionFeedbackCreateInput, SessionFeedbackUncheckedCreateInput>
    /**
     * In case the SessionFeedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionFeedbackUpdateInput, SessionFeedbackUncheckedUpdateInput>
  }

  /**
   * SessionFeedback delete
   */
  export type SessionFeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
    /**
     * Filter which SessionFeedback to delete.
     */
    where: SessionFeedbackWhereUniqueInput
  }

  /**
   * SessionFeedback deleteMany
   */
  export type SessionFeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionFeedbacks to delete
     */
    where?: SessionFeedbackWhereInput
  }

  /**
   * SessionFeedback without action
   */
  export type SessionFeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionFeedback
     */
    select?: SessionFeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionFeedbackInclude<ExtArgs> | null
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
    mentorProfileId: string | null
    authorId: string | null
    rating: number | null
    review: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    mentorProfileId: string | null
    authorId: string | null
    rating: number | null
    review: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    bookingId: number
    mentorProfileId: number
    authorId: number
    rating: number
    review: number
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
    mentorProfileId?: true
    authorId?: true
    rating?: true
    review?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    bookingId?: true
    mentorProfileId?: true
    authorId?: true
    rating?: true
    review?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    bookingId?: true
    mentorProfileId?: true
    authorId?: true
    rating?: true
    review?: true
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
    mentorProfileId: string
    authorId: string
    rating: number
    review: string | null
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
    mentorProfileId?: boolean
    authorId?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    mentorProfileId?: boolean
    authorId?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    bookingId?: boolean
    mentorProfileId?: boolean
    authorId?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      mentorProfileId: string
      authorId: string
      rating: number
      review: string | null
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
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
    readonly mentorProfileId: FieldRef<"Review", 'String'>
    readonly authorId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly review: FieldRef<"Review", 'String'>
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
   * Model Payout
   */

  export type AggregatePayout = {
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  export type PayoutAvgAggregateOutputType = {
    amount: number | null
  }

  export type PayoutSumAggregateOutputType = {
    amount: number | null
  }

  export type PayoutMinAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    amount: number | null
    transactionId: string | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type PayoutMaxAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    amount: number | null
    transactionId: string | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type PayoutCountAggregateOutputType = {
    id: number
    mentorProfileId: number
    amount: number
    transactionId: number
    processedAt: number
    createdAt: number
    _all: number
  }


  export type PayoutAvgAggregateInputType = {
    amount?: true
  }

  export type PayoutSumAggregateInputType = {
    amount?: true
  }

  export type PayoutMinAggregateInputType = {
    id?: true
    mentorProfileId?: true
    amount?: true
    transactionId?: true
    processedAt?: true
    createdAt?: true
  }

  export type PayoutMaxAggregateInputType = {
    id?: true
    mentorProfileId?: true
    amount?: true
    transactionId?: true
    processedAt?: true
    createdAt?: true
  }

  export type PayoutCountAggregateInputType = {
    id?: true
    mentorProfileId?: true
    amount?: true
    transactionId?: true
    processedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payout to aggregate.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payouts
    **/
    _count?: true | PayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutMaxAggregateInputType
  }

  export type GetPayoutAggregateType<T extends PayoutAggregateArgs> = {
        [P in keyof T & keyof AggregatePayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayout[P]>
      : GetScalarType<T[P], AggregatePayout[P]>
  }




  export type PayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithAggregationInput | PayoutOrderByWithAggregationInput[]
    by: PayoutScalarFieldEnum[] | PayoutScalarFieldEnum
    having?: PayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutCountAggregateInputType | true
    _avg?: PayoutAvgAggregateInputType
    _sum?: PayoutSumAggregateInputType
    _min?: PayoutMinAggregateInputType
    _max?: PayoutMaxAggregateInputType
  }

  export type PayoutGroupByOutputType = {
    id: string
    mentorProfileId: string
    amount: number
    transactionId: string | null
    processedAt: Date | null
    createdAt: Date
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  type GetPayoutGroupByPayload<T extends PayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutGroupByOutputType[P]>
        }
      >
    >


  export type PayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    amount?: boolean
    transactionId?: boolean
    processedAt?: boolean
    createdAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    amount?: boolean
    transactionId?: boolean
    processedAt?: boolean
    createdAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectScalar = {
    id?: boolean
    mentorProfileId?: boolean
    amount?: boolean
    transactionId?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }

  export type PayoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }
  export type PayoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $PayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payout"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorProfileId: string
      amount: number
      transactionId: string | null
      processedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["payout"]>
    composites: {}
  }

  type PayoutGetPayload<S extends boolean | null | undefined | PayoutDefaultArgs> = $Result.GetResult<Prisma.$PayoutPayload, S>

  type PayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PayoutFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PayoutCountAggregateInputType | true
    }

  export interface PayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payout'], meta: { name: 'Payout' } }
    /**
     * Find zero or one Payout that matches the filter.
     * @param {PayoutFindUniqueArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutFindUniqueArgs>(args: SelectSubset<T, PayoutFindUniqueArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payout that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PayoutFindUniqueOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutFindFirstArgs>(args?: SelectSubset<T, PayoutFindFirstArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payouts
     * const payouts = await prisma.payout.findMany()
     * 
     * // Get first 10 Payouts
     * const payouts = await prisma.payout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutWithIdOnly = await prisma.payout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutFindManyArgs>(args?: SelectSubset<T, PayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payout.
     * @param {PayoutCreateArgs} args - Arguments to create a Payout.
     * @example
     * // Create one Payout
     * const Payout = await prisma.payout.create({
     *   data: {
     *     // ... data to create a Payout
     *   }
     * })
     * 
     */
    create<T extends PayoutCreateArgs>(args: SelectSubset<T, PayoutCreateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payouts.
     * @param {PayoutCreateManyArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutCreateManyArgs>(args?: SelectSubset<T, PayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payouts and returns the data saved in the database.
     * @param {PayoutCreateManyAndReturnArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payouts and only return the `id`
     * const payoutWithIdOnly = await prisma.payout.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayoutCreateManyAndReturnArgs>(args?: SelectSubset<T, PayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payout.
     * @param {PayoutDeleteArgs} args - Arguments to delete one Payout.
     * @example
     * // Delete one Payout
     * const Payout = await prisma.payout.delete({
     *   where: {
     *     // ... filter to delete one Payout
     *   }
     * })
     * 
     */
    delete<T extends PayoutDeleteArgs>(args: SelectSubset<T, PayoutDeleteArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payout.
     * @param {PayoutUpdateArgs} args - Arguments to update one Payout.
     * @example
     * // Update one Payout
     * const payout = await prisma.payout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutUpdateArgs>(args: SelectSubset<T, PayoutUpdateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payouts.
     * @param {PayoutDeleteManyArgs} args - Arguments to filter Payouts to delete.
     * @example
     * // Delete a few Payouts
     * const { count } = await prisma.payout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutDeleteManyArgs>(args?: SelectSubset<T, PayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutUpdateManyArgs>(args: SelectSubset<T, PayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payout.
     * @param {PayoutUpsertArgs} args - Arguments to update or create a Payout.
     * @example
     * // Update or create a Payout
     * const payout = await prisma.payout.upsert({
     *   create: {
     *     // ... data to create a Payout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payout we want to update
     *   }
     * })
     */
    upsert<T extends PayoutUpsertArgs>(args: SelectSubset<T, PayoutUpsertArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutCountArgs} args - Arguments to filter Payouts to count.
     * @example
     * // Count the number of Payouts
     * const count = await prisma.payout.count({
     *   where: {
     *     // ... the filter for the Payouts we want to count
     *   }
     * })
    **/
    count<T extends PayoutCountArgs>(
      args?: Subset<T, PayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayoutAggregateArgs>(args: Subset<T, PayoutAggregateArgs>): Prisma.PrismaPromise<GetPayoutAggregateType<T>>

    /**
     * Group by Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutGroupByArgs} args - Group by arguments.
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
      T extends PayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutGroupByArgs['orderBy'] }
        : { orderBy?: PayoutGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payout model
   */
  readonly fields: PayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Payout model
   */ 
  interface PayoutFieldRefs {
    readonly id: FieldRef<"Payout", 'String'>
    readonly mentorProfileId: FieldRef<"Payout", 'String'>
    readonly amount: FieldRef<"Payout", 'Float'>
    readonly transactionId: FieldRef<"Payout", 'String'>
    readonly processedAt: FieldRef<"Payout", 'DateTime'>
    readonly createdAt: FieldRef<"Payout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payout findUnique
   */
  export type PayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findUniqueOrThrow
   */
  export type PayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findFirst
   */
  export type PayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findFirstOrThrow
   */
  export type PayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findMany
   */
  export type PayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payouts to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout create
   */
  export type PayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Payout.
     */
    data: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
  }

  /**
   * Payout createMany
   */
  export type PayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payout createManyAndReturn
   */
  export type PayoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout update
   */
  export type PayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Payout.
     */
    data: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
    /**
     * Choose, which Payout to update.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout updateMany
   */
  export type PayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
  }

  /**
   * Payout upsert
   */
  export type PayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Payout to update in case it exists.
     */
    where: PayoutWhereUniqueInput
    /**
     * In case the Payout found by the `where` argument doesn't exist, create a new Payout with this data.
     */
    create: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
    /**
     * In case the Payout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
  }

  /**
   * Payout delete
   */
  export type PayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter which Payout to delete.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout deleteMany
   */
  export type PayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payouts to delete
     */
    where?: PayoutWhereInput
  }

  /**
   * Payout without action
   */
  export type PayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MenteeProfileScalarFieldEnum: {
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

  export type MenteeProfileScalarFieldEnum = (typeof MenteeProfileScalarFieldEnum)[keyof typeof MenteeProfileScalarFieldEnum]


  export const MentorProfileScalarFieldEnum: {
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

  export type MentorProfileScalarFieldEnum = (typeof MentorProfileScalarFieldEnum)[keyof typeof MentorProfileScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const MentorServiceScalarFieldEnum: {
    id: 'id',
    mentorProfileId: 'mentorProfileId',
    serviceId: 'serviceId',
    price: 'price',
    durationMinutes: 'durationMinutes',
    bufferMinutes: 'bufferMinutes',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorServiceScalarFieldEnum = (typeof MentorServiceScalarFieldEnum)[keyof typeof MentorServiceScalarFieldEnum]


  export const AvailabilityWindowScalarFieldEnum: {
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

  export type AvailabilityWindowScalarFieldEnum = (typeof AvailabilityWindowScalarFieldEnum)[keyof typeof AvailabilityWindowScalarFieldEnum]


  export const AvailabilityWindowServiceScalarFieldEnum: {
    id: 'id',
    windowId: 'windowId',
    mentorServiceId: 'mentorServiceId',
    createdAt: 'createdAt'
  };

  export type AvailabilityWindowServiceScalarFieldEnum = (typeof AvailabilityWindowServiceScalarFieldEnum)[keyof typeof AvailabilityWindowServiceScalarFieldEnum]


  export const BookingScalarFieldEnum: {
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

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
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

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    paymentId: 'paymentId',
    invoiceNumber: 'invoiceNumber',
    invoiceUrl: 'invoiceUrl',
    generatedAt: 'generatedAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const SessionFeedbackScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    mentorProfileId: 'mentorProfileId',
    strengths: 'strengths',
    weaknesses: 'weaknesses',
    recommendations: 'recommendations',
    createdAt: 'createdAt'
  };

  export type SessionFeedbackScalarFieldEnum = (typeof SessionFeedbackScalarFieldEnum)[keyof typeof SessionFeedbackScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    mentorProfileId: 'mentorProfileId',
    authorId: 'authorId',
    rating: 'rating',
    review: 'review',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const PayoutScalarFieldEnum: {
    id: 'id',
    mentorProfileId: 'mentorProfileId',
    amount: 'amount',
    transactionId: 'transactionId',
    processedAt: 'processedAt',
    createdAt: 'createdAt'
  };

  export type PayoutScalarFieldEnum = (typeof PayoutScalarFieldEnum)[keyof typeof PayoutScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'AuthProvider'
   */
  export type EnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider'>
    


  /**
   * Reference to a field of type 'AuthProvider[]'
   */
  export type ListEnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider[]'>
    


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'MentorApprovalStatus'
   */
  export type EnumMentorApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MentorApprovalStatus'>
    


  /**
   * Reference to a field of type 'MentorApprovalStatus[]'
   */
  export type ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MentorApprovalStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    
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
    provider?: EnumAuthProviderFilter<"User"> | $Enums.AuthProvider
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    profilePicture?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    menteeProfile?: XOR<MenteeProfileNullableRelationFilter, MenteeProfileWhereInput> | null
    mentorProfile?: XOR<MentorProfileNullableRelationFilter, MentorProfileWhereInput> | null
    menteeBookings?: BookingListRelationFilter
    reviewsGiven?: ReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    provider?: SortOrder
    role?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    menteeProfile?: MenteeProfileOrderByWithRelationInput
    mentorProfile?: MentorProfileOrderByWithRelationInput
    menteeBookings?: BookingOrderByRelationAggregateInput
    reviewsGiven?: ReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    provider?: EnumAuthProviderFilter<"User"> | $Enums.AuthProvider
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    profilePicture?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    menteeProfile?: XOR<MenteeProfileNullableRelationFilter, MenteeProfileWhereInput> | null
    mentorProfile?: XOR<MentorProfileNullableRelationFilter, MentorProfileWhereInput> | null
    menteeBookings?: BookingListRelationFilter
    reviewsGiven?: ReviewListRelationFilter
  }, "id" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    provider?: SortOrder
    role?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
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
    provider?: EnumAuthProviderWithAggregatesFilter<"User"> | $Enums.AuthProvider
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    name?: StringWithAggregatesFilter<"User"> | string
    profilePicture?: StringNullableWithAggregatesFilter<"User"> | string | null
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type MenteeProfileWhereInput = {
    AND?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    OR?: MenteeProfileWhereInput[]
    NOT?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    id?: StringFilter<"MenteeProfile"> | string
    userId?: StringFilter<"MenteeProfile"> | string
    username?: StringFilter<"MenteeProfile"> | string
    dateOfBirth?: DateTimeFilter<"MenteeProfile"> | Date | string
    contactNumber?: StringFilter<"MenteeProfile"> | string
    education?: JsonFilter<"MenteeProfile">
    catHistory?: JsonNullableFilter<"MenteeProfile">
    otherMbaScore?: FloatNullableFilter<"MenteeProfile"> | number | null
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableFilter<"MenteeProfile"> | string | null
    expectations?: StringNullableFilter<"MenteeProfile"> | string | null
    skillsets?: StringNullableListFilter<"MenteeProfile">
    resumeUrl?: StringNullableFilter<"MenteeProfile"> | string | null
    linkedInUrl?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MenteeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    education?: SortOrder
    catHistory?: SortOrderInput | SortOrder
    otherMbaScore?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    expectations?: SortOrderInput | SortOrder
    skillsets?: SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MenteeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    username?: string
    AND?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    OR?: MenteeProfileWhereInput[]
    NOT?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    dateOfBirth?: DateTimeFilter<"MenteeProfile"> | Date | string
    contactNumber?: StringFilter<"MenteeProfile"> | string
    education?: JsonFilter<"MenteeProfile">
    catHistory?: JsonNullableFilter<"MenteeProfile">
    otherMbaScore?: FloatNullableFilter<"MenteeProfile"> | number | null
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableFilter<"MenteeProfile"> | string | null
    expectations?: StringNullableFilter<"MenteeProfile"> | string | null
    skillsets?: StringNullableListFilter<"MenteeProfile">
    resumeUrl?: StringNullableFilter<"MenteeProfile"> | string | null
    linkedInUrl?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId" | "username">

  export type MenteeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    education?: SortOrder
    catHistory?: SortOrderInput | SortOrder
    otherMbaScore?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    expectations?: SortOrderInput | SortOrder
    skillsets?: SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
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
    username?: StringWithAggregatesFilter<"MenteeProfile"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
    contactNumber?: StringWithAggregatesFilter<"MenteeProfile"> | string
    education?: JsonWithAggregatesFilter<"MenteeProfile">
    catHistory?: JsonNullableWithAggregatesFilter<"MenteeProfile">
    otherMbaScore?: FloatNullableWithAggregatesFilter<"MenteeProfile"> | number | null
    workExperience?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    expectations?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    skillsets?: StringNullableListFilter<"MenteeProfile">
    resumeUrl?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    linkedInUrl?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
  }

  export type MentorProfileWhereInput = {
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    id?: StringFilter<"MentorProfile"> | string
    userId?: StringFilter<"MentorProfile"> | string
    username?: StringFilter<"MentorProfile"> | string
    bio?: StringFilter<"MentorProfile"> | string
    linkedInUrl?: StringNullableFilter<"MentorProfile"> | string | null
    contactNumber?: StringFilter<"MentorProfile"> | string
    expertiseTags?: StringNullableListFilter<"MentorProfile">
    ugCollegeProfile?: StringNullableFilter<"MentorProfile"> | string | null
    pgCollegeProfile?: StringNullableFilter<"MentorProfile"> | string | null
    workExperience?: StringNullableFilter<"MentorProfile"> | string | null
    certifications?: StringNullableFilter<"MentorProfile"> | string | null
    collegeDocumentUrl?: StringNullableFilter<"MentorProfile"> | string | null
    approvalStatus?: EnumMentorApprovalStatusFilter<"MentorProfile"> | $Enums.MentorApprovalStatus
    isVerified?: BoolFilter<"MentorProfile"> | boolean
    totalSessions?: IntFilter<"MentorProfile"> | number
    totalEarnings?: FloatFilter<"MentorProfile"> | number
    averageRating?: FloatFilter<"MentorProfile"> | number
    timezone?: StringFilter<"MentorProfile"> | string
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    mentorServices?: MentorServiceListRelationFilter
    availabilityWindows?: AvailabilityWindowListRelationFilter
    mentorBookings?: BookingListRelationFilter
    reviews?: ReviewListRelationFilter
    feedbacks?: SessionFeedbackListRelationFilter
    payouts?: PayoutListRelationFilter
  }

  export type MentorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    contactNumber?: SortOrder
    expertiseTags?: SortOrder
    ugCollegeProfile?: SortOrderInput | SortOrder
    pgCollegeProfile?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    collegeDocumentUrl?: SortOrderInput | SortOrder
    approvalStatus?: SortOrder
    isVerified?: SortOrder
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    mentorServices?: MentorServiceOrderByRelationAggregateInput
    availabilityWindows?: AvailabilityWindowOrderByRelationAggregateInput
    mentorBookings?: BookingOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    feedbacks?: SessionFeedbackOrderByRelationAggregateInput
    payouts?: PayoutOrderByRelationAggregateInput
  }

  export type MentorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    username?: string
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    bio?: StringFilter<"MentorProfile"> | string
    linkedInUrl?: StringNullableFilter<"MentorProfile"> | string | null
    contactNumber?: StringFilter<"MentorProfile"> | string
    expertiseTags?: StringNullableListFilter<"MentorProfile">
    ugCollegeProfile?: StringNullableFilter<"MentorProfile"> | string | null
    pgCollegeProfile?: StringNullableFilter<"MentorProfile"> | string | null
    workExperience?: StringNullableFilter<"MentorProfile"> | string | null
    certifications?: StringNullableFilter<"MentorProfile"> | string | null
    collegeDocumentUrl?: StringNullableFilter<"MentorProfile"> | string | null
    approvalStatus?: EnumMentorApprovalStatusFilter<"MentorProfile"> | $Enums.MentorApprovalStatus
    isVerified?: BoolFilter<"MentorProfile"> | boolean
    totalSessions?: IntFilter<"MentorProfile"> | number
    totalEarnings?: FloatFilter<"MentorProfile"> | number
    averageRating?: FloatFilter<"MentorProfile"> | number
    timezone?: StringFilter<"MentorProfile"> | string
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    mentorServices?: MentorServiceListRelationFilter
    availabilityWindows?: AvailabilityWindowListRelationFilter
    mentorBookings?: BookingListRelationFilter
    reviews?: ReviewListRelationFilter
    feedbacks?: SessionFeedbackListRelationFilter
    payouts?: PayoutListRelationFilter
  }, "id" | "userId" | "username">

  export type MentorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    contactNumber?: SortOrder
    expertiseTags?: SortOrder
    ugCollegeProfile?: SortOrderInput | SortOrder
    pgCollegeProfile?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    collegeDocumentUrl?: SortOrderInput | SortOrder
    approvalStatus?: SortOrder
    isVerified?: SortOrder
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
    timezone?: SortOrder
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
    username?: StringWithAggregatesFilter<"MentorProfile"> | string
    bio?: StringWithAggregatesFilter<"MentorProfile"> | string
    linkedInUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    contactNumber?: StringWithAggregatesFilter<"MentorProfile"> | string
    expertiseTags?: StringNullableListFilter<"MentorProfile">
    ugCollegeProfile?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    pgCollegeProfile?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    workExperience?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    certifications?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    collegeDocumentUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    approvalStatus?: EnumMentorApprovalStatusWithAggregatesFilter<"MentorProfile"> | $Enums.MentorApprovalStatus
    isVerified?: BoolWithAggregatesFilter<"MentorProfile"> | boolean
    totalSessions?: IntWithAggregatesFilter<"MentorProfile"> | number
    totalEarnings?: FloatWithAggregatesFilter<"MentorProfile"> | number
    averageRating?: FloatWithAggregatesFilter<"MentorProfile"> | number
    timezone?: StringWithAggregatesFilter<"MentorProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    slug?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    mentorServices?: MentorServiceListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentorServices?: MentorServiceOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    description?: StringNullableFilter<"Service"> | string | null
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    mentorServices?: MentorServiceListRelationFilter
  }, "id" | "name" | "slug">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    slug?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type MentorServiceWhereInput = {
    AND?: MentorServiceWhereInput | MentorServiceWhereInput[]
    OR?: MentorServiceWhereInput[]
    NOT?: MentorServiceWhereInput | MentorServiceWhereInput[]
    id?: StringFilter<"MentorService"> | string
    mentorProfileId?: StringFilter<"MentorService"> | string
    serviceId?: StringFilter<"MentorService"> | string
    price?: FloatFilter<"MentorService"> | number
    durationMinutes?: IntFilter<"MentorService"> | number
    bufferMinutes?: IntFilter<"MentorService"> | number
    isActive?: BoolFilter<"MentorService"> | boolean
    createdAt?: DateTimeFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeFilter<"MentorService"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    windowServices?: AvailabilityWindowServiceListRelationFilter
    bookings?: BookingListRelationFilter
  }

  export type MentorServiceOrderByWithRelationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentorProfile?: MentorProfileOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
    windowServices?: AvailabilityWindowServiceOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type MentorServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mentorProfileId_serviceId?: MentorServiceMentorProfileIdServiceIdCompoundUniqueInput
    AND?: MentorServiceWhereInput | MentorServiceWhereInput[]
    OR?: MentorServiceWhereInput[]
    NOT?: MentorServiceWhereInput | MentorServiceWhereInput[]
    mentorProfileId?: StringFilter<"MentorService"> | string
    serviceId?: StringFilter<"MentorService"> | string
    price?: FloatFilter<"MentorService"> | number
    durationMinutes?: IntFilter<"MentorService"> | number
    bufferMinutes?: IntFilter<"MentorService"> | number
    isActive?: BoolFilter<"MentorService"> | boolean
    createdAt?: DateTimeFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeFilter<"MentorService"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    windowServices?: AvailabilityWindowServiceListRelationFilter
    bookings?: BookingListRelationFilter
  }, "id" | "mentorProfileId_serviceId">

  export type MentorServiceOrderByWithAggregationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorServiceCountOrderByAggregateInput
    _avg?: MentorServiceAvgOrderByAggregateInput
    _max?: MentorServiceMaxOrderByAggregateInput
    _min?: MentorServiceMinOrderByAggregateInput
    _sum?: MentorServiceSumOrderByAggregateInput
  }

  export type MentorServiceScalarWhereWithAggregatesInput = {
    AND?: MentorServiceScalarWhereWithAggregatesInput | MentorServiceScalarWhereWithAggregatesInput[]
    OR?: MentorServiceScalarWhereWithAggregatesInput[]
    NOT?: MentorServiceScalarWhereWithAggregatesInput | MentorServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MentorService"> | string
    mentorProfileId?: StringWithAggregatesFilter<"MentorService"> | string
    serviceId?: StringWithAggregatesFilter<"MentorService"> | string
    price?: FloatWithAggregatesFilter<"MentorService"> | number
    durationMinutes?: IntWithAggregatesFilter<"MentorService"> | number
    bufferMinutes?: IntWithAggregatesFilter<"MentorService"> | number
    isActive?: BoolWithAggregatesFilter<"MentorService"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorService"> | Date | string
  }

  export type AvailabilityWindowWhereInput = {
    AND?: AvailabilityWindowWhereInput | AvailabilityWindowWhereInput[]
    OR?: AvailabilityWindowWhereInput[]
    NOT?: AvailabilityWindowWhereInput | AvailabilityWindowWhereInput[]
    id?: StringFilter<"AvailabilityWindow"> | string
    mentorProfileId?: StringFilter<"AvailabilityWindow"> | string
    dayOfWeek?: EnumDayOfWeekNullableFilter<"AvailabilityWindow"> | $Enums.DayOfWeek | null
    specificDate?: DateTimeNullableFilter<"AvailabilityWindow"> | Date | string | null
    startTime?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    endTime?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    timezone?: StringFilter<"AvailabilityWindow"> | string
    createdAt?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    updatedAt?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    windowServices?: AvailabilityWindowServiceListRelationFilter
  }

  export type AvailabilityWindowOrderByWithRelationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrderInput | SortOrder
    specificDate?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentorProfile?: MentorProfileOrderByWithRelationInput
    windowServices?: AvailabilityWindowServiceOrderByRelationAggregateInput
  }

  export type AvailabilityWindowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvailabilityWindowWhereInput | AvailabilityWindowWhereInput[]
    OR?: AvailabilityWindowWhereInput[]
    NOT?: AvailabilityWindowWhereInput | AvailabilityWindowWhereInput[]
    mentorProfileId?: StringFilter<"AvailabilityWindow"> | string
    dayOfWeek?: EnumDayOfWeekNullableFilter<"AvailabilityWindow"> | $Enums.DayOfWeek | null
    specificDate?: DateTimeNullableFilter<"AvailabilityWindow"> | Date | string | null
    startTime?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    endTime?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    timezone?: StringFilter<"AvailabilityWindow"> | string
    createdAt?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    updatedAt?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    windowServices?: AvailabilityWindowServiceListRelationFilter
  }, "id">

  export type AvailabilityWindowOrderByWithAggregationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrderInput | SortOrder
    specificDate?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AvailabilityWindowCountOrderByAggregateInput
    _max?: AvailabilityWindowMaxOrderByAggregateInput
    _min?: AvailabilityWindowMinOrderByAggregateInput
  }

  export type AvailabilityWindowScalarWhereWithAggregatesInput = {
    AND?: AvailabilityWindowScalarWhereWithAggregatesInput | AvailabilityWindowScalarWhereWithAggregatesInput[]
    OR?: AvailabilityWindowScalarWhereWithAggregatesInput[]
    NOT?: AvailabilityWindowScalarWhereWithAggregatesInput | AvailabilityWindowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailabilityWindow"> | string
    mentorProfileId?: StringWithAggregatesFilter<"AvailabilityWindow"> | string
    dayOfWeek?: EnumDayOfWeekNullableWithAggregatesFilter<"AvailabilityWindow"> | $Enums.DayOfWeek | null
    specificDate?: DateTimeNullableWithAggregatesFilter<"AvailabilityWindow"> | Date | string | null
    startTime?: DateTimeWithAggregatesFilter<"AvailabilityWindow"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"AvailabilityWindow"> | Date | string
    timezone?: StringWithAggregatesFilter<"AvailabilityWindow"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AvailabilityWindow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AvailabilityWindow"> | Date | string
  }

  export type AvailabilityWindowServiceWhereInput = {
    AND?: AvailabilityWindowServiceWhereInput | AvailabilityWindowServiceWhereInput[]
    OR?: AvailabilityWindowServiceWhereInput[]
    NOT?: AvailabilityWindowServiceWhereInput | AvailabilityWindowServiceWhereInput[]
    id?: StringFilter<"AvailabilityWindowService"> | string
    windowId?: StringFilter<"AvailabilityWindowService"> | string
    mentorServiceId?: StringFilter<"AvailabilityWindowService"> | string
    createdAt?: DateTimeFilter<"AvailabilityWindowService"> | Date | string
    window?: XOR<AvailabilityWindowRelationFilter, AvailabilityWindowWhereInput>
    mentorService?: XOR<MentorServiceRelationFilter, MentorServiceWhereInput>
  }

  export type AvailabilityWindowServiceOrderByWithRelationInput = {
    id?: SortOrder
    windowId?: SortOrder
    mentorServiceId?: SortOrder
    createdAt?: SortOrder
    window?: AvailabilityWindowOrderByWithRelationInput
    mentorService?: MentorServiceOrderByWithRelationInput
  }

  export type AvailabilityWindowServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    windowId_mentorServiceId?: AvailabilityWindowServiceWindowIdMentorServiceIdCompoundUniqueInput
    AND?: AvailabilityWindowServiceWhereInput | AvailabilityWindowServiceWhereInput[]
    OR?: AvailabilityWindowServiceWhereInput[]
    NOT?: AvailabilityWindowServiceWhereInput | AvailabilityWindowServiceWhereInput[]
    windowId?: StringFilter<"AvailabilityWindowService"> | string
    mentorServiceId?: StringFilter<"AvailabilityWindowService"> | string
    createdAt?: DateTimeFilter<"AvailabilityWindowService"> | Date | string
    window?: XOR<AvailabilityWindowRelationFilter, AvailabilityWindowWhereInput>
    mentorService?: XOR<MentorServiceRelationFilter, MentorServiceWhereInput>
  }, "id" | "windowId_mentorServiceId">

  export type AvailabilityWindowServiceOrderByWithAggregationInput = {
    id?: SortOrder
    windowId?: SortOrder
    mentorServiceId?: SortOrder
    createdAt?: SortOrder
    _count?: AvailabilityWindowServiceCountOrderByAggregateInput
    _max?: AvailabilityWindowServiceMaxOrderByAggregateInput
    _min?: AvailabilityWindowServiceMinOrderByAggregateInput
  }

  export type AvailabilityWindowServiceScalarWhereWithAggregatesInput = {
    AND?: AvailabilityWindowServiceScalarWhereWithAggregatesInput | AvailabilityWindowServiceScalarWhereWithAggregatesInput[]
    OR?: AvailabilityWindowServiceScalarWhereWithAggregatesInput[]
    NOT?: AvailabilityWindowServiceScalarWhereWithAggregatesInput | AvailabilityWindowServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailabilityWindowService"> | string
    windowId?: StringWithAggregatesFilter<"AvailabilityWindowService"> | string
    mentorServiceId?: StringWithAggregatesFilter<"AvailabilityWindowService"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AvailabilityWindowService"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    menteeId?: StringFilter<"Booking"> | string
    mentorProfileId?: StringFilter<"Booking"> | string
    mentorServiceId?: StringFilter<"Booking"> | string
    startTime?: DateTimeFilter<"Booking"> | Date | string
    endTime?: DateTimeFilter<"Booking"> | Date | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    paymentId?: StringNullableFilter<"Booking"> | string | null
    meetingLink?: StringNullableFilter<"Booking"> | string | null
    purposeOfCall?: StringNullableFilter<"Booking"> | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    cancelledReason?: StringNullableFilter<"Booking"> | string | null
    rescheduledFromId?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    mentee?: XOR<UserRelationFilter, UserWhereInput>
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    mentorService?: XOR<MentorServiceRelationFilter, MentorServiceWhereInput>
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
    review?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
    feedback?: XOR<SessionFeedbackNullableRelationFilter, SessionFeedbackWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    mentorProfileId?: SortOrder
    mentorServiceId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    meetingLink?: SortOrderInput | SortOrder
    purposeOfCall?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    cancelledReason?: SortOrderInput | SortOrder
    rescheduledFromId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentee?: UserOrderByWithRelationInput
    mentorProfile?: MentorProfileOrderByWithRelationInput
    mentorService?: MentorServiceOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
    review?: ReviewOrderByWithRelationInput
    feedback?: SessionFeedbackOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    menteeId?: StringFilter<"Booking"> | string
    mentorProfileId?: StringFilter<"Booking"> | string
    mentorServiceId?: StringFilter<"Booking"> | string
    startTime?: DateTimeFilter<"Booking"> | Date | string
    endTime?: DateTimeFilter<"Booking"> | Date | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    paymentId?: StringNullableFilter<"Booking"> | string | null
    meetingLink?: StringNullableFilter<"Booking"> | string | null
    purposeOfCall?: StringNullableFilter<"Booking"> | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    cancelledReason?: StringNullableFilter<"Booking"> | string | null
    rescheduledFromId?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    mentee?: XOR<UserRelationFilter, UserWhereInput>
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    mentorService?: XOR<MentorServiceRelationFilter, MentorServiceWhereInput>
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
    review?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
    feedback?: XOR<SessionFeedbackNullableRelationFilter, SessionFeedbackWhereInput> | null
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    mentorProfileId?: SortOrder
    mentorServiceId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    meetingLink?: SortOrderInput | SortOrder
    purposeOfCall?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    cancelledReason?: SortOrderInput | SortOrder
    rescheduledFromId?: SortOrderInput | SortOrder
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
    menteeId?: StringWithAggregatesFilter<"Booking"> | string
    mentorProfileId?: StringWithAggregatesFilter<"Booking"> | string
    mentorServiceId?: StringWithAggregatesFilter<"Booking"> | string
    startTime?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    paymentId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    meetingLink?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    purposeOfCall?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    cancelledReason?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    rescheduledFromId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    bookingId?: StringFilter<"Payment"> | string
    razorpayOrderId?: StringNullableFilter<"Payment"> | string | null
    razorpayPaymentId?: StringNullableFilter<"Payment"> | string | null
    razorpaySignature?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    refundedAmount?: FloatNullableFilter<"Payment"> | number | null
    refundReason?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrderInput | SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    razorpaySignature?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    refundedAmount?: SortOrderInput | SortOrder
    refundReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    invoice?: InvoiceOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    razorpayOrderId?: StringNullableFilter<"Payment"> | string | null
    razorpayPaymentId?: StringNullableFilter<"Payment"> | string | null
    razorpaySignature?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    refundedAmount?: FloatNullableFilter<"Payment"> | number | null
    refundReason?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
  }, "id" | "bookingId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrderInput | SortOrder
    razorpayPaymentId?: SortOrderInput | SortOrder
    razorpaySignature?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    refundedAmount?: SortOrderInput | SortOrder
    refundReason?: SortOrderInput | SortOrder
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
    razorpayOrderId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    razorpayPaymentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    razorpaySignature?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    refundedAmount?: FloatNullableWithAggregatesFilter<"Payment"> | number | null
    refundReason?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    paymentId?: StringFilter<"Invoice"> | string
    invoiceNumber?: StringFilter<"Invoice"> | string
    invoiceUrl?: StringNullableFilter<"Invoice"> | string | null
    generatedAt?: DateTimeFilter<"Invoice"> | Date | string
    payment?: XOR<PaymentRelationFilter, PaymentWhereInput>
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    invoiceNumber?: SortOrder
    invoiceUrl?: SortOrderInput | SortOrder
    generatedAt?: SortOrder
    payment?: PaymentOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentId?: string
    invoiceNumber?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    invoiceUrl?: StringNullableFilter<"Invoice"> | string | null
    generatedAt?: DateTimeFilter<"Invoice"> | Date | string
    payment?: XOR<PaymentRelationFilter, PaymentWhereInput>
  }, "id" | "paymentId" | "invoiceNumber">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    invoiceNumber?: SortOrder
    invoiceUrl?: SortOrderInput | SortOrder
    generatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    paymentId?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceNumber?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceUrl?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    generatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type SessionFeedbackWhereInput = {
    AND?: SessionFeedbackWhereInput | SessionFeedbackWhereInput[]
    OR?: SessionFeedbackWhereInput[]
    NOT?: SessionFeedbackWhereInput | SessionFeedbackWhereInput[]
    id?: StringFilter<"SessionFeedback"> | string
    bookingId?: StringFilter<"SessionFeedback"> | string
    mentorProfileId?: StringFilter<"SessionFeedback"> | string
    strengths?: StringNullableFilter<"SessionFeedback"> | string | null
    weaknesses?: StringNullableFilter<"SessionFeedback"> | string | null
    recommendations?: StringNullableFilter<"SessionFeedback"> | string | null
    createdAt?: DateTimeFilter<"SessionFeedback"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type SessionFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    strengths?: SortOrderInput | SortOrder
    weaknesses?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    mentorProfile?: MentorProfileOrderByWithRelationInput
  }

  export type SessionFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: SessionFeedbackWhereInput | SessionFeedbackWhereInput[]
    OR?: SessionFeedbackWhereInput[]
    NOT?: SessionFeedbackWhereInput | SessionFeedbackWhereInput[]
    mentorProfileId?: StringFilter<"SessionFeedback"> | string
    strengths?: StringNullableFilter<"SessionFeedback"> | string | null
    weaknesses?: StringNullableFilter<"SessionFeedback"> | string | null
    recommendations?: StringNullableFilter<"SessionFeedback"> | string | null
    createdAt?: DateTimeFilter<"SessionFeedback"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id" | "bookingId">

  export type SessionFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    strengths?: SortOrderInput | SortOrder
    weaknesses?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionFeedbackCountOrderByAggregateInput
    _max?: SessionFeedbackMaxOrderByAggregateInput
    _min?: SessionFeedbackMinOrderByAggregateInput
  }

  export type SessionFeedbackScalarWhereWithAggregatesInput = {
    AND?: SessionFeedbackScalarWhereWithAggregatesInput | SessionFeedbackScalarWhereWithAggregatesInput[]
    OR?: SessionFeedbackScalarWhereWithAggregatesInput[]
    NOT?: SessionFeedbackScalarWhereWithAggregatesInput | SessionFeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SessionFeedback"> | string
    bookingId?: StringWithAggregatesFilter<"SessionFeedback"> | string
    mentorProfileId?: StringWithAggregatesFilter<"SessionFeedback"> | string
    strengths?: StringNullableWithAggregatesFilter<"SessionFeedback"> | string | null
    weaknesses?: StringNullableWithAggregatesFilter<"SessionFeedback"> | string | null
    recommendations?: StringNullableWithAggregatesFilter<"SessionFeedback"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SessionFeedback"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    bookingId?: StringFilter<"Review"> | string
    mentorProfileId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    review?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    author?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    authorId?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    mentorProfile?: MentorProfileOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    mentorProfileId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    review?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    author?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "bookingId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    authorId?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
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
    mentorProfileId?: StringWithAggregatesFilter<"Review"> | string
    authorId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    review?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type PayoutWhereInput = {
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    id?: StringFilter<"Payout"> | string
    mentorProfileId?: StringFilter<"Payout"> | string
    amount?: FloatFilter<"Payout"> | number
    transactionId?: StringNullableFilter<"Payout"> | string | null
    processedAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type PayoutOrderByWithRelationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    mentorProfile?: MentorProfileOrderByWithRelationInput
  }

  export type PayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    mentorProfileId?: StringFilter<"Payout"> | string
    amount?: FloatFilter<"Payout"> | number
    transactionId?: StringNullableFilter<"Payout"> | string | null
    processedAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id">

  export type PayoutOrderByWithAggregationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PayoutCountOrderByAggregateInput
    _avg?: PayoutAvgOrderByAggregateInput
    _max?: PayoutMaxOrderByAggregateInput
    _min?: PayoutMinOrderByAggregateInput
    _sum?: PayoutSumOrderByAggregateInput
  }

  export type PayoutScalarWhereWithAggregatesInput = {
    AND?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    OR?: PayoutScalarWhereWithAggregatesInput[]
    NOT?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payout"> | string
    mentorProfileId?: StringWithAggregatesFilter<"Payout"> | string
    amount?: FloatWithAggregatesFilter<"Payout"> | number
    transactionId?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    processedAt?: DateTimeNullableWithAggregatesFilter<"Payout"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeBookings?: BookingCreateNestedManyWithoutMenteeInput
    reviewsGiven?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeBookings?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUpdateManyWithoutMenteeNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MenteeProfileCreateInput = {
    id?: string
    username: string
    dateOfBirth: Date | string
    contactNumber: string
    education: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    expectations?: string | null
    skillsets?: MenteeProfileCreateskillsetsInput | string[]
    resumeUrl?: string | null
    linkedInUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
  }

  export type MenteeProfileUncheckedCreateInput = {
    id?: string
    userId: string
    username: string
    dateOfBirth: Date | string
    contactNumber: string
    education: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    expectations?: string | null
    skillsets?: MenteeProfileCreateskillsetsInput | string[]
    resumeUrl?: string | null
    linkedInUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    skillsets?: MenteeProfileUpdateskillsetsInput | string[]
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
  }

  export type MenteeProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    skillsets?: MenteeProfileUpdateskillsetsInput | string[]
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileCreateManyInput = {
    id?: string
    userId: string
    username: string
    dateOfBirth: Date | string
    contactNumber: string
    education: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    expectations?: string | null
    skillsets?: MenteeProfileCreateskillsetsInput | string[]
    resumeUrl?: string | null
    linkedInUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    skillsets?: MenteeProfileUpdateskillsetsInput | string[]
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    skillsets?: MenteeProfileUpdateskillsetsInput | string[]
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileCreateInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileCreateManyInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceCreateInput = {
    id?: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorServicesInput
    service: ServiceCreateNestedOneWithoutMentorServicesInput
    windowServices?: AvailabilityWindowServiceCreateNestedManyWithoutMentorServiceInput
    bookings?: BookingCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceUncheckedCreateInput = {
    id?: string
    mentorProfileId: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceUncheckedCreateNestedManyWithoutMentorServiceInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutMentorServicesNestedInput
    windowServices?: AvailabilityWindowServiceUpdateManyWithoutMentorServiceNestedInput
    bookings?: BookingUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceCreateManyInput = {
    id?: string
    mentorProfileId: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowCreateInput = {
    id?: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutAvailabilityWindowsInput
    windowServices?: AvailabilityWindowServiceCreateNestedManyWithoutWindowInput
  }

  export type AvailabilityWindowUncheckedCreateInput = {
    id?: string
    mentorProfileId: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceUncheckedCreateNestedManyWithoutWindowInput
  }

  export type AvailabilityWindowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutAvailabilityWindowsNestedInput
    windowServices?: AvailabilityWindowServiceUpdateManyWithoutWindowNestedInput
  }

  export type AvailabilityWindowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUncheckedUpdateManyWithoutWindowNestedInput
  }

  export type AvailabilityWindowCreateManyInput = {
    id?: string
    mentorProfileId: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityWindowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceCreateInput = {
    id?: string
    createdAt?: Date | string
    window: AvailabilityWindowCreateNestedOneWithoutWindowServicesInput
    mentorService: MentorServiceCreateNestedOneWithoutWindowServicesInput
  }

  export type AvailabilityWindowServiceUncheckedCreateInput = {
    id?: string
    windowId: string
    mentorServiceId: string
    createdAt?: Date | string
  }

  export type AvailabilityWindowServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    window?: AvailabilityWindowUpdateOneRequiredWithoutWindowServicesNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutWindowServicesNestedInput
  }

  export type AvailabilityWindowServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    windowId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceCreateManyInput = {
    id?: string
    windowId: string
    mentorServiceId: string
    createdAt?: Date | string
  }

  export type AvailabilityWindowServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    windowId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutMenteeBookingsInput
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorBookingsInput
    mentorService: MentorServiceCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutMenteeBookingsNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutPaymentInput
    invoice?: InvoiceCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    bookingId: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutPaymentNestedInput
    invoice?: InvoiceUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    bookingId: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateInput = {
    id?: string
    invoiceNumber: string
    invoiceUrl?: string | null
    generatedAt?: Date | string
    payment: PaymentCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    paymentId: string
    invoiceNumber: string
    invoiceUrl?: string | null
    generatedAt?: Date | string
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneRequiredWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyInput = {
    id?: string
    paymentId: string
    invoiceNumber: string
    invoiceUrl?: string | null
    generatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionFeedbackCreateInput = {
    id?: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutFeedbackInput
    mentorProfile: MentorProfileCreateNestedOneWithoutFeedbacksInput
  }

  export type SessionFeedbackUncheckedCreateInput = {
    id?: string
    bookingId: string
    mentorProfileId: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
  }

  export type SessionFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutFeedbackNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type SessionFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionFeedbackCreateManyInput = {
    id?: string
    bookingId: string
    mentorProfileId: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
  }

  export type SessionFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    review?: string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutReviewInput
    mentorProfile: MentorProfileCreateNestedOneWithoutReviewsInput
    author: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    bookingId: string
    mentorProfileId: string
    authorId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutReviewNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutReviewsNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    bookingId: string
    mentorProfileId: string
    authorId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutCreateInput = {
    id?: string
    amount: number
    transactionId?: string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutPayoutsInput
  }

  export type PayoutUncheckedCreateInput = {
    id?: string
    mentorProfileId: string
    amount: number
    transactionId?: string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PayoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutPayoutsNestedInput
  }

  export type PayoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutCreateManyInput = {
    id?: string
    mentorProfileId: string
    amount: number
    transactionId?: string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PayoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
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

  export type MenteeProfileNullableRelationFilter = {
    is?: MenteeProfileWhereInput | null
    isNot?: MenteeProfileWhereInput | null
  }

  export type MentorProfileNullableRelationFilter = {
    is?: MentorProfileWhereInput | null
    isNot?: MentorProfileWhereInput | null
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    name?: SortOrder
    profilePicture?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
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

  export type EnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
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
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MenteeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    education?: SortOrder
    catHistory?: SortOrder
    otherMbaScore?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    expectations?: SortOrder
    skillsets?: SortOrder
    resumeUrl?: SortOrder
    linkedInUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileAvgOrderByAggregateInput = {
    otherMbaScore?: SortOrder
  }

  export type MenteeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    otherMbaScore?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    expectations?: SortOrder
    resumeUrl?: SortOrder
    linkedInUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    otherMbaScore?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    expectations?: SortOrder
    resumeUrl?: SortOrder
    linkedInUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileSumOrderByAggregateInput = {
    otherMbaScore?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type EnumMentorApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorApprovalStatus | EnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorApprovalStatusFilter<$PrismaModel> | $Enums.MentorApprovalStatus
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

  export type MentorServiceListRelationFilter = {
    every?: MentorServiceWhereInput
    some?: MentorServiceWhereInput
    none?: MentorServiceWhereInput
  }

  export type AvailabilityWindowListRelationFilter = {
    every?: AvailabilityWindowWhereInput
    some?: AvailabilityWindowWhereInput
    none?: AvailabilityWindowWhereInput
  }

  export type SessionFeedbackListRelationFilter = {
    every?: SessionFeedbackWhereInput
    some?: SessionFeedbackWhereInput
    none?: SessionFeedbackWhereInput
  }

  export type PayoutListRelationFilter = {
    every?: PayoutWhereInput
    some?: PayoutWhereInput
    none?: PayoutWhereInput
  }

  export type MentorServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvailabilityWindowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    linkedInUrl?: SortOrder
    contactNumber?: SortOrder
    expertiseTags?: SortOrder
    ugCollegeProfile?: SortOrder
    pgCollegeProfile?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    collegeDocumentUrl?: SortOrder
    approvalStatus?: SortOrder
    isVerified?: SortOrder
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileAvgOrderByAggregateInput = {
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
  }

  export type MentorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    linkedInUrl?: SortOrder
    contactNumber?: SortOrder
    ugCollegeProfile?: SortOrder
    pgCollegeProfile?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    collegeDocumentUrl?: SortOrder
    approvalStatus?: SortOrder
    isVerified?: SortOrder
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    linkedInUrl?: SortOrder
    contactNumber?: SortOrder
    ugCollegeProfile?: SortOrder
    pgCollegeProfile?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    collegeDocumentUrl?: SortOrder
    approvalStatus?: SortOrder
    isVerified?: SortOrder
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileSumOrderByAggregateInput = {
    totalSessions?: SortOrder
    totalEarnings?: SortOrder
    averageRating?: SortOrder
  }

  export type EnumMentorApprovalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorApprovalStatus | EnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorApprovalStatusWithAggregatesFilter<$PrismaModel> | $Enums.MentorApprovalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMentorApprovalStatusFilter<$PrismaModel>
    _max?: NestedEnumMentorApprovalStatusFilter<$PrismaModel>
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

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileRelationFilter = {
    is?: MentorProfileWhereInput
    isNot?: MentorProfileWhereInput
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type AvailabilityWindowServiceListRelationFilter = {
    every?: AvailabilityWindowServiceWhereInput
    some?: AvailabilityWindowServiceWhereInput
    none?: AvailabilityWindowServiceWhereInput
  }

  export type AvailabilityWindowServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorServiceMentorProfileIdServiceIdCompoundUniqueInput = {
    mentorProfileId: string
    serviceId: string
  }

  export type MentorServiceCountOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
  }

  export type MentorServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorServiceMinOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceId?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorServiceSumOrderByAggregateInput = {
    price?: SortOrder
    durationMinutes?: SortOrder
    bufferMinutes?: SortOrder
  }

  export type EnumDayOfWeekNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel> | null
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDayOfWeekNullableFilter<$PrismaModel> | $Enums.DayOfWeek | null
  }

  export type AvailabilityWindowCountOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    specificDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailabilityWindowMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    specificDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailabilityWindowMinOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    specificDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDayOfWeekNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel> | null
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDayOfWeekNullableWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekNullableFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekNullableFilter<$PrismaModel>
  }

  export type AvailabilityWindowRelationFilter = {
    is?: AvailabilityWindowWhereInput
    isNot?: AvailabilityWindowWhereInput
  }

  export type MentorServiceRelationFilter = {
    is?: MentorServiceWhereInput
    isNot?: MentorServiceWhereInput
  }

  export type AvailabilityWindowServiceWindowIdMentorServiceIdCompoundUniqueInput = {
    windowId: string
    mentorServiceId: string
  }

  export type AvailabilityWindowServiceCountOrderByAggregateInput = {
    id?: SortOrder
    windowId?: SortOrder
    mentorServiceId?: SortOrder
    createdAt?: SortOrder
  }

  export type AvailabilityWindowServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    windowId?: SortOrder
    mentorServiceId?: SortOrder
    createdAt?: SortOrder
  }

  export type AvailabilityWindowServiceMinOrderByAggregateInput = {
    id?: SortOrder
    windowId?: SortOrder
    mentorServiceId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type PaymentNullableRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type ReviewNullableRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type SessionFeedbackNullableRelationFilter = {
    is?: SessionFeedbackWhereInput | null
    isNot?: SessionFeedbackWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    mentorProfileId?: SortOrder
    mentorServiceId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    paymentId?: SortOrder
    meetingLink?: SortOrder
    purposeOfCall?: SortOrder
    notes?: SortOrder
    cancelledReason?: SortOrder
    rescheduledFromId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    mentorProfileId?: SortOrder
    mentorServiceId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    paymentId?: SortOrder
    meetingLink?: SortOrder
    purposeOfCall?: SortOrder
    notes?: SortOrder
    cancelledReason?: SortOrder
    rescheduledFromId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    mentorProfileId?: SortOrder
    mentorServiceId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    paymentId?: SortOrder
    meetingLink?: SortOrder
    purposeOfCall?: SortOrder
    notes?: SortOrder
    cancelledReason?: SortOrder
    rescheduledFromId?: SortOrder
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

  export type InvoiceNullableRelationFilter = {
    is?: InvoiceWhereInput | null
    isNot?: InvoiceWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    razorpaySignature?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrder
    refundedAmount?: SortOrder
    refundReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    refundedAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    razorpaySignature?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrder
    refundedAmount?: SortOrder
    refundReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    razorpayOrderId?: SortOrder
    razorpayPaymentId?: SortOrder
    razorpaySignature?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrder
    refundedAmount?: SortOrder
    refundReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    refundedAmount?: SortOrder
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

  export type PaymentRelationFilter = {
    is?: PaymentWhereInput
    isNot?: PaymentWhereInput
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    invoiceNumber?: SortOrder
    invoiceUrl?: SortOrder
    generatedAt?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    invoiceNumber?: SortOrder
    invoiceUrl?: SortOrder
    generatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    invoiceNumber?: SortOrder
    invoiceUrl?: SortOrder
    generatedAt?: SortOrder
  }

  export type SessionFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    strengths?: SortOrder
    weaknesses?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    strengths?: SortOrder
    weaknesses?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    strengths?: SortOrder
    weaknesses?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    authorId?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    authorId?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    mentorProfileId?: SortOrder
    authorId?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type PayoutCountOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PayoutAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PayoutMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PayoutMinOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    amount?: SortOrder
    transactionId?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PayoutSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type MenteeProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutUserInput
    connect?: MenteeProfileWhereUniqueInput
  }

  export type MentorProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutMenteeInput = {
    create?: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput> | BookingCreateWithoutMenteeInput[] | BookingUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMenteeInput | BookingCreateOrConnectWithoutMenteeInput[]
    createMany?: BookingCreateManyMenteeInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type MenteeProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MenteeProfileCreateOrConnectWithoutUserInput
    connect?: MenteeProfileWhereUniqueInput
  }

  export type MentorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type BookingUncheckedCreateNestedManyWithoutMenteeInput = {
    create?: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput> | BookingCreateWithoutMenteeInput[] | BookingUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMenteeInput | BookingCreateOrConnectWithoutMenteeInput[]
    createMany?: BookingCreateManyMenteeInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type MentorProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    upsert?: MentorProfileUpsertWithoutUserInput
    disconnect?: MentorProfileWhereInput | boolean
    delete?: MentorProfileWhereInput | boolean
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutUserInput, MentorProfileUpdateWithoutUserInput>, MentorProfileUncheckedUpdateWithoutUserInput>
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

  export type ReviewUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
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

  export type MentorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutUserInput
    upsert?: MentorProfileUpsertWithoutUserInput
    disconnect?: MentorProfileWhereInput | boolean
    delete?: MentorProfileWhereInput | boolean
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutUserInput, MentorProfileUpdateWithoutUserInput>, MentorProfileUncheckedUpdateWithoutUserInput>
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

  export type ReviewUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type MenteeProfileCreateskillsetsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMenteeProfileInput = {
    create?: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MenteeProfileUpdateskillsetsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutMenteeProfileNestedInput = {
    create?: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeProfileInput
    upsert?: UserUpsertWithoutMenteeProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMenteeProfileInput, UserUpdateWithoutMenteeProfileInput>, UserUncheckedUpdateWithoutMenteeProfileInput>
  }

  export type MentorProfileCreateexpertiseTagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMentorProfileInput = {
    create?: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorProfileInput
    connect?: UserWhereUniqueInput
  }

  export type MentorServiceCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput> | MentorServiceCreateWithoutMentorProfileInput[] | MentorServiceUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutMentorProfileInput | MentorServiceCreateOrConnectWithoutMentorProfileInput[]
    createMany?: MentorServiceCreateManyMentorProfileInputEnvelope
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
  }

  export type AvailabilityWindowCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<AvailabilityWindowCreateWithoutMentorProfileInput, AvailabilityWindowUncheckedCreateWithoutMentorProfileInput> | AvailabilityWindowCreateWithoutMentorProfileInput[] | AvailabilityWindowUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: AvailabilityWindowCreateOrConnectWithoutMentorProfileInput | AvailabilityWindowCreateOrConnectWithoutMentorProfileInput[]
    createMany?: AvailabilityWindowCreateManyMentorProfileInputEnvelope
    connect?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<BookingCreateWithoutMentorProfileInput, BookingUncheckedCreateWithoutMentorProfileInput> | BookingCreateWithoutMentorProfileInput[] | BookingUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorProfileInput | BookingCreateOrConnectWithoutMentorProfileInput[]
    createMany?: BookingCreateManyMentorProfileInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<ReviewCreateWithoutMentorProfileInput, ReviewUncheckedCreateWithoutMentorProfileInput> | ReviewCreateWithoutMentorProfileInput[] | ReviewUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMentorProfileInput | ReviewCreateOrConnectWithoutMentorProfileInput[]
    createMany?: ReviewCreateManyMentorProfileInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SessionFeedbackCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<SessionFeedbackCreateWithoutMentorProfileInput, SessionFeedbackUncheckedCreateWithoutMentorProfileInput> | SessionFeedbackCreateWithoutMentorProfileInput[] | SessionFeedbackUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutMentorProfileInput | SessionFeedbackCreateOrConnectWithoutMentorProfileInput[]
    createMany?: SessionFeedbackCreateManyMentorProfileInputEnvelope
    connect?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
  }

  export type PayoutCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<PayoutCreateWithoutMentorProfileInput, PayoutUncheckedCreateWithoutMentorProfileInput> | PayoutCreateWithoutMentorProfileInput[] | PayoutUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutMentorProfileInput | PayoutCreateOrConnectWithoutMentorProfileInput[]
    createMany?: PayoutCreateManyMentorProfileInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput> | MentorServiceCreateWithoutMentorProfileInput[] | MentorServiceUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutMentorProfileInput | MentorServiceCreateOrConnectWithoutMentorProfileInput[]
    createMany?: MentorServiceCreateManyMentorProfileInputEnvelope
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
  }

  export type AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<AvailabilityWindowCreateWithoutMentorProfileInput, AvailabilityWindowUncheckedCreateWithoutMentorProfileInput> | AvailabilityWindowCreateWithoutMentorProfileInput[] | AvailabilityWindowUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: AvailabilityWindowCreateOrConnectWithoutMentorProfileInput | AvailabilityWindowCreateOrConnectWithoutMentorProfileInput[]
    createMany?: AvailabilityWindowCreateManyMentorProfileInputEnvelope
    connect?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<BookingCreateWithoutMentorProfileInput, BookingUncheckedCreateWithoutMentorProfileInput> | BookingCreateWithoutMentorProfileInput[] | BookingUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorProfileInput | BookingCreateOrConnectWithoutMentorProfileInput[]
    createMany?: BookingCreateManyMentorProfileInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<ReviewCreateWithoutMentorProfileInput, ReviewUncheckedCreateWithoutMentorProfileInput> | ReviewCreateWithoutMentorProfileInput[] | ReviewUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMentorProfileInput | ReviewCreateOrConnectWithoutMentorProfileInput[]
    createMany?: ReviewCreateManyMentorProfileInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<SessionFeedbackCreateWithoutMentorProfileInput, SessionFeedbackUncheckedCreateWithoutMentorProfileInput> | SessionFeedbackCreateWithoutMentorProfileInput[] | SessionFeedbackUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutMentorProfileInput | SessionFeedbackCreateOrConnectWithoutMentorProfileInput[]
    createMany?: SessionFeedbackCreateManyMentorProfileInputEnvelope
    connect?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
  }

  export type PayoutUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<PayoutCreateWithoutMentorProfileInput, PayoutUncheckedCreateWithoutMentorProfileInput> | PayoutCreateWithoutMentorProfileInput[] | PayoutUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutMentorProfileInput | PayoutCreateOrConnectWithoutMentorProfileInput[]
    createMany?: PayoutCreateManyMentorProfileInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type MentorProfileUpdateexpertiseTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumMentorApprovalStatusFieldUpdateOperationsInput = {
    set?: $Enums.MentorApprovalStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMentorProfileNestedInput = {
    create?: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorProfileInput
    upsert?: UserUpsertWithoutMentorProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMentorProfileInput, UserUpdateWithoutMentorProfileInput>, UserUncheckedUpdateWithoutMentorProfileInput>
  }

  export type MentorServiceUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput> | MentorServiceCreateWithoutMentorProfileInput[] | MentorServiceUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutMentorProfileInput | MentorServiceCreateOrConnectWithoutMentorProfileInput[]
    upsert?: MentorServiceUpsertWithWhereUniqueWithoutMentorProfileInput | MentorServiceUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: MentorServiceCreateManyMentorProfileInputEnvelope
    set?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    disconnect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    delete?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    update?: MentorServiceUpdateWithWhereUniqueWithoutMentorProfileInput | MentorServiceUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: MentorServiceUpdateManyWithWhereWithoutMentorProfileInput | MentorServiceUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: MentorServiceScalarWhereInput | MentorServiceScalarWhereInput[]
  }

  export type AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<AvailabilityWindowCreateWithoutMentorProfileInput, AvailabilityWindowUncheckedCreateWithoutMentorProfileInput> | AvailabilityWindowCreateWithoutMentorProfileInput[] | AvailabilityWindowUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: AvailabilityWindowCreateOrConnectWithoutMentorProfileInput | AvailabilityWindowCreateOrConnectWithoutMentorProfileInput[]
    upsert?: AvailabilityWindowUpsertWithWhereUniqueWithoutMentorProfileInput | AvailabilityWindowUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: AvailabilityWindowCreateManyMentorProfileInputEnvelope
    set?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    disconnect?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    delete?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    connect?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    update?: AvailabilityWindowUpdateWithWhereUniqueWithoutMentorProfileInput | AvailabilityWindowUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: AvailabilityWindowUpdateManyWithWhereWithoutMentorProfileInput | AvailabilityWindowUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: AvailabilityWindowScalarWhereInput | AvailabilityWindowScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<BookingCreateWithoutMentorProfileInput, BookingUncheckedCreateWithoutMentorProfileInput> | BookingCreateWithoutMentorProfileInput[] | BookingUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorProfileInput | BookingCreateOrConnectWithoutMentorProfileInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMentorProfileInput | BookingUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: BookingCreateManyMentorProfileInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMentorProfileInput | BookingUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMentorProfileInput | BookingUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<ReviewCreateWithoutMentorProfileInput, ReviewUncheckedCreateWithoutMentorProfileInput> | ReviewCreateWithoutMentorProfileInput[] | ReviewUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMentorProfileInput | ReviewCreateOrConnectWithoutMentorProfileInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMentorProfileInput | ReviewUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: ReviewCreateManyMentorProfileInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMentorProfileInput | ReviewUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMentorProfileInput | ReviewUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SessionFeedbackUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<SessionFeedbackCreateWithoutMentorProfileInput, SessionFeedbackUncheckedCreateWithoutMentorProfileInput> | SessionFeedbackCreateWithoutMentorProfileInput[] | SessionFeedbackUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutMentorProfileInput | SessionFeedbackCreateOrConnectWithoutMentorProfileInput[]
    upsert?: SessionFeedbackUpsertWithWhereUniqueWithoutMentorProfileInput | SessionFeedbackUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: SessionFeedbackCreateManyMentorProfileInputEnvelope
    set?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    disconnect?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    delete?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    connect?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    update?: SessionFeedbackUpdateWithWhereUniqueWithoutMentorProfileInput | SessionFeedbackUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: SessionFeedbackUpdateManyWithWhereWithoutMentorProfileInput | SessionFeedbackUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: SessionFeedbackScalarWhereInput | SessionFeedbackScalarWhereInput[]
  }

  export type PayoutUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<PayoutCreateWithoutMentorProfileInput, PayoutUncheckedCreateWithoutMentorProfileInput> | PayoutCreateWithoutMentorProfileInput[] | PayoutUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutMentorProfileInput | PayoutCreateOrConnectWithoutMentorProfileInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutMentorProfileInput | PayoutUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: PayoutCreateManyMentorProfileInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutMentorProfileInput | PayoutUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutMentorProfileInput | PayoutUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput> | MentorServiceCreateWithoutMentorProfileInput[] | MentorServiceUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutMentorProfileInput | MentorServiceCreateOrConnectWithoutMentorProfileInput[]
    upsert?: MentorServiceUpsertWithWhereUniqueWithoutMentorProfileInput | MentorServiceUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: MentorServiceCreateManyMentorProfileInputEnvelope
    set?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    disconnect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    delete?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    update?: MentorServiceUpdateWithWhereUniqueWithoutMentorProfileInput | MentorServiceUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: MentorServiceUpdateManyWithWhereWithoutMentorProfileInput | MentorServiceUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: MentorServiceScalarWhereInput | MentorServiceScalarWhereInput[]
  }

  export type AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<AvailabilityWindowCreateWithoutMentorProfileInput, AvailabilityWindowUncheckedCreateWithoutMentorProfileInput> | AvailabilityWindowCreateWithoutMentorProfileInput[] | AvailabilityWindowUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: AvailabilityWindowCreateOrConnectWithoutMentorProfileInput | AvailabilityWindowCreateOrConnectWithoutMentorProfileInput[]
    upsert?: AvailabilityWindowUpsertWithWhereUniqueWithoutMentorProfileInput | AvailabilityWindowUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: AvailabilityWindowCreateManyMentorProfileInputEnvelope
    set?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    disconnect?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    delete?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    connect?: AvailabilityWindowWhereUniqueInput | AvailabilityWindowWhereUniqueInput[]
    update?: AvailabilityWindowUpdateWithWhereUniqueWithoutMentorProfileInput | AvailabilityWindowUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: AvailabilityWindowUpdateManyWithWhereWithoutMentorProfileInput | AvailabilityWindowUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: AvailabilityWindowScalarWhereInput | AvailabilityWindowScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<BookingCreateWithoutMentorProfileInput, BookingUncheckedCreateWithoutMentorProfileInput> | BookingCreateWithoutMentorProfileInput[] | BookingUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorProfileInput | BookingCreateOrConnectWithoutMentorProfileInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMentorProfileInput | BookingUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: BookingCreateManyMentorProfileInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMentorProfileInput | BookingUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMentorProfileInput | BookingUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<ReviewCreateWithoutMentorProfileInput, ReviewUncheckedCreateWithoutMentorProfileInput> | ReviewCreateWithoutMentorProfileInput[] | ReviewUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMentorProfileInput | ReviewCreateOrConnectWithoutMentorProfileInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMentorProfileInput | ReviewUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: ReviewCreateManyMentorProfileInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMentorProfileInput | ReviewUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMentorProfileInput | ReviewUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<SessionFeedbackCreateWithoutMentorProfileInput, SessionFeedbackUncheckedCreateWithoutMentorProfileInput> | SessionFeedbackCreateWithoutMentorProfileInput[] | SessionFeedbackUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutMentorProfileInput | SessionFeedbackCreateOrConnectWithoutMentorProfileInput[]
    upsert?: SessionFeedbackUpsertWithWhereUniqueWithoutMentorProfileInput | SessionFeedbackUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: SessionFeedbackCreateManyMentorProfileInputEnvelope
    set?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    disconnect?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    delete?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    connect?: SessionFeedbackWhereUniqueInput | SessionFeedbackWhereUniqueInput[]
    update?: SessionFeedbackUpdateWithWhereUniqueWithoutMentorProfileInput | SessionFeedbackUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: SessionFeedbackUpdateManyWithWhereWithoutMentorProfileInput | SessionFeedbackUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: SessionFeedbackScalarWhereInput | SessionFeedbackScalarWhereInput[]
  }

  export type PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<PayoutCreateWithoutMentorProfileInput, PayoutUncheckedCreateWithoutMentorProfileInput> | PayoutCreateWithoutMentorProfileInput[] | PayoutUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutMentorProfileInput | PayoutCreateOrConnectWithoutMentorProfileInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutMentorProfileInput | PayoutUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: PayoutCreateManyMentorProfileInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutMentorProfileInput | PayoutUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutMentorProfileInput | PayoutUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type MentorServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<MentorServiceCreateWithoutServiceInput, MentorServiceUncheckedCreateWithoutServiceInput> | MentorServiceCreateWithoutServiceInput[] | MentorServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutServiceInput | MentorServiceCreateOrConnectWithoutServiceInput[]
    createMany?: MentorServiceCreateManyServiceInputEnvelope
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
  }

  export type MentorServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<MentorServiceCreateWithoutServiceInput, MentorServiceUncheckedCreateWithoutServiceInput> | MentorServiceCreateWithoutServiceInput[] | MentorServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutServiceInput | MentorServiceCreateOrConnectWithoutServiceInput[]
    createMany?: MentorServiceCreateManyServiceInputEnvelope
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
  }

  export type MentorServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<MentorServiceCreateWithoutServiceInput, MentorServiceUncheckedCreateWithoutServiceInput> | MentorServiceCreateWithoutServiceInput[] | MentorServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutServiceInput | MentorServiceCreateOrConnectWithoutServiceInput[]
    upsert?: MentorServiceUpsertWithWhereUniqueWithoutServiceInput | MentorServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: MentorServiceCreateManyServiceInputEnvelope
    set?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    disconnect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    delete?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    update?: MentorServiceUpdateWithWhereUniqueWithoutServiceInput | MentorServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: MentorServiceUpdateManyWithWhereWithoutServiceInput | MentorServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: MentorServiceScalarWhereInput | MentorServiceScalarWhereInput[]
  }

  export type MentorServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<MentorServiceCreateWithoutServiceInput, MentorServiceUncheckedCreateWithoutServiceInput> | MentorServiceCreateWithoutServiceInput[] | MentorServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutServiceInput | MentorServiceCreateOrConnectWithoutServiceInput[]
    upsert?: MentorServiceUpsertWithWhereUniqueWithoutServiceInput | MentorServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: MentorServiceCreateManyServiceInputEnvelope
    set?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    disconnect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    delete?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
    update?: MentorServiceUpdateWithWhereUniqueWithoutServiceInput | MentorServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: MentorServiceUpdateManyWithWhereWithoutServiceInput | MentorServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: MentorServiceScalarWhereInput | MentorServiceScalarWhereInput[]
  }

  export type MentorProfileCreateNestedOneWithoutMentorServicesInput = {
    create?: XOR<MentorProfileCreateWithoutMentorServicesInput, MentorProfileUncheckedCreateWithoutMentorServicesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutMentorServicesInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutMentorServicesInput = {
    create?: XOR<ServiceCreateWithoutMentorServicesInput, ServiceUncheckedCreateWithoutMentorServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutMentorServicesInput
    connect?: ServiceWhereUniqueInput
  }

  export type AvailabilityWindowServiceCreateNestedManyWithoutMentorServiceInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput> | AvailabilityWindowServiceCreateWithoutMentorServiceInput[] | AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput | AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput[]
    createMany?: AvailabilityWindowServiceCreateManyMentorServiceInputEnvelope
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutMentorServiceInput = {
    create?: XOR<BookingCreateWithoutMentorServiceInput, BookingUncheckedCreateWithoutMentorServiceInput> | BookingCreateWithoutMentorServiceInput[] | BookingUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorServiceInput | BookingCreateOrConnectWithoutMentorServiceInput[]
    createMany?: BookingCreateManyMentorServiceInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type AvailabilityWindowServiceUncheckedCreateNestedManyWithoutMentorServiceInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput> | AvailabilityWindowServiceCreateWithoutMentorServiceInput[] | AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput | AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput[]
    createMany?: AvailabilityWindowServiceCreateManyMentorServiceInputEnvelope
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutMentorServiceInput = {
    create?: XOR<BookingCreateWithoutMentorServiceInput, BookingUncheckedCreateWithoutMentorServiceInput> | BookingCreateWithoutMentorServiceInput[] | BookingUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorServiceInput | BookingCreateOrConnectWithoutMentorServiceInput[]
    createMany?: BookingCreateManyMentorServiceInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type MentorProfileUpdateOneRequiredWithoutMentorServicesNestedInput = {
    create?: XOR<MentorProfileCreateWithoutMentorServicesInput, MentorProfileUncheckedCreateWithoutMentorServicesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutMentorServicesInput
    upsert?: MentorProfileUpsertWithoutMentorServicesInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutMentorServicesInput, MentorProfileUpdateWithoutMentorServicesInput>, MentorProfileUncheckedUpdateWithoutMentorServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutMentorServicesNestedInput = {
    create?: XOR<ServiceCreateWithoutMentorServicesInput, ServiceUncheckedCreateWithoutMentorServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutMentorServicesInput
    upsert?: ServiceUpsertWithoutMentorServicesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutMentorServicesInput, ServiceUpdateWithoutMentorServicesInput>, ServiceUncheckedUpdateWithoutMentorServicesInput>
  }

  export type AvailabilityWindowServiceUpdateManyWithoutMentorServiceNestedInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput> | AvailabilityWindowServiceCreateWithoutMentorServiceInput[] | AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput | AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput[]
    upsert?: AvailabilityWindowServiceUpsertWithWhereUniqueWithoutMentorServiceInput | AvailabilityWindowServiceUpsertWithWhereUniqueWithoutMentorServiceInput[]
    createMany?: AvailabilityWindowServiceCreateManyMentorServiceInputEnvelope
    set?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    disconnect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    delete?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    update?: AvailabilityWindowServiceUpdateWithWhereUniqueWithoutMentorServiceInput | AvailabilityWindowServiceUpdateWithWhereUniqueWithoutMentorServiceInput[]
    updateMany?: AvailabilityWindowServiceUpdateManyWithWhereWithoutMentorServiceInput | AvailabilityWindowServiceUpdateManyWithWhereWithoutMentorServiceInput[]
    deleteMany?: AvailabilityWindowServiceScalarWhereInput | AvailabilityWindowServiceScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutMentorServiceNestedInput = {
    create?: XOR<BookingCreateWithoutMentorServiceInput, BookingUncheckedCreateWithoutMentorServiceInput> | BookingCreateWithoutMentorServiceInput[] | BookingUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorServiceInput | BookingCreateOrConnectWithoutMentorServiceInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMentorServiceInput | BookingUpsertWithWhereUniqueWithoutMentorServiceInput[]
    createMany?: BookingCreateManyMentorServiceInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMentorServiceInput | BookingUpdateWithWhereUniqueWithoutMentorServiceInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMentorServiceInput | BookingUpdateManyWithWhereWithoutMentorServiceInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceNestedInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput> | AvailabilityWindowServiceCreateWithoutMentorServiceInput[] | AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput | AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput[]
    upsert?: AvailabilityWindowServiceUpsertWithWhereUniqueWithoutMentorServiceInput | AvailabilityWindowServiceUpsertWithWhereUniqueWithoutMentorServiceInput[]
    createMany?: AvailabilityWindowServiceCreateManyMentorServiceInputEnvelope
    set?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    disconnect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    delete?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    update?: AvailabilityWindowServiceUpdateWithWhereUniqueWithoutMentorServiceInput | AvailabilityWindowServiceUpdateWithWhereUniqueWithoutMentorServiceInput[]
    updateMany?: AvailabilityWindowServiceUpdateManyWithWhereWithoutMentorServiceInput | AvailabilityWindowServiceUpdateManyWithWhereWithoutMentorServiceInput[]
    deleteMany?: AvailabilityWindowServiceScalarWhereInput | AvailabilityWindowServiceScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutMentorServiceNestedInput = {
    create?: XOR<BookingCreateWithoutMentorServiceInput, BookingUncheckedCreateWithoutMentorServiceInput> | BookingCreateWithoutMentorServiceInput[] | BookingUncheckedCreateWithoutMentorServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMentorServiceInput | BookingCreateOrConnectWithoutMentorServiceInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMentorServiceInput | BookingUpsertWithWhereUniqueWithoutMentorServiceInput[]
    createMany?: BookingCreateManyMentorServiceInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMentorServiceInput | BookingUpdateWithWhereUniqueWithoutMentorServiceInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMentorServiceInput | BookingUpdateManyWithWhereWithoutMentorServiceInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type MentorProfileCreateNestedOneWithoutAvailabilityWindowsInput = {
    create?: XOR<MentorProfileCreateWithoutAvailabilityWindowsInput, MentorProfileUncheckedCreateWithoutAvailabilityWindowsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutAvailabilityWindowsInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type AvailabilityWindowServiceCreateNestedManyWithoutWindowInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutWindowInput, AvailabilityWindowServiceUncheckedCreateWithoutWindowInput> | AvailabilityWindowServiceCreateWithoutWindowInput[] | AvailabilityWindowServiceUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutWindowInput | AvailabilityWindowServiceCreateOrConnectWithoutWindowInput[]
    createMany?: AvailabilityWindowServiceCreateManyWindowInputEnvelope
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
  }

  export type AvailabilityWindowServiceUncheckedCreateNestedManyWithoutWindowInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutWindowInput, AvailabilityWindowServiceUncheckedCreateWithoutWindowInput> | AvailabilityWindowServiceCreateWithoutWindowInput[] | AvailabilityWindowServiceUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutWindowInput | AvailabilityWindowServiceCreateOrConnectWithoutWindowInput[]
    createMany?: AvailabilityWindowServiceCreateManyWindowInputEnvelope
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
  }

  export type NullableEnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek | null
  }

  export type MentorProfileUpdateOneRequiredWithoutAvailabilityWindowsNestedInput = {
    create?: XOR<MentorProfileCreateWithoutAvailabilityWindowsInput, MentorProfileUncheckedCreateWithoutAvailabilityWindowsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutAvailabilityWindowsInput
    upsert?: MentorProfileUpsertWithoutAvailabilityWindowsInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutAvailabilityWindowsInput, MentorProfileUpdateWithoutAvailabilityWindowsInput>, MentorProfileUncheckedUpdateWithoutAvailabilityWindowsInput>
  }

  export type AvailabilityWindowServiceUpdateManyWithoutWindowNestedInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutWindowInput, AvailabilityWindowServiceUncheckedCreateWithoutWindowInput> | AvailabilityWindowServiceCreateWithoutWindowInput[] | AvailabilityWindowServiceUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutWindowInput | AvailabilityWindowServiceCreateOrConnectWithoutWindowInput[]
    upsert?: AvailabilityWindowServiceUpsertWithWhereUniqueWithoutWindowInput | AvailabilityWindowServiceUpsertWithWhereUniqueWithoutWindowInput[]
    createMany?: AvailabilityWindowServiceCreateManyWindowInputEnvelope
    set?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    disconnect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    delete?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    update?: AvailabilityWindowServiceUpdateWithWhereUniqueWithoutWindowInput | AvailabilityWindowServiceUpdateWithWhereUniqueWithoutWindowInput[]
    updateMany?: AvailabilityWindowServiceUpdateManyWithWhereWithoutWindowInput | AvailabilityWindowServiceUpdateManyWithWhereWithoutWindowInput[]
    deleteMany?: AvailabilityWindowServiceScalarWhereInput | AvailabilityWindowServiceScalarWhereInput[]
  }

  export type AvailabilityWindowServiceUncheckedUpdateManyWithoutWindowNestedInput = {
    create?: XOR<AvailabilityWindowServiceCreateWithoutWindowInput, AvailabilityWindowServiceUncheckedCreateWithoutWindowInput> | AvailabilityWindowServiceCreateWithoutWindowInput[] | AvailabilityWindowServiceUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: AvailabilityWindowServiceCreateOrConnectWithoutWindowInput | AvailabilityWindowServiceCreateOrConnectWithoutWindowInput[]
    upsert?: AvailabilityWindowServiceUpsertWithWhereUniqueWithoutWindowInput | AvailabilityWindowServiceUpsertWithWhereUniqueWithoutWindowInput[]
    createMany?: AvailabilityWindowServiceCreateManyWindowInputEnvelope
    set?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    disconnect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    delete?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    connect?: AvailabilityWindowServiceWhereUniqueInput | AvailabilityWindowServiceWhereUniqueInput[]
    update?: AvailabilityWindowServiceUpdateWithWhereUniqueWithoutWindowInput | AvailabilityWindowServiceUpdateWithWhereUniqueWithoutWindowInput[]
    updateMany?: AvailabilityWindowServiceUpdateManyWithWhereWithoutWindowInput | AvailabilityWindowServiceUpdateManyWithWhereWithoutWindowInput[]
    deleteMany?: AvailabilityWindowServiceScalarWhereInput | AvailabilityWindowServiceScalarWhereInput[]
  }

  export type AvailabilityWindowCreateNestedOneWithoutWindowServicesInput = {
    create?: XOR<AvailabilityWindowCreateWithoutWindowServicesInput, AvailabilityWindowUncheckedCreateWithoutWindowServicesInput>
    connectOrCreate?: AvailabilityWindowCreateOrConnectWithoutWindowServicesInput
    connect?: AvailabilityWindowWhereUniqueInput
  }

  export type MentorServiceCreateNestedOneWithoutWindowServicesInput = {
    create?: XOR<MentorServiceCreateWithoutWindowServicesInput, MentorServiceUncheckedCreateWithoutWindowServicesInput>
    connectOrCreate?: MentorServiceCreateOrConnectWithoutWindowServicesInput
    connect?: MentorServiceWhereUniqueInput
  }

  export type AvailabilityWindowUpdateOneRequiredWithoutWindowServicesNestedInput = {
    create?: XOR<AvailabilityWindowCreateWithoutWindowServicesInput, AvailabilityWindowUncheckedCreateWithoutWindowServicesInput>
    connectOrCreate?: AvailabilityWindowCreateOrConnectWithoutWindowServicesInput
    upsert?: AvailabilityWindowUpsertWithoutWindowServicesInput
    connect?: AvailabilityWindowWhereUniqueInput
    update?: XOR<XOR<AvailabilityWindowUpdateToOneWithWhereWithoutWindowServicesInput, AvailabilityWindowUpdateWithoutWindowServicesInput>, AvailabilityWindowUncheckedUpdateWithoutWindowServicesInput>
  }

  export type MentorServiceUpdateOneRequiredWithoutWindowServicesNestedInput = {
    create?: XOR<MentorServiceCreateWithoutWindowServicesInput, MentorServiceUncheckedCreateWithoutWindowServicesInput>
    connectOrCreate?: MentorServiceCreateOrConnectWithoutWindowServicesInput
    upsert?: MentorServiceUpsertWithoutWindowServicesInput
    connect?: MentorServiceWhereUniqueInput
    update?: XOR<XOR<MentorServiceUpdateToOneWithWhereWithoutWindowServicesInput, MentorServiceUpdateWithoutWindowServicesInput>, MentorServiceUncheckedUpdateWithoutWindowServicesInput>
  }

  export type UserCreateNestedOneWithoutMenteeBookingsInput = {
    create?: XOR<UserCreateWithoutMenteeBookingsInput, UserUncheckedCreateWithoutMenteeBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type MentorProfileCreateNestedOneWithoutMentorBookingsInput = {
    create?: XOR<MentorProfileCreateWithoutMentorBookingsInput, MentorProfileUncheckedCreateWithoutMentorBookingsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutMentorBookingsInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MentorServiceCreateNestedOneWithoutBookingsInput = {
    create?: XOR<MentorServiceCreateWithoutBookingsInput, MentorServiceUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: MentorServiceCreateOrConnectWithoutBookingsInput
    connect?: MentorServiceWhereUniqueInput
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

  export type SessionFeedbackCreateNestedOneWithoutBookingInput = {
    create?: XOR<SessionFeedbackCreateWithoutBookingInput, SessionFeedbackUncheckedCreateWithoutBookingInput>
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutBookingInput
    connect?: SessionFeedbackWhereUniqueInput
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

  export type SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<SessionFeedbackCreateWithoutBookingInput, SessionFeedbackUncheckedCreateWithoutBookingInput>
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutBookingInput
    connect?: SessionFeedbackWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type UserUpdateOneRequiredWithoutMenteeBookingsNestedInput = {
    create?: XOR<UserCreateWithoutMenteeBookingsInput, UserUncheckedCreateWithoutMenteeBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeBookingsInput
    upsert?: UserUpsertWithoutMenteeBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMenteeBookingsInput, UserUpdateWithoutMenteeBookingsInput>, UserUncheckedUpdateWithoutMenteeBookingsInput>
  }

  export type MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput = {
    create?: XOR<MentorProfileCreateWithoutMentorBookingsInput, MentorProfileUncheckedCreateWithoutMentorBookingsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutMentorBookingsInput
    upsert?: MentorProfileUpsertWithoutMentorBookingsInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutMentorBookingsInput, MentorProfileUpdateWithoutMentorBookingsInput>, MentorProfileUncheckedUpdateWithoutMentorBookingsInput>
  }

  export type MentorServiceUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<MentorServiceCreateWithoutBookingsInput, MentorServiceUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: MentorServiceCreateOrConnectWithoutBookingsInput
    upsert?: MentorServiceUpsertWithoutBookingsInput
    connect?: MentorServiceWhereUniqueInput
    update?: XOR<XOR<MentorServiceUpdateToOneWithWhereWithoutBookingsInput, MentorServiceUpdateWithoutBookingsInput>, MentorServiceUncheckedUpdateWithoutBookingsInput>
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

  export type SessionFeedbackUpdateOneWithoutBookingNestedInput = {
    create?: XOR<SessionFeedbackCreateWithoutBookingInput, SessionFeedbackUncheckedCreateWithoutBookingInput>
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutBookingInput
    upsert?: SessionFeedbackUpsertWithoutBookingInput
    disconnect?: SessionFeedbackWhereInput | boolean
    delete?: SessionFeedbackWhereInput | boolean
    connect?: SessionFeedbackWhereUniqueInput
    update?: XOR<XOR<SessionFeedbackUpdateToOneWithWhereWithoutBookingInput, SessionFeedbackUpdateWithoutBookingInput>, SessionFeedbackUncheckedUpdateWithoutBookingInput>
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

  export type SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<SessionFeedbackCreateWithoutBookingInput, SessionFeedbackUncheckedCreateWithoutBookingInput>
    connectOrCreate?: SessionFeedbackCreateOrConnectWithoutBookingInput
    upsert?: SessionFeedbackUpsertWithoutBookingInput
    disconnect?: SessionFeedbackWhereInput | boolean
    delete?: SessionFeedbackWhereInput | boolean
    connect?: SessionFeedbackWhereUniqueInput
    update?: XOR<XOR<SessionFeedbackUpdateToOneWithWhereWithoutBookingInput, SessionFeedbackUpdateWithoutBookingInput>, SessionFeedbackUncheckedUpdateWithoutBookingInput>
  }

  export type BookingCreateNestedOneWithoutPaymentInput = {
    create?: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentInput
    connect?: BookingWhereUniqueInput
  }

  export type InvoiceCreateNestedOneWithoutPaymentInput = {
    create?: XOR<InvoiceCreateWithoutPaymentInput, InvoiceUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPaymentInput
    connect?: InvoiceWhereUniqueInput
  }

  export type InvoiceUncheckedCreateNestedOneWithoutPaymentInput = {
    create?: XOR<InvoiceCreateWithoutPaymentInput, InvoiceUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPaymentInput
    connect?: InvoiceWhereUniqueInput
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

  export type InvoiceUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<InvoiceCreateWithoutPaymentInput, InvoiceUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPaymentInput
    upsert?: InvoiceUpsertWithoutPaymentInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutPaymentInput, InvoiceUpdateWithoutPaymentInput>, InvoiceUncheckedUpdateWithoutPaymentInput>
  }

  export type InvoiceUncheckedUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<InvoiceCreateWithoutPaymentInput, InvoiceUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPaymentInput
    upsert?: InvoiceUpsertWithoutPaymentInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutPaymentInput, InvoiceUpdateWithoutPaymentInput>, InvoiceUncheckedUpdateWithoutPaymentInput>
  }

  export type PaymentCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<PaymentCreateWithoutInvoiceInput, PaymentUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutInvoiceInput
    connect?: PaymentWhereUniqueInput
  }

  export type PaymentUpdateOneRequiredWithoutInvoiceNestedInput = {
    create?: XOR<PaymentCreateWithoutInvoiceInput, PaymentUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutInvoiceInput
    upsert?: PaymentUpsertWithoutInvoiceInput
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutInvoiceInput, PaymentUpdateWithoutInvoiceInput>, PaymentUncheckedUpdateWithoutInvoiceInput>
  }

  export type BookingCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: BookingCreateOrConnectWithoutFeedbackInput
    connect?: BookingWhereUniqueInput
  }

  export type MentorProfileCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<MentorProfileCreateWithoutFeedbacksInput, MentorProfileUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutFeedbacksInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: BookingCreateOrConnectWithoutFeedbackInput
    upsert?: BookingUpsertWithoutFeedbackInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutFeedbackInput, BookingUpdateWithoutFeedbackInput>, BookingUncheckedUpdateWithoutFeedbackInput>
  }

  export type MentorProfileUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<MentorProfileCreateWithoutFeedbacksInput, MentorProfileUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutFeedbacksInput
    upsert?: MentorProfileUpsertWithoutFeedbacksInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutFeedbacksInput, MentorProfileUpdateWithoutFeedbacksInput>, MentorProfileUncheckedUpdateWithoutFeedbacksInput>
  }

  export type BookingCreateNestedOneWithoutReviewInput = {
    create?: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookingCreateOrConnectWithoutReviewInput
    connect?: BookingWhereUniqueInput
  }

  export type MentorProfileCreateNestedOneWithoutReviewsInput = {
    create?: XOR<MentorProfileCreateWithoutReviewsInput, MentorProfileUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutReviewsInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsGivenInput = {
    create?: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput
    connect?: UserWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookingCreateOrConnectWithoutReviewInput
    upsert?: BookingUpsertWithoutReviewInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutReviewInput, BookingUpdateWithoutReviewInput>, BookingUncheckedUpdateWithoutReviewInput>
  }

  export type MentorProfileUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<MentorProfileCreateWithoutReviewsInput, MentorProfileUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutReviewsInput
    upsert?: MentorProfileUpsertWithoutReviewsInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutReviewsInput, MentorProfileUpdateWithoutReviewsInput>, MentorProfileUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsGivenNestedInput = {
    create?: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput
    upsert?: UserUpsertWithoutReviewsGivenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsGivenInput, UserUpdateWithoutReviewsGivenInput>, UserUncheckedUpdateWithoutReviewsGivenInput>
  }

  export type MentorProfileCreateNestedOneWithoutPayoutsInput = {
    create?: XOR<MentorProfileCreateWithoutPayoutsInput, MentorProfileUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutPayoutsInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MentorProfileUpdateOneRequiredWithoutPayoutsNestedInput = {
    create?: XOR<MentorProfileCreateWithoutPayoutsInput, MentorProfileUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutPayoutsInput
    upsert?: MentorProfileUpsertWithoutPayoutsInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutPayoutsInput, MentorProfileUpdateWithoutPayoutsInput>, MentorProfileUncheckedUpdateWithoutPayoutsInput>
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

  export type NestedEnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
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

  export type NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type NestedEnumMentorApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorApprovalStatus | EnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorApprovalStatusFilter<$PrismaModel> | $Enums.MentorApprovalStatus
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

  export type NestedEnumMentorApprovalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorApprovalStatus | EnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorApprovalStatusWithAggregatesFilter<$PrismaModel> | $Enums.MentorApprovalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMentorApprovalStatusFilter<$PrismaModel>
    _max?: NestedEnumMentorApprovalStatusFilter<$PrismaModel>
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

  export type NestedEnumDayOfWeekNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel> | null
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDayOfWeekNullableFilter<$PrismaModel> | $Enums.DayOfWeek | null
  }

  export type NestedEnumDayOfWeekNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel> | null
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDayOfWeekNullableWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekNullableFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekNullableFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
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

  export type MenteeProfileCreateWithoutUserInput = {
    id?: string
    username: string
    dateOfBirth: Date | string
    contactNumber: string
    education: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    expectations?: string | null
    skillsets?: MenteeProfileCreateskillsetsInput | string[]
    resumeUrl?: string | null
    linkedInUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUncheckedCreateWithoutUserInput = {
    id?: string
    username: string
    dateOfBirth: Date | string
    contactNumber: string
    education: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    expectations?: string | null
    skillsets?: MenteeProfileCreateskillsetsInput | string[]
    resumeUrl?: string | null
    linkedInUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileCreateOrConnectWithoutUserInput = {
    where: MenteeProfileWhereUniqueInput
    create: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
  }

  export type MentorProfileCreateWithoutUserInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutUserInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateWithoutMenteeInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorBookingsInput
    mentorService: MentorServiceCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutMenteeInput = {
    id?: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutMenteeInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMenteeInput, BookingUncheckedCreateWithoutMenteeInput>
  }

  export type BookingCreateManyMenteeInputEnvelope = {
    data: BookingCreateManyMenteeInput | BookingCreateManyMenteeInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutAuthorInput = {
    id?: string
    rating: number
    review?: string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutReviewInput
    mentorProfile: MentorProfileCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutAuthorInput = {
    id?: string
    bookingId: string
    mentorProfileId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewCreateManyAuthorInputEnvelope = {
    data: ReviewCreateManyAuthorInput | ReviewCreateManyAuthorInput[]
    skipDuplicates?: boolean
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
    username?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    skillsets?: MenteeProfileUpdateskillsetsInput | string[]
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    skillsets?: MenteeProfileUpdateskillsetsInput | string[]
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
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

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    menteeId?: StringFilter<"Booking"> | string
    mentorProfileId?: StringFilter<"Booking"> | string
    mentorServiceId?: StringFilter<"Booking"> | string
    startTime?: DateTimeFilter<"Booking"> | Date | string
    endTime?: DateTimeFilter<"Booking"> | Date | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    paymentId?: StringNullableFilter<"Booking"> | string | null
    meetingLink?: StringNullableFilter<"Booking"> | string | null
    purposeOfCall?: StringNullableFilter<"Booking"> | string | null
    notes?: StringNullableFilter<"Booking"> | string | null
    cancelledReason?: StringNullableFilter<"Booking"> | string | null
    rescheduledFromId?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
  }

  export type ReviewUpdateManyWithWhereWithoutAuthorInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    bookingId?: StringFilter<"Review"> | string
    mentorProfileId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    review?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type UserCreateWithoutMenteeProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeBookings?: BookingCreateNestedManyWithoutMenteeInput
    reviewsGiven?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutMenteeProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeBookings?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutMenteeProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
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
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUpdateManyWithoutMenteeNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutMenteeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateWithoutMentorProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    menteeBookings?: BookingCreateNestedManyWithoutMenteeInput
    reviewsGiven?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    menteeBookings?: BookingUncheckedCreateNestedManyWithoutMenteeInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutMentorProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
  }

  export type MentorServiceCreateWithoutMentorProfileInput = {
    id?: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutMentorServicesInput
    windowServices?: AvailabilityWindowServiceCreateNestedManyWithoutMentorServiceInput
    bookings?: BookingCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceUncheckedCreateNestedManyWithoutMentorServiceInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceCreateOrConnectWithoutMentorProfileInput = {
    where: MentorServiceWhereUniqueInput
    create: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput>
  }

  export type MentorServiceCreateManyMentorProfileInputEnvelope = {
    data: MentorServiceCreateManyMentorProfileInput | MentorServiceCreateManyMentorProfileInput[]
    skipDuplicates?: boolean
  }

  export type AvailabilityWindowCreateWithoutMentorProfileInput = {
    id?: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceCreateNestedManyWithoutWindowInput
  }

  export type AvailabilityWindowUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceUncheckedCreateNestedManyWithoutWindowInput
  }

  export type AvailabilityWindowCreateOrConnectWithoutMentorProfileInput = {
    where: AvailabilityWindowWhereUniqueInput
    create: XOR<AvailabilityWindowCreateWithoutMentorProfileInput, AvailabilityWindowUncheckedCreateWithoutMentorProfileInput>
  }

  export type AvailabilityWindowCreateManyMentorProfileInputEnvelope = {
    data: AvailabilityWindowCreateManyMentorProfileInput | AvailabilityWindowCreateManyMentorProfileInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutMentorProfileInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutMenteeBookingsInput
    mentorService: MentorServiceCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    menteeId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutMentorProfileInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMentorProfileInput, BookingUncheckedCreateWithoutMentorProfileInput>
  }

  export type BookingCreateManyMentorProfileInputEnvelope = {
    data: BookingCreateManyMentorProfileInput | BookingCreateManyMentorProfileInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutMentorProfileInput = {
    id?: string
    rating: number
    review?: string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutReviewInput
    author: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    bookingId: string
    authorId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutMentorProfileInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutMentorProfileInput, ReviewUncheckedCreateWithoutMentorProfileInput>
  }

  export type ReviewCreateManyMentorProfileInputEnvelope = {
    data: ReviewCreateManyMentorProfileInput | ReviewCreateManyMentorProfileInput[]
    skipDuplicates?: boolean
  }

  export type SessionFeedbackCreateWithoutMentorProfileInput = {
    id?: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutFeedbackInput
  }

  export type SessionFeedbackUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    bookingId: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
  }

  export type SessionFeedbackCreateOrConnectWithoutMentorProfileInput = {
    where: SessionFeedbackWhereUniqueInput
    create: XOR<SessionFeedbackCreateWithoutMentorProfileInput, SessionFeedbackUncheckedCreateWithoutMentorProfileInput>
  }

  export type SessionFeedbackCreateManyMentorProfileInputEnvelope = {
    data: SessionFeedbackCreateManyMentorProfileInput | SessionFeedbackCreateManyMentorProfileInput[]
    skipDuplicates?: boolean
  }

  export type PayoutCreateWithoutMentorProfileInput = {
    id?: string
    amount: number
    transactionId?: string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PayoutUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    amount: number
    transactionId?: string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PayoutCreateOrConnectWithoutMentorProfileInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutMentorProfileInput, PayoutUncheckedCreateWithoutMentorProfileInput>
  }

  export type PayoutCreateManyMentorProfileInputEnvelope = {
    data: PayoutCreateManyMentorProfileInput | PayoutCreateManyMentorProfileInput[]
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
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUpdateManyWithoutMenteeNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type MentorServiceUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: MentorServiceWhereUniqueInput
    update: XOR<MentorServiceUpdateWithoutMentorProfileInput, MentorServiceUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput>
  }

  export type MentorServiceUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: MentorServiceWhereUniqueInput
    data: XOR<MentorServiceUpdateWithoutMentorProfileInput, MentorServiceUncheckedUpdateWithoutMentorProfileInput>
  }

  export type MentorServiceUpdateManyWithWhereWithoutMentorProfileInput = {
    where: MentorServiceScalarWhereInput
    data: XOR<MentorServiceUpdateManyMutationInput, MentorServiceUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type MentorServiceScalarWhereInput = {
    AND?: MentorServiceScalarWhereInput | MentorServiceScalarWhereInput[]
    OR?: MentorServiceScalarWhereInput[]
    NOT?: MentorServiceScalarWhereInput | MentorServiceScalarWhereInput[]
    id?: StringFilter<"MentorService"> | string
    mentorProfileId?: StringFilter<"MentorService"> | string
    serviceId?: StringFilter<"MentorService"> | string
    price?: FloatFilter<"MentorService"> | number
    durationMinutes?: IntFilter<"MentorService"> | number
    bufferMinutes?: IntFilter<"MentorService"> | number
    isActive?: BoolFilter<"MentorService"> | boolean
    createdAt?: DateTimeFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeFilter<"MentorService"> | Date | string
  }

  export type AvailabilityWindowUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: AvailabilityWindowWhereUniqueInput
    update: XOR<AvailabilityWindowUpdateWithoutMentorProfileInput, AvailabilityWindowUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<AvailabilityWindowCreateWithoutMentorProfileInput, AvailabilityWindowUncheckedCreateWithoutMentorProfileInput>
  }

  export type AvailabilityWindowUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: AvailabilityWindowWhereUniqueInput
    data: XOR<AvailabilityWindowUpdateWithoutMentorProfileInput, AvailabilityWindowUncheckedUpdateWithoutMentorProfileInput>
  }

  export type AvailabilityWindowUpdateManyWithWhereWithoutMentorProfileInput = {
    where: AvailabilityWindowScalarWhereInput
    data: XOR<AvailabilityWindowUpdateManyMutationInput, AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type AvailabilityWindowScalarWhereInput = {
    AND?: AvailabilityWindowScalarWhereInput | AvailabilityWindowScalarWhereInput[]
    OR?: AvailabilityWindowScalarWhereInput[]
    NOT?: AvailabilityWindowScalarWhereInput | AvailabilityWindowScalarWhereInput[]
    id?: StringFilter<"AvailabilityWindow"> | string
    mentorProfileId?: StringFilter<"AvailabilityWindow"> | string
    dayOfWeek?: EnumDayOfWeekNullableFilter<"AvailabilityWindow"> | $Enums.DayOfWeek | null
    specificDate?: DateTimeNullableFilter<"AvailabilityWindow"> | Date | string | null
    startTime?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    endTime?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    timezone?: StringFilter<"AvailabilityWindow"> | string
    createdAt?: DateTimeFilter<"AvailabilityWindow"> | Date | string
    updatedAt?: DateTimeFilter<"AvailabilityWindow"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutMentorProfileInput, BookingUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<BookingCreateWithoutMentorProfileInput, BookingUncheckedCreateWithoutMentorProfileInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutMentorProfileInput, BookingUncheckedUpdateWithoutMentorProfileInput>
  }

  export type BookingUpdateManyWithWhereWithoutMentorProfileInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutMentorProfileInput, ReviewUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<ReviewCreateWithoutMentorProfileInput, ReviewUncheckedCreateWithoutMentorProfileInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutMentorProfileInput, ReviewUncheckedUpdateWithoutMentorProfileInput>
  }

  export type ReviewUpdateManyWithWhereWithoutMentorProfileInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type SessionFeedbackUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: SessionFeedbackWhereUniqueInput
    update: XOR<SessionFeedbackUpdateWithoutMentorProfileInput, SessionFeedbackUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<SessionFeedbackCreateWithoutMentorProfileInput, SessionFeedbackUncheckedCreateWithoutMentorProfileInput>
  }

  export type SessionFeedbackUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: SessionFeedbackWhereUniqueInput
    data: XOR<SessionFeedbackUpdateWithoutMentorProfileInput, SessionFeedbackUncheckedUpdateWithoutMentorProfileInput>
  }

  export type SessionFeedbackUpdateManyWithWhereWithoutMentorProfileInput = {
    where: SessionFeedbackScalarWhereInput
    data: XOR<SessionFeedbackUpdateManyMutationInput, SessionFeedbackUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type SessionFeedbackScalarWhereInput = {
    AND?: SessionFeedbackScalarWhereInput | SessionFeedbackScalarWhereInput[]
    OR?: SessionFeedbackScalarWhereInput[]
    NOT?: SessionFeedbackScalarWhereInput | SessionFeedbackScalarWhereInput[]
    id?: StringFilter<"SessionFeedback"> | string
    bookingId?: StringFilter<"SessionFeedback"> | string
    mentorProfileId?: StringFilter<"SessionFeedback"> | string
    strengths?: StringNullableFilter<"SessionFeedback"> | string | null
    weaknesses?: StringNullableFilter<"SessionFeedback"> | string | null
    recommendations?: StringNullableFilter<"SessionFeedback"> | string | null
    createdAt?: DateTimeFilter<"SessionFeedback"> | Date | string
  }

  export type PayoutUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: PayoutWhereUniqueInput
    update: XOR<PayoutUpdateWithoutMentorProfileInput, PayoutUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<PayoutCreateWithoutMentorProfileInput, PayoutUncheckedCreateWithoutMentorProfileInput>
  }

  export type PayoutUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: PayoutWhereUniqueInput
    data: XOR<PayoutUpdateWithoutMentorProfileInput, PayoutUncheckedUpdateWithoutMentorProfileInput>
  }

  export type PayoutUpdateManyWithWhereWithoutMentorProfileInput = {
    where: PayoutScalarWhereInput
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type PayoutScalarWhereInput = {
    AND?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    OR?: PayoutScalarWhereInput[]
    NOT?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    id?: StringFilter<"Payout"> | string
    mentorProfileId?: StringFilter<"Payout"> | string
    amount?: FloatFilter<"Payout"> | number
    transactionId?: StringNullableFilter<"Payout"> | string | null
    processedAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
  }

  export type MentorServiceCreateWithoutServiceInput = {
    id?: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorServicesInput
    windowServices?: AvailabilityWindowServiceCreateNestedManyWithoutMentorServiceInput
    bookings?: BookingCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceUncheckedCreateWithoutServiceInput = {
    id?: string
    mentorProfileId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceUncheckedCreateNestedManyWithoutMentorServiceInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceCreateOrConnectWithoutServiceInput = {
    where: MentorServiceWhereUniqueInput
    create: XOR<MentorServiceCreateWithoutServiceInput, MentorServiceUncheckedCreateWithoutServiceInput>
  }

  export type MentorServiceCreateManyServiceInputEnvelope = {
    data: MentorServiceCreateManyServiceInput | MentorServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type MentorServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: MentorServiceWhereUniqueInput
    update: XOR<MentorServiceUpdateWithoutServiceInput, MentorServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<MentorServiceCreateWithoutServiceInput, MentorServiceUncheckedCreateWithoutServiceInput>
  }

  export type MentorServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: MentorServiceWhereUniqueInput
    data: XOR<MentorServiceUpdateWithoutServiceInput, MentorServiceUncheckedUpdateWithoutServiceInput>
  }

  export type MentorServiceUpdateManyWithWhereWithoutServiceInput = {
    where: MentorServiceScalarWhereInput
    data: XOR<MentorServiceUpdateManyMutationInput, MentorServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type MentorProfileCreateWithoutMentorServicesInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutMentorServicesInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutMentorServicesInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutMentorServicesInput, MentorProfileUncheckedCreateWithoutMentorServicesInput>
  }

  export type ServiceCreateWithoutMentorServicesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUncheckedCreateWithoutMentorServicesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutMentorServicesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutMentorServicesInput, ServiceUncheckedCreateWithoutMentorServicesInput>
  }

  export type AvailabilityWindowServiceCreateWithoutMentorServiceInput = {
    id?: string
    createdAt?: Date | string
    window: AvailabilityWindowCreateNestedOneWithoutWindowServicesInput
  }

  export type AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput = {
    id?: string
    windowId: string
    createdAt?: Date | string
  }

  export type AvailabilityWindowServiceCreateOrConnectWithoutMentorServiceInput = {
    where: AvailabilityWindowServiceWhereUniqueInput
    create: XOR<AvailabilityWindowServiceCreateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput>
  }

  export type AvailabilityWindowServiceCreateManyMentorServiceInputEnvelope = {
    data: AvailabilityWindowServiceCreateManyMentorServiceInput | AvailabilityWindowServiceCreateManyMentorServiceInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutMentorServiceInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutMenteeBookingsInput
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutMentorServiceInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutMentorServiceInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMentorServiceInput, BookingUncheckedCreateWithoutMentorServiceInput>
  }

  export type BookingCreateManyMentorServiceInputEnvelope = {
    data: BookingCreateManyMentorServiceInput | BookingCreateManyMentorServiceInput[]
    skipDuplicates?: boolean
  }

  export type MentorProfileUpsertWithoutMentorServicesInput = {
    update: XOR<MentorProfileUpdateWithoutMentorServicesInput, MentorProfileUncheckedUpdateWithoutMentorServicesInput>
    create: XOR<MentorProfileCreateWithoutMentorServicesInput, MentorProfileUncheckedCreateWithoutMentorServicesInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutMentorServicesInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutMentorServicesInput, MentorProfileUncheckedUpdateWithoutMentorServicesInput>
  }

  export type MentorProfileUpdateWithoutMentorServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutMentorServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type ServiceUpsertWithoutMentorServicesInput = {
    update: XOR<ServiceUpdateWithoutMentorServicesInput, ServiceUncheckedUpdateWithoutMentorServicesInput>
    create: XOR<ServiceCreateWithoutMentorServicesInput, ServiceUncheckedCreateWithoutMentorServicesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutMentorServicesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutMentorServicesInput, ServiceUncheckedUpdateWithoutMentorServicesInput>
  }

  export type ServiceUpdateWithoutMentorServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateWithoutMentorServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceUpsertWithWhereUniqueWithoutMentorServiceInput = {
    where: AvailabilityWindowServiceWhereUniqueInput
    update: XOR<AvailabilityWindowServiceUpdateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedUpdateWithoutMentorServiceInput>
    create: XOR<AvailabilityWindowServiceCreateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedCreateWithoutMentorServiceInput>
  }

  export type AvailabilityWindowServiceUpdateWithWhereUniqueWithoutMentorServiceInput = {
    where: AvailabilityWindowServiceWhereUniqueInput
    data: XOR<AvailabilityWindowServiceUpdateWithoutMentorServiceInput, AvailabilityWindowServiceUncheckedUpdateWithoutMentorServiceInput>
  }

  export type AvailabilityWindowServiceUpdateManyWithWhereWithoutMentorServiceInput = {
    where: AvailabilityWindowServiceScalarWhereInput
    data: XOR<AvailabilityWindowServiceUpdateManyMutationInput, AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceInput>
  }

  export type AvailabilityWindowServiceScalarWhereInput = {
    AND?: AvailabilityWindowServiceScalarWhereInput | AvailabilityWindowServiceScalarWhereInput[]
    OR?: AvailabilityWindowServiceScalarWhereInput[]
    NOT?: AvailabilityWindowServiceScalarWhereInput | AvailabilityWindowServiceScalarWhereInput[]
    id?: StringFilter<"AvailabilityWindowService"> | string
    windowId?: StringFilter<"AvailabilityWindowService"> | string
    mentorServiceId?: StringFilter<"AvailabilityWindowService"> | string
    createdAt?: DateTimeFilter<"AvailabilityWindowService"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutMentorServiceInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutMentorServiceInput, BookingUncheckedUpdateWithoutMentorServiceInput>
    create: XOR<BookingCreateWithoutMentorServiceInput, BookingUncheckedCreateWithoutMentorServiceInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutMentorServiceInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutMentorServiceInput, BookingUncheckedUpdateWithoutMentorServiceInput>
  }

  export type BookingUpdateManyWithWhereWithoutMentorServiceInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutMentorServiceInput>
  }

  export type MentorProfileCreateWithoutAvailabilityWindowsInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutAvailabilityWindowsInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutAvailabilityWindowsInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutAvailabilityWindowsInput, MentorProfileUncheckedCreateWithoutAvailabilityWindowsInput>
  }

  export type AvailabilityWindowServiceCreateWithoutWindowInput = {
    id?: string
    createdAt?: Date | string
    mentorService: MentorServiceCreateNestedOneWithoutWindowServicesInput
  }

  export type AvailabilityWindowServiceUncheckedCreateWithoutWindowInput = {
    id?: string
    mentorServiceId: string
    createdAt?: Date | string
  }

  export type AvailabilityWindowServiceCreateOrConnectWithoutWindowInput = {
    where: AvailabilityWindowServiceWhereUniqueInput
    create: XOR<AvailabilityWindowServiceCreateWithoutWindowInput, AvailabilityWindowServiceUncheckedCreateWithoutWindowInput>
  }

  export type AvailabilityWindowServiceCreateManyWindowInputEnvelope = {
    data: AvailabilityWindowServiceCreateManyWindowInput | AvailabilityWindowServiceCreateManyWindowInput[]
    skipDuplicates?: boolean
  }

  export type MentorProfileUpsertWithoutAvailabilityWindowsInput = {
    update: XOR<MentorProfileUpdateWithoutAvailabilityWindowsInput, MentorProfileUncheckedUpdateWithoutAvailabilityWindowsInput>
    create: XOR<MentorProfileCreateWithoutAvailabilityWindowsInput, MentorProfileUncheckedCreateWithoutAvailabilityWindowsInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutAvailabilityWindowsInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutAvailabilityWindowsInput, MentorProfileUncheckedUpdateWithoutAvailabilityWindowsInput>
  }

  export type MentorProfileUpdateWithoutAvailabilityWindowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutAvailabilityWindowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type AvailabilityWindowServiceUpsertWithWhereUniqueWithoutWindowInput = {
    where: AvailabilityWindowServiceWhereUniqueInput
    update: XOR<AvailabilityWindowServiceUpdateWithoutWindowInput, AvailabilityWindowServiceUncheckedUpdateWithoutWindowInput>
    create: XOR<AvailabilityWindowServiceCreateWithoutWindowInput, AvailabilityWindowServiceUncheckedCreateWithoutWindowInput>
  }

  export type AvailabilityWindowServiceUpdateWithWhereUniqueWithoutWindowInput = {
    where: AvailabilityWindowServiceWhereUniqueInput
    data: XOR<AvailabilityWindowServiceUpdateWithoutWindowInput, AvailabilityWindowServiceUncheckedUpdateWithoutWindowInput>
  }

  export type AvailabilityWindowServiceUpdateManyWithWhereWithoutWindowInput = {
    where: AvailabilityWindowServiceScalarWhereInput
    data: XOR<AvailabilityWindowServiceUpdateManyMutationInput, AvailabilityWindowServiceUncheckedUpdateManyWithoutWindowInput>
  }

  export type AvailabilityWindowCreateWithoutWindowServicesInput = {
    id?: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutAvailabilityWindowsInput
  }

  export type AvailabilityWindowUncheckedCreateWithoutWindowServicesInput = {
    id?: string
    mentorProfileId: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityWindowCreateOrConnectWithoutWindowServicesInput = {
    where: AvailabilityWindowWhereUniqueInput
    create: XOR<AvailabilityWindowCreateWithoutWindowServicesInput, AvailabilityWindowUncheckedCreateWithoutWindowServicesInput>
  }

  export type MentorServiceCreateWithoutWindowServicesInput = {
    id?: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorServicesInput
    service: ServiceCreateNestedOneWithoutMentorServicesInput
    bookings?: BookingCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceUncheckedCreateWithoutWindowServicesInput = {
    id?: string
    mentorProfileId: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceCreateOrConnectWithoutWindowServicesInput = {
    where: MentorServiceWhereUniqueInput
    create: XOR<MentorServiceCreateWithoutWindowServicesInput, MentorServiceUncheckedCreateWithoutWindowServicesInput>
  }

  export type AvailabilityWindowUpsertWithoutWindowServicesInput = {
    update: XOR<AvailabilityWindowUpdateWithoutWindowServicesInput, AvailabilityWindowUncheckedUpdateWithoutWindowServicesInput>
    create: XOR<AvailabilityWindowCreateWithoutWindowServicesInput, AvailabilityWindowUncheckedCreateWithoutWindowServicesInput>
    where?: AvailabilityWindowWhereInput
  }

  export type AvailabilityWindowUpdateToOneWithWhereWithoutWindowServicesInput = {
    where?: AvailabilityWindowWhereInput
    data: XOR<AvailabilityWindowUpdateWithoutWindowServicesInput, AvailabilityWindowUncheckedUpdateWithoutWindowServicesInput>
  }

  export type AvailabilityWindowUpdateWithoutWindowServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutAvailabilityWindowsNestedInput
  }

  export type AvailabilityWindowUncheckedUpdateWithoutWindowServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceUpsertWithoutWindowServicesInput = {
    update: XOR<MentorServiceUpdateWithoutWindowServicesInput, MentorServiceUncheckedUpdateWithoutWindowServicesInput>
    create: XOR<MentorServiceCreateWithoutWindowServicesInput, MentorServiceUncheckedCreateWithoutWindowServicesInput>
    where?: MentorServiceWhereInput
  }

  export type MentorServiceUpdateToOneWithWhereWithoutWindowServicesInput = {
    where?: MentorServiceWhereInput
    data: XOR<MentorServiceUpdateWithoutWindowServicesInput, MentorServiceUncheckedUpdateWithoutWindowServicesInput>
  }

  export type MentorServiceUpdateWithoutWindowServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutMentorServicesNestedInput
    bookings?: BookingUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateWithoutWindowServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutMentorServiceNestedInput
  }

  export type UserCreateWithoutMenteeBookingsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutMenteeBookingsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutMenteeBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMenteeBookingsInput, UserUncheckedCreateWithoutMenteeBookingsInput>
  }

  export type MentorProfileCreateWithoutMentorBookingsInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutMentorBookingsInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutMentorBookingsInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutMentorBookingsInput, MentorProfileUncheckedCreateWithoutMentorBookingsInput>
  }

  export type MentorServiceCreateWithoutBookingsInput = {
    id?: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorServicesInput
    service: ServiceCreateNestedOneWithoutMentorServicesInput
    windowServices?: AvailabilityWindowServiceCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceUncheckedCreateWithoutBookingsInput = {
    id?: string
    mentorProfileId: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    windowServices?: AvailabilityWindowServiceUncheckedCreateNestedManyWithoutMentorServiceInput
  }

  export type MentorServiceCreateOrConnectWithoutBookingsInput = {
    where: MentorServiceWhereUniqueInput
    create: XOR<MentorServiceCreateWithoutBookingsInput, MentorServiceUncheckedCreateWithoutBookingsInput>
  }

  export type PaymentCreateWithoutBookingInput = {
    id?: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutBookingInput = {
    id?: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type ReviewCreateWithoutBookingInput = {
    id?: string
    rating: number
    review?: string | null
    createdAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutReviewsInput
    author: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateWithoutBookingInput = {
    id?: string
    mentorProfileId: string
    authorId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutBookingInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
  }

  export type SessionFeedbackCreateWithoutBookingInput = {
    id?: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutFeedbacksInput
  }

  export type SessionFeedbackUncheckedCreateWithoutBookingInput = {
    id?: string
    mentorProfileId: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
  }

  export type SessionFeedbackCreateOrConnectWithoutBookingInput = {
    where: SessionFeedbackWhereUniqueInput
    create: XOR<SessionFeedbackCreateWithoutBookingInput, SessionFeedbackUncheckedCreateWithoutBookingInput>
  }

  export type UserUpsertWithoutMenteeBookingsInput = {
    update: XOR<UserUpdateWithoutMenteeBookingsInput, UserUncheckedUpdateWithoutMenteeBookingsInput>
    create: XOR<UserCreateWithoutMenteeBookingsInput, UserUncheckedCreateWithoutMenteeBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMenteeBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMenteeBookingsInput, UserUncheckedUpdateWithoutMenteeBookingsInput>
  }

  export type UserUpdateWithoutMenteeBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutMenteeBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type MentorProfileUpsertWithoutMentorBookingsInput = {
    update: XOR<MentorProfileUpdateWithoutMentorBookingsInput, MentorProfileUncheckedUpdateWithoutMentorBookingsInput>
    create: XOR<MentorProfileCreateWithoutMentorBookingsInput, MentorProfileUncheckedCreateWithoutMentorBookingsInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutMentorBookingsInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutMentorBookingsInput, MentorProfileUncheckedUpdateWithoutMentorBookingsInput>
  }

  export type MentorProfileUpdateWithoutMentorBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutMentorBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorServiceUpsertWithoutBookingsInput = {
    update: XOR<MentorServiceUpdateWithoutBookingsInput, MentorServiceUncheckedUpdateWithoutBookingsInput>
    create: XOR<MentorServiceCreateWithoutBookingsInput, MentorServiceUncheckedCreateWithoutBookingsInput>
    where?: MentorServiceWhereInput
  }

  export type MentorServiceUpdateToOneWithWhereWithoutBookingsInput = {
    where?: MentorServiceWhereInput
    data: XOR<MentorServiceUpdateWithoutBookingsInput, MentorServiceUncheckedUpdateWithoutBookingsInput>
  }

  export type MentorServiceUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutMentorServicesNestedInput
    windowServices?: AvailabilityWindowServiceUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceNestedInput
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
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUncheckedUpdateOneWithoutPaymentNestedInput
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
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutReviewsNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionFeedbackUpsertWithoutBookingInput = {
    update: XOR<SessionFeedbackUpdateWithoutBookingInput, SessionFeedbackUncheckedUpdateWithoutBookingInput>
    create: XOR<SessionFeedbackCreateWithoutBookingInput, SessionFeedbackUncheckedCreateWithoutBookingInput>
    where?: SessionFeedbackWhereInput
  }

  export type SessionFeedbackUpdateToOneWithWhereWithoutBookingInput = {
    where?: SessionFeedbackWhereInput
    data: XOR<SessionFeedbackUpdateWithoutBookingInput, SessionFeedbackUncheckedUpdateWithoutBookingInput>
  }

  export type SessionFeedbackUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type SessionFeedbackUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateWithoutPaymentInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutMenteeBookingsInput
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorBookingsInput
    mentorService: MentorServiceCreateNestedOneWithoutBookingsInput
    review?: ReviewCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPaymentInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPaymentInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
  }

  export type InvoiceCreateWithoutPaymentInput = {
    id?: string
    invoiceNumber: string
    invoiceUrl?: string | null
    generatedAt?: Date | string
  }

  export type InvoiceUncheckedCreateWithoutPaymentInput = {
    id?: string
    invoiceNumber: string
    invoiceUrl?: string | null
    generatedAt?: Date | string
  }

  export type InvoiceCreateOrConnectWithoutPaymentInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutPaymentInput, InvoiceUncheckedCreateWithoutPaymentInput>
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
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutMenteeBookingsNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutBookingsNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type InvoiceUpsertWithoutPaymentInput = {
    update: XOR<InvoiceUpdateWithoutPaymentInput, InvoiceUncheckedUpdateWithoutPaymentInput>
    create: XOR<InvoiceCreateWithoutPaymentInput, InvoiceUncheckedCreateWithoutPaymentInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutPaymentInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutPaymentInput, InvoiceUncheckedUpdateWithoutPaymentInput>
  }

  export type InvoiceUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    invoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateWithoutInvoiceInput = {
    id?: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutInvoiceInput = {
    id?: string
    bookingId: string
    razorpayOrderId?: string | null
    razorpayPaymentId?: string | null
    razorpaySignature?: string | null
    amount: number
    currency?: string
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    refundedAmount?: number | null
    refundReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutInvoiceInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutInvoiceInput, PaymentUncheckedCreateWithoutInvoiceInput>
  }

  export type PaymentUpsertWithoutInvoiceInput = {
    update: XOR<PaymentUpdateWithoutInvoiceInput, PaymentUncheckedUpdateWithoutInvoiceInput>
    create: XOR<PaymentCreateWithoutInvoiceInput, PaymentUncheckedCreateWithoutInvoiceInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutInvoiceInput, PaymentUncheckedUpdateWithoutInvoiceInput>
  }

  export type PaymentUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    razorpayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpayPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    razorpaySignature?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateWithoutFeedbackInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutMenteeBookingsInput
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorBookingsInput
    mentorService: MentorServiceCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutFeedbackInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutFeedbackInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutFeedbackInput, BookingUncheckedCreateWithoutFeedbackInput>
  }

  export type MentorProfileCreateWithoutFeedbacksInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutFeedbacksInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutFeedbacksInput, MentorProfileUncheckedCreateWithoutFeedbacksInput>
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
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutMenteeBookingsNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type MentorProfileUpsertWithoutFeedbacksInput = {
    update: XOR<MentorProfileUpdateWithoutFeedbacksInput, MentorProfileUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<MentorProfileCreateWithoutFeedbacksInput, MentorProfileUncheckedCreateWithoutFeedbacksInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutFeedbacksInput, MentorProfileUncheckedUpdateWithoutFeedbacksInput>
  }

  export type MentorProfileUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type BookingCreateWithoutReviewInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mentee: UserCreateNestedOneWithoutMenteeBookingsInput
    mentorProfile: MentorProfileCreateNestedOneWithoutMentorBookingsInput
    mentorService: MentorServiceCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutReviewInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
    feedback?: SessionFeedbackUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutReviewInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
  }

  export type MentorProfileCreateWithoutReviewsInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutReviewsInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutReviewsInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutReviewsInput, MentorProfileUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReviewsGivenInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
    menteeBookings?: BookingCreateNestedManyWithoutMenteeInput
  }

  export type UserUncheckedCreateWithoutReviewsGivenInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    provider?: $Enums.AuthProvider
    role?: $Enums.Role
    name: string
    profilePicture?: string | null
    isVerified?: boolean
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
    menteeBookings?: BookingUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type UserCreateOrConnectWithoutReviewsGivenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
  }

  export type BookingUpsertWithoutReviewInput = {
    update: XOR<BookingUpdateWithoutReviewInput, BookingUncheckedUpdateWithoutReviewInput>
    create: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutReviewInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutReviewInput, BookingUncheckedUpdateWithoutReviewInput>
  }

  export type BookingUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutMenteeBookingsNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type MentorProfileUpsertWithoutReviewsInput = {
    update: XOR<MentorProfileUpdateWithoutReviewsInput, MentorProfileUncheckedUpdateWithoutReviewsInput>
    create: XOR<MentorProfileCreateWithoutReviewsInput, MentorProfileUncheckedCreateWithoutReviewsInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutReviewsInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutReviewsInput, MentorProfileUncheckedUpdateWithoutReviewsInput>
  }

  export type MentorProfileUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type UserUpsertWithoutReviewsGivenInput = {
    update: XOR<UserUpdateWithoutReviewsGivenInput, UserUncheckedUpdateWithoutReviewsGivenInput>
    create: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsGivenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsGivenInput, UserUncheckedUpdateWithoutReviewsGivenInput>
  }

  export type UserUpdateWithoutReviewsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUpdateManyWithoutMenteeNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
    menteeBookings?: BookingUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type MentorProfileCreateWithoutPayoutsInput = {
    id?: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    mentorServices?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutPayoutsInput = {
    id?: string
    userId: string
    username: string
    bio: string
    linkedInUrl?: string | null
    contactNumber: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgCollegeProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    collegeDocumentUrl?: string | null
    approvalStatus?: $Enums.MentorApprovalStatus
    isVerified?: boolean
    totalSessions?: number
    totalEarnings?: number
    averageRating?: number
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorServices?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availabilityWindows?: AvailabilityWindowUncheckedCreateNestedManyWithoutMentorProfileInput
    mentorBookings?: BookingUncheckedCreateNestedManyWithoutMentorProfileInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMentorProfileInput
    feedbacks?: SessionFeedbackUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutPayoutsInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutPayoutsInput, MentorProfileUncheckedCreateWithoutPayoutsInput>
  }

  export type MentorProfileUpsertWithoutPayoutsInput = {
    update: XOR<MentorProfileUpdateWithoutPayoutsInput, MentorProfileUncheckedUpdateWithoutPayoutsInput>
    create: XOR<MentorProfileCreateWithoutPayoutsInput, MentorProfileUncheckedCreateWithoutPayoutsInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutPayoutsInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutPayoutsInput, MentorProfileUncheckedUpdateWithoutPayoutsInput>
  }

  export type MentorProfileUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    mentorServices?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    totalSessions?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorServices?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availabilityWindows?: AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileNestedInput
    mentorBookings?: BookingUncheckedUpdateManyWithoutMentorProfileNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMentorProfileNestedInput
    feedbacks?: SessionFeedbackUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type BookingCreateManyMenteeInput = {
    id?: string
    mentorProfileId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyAuthorInput = {
    id?: string
    bookingId: string
    mentorProfileId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type BookingUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutReviewNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceCreateManyMentorProfileInput = {
    id?: string
    serviceId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityWindowCreateManyMentorProfileInput = {
    id?: string
    dayOfWeek?: $Enums.DayOfWeek | null
    specificDate?: Date | string | null
    startTime: Date | string
    endTime: Date | string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateManyMentorProfileInput = {
    id?: string
    menteeId: string
    mentorServiceId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyMentorProfileInput = {
    id?: string
    bookingId: string
    authorId: string
    rating: number
    review?: string | null
    createdAt?: Date | string
  }

  export type SessionFeedbackCreateManyMentorProfileInput = {
    id?: string
    bookingId: string
    strengths?: string | null
    weaknesses?: string | null
    recommendations?: string | null
    createdAt?: Date | string
  }

  export type PayoutCreateManyMentorProfileInput = {
    id?: string
    amount: number
    transactionId?: string | null
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type MentorServiceUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutMentorServicesNestedInput
    windowServices?: AvailabilityWindowServiceUpdateManyWithoutMentorServiceNestedInput
    bookings?: BookingUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUpdateManyWithoutWindowNestedInput
  }

  export type AvailabilityWindowUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUncheckedUpdateManyWithoutWindowNestedInput
  }

  export type AvailabilityWindowUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: NullableEnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek | null
    specificDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutMenteeBookingsNestedInput
    mentorService?: MentorServiceUpdateOneRequiredWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutReviewNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionFeedbackUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type SessionFeedbackUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionFeedbackUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    strengths?: NullableStringFieldUpdateOperationsInput | string | null
    weaknesses?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceCreateManyServiceInput = {
    id?: string
    mentorProfileId: string
    price: number
    durationMinutes: number
    bufferMinutes?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorServicesNestedInput
    windowServices?: AvailabilityWindowServiceUpdateManyWithoutMentorServiceNestedInput
    bookings?: BookingUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    windowServices?: AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMentorServiceNestedInput
  }

  export type MentorServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    durationMinutes?: IntFieldUpdateOperationsInput | number
    bufferMinutes?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceCreateManyMentorServiceInput = {
    id?: string
    windowId: string
    createdAt?: Date | string
  }

  export type BookingCreateManyMentorServiceInput = {
    id?: string
    menteeId: string
    mentorProfileId: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.BookingStatus
    paymentId?: string | null
    meetingLink?: string | null
    purposeOfCall?: string | null
    notes?: string | null
    cancelledReason?: string | null
    rescheduledFromId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailabilityWindowServiceUpdateWithoutMentorServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    window?: AvailabilityWindowUpdateOneRequiredWithoutWindowServicesNestedInput
  }

  export type AvailabilityWindowServiceUncheckedUpdateWithoutMentorServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    windowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceUncheckedUpdateManyWithoutMentorServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    windowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutMentorServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: UserUpdateOneRequiredWithoutMenteeBookingsNestedInput
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutMentorBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutMentorServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
    feedback?: SessionFeedbackUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutMentorServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    meetingLink?: NullableStringFieldUpdateOperationsInput | string | null
    purposeOfCall?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFromId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceCreateManyWindowInput = {
    id?: string
    mentorServiceId: string
    createdAt?: Date | string
  }

  export type AvailabilityWindowServiceUpdateWithoutWindowInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorService?: MentorServiceUpdateOneRequiredWithoutWindowServicesNestedInput
  }

  export type AvailabilityWindowServiceUncheckedUpdateWithoutWindowInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailabilityWindowServiceUncheckedUpdateManyWithoutWindowInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorServiceId?: StringFieldUpdateOperationsInput | string
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
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorServiceCountOutputTypeDefaultArgs instead
     */
    export type MentorServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AvailabilityWindowCountOutputTypeDefaultArgs instead
     */
    export type AvailabilityWindowCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AvailabilityWindowCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenteeProfileDefaultArgs instead
     */
    export type MenteeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenteeProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorProfileDefaultArgs instead
     */
    export type MentorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorServiceDefaultArgs instead
     */
    export type MentorServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AvailabilityWindowDefaultArgs instead
     */
    export type AvailabilityWindowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AvailabilityWindowDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AvailabilityWindowServiceDefaultArgs instead
     */
    export type AvailabilityWindowServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AvailabilityWindowServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookingDefaultArgs instead
     */
    export type BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceDefaultArgs instead
     */
    export type InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionFeedbackDefaultArgs instead
     */
    export type SessionFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionFeedbackDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PayoutDefaultArgs instead
     */
    export type PayoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PayoutDefaultArgs<ExtArgs>

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