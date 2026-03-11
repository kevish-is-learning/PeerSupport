
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
 * Model VerificationDocument
 * 
 */
export type VerificationDocument = $Result.DefaultSelection<Prisma.$VerificationDocumentPayload>
/**
 * Model MentorProfile
 * ////////////////////////
 * ////////////////////////
 */
export type MentorProfile = $Result.DefaultSelection<Prisma.$MentorProfilePayload>
/**
 * Model MenteeProfile
 * 
 */
export type MenteeProfile = $Result.DefaultSelection<Prisma.$MenteeProfilePayload>
/**
 * Model AdminProfile
 * 
 */
export type AdminProfile = $Result.DefaultSelection<Prisma.$AdminProfilePayload>
/**
 * Model MentorApplication
 * 
 */
export type MentorApplication = $Result.DefaultSelection<Prisma.$MentorApplicationPayload>
/**
 * Model MenteeResume
 * 
 */
export type MenteeResume = $Result.DefaultSelection<Prisma.$MenteeResumePayload>
/**
 * Model MentorResume
 * 
 */
export type MentorResume = $Result.DefaultSelection<Prisma.$MentorResumePayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model ServiceReview
 * 
 */
export type ServiceReview = $Result.DefaultSelection<Prisma.$ServiceReviewPayload>
/**
 * Model MentorFeedback
 * 
 */
export type MentorFeedback = $Result.DefaultSelection<Prisma.$MentorFeedbackPayload>

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


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const ApplicationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const ServiceStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DRAFT: 'DRAFT'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

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
   * `prisma.verificationDocument`: Exposes CRUD operations for the **VerificationDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationDocuments
    * const verificationDocuments = await prisma.verificationDocument.findMany()
    * ```
    */
  get verificationDocument(): Prisma.VerificationDocumentDelegate<ExtArgs>;

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
   * `prisma.adminProfile`: Exposes CRUD operations for the **AdminProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminProfiles
    * const adminProfiles = await prisma.adminProfile.findMany()
    * ```
    */
  get adminProfile(): Prisma.AdminProfileDelegate<ExtArgs>;

  /**
   * `prisma.mentorApplication`: Exposes CRUD operations for the **MentorApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorApplications
    * const mentorApplications = await prisma.mentorApplication.findMany()
    * ```
    */
  get mentorApplication(): Prisma.MentorApplicationDelegate<ExtArgs>;

  /**
   * `prisma.menteeResume`: Exposes CRUD operations for the **MenteeResume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenteeResumes
    * const menteeResumes = await prisma.menteeResume.findMany()
    * ```
    */
  get menteeResume(): Prisma.MenteeResumeDelegate<ExtArgs>;

  /**
   * `prisma.mentorResume`: Exposes CRUD operations for the **MentorResume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorResumes
    * const mentorResumes = await prisma.mentorResume.findMany()
    * ```
    */
  get mentorResume(): Prisma.MentorResumeDelegate<ExtArgs>;

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
   * `prisma.serviceReview`: Exposes CRUD operations for the **ServiceReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceReviews
    * const serviceReviews = await prisma.serviceReview.findMany()
    * ```
    */
  get serviceReview(): Prisma.ServiceReviewDelegate<ExtArgs>;

  /**
   * `prisma.mentorFeedback`: Exposes CRUD operations for the **MentorFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorFeedbacks
    * const mentorFeedbacks = await prisma.mentorFeedback.findMany()
    * ```
    */
  get mentorFeedback(): Prisma.MentorFeedbackDelegate<ExtArgs>;
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
    VerificationDocument: 'VerificationDocument',
    MentorProfile: 'MentorProfile',
    MenteeProfile: 'MenteeProfile',
    AdminProfile: 'AdminProfile',
    MentorApplication: 'MentorApplication',
    MenteeResume: 'MenteeResume',
    MentorResume: 'MentorResume',
    Service: 'Service',
    ServiceReview: 'ServiceReview',
    MentorFeedback: 'MentorFeedback'
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
      modelProps: "user" | "verificationDocument" | "mentorProfile" | "menteeProfile" | "adminProfile" | "mentorApplication" | "menteeResume" | "mentorResume" | "service" | "serviceReview" | "mentorFeedback"
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
      AdminProfile: {
        payload: Prisma.$AdminProfilePayload<ExtArgs>
        fields: Prisma.AdminProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          findFirst: {
            args: Prisma.AdminProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          findMany: {
            args: Prisma.AdminProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          create: {
            args: Prisma.AdminProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          createMany: {
            args: Prisma.AdminProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          delete: {
            args: Prisma.AdminProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          update: {
            args: Prisma.AdminProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          deleteMany: {
            args: Prisma.AdminProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          aggregate: {
            args: Prisma.AdminProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminProfile>
          }
          groupBy: {
            args: Prisma.AdminProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AdminProfileCountAggregateOutputType> | number
          }
        }
      }
      MentorApplication: {
        payload: Prisma.$MentorApplicationPayload<ExtArgs>
        fields: Prisma.MentorApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>
          }
          findFirst: {
            args: Prisma.MentorApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>
          }
          findMany: {
            args: Prisma.MentorApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>[]
          }
          create: {
            args: Prisma.MentorApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>
          }
          createMany: {
            args: Prisma.MentorApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>[]
          }
          delete: {
            args: Prisma.MentorApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>
          }
          update: {
            args: Prisma.MentorApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>
          }
          deleteMany: {
            args: Prisma.MentorApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorApplicationPayload>
          }
          aggregate: {
            args: Prisma.MentorApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorApplication>
          }
          groupBy: {
            args: Prisma.MentorApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<MentorApplicationCountAggregateOutputType> | number
          }
        }
      }
      MenteeResume: {
        payload: Prisma.$MenteeResumePayload<ExtArgs>
        fields: Prisma.MenteeResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenteeResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenteeResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>
          }
          findFirst: {
            args: Prisma.MenteeResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenteeResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>
          }
          findMany: {
            args: Prisma.MenteeResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>[]
          }
          create: {
            args: Prisma.MenteeResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>
          }
          createMany: {
            args: Prisma.MenteeResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenteeResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>[]
          }
          delete: {
            args: Prisma.MenteeResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>
          }
          update: {
            args: Prisma.MenteeResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>
          }
          deleteMany: {
            args: Prisma.MenteeResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenteeResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenteeResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenteeResumePayload>
          }
          aggregate: {
            args: Prisma.MenteeResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenteeResume>
          }
          groupBy: {
            args: Prisma.MenteeResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenteeResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenteeResumeCountArgs<ExtArgs>
            result: $Utils.Optional<MenteeResumeCountAggregateOutputType> | number
          }
        }
      }
      MentorResume: {
        payload: Prisma.$MentorResumePayload<ExtArgs>
        fields: Prisma.MentorResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>
          }
          findFirst: {
            args: Prisma.MentorResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>
          }
          findMany: {
            args: Prisma.MentorResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>[]
          }
          create: {
            args: Prisma.MentorResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>
          }
          createMany: {
            args: Prisma.MentorResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>[]
          }
          delete: {
            args: Prisma.MentorResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>
          }
          update: {
            args: Prisma.MentorResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>
          }
          deleteMany: {
            args: Prisma.MentorResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MentorResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorResumePayload>
          }
          aggregate: {
            args: Prisma.MentorResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentorResume>
          }
          groupBy: {
            args: Prisma.MentorResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorResumeCountArgs<ExtArgs>
            result: $Utils.Optional<MentorResumeCountAggregateOutputType> | number
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
      ServiceReview: {
        payload: Prisma.$ServiceReviewPayload<ExtArgs>
        fields: Prisma.ServiceReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>
          }
          findFirst: {
            args: Prisma.ServiceReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>
          }
          findMany: {
            args: Prisma.ServiceReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>[]
          }
          create: {
            args: Prisma.ServiceReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>
          }
          createMany: {
            args: Prisma.ServiceReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>[]
          }
          delete: {
            args: Prisma.ServiceReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>
          }
          update: {
            args: Prisma.ServiceReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>
          }
          deleteMany: {
            args: Prisma.ServiceReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceReviewPayload>
          }
          aggregate: {
            args: Prisma.ServiceReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceReview>
          }
          groupBy: {
            args: Prisma.ServiceReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceReviewCountAggregateOutputType> | number
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
    mentorApplications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorApplications?: boolean | UserCountOutputTypeCountMentorApplicationsArgs
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
  export type UserCountOutputTypeCountMentorApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorApplicationWhereInput
  }


  /**
   * Count Type MentorProfileCountOutputType
   */

  export type MentorProfileCountOutputType = {
    services: number
    feedbackGiven: number
    resumes: number
  }

  export type MentorProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | MentorProfileCountOutputTypeCountServicesArgs
    feedbackGiven?: boolean | MentorProfileCountOutputTypeCountFeedbackGivenArgs
    resumes?: boolean | MentorProfileCountOutputTypeCountResumesArgs
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
  export type MentorProfileCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
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
  export type MentorProfileCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorResumeWhereInput
  }


  /**
   * Count Type MenteeProfileCountOutputType
   */

  export type MenteeProfileCountOutputType = {
    resumes: number
  }

  export type MenteeProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumes?: boolean | MenteeProfileCountOutputTypeCountResumesArgs
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
    where?: MenteeResumeWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    reviews: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | ServiceCountOutputTypeCountReviewsArgs
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
  export type ServiceCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceReviewWhereInput
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
    adminProfile?: boolean | User$adminProfileArgs<ExtArgs>
    mentorApplications?: boolean | User$mentorApplicationsArgs<ExtArgs>
    verification?: boolean | User$verificationArgs<ExtArgs>
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
    adminProfile?: boolean | User$adminProfileArgs<ExtArgs>
    mentorApplications?: boolean | User$mentorApplicationsArgs<ExtArgs>
    verification?: boolean | User$verificationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs> | null
      menteeProfile: Prisma.$MenteeProfilePayload<ExtArgs> | null
      adminProfile: Prisma.$AdminProfilePayload<ExtArgs> | null
      mentorApplications: Prisma.$MentorApplicationPayload<ExtArgs>[]
      verification: Prisma.$VerificationDocumentPayload<ExtArgs> | null
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
    adminProfile<T extends User$adminProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$adminProfileArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    mentorApplications<T extends User$mentorApplicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$mentorApplicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "findMany"> | Null>
    verification<T extends User$verificationArgs<ExtArgs> = {}>(args?: Subset<T, User$verificationArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * User.adminProfile
   */
  export type User$adminProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    where?: AdminProfileWhereInput
  }

  /**
   * User.mentorApplications
   */
  export type User$mentorApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    where?: MentorApplicationWhereInput
    orderBy?: MentorApplicationOrderByWithRelationInput | MentorApplicationOrderByWithRelationInput[]
    cursor?: MentorApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MentorApplicationScalarFieldEnum | MentorApplicationScalarFieldEnum[]
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
    rating: number | null
    totalReviews: number | null
    balance: number | null
    totalEarnings: number | null
    pendingEarnings: number | null
  }

  export type MentorProfileSumAggregateOutputType = {
    rating: number | null
    totalReviews: number | null
    balance: number | null
    totalEarnings: number | null
    pendingEarnings: number | null
  }

  export type MentorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    headline: string | null
    rating: number | null
    totalReviews: number | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedBadge: boolean | null
    phone: string | null
    gender: $Enums.Gender | null
    location: string | null
    balance: number | null
    totalEarnings: number | null
    pendingEarnings: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    headline: string | null
    rating: number | null
    totalReviews: number | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedBadge: boolean | null
    phone: string | null
    gender: $Enums.Gender | null
    location: string | null
    balance: number | null
    totalEarnings: number | null
    pendingEarnings: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileCountAggregateOutputType = {
    id: number
    userId: number
    bio: number
    headline: number
    expertise: number
    certifications: number
    rating: number
    totalReviews: number
    verificationStatus: number
    verifiedBadge: number
    phone: number
    gender: number
    location: number
    socialLinks: number
    verificationIds: number
    bachelors: number
    masters: number
    workExperience: number
    exams: number
    balance: number
    totalEarnings: number
    pendingEarnings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorProfileAvgAggregateInputType = {
    rating?: true
    totalReviews?: true
    balance?: true
    totalEarnings?: true
    pendingEarnings?: true
  }

  export type MentorProfileSumAggregateInputType = {
    rating?: true
    totalReviews?: true
    balance?: true
    totalEarnings?: true
    pendingEarnings?: true
  }

  export type MentorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    headline?: true
    rating?: true
    totalReviews?: true
    verificationStatus?: true
    verifiedBadge?: true
    phone?: true
    gender?: true
    location?: true
    balance?: true
    totalEarnings?: true
    pendingEarnings?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    headline?: true
    rating?: true
    totalReviews?: true
    verificationStatus?: true
    verifiedBadge?: true
    phone?: true
    gender?: true
    location?: true
    balance?: true
    totalEarnings?: true
    pendingEarnings?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    headline?: true
    expertise?: true
    certifications?: true
    rating?: true
    totalReviews?: true
    verificationStatus?: true
    verifiedBadge?: true
    phone?: true
    gender?: true
    location?: true
    socialLinks?: true
    verificationIds?: true
    bachelors?: true
    masters?: true
    workExperience?: true
    exams?: true
    balance?: true
    totalEarnings?: true
    pendingEarnings?: true
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
    headline: string | null
    expertise: string[]
    certifications: string[]
    rating: number
    totalReviews: number
    verificationStatus: $Enums.VerificationStatus
    verifiedBadge: boolean
    phone: string | null
    gender: $Enums.Gender | null
    location: string | null
    socialLinks: JsonValue | null
    verificationIds: string[]
    bachelors: string[]
    masters: string[]
    workExperience: JsonValue | null
    exams: JsonValue | null
    balance: number
    totalEarnings: number
    pendingEarnings: number
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
    headline?: boolean
    expertise?: boolean
    certifications?: boolean
    rating?: boolean
    totalReviews?: boolean
    verificationStatus?: boolean
    verifiedBadge?: boolean
    phone?: boolean
    gender?: boolean
    location?: boolean
    socialLinks?: boolean
    verificationIds?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    exams?: boolean
    balance?: boolean
    totalEarnings?: boolean
    pendingEarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | MentorProfile$servicesArgs<ExtArgs>
    feedbackGiven?: boolean | MentorProfile$feedbackGivenArgs<ExtArgs>
    resumes?: boolean | MentorProfile$resumesArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    headline?: boolean
    expertise?: boolean
    certifications?: boolean
    rating?: boolean
    totalReviews?: boolean
    verificationStatus?: boolean
    verifiedBadge?: boolean
    phone?: boolean
    gender?: boolean
    location?: boolean
    socialLinks?: boolean
    verificationIds?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    exams?: boolean
    balance?: boolean
    totalEarnings?: boolean
    pendingEarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    bio?: boolean
    headline?: boolean
    expertise?: boolean
    certifications?: boolean
    rating?: boolean
    totalReviews?: boolean
    verificationStatus?: boolean
    verifiedBadge?: boolean
    phone?: boolean
    gender?: boolean
    location?: boolean
    socialLinks?: boolean
    verificationIds?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    exams?: boolean
    balance?: boolean
    totalEarnings?: boolean
    pendingEarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | MentorProfile$servicesArgs<ExtArgs>
    feedbackGiven?: boolean | MentorProfile$feedbackGivenArgs<ExtArgs>
    resumes?: boolean | MentorProfile$resumesArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MentorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MentorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      services: Prisma.$ServicePayload<ExtArgs>[]
      feedbackGiven: Prisma.$MentorFeedbackPayload<ExtArgs>[]
      resumes: Prisma.$MentorResumePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      bio: string
      headline: string | null
      expertise: string[]
      certifications: string[]
      rating: number
      totalReviews: number
      verificationStatus: $Enums.VerificationStatus
      verifiedBadge: boolean
      phone: string | null
      gender: $Enums.Gender | null
      location: string | null
      socialLinks: Prisma.JsonValue | null
      verificationIds: string[]
      bachelors: string[]
      masters: string[]
      workExperience: Prisma.JsonValue | null
      exams: Prisma.JsonValue | null
      balance: number
      totalEarnings: number
      pendingEarnings: number
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
    services<T extends MentorProfile$servicesArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany"> | Null>
    feedbackGiven<T extends MentorProfile$feedbackGivenArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$feedbackGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorFeedbackPayload<ExtArgs>, T, "findMany"> | Null>
    resumes<T extends MentorProfile$resumesArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly headline: FieldRef<"MentorProfile", 'String'>
    readonly expertise: FieldRef<"MentorProfile", 'String[]'>
    readonly certifications: FieldRef<"MentorProfile", 'String[]'>
    readonly rating: FieldRef<"MentorProfile", 'Float'>
    readonly totalReviews: FieldRef<"MentorProfile", 'Int'>
    readonly verificationStatus: FieldRef<"MentorProfile", 'VerificationStatus'>
    readonly verifiedBadge: FieldRef<"MentorProfile", 'Boolean'>
    readonly phone: FieldRef<"MentorProfile", 'String'>
    readonly gender: FieldRef<"MentorProfile", 'Gender'>
    readonly location: FieldRef<"MentorProfile", 'String'>
    readonly socialLinks: FieldRef<"MentorProfile", 'Json'>
    readonly verificationIds: FieldRef<"MentorProfile", 'String[]'>
    readonly bachelors: FieldRef<"MentorProfile", 'String[]'>
    readonly masters: FieldRef<"MentorProfile", 'String[]'>
    readonly workExperience: FieldRef<"MentorProfile", 'Json'>
    readonly exams: FieldRef<"MentorProfile", 'Json'>
    readonly balance: FieldRef<"MentorProfile", 'Float'>
    readonly totalEarnings: FieldRef<"MentorProfile", 'Float'>
    readonly pendingEarnings: FieldRef<"MentorProfile", 'Float'>
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
   * MentorProfile.services
   */
  export type MentorProfile$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
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
   * MentorProfile.resumes
   */
  export type MentorProfile$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    where?: MentorResumeWhereInput
    orderBy?: MentorResumeOrderByWithRelationInput | MentorResumeOrderByWithRelationInput[]
    cursor?: MentorResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MentorResumeScalarFieldEnum | MentorResumeScalarFieldEnum[]
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
    _min: MenteeProfileMinAggregateOutputType | null
    _max: MenteeProfileMaxAggregateOutputType | null
  }

  export type MenteeProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dob: Date | null
    phone: string | null
    location: string | null
    gender: $Enums.Gender | null
    workExperience: string | null
    expectations: string | null
    targetColleges: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dob: Date | null
    phone: string | null
    location: string | null
    gender: $Enums.Gender | null
    workExperience: string | null
    expectations: string | null
    targetColleges: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileCountAggregateOutputType = {
    id: number
    userId: number
    dob: number
    phone: number
    location: number
    gender: number
    bachelors: number
    masters: number
    workExperience: number
    certifications: number
    catAttempts: number
    expectations: number
    targetColleges: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MenteeProfileMinAggregateInputType = {
    id?: true
    userId?: true
    dob?: true
    phone?: true
    location?: true
    gender?: true
    workExperience?: true
    expectations?: true
    targetColleges?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    dob?: true
    phone?: true
    location?: true
    gender?: true
    workExperience?: true
    expectations?: true
    targetColleges?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    dob?: true
    phone?: true
    location?: true
    gender?: true
    bachelors?: true
    masters?: true
    workExperience?: true
    certifications?: true
    catAttempts?: true
    expectations?: true
    targetColleges?: true
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
    _min?: MenteeProfileMinAggregateInputType
    _max?: MenteeProfileMaxAggregateInputType
  }

  export type MenteeProfileGroupByOutputType = {
    id: string
    userId: string
    dob: Date | null
    phone: string | null
    location: string | null
    gender: $Enums.Gender | null
    bachelors: string[]
    masters: string[]
    workExperience: string | null
    certifications: string[]
    catAttempts: JsonValue | null
    expectations: string | null
    targetColleges: string | null
    createdAt: Date
    updatedAt: Date
    _count: MenteeProfileCountAggregateOutputType | null
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
    phone?: boolean
    location?: boolean
    gender?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    certifications?: boolean
    catAttempts?: boolean
    expectations?: boolean
    targetColleges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resumes?: boolean | MenteeProfile$resumesArgs<ExtArgs>
    _count?: boolean | MenteeProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dob?: boolean
    phone?: boolean
    location?: boolean
    gender?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    certifications?: boolean
    catAttempts?: boolean
    expectations?: boolean
    targetColleges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    dob?: boolean
    phone?: boolean
    location?: boolean
    gender?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    certifications?: boolean
    catAttempts?: boolean
    expectations?: boolean
    targetColleges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MenteeProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resumes?: boolean | MenteeProfile$resumesArgs<ExtArgs>
    _count?: boolean | MenteeProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenteeProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MenteeProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenteeProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      resumes: Prisma.$MenteeResumePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dob: Date | null
      phone: string | null
      location: string | null
      gender: $Enums.Gender | null
      bachelors: string[]
      masters: string[]
      workExperience: string | null
      certifications: string[]
      catAttempts: Prisma.JsonValue | null
      expectations: string | null
      targetColleges: string | null
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
    resumes<T extends MenteeProfile$resumesArgs<ExtArgs> = {}>(args?: Subset<T, MenteeProfile$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly phone: FieldRef<"MenteeProfile", 'String'>
    readonly location: FieldRef<"MenteeProfile", 'String'>
    readonly gender: FieldRef<"MenteeProfile", 'Gender'>
    readonly bachelors: FieldRef<"MenteeProfile", 'String[]'>
    readonly masters: FieldRef<"MenteeProfile", 'String[]'>
    readonly workExperience: FieldRef<"MenteeProfile", 'String'>
    readonly certifications: FieldRef<"MenteeProfile", 'String[]'>
    readonly catAttempts: FieldRef<"MenteeProfile", 'Json'>
    readonly expectations: FieldRef<"MenteeProfile", 'String'>
    readonly targetColleges: FieldRef<"MenteeProfile", 'String'>
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
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    where?: MenteeResumeWhereInput
    orderBy?: MenteeResumeOrderByWithRelationInput | MenteeResumeOrderByWithRelationInput[]
    cursor?: MenteeResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenteeResumeScalarFieldEnum | MenteeResumeScalarFieldEnum[]
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
   * Model AdminProfile
   */

  export type AggregateAdminProfile = {
    _count: AdminProfileCountAggregateOutputType | null
    _min: AdminProfileMinAggregateOutputType | null
    _max: AdminProfileMaxAggregateOutputType | null
  }

  export type AdminProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminProfileCountAggregateOutputType = {
    id: number
    userId: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminProfileMinAggregateInputType = {
    id?: true
    userId?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminProfileCountAggregateInputType = {
    id?: true
    userId?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminProfile to aggregate.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminProfiles
    **/
    _count?: true | AdminProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminProfileMaxAggregateInputType
  }

  export type GetAdminProfileAggregateType<T extends AdminProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminProfile[P]>
      : GetScalarType<T[P], AggregateAdminProfile[P]>
  }




  export type AdminProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminProfileWhereInput
    orderBy?: AdminProfileOrderByWithAggregationInput | AdminProfileOrderByWithAggregationInput[]
    by: AdminProfileScalarFieldEnum[] | AdminProfileScalarFieldEnum
    having?: AdminProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminProfileCountAggregateInputType | true
    _min?: AdminProfileMinAggregateInputType
    _max?: AdminProfileMaxAggregateInputType
  }

  export type AdminProfileGroupByOutputType = {
    id: string
    userId: string
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminProfileCountAggregateOutputType | null
    _min: AdminProfileMinAggregateOutputType | null
    _max: AdminProfileMaxAggregateOutputType | null
  }

  type GetAdminProfileGroupByPayload<T extends AdminProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AdminProfileGroupByOutputType[P]>
        }
      >
    >


  export type AdminProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminProfile"]>
    composites: {}
  }

  type AdminProfileGetPayload<S extends boolean | null | undefined | AdminProfileDefaultArgs> = $Result.GetResult<Prisma.$AdminProfilePayload, S>

  type AdminProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminProfileCountAggregateInputType | true
    }

  export interface AdminProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminProfile'], meta: { name: 'AdminProfile' } }
    /**
     * Find zero or one AdminProfile that matches the filter.
     * @param {AdminProfileFindUniqueArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminProfileFindUniqueArgs>(args: SelectSubset<T, AdminProfileFindUniqueArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminProfileFindUniqueOrThrowArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindFirstArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminProfileFindFirstArgs>(args?: SelectSubset<T, AdminProfileFindFirstArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindFirstOrThrowArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminProfiles
     * const adminProfiles = await prisma.adminProfile.findMany()
     * 
     * // Get first 10 AdminProfiles
     * const adminProfiles = await prisma.adminProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminProfileWithIdOnly = await prisma.adminProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminProfileFindManyArgs>(args?: SelectSubset<T, AdminProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminProfile.
     * @param {AdminProfileCreateArgs} args - Arguments to create a AdminProfile.
     * @example
     * // Create one AdminProfile
     * const AdminProfile = await prisma.adminProfile.create({
     *   data: {
     *     // ... data to create a AdminProfile
     *   }
     * })
     * 
     */
    create<T extends AdminProfileCreateArgs>(args: SelectSubset<T, AdminProfileCreateArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminProfiles.
     * @param {AdminProfileCreateManyArgs} args - Arguments to create many AdminProfiles.
     * @example
     * // Create many AdminProfiles
     * const adminProfile = await prisma.adminProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminProfileCreateManyArgs>(args?: SelectSubset<T, AdminProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminProfiles and returns the data saved in the database.
     * @param {AdminProfileCreateManyAndReturnArgs} args - Arguments to create many AdminProfiles.
     * @example
     * // Create many AdminProfiles
     * const adminProfile = await prisma.adminProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminProfiles and only return the `id`
     * const adminProfileWithIdOnly = await prisma.adminProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminProfile.
     * @param {AdminProfileDeleteArgs} args - Arguments to delete one AdminProfile.
     * @example
     * // Delete one AdminProfile
     * const AdminProfile = await prisma.adminProfile.delete({
     *   where: {
     *     // ... filter to delete one AdminProfile
     *   }
     * })
     * 
     */
    delete<T extends AdminProfileDeleteArgs>(args: SelectSubset<T, AdminProfileDeleteArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminProfile.
     * @param {AdminProfileUpdateArgs} args - Arguments to update one AdminProfile.
     * @example
     * // Update one AdminProfile
     * const adminProfile = await prisma.adminProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminProfileUpdateArgs>(args: SelectSubset<T, AdminProfileUpdateArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminProfiles.
     * @param {AdminProfileDeleteManyArgs} args - Arguments to filter AdminProfiles to delete.
     * @example
     * // Delete a few AdminProfiles
     * const { count } = await prisma.adminProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminProfileDeleteManyArgs>(args?: SelectSubset<T, AdminProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminProfiles
     * const adminProfile = await prisma.adminProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminProfileUpdateManyArgs>(args: SelectSubset<T, AdminProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminProfile.
     * @param {AdminProfileUpsertArgs} args - Arguments to update or create a AdminProfile.
     * @example
     * // Update or create a AdminProfile
     * const adminProfile = await prisma.adminProfile.upsert({
     *   create: {
     *     // ... data to create a AdminProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminProfile we want to update
     *   }
     * })
     */
    upsert<T extends AdminProfileUpsertArgs>(args: SelectSubset<T, AdminProfileUpsertArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileCountArgs} args - Arguments to filter AdminProfiles to count.
     * @example
     * // Count the number of AdminProfiles
     * const count = await prisma.adminProfile.count({
     *   where: {
     *     // ... the filter for the AdminProfiles we want to count
     *   }
     * })
    **/
    count<T extends AdminProfileCountArgs>(
      args?: Subset<T, AdminProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminProfileAggregateArgs>(args: Subset<T, AdminProfileAggregateArgs>): Prisma.PrismaPromise<GetAdminProfileAggregateType<T>>

    /**
     * Group by AdminProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileGroupByArgs} args - Group by arguments.
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
      T extends AdminProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminProfileGroupByArgs['orderBy'] }
        : { orderBy?: AdminProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminProfile model
   */
  readonly fields: AdminProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AdminProfile model
   */ 
  interface AdminProfileFieldRefs {
    readonly id: FieldRef<"AdminProfile", 'String'>
    readonly userId: FieldRef<"AdminProfile", 'String'>
    readonly lastLoginAt: FieldRef<"AdminProfile", 'DateTime'>
    readonly createdAt: FieldRef<"AdminProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminProfile findUnique
   */
  export type AdminProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile findUniqueOrThrow
   */
  export type AdminProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile findFirst
   */
  export type AdminProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminProfiles.
     */
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile findFirstOrThrow
   */
  export type AdminProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminProfiles.
     */
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile findMany
   */
  export type AdminProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfiles to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile create
   */
  export type AdminProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminProfile.
     */
    data: XOR<AdminProfileCreateInput, AdminProfileUncheckedCreateInput>
  }

  /**
   * AdminProfile createMany
   */
  export type AdminProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminProfiles.
     */
    data: AdminProfileCreateManyInput | AdminProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminProfile createManyAndReturn
   */
  export type AdminProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminProfiles.
     */
    data: AdminProfileCreateManyInput | AdminProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminProfile update
   */
  export type AdminProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminProfile.
     */
    data: XOR<AdminProfileUpdateInput, AdminProfileUncheckedUpdateInput>
    /**
     * Choose, which AdminProfile to update.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile updateMany
   */
  export type AdminProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminProfiles.
     */
    data: XOR<AdminProfileUpdateManyMutationInput, AdminProfileUncheckedUpdateManyInput>
    /**
     * Filter which AdminProfiles to update
     */
    where?: AdminProfileWhereInput
  }

  /**
   * AdminProfile upsert
   */
  export type AdminProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminProfile to update in case it exists.
     */
    where: AdminProfileWhereUniqueInput
    /**
     * In case the AdminProfile found by the `where` argument doesn't exist, create a new AdminProfile with this data.
     */
    create: XOR<AdminProfileCreateInput, AdminProfileUncheckedCreateInput>
    /**
     * In case the AdminProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminProfileUpdateInput, AdminProfileUncheckedUpdateInput>
  }

  /**
   * AdminProfile delete
   */
  export type AdminProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter which AdminProfile to delete.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile deleteMany
   */
  export type AdminProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminProfiles to delete
     */
    where?: AdminProfileWhereInput
  }

  /**
   * AdminProfile without action
   */
  export type AdminProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
  }


  /**
   * Model MentorApplication
   */

  export type AggregateMentorApplication = {
    _count: MentorApplicationCountAggregateOutputType | null
    _min: MentorApplicationMinAggregateOutputType | null
    _max: MentorApplicationMaxAggregateOutputType | null
  }

  export type MentorApplicationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    headline: string | null
    phone: string | null
    gender: $Enums.Gender | null
    location: string | null
    status: $Enums.ApplicationStatus | null
    rejectionReason: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorApplicationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    bio: string | null
    headline: string | null
    phone: string | null
    gender: $Enums.Gender | null
    location: string | null
    status: $Enums.ApplicationStatus | null
    rejectionReason: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorApplicationCountAggregateOutputType = {
    id: number
    userId: number
    bio: number
    headline: number
    phone: number
    gender: number
    location: number
    socialLinks: number
    verificationIds: number
    expertise: number
    bachelors: number
    masters: number
    workExperience: number
    exams: number
    certifications: number
    resumes: number
    status: number
    rejectionReason: number
    reviewedAt: number
    reviewedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorApplicationMinAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    headline?: true
    phone?: true
    gender?: true
    location?: true
    status?: true
    rejectionReason?: true
    reviewedAt?: true
    reviewedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorApplicationMaxAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    headline?: true
    phone?: true
    gender?: true
    location?: true
    status?: true
    rejectionReason?: true
    reviewedAt?: true
    reviewedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorApplicationCountAggregateInputType = {
    id?: true
    userId?: true
    bio?: true
    headline?: true
    phone?: true
    gender?: true
    location?: true
    socialLinks?: true
    verificationIds?: true
    expertise?: true
    bachelors?: true
    masters?: true
    workExperience?: true
    exams?: true
    certifications?: true
    resumes?: true
    status?: true
    rejectionReason?: true
    reviewedAt?: true
    reviewedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MentorApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorApplication to aggregate.
     */
    where?: MentorApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorApplications to fetch.
     */
    orderBy?: MentorApplicationOrderByWithRelationInput | MentorApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorApplications
    **/
    _count?: true | MentorApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorApplicationMaxAggregateInputType
  }

  export type GetMentorApplicationAggregateType<T extends MentorApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorApplication[P]>
      : GetScalarType<T[P], AggregateMentorApplication[P]>
  }




  export type MentorApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorApplicationWhereInput
    orderBy?: MentorApplicationOrderByWithAggregationInput | MentorApplicationOrderByWithAggregationInput[]
    by: MentorApplicationScalarFieldEnum[] | MentorApplicationScalarFieldEnum
    having?: MentorApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorApplicationCountAggregateInputType | true
    _min?: MentorApplicationMinAggregateInputType
    _max?: MentorApplicationMaxAggregateInputType
  }

  export type MentorApplicationGroupByOutputType = {
    id: string
    userId: string
    bio: string
    headline: string | null
    phone: string | null
    gender: $Enums.Gender | null
    location: string | null
    socialLinks: JsonValue | null
    verificationIds: string[]
    expertise: string[]
    bachelors: string[]
    masters: string[]
    workExperience: JsonValue | null
    exams: JsonValue | null
    certifications: string[]
    resumes: JsonValue | null
    status: $Enums.ApplicationStatus
    rejectionReason: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: MentorApplicationCountAggregateOutputType | null
    _min: MentorApplicationMinAggregateOutputType | null
    _max: MentorApplicationMaxAggregateOutputType | null
  }

  type GetMentorApplicationGroupByPayload<T extends MentorApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], MentorApplicationGroupByOutputType[P]>
        }
      >
    >


  export type MentorApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    headline?: boolean
    phone?: boolean
    gender?: boolean
    location?: boolean
    socialLinks?: boolean
    verificationIds?: boolean
    expertise?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    exams?: boolean
    certifications?: boolean
    resumes?: boolean
    status?: boolean
    rejectionReason?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorApplication"]>

  export type MentorApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bio?: boolean
    headline?: boolean
    phone?: boolean
    gender?: boolean
    location?: boolean
    socialLinks?: boolean
    verificationIds?: boolean
    expertise?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    exams?: boolean
    certifications?: boolean
    resumes?: boolean
    status?: boolean
    rejectionReason?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorApplication"]>

  export type MentorApplicationSelectScalar = {
    id?: boolean
    userId?: boolean
    bio?: boolean
    headline?: boolean
    phone?: boolean
    gender?: boolean
    location?: boolean
    socialLinks?: boolean
    verificationIds?: boolean
    expertise?: boolean
    bachelors?: boolean
    masters?: boolean
    workExperience?: boolean
    exams?: boolean
    certifications?: boolean
    resumes?: boolean
    status?: boolean
    rejectionReason?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MentorApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MentorApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorApplication"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      bio: string
      headline: string | null
      phone: string | null
      gender: $Enums.Gender | null
      location: string | null
      socialLinks: Prisma.JsonValue | null
      verificationIds: string[]
      expertise: string[]
      bachelors: string[]
      masters: string[]
      workExperience: Prisma.JsonValue | null
      exams: Prisma.JsonValue | null
      certifications: string[]
      resumes: Prisma.JsonValue | null
      status: $Enums.ApplicationStatus
      rejectionReason: string | null
      reviewedAt: Date | null
      reviewedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mentorApplication"]>
    composites: {}
  }

  type MentorApplicationGetPayload<S extends boolean | null | undefined | MentorApplicationDefaultArgs> = $Result.GetResult<Prisma.$MentorApplicationPayload, S>

  type MentorApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorApplicationCountAggregateInputType | true
    }

  export interface MentorApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorApplication'], meta: { name: 'MentorApplication' } }
    /**
     * Find zero or one MentorApplication that matches the filter.
     * @param {MentorApplicationFindUniqueArgs} args - Arguments to find a MentorApplication
     * @example
     * // Get one MentorApplication
     * const mentorApplication = await prisma.mentorApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorApplicationFindUniqueArgs>(args: SelectSubset<T, MentorApplicationFindUniqueArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorApplication that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorApplicationFindUniqueOrThrowArgs} args - Arguments to find a MentorApplication
     * @example
     * // Get one MentorApplication
     * const mentorApplication = await prisma.mentorApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationFindFirstArgs} args - Arguments to find a MentorApplication
     * @example
     * // Get one MentorApplication
     * const mentorApplication = await prisma.mentorApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorApplicationFindFirstArgs>(args?: SelectSubset<T, MentorApplicationFindFirstArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationFindFirstOrThrowArgs} args - Arguments to find a MentorApplication
     * @example
     * // Get one MentorApplication
     * const mentorApplication = await prisma.mentorApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorApplications
     * const mentorApplications = await prisma.mentorApplication.findMany()
     * 
     * // Get first 10 MentorApplications
     * const mentorApplications = await prisma.mentorApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorApplicationWithIdOnly = await prisma.mentorApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorApplicationFindManyArgs>(args?: SelectSubset<T, MentorApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorApplication.
     * @param {MentorApplicationCreateArgs} args - Arguments to create a MentorApplication.
     * @example
     * // Create one MentorApplication
     * const MentorApplication = await prisma.mentorApplication.create({
     *   data: {
     *     // ... data to create a MentorApplication
     *   }
     * })
     * 
     */
    create<T extends MentorApplicationCreateArgs>(args: SelectSubset<T, MentorApplicationCreateArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorApplications.
     * @param {MentorApplicationCreateManyArgs} args - Arguments to create many MentorApplications.
     * @example
     * // Create many MentorApplications
     * const mentorApplication = await prisma.mentorApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorApplicationCreateManyArgs>(args?: SelectSubset<T, MentorApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorApplications and returns the data saved in the database.
     * @param {MentorApplicationCreateManyAndReturnArgs} args - Arguments to create many MentorApplications.
     * @example
     * // Create many MentorApplications
     * const mentorApplication = await prisma.mentorApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorApplications and only return the `id`
     * const mentorApplicationWithIdOnly = await prisma.mentorApplication.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorApplication.
     * @param {MentorApplicationDeleteArgs} args - Arguments to delete one MentorApplication.
     * @example
     * // Delete one MentorApplication
     * const MentorApplication = await prisma.mentorApplication.delete({
     *   where: {
     *     // ... filter to delete one MentorApplication
     *   }
     * })
     * 
     */
    delete<T extends MentorApplicationDeleteArgs>(args: SelectSubset<T, MentorApplicationDeleteArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorApplication.
     * @param {MentorApplicationUpdateArgs} args - Arguments to update one MentorApplication.
     * @example
     * // Update one MentorApplication
     * const mentorApplication = await prisma.mentorApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorApplicationUpdateArgs>(args: SelectSubset<T, MentorApplicationUpdateArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorApplications.
     * @param {MentorApplicationDeleteManyArgs} args - Arguments to filter MentorApplications to delete.
     * @example
     * // Delete a few MentorApplications
     * const { count } = await prisma.mentorApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorApplicationDeleteManyArgs>(args?: SelectSubset<T, MentorApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorApplications
     * const mentorApplication = await prisma.mentorApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorApplicationUpdateManyArgs>(args: SelectSubset<T, MentorApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorApplication.
     * @param {MentorApplicationUpsertArgs} args - Arguments to update or create a MentorApplication.
     * @example
     * // Update or create a MentorApplication
     * const mentorApplication = await prisma.mentorApplication.upsert({
     *   create: {
     *     // ... data to create a MentorApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorApplication we want to update
     *   }
     * })
     */
    upsert<T extends MentorApplicationUpsertArgs>(args: SelectSubset<T, MentorApplicationUpsertArgs<ExtArgs>>): Prisma__MentorApplicationClient<$Result.GetResult<Prisma.$MentorApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationCountArgs} args - Arguments to filter MentorApplications to count.
     * @example
     * // Count the number of MentorApplications
     * const count = await prisma.mentorApplication.count({
     *   where: {
     *     // ... the filter for the MentorApplications we want to count
     *   }
     * })
    **/
    count<T extends MentorApplicationCountArgs>(
      args?: Subset<T, MentorApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MentorApplicationAggregateArgs>(args: Subset<T, MentorApplicationAggregateArgs>): Prisma.PrismaPromise<GetMentorApplicationAggregateType<T>>

    /**
     * Group by MentorApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorApplicationGroupByArgs} args - Group by arguments.
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
      T extends MentorApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorApplicationGroupByArgs['orderBy'] }
        : { orderBy?: MentorApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MentorApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorApplication model
   */
  readonly fields: MentorApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MentorApplication model
   */ 
  interface MentorApplicationFieldRefs {
    readonly id: FieldRef<"MentorApplication", 'String'>
    readonly userId: FieldRef<"MentorApplication", 'String'>
    readonly bio: FieldRef<"MentorApplication", 'String'>
    readonly headline: FieldRef<"MentorApplication", 'String'>
    readonly phone: FieldRef<"MentorApplication", 'String'>
    readonly gender: FieldRef<"MentorApplication", 'Gender'>
    readonly location: FieldRef<"MentorApplication", 'String'>
    readonly socialLinks: FieldRef<"MentorApplication", 'Json'>
    readonly verificationIds: FieldRef<"MentorApplication", 'String[]'>
    readonly expertise: FieldRef<"MentorApplication", 'String[]'>
    readonly bachelors: FieldRef<"MentorApplication", 'String[]'>
    readonly masters: FieldRef<"MentorApplication", 'String[]'>
    readonly workExperience: FieldRef<"MentorApplication", 'Json'>
    readonly exams: FieldRef<"MentorApplication", 'Json'>
    readonly certifications: FieldRef<"MentorApplication", 'String[]'>
    readonly resumes: FieldRef<"MentorApplication", 'Json'>
    readonly status: FieldRef<"MentorApplication", 'ApplicationStatus'>
    readonly rejectionReason: FieldRef<"MentorApplication", 'String'>
    readonly reviewedAt: FieldRef<"MentorApplication", 'DateTime'>
    readonly reviewedBy: FieldRef<"MentorApplication", 'String'>
    readonly createdAt: FieldRef<"MentorApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"MentorApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorApplication findUnique
   */
  export type MentorApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * Filter, which MentorApplication to fetch.
     */
    where: MentorApplicationWhereUniqueInput
  }

  /**
   * MentorApplication findUniqueOrThrow
   */
  export type MentorApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * Filter, which MentorApplication to fetch.
     */
    where: MentorApplicationWhereUniqueInput
  }

  /**
   * MentorApplication findFirst
   */
  export type MentorApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * Filter, which MentorApplication to fetch.
     */
    where?: MentorApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorApplications to fetch.
     */
    orderBy?: MentorApplicationOrderByWithRelationInput | MentorApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorApplications.
     */
    cursor?: MentorApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorApplications.
     */
    distinct?: MentorApplicationScalarFieldEnum | MentorApplicationScalarFieldEnum[]
  }

  /**
   * MentorApplication findFirstOrThrow
   */
  export type MentorApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * Filter, which MentorApplication to fetch.
     */
    where?: MentorApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorApplications to fetch.
     */
    orderBy?: MentorApplicationOrderByWithRelationInput | MentorApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorApplications.
     */
    cursor?: MentorApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorApplications.
     */
    distinct?: MentorApplicationScalarFieldEnum | MentorApplicationScalarFieldEnum[]
  }

  /**
   * MentorApplication findMany
   */
  export type MentorApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * Filter, which MentorApplications to fetch.
     */
    where?: MentorApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorApplications to fetch.
     */
    orderBy?: MentorApplicationOrderByWithRelationInput | MentorApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorApplications.
     */
    cursor?: MentorApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorApplications.
     */
    skip?: number
    distinct?: MentorApplicationScalarFieldEnum | MentorApplicationScalarFieldEnum[]
  }

  /**
   * MentorApplication create
   */
  export type MentorApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a MentorApplication.
     */
    data: XOR<MentorApplicationCreateInput, MentorApplicationUncheckedCreateInput>
  }

  /**
   * MentorApplication createMany
   */
  export type MentorApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorApplications.
     */
    data: MentorApplicationCreateManyInput | MentorApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorApplication createManyAndReturn
   */
  export type MentorApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorApplications.
     */
    data: MentorApplicationCreateManyInput | MentorApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MentorApplication update
   */
  export type MentorApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a MentorApplication.
     */
    data: XOR<MentorApplicationUpdateInput, MentorApplicationUncheckedUpdateInput>
    /**
     * Choose, which MentorApplication to update.
     */
    where: MentorApplicationWhereUniqueInput
  }

  /**
   * MentorApplication updateMany
   */
  export type MentorApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorApplications.
     */
    data: XOR<MentorApplicationUpdateManyMutationInput, MentorApplicationUncheckedUpdateManyInput>
    /**
     * Filter which MentorApplications to update
     */
    where?: MentorApplicationWhereInput
  }

  /**
   * MentorApplication upsert
   */
  export type MentorApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the MentorApplication to update in case it exists.
     */
    where: MentorApplicationWhereUniqueInput
    /**
     * In case the MentorApplication found by the `where` argument doesn't exist, create a new MentorApplication with this data.
     */
    create: XOR<MentorApplicationCreateInput, MentorApplicationUncheckedCreateInput>
    /**
     * In case the MentorApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorApplicationUpdateInput, MentorApplicationUncheckedUpdateInput>
  }

  /**
   * MentorApplication delete
   */
  export type MentorApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
    /**
     * Filter which MentorApplication to delete.
     */
    where: MentorApplicationWhereUniqueInput
  }

  /**
   * MentorApplication deleteMany
   */
  export type MentorApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorApplications to delete
     */
    where?: MentorApplicationWhereInput
  }

  /**
   * MentorApplication without action
   */
  export type MentorApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorApplication
     */
    select?: MentorApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorApplicationInclude<ExtArgs> | null
  }


  /**
   * Model MenteeResume
   */

  export type AggregateMenteeResume = {
    _count: MenteeResumeCountAggregateOutputType | null
    _min: MenteeResumeMinAggregateOutputType | null
    _max: MenteeResumeMaxAggregateOutputType | null
  }

  export type MenteeResumeMinAggregateOutputType = {
    id: string | null
    menteeId: string | null
    name: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type MenteeResumeMaxAggregateOutputType = {
    id: string | null
    menteeId: string | null
    name: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type MenteeResumeCountAggregateOutputType = {
    id: number
    menteeId: number
    name: number
    fileUrl: number
    createdAt: number
    _all: number
  }


  export type MenteeResumeMinAggregateInputType = {
    id?: true
    menteeId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
  }

  export type MenteeResumeMaxAggregateInputType = {
    id?: true
    menteeId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
  }

  export type MenteeResumeCountAggregateInputType = {
    id?: true
    menteeId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
    _all?: true
  }

  export type MenteeResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenteeResume to aggregate.
     */
    where?: MenteeResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeResumes to fetch.
     */
    orderBy?: MenteeResumeOrderByWithRelationInput | MenteeResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenteeResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenteeResumes
    **/
    _count?: true | MenteeResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenteeResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenteeResumeMaxAggregateInputType
  }

  export type GetMenteeResumeAggregateType<T extends MenteeResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateMenteeResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenteeResume[P]>
      : GetScalarType<T[P], AggregateMenteeResume[P]>
  }




  export type MenteeResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenteeResumeWhereInput
    orderBy?: MenteeResumeOrderByWithAggregationInput | MenteeResumeOrderByWithAggregationInput[]
    by: MenteeResumeScalarFieldEnum[] | MenteeResumeScalarFieldEnum
    having?: MenteeResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenteeResumeCountAggregateInputType | true
    _min?: MenteeResumeMinAggregateInputType
    _max?: MenteeResumeMaxAggregateInputType
  }

  export type MenteeResumeGroupByOutputType = {
    id: string
    menteeId: string
    name: string
    fileUrl: string
    createdAt: Date
    _count: MenteeResumeCountAggregateOutputType | null
    _min: MenteeResumeMinAggregateOutputType | null
    _max: MenteeResumeMaxAggregateOutputType | null
  }

  type GetMenteeResumeGroupByPayload<T extends MenteeResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenteeResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenteeResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenteeResumeGroupByOutputType[P]>
            : GetScalarType<T[P], MenteeResumeGroupByOutputType[P]>
        }
      >
    >


  export type MenteeResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeResume"]>

  export type MenteeResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menteeId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeResume"]>

  export type MenteeResumeSelectScalar = {
    id?: boolean
    menteeId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
  }

  export type MenteeResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }
  export type MenteeResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentee?: boolean | MenteeProfileDefaultArgs<ExtArgs>
  }

  export type $MenteeResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenteeResume"
    objects: {
      mentee: Prisma.$MenteeProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menteeId: string
      name: string
      fileUrl: string
      createdAt: Date
    }, ExtArgs["result"]["menteeResume"]>
    composites: {}
  }

  type MenteeResumeGetPayload<S extends boolean | null | undefined | MenteeResumeDefaultArgs> = $Result.GetResult<Prisma.$MenteeResumePayload, S>

  type MenteeResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MenteeResumeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MenteeResumeCountAggregateInputType | true
    }

  export interface MenteeResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenteeResume'], meta: { name: 'MenteeResume' } }
    /**
     * Find zero or one MenteeResume that matches the filter.
     * @param {MenteeResumeFindUniqueArgs} args - Arguments to find a MenteeResume
     * @example
     * // Get one MenteeResume
     * const menteeResume = await prisma.menteeResume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenteeResumeFindUniqueArgs>(args: SelectSubset<T, MenteeResumeFindUniqueArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MenteeResume that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MenteeResumeFindUniqueOrThrowArgs} args - Arguments to find a MenteeResume
     * @example
     * // Get one MenteeResume
     * const menteeResume = await prisma.menteeResume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenteeResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, MenteeResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MenteeResume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeFindFirstArgs} args - Arguments to find a MenteeResume
     * @example
     * // Get one MenteeResume
     * const menteeResume = await prisma.menteeResume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenteeResumeFindFirstArgs>(args?: SelectSubset<T, MenteeResumeFindFirstArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MenteeResume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeFindFirstOrThrowArgs} args - Arguments to find a MenteeResume
     * @example
     * // Get one MenteeResume
     * const menteeResume = await prisma.menteeResume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenteeResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, MenteeResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MenteeResumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenteeResumes
     * const menteeResumes = await prisma.menteeResume.findMany()
     * 
     * // Get first 10 MenteeResumes
     * const menteeResumes = await prisma.menteeResume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menteeResumeWithIdOnly = await prisma.menteeResume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenteeResumeFindManyArgs>(args?: SelectSubset<T, MenteeResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MenteeResume.
     * @param {MenteeResumeCreateArgs} args - Arguments to create a MenteeResume.
     * @example
     * // Create one MenteeResume
     * const MenteeResume = await prisma.menteeResume.create({
     *   data: {
     *     // ... data to create a MenteeResume
     *   }
     * })
     * 
     */
    create<T extends MenteeResumeCreateArgs>(args: SelectSubset<T, MenteeResumeCreateArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MenteeResumes.
     * @param {MenteeResumeCreateManyArgs} args - Arguments to create many MenteeResumes.
     * @example
     * // Create many MenteeResumes
     * const menteeResume = await prisma.menteeResume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenteeResumeCreateManyArgs>(args?: SelectSubset<T, MenteeResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenteeResumes and returns the data saved in the database.
     * @param {MenteeResumeCreateManyAndReturnArgs} args - Arguments to create many MenteeResumes.
     * @example
     * // Create many MenteeResumes
     * const menteeResume = await prisma.menteeResume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenteeResumes and only return the `id`
     * const menteeResumeWithIdOnly = await prisma.menteeResume.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenteeResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, MenteeResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MenteeResume.
     * @param {MenteeResumeDeleteArgs} args - Arguments to delete one MenteeResume.
     * @example
     * // Delete one MenteeResume
     * const MenteeResume = await prisma.menteeResume.delete({
     *   where: {
     *     // ... filter to delete one MenteeResume
     *   }
     * })
     * 
     */
    delete<T extends MenteeResumeDeleteArgs>(args: SelectSubset<T, MenteeResumeDeleteArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MenteeResume.
     * @param {MenteeResumeUpdateArgs} args - Arguments to update one MenteeResume.
     * @example
     * // Update one MenteeResume
     * const menteeResume = await prisma.menteeResume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenteeResumeUpdateArgs>(args: SelectSubset<T, MenteeResumeUpdateArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MenteeResumes.
     * @param {MenteeResumeDeleteManyArgs} args - Arguments to filter MenteeResumes to delete.
     * @example
     * // Delete a few MenteeResumes
     * const { count } = await prisma.menteeResume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenteeResumeDeleteManyArgs>(args?: SelectSubset<T, MenteeResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenteeResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenteeResumes
     * const menteeResume = await prisma.menteeResume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenteeResumeUpdateManyArgs>(args: SelectSubset<T, MenteeResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MenteeResume.
     * @param {MenteeResumeUpsertArgs} args - Arguments to update or create a MenteeResume.
     * @example
     * // Update or create a MenteeResume
     * const menteeResume = await prisma.menteeResume.upsert({
     *   create: {
     *     // ... data to create a MenteeResume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenteeResume we want to update
     *   }
     * })
     */
    upsert<T extends MenteeResumeUpsertArgs>(args: SelectSubset<T, MenteeResumeUpsertArgs<ExtArgs>>): Prisma__MenteeResumeClient<$Result.GetResult<Prisma.$MenteeResumePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MenteeResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeCountArgs} args - Arguments to filter MenteeResumes to count.
     * @example
     * // Count the number of MenteeResumes
     * const count = await prisma.menteeResume.count({
     *   where: {
     *     // ... the filter for the MenteeResumes we want to count
     *   }
     * })
    **/
    count<T extends MenteeResumeCountArgs>(
      args?: Subset<T, MenteeResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenteeResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenteeResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenteeResumeAggregateArgs>(args: Subset<T, MenteeResumeAggregateArgs>): Prisma.PrismaPromise<GetMenteeResumeAggregateType<T>>

    /**
     * Group by MenteeResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenteeResumeGroupByArgs} args - Group by arguments.
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
      T extends MenteeResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenteeResumeGroupByArgs['orderBy'] }
        : { orderBy?: MenteeResumeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MenteeResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenteeResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenteeResume model
   */
  readonly fields: MenteeResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenteeResume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenteeResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MenteeResume model
   */ 
  interface MenteeResumeFieldRefs {
    readonly id: FieldRef<"MenteeResume", 'String'>
    readonly menteeId: FieldRef<"MenteeResume", 'String'>
    readonly name: FieldRef<"MenteeResume", 'String'>
    readonly fileUrl: FieldRef<"MenteeResume", 'String'>
    readonly createdAt: FieldRef<"MenteeResume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenteeResume findUnique
   */
  export type MenteeResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * Filter, which MenteeResume to fetch.
     */
    where: MenteeResumeWhereUniqueInput
  }

  /**
   * MenteeResume findUniqueOrThrow
   */
  export type MenteeResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * Filter, which MenteeResume to fetch.
     */
    where: MenteeResumeWhereUniqueInput
  }

  /**
   * MenteeResume findFirst
   */
  export type MenteeResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * Filter, which MenteeResume to fetch.
     */
    where?: MenteeResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeResumes to fetch.
     */
    orderBy?: MenteeResumeOrderByWithRelationInput | MenteeResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenteeResumes.
     */
    cursor?: MenteeResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenteeResumes.
     */
    distinct?: MenteeResumeScalarFieldEnum | MenteeResumeScalarFieldEnum[]
  }

  /**
   * MenteeResume findFirstOrThrow
   */
  export type MenteeResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * Filter, which MenteeResume to fetch.
     */
    where?: MenteeResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeResumes to fetch.
     */
    orderBy?: MenteeResumeOrderByWithRelationInput | MenteeResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenteeResumes.
     */
    cursor?: MenteeResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenteeResumes.
     */
    distinct?: MenteeResumeScalarFieldEnum | MenteeResumeScalarFieldEnum[]
  }

  /**
   * MenteeResume findMany
   */
  export type MenteeResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * Filter, which MenteeResumes to fetch.
     */
    where?: MenteeResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenteeResumes to fetch.
     */
    orderBy?: MenteeResumeOrderByWithRelationInput | MenteeResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenteeResumes.
     */
    cursor?: MenteeResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenteeResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenteeResumes.
     */
    skip?: number
    distinct?: MenteeResumeScalarFieldEnum | MenteeResumeScalarFieldEnum[]
  }

  /**
   * MenteeResume create
   */
  export type MenteeResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a MenteeResume.
     */
    data: XOR<MenteeResumeCreateInput, MenteeResumeUncheckedCreateInput>
  }

  /**
   * MenteeResume createMany
   */
  export type MenteeResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenteeResumes.
     */
    data: MenteeResumeCreateManyInput | MenteeResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenteeResume createManyAndReturn
   */
  export type MenteeResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MenteeResumes.
     */
    data: MenteeResumeCreateManyInput | MenteeResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenteeResume update
   */
  export type MenteeResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a MenteeResume.
     */
    data: XOR<MenteeResumeUpdateInput, MenteeResumeUncheckedUpdateInput>
    /**
     * Choose, which MenteeResume to update.
     */
    where: MenteeResumeWhereUniqueInput
  }

  /**
   * MenteeResume updateMany
   */
  export type MenteeResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenteeResumes.
     */
    data: XOR<MenteeResumeUpdateManyMutationInput, MenteeResumeUncheckedUpdateManyInput>
    /**
     * Filter which MenteeResumes to update
     */
    where?: MenteeResumeWhereInput
  }

  /**
   * MenteeResume upsert
   */
  export type MenteeResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the MenteeResume to update in case it exists.
     */
    where: MenteeResumeWhereUniqueInput
    /**
     * In case the MenteeResume found by the `where` argument doesn't exist, create a new MenteeResume with this data.
     */
    create: XOR<MenteeResumeCreateInput, MenteeResumeUncheckedCreateInput>
    /**
     * In case the MenteeResume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenteeResumeUpdateInput, MenteeResumeUncheckedUpdateInput>
  }

  /**
   * MenteeResume delete
   */
  export type MenteeResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
    /**
     * Filter which MenteeResume to delete.
     */
    where: MenteeResumeWhereUniqueInput
  }

  /**
   * MenteeResume deleteMany
   */
  export type MenteeResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenteeResumes to delete
     */
    where?: MenteeResumeWhereInput
  }

  /**
   * MenteeResume without action
   */
  export type MenteeResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenteeResume
     */
    select?: MenteeResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenteeResumeInclude<ExtArgs> | null
  }


  /**
   * Model MentorResume
   */

  export type AggregateMentorResume = {
    _count: MentorResumeCountAggregateOutputType | null
    _min: MentorResumeMinAggregateOutputType | null
    _max: MentorResumeMaxAggregateOutputType | null
  }

  export type MentorResumeMinAggregateOutputType = {
    id: string | null
    mentorId: string | null
    name: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type MentorResumeMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    name: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type MentorResumeCountAggregateOutputType = {
    id: number
    mentorId: number
    name: number
    fileUrl: number
    createdAt: number
    _all: number
  }


  export type MentorResumeMinAggregateInputType = {
    id?: true
    mentorId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
  }

  export type MentorResumeMaxAggregateInputType = {
    id?: true
    mentorId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
  }

  export type MentorResumeCountAggregateInputType = {
    id?: true
    mentorId?: true
    name?: true
    fileUrl?: true
    createdAt?: true
    _all?: true
  }

  export type MentorResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorResume to aggregate.
     */
    where?: MentorResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorResumes to fetch.
     */
    orderBy?: MentorResumeOrderByWithRelationInput | MentorResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MentorResumes
    **/
    _count?: true | MentorResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorResumeMaxAggregateInputType
  }

  export type GetMentorResumeAggregateType<T extends MentorResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateMentorResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentorResume[P]>
      : GetScalarType<T[P], AggregateMentorResume[P]>
  }




  export type MentorResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorResumeWhereInput
    orderBy?: MentorResumeOrderByWithAggregationInput | MentorResumeOrderByWithAggregationInput[]
    by: MentorResumeScalarFieldEnum[] | MentorResumeScalarFieldEnum
    having?: MentorResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorResumeCountAggregateInputType | true
    _min?: MentorResumeMinAggregateInputType
    _max?: MentorResumeMaxAggregateInputType
  }

  export type MentorResumeGroupByOutputType = {
    id: string
    mentorId: string
    name: string
    fileUrl: string
    createdAt: Date
    _count: MentorResumeCountAggregateOutputType | null
    _min: MentorResumeMinAggregateOutputType | null
    _max: MentorResumeMaxAggregateOutputType | null
  }

  type GetMentorResumeGroupByPayload<T extends MentorResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorResumeGroupByOutputType[P]>
            : GetScalarType<T[P], MentorResumeGroupByOutputType[P]>
        }
      >
    >


  export type MentorResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorResume"]>

  export type MentorResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorResume"]>

  export type MentorResumeSelectScalar = {
    id?: boolean
    mentorId?: boolean
    name?: boolean
    fileUrl?: boolean
    createdAt?: boolean
  }

  export type MentorResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }
  export type MentorResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $MentorResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorResume"
    objects: {
      mentor: Prisma.$MentorProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorId: string
      name: string
      fileUrl: string
      createdAt: Date
    }, ExtArgs["result"]["mentorResume"]>
    composites: {}
  }

  type MentorResumeGetPayload<S extends boolean | null | undefined | MentorResumeDefaultArgs> = $Result.GetResult<Prisma.$MentorResumePayload, S>

  type MentorResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MentorResumeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MentorResumeCountAggregateInputType | true
    }

  export interface MentorResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MentorResume'], meta: { name: 'MentorResume' } }
    /**
     * Find zero or one MentorResume that matches the filter.
     * @param {MentorResumeFindUniqueArgs} args - Arguments to find a MentorResume
     * @example
     * // Get one MentorResume
     * const mentorResume = await prisma.mentorResume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorResumeFindUniqueArgs>(args: SelectSubset<T, MentorResumeFindUniqueArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MentorResume that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MentorResumeFindUniqueOrThrowArgs} args - Arguments to find a MentorResume
     * @example
     * // Get one MentorResume
     * const mentorResume = await prisma.mentorResume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MentorResume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeFindFirstArgs} args - Arguments to find a MentorResume
     * @example
     * // Get one MentorResume
     * const mentorResume = await prisma.mentorResume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorResumeFindFirstArgs>(args?: SelectSubset<T, MentorResumeFindFirstArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MentorResume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeFindFirstOrThrowArgs} args - Arguments to find a MentorResume
     * @example
     * // Get one MentorResume
     * const mentorResume = await prisma.mentorResume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MentorResumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MentorResumes
     * const mentorResumes = await prisma.mentorResume.findMany()
     * 
     * // Get first 10 MentorResumes
     * const mentorResumes = await prisma.mentorResume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorResumeWithIdOnly = await prisma.mentorResume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorResumeFindManyArgs>(args?: SelectSubset<T, MentorResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MentorResume.
     * @param {MentorResumeCreateArgs} args - Arguments to create a MentorResume.
     * @example
     * // Create one MentorResume
     * const MentorResume = await prisma.mentorResume.create({
     *   data: {
     *     // ... data to create a MentorResume
     *   }
     * })
     * 
     */
    create<T extends MentorResumeCreateArgs>(args: SelectSubset<T, MentorResumeCreateArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MentorResumes.
     * @param {MentorResumeCreateManyArgs} args - Arguments to create many MentorResumes.
     * @example
     * // Create many MentorResumes
     * const mentorResume = await prisma.mentorResume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorResumeCreateManyArgs>(args?: SelectSubset<T, MentorResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MentorResumes and returns the data saved in the database.
     * @param {MentorResumeCreateManyAndReturnArgs} args - Arguments to create many MentorResumes.
     * @example
     * // Create many MentorResumes
     * const mentorResume = await prisma.mentorResume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MentorResumes and only return the `id`
     * const mentorResumeWithIdOnly = await prisma.mentorResume.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MentorResume.
     * @param {MentorResumeDeleteArgs} args - Arguments to delete one MentorResume.
     * @example
     * // Delete one MentorResume
     * const MentorResume = await prisma.mentorResume.delete({
     *   where: {
     *     // ... filter to delete one MentorResume
     *   }
     * })
     * 
     */
    delete<T extends MentorResumeDeleteArgs>(args: SelectSubset<T, MentorResumeDeleteArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MentorResume.
     * @param {MentorResumeUpdateArgs} args - Arguments to update one MentorResume.
     * @example
     * // Update one MentorResume
     * const mentorResume = await prisma.mentorResume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorResumeUpdateArgs>(args: SelectSubset<T, MentorResumeUpdateArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MentorResumes.
     * @param {MentorResumeDeleteManyArgs} args - Arguments to filter MentorResumes to delete.
     * @example
     * // Delete a few MentorResumes
     * const { count } = await prisma.mentorResume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorResumeDeleteManyArgs>(args?: SelectSubset<T, MentorResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MentorResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MentorResumes
     * const mentorResume = await prisma.mentorResume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorResumeUpdateManyArgs>(args: SelectSubset<T, MentorResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MentorResume.
     * @param {MentorResumeUpsertArgs} args - Arguments to update or create a MentorResume.
     * @example
     * // Update or create a MentorResume
     * const mentorResume = await prisma.mentorResume.upsert({
     *   create: {
     *     // ... data to create a MentorResume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MentorResume we want to update
     *   }
     * })
     */
    upsert<T extends MentorResumeUpsertArgs>(args: SelectSubset<T, MentorResumeUpsertArgs<ExtArgs>>): Prisma__MentorResumeClient<$Result.GetResult<Prisma.$MentorResumePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MentorResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeCountArgs} args - Arguments to filter MentorResumes to count.
     * @example
     * // Count the number of MentorResumes
     * const count = await prisma.mentorResume.count({
     *   where: {
     *     // ... the filter for the MentorResumes we want to count
     *   }
     * })
    **/
    count<T extends MentorResumeCountArgs>(
      args?: Subset<T, MentorResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MentorResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MentorResumeAggregateArgs>(args: Subset<T, MentorResumeAggregateArgs>): Prisma.PrismaPromise<GetMentorResumeAggregateType<T>>

    /**
     * Group by MentorResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorResumeGroupByArgs} args - Group by arguments.
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
      T extends MentorResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorResumeGroupByArgs['orderBy'] }
        : { orderBy?: MentorResumeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MentorResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MentorResume model
   */
  readonly fields: MentorResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MentorResume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MentorResume model
   */ 
  interface MentorResumeFieldRefs {
    readonly id: FieldRef<"MentorResume", 'String'>
    readonly mentorId: FieldRef<"MentorResume", 'String'>
    readonly name: FieldRef<"MentorResume", 'String'>
    readonly fileUrl: FieldRef<"MentorResume", 'String'>
    readonly createdAt: FieldRef<"MentorResume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MentorResume findUnique
   */
  export type MentorResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * Filter, which MentorResume to fetch.
     */
    where: MentorResumeWhereUniqueInput
  }

  /**
   * MentorResume findUniqueOrThrow
   */
  export type MentorResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * Filter, which MentorResume to fetch.
     */
    where: MentorResumeWhereUniqueInput
  }

  /**
   * MentorResume findFirst
   */
  export type MentorResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * Filter, which MentorResume to fetch.
     */
    where?: MentorResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorResumes to fetch.
     */
    orderBy?: MentorResumeOrderByWithRelationInput | MentorResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorResumes.
     */
    cursor?: MentorResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorResumes.
     */
    distinct?: MentorResumeScalarFieldEnum | MentorResumeScalarFieldEnum[]
  }

  /**
   * MentorResume findFirstOrThrow
   */
  export type MentorResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * Filter, which MentorResume to fetch.
     */
    where?: MentorResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorResumes to fetch.
     */
    orderBy?: MentorResumeOrderByWithRelationInput | MentorResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MentorResumes.
     */
    cursor?: MentorResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MentorResumes.
     */
    distinct?: MentorResumeScalarFieldEnum | MentorResumeScalarFieldEnum[]
  }

  /**
   * MentorResume findMany
   */
  export type MentorResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * Filter, which MentorResumes to fetch.
     */
    where?: MentorResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MentorResumes to fetch.
     */
    orderBy?: MentorResumeOrderByWithRelationInput | MentorResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MentorResumes.
     */
    cursor?: MentorResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MentorResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MentorResumes.
     */
    skip?: number
    distinct?: MentorResumeScalarFieldEnum | MentorResumeScalarFieldEnum[]
  }

  /**
   * MentorResume create
   */
  export type MentorResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a MentorResume.
     */
    data: XOR<MentorResumeCreateInput, MentorResumeUncheckedCreateInput>
  }

  /**
   * MentorResume createMany
   */
  export type MentorResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MentorResumes.
     */
    data: MentorResumeCreateManyInput | MentorResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MentorResume createManyAndReturn
   */
  export type MentorResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MentorResumes.
     */
    data: MentorResumeCreateManyInput | MentorResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MentorResume update
   */
  export type MentorResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a MentorResume.
     */
    data: XOR<MentorResumeUpdateInput, MentorResumeUncheckedUpdateInput>
    /**
     * Choose, which MentorResume to update.
     */
    where: MentorResumeWhereUniqueInput
  }

  /**
   * MentorResume updateMany
   */
  export type MentorResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MentorResumes.
     */
    data: XOR<MentorResumeUpdateManyMutationInput, MentorResumeUncheckedUpdateManyInput>
    /**
     * Filter which MentorResumes to update
     */
    where?: MentorResumeWhereInput
  }

  /**
   * MentorResume upsert
   */
  export type MentorResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the MentorResume to update in case it exists.
     */
    where: MentorResumeWhereUniqueInput
    /**
     * In case the MentorResume found by the `where` argument doesn't exist, create a new MentorResume with this data.
     */
    create: XOR<MentorResumeCreateInput, MentorResumeUncheckedCreateInput>
    /**
     * In case the MentorResume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorResumeUpdateInput, MentorResumeUncheckedUpdateInput>
  }

  /**
   * MentorResume delete
   */
  export type MentorResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
    /**
     * Filter which MentorResume to delete.
     */
    where: MentorResumeWhereUniqueInput
  }

  /**
   * MentorResume deleteMany
   */
  export type MentorResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MentorResumes to delete
     */
    where?: MentorResumeWhereInput
  }

  /**
   * MentorResume without action
   */
  export type MentorResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MentorResume
     */
    select?: MentorResumeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MentorResumeInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: number | null
    duration: number | null
    totalBookings: number | null
    totalRevenue: number | null
    averageRating: number | null
    totalReviews: number | null
    viewCount: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: number | null
    duration: number | null
    totalBookings: number | null
    totalRevenue: number | null
    averageRating: number | null
    totalReviews: number | null
    viewCount: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    mentorId: string | null
    title: string | null
    shortDescription: string | null
    longDescription: string | null
    price: number | null
    duration: number | null
    status: $Enums.ServiceStatus | null
    totalBookings: number | null
    totalRevenue: number | null
    averageRating: number | null
    totalReviews: number | null
    viewCount: number | null
    category: string | null
    isPopular: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    title: string | null
    shortDescription: string | null
    longDescription: string | null
    price: number | null
    duration: number | null
    status: $Enums.ServiceStatus | null
    totalBookings: number | null
    totalRevenue: number | null
    averageRating: number | null
    totalReviews: number | null
    viewCount: number | null
    category: string | null
    isPopular: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    mentorId: number
    title: number
    shortDescription: number
    longDescription: number
    price: number
    duration: number
    status: number
    totalBookings: number
    totalRevenue: number
    averageRating: number
    totalReviews: number
    viewCount: number
    tags: number
    category: number
    isPopular: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    duration?: true
    totalBookings?: true
    totalRevenue?: true
    averageRating?: true
    totalReviews?: true
    viewCount?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    duration?: true
    totalBookings?: true
    totalRevenue?: true
    averageRating?: true
    totalReviews?: true
    viewCount?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    mentorId?: true
    title?: true
    shortDescription?: true
    longDescription?: true
    price?: true
    duration?: true
    status?: true
    totalBookings?: true
    totalRevenue?: true
    averageRating?: true
    totalReviews?: true
    viewCount?: true
    category?: true
    isPopular?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    mentorId?: true
    title?: true
    shortDescription?: true
    longDescription?: true
    price?: true
    duration?: true
    status?: true
    totalBookings?: true
    totalRevenue?: true
    averageRating?: true
    totalReviews?: true
    viewCount?: true
    category?: true
    isPopular?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    mentorId?: true
    title?: true
    shortDescription?: true
    longDescription?: true
    price?: true
    duration?: true
    status?: true
    totalBookings?: true
    totalRevenue?: true
    averageRating?: true
    totalReviews?: true
    viewCount?: true
    tags?: true
    category?: true
    isPopular?: true
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
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
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
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    mentorId: string
    title: string
    shortDescription: string
    longDescription: string | null
    price: number
    duration: number
    status: $Enums.ServiceStatus
    totalBookings: number
    totalRevenue: number
    averageRating: number
    totalReviews: number
    viewCount: number
    tags: string[]
    category: string | null
    isPopular: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
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
    mentorId?: boolean
    title?: boolean
    shortDescription?: boolean
    longDescription?: boolean
    price?: boolean
    duration?: boolean
    status?: boolean
    totalBookings?: boolean
    totalRevenue?: boolean
    averageRating?: boolean
    totalReviews?: boolean
    viewCount?: boolean
    tags?: boolean
    category?: boolean
    isPopular?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
    reviews?: boolean | Service$reviewsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    title?: boolean
    shortDescription?: boolean
    longDescription?: boolean
    price?: boolean
    duration?: boolean
    status?: boolean
    totalBookings?: boolean
    totalRevenue?: boolean
    averageRating?: boolean
    totalReviews?: boolean
    viewCount?: boolean
    tags?: boolean
    category?: boolean
    isPopular?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    mentorId?: boolean
    title?: boolean
    shortDescription?: boolean
    longDescription?: boolean
    price?: boolean
    duration?: boolean
    status?: boolean
    totalBookings?: boolean
    totalRevenue?: boolean
    averageRating?: boolean
    totalReviews?: boolean
    viewCount?: boolean
    tags?: boolean
    category?: boolean
    isPopular?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
    reviews?: boolean | Service$reviewsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      mentor: Prisma.$MentorProfilePayload<ExtArgs>
      reviews: Prisma.$ServiceReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorId: string
      title: string
      shortDescription: string
      longDescription: string | null
      price: number
      duration: number
      status: $Enums.ServiceStatus
      totalBookings: number
      totalRevenue: number
      averageRating: number
      totalReviews: number
      viewCount: number
      tags: string[]
      category: string | null
      isPopular: boolean
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
    mentor<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    reviews<T extends Service$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Service$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly mentorId: FieldRef<"Service", 'String'>
    readonly title: FieldRef<"Service", 'String'>
    readonly shortDescription: FieldRef<"Service", 'String'>
    readonly longDescription: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Float'>
    readonly duration: FieldRef<"Service", 'Int'>
    readonly status: FieldRef<"Service", 'ServiceStatus'>
    readonly totalBookings: FieldRef<"Service", 'Int'>
    readonly totalRevenue: FieldRef<"Service", 'Float'>
    readonly averageRating: FieldRef<"Service", 'Float'>
    readonly totalReviews: FieldRef<"Service", 'Int'>
    readonly viewCount: FieldRef<"Service", 'Int'>
    readonly tags: FieldRef<"Service", 'String[]'>
    readonly category: FieldRef<"Service", 'String'>
    readonly isPopular: FieldRef<"Service", 'Boolean'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
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
   * Service.reviews
   */
  export type Service$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    where?: ServiceReviewWhereInput
    orderBy?: ServiceReviewOrderByWithRelationInput | ServiceReviewOrderByWithRelationInput[]
    cursor?: ServiceReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceReviewScalarFieldEnum | ServiceReviewScalarFieldEnum[]
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
   * Model ServiceReview
   */

  export type AggregateServiceReview = {
    _count: ServiceReviewCountAggregateOutputType | null
    _avg: ServiceReviewAvgAggregateOutputType | null
    _sum: ServiceReviewSumAggregateOutputType | null
    _min: ServiceReviewMinAggregateOutputType | null
    _max: ServiceReviewMaxAggregateOutputType | null
  }

  export type ServiceReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ServiceReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ServiceReviewMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    menteeId: string | null
    menteeName: string | null
    rating: number | null
    comment: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceReviewMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    menteeId: string | null
    menteeName: string | null
    rating: number | null
    comment: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceReviewCountAggregateOutputType = {
    id: number
    serviceId: number
    menteeId: number
    menteeName: number
    rating: number
    comment: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ServiceReviewSumAggregateInputType = {
    rating?: true
  }

  export type ServiceReviewMinAggregateInputType = {
    id?: true
    serviceId?: true
    menteeId?: true
    menteeName?: true
    rating?: true
    comment?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceReviewMaxAggregateInputType = {
    id?: true
    serviceId?: true
    menteeId?: true
    menteeName?: true
    rating?: true
    comment?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceReviewCountAggregateInputType = {
    id?: true
    serviceId?: true
    menteeId?: true
    menteeName?: true
    rating?: true
    comment?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceReview to aggregate.
     */
    where?: ServiceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceReviews to fetch.
     */
    orderBy?: ServiceReviewOrderByWithRelationInput | ServiceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceReviews
    **/
    _count?: true | ServiceReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceReviewMaxAggregateInputType
  }

  export type GetServiceReviewAggregateType<T extends ServiceReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceReview[P]>
      : GetScalarType<T[P], AggregateServiceReview[P]>
  }




  export type ServiceReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceReviewWhereInput
    orderBy?: ServiceReviewOrderByWithAggregationInput | ServiceReviewOrderByWithAggregationInput[]
    by: ServiceReviewScalarFieldEnum[] | ServiceReviewScalarFieldEnum
    having?: ServiceReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceReviewCountAggregateInputType | true
    _avg?: ServiceReviewAvgAggregateInputType
    _sum?: ServiceReviewSumAggregateInputType
    _min?: ServiceReviewMinAggregateInputType
    _max?: ServiceReviewMaxAggregateInputType
  }

  export type ServiceReviewGroupByOutputType = {
    id: string
    serviceId: string
    menteeId: string
    menteeName: string
    rating: number
    comment: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: ServiceReviewCountAggregateOutputType | null
    _avg: ServiceReviewAvgAggregateOutputType | null
    _sum: ServiceReviewSumAggregateOutputType | null
    _min: ServiceReviewMinAggregateOutputType | null
    _max: ServiceReviewMaxAggregateOutputType | null
  }

  type GetServiceReviewGroupByPayload<T extends ServiceReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceReviewGroupByOutputType[P]>
        }
      >
    >


  export type ServiceReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    menteeId?: boolean
    menteeName?: boolean
    rating?: boolean
    comment?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceReview"]>

  export type ServiceReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    menteeId?: boolean
    menteeName?: boolean
    rating?: boolean
    comment?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceReview"]>

  export type ServiceReviewSelectScalar = {
    id?: boolean
    serviceId?: boolean
    menteeId?: boolean
    menteeName?: boolean
    rating?: boolean
    comment?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServiceReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceReview"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      menteeId: string
      menteeName: string
      rating: number
      comment: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceReview"]>
    composites: {}
  }

  type ServiceReviewGetPayload<S extends boolean | null | undefined | ServiceReviewDefaultArgs> = $Result.GetResult<Prisma.$ServiceReviewPayload, S>

  type ServiceReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceReviewCountAggregateInputType | true
    }

  export interface ServiceReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceReview'], meta: { name: 'ServiceReview' } }
    /**
     * Find zero or one ServiceReview that matches the filter.
     * @param {ServiceReviewFindUniqueArgs} args - Arguments to find a ServiceReview
     * @example
     * // Get one ServiceReview
     * const serviceReview = await prisma.serviceReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceReviewFindUniqueArgs>(args: SelectSubset<T, ServiceReviewFindUniqueArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ServiceReview that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceReviewFindUniqueOrThrowArgs} args - Arguments to find a ServiceReview
     * @example
     * // Get one ServiceReview
     * const serviceReview = await prisma.serviceReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ServiceReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewFindFirstArgs} args - Arguments to find a ServiceReview
     * @example
     * // Get one ServiceReview
     * const serviceReview = await prisma.serviceReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceReviewFindFirstArgs>(args?: SelectSubset<T, ServiceReviewFindFirstArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ServiceReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewFindFirstOrThrowArgs} args - Arguments to find a ServiceReview
     * @example
     * // Get one ServiceReview
     * const serviceReview = await prisma.serviceReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ServiceReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceReviews
     * const serviceReviews = await prisma.serviceReview.findMany()
     * 
     * // Get first 10 ServiceReviews
     * const serviceReviews = await prisma.serviceReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceReviewWithIdOnly = await prisma.serviceReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceReviewFindManyArgs>(args?: SelectSubset<T, ServiceReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ServiceReview.
     * @param {ServiceReviewCreateArgs} args - Arguments to create a ServiceReview.
     * @example
     * // Create one ServiceReview
     * const ServiceReview = await prisma.serviceReview.create({
     *   data: {
     *     // ... data to create a ServiceReview
     *   }
     * })
     * 
     */
    create<T extends ServiceReviewCreateArgs>(args: SelectSubset<T, ServiceReviewCreateArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ServiceReviews.
     * @param {ServiceReviewCreateManyArgs} args - Arguments to create many ServiceReviews.
     * @example
     * // Create many ServiceReviews
     * const serviceReview = await prisma.serviceReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceReviewCreateManyArgs>(args?: SelectSubset<T, ServiceReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceReviews and returns the data saved in the database.
     * @param {ServiceReviewCreateManyAndReturnArgs} args - Arguments to create many ServiceReviews.
     * @example
     * // Create many ServiceReviews
     * const serviceReview = await prisma.serviceReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceReviews and only return the `id`
     * const serviceReviewWithIdOnly = await prisma.serviceReview.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ServiceReview.
     * @param {ServiceReviewDeleteArgs} args - Arguments to delete one ServiceReview.
     * @example
     * // Delete one ServiceReview
     * const ServiceReview = await prisma.serviceReview.delete({
     *   where: {
     *     // ... filter to delete one ServiceReview
     *   }
     * })
     * 
     */
    delete<T extends ServiceReviewDeleteArgs>(args: SelectSubset<T, ServiceReviewDeleteArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ServiceReview.
     * @param {ServiceReviewUpdateArgs} args - Arguments to update one ServiceReview.
     * @example
     * // Update one ServiceReview
     * const serviceReview = await prisma.serviceReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceReviewUpdateArgs>(args: SelectSubset<T, ServiceReviewUpdateArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ServiceReviews.
     * @param {ServiceReviewDeleteManyArgs} args - Arguments to filter ServiceReviews to delete.
     * @example
     * // Delete a few ServiceReviews
     * const { count } = await prisma.serviceReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceReviewDeleteManyArgs>(args?: SelectSubset<T, ServiceReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceReviews
     * const serviceReview = await prisma.serviceReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceReviewUpdateManyArgs>(args: SelectSubset<T, ServiceReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ServiceReview.
     * @param {ServiceReviewUpsertArgs} args - Arguments to update or create a ServiceReview.
     * @example
     * // Update or create a ServiceReview
     * const serviceReview = await prisma.serviceReview.upsert({
     *   create: {
     *     // ... data to create a ServiceReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceReview we want to update
     *   }
     * })
     */
    upsert<T extends ServiceReviewUpsertArgs>(args: SelectSubset<T, ServiceReviewUpsertArgs<ExtArgs>>): Prisma__ServiceReviewClient<$Result.GetResult<Prisma.$ServiceReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ServiceReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewCountArgs} args - Arguments to filter ServiceReviews to count.
     * @example
     * // Count the number of ServiceReviews
     * const count = await prisma.serviceReview.count({
     *   where: {
     *     // ... the filter for the ServiceReviews we want to count
     *   }
     * })
    **/
    count<T extends ServiceReviewCountArgs>(
      args?: Subset<T, ServiceReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceReviewAggregateArgs>(args: Subset<T, ServiceReviewAggregateArgs>): Prisma.PrismaPromise<GetServiceReviewAggregateType<T>>

    /**
     * Group by ServiceReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceReviewGroupByArgs} args - Group by arguments.
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
      T extends ServiceReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceReviewGroupByArgs['orderBy'] }
        : { orderBy?: ServiceReviewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceReview model
   */
  readonly fields: ServiceReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ServiceReview model
   */ 
  interface ServiceReviewFieldRefs {
    readonly id: FieldRef<"ServiceReview", 'String'>
    readonly serviceId: FieldRef<"ServiceReview", 'String'>
    readonly menteeId: FieldRef<"ServiceReview", 'String'>
    readonly menteeName: FieldRef<"ServiceReview", 'String'>
    readonly rating: FieldRef<"ServiceReview", 'Int'>
    readonly comment: FieldRef<"ServiceReview", 'String'>
    readonly isVerified: FieldRef<"ServiceReview", 'Boolean'>
    readonly createdAt: FieldRef<"ServiceReview", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceReview findUnique
   */
  export type ServiceReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ServiceReview to fetch.
     */
    where: ServiceReviewWhereUniqueInput
  }

  /**
   * ServiceReview findUniqueOrThrow
   */
  export type ServiceReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ServiceReview to fetch.
     */
    where: ServiceReviewWhereUniqueInput
  }

  /**
   * ServiceReview findFirst
   */
  export type ServiceReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ServiceReview to fetch.
     */
    where?: ServiceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceReviews to fetch.
     */
    orderBy?: ServiceReviewOrderByWithRelationInput | ServiceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceReviews.
     */
    cursor?: ServiceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceReviews.
     */
    distinct?: ServiceReviewScalarFieldEnum | ServiceReviewScalarFieldEnum[]
  }

  /**
   * ServiceReview findFirstOrThrow
   */
  export type ServiceReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ServiceReview to fetch.
     */
    where?: ServiceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceReviews to fetch.
     */
    orderBy?: ServiceReviewOrderByWithRelationInput | ServiceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceReviews.
     */
    cursor?: ServiceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceReviews.
     */
    distinct?: ServiceReviewScalarFieldEnum | ServiceReviewScalarFieldEnum[]
  }

  /**
   * ServiceReview findMany
   */
  export type ServiceReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ServiceReviews to fetch.
     */
    where?: ServiceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceReviews to fetch.
     */
    orderBy?: ServiceReviewOrderByWithRelationInput | ServiceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceReviews.
     */
    cursor?: ServiceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceReviews.
     */
    skip?: number
    distinct?: ServiceReviewScalarFieldEnum | ServiceReviewScalarFieldEnum[]
  }

  /**
   * ServiceReview create
   */
  export type ServiceReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceReview.
     */
    data: XOR<ServiceReviewCreateInput, ServiceReviewUncheckedCreateInput>
  }

  /**
   * ServiceReview createMany
   */
  export type ServiceReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceReviews.
     */
    data: ServiceReviewCreateManyInput | ServiceReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceReview createManyAndReturn
   */
  export type ServiceReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ServiceReviews.
     */
    data: ServiceReviewCreateManyInput | ServiceReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceReview update
   */
  export type ServiceReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceReview.
     */
    data: XOR<ServiceReviewUpdateInput, ServiceReviewUncheckedUpdateInput>
    /**
     * Choose, which ServiceReview to update.
     */
    where: ServiceReviewWhereUniqueInput
  }

  /**
   * ServiceReview updateMany
   */
  export type ServiceReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceReviews.
     */
    data: XOR<ServiceReviewUpdateManyMutationInput, ServiceReviewUncheckedUpdateManyInput>
    /**
     * Filter which ServiceReviews to update
     */
    where?: ServiceReviewWhereInput
  }

  /**
   * ServiceReview upsert
   */
  export type ServiceReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceReview to update in case it exists.
     */
    where: ServiceReviewWhereUniqueInput
    /**
     * In case the ServiceReview found by the `where` argument doesn't exist, create a new ServiceReview with this data.
     */
    create: XOR<ServiceReviewCreateInput, ServiceReviewUncheckedCreateInput>
    /**
     * In case the ServiceReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceReviewUpdateInput, ServiceReviewUncheckedUpdateInput>
  }

  /**
   * ServiceReview delete
   */
  export type ServiceReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
    /**
     * Filter which ServiceReview to delete.
     */
    where: ServiceReviewWhereUniqueInput
  }

  /**
   * ServiceReview deleteMany
   */
  export type ServiceReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceReviews to delete
     */
    where?: ServiceReviewWhereInput
  }

  /**
   * ServiceReview without action
   */
  export type ServiceReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceReview
     */
    select?: ServiceReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceReviewInclude<ExtArgs> | null
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
    sessionId: string | null
    feedbackPdfUrl: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type MentorFeedbackMaxAggregateOutputType = {
    id: string | null
    mentorId: string | null
    sessionId: string | null
    feedbackPdfUrl: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type MentorFeedbackCountAggregateOutputType = {
    id: number
    mentorId: number
    sessionId: number
    feedbackPdfUrl: number
    notes: number
    createdAt: number
    _all: number
  }


  export type MentorFeedbackMinAggregateInputType = {
    id?: true
    mentorId?: true
    sessionId?: true
    feedbackPdfUrl?: true
    notes?: true
    createdAt?: true
  }

  export type MentorFeedbackMaxAggregateInputType = {
    id?: true
    mentorId?: true
    sessionId?: true
    feedbackPdfUrl?: true
    notes?: true
    createdAt?: true
  }

  export type MentorFeedbackCountAggregateInputType = {
    id?: true
    mentorId?: true
    sessionId?: true
    feedbackPdfUrl?: true
    notes?: true
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
    sessionId: string | null
    feedbackPdfUrl: string | null
    notes: string | null
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
    sessionId?: boolean
    feedbackPdfUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorFeedback"]>

  export type MentorFeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorId?: boolean
    sessionId?: boolean
    feedbackPdfUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    mentor?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorFeedback"]>

  export type MentorFeedbackSelectScalar = {
    id?: boolean
    mentorId?: boolean
    sessionId?: boolean
    feedbackPdfUrl?: boolean
    notes?: boolean
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
      sessionId: string | null
      feedbackPdfUrl: string | null
      notes: string | null
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
    readonly sessionId: FieldRef<"MentorFeedback", 'String'>
    readonly feedbackPdfUrl: FieldRef<"MentorFeedback", 'String'>
    readonly notes: FieldRef<"MentorFeedback", 'String'>
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


  export const VerificationDocumentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    documentUrl: 'documentUrl',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type VerificationDocumentScalarFieldEnum = (typeof VerificationDocumentScalarFieldEnum)[keyof typeof VerificationDocumentScalarFieldEnum]


  export const MentorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    bio: 'bio',
    headline: 'headline',
    expertise: 'expertise',
    certifications: 'certifications',
    rating: 'rating',
    totalReviews: 'totalReviews',
    verificationStatus: 'verificationStatus',
    verifiedBadge: 'verifiedBadge',
    phone: 'phone',
    gender: 'gender',
    location: 'location',
    socialLinks: 'socialLinks',
    verificationIds: 'verificationIds',
    bachelors: 'bachelors',
    masters: 'masters',
    workExperience: 'workExperience',
    exams: 'exams',
    balance: 'balance',
    totalEarnings: 'totalEarnings',
    pendingEarnings: 'pendingEarnings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorProfileScalarFieldEnum = (typeof MentorProfileScalarFieldEnum)[keyof typeof MentorProfileScalarFieldEnum]


  export const MenteeProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dob: 'dob',
    phone: 'phone',
    location: 'location',
    gender: 'gender',
    bachelors: 'bachelors',
    masters: 'masters',
    workExperience: 'workExperience',
    certifications: 'certifications',
    catAttempts: 'catAttempts',
    expectations: 'expectations',
    targetColleges: 'targetColleges',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MenteeProfileScalarFieldEnum = (typeof MenteeProfileScalarFieldEnum)[keyof typeof MenteeProfileScalarFieldEnum]


  export const AdminProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminProfileScalarFieldEnum = (typeof AdminProfileScalarFieldEnum)[keyof typeof AdminProfileScalarFieldEnum]


  export const MentorApplicationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    bio: 'bio',
    headline: 'headline',
    phone: 'phone',
    gender: 'gender',
    location: 'location',
    socialLinks: 'socialLinks',
    verificationIds: 'verificationIds',
    expertise: 'expertise',
    bachelors: 'bachelors',
    masters: 'masters',
    workExperience: 'workExperience',
    exams: 'exams',
    certifications: 'certifications',
    resumes: 'resumes',
    status: 'status',
    rejectionReason: 'rejectionReason',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorApplicationScalarFieldEnum = (typeof MentorApplicationScalarFieldEnum)[keyof typeof MentorApplicationScalarFieldEnum]


  export const MenteeResumeScalarFieldEnum: {
    id: 'id',
    menteeId: 'menteeId',
    name: 'name',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt'
  };

  export type MenteeResumeScalarFieldEnum = (typeof MenteeResumeScalarFieldEnum)[keyof typeof MenteeResumeScalarFieldEnum]


  export const MentorResumeScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    name: 'name',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt'
  };

  export type MentorResumeScalarFieldEnum = (typeof MentorResumeScalarFieldEnum)[keyof typeof MentorResumeScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    title: 'title',
    shortDescription: 'shortDescription',
    longDescription: 'longDescription',
    price: 'price',
    duration: 'duration',
    status: 'status',
    totalBookings: 'totalBookings',
    totalRevenue: 'totalRevenue',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews',
    viewCount: 'viewCount',
    tags: 'tags',
    category: 'category',
    isPopular: 'isPopular',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ServiceReviewScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    menteeId: 'menteeId',
    menteeName: 'menteeName',
    rating: 'rating',
    comment: 'comment',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceReviewScalarFieldEnum = (typeof ServiceReviewScalarFieldEnum)[keyof typeof ServiceReviewScalarFieldEnum]


  export const MentorFeedbackScalarFieldEnum: {
    id: 'id',
    mentorId: 'mentorId',
    sessionId: 'sessionId',
    feedbackPdfUrl: 'feedbackPdfUrl',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type MentorFeedbackScalarFieldEnum = (typeof MentorFeedbackScalarFieldEnum)[keyof typeof MentorFeedbackScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


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
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'ServiceStatus[]'
   */
  export type ListEnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus[]'>
    
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
    adminProfile?: XOR<AdminProfileNullableRelationFilter, AdminProfileWhereInput> | null
    mentorApplications?: MentorApplicationListRelationFilter
    verification?: XOR<VerificationDocumentNullableRelationFilter, VerificationDocumentWhereInput> | null
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
    adminProfile?: AdminProfileOrderByWithRelationInput
    mentorApplications?: MentorApplicationOrderByRelationAggregateInput
    verification?: VerificationDocumentOrderByWithRelationInput
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
    adminProfile?: XOR<AdminProfileNullableRelationFilter, AdminProfileWhereInput> | null
    mentorApplications?: MentorApplicationListRelationFilter
    verification?: XOR<VerificationDocumentNullableRelationFilter, VerificationDocumentWhereInput> | null
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

  export type MentorProfileWhereInput = {
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    id?: StringFilter<"MentorProfile"> | string
    userId?: StringFilter<"MentorProfile"> | string
    bio?: StringFilter<"MentorProfile"> | string
    headline?: StringNullableFilter<"MentorProfile"> | string | null
    expertise?: StringNullableListFilter<"MentorProfile">
    certifications?: StringNullableListFilter<"MentorProfile">
    rating?: FloatFilter<"MentorProfile"> | number
    totalReviews?: IntFilter<"MentorProfile"> | number
    verificationStatus?: EnumVerificationStatusFilter<"MentorProfile"> | $Enums.VerificationStatus
    verifiedBadge?: BoolFilter<"MentorProfile"> | boolean
    phone?: StringNullableFilter<"MentorProfile"> | string | null
    gender?: EnumGenderNullableFilter<"MentorProfile"> | $Enums.Gender | null
    location?: StringNullableFilter<"MentorProfile"> | string | null
    socialLinks?: JsonNullableFilter<"MentorProfile">
    verificationIds?: StringNullableListFilter<"MentorProfile">
    bachelors?: StringNullableListFilter<"MentorProfile">
    masters?: StringNullableListFilter<"MentorProfile">
    workExperience?: JsonNullableFilter<"MentorProfile">
    exams?: JsonNullableFilter<"MentorProfile">
    balance?: FloatFilter<"MentorProfile"> | number
    totalEarnings?: FloatFilter<"MentorProfile"> | number
    pendingEarnings?: FloatFilter<"MentorProfile"> | number
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    services?: ServiceListRelationFilter
    feedbackGiven?: MentorFeedbackListRelationFilter
    resumes?: MentorResumeListRelationFilter
  }

  export type MentorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrderInput | SortOrder
    expertise?: SortOrder
    certifications?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    phone?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    verificationIds?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrderInput | SortOrder
    exams?: SortOrderInput | SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    services?: ServiceOrderByRelationAggregateInput
    feedbackGiven?: MentorFeedbackOrderByRelationAggregateInput
    resumes?: MentorResumeOrderByRelationAggregateInput
  }

  export type MentorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    bio?: StringFilter<"MentorProfile"> | string
    headline?: StringNullableFilter<"MentorProfile"> | string | null
    expertise?: StringNullableListFilter<"MentorProfile">
    certifications?: StringNullableListFilter<"MentorProfile">
    rating?: FloatFilter<"MentorProfile"> | number
    totalReviews?: IntFilter<"MentorProfile"> | number
    verificationStatus?: EnumVerificationStatusFilter<"MentorProfile"> | $Enums.VerificationStatus
    verifiedBadge?: BoolFilter<"MentorProfile"> | boolean
    phone?: StringNullableFilter<"MentorProfile"> | string | null
    gender?: EnumGenderNullableFilter<"MentorProfile"> | $Enums.Gender | null
    location?: StringNullableFilter<"MentorProfile"> | string | null
    socialLinks?: JsonNullableFilter<"MentorProfile">
    verificationIds?: StringNullableListFilter<"MentorProfile">
    bachelors?: StringNullableListFilter<"MentorProfile">
    masters?: StringNullableListFilter<"MentorProfile">
    workExperience?: JsonNullableFilter<"MentorProfile">
    exams?: JsonNullableFilter<"MentorProfile">
    balance?: FloatFilter<"MentorProfile"> | number
    totalEarnings?: FloatFilter<"MentorProfile"> | number
    pendingEarnings?: FloatFilter<"MentorProfile"> | number
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    services?: ServiceListRelationFilter
    feedbackGiven?: MentorFeedbackListRelationFilter
    resumes?: MentorResumeListRelationFilter
  }, "id" | "userId">

  export type MentorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrderInput | SortOrder
    expertise?: SortOrder
    certifications?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    phone?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    verificationIds?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrderInput | SortOrder
    exams?: SortOrderInput | SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
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
    headline?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    expertise?: StringNullableListFilter<"MentorProfile">
    certifications?: StringNullableListFilter<"MentorProfile">
    rating?: FloatWithAggregatesFilter<"MentorProfile"> | number
    totalReviews?: IntWithAggregatesFilter<"MentorProfile"> | number
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"MentorProfile"> | $Enums.VerificationStatus
    verifiedBadge?: BoolWithAggregatesFilter<"MentorProfile"> | boolean
    phone?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"MentorProfile"> | $Enums.Gender | null
    location?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    socialLinks?: JsonNullableWithAggregatesFilter<"MentorProfile">
    verificationIds?: StringNullableListFilter<"MentorProfile">
    bachelors?: StringNullableListFilter<"MentorProfile">
    masters?: StringNullableListFilter<"MentorProfile">
    workExperience?: JsonNullableWithAggregatesFilter<"MentorProfile">
    exams?: JsonNullableWithAggregatesFilter<"MentorProfile">
    balance?: FloatWithAggregatesFilter<"MentorProfile"> | number
    totalEarnings?: FloatWithAggregatesFilter<"MentorProfile"> | number
    pendingEarnings?: FloatWithAggregatesFilter<"MentorProfile"> | number
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
    phone?: StringNullableFilter<"MenteeProfile"> | string | null
    location?: StringNullableFilter<"MenteeProfile"> | string | null
    gender?: EnumGenderNullableFilter<"MenteeProfile"> | $Enums.Gender | null
    bachelors?: StringNullableListFilter<"MenteeProfile">
    masters?: StringNullableListFilter<"MenteeProfile">
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableListFilter<"MenteeProfile">
    catAttempts?: JsonNullableFilter<"MenteeProfile">
    expectations?: StringNullableFilter<"MenteeProfile"> | string | null
    targetColleges?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    resumes?: MenteeResumeListRelationFilter
  }

  export type MenteeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrder
    catAttempts?: SortOrderInput | SortOrder
    expectations?: SortOrderInput | SortOrder
    targetColleges?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    resumes?: MenteeResumeOrderByRelationAggregateInput
  }

  export type MenteeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    OR?: MenteeProfileWhereInput[]
    NOT?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    dob?: DateTimeNullableFilter<"MenteeProfile"> | Date | string | null
    phone?: StringNullableFilter<"MenteeProfile"> | string | null
    location?: StringNullableFilter<"MenteeProfile"> | string | null
    gender?: EnumGenderNullableFilter<"MenteeProfile"> | $Enums.Gender | null
    bachelors?: StringNullableListFilter<"MenteeProfile">
    masters?: StringNullableListFilter<"MenteeProfile">
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableListFilter<"MenteeProfile">
    catAttempts?: JsonNullableFilter<"MenteeProfile">
    expectations?: StringNullableFilter<"MenteeProfile"> | string | null
    targetColleges?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    resumes?: MenteeResumeListRelationFilter
  }, "id" | "userId">

  export type MenteeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrder
    catAttempts?: SortOrderInput | SortOrder
    expectations?: SortOrderInput | SortOrder
    targetColleges?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MenteeProfileCountOrderByAggregateInput
    _max?: MenteeProfileMaxOrderByAggregateInput
    _min?: MenteeProfileMinOrderByAggregateInput
  }

  export type MenteeProfileScalarWhereWithAggregatesInput = {
    AND?: MenteeProfileScalarWhereWithAggregatesInput | MenteeProfileScalarWhereWithAggregatesInput[]
    OR?: MenteeProfileScalarWhereWithAggregatesInput[]
    NOT?: MenteeProfileScalarWhereWithAggregatesInput | MenteeProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MenteeProfile"> | string
    userId?: StringWithAggregatesFilter<"MenteeProfile"> | string
    dob?: DateTimeNullableWithAggregatesFilter<"MenteeProfile"> | Date | string | null
    phone?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    location?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"MenteeProfile"> | $Enums.Gender | null
    bachelors?: StringNullableListFilter<"MenteeProfile">
    masters?: StringNullableListFilter<"MenteeProfile">
    workExperience?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableListFilter<"MenteeProfile">
    catAttempts?: JsonNullableWithAggregatesFilter<"MenteeProfile">
    expectations?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    targetColleges?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
  }

  export type AdminProfileWhereInput = {
    AND?: AdminProfileWhereInput | AdminProfileWhereInput[]
    OR?: AdminProfileWhereInput[]
    NOT?: AdminProfileWhereInput | AdminProfileWhereInput[]
    id?: StringFilter<"AdminProfile"> | string
    userId?: StringFilter<"AdminProfile"> | string
    lastLoginAt?: DateTimeNullableFilter<"AdminProfile"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminProfile"> | Date | string
    updatedAt?: DateTimeFilter<"AdminProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AdminProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: AdminProfileWhereInput | AdminProfileWhereInput[]
    OR?: AdminProfileWhereInput[]
    NOT?: AdminProfileWhereInput | AdminProfileWhereInput[]
    lastLoginAt?: DateTimeNullableFilter<"AdminProfile"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminProfile"> | Date | string
    updatedAt?: DateTimeFilter<"AdminProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AdminProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminProfileCountOrderByAggregateInput
    _max?: AdminProfileMaxOrderByAggregateInput
    _min?: AdminProfileMinOrderByAggregateInput
  }

  export type AdminProfileScalarWhereWithAggregatesInput = {
    AND?: AdminProfileScalarWhereWithAggregatesInput | AdminProfileScalarWhereWithAggregatesInput[]
    OR?: AdminProfileScalarWhereWithAggregatesInput[]
    NOT?: AdminProfileScalarWhereWithAggregatesInput | AdminProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminProfile"> | string
    userId?: StringWithAggregatesFilter<"AdminProfile"> | string
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"AdminProfile"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminProfile"> | Date | string
  }

  export type MentorApplicationWhereInput = {
    AND?: MentorApplicationWhereInput | MentorApplicationWhereInput[]
    OR?: MentorApplicationWhereInput[]
    NOT?: MentorApplicationWhereInput | MentorApplicationWhereInput[]
    id?: StringFilter<"MentorApplication"> | string
    userId?: StringFilter<"MentorApplication"> | string
    bio?: StringFilter<"MentorApplication"> | string
    headline?: StringNullableFilter<"MentorApplication"> | string | null
    phone?: StringNullableFilter<"MentorApplication"> | string | null
    gender?: EnumGenderNullableFilter<"MentorApplication"> | $Enums.Gender | null
    location?: StringNullableFilter<"MentorApplication"> | string | null
    socialLinks?: JsonNullableFilter<"MentorApplication">
    verificationIds?: StringNullableListFilter<"MentorApplication">
    expertise?: StringNullableListFilter<"MentorApplication">
    bachelors?: StringNullableListFilter<"MentorApplication">
    masters?: StringNullableListFilter<"MentorApplication">
    workExperience?: JsonNullableFilter<"MentorApplication">
    exams?: JsonNullableFilter<"MentorApplication">
    certifications?: StringNullableListFilter<"MentorApplication">
    resumes?: JsonNullableFilter<"MentorApplication">
    status?: EnumApplicationStatusFilter<"MentorApplication"> | $Enums.ApplicationStatus
    rejectionReason?: StringNullableFilter<"MentorApplication"> | string | null
    reviewedAt?: DateTimeNullableFilter<"MentorApplication"> | Date | string | null
    reviewedBy?: StringNullableFilter<"MentorApplication"> | string | null
    createdAt?: DateTimeFilter<"MentorApplication"> | Date | string
    updatedAt?: DateTimeFilter<"MentorApplication"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MentorApplicationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    verificationIds?: SortOrder
    expertise?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrderInput | SortOrder
    exams?: SortOrderInput | SortOrder
    certifications?: SortOrder
    resumes?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MentorApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MentorApplicationWhereInput | MentorApplicationWhereInput[]
    OR?: MentorApplicationWhereInput[]
    NOT?: MentorApplicationWhereInput | MentorApplicationWhereInput[]
    userId?: StringFilter<"MentorApplication"> | string
    bio?: StringFilter<"MentorApplication"> | string
    headline?: StringNullableFilter<"MentorApplication"> | string | null
    phone?: StringNullableFilter<"MentorApplication"> | string | null
    gender?: EnumGenderNullableFilter<"MentorApplication"> | $Enums.Gender | null
    location?: StringNullableFilter<"MentorApplication"> | string | null
    socialLinks?: JsonNullableFilter<"MentorApplication">
    verificationIds?: StringNullableListFilter<"MentorApplication">
    expertise?: StringNullableListFilter<"MentorApplication">
    bachelors?: StringNullableListFilter<"MentorApplication">
    masters?: StringNullableListFilter<"MentorApplication">
    workExperience?: JsonNullableFilter<"MentorApplication">
    exams?: JsonNullableFilter<"MentorApplication">
    certifications?: StringNullableListFilter<"MentorApplication">
    resumes?: JsonNullableFilter<"MentorApplication">
    status?: EnumApplicationStatusFilter<"MentorApplication"> | $Enums.ApplicationStatus
    rejectionReason?: StringNullableFilter<"MentorApplication"> | string | null
    reviewedAt?: DateTimeNullableFilter<"MentorApplication"> | Date | string | null
    reviewedBy?: StringNullableFilter<"MentorApplication"> | string | null
    createdAt?: DateTimeFilter<"MentorApplication"> | Date | string
    updatedAt?: DateTimeFilter<"MentorApplication"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type MentorApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    verificationIds?: SortOrder
    expertise?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrderInput | SortOrder
    exams?: SortOrderInput | SortOrder
    certifications?: SortOrder
    resumes?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorApplicationCountOrderByAggregateInput
    _max?: MentorApplicationMaxOrderByAggregateInput
    _min?: MentorApplicationMinOrderByAggregateInput
  }

  export type MentorApplicationScalarWhereWithAggregatesInput = {
    AND?: MentorApplicationScalarWhereWithAggregatesInput | MentorApplicationScalarWhereWithAggregatesInput[]
    OR?: MentorApplicationScalarWhereWithAggregatesInput[]
    NOT?: MentorApplicationScalarWhereWithAggregatesInput | MentorApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MentorApplication"> | string
    userId?: StringWithAggregatesFilter<"MentorApplication"> | string
    bio?: StringWithAggregatesFilter<"MentorApplication"> | string
    headline?: StringNullableWithAggregatesFilter<"MentorApplication"> | string | null
    phone?: StringNullableWithAggregatesFilter<"MentorApplication"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"MentorApplication"> | $Enums.Gender | null
    location?: StringNullableWithAggregatesFilter<"MentorApplication"> | string | null
    socialLinks?: JsonNullableWithAggregatesFilter<"MentorApplication">
    verificationIds?: StringNullableListFilter<"MentorApplication">
    expertise?: StringNullableListFilter<"MentorApplication">
    bachelors?: StringNullableListFilter<"MentorApplication">
    masters?: StringNullableListFilter<"MentorApplication">
    workExperience?: JsonNullableWithAggregatesFilter<"MentorApplication">
    exams?: JsonNullableWithAggregatesFilter<"MentorApplication">
    certifications?: StringNullableListFilter<"MentorApplication">
    resumes?: JsonNullableWithAggregatesFilter<"MentorApplication">
    status?: EnumApplicationStatusWithAggregatesFilter<"MentorApplication"> | $Enums.ApplicationStatus
    rejectionReason?: StringNullableWithAggregatesFilter<"MentorApplication"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"MentorApplication"> | Date | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"MentorApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MentorApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorApplication"> | Date | string
  }

  export type MenteeResumeWhereInput = {
    AND?: MenteeResumeWhereInput | MenteeResumeWhereInput[]
    OR?: MenteeResumeWhereInput[]
    NOT?: MenteeResumeWhereInput | MenteeResumeWhereInput[]
    id?: StringFilter<"MenteeResume"> | string
    menteeId?: StringFilter<"MenteeResume"> | string
    name?: StringFilter<"MenteeResume"> | string
    fileUrl?: StringFilter<"MenteeResume"> | string
    createdAt?: DateTimeFilter<"MenteeResume"> | Date | string
    mentee?: XOR<MenteeProfileRelationFilter, MenteeProfileWhereInput>
  }

  export type MenteeResumeOrderByWithRelationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    mentee?: MenteeProfileOrderByWithRelationInput
  }

  export type MenteeResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenteeResumeWhereInput | MenteeResumeWhereInput[]
    OR?: MenteeResumeWhereInput[]
    NOT?: MenteeResumeWhereInput | MenteeResumeWhereInput[]
    menteeId?: StringFilter<"MenteeResume"> | string
    name?: StringFilter<"MenteeResume"> | string
    fileUrl?: StringFilter<"MenteeResume"> | string
    createdAt?: DateTimeFilter<"MenteeResume"> | Date | string
    mentee?: XOR<MenteeProfileRelationFilter, MenteeProfileWhereInput>
  }, "id">

  export type MenteeResumeOrderByWithAggregationInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    _count?: MenteeResumeCountOrderByAggregateInput
    _max?: MenteeResumeMaxOrderByAggregateInput
    _min?: MenteeResumeMinOrderByAggregateInput
  }

  export type MenteeResumeScalarWhereWithAggregatesInput = {
    AND?: MenteeResumeScalarWhereWithAggregatesInput | MenteeResumeScalarWhereWithAggregatesInput[]
    OR?: MenteeResumeScalarWhereWithAggregatesInput[]
    NOT?: MenteeResumeScalarWhereWithAggregatesInput | MenteeResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MenteeResume"> | string
    menteeId?: StringWithAggregatesFilter<"MenteeResume"> | string
    name?: StringWithAggregatesFilter<"MenteeResume"> | string
    fileUrl?: StringWithAggregatesFilter<"MenteeResume"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MenteeResume"> | Date | string
  }

  export type MentorResumeWhereInput = {
    AND?: MentorResumeWhereInput | MentorResumeWhereInput[]
    OR?: MentorResumeWhereInput[]
    NOT?: MentorResumeWhereInput | MentorResumeWhereInput[]
    id?: StringFilter<"MentorResume"> | string
    mentorId?: StringFilter<"MentorResume"> | string
    name?: StringFilter<"MentorResume"> | string
    fileUrl?: StringFilter<"MentorResume"> | string
    createdAt?: DateTimeFilter<"MentorResume"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type MentorResumeOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    mentor?: MentorProfileOrderByWithRelationInput
  }

  export type MentorResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MentorResumeWhereInput | MentorResumeWhereInput[]
    OR?: MentorResumeWhereInput[]
    NOT?: MentorResumeWhereInput | MentorResumeWhereInput[]
    mentorId?: StringFilter<"MentorResume"> | string
    name?: StringFilter<"MentorResume"> | string
    fileUrl?: StringFilter<"MentorResume"> | string
    createdAt?: DateTimeFilter<"MentorResume"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id">

  export type MentorResumeOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    _count?: MentorResumeCountOrderByAggregateInput
    _max?: MentorResumeMaxOrderByAggregateInput
    _min?: MentorResumeMinOrderByAggregateInput
  }

  export type MentorResumeScalarWhereWithAggregatesInput = {
    AND?: MentorResumeScalarWhereWithAggregatesInput | MentorResumeScalarWhereWithAggregatesInput[]
    OR?: MentorResumeScalarWhereWithAggregatesInput[]
    NOT?: MentorResumeScalarWhereWithAggregatesInput | MentorResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MentorResume"> | string
    mentorId?: StringWithAggregatesFilter<"MentorResume"> | string
    name?: StringWithAggregatesFilter<"MentorResume"> | string
    fileUrl?: StringWithAggregatesFilter<"MentorResume"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MentorResume"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    mentorId?: StringFilter<"Service"> | string
    title?: StringFilter<"Service"> | string
    shortDescription?: StringFilter<"Service"> | string
    longDescription?: StringNullableFilter<"Service"> | string | null
    price?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    totalBookings?: IntFilter<"Service"> | number
    totalRevenue?: FloatFilter<"Service"> | number
    averageRating?: FloatFilter<"Service"> | number
    totalReviews?: IntFilter<"Service"> | number
    viewCount?: IntFilter<"Service"> | number
    tags?: StringNullableListFilter<"Service">
    category?: StringNullableFilter<"Service"> | string | null
    isPopular?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    reviews?: ServiceReviewListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrderInput | SortOrder
    price?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
    tags?: SortOrder
    category?: SortOrderInput | SortOrder
    isPopular?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentor?: MentorProfileOrderByWithRelationInput
    reviews?: ServiceReviewOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    mentorId?: StringFilter<"Service"> | string
    title?: StringFilter<"Service"> | string
    shortDescription?: StringFilter<"Service"> | string
    longDescription?: StringNullableFilter<"Service"> | string | null
    price?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    totalBookings?: IntFilter<"Service"> | number
    totalRevenue?: FloatFilter<"Service"> | number
    averageRating?: FloatFilter<"Service"> | number
    totalReviews?: IntFilter<"Service"> | number
    viewCount?: IntFilter<"Service"> | number
    tags?: StringNullableListFilter<"Service">
    category?: StringNullableFilter<"Service"> | string | null
    isPopular?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    reviews?: ServiceReviewListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrderInput | SortOrder
    price?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
    tags?: SortOrder
    category?: SortOrderInput | SortOrder
    isPopular?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    mentorId?: StringWithAggregatesFilter<"Service"> | string
    title?: StringWithAggregatesFilter<"Service"> | string
    shortDescription?: StringWithAggregatesFilter<"Service"> | string
    longDescription?: StringNullableWithAggregatesFilter<"Service"> | string | null
    price?: FloatWithAggregatesFilter<"Service"> | number
    duration?: IntWithAggregatesFilter<"Service"> | number
    status?: EnumServiceStatusWithAggregatesFilter<"Service"> | $Enums.ServiceStatus
    totalBookings?: IntWithAggregatesFilter<"Service"> | number
    totalRevenue?: FloatWithAggregatesFilter<"Service"> | number
    averageRating?: FloatWithAggregatesFilter<"Service"> | number
    totalReviews?: IntWithAggregatesFilter<"Service"> | number
    viewCount?: IntWithAggregatesFilter<"Service"> | number
    tags?: StringNullableListFilter<"Service">
    category?: StringNullableWithAggregatesFilter<"Service"> | string | null
    isPopular?: BoolWithAggregatesFilter<"Service"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type ServiceReviewWhereInput = {
    AND?: ServiceReviewWhereInput | ServiceReviewWhereInput[]
    OR?: ServiceReviewWhereInput[]
    NOT?: ServiceReviewWhereInput | ServiceReviewWhereInput[]
    id?: StringFilter<"ServiceReview"> | string
    serviceId?: StringFilter<"ServiceReview"> | string
    menteeId?: StringFilter<"ServiceReview"> | string
    menteeName?: StringFilter<"ServiceReview"> | string
    rating?: IntFilter<"ServiceReview"> | number
    comment?: StringNullableFilter<"ServiceReview"> | string | null
    isVerified?: BoolFilter<"ServiceReview"> | boolean
    createdAt?: DateTimeFilter<"ServiceReview"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceReview"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }

  export type ServiceReviewOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    menteeId?: SortOrder
    menteeName?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServiceReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceReviewWhereInput | ServiceReviewWhereInput[]
    OR?: ServiceReviewWhereInput[]
    NOT?: ServiceReviewWhereInput | ServiceReviewWhereInput[]
    serviceId?: StringFilter<"ServiceReview"> | string
    menteeId?: StringFilter<"ServiceReview"> | string
    menteeName?: StringFilter<"ServiceReview"> | string
    rating?: IntFilter<"ServiceReview"> | number
    comment?: StringNullableFilter<"ServiceReview"> | string | null
    isVerified?: BoolFilter<"ServiceReview"> | boolean
    createdAt?: DateTimeFilter<"ServiceReview"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceReview"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }, "id">

  export type ServiceReviewOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    menteeId?: SortOrder
    menteeName?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceReviewCountOrderByAggregateInput
    _avg?: ServiceReviewAvgOrderByAggregateInput
    _max?: ServiceReviewMaxOrderByAggregateInput
    _min?: ServiceReviewMinOrderByAggregateInput
    _sum?: ServiceReviewSumOrderByAggregateInput
  }

  export type ServiceReviewScalarWhereWithAggregatesInput = {
    AND?: ServiceReviewScalarWhereWithAggregatesInput | ServiceReviewScalarWhereWithAggregatesInput[]
    OR?: ServiceReviewScalarWhereWithAggregatesInput[]
    NOT?: ServiceReviewScalarWhereWithAggregatesInput | ServiceReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceReview"> | string
    serviceId?: StringWithAggregatesFilter<"ServiceReview"> | string
    menteeId?: StringWithAggregatesFilter<"ServiceReview"> | string
    menteeName?: StringWithAggregatesFilter<"ServiceReview"> | string
    rating?: IntWithAggregatesFilter<"ServiceReview"> | number
    comment?: StringNullableWithAggregatesFilter<"ServiceReview"> | string | null
    isVerified?: BoolWithAggregatesFilter<"ServiceReview"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ServiceReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceReview"> | Date | string
  }

  export type MentorFeedbackWhereInput = {
    AND?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    OR?: MentorFeedbackWhereInput[]
    NOT?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    id?: StringFilter<"MentorFeedback"> | string
    mentorId?: StringFilter<"MentorFeedback"> | string
    sessionId?: StringNullableFilter<"MentorFeedback"> | string | null
    feedbackPdfUrl?: StringNullableFilter<"MentorFeedback"> | string | null
    notes?: StringNullableFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeFilter<"MentorFeedback"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type MentorFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    feedbackPdfUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    mentor?: MentorProfileOrderByWithRelationInput
  }

  export type MentorFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    OR?: MentorFeedbackWhereInput[]
    NOT?: MentorFeedbackWhereInput | MentorFeedbackWhereInput[]
    mentorId?: StringFilter<"MentorFeedback"> | string
    sessionId?: StringNullableFilter<"MentorFeedback"> | string | null
    feedbackPdfUrl?: StringNullableFilter<"MentorFeedback"> | string | null
    notes?: StringNullableFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeFilter<"MentorFeedback"> | Date | string
    mentor?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id">

  export type MentorFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    mentorId?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    feedbackPdfUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
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
    sessionId?: StringNullableWithAggregatesFilter<"MentorFeedback"> | string | null
    feedbackPdfUrl?: StringNullableWithAggregatesFilter<"MentorFeedback"> | string | null
    notes?: StringNullableWithAggregatesFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MentorFeedback"> | Date | string
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
    adminProfile?: AdminProfileCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
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
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
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
    adminProfile?: AdminProfileUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
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
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
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

  export type MentorProfileCreateInput = {
    id?: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    services?: ServiceCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    services?: ServiceUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileCreateManyInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileCreateInput = {
    id?: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
    resumes?: MenteeResumeCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUncheckedCreateInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: MenteeResumeUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
    resumes?: MenteeResumeUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: MenteeResumeUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileCreateManyInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileCreateInput = {
    id?: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAdminProfileInput
  }

  export type AdminProfileUncheckedCreateInput = {
    id?: string
    userId: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAdminProfileNestedInput
  }

  export type AdminProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileCreateManyInput = {
    id?: string
    userId: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorApplicationCreateInput = {
    id?: string
    bio: string
    headline?: string | null
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationCreateverificationIdsInput | string[]
    expertise?: MentorApplicationCreateexpertiseInput | string[]
    bachelors?: MentorApplicationCreatebachelorsInput | string[]
    masters?: MentorApplicationCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationCreatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ApplicationStatus
    rejectionReason?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorApplicationsInput
  }

  export type MentorApplicationUncheckedCreateInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationCreateverificationIdsInput | string[]
    expertise?: MentorApplicationCreateexpertiseInput | string[]
    bachelors?: MentorApplicationCreatebachelorsInput | string[]
    masters?: MentorApplicationCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationCreatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ApplicationStatus
    rejectionReason?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorApplicationsNestedInput
  }

  export type MentorApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorApplicationCreateManyInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationCreateverificationIdsInput | string[]
    expertise?: MentorApplicationCreateexpertiseInput | string[]
    bachelors?: MentorApplicationCreatebachelorsInput | string[]
    masters?: MentorApplicationCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationCreatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ApplicationStatus
    rejectionReason?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeResumeCreateInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
    mentee: MenteeProfileCreateNestedOneWithoutResumesInput
  }

  export type MenteeResumeUncheckedCreateInput = {
    id?: string
    menteeId: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MenteeResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentee?: MenteeProfileUpdateOneRequiredWithoutResumesNestedInput
  }

  export type MenteeResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeResumeCreateManyInput = {
    id?: string
    menteeId: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MenteeResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorResumeCreateInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutResumesInput
  }

  export type MentorResumeUncheckedCreateInput = {
    id?: string
    mentorId: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MentorResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutResumesNestedInput
  }

  export type MentorResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorResumeCreateManyInput = {
    id?: string
    mentorId: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MentorResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutServicesInput
    reviews?: ServiceReviewCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    mentorId: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ServiceReviewUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutServicesNestedInput
    reviews?: ServiceReviewUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ServiceReviewUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    mentorId: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceReviewCreateInput = {
    id?: string
    menteeId: string
    menteeName: string
    rating: number
    comment?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutReviewsInput
  }

  export type ServiceReviewUncheckedCreateInput = {
    id?: string
    serviceId: string
    menteeId: string
    menteeName: string
    rating: number
    comment?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ServiceReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceReviewCreateManyInput = {
    id?: string
    serviceId: string
    menteeId: string
    menteeName: string
    rating: number
    comment?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackCreateInput = {
    id?: string
    sessionId?: string | null
    feedbackPdfUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutFeedbackGivenInput
  }

  export type MentorFeedbackUncheckedCreateInput = {
    id?: string
    mentorId: string
    sessionId?: string | null
    feedbackPdfUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutFeedbackGivenNestedInput
  }

  export type MentorFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackCreateManyInput = {
    id?: string
    mentorId: string
    sessionId?: string | null
    feedbackPdfUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type AdminProfileNullableRelationFilter = {
    is?: AdminProfileWhereInput | null
    isNot?: AdminProfileWhereInput | null
  }

  export type MentorApplicationListRelationFilter = {
    every?: MentorApplicationWhereInput
    some?: MentorApplicationWhereInput
    none?: MentorApplicationWhereInput
  }

  export type VerificationDocumentNullableRelationFilter = {
    is?: VerificationDocumentWhereInput | null
    isNot?: VerificationDocumentWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MentorApplicationOrderByRelationAggregateInput = {
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

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
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

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
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

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type MentorFeedbackListRelationFilter = {
    every?: MentorFeedbackWhereInput
    some?: MentorFeedbackWhereInput
    none?: MentorFeedbackWhereInput
  }

  export type MentorResumeListRelationFilter = {
    every?: MentorResumeWhereInput
    some?: MentorResumeWhereInput
    none?: MentorResumeWhereInput
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrder
    expertise?: SortOrder
    certifications?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    phone?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    socialLinks?: SortOrder
    verificationIds?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrder
    exams?: SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileAvgOrderByAggregateInput = {
    rating?: SortOrder
    totalReviews?: SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
  }

  export type MentorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    phone?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    verificationStatus?: SortOrder
    verifiedBadge?: SortOrder
    phone?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileSumOrderByAggregateInput = {
    rating?: SortOrder
    totalReviews?: SortOrder
    balance?: SortOrder
    totalEarnings?: SortOrder
    pendingEarnings?: SortOrder
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

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
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

  export type MenteeResumeListRelationFilter = {
    every?: MenteeResumeWhereInput
    some?: MenteeResumeWhereInput
    none?: MenteeResumeWhereInput
  }

  export type MenteeResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenteeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    gender?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    catAttempts?: SortOrder
    expectations?: SortOrder
    targetColleges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    gender?: SortOrder
    workExperience?: SortOrder
    expectations?: SortOrder
    targetColleges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dob?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    gender?: SortOrder
    workExperience?: SortOrder
    expectations?: SortOrder
    targetColleges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type MentorApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrder
    phone?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    socialLinks?: SortOrder
    verificationIds?: SortOrder
    expertise?: SortOrder
    bachelors?: SortOrder
    masters?: SortOrder
    workExperience?: SortOrder
    exams?: SortOrder
    certifications?: SortOrder
    resumes?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrder
    phone?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bio?: SortOrder
    headline?: SortOrder
    phone?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    status?: SortOrder
    rejectionReason?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type MenteeProfileRelationFilter = {
    is?: MenteeProfileWhereInput
    isNot?: MenteeProfileWhereInput
  }

  export type MenteeResumeCountOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MenteeResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MenteeResumeMinOrderByAggregateInput = {
    id?: SortOrder
    menteeId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorProfileRelationFilter = {
    is?: MentorProfileWhereInput
    isNot?: MentorProfileWhereInput
  }

  export type MentorResumeCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorResumeMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type ServiceReviewListRelationFilter = {
    every?: ServiceReviewWhereInput
    some?: ServiceReviewWhereInput
    none?: ServiceReviewWhereInput
  }

  export type ServiceReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
    tags?: SortOrder
    category?: SortOrder
    isPopular?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
    category?: SortOrder
    isPopular?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
    category?: SortOrder
    isPopular?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
    totalBookings?: SortOrder
    totalRevenue?: SortOrder
    averageRating?: SortOrder
    totalReviews?: SortOrder
    viewCount?: SortOrder
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ServiceReviewCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    menteeId?: SortOrder
    menteeName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ServiceReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    menteeId?: SortOrder
    menteeName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceReviewMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    menteeId?: SortOrder
    menteeName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type MentorFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    sessionId?: SortOrder
    feedbackPdfUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    sessionId?: SortOrder
    feedbackPdfUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type MentorFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    mentorId?: SortOrder
    sessionId?: SortOrder
    feedbackPdfUrl?: SortOrder
    notes?: SortOrder
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

  export type AdminProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    connect?: AdminProfileWhereUniqueInput
  }

  export type MentorApplicationCreateNestedManyWithoutUserInput = {
    create?: XOR<MentorApplicationCreateWithoutUserInput, MentorApplicationUncheckedCreateWithoutUserInput> | MentorApplicationCreateWithoutUserInput[] | MentorApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MentorApplicationCreateOrConnectWithoutUserInput | MentorApplicationCreateOrConnectWithoutUserInput[]
    createMany?: MentorApplicationCreateManyUserInputEnvelope
    connect?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
  }

  export type VerificationDocumentCreateNestedOneWithoutUserInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput
    connect?: VerificationDocumentWhereUniqueInput
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

  export type AdminProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    connect?: AdminProfileWhereUniqueInput
  }

  export type MentorApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MentorApplicationCreateWithoutUserInput, MentorApplicationUncheckedCreateWithoutUserInput> | MentorApplicationCreateWithoutUserInput[] | MentorApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MentorApplicationCreateOrConnectWithoutUserInput | MentorApplicationCreateOrConnectWithoutUserInput[]
    createMany?: MentorApplicationCreateManyUserInputEnvelope
    connect?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
  }

  export type VerificationDocumentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput
    connect?: VerificationDocumentWhereUniqueInput
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

  export type AdminProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    upsert?: AdminProfileUpsertWithoutUserInput
    disconnect?: AdminProfileWhereInput | boolean
    delete?: AdminProfileWhereInput | boolean
    connect?: AdminProfileWhereUniqueInput
    update?: XOR<XOR<AdminProfileUpdateToOneWithWhereWithoutUserInput, AdminProfileUpdateWithoutUserInput>, AdminProfileUncheckedUpdateWithoutUserInput>
  }

  export type MentorApplicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<MentorApplicationCreateWithoutUserInput, MentorApplicationUncheckedCreateWithoutUserInput> | MentorApplicationCreateWithoutUserInput[] | MentorApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MentorApplicationCreateOrConnectWithoutUserInput | MentorApplicationCreateOrConnectWithoutUserInput[]
    upsert?: MentorApplicationUpsertWithWhereUniqueWithoutUserInput | MentorApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MentorApplicationCreateManyUserInputEnvelope
    set?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    disconnect?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    delete?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    connect?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    update?: MentorApplicationUpdateWithWhereUniqueWithoutUserInput | MentorApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MentorApplicationUpdateManyWithWhereWithoutUserInput | MentorApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MentorApplicationScalarWhereInput | MentorApplicationScalarWhereInput[]
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

  export type AdminProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    upsert?: AdminProfileUpsertWithoutUserInput
    disconnect?: AdminProfileWhereInput | boolean
    delete?: AdminProfileWhereInput | boolean
    connect?: AdminProfileWhereUniqueInput
    update?: XOR<XOR<AdminProfileUpdateToOneWithWhereWithoutUserInput, AdminProfileUpdateWithoutUserInput>, AdminProfileUncheckedUpdateWithoutUserInput>
  }

  export type MentorApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MentorApplicationCreateWithoutUserInput, MentorApplicationUncheckedCreateWithoutUserInput> | MentorApplicationCreateWithoutUserInput[] | MentorApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MentorApplicationCreateOrConnectWithoutUserInput | MentorApplicationCreateOrConnectWithoutUserInput[]
    upsert?: MentorApplicationUpsertWithWhereUniqueWithoutUserInput | MentorApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MentorApplicationCreateManyUserInputEnvelope
    set?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    disconnect?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    delete?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    connect?: MentorApplicationWhereUniqueInput | MentorApplicationWhereUniqueInput[]
    update?: MentorApplicationUpdateWithWhereUniqueWithoutUserInput | MentorApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MentorApplicationUpdateManyWithWhereWithoutUserInput | MentorApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MentorApplicationScalarWhereInput | MentorApplicationScalarWhereInput[]
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

  export type UserCreateNestedOneWithoutVerificationInput = {
    create?: XOR<UserCreateWithoutVerificationInput, UserUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationInput
    connect?: UserWhereUniqueInput
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type UserUpdateOneRequiredWithoutVerificationNestedInput = {
    create?: XOR<UserCreateWithoutVerificationInput, UserUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationInput
    upsert?: UserUpsertWithoutVerificationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerificationInput, UserUpdateWithoutVerificationInput>, UserUncheckedUpdateWithoutVerificationInput>
  }

  export type MentorProfileCreateexpertiseInput = {
    set: string[]
  }

  export type MentorProfileCreatecertificationsInput = {
    set: string[]
  }

  export type MentorProfileCreateverificationIdsInput = {
    set: string[]
  }

  export type MentorProfileCreatebachelorsInput = {
    set: string[]
  }

  export type MentorProfileCreatemastersInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMentorProfileInput = {
    create?: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ServiceCreateNestedManyWithoutMentorInput = {
    create?: XOR<ServiceCreateWithoutMentorInput, ServiceUncheckedCreateWithoutMentorInput> | ServiceCreateWithoutMentorInput[] | ServiceUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutMentorInput | ServiceCreateOrConnectWithoutMentorInput[]
    createMany?: ServiceCreateManyMentorInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type MentorFeedbackCreateNestedManyWithoutMentorInput = {
    create?: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput> | MentorFeedbackCreateWithoutMentorInput[] | MentorFeedbackUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorFeedbackCreateOrConnectWithoutMentorInput | MentorFeedbackCreateOrConnectWithoutMentorInput[]
    createMany?: MentorFeedbackCreateManyMentorInputEnvelope
    connect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
  }

  export type MentorResumeCreateNestedManyWithoutMentorInput = {
    create?: XOR<MentorResumeCreateWithoutMentorInput, MentorResumeUncheckedCreateWithoutMentorInput> | MentorResumeCreateWithoutMentorInput[] | MentorResumeUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorResumeCreateOrConnectWithoutMentorInput | MentorResumeCreateOrConnectWithoutMentorInput[]
    createMany?: MentorResumeCreateManyMentorInputEnvelope
    connect?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<ServiceCreateWithoutMentorInput, ServiceUncheckedCreateWithoutMentorInput> | ServiceCreateWithoutMentorInput[] | ServiceUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutMentorInput | ServiceCreateOrConnectWithoutMentorInput[]
    createMany?: ServiceCreateManyMentorInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<MentorFeedbackCreateWithoutMentorInput, MentorFeedbackUncheckedCreateWithoutMentorInput> | MentorFeedbackCreateWithoutMentorInput[] | MentorFeedbackUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorFeedbackCreateOrConnectWithoutMentorInput | MentorFeedbackCreateOrConnectWithoutMentorInput[]
    createMany?: MentorFeedbackCreateManyMentorInputEnvelope
    connect?: MentorFeedbackWhereUniqueInput | MentorFeedbackWhereUniqueInput[]
  }

  export type MentorResumeUncheckedCreateNestedManyWithoutMentorInput = {
    create?: XOR<MentorResumeCreateWithoutMentorInput, MentorResumeUncheckedCreateWithoutMentorInput> | MentorResumeCreateWithoutMentorInput[] | MentorResumeUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorResumeCreateOrConnectWithoutMentorInput | MentorResumeCreateOrConnectWithoutMentorInput[]
    createMany?: MentorResumeCreateManyMentorInputEnvelope
    connect?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
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

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type MentorProfileUpdateverificationIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorProfileUpdatebachelorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorProfileUpdatemastersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutMentorProfileNestedInput = {
    create?: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorProfileInput
    upsert?: UserUpsertWithoutMentorProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMentorProfileInput, UserUpdateWithoutMentorProfileInput>, UserUncheckedUpdateWithoutMentorProfileInput>
  }

  export type ServiceUpdateManyWithoutMentorNestedInput = {
    create?: XOR<ServiceCreateWithoutMentorInput, ServiceUncheckedCreateWithoutMentorInput> | ServiceCreateWithoutMentorInput[] | ServiceUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutMentorInput | ServiceCreateOrConnectWithoutMentorInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutMentorInput | ServiceUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: ServiceCreateManyMentorInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutMentorInput | ServiceUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutMentorInput | ServiceUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
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

  export type MentorResumeUpdateManyWithoutMentorNestedInput = {
    create?: XOR<MentorResumeCreateWithoutMentorInput, MentorResumeUncheckedCreateWithoutMentorInput> | MentorResumeCreateWithoutMentorInput[] | MentorResumeUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorResumeCreateOrConnectWithoutMentorInput | MentorResumeCreateOrConnectWithoutMentorInput[]
    upsert?: MentorResumeUpsertWithWhereUniqueWithoutMentorInput | MentorResumeUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: MentorResumeCreateManyMentorInputEnvelope
    set?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    disconnect?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    delete?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    connect?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    update?: MentorResumeUpdateWithWhereUniqueWithoutMentorInput | MentorResumeUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: MentorResumeUpdateManyWithWhereWithoutMentorInput | MentorResumeUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: MentorResumeScalarWhereInput | MentorResumeScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutMentorNestedInput = {
    create?: XOR<ServiceCreateWithoutMentorInput, ServiceUncheckedCreateWithoutMentorInput> | ServiceCreateWithoutMentorInput[] | ServiceUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutMentorInput | ServiceCreateOrConnectWithoutMentorInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutMentorInput | ServiceUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: ServiceCreateManyMentorInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutMentorInput | ServiceUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutMentorInput | ServiceUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
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

  export type MentorResumeUncheckedUpdateManyWithoutMentorNestedInput = {
    create?: XOR<MentorResumeCreateWithoutMentorInput, MentorResumeUncheckedCreateWithoutMentorInput> | MentorResumeCreateWithoutMentorInput[] | MentorResumeUncheckedCreateWithoutMentorInput[]
    connectOrCreate?: MentorResumeCreateOrConnectWithoutMentorInput | MentorResumeCreateOrConnectWithoutMentorInput[]
    upsert?: MentorResumeUpsertWithWhereUniqueWithoutMentorInput | MentorResumeUpsertWithWhereUniqueWithoutMentorInput[]
    createMany?: MentorResumeCreateManyMentorInputEnvelope
    set?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    disconnect?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    delete?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    connect?: MentorResumeWhereUniqueInput | MentorResumeWhereUniqueInput[]
    update?: MentorResumeUpdateWithWhereUniqueWithoutMentorInput | MentorResumeUpdateWithWhereUniqueWithoutMentorInput[]
    updateMany?: MentorResumeUpdateManyWithWhereWithoutMentorInput | MentorResumeUpdateManyWithWhereWithoutMentorInput[]
    deleteMany?: MentorResumeScalarWhereInput | MentorResumeScalarWhereInput[]
  }

  export type MenteeProfileCreatebachelorsInput = {
    set: string[]
  }

  export type MenteeProfileCreatemastersInput = {
    set: string[]
  }

  export type MenteeProfileCreatecertificationsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMenteeProfileInput = {
    create?: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMenteeProfileInput
    connect?: UserWhereUniqueInput
  }

  export type MenteeResumeCreateNestedManyWithoutMenteeInput = {
    create?: XOR<MenteeResumeCreateWithoutMenteeInput, MenteeResumeUncheckedCreateWithoutMenteeInput> | MenteeResumeCreateWithoutMenteeInput[] | MenteeResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: MenteeResumeCreateOrConnectWithoutMenteeInput | MenteeResumeCreateOrConnectWithoutMenteeInput[]
    createMany?: MenteeResumeCreateManyMenteeInputEnvelope
    connect?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
  }

  export type MenteeResumeUncheckedCreateNestedManyWithoutMenteeInput = {
    create?: XOR<MenteeResumeCreateWithoutMenteeInput, MenteeResumeUncheckedCreateWithoutMenteeInput> | MenteeResumeCreateWithoutMenteeInput[] | MenteeResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: MenteeResumeCreateOrConnectWithoutMenteeInput | MenteeResumeCreateOrConnectWithoutMenteeInput[]
    createMany?: MenteeResumeCreateManyMenteeInputEnvelope
    connect?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
  }

  export type MenteeProfileUpdatebachelorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MenteeProfileUpdatemastersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MenteeProfileUpdatecertificationsInput = {
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

  export type MenteeResumeUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<MenteeResumeCreateWithoutMenteeInput, MenteeResumeUncheckedCreateWithoutMenteeInput> | MenteeResumeCreateWithoutMenteeInput[] | MenteeResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: MenteeResumeCreateOrConnectWithoutMenteeInput | MenteeResumeCreateOrConnectWithoutMenteeInput[]
    upsert?: MenteeResumeUpsertWithWhereUniqueWithoutMenteeInput | MenteeResumeUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: MenteeResumeCreateManyMenteeInputEnvelope
    set?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    disconnect?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    delete?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    connect?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    update?: MenteeResumeUpdateWithWhereUniqueWithoutMenteeInput | MenteeResumeUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: MenteeResumeUpdateManyWithWhereWithoutMenteeInput | MenteeResumeUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: MenteeResumeScalarWhereInput | MenteeResumeScalarWhereInput[]
  }

  export type MenteeResumeUncheckedUpdateManyWithoutMenteeNestedInput = {
    create?: XOR<MenteeResumeCreateWithoutMenteeInput, MenteeResumeUncheckedCreateWithoutMenteeInput> | MenteeResumeCreateWithoutMenteeInput[] | MenteeResumeUncheckedCreateWithoutMenteeInput[]
    connectOrCreate?: MenteeResumeCreateOrConnectWithoutMenteeInput | MenteeResumeCreateOrConnectWithoutMenteeInput[]
    upsert?: MenteeResumeUpsertWithWhereUniqueWithoutMenteeInput | MenteeResumeUpsertWithWhereUniqueWithoutMenteeInput[]
    createMany?: MenteeResumeCreateManyMenteeInputEnvelope
    set?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    disconnect?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    delete?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    connect?: MenteeResumeWhereUniqueInput | MenteeResumeWhereUniqueInput[]
    update?: MenteeResumeUpdateWithWhereUniqueWithoutMenteeInput | MenteeResumeUpdateWithWhereUniqueWithoutMenteeInput[]
    updateMany?: MenteeResumeUpdateManyWithWhereWithoutMenteeInput | MenteeResumeUpdateManyWithWhereWithoutMenteeInput[]
    deleteMany?: MenteeResumeScalarWhereInput | MenteeResumeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdminProfileInput = {
    create?: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdminProfileNestedInput = {
    create?: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminProfileInput
    upsert?: UserUpsertWithoutAdminProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminProfileInput, UserUpdateWithoutAdminProfileInput>, UserUncheckedUpdateWithoutAdminProfileInput>
  }

  export type MentorApplicationCreateverificationIdsInput = {
    set: string[]
  }

  export type MentorApplicationCreateexpertiseInput = {
    set: string[]
  }

  export type MentorApplicationCreatebachelorsInput = {
    set: string[]
  }

  export type MentorApplicationCreatemastersInput = {
    set: string[]
  }

  export type MentorApplicationCreatecertificationsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMentorApplicationsInput = {
    create?: XOR<UserCreateWithoutMentorApplicationsInput, UserUncheckedCreateWithoutMentorApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorApplicationsInput
    connect?: UserWhereUniqueInput
  }

  export type MentorApplicationUpdateverificationIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorApplicationUpdateexpertiseInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorApplicationUpdatebachelorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorApplicationUpdatemastersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorApplicationUpdatecertificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type UserUpdateOneRequiredWithoutMentorApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutMentorApplicationsInput, UserUncheckedCreateWithoutMentorApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMentorApplicationsInput
    upsert?: UserUpsertWithoutMentorApplicationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMentorApplicationsInput, UserUpdateWithoutMentorApplicationsInput>, UserUncheckedUpdateWithoutMentorApplicationsInput>
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

  export type MentorProfileCreateNestedOneWithoutResumesInput = {
    create?: XOR<MentorProfileCreateWithoutResumesInput, MentorProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutResumesInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type MentorProfileUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<MentorProfileCreateWithoutResumesInput, MentorProfileUncheckedCreateWithoutResumesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutResumesInput
    upsert?: MentorProfileUpsertWithoutResumesInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutResumesInput, MentorProfileUpdateWithoutResumesInput>, MentorProfileUncheckedUpdateWithoutResumesInput>
  }

  export type ServiceCreatetagsInput = {
    set: string[]
  }

  export type MentorProfileCreateNestedOneWithoutServicesInput = {
    create?: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutServicesInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type ServiceReviewCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceReviewCreateWithoutServiceInput, ServiceReviewUncheckedCreateWithoutServiceInput> | ServiceReviewCreateWithoutServiceInput[] | ServiceReviewUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceReviewCreateOrConnectWithoutServiceInput | ServiceReviewCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceReviewCreateManyServiceInputEnvelope
    connect?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
  }

  export type ServiceReviewUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceReviewCreateWithoutServiceInput, ServiceReviewUncheckedCreateWithoutServiceInput> | ServiceReviewCreateWithoutServiceInput[] | ServiceReviewUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceReviewCreateOrConnectWithoutServiceInput | ServiceReviewCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceReviewCreateManyServiceInputEnvelope
    connect?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type ServiceUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MentorProfileUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutServicesInput
    upsert?: MentorProfileUpsertWithoutServicesInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutServicesInput, MentorProfileUpdateWithoutServicesInput>, MentorProfileUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceReviewUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceReviewCreateWithoutServiceInput, ServiceReviewUncheckedCreateWithoutServiceInput> | ServiceReviewCreateWithoutServiceInput[] | ServiceReviewUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceReviewCreateOrConnectWithoutServiceInput | ServiceReviewCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceReviewUpsertWithWhereUniqueWithoutServiceInput | ServiceReviewUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceReviewCreateManyServiceInputEnvelope
    set?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    disconnect?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    delete?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    connect?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    update?: ServiceReviewUpdateWithWhereUniqueWithoutServiceInput | ServiceReviewUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceReviewUpdateManyWithWhereWithoutServiceInput | ServiceReviewUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceReviewScalarWhereInput | ServiceReviewScalarWhereInput[]
  }

  export type ServiceReviewUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceReviewCreateWithoutServiceInput, ServiceReviewUncheckedCreateWithoutServiceInput> | ServiceReviewCreateWithoutServiceInput[] | ServiceReviewUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceReviewCreateOrConnectWithoutServiceInput | ServiceReviewCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceReviewUpsertWithWhereUniqueWithoutServiceInput | ServiceReviewUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceReviewCreateManyServiceInputEnvelope
    set?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    disconnect?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    delete?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    connect?: ServiceReviewWhereUniqueInput | ServiceReviewWhereUniqueInput[]
    update?: ServiceReviewUpdateWithWhereUniqueWithoutServiceInput | ServiceReviewUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceReviewUpdateManyWithWhereWithoutServiceInput | ServiceReviewUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceReviewScalarWhereInput | ServiceReviewScalarWhereInput[]
  }

  export type ServiceCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutReviewsInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutReviewsInput
    upsert?: ServiceUpsertWithoutReviewsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutReviewsInput, ServiceUpdateWithoutReviewsInput>, ServiceUncheckedUpdateWithoutReviewsInput>
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

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
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

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
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

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
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

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type MentorProfileCreateWithoutUserInput = {
    id?: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutUserInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
  }

  export type MenteeProfileCreateWithoutUserInput = {
    id?: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: MenteeResumeCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileUncheckedCreateWithoutUserInput = {
    id?: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resumes?: MenteeResumeUncheckedCreateNestedManyWithoutMenteeInput
  }

  export type MenteeProfileCreateOrConnectWithoutUserInput = {
    where: MenteeProfileWhereUniqueInput
    create: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
  }

  export type AdminProfileCreateWithoutUserInput = {
    id?: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminProfileUncheckedCreateWithoutUserInput = {
    id?: string
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminProfileCreateOrConnectWithoutUserInput = {
    where: AdminProfileWhereUniqueInput
    create: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
  }

  export type MentorApplicationCreateWithoutUserInput = {
    id?: string
    bio: string
    headline?: string | null
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationCreateverificationIdsInput | string[]
    expertise?: MentorApplicationCreateexpertiseInput | string[]
    bachelors?: MentorApplicationCreatebachelorsInput | string[]
    masters?: MentorApplicationCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationCreatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ApplicationStatus
    rejectionReason?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorApplicationUncheckedCreateWithoutUserInput = {
    id?: string
    bio: string
    headline?: string | null
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationCreateverificationIdsInput | string[]
    expertise?: MentorApplicationCreateexpertiseInput | string[]
    bachelors?: MentorApplicationCreatebachelorsInput | string[]
    masters?: MentorApplicationCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationCreatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ApplicationStatus
    rejectionReason?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorApplicationCreateOrConnectWithoutUserInput = {
    where: MentorApplicationWhereUniqueInput
    create: XOR<MentorApplicationCreateWithoutUserInput, MentorApplicationUncheckedCreateWithoutUserInput>
  }

  export type MentorApplicationCreateManyUserInputEnvelope = {
    data: MentorApplicationCreateManyUserInput | MentorApplicationCreateManyUserInput[]
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
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUncheckedUpdateManyWithoutMentorNestedInput
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
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: MenteeResumeUpdateManyWithoutMenteeNestedInput
  }

  export type MenteeProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumes?: MenteeResumeUncheckedUpdateManyWithoutMenteeNestedInput
  }

  export type AdminProfileUpsertWithoutUserInput = {
    update: XOR<AdminProfileUpdateWithoutUserInput, AdminProfileUncheckedUpdateWithoutUserInput>
    create: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    where?: AdminProfileWhereInput
  }

  export type AdminProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminProfileWhereInput
    data: XOR<AdminProfileUpdateWithoutUserInput, AdminProfileUncheckedUpdateWithoutUserInput>
  }

  export type AdminProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: MentorApplicationWhereUniqueInput
    update: XOR<MentorApplicationUpdateWithoutUserInput, MentorApplicationUncheckedUpdateWithoutUserInput>
    create: XOR<MentorApplicationCreateWithoutUserInput, MentorApplicationUncheckedCreateWithoutUserInput>
  }

  export type MentorApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: MentorApplicationWhereUniqueInput
    data: XOR<MentorApplicationUpdateWithoutUserInput, MentorApplicationUncheckedUpdateWithoutUserInput>
  }

  export type MentorApplicationUpdateManyWithWhereWithoutUserInput = {
    where: MentorApplicationScalarWhereInput
    data: XOR<MentorApplicationUpdateManyMutationInput, MentorApplicationUncheckedUpdateManyWithoutUserInput>
  }

  export type MentorApplicationScalarWhereInput = {
    AND?: MentorApplicationScalarWhereInput | MentorApplicationScalarWhereInput[]
    OR?: MentorApplicationScalarWhereInput[]
    NOT?: MentorApplicationScalarWhereInput | MentorApplicationScalarWhereInput[]
    id?: StringFilter<"MentorApplication"> | string
    userId?: StringFilter<"MentorApplication"> | string
    bio?: StringFilter<"MentorApplication"> | string
    headline?: StringNullableFilter<"MentorApplication"> | string | null
    phone?: StringNullableFilter<"MentorApplication"> | string | null
    gender?: EnumGenderNullableFilter<"MentorApplication"> | $Enums.Gender | null
    location?: StringNullableFilter<"MentorApplication"> | string | null
    socialLinks?: JsonNullableFilter<"MentorApplication">
    verificationIds?: StringNullableListFilter<"MentorApplication">
    expertise?: StringNullableListFilter<"MentorApplication">
    bachelors?: StringNullableListFilter<"MentorApplication">
    masters?: StringNullableListFilter<"MentorApplication">
    workExperience?: JsonNullableFilter<"MentorApplication">
    exams?: JsonNullableFilter<"MentorApplication">
    certifications?: StringNullableListFilter<"MentorApplication">
    resumes?: JsonNullableFilter<"MentorApplication">
    status?: EnumApplicationStatusFilter<"MentorApplication"> | $Enums.ApplicationStatus
    rejectionReason?: StringNullableFilter<"MentorApplication"> | string | null
    reviewedAt?: DateTimeNullableFilter<"MentorApplication"> | Date | string | null
    reviewedBy?: StringNullableFilter<"MentorApplication"> | string | null
    createdAt?: DateTimeFilter<"MentorApplication"> | Date | string
    updatedAt?: DateTimeFilter<"MentorApplication"> | Date | string
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
    adminProfile?: AdminProfileCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationCreateNestedManyWithoutUserInput
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
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationUncheckedCreateNestedManyWithoutUserInput
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
    adminProfile?: AdminProfileUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUpdateManyWithoutUserNestedInput
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
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUncheckedUpdateManyWithoutUserNestedInput
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
    adminProfile?: AdminProfileCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
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
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMentorProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
  }

  export type ServiceCreateWithoutMentorInput = {
    id?: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ServiceReviewCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutMentorInput = {
    id?: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ServiceReviewUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutMentorInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutMentorInput, ServiceUncheckedCreateWithoutMentorInput>
  }

  export type ServiceCreateManyMentorInputEnvelope = {
    data: ServiceCreateManyMentorInput | ServiceCreateManyMentorInput[]
    skipDuplicates?: boolean
  }

  export type MentorFeedbackCreateWithoutMentorInput = {
    id?: string
    sessionId?: string | null
    feedbackPdfUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type MentorFeedbackUncheckedCreateWithoutMentorInput = {
    id?: string
    sessionId?: string | null
    feedbackPdfUrl?: string | null
    notes?: string | null
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

  export type MentorResumeCreateWithoutMentorInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MentorResumeUncheckedCreateWithoutMentorInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MentorResumeCreateOrConnectWithoutMentorInput = {
    where: MentorResumeWhereUniqueInput
    create: XOR<MentorResumeCreateWithoutMentorInput, MentorResumeUncheckedCreateWithoutMentorInput>
  }

  export type MentorResumeCreateManyMentorInputEnvelope = {
    data: MentorResumeCreateManyMentorInput | MentorResumeCreateManyMentorInput[]
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
    adminProfile?: AdminProfileUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
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
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ServiceUpsertWithWhereUniqueWithoutMentorInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutMentorInput, ServiceUncheckedUpdateWithoutMentorInput>
    create: XOR<ServiceCreateWithoutMentorInput, ServiceUncheckedCreateWithoutMentorInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutMentorInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutMentorInput, ServiceUncheckedUpdateWithoutMentorInput>
  }

  export type ServiceUpdateManyWithWhereWithoutMentorInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutMentorInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    mentorId?: StringFilter<"Service"> | string
    title?: StringFilter<"Service"> | string
    shortDescription?: StringFilter<"Service"> | string
    longDescription?: StringNullableFilter<"Service"> | string | null
    price?: FloatFilter<"Service"> | number
    duration?: IntFilter<"Service"> | number
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    totalBookings?: IntFilter<"Service"> | number
    totalRevenue?: FloatFilter<"Service"> | number
    averageRating?: FloatFilter<"Service"> | number
    totalReviews?: IntFilter<"Service"> | number
    viewCount?: IntFilter<"Service"> | number
    tags?: StringNullableListFilter<"Service">
    category?: StringNullableFilter<"Service"> | string | null
    isPopular?: BoolFilter<"Service"> | boolean
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
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
    sessionId?: StringNullableFilter<"MentorFeedback"> | string | null
    feedbackPdfUrl?: StringNullableFilter<"MentorFeedback"> | string | null
    notes?: StringNullableFilter<"MentorFeedback"> | string | null
    createdAt?: DateTimeFilter<"MentorFeedback"> | Date | string
  }

  export type MentorResumeUpsertWithWhereUniqueWithoutMentorInput = {
    where: MentorResumeWhereUniqueInput
    update: XOR<MentorResumeUpdateWithoutMentorInput, MentorResumeUncheckedUpdateWithoutMentorInput>
    create: XOR<MentorResumeCreateWithoutMentorInput, MentorResumeUncheckedCreateWithoutMentorInput>
  }

  export type MentorResumeUpdateWithWhereUniqueWithoutMentorInput = {
    where: MentorResumeWhereUniqueInput
    data: XOR<MentorResumeUpdateWithoutMentorInput, MentorResumeUncheckedUpdateWithoutMentorInput>
  }

  export type MentorResumeUpdateManyWithWhereWithoutMentorInput = {
    where: MentorResumeScalarWhereInput
    data: XOR<MentorResumeUpdateManyMutationInput, MentorResumeUncheckedUpdateManyWithoutMentorInput>
  }

  export type MentorResumeScalarWhereInput = {
    AND?: MentorResumeScalarWhereInput | MentorResumeScalarWhereInput[]
    OR?: MentorResumeScalarWhereInput[]
    NOT?: MentorResumeScalarWhereInput | MentorResumeScalarWhereInput[]
    id?: StringFilter<"MentorResume"> | string
    mentorId?: StringFilter<"MentorResume"> | string
    name?: StringFilter<"MentorResume"> | string
    fileUrl?: StringFilter<"MentorResume"> | string
    createdAt?: DateTimeFilter<"MentorResume"> | Date | string
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
    adminProfile?: AdminProfileCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
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
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    mentorApplications?: MentorApplicationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMenteeProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMenteeProfileInput, UserUncheckedCreateWithoutMenteeProfileInput>
  }

  export type MenteeResumeCreateWithoutMenteeInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MenteeResumeUncheckedCreateWithoutMenteeInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MenteeResumeCreateOrConnectWithoutMenteeInput = {
    where: MenteeResumeWhereUniqueInput
    create: XOR<MenteeResumeCreateWithoutMenteeInput, MenteeResumeUncheckedCreateWithoutMenteeInput>
  }

  export type MenteeResumeCreateManyMenteeInputEnvelope = {
    data: MenteeResumeCreateManyMenteeInput | MenteeResumeCreateManyMenteeInput[]
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
    adminProfile?: AdminProfileUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
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
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorApplications?: MentorApplicationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type MenteeResumeUpsertWithWhereUniqueWithoutMenteeInput = {
    where: MenteeResumeWhereUniqueInput
    update: XOR<MenteeResumeUpdateWithoutMenteeInput, MenteeResumeUncheckedUpdateWithoutMenteeInput>
    create: XOR<MenteeResumeCreateWithoutMenteeInput, MenteeResumeUncheckedCreateWithoutMenteeInput>
  }

  export type MenteeResumeUpdateWithWhereUniqueWithoutMenteeInput = {
    where: MenteeResumeWhereUniqueInput
    data: XOR<MenteeResumeUpdateWithoutMenteeInput, MenteeResumeUncheckedUpdateWithoutMenteeInput>
  }

  export type MenteeResumeUpdateManyWithWhereWithoutMenteeInput = {
    where: MenteeResumeScalarWhereInput
    data: XOR<MenteeResumeUpdateManyMutationInput, MenteeResumeUncheckedUpdateManyWithoutMenteeInput>
  }

  export type MenteeResumeScalarWhereInput = {
    AND?: MenteeResumeScalarWhereInput | MenteeResumeScalarWhereInput[]
    OR?: MenteeResumeScalarWhereInput[]
    NOT?: MenteeResumeScalarWhereInput | MenteeResumeScalarWhereInput[]
    id?: StringFilter<"MenteeResume"> | string
    menteeId?: StringFilter<"MenteeResume"> | string
    name?: StringFilter<"MenteeResume"> | string
    fileUrl?: StringFilter<"MenteeResume"> | string
    createdAt?: DateTimeFilter<"MenteeResume"> | Date | string
  }

  export type UserCreateWithoutAdminProfileInput = {
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
    mentorApplications?: MentorApplicationCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminProfileInput = {
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
    mentorApplications?: MentorApplicationUncheckedCreateNestedManyWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
  }

  export type UserUpsertWithoutAdminProfileInput = {
    update: XOR<UserUpdateWithoutAdminProfileInput, UserUncheckedUpdateWithoutAdminProfileInput>
    create: XOR<UserCreateWithoutAdminProfileInput, UserUncheckedCreateWithoutAdminProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminProfileInput, UserUncheckedUpdateWithoutAdminProfileInput>
  }

  export type UserUpdateWithoutAdminProfileInput = {
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
    mentorApplications?: MentorApplicationUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminProfileInput = {
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
    mentorApplications?: MentorApplicationUncheckedUpdateManyWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutMentorApplicationsInput = {
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
    adminProfile?: AdminProfileCreateNestedOneWithoutUserInput
    verification?: VerificationDocumentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMentorApplicationsInput = {
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
    adminProfile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    verification?: VerificationDocumentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMentorApplicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMentorApplicationsInput, UserUncheckedCreateWithoutMentorApplicationsInput>
  }

  export type UserUpsertWithoutMentorApplicationsInput = {
    update: XOR<UserUpdateWithoutMentorApplicationsInput, UserUncheckedUpdateWithoutMentorApplicationsInput>
    create: XOR<UserCreateWithoutMentorApplicationsInput, UserUncheckedCreateWithoutMentorApplicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMentorApplicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMentorApplicationsInput, UserUncheckedUpdateWithoutMentorApplicationsInput>
  }

  export type UserUpdateWithoutMentorApplicationsInput = {
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
    adminProfile?: AdminProfileUpdateOneWithoutUserNestedInput
    verification?: VerificationDocumentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMentorApplicationsInput = {
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
    adminProfile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    verification?: VerificationDocumentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type MenteeProfileCreateWithoutResumesInput = {
    id?: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
  }

  export type MenteeProfileUncheckedCreateWithoutResumesInput = {
    id?: string
    userId: string
    dob?: Date | string | null
    phone?: string | null
    location?: string | null
    gender?: $Enums.Gender | null
    bachelors?: MenteeProfileCreatebachelorsInput | string[]
    masters?: MenteeProfileCreatemastersInput | string[]
    workExperience?: string | null
    certifications?: MenteeProfileCreatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: string | null
    targetColleges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
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
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
  }

  export type MenteeProfileUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    bachelors?: MenteeProfileUpdatebachelorsInput | string[]
    masters?: MenteeProfileUpdatemastersInput | string[]
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: MenteeProfileUpdatecertificationsInput | string[]
    catAttempts?: NullableJsonNullValueInput | InputJsonValue
    expectations?: NullableStringFieldUpdateOperationsInput | string | null
    targetColleges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileCreateWithoutResumesInput = {
    id?: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    services?: ServiceCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutResumesInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutMentorInput
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutResumesInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutResumesInput, MentorProfileUncheckedCreateWithoutResumesInput>
  }

  export type MentorProfileUpsertWithoutResumesInput = {
    update: XOR<MentorProfileUpdateWithoutResumesInput, MentorProfileUncheckedUpdateWithoutResumesInput>
    create: XOR<MentorProfileCreateWithoutResumesInput, MentorProfileUncheckedCreateWithoutResumesInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutResumesInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutResumesInput, MentorProfileUncheckedUpdateWithoutResumesInput>
  }

  export type MentorProfileUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    services?: ServiceUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutMentorNestedInput
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileCreateWithoutServicesInput = {
    id?: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    feedbackGiven?: MentorFeedbackCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutServicesInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbackGiven?: MentorFeedbackUncheckedCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeUncheckedCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileCreateOrConnectWithoutServicesInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
  }

  export type ServiceReviewCreateWithoutServiceInput = {
    id?: string
    menteeId: string
    menteeName: string
    rating: number
    comment?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceReviewUncheckedCreateWithoutServiceInput = {
    id?: string
    menteeId: string
    menteeName: string
    rating: number
    comment?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceReviewCreateOrConnectWithoutServiceInput = {
    where: ServiceReviewWhereUniqueInput
    create: XOR<ServiceReviewCreateWithoutServiceInput, ServiceReviewUncheckedCreateWithoutServiceInput>
  }

  export type ServiceReviewCreateManyServiceInputEnvelope = {
    data: ServiceReviewCreateManyServiceInput | ServiceReviewCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type MentorProfileUpsertWithoutServicesInput = {
    update: XOR<MentorProfileUpdateWithoutServicesInput, MentorProfileUncheckedUpdateWithoutServicesInput>
    create: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutServicesInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutServicesInput, MentorProfileUncheckedUpdateWithoutServicesInput>
  }

  export type MentorProfileUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    feedbackGiven?: MentorFeedbackUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbackGiven?: MentorFeedbackUncheckedUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type ServiceReviewUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServiceReviewWhereUniqueInput
    update: XOR<ServiceReviewUpdateWithoutServiceInput, ServiceReviewUncheckedUpdateWithoutServiceInput>
    create: XOR<ServiceReviewCreateWithoutServiceInput, ServiceReviewUncheckedCreateWithoutServiceInput>
  }

  export type ServiceReviewUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServiceReviewWhereUniqueInput
    data: XOR<ServiceReviewUpdateWithoutServiceInput, ServiceReviewUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceReviewUpdateManyWithWhereWithoutServiceInput = {
    where: ServiceReviewScalarWhereInput
    data: XOR<ServiceReviewUpdateManyMutationInput, ServiceReviewUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceReviewScalarWhereInput = {
    AND?: ServiceReviewScalarWhereInput | ServiceReviewScalarWhereInput[]
    OR?: ServiceReviewScalarWhereInput[]
    NOT?: ServiceReviewScalarWhereInput | ServiceReviewScalarWhereInput[]
    id?: StringFilter<"ServiceReview"> | string
    serviceId?: StringFilter<"ServiceReview"> | string
    menteeId?: StringFilter<"ServiceReview"> | string
    menteeName?: StringFilter<"ServiceReview"> | string
    rating?: IntFilter<"ServiceReview"> | number
    comment?: StringNullableFilter<"ServiceReview"> | string | null
    isVerified?: BoolFilter<"ServiceReview"> | boolean
    createdAt?: DateTimeFilter<"ServiceReview"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceReview"> | Date | string
  }

  export type ServiceCreateWithoutReviewsInput = {
    id?: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentor: MentorProfileCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutReviewsInput = {
    id?: string
    mentorId: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutReviewsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
  }

  export type ServiceUpsertWithoutReviewsInput = {
    update: XOR<ServiceUpdateWithoutReviewsInput, ServiceUncheckedUpdateWithoutReviewsInput>
    create: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutReviewsInput, ServiceUncheckedUpdateWithoutReviewsInput>
  }

  export type ServiceUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentor?: MentorProfileUpdateOneRequiredWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileCreateWithoutFeedbackGivenInput = {
    id?: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    services?: ServiceCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeCreateNestedManyWithoutMentorInput
  }

  export type MentorProfileUncheckedCreateWithoutFeedbackGivenInput = {
    id?: string
    userId: string
    bio: string
    headline?: string | null
    expertise?: MentorProfileCreateexpertiseInput | string[]
    certifications?: MentorProfileCreatecertificationsInput | string[]
    rating?: number
    totalReviews?: number
    verificationStatus?: $Enums.VerificationStatus
    verifiedBadge?: boolean
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileCreateverificationIdsInput | string[]
    bachelors?: MentorProfileCreatebachelorsInput | string[]
    masters?: MentorProfileCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: number
    totalEarnings?: number
    pendingEarnings?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutMentorInput
    resumes?: MentorResumeUncheckedCreateNestedManyWithoutMentorInput
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
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    services?: ServiceUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUpdateManyWithoutMentorNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutFeedbackGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: MentorProfileUpdateexpertiseInput | string[]
    certifications?: MentorProfileUpdatecertificationsInput | string[]
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedBadge?: BoolFieldUpdateOperationsInput | boolean
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorProfileUpdateverificationIdsInput | string[]
    bachelors?: MentorProfileUpdatebachelorsInput | string[]
    masters?: MentorProfileUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    balance?: FloatFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    pendingEarnings?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutMentorNestedInput
    resumes?: MentorResumeUncheckedUpdateManyWithoutMentorNestedInput
  }

  export type MentorApplicationCreateManyUserInput = {
    id?: string
    bio: string
    headline?: string | null
    phone?: string | null
    gender?: $Enums.Gender | null
    location?: string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationCreateverificationIdsInput | string[]
    expertise?: MentorApplicationCreateexpertiseInput | string[]
    bachelors?: MentorApplicationCreatebachelorsInput | string[]
    masters?: MentorApplicationCreatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationCreatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ApplicationStatus
    rejectionReason?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorApplicationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorApplicationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorApplicationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    socialLinks?: NullableJsonNullValueInput | InputJsonValue
    verificationIds?: MentorApplicationUpdateverificationIdsInput | string[]
    expertise?: MentorApplicationUpdateexpertiseInput | string[]
    bachelors?: MentorApplicationUpdatebachelorsInput | string[]
    masters?: MentorApplicationUpdatemastersInput | string[]
    workExperience?: NullableJsonNullValueInput | InputJsonValue
    exams?: NullableJsonNullValueInput | InputJsonValue
    certifications?: MentorApplicationUpdatecertificationsInput | string[]
    resumes?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyMentorInput = {
    id?: string
    title: string
    shortDescription: string
    longDescription?: string | null
    price: number
    duration: number
    status?: $Enums.ServiceStatus
    totalBookings?: number
    totalRevenue?: number
    averageRating?: number
    totalReviews?: number
    viewCount?: number
    tags?: ServiceCreatetagsInput | string[]
    category?: string | null
    isPopular?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorFeedbackCreateManyMentorInput = {
    id?: string
    sessionId?: string | null
    feedbackPdfUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type MentorResumeCreateManyMentorInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type ServiceUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ServiceReviewUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ServiceReviewUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    totalBookings?: IntFieldUpdateOperationsInput | number
    totalRevenue?: FloatFieldUpdateOperationsInput | number
    averageRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    tags?: ServiceUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorFeedbackUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackPdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorResumeUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorResumeUncheckedUpdateWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorResumeUncheckedUpdateManyWithoutMentorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeResumeCreateManyMenteeInput = {
    id?: string
    name: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MenteeResumeUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeResumeUncheckedUpdateWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeResumeUncheckedUpdateManyWithoutMenteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceReviewCreateManyServiceInput = {
    id?: string
    menteeId: string
    menteeName: string
    rating: number
    comment?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceReviewUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceReviewUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceReviewUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    menteeId?: StringFieldUpdateOperationsInput | string
    menteeName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationDocumentDefaultArgs instead
     */
    export type VerificationDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationDocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorProfileDefaultArgs instead
     */
    export type MentorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenteeProfileDefaultArgs instead
     */
    export type MenteeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenteeProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminProfileDefaultArgs instead
     */
    export type AdminProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorApplicationDefaultArgs instead
     */
    export type MentorApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorApplicationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenteeResumeDefaultArgs instead
     */
    export type MenteeResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenteeResumeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorResumeDefaultArgs instead
     */
    export type MentorResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorResumeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceReviewDefaultArgs instead
     */
    export type ServiceReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MentorFeedbackDefaultArgs instead
     */
    export type MentorFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorFeedbackDefaultArgs<ExtArgs>

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