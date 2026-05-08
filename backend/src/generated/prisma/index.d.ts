
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
 * Model MentorService
 * 
 */
export type MentorService = $Result.DefaultSelection<Prisma.$MentorServicePayload>
/**
 * Model WeeklyAvailability
 * 
 */
export type WeeklyAvailability = $Result.DefaultSelection<Prisma.$WeeklyAvailabilityPayload>
/**
 * Model TimeSlot
 * 
 */
export type TimeSlot = $Result.DefaultSelection<Prisma.$TimeSlotPayload>

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


export const MentorApprovalStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type MentorApprovalStatus = (typeof MentorApprovalStatus)[keyof typeof MentorApprovalStatus]


export const MentorServiceType: {
  SOP_REVIEW: 'SOP_REVIEW',
  RESUME_CURATION: 'RESUME_CURATION',
  MOCK_INTERVIEW: 'MOCK_INTERVIEW',
  WAT_GD_PREP: 'WAT_GD_PREP',
  KNOW_YOUR_COLLEGE: 'KNOW_YOUR_COLLEGE',
  ONE_ON_ONE_CONNECT: 'ONE_ON_ONE_CONNECT'
};

export type MentorServiceType = (typeof MentorServiceType)[keyof typeof MentorServiceType]


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

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type MentorApprovalStatus = $Enums.MentorApprovalStatus

export const MentorApprovalStatus: typeof $Enums.MentorApprovalStatus

export type MentorServiceType = $Enums.MentorServiceType

export const MentorServiceType: typeof $Enums.MentorServiceType

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

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
   * `prisma.mentorService`: Exposes CRUD operations for the **MentorService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MentorServices
    * const mentorServices = await prisma.mentorService.findMany()
    * ```
    */
  get mentorService(): Prisma.MentorServiceDelegate<ExtArgs>;

  /**
   * `prisma.weeklyAvailability`: Exposes CRUD operations for the **WeeklyAvailability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklyAvailabilities
    * const weeklyAvailabilities = await prisma.weeklyAvailability.findMany()
    * ```
    */
  get weeklyAvailability(): Prisma.WeeklyAvailabilityDelegate<ExtArgs>;

  /**
   * `prisma.timeSlot`: Exposes CRUD operations for the **TimeSlot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeSlots
    * const timeSlots = await prisma.timeSlot.findMany()
    * ```
    */
  get timeSlot(): Prisma.TimeSlotDelegate<ExtArgs>;
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
    MentorService: 'MentorService',
    WeeklyAvailability: 'WeeklyAvailability',
    TimeSlot: 'TimeSlot'
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
      modelProps: "user" | "menteeProfile" | "mentorProfile" | "mentorService" | "weeklyAvailability" | "timeSlot"
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
      WeeklyAvailability: {
        payload: Prisma.$WeeklyAvailabilityPayload<ExtArgs>
        fields: Prisma.WeeklyAvailabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyAvailabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyAvailabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          findFirst: {
            args: Prisma.WeeklyAvailabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyAvailabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          findMany: {
            args: Prisma.WeeklyAvailabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>[]
          }
          create: {
            args: Prisma.WeeklyAvailabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          createMany: {
            args: Prisma.WeeklyAvailabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyAvailabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>[]
          }
          delete: {
            args: Prisma.WeeklyAvailabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          update: {
            args: Prisma.WeeklyAvailabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          deleteMany: {
            args: Prisma.WeeklyAvailabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyAvailabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WeeklyAvailabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyAvailabilityPayload>
          }
          aggregate: {
            args: Prisma.WeeklyAvailabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeeklyAvailability>
          }
          groupBy: {
            args: Prisma.WeeklyAvailabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeeklyAvailabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyAvailabilityCountArgs<ExtArgs>
            result: $Utils.Optional<WeeklyAvailabilityCountAggregateOutputType> | number
          }
        }
      }
      TimeSlot: {
        payload: Prisma.$TimeSlotPayload<ExtArgs>
        fields: Prisma.TimeSlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeSlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeSlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          findFirst: {
            args: Prisma.TimeSlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeSlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          findMany: {
            args: Prisma.TimeSlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          create: {
            args: Prisma.TimeSlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          createMany: {
            args: Prisma.TimeSlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeSlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          delete: {
            args: Prisma.TimeSlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          update: {
            args: Prisma.TimeSlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          deleteMany: {
            args: Prisma.TimeSlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeSlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TimeSlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          aggregate: {
            args: Prisma.TimeSlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeSlot>
          }
          groupBy: {
            args: Prisma.TimeSlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeSlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeSlotCountArgs<ExtArgs>
            result: $Utils.Optional<TimeSlotCountAggregateOutputType> | number
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
   * Count Type MentorProfileCountOutputType
   */

  export type MentorProfileCountOutputType = {
    services: number
    availability: number
  }

  export type MentorProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | MentorProfileCountOutputTypeCountServicesArgs
    availability?: boolean | MentorProfileCountOutputTypeCountAvailabilityArgs
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
    where?: MentorServiceWhereInput
  }

  /**
   * MentorProfileCountOutputType without action
   */
  export type MentorProfileCountOutputTypeCountAvailabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyAvailabilityWhereInput
  }


  /**
   * Count Type WeeklyAvailabilityCountOutputType
   */

  export type WeeklyAvailabilityCountOutputType = {
    timeSlots: number
  }

  export type WeeklyAvailabilityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeSlots?: boolean | WeeklyAvailabilityCountOutputTypeCountTimeSlotsArgs
  }

  // Custom InputTypes
  /**
   * WeeklyAvailabilityCountOutputType without action
   */
  export type WeeklyAvailabilityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailabilityCountOutputType
     */
    select?: WeeklyAvailabilityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WeeklyAvailabilityCountOutputType without action
   */
  export type WeeklyAvailabilityCountOutputTypeCountTimeSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeSlotWhereInput
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
    isRoleSelected: boolean | null
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
    isRoleSelected: boolean | null
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
    isRoleSelected: number
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
    isRoleSelected?: true
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
    isRoleSelected?: true
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
    isRoleSelected?: true
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
    isRoleSelected: boolean
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    menteeProfile?: boolean | User$menteeProfileArgs<ExtArgs>
    mentorProfile?: boolean | User$mentorProfileArgs<ExtArgs>
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
    isRoleSelected?: boolean
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menteeProfile?: boolean | User$menteeProfileArgs<ExtArgs>
    mentorProfile?: boolean | User$mentorProfileArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      menteeProfile: Prisma.$MenteeProfilePayload<ExtArgs> | null
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs> | null
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
      isRoleSelected: boolean
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
    menteeProfile<T extends User$menteeProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$menteeProfileArgs<ExtArgs>>): Prisma__MenteeProfileClient<$Result.GetResult<Prisma.$MenteeProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    mentorProfile<T extends User$mentorProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$mentorProfileArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
    readonly isRoleSelected: FieldRef<"User", 'Boolean'>
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
    dateOfBirth: Date | null
    contactNumber: string | null
    otherMbaScore: number | null
    workExperience: string | null
    certifications: string | null
    resumeUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dateOfBirth: Date | null
    contactNumber: string | null
    otherMbaScore: number | null
    workExperience: string | null
    certifications: string | null
    resumeUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenteeProfileCountAggregateOutputType = {
    id: number
    userId: number
    dateOfBirth: number
    contactNumber: number
    education: number
    otherMbaScore: number
    workExperience: number
    certifications: number
    catHistory: number
    resumeUrl: number
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
    dateOfBirth?: true
    contactNumber?: true
    otherMbaScore?: true
    workExperience?: true
    certifications?: true
    resumeUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    dateOfBirth?: true
    contactNumber?: true
    otherMbaScore?: true
    workExperience?: true
    certifications?: true
    resumeUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenteeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    dateOfBirth?: true
    contactNumber?: true
    education?: true
    otherMbaScore?: true
    workExperience?: true
    certifications?: true
    catHistory?: true
    resumeUrl?: true
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
    dateOfBirth: Date
    contactNumber: string
    education: JsonValue
    otherMbaScore: number | null
    workExperience: string | null
    certifications: string | null
    catHistory: JsonValue | null
    resumeUrl: string | null
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
    dateOfBirth?: boolean
    contactNumber?: boolean
    education?: boolean
    otherMbaScore?: boolean
    workExperience?: boolean
    certifications?: boolean
    catHistory?: boolean
    resumeUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dateOfBirth?: boolean
    contactNumber?: boolean
    education?: boolean
    otherMbaScore?: boolean
    workExperience?: boolean
    certifications?: boolean
    catHistory?: boolean
    resumeUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menteeProfile"]>

  export type MenteeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    dateOfBirth?: boolean
    contactNumber?: boolean
    education?: boolean
    otherMbaScore?: boolean
    workExperience?: boolean
    certifications?: boolean
    catHistory?: boolean
    resumeUrl?: boolean
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
      dateOfBirth: Date
      contactNumber: string
      education: Prisma.JsonValue
      otherMbaScore: number | null
      workExperience: string | null
      certifications: string | null
      catHistory: Prisma.JsonValue | null
      resumeUrl: string | null
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
    readonly dateOfBirth: FieldRef<"MenteeProfile", 'DateTime'>
    readonly contactNumber: FieldRef<"MenteeProfile", 'String'>
    readonly education: FieldRef<"MenteeProfile", 'Json'>
    readonly otherMbaScore: FieldRef<"MenteeProfile", 'Float'>
    readonly workExperience: FieldRef<"MenteeProfile", 'String'>
    readonly certifications: FieldRef<"MenteeProfile", 'String'>
    readonly catHistory: FieldRef<"MenteeProfile", 'Json'>
    readonly resumeUrl: FieldRef<"MenteeProfile", 'String'>
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
    _min: MentorProfileMinAggregateOutputType | null
    _max: MentorProfileMaxAggregateOutputType | null
  }

  export type MentorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    linkedInUrl: string | null
    contactNumber: string | null
    bio: string | null
    ugCollegeProfile: string | null
    pgProfile: string | null
    workExperience: string | null
    certifications: string | null
    profilePhotoUrl: string | null
    collegeDocumentUrl: string | null
    isVerified: boolean | null
    approvalStatus: $Enums.MentorApprovalStatus | null
    adminReviewNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    linkedInUrl: string | null
    contactNumber: string | null
    bio: string | null
    ugCollegeProfile: string | null
    pgProfile: string | null
    workExperience: string | null
    certifications: string | null
    profilePhotoUrl: string | null
    collegeDocumentUrl: string | null
    isVerified: boolean | null
    approvalStatus: $Enums.MentorApprovalStatus | null
    adminReviewNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorProfileCountAggregateOutputType = {
    id: number
    userId: number
    linkedInUrl: number
    contactNumber: number
    bio: number
    expertiseTags: number
    ugCollegeProfile: number
    pgProfile: number
    workExperience: number
    certifications: number
    profilePhotoUrl: number
    collegeDocumentUrl: number
    isVerified: number
    approvalStatus: number
    adminReviewNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    linkedInUrl?: true
    contactNumber?: true
    bio?: true
    ugCollegeProfile?: true
    pgProfile?: true
    workExperience?: true
    certifications?: true
    profilePhotoUrl?: true
    collegeDocumentUrl?: true
    isVerified?: true
    approvalStatus?: true
    adminReviewNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    linkedInUrl?: true
    contactNumber?: true
    bio?: true
    ugCollegeProfile?: true
    pgProfile?: true
    workExperience?: true
    certifications?: true
    profilePhotoUrl?: true
    collegeDocumentUrl?: true
    isVerified?: true
    approvalStatus?: true
    adminReviewNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    linkedInUrl?: true
    contactNumber?: true
    bio?: true
    expertiseTags?: true
    ugCollegeProfile?: true
    pgProfile?: true
    workExperience?: true
    certifications?: true
    profilePhotoUrl?: true
    collegeDocumentUrl?: true
    isVerified?: true
    approvalStatus?: true
    adminReviewNotes?: true
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
    _min?: MentorProfileMinAggregateInputType
    _max?: MentorProfileMaxAggregateInputType
  }

  export type MentorProfileGroupByOutputType = {
    id: string
    userId: string
    linkedInUrl: string | null
    contactNumber: string
    bio: string
    expertiseTags: string[]
    ugCollegeProfile: string | null
    pgProfile: string | null
    workExperience: string | null
    certifications: string | null
    profilePhotoUrl: string | null
    collegeDocumentUrl: string | null
    isVerified: boolean
    approvalStatus: $Enums.MentorApprovalStatus
    adminReviewNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: MentorProfileCountAggregateOutputType | null
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
    linkedInUrl?: boolean
    contactNumber?: boolean
    bio?: boolean
    expertiseTags?: boolean
    ugCollegeProfile?: boolean
    pgProfile?: boolean
    workExperience?: boolean
    certifications?: boolean
    profilePhotoUrl?: boolean
    collegeDocumentUrl?: boolean
    isVerified?: boolean
    approvalStatus?: boolean
    adminReviewNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | MentorProfile$servicesArgs<ExtArgs>
    availability?: boolean | MentorProfile$availabilityArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    linkedInUrl?: boolean
    contactNumber?: boolean
    bio?: boolean
    expertiseTags?: boolean
    ugCollegeProfile?: boolean
    pgProfile?: boolean
    workExperience?: boolean
    certifications?: boolean
    profilePhotoUrl?: boolean
    collegeDocumentUrl?: boolean
    isVerified?: boolean
    approvalStatus?: boolean
    adminReviewNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorProfile"]>

  export type MentorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    linkedInUrl?: boolean
    contactNumber?: boolean
    bio?: boolean
    expertiseTags?: boolean
    ugCollegeProfile?: boolean
    pgProfile?: boolean
    workExperience?: boolean
    certifications?: boolean
    profilePhotoUrl?: boolean
    collegeDocumentUrl?: boolean
    isVerified?: boolean
    approvalStatus?: boolean
    adminReviewNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    services?: boolean | MentorProfile$servicesArgs<ExtArgs>
    availability?: boolean | MentorProfile$availabilityArgs<ExtArgs>
    _count?: boolean | MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MentorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MentorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      services: Prisma.$MentorServicePayload<ExtArgs>[]
      availability: Prisma.$WeeklyAvailabilityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      linkedInUrl: string | null
      contactNumber: string
      bio: string
      expertiseTags: string[]
      ugCollegeProfile: string | null
      pgProfile: string | null
      workExperience: string | null
      certifications: string | null
      profilePhotoUrl: string | null
      collegeDocumentUrl: string | null
      isVerified: boolean
      approvalStatus: $Enums.MentorApprovalStatus
      adminReviewNotes: string | null
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
    services<T extends MentorProfile$servicesArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorServicePayload<ExtArgs>, T, "findMany"> | Null>
    availability<T extends MentorProfile$availabilityArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfile$availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly linkedInUrl: FieldRef<"MentorProfile", 'String'>
    readonly contactNumber: FieldRef<"MentorProfile", 'String'>
    readonly bio: FieldRef<"MentorProfile", 'String'>
    readonly expertiseTags: FieldRef<"MentorProfile", 'String[]'>
    readonly ugCollegeProfile: FieldRef<"MentorProfile", 'String'>
    readonly pgProfile: FieldRef<"MentorProfile", 'String'>
    readonly workExperience: FieldRef<"MentorProfile", 'String'>
    readonly certifications: FieldRef<"MentorProfile", 'String'>
    readonly profilePhotoUrl: FieldRef<"MentorProfile", 'String'>
    readonly collegeDocumentUrl: FieldRef<"MentorProfile", 'String'>
    readonly isVerified: FieldRef<"MentorProfile", 'Boolean'>
    readonly approvalStatus: FieldRef<"MentorProfile", 'MentorApprovalStatus'>
    readonly adminReviewNotes: FieldRef<"MentorProfile", 'String'>
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
   * MentorProfile.availability
   */
  export type MentorProfile$availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    where?: WeeklyAvailabilityWhereInput
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    cursor?: WeeklyAvailabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
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
    pricePerSession: number | null
  }

  export type MentorServiceSumAggregateOutputType = {
    pricePerSession: number | null
  }

  export type MentorServiceMinAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    serviceType: $Enums.MentorServiceType | null
    pricePerSession: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorServiceMaxAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    serviceType: $Enums.MentorServiceType | null
    pricePerSession: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorServiceCountAggregateOutputType = {
    id: number
    mentorProfileId: number
    serviceType: number
    pricePerSession: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorServiceAvgAggregateInputType = {
    pricePerSession?: true
  }

  export type MentorServiceSumAggregateInputType = {
    pricePerSession?: true
  }

  export type MentorServiceMinAggregateInputType = {
    id?: true
    mentorProfileId?: true
    serviceType?: true
    pricePerSession?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorServiceMaxAggregateInputType = {
    id?: true
    mentorProfileId?: true
    serviceType?: true
    pricePerSession?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorServiceCountAggregateInputType = {
    id?: true
    mentorProfileId?: true
    serviceType?: true
    pricePerSession?: true
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
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
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
    serviceType?: boolean
    pricePerSession?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorService"]>

  export type MentorServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    serviceType?: boolean
    pricePerSession?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mentorService"]>

  export type MentorServiceSelectScalar = {
    id?: boolean
    mentorProfileId?: boolean
    serviceType?: boolean
    pricePerSession?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }
  export type MentorServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $MentorServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MentorService"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorProfileId: string
      serviceType: $Enums.MentorServiceType
      pricePerSession: number
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
    readonly serviceType: FieldRef<"MentorService", 'MentorServiceType'>
    readonly pricePerSession: FieldRef<"MentorService", 'Float'>
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
   * Model WeeklyAvailability
   */

  export type AggregateWeeklyAvailability = {
    _count: WeeklyAvailabilityCountAggregateOutputType | null
    _min: WeeklyAvailabilityMinAggregateOutputType | null
    _max: WeeklyAvailabilityMaxAggregateOutputType | null
  }

  export type WeeklyAvailabilityMinAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyAvailabilityMaxAggregateOutputType = {
    id: string | null
    mentorProfileId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyAvailabilityCountAggregateOutputType = {
    id: number
    mentorProfileId: number
    dayOfWeek: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeeklyAvailabilityMinAggregateInputType = {
    id?: true
    mentorProfileId?: true
    dayOfWeek?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyAvailabilityMaxAggregateInputType = {
    id?: true
    mentorProfileId?: true
    dayOfWeek?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyAvailabilityCountAggregateInputType = {
    id?: true
    mentorProfileId?: true
    dayOfWeek?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeeklyAvailabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyAvailability to aggregate.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklyAvailabilities
    **/
    _count?: true | WeeklyAvailabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyAvailabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyAvailabilityMaxAggregateInputType
  }

  export type GetWeeklyAvailabilityAggregateType<T extends WeeklyAvailabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklyAvailability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklyAvailability[P]>
      : GetScalarType<T[P], AggregateWeeklyAvailability[P]>
  }




  export type WeeklyAvailabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyAvailabilityWhereInput
    orderBy?: WeeklyAvailabilityOrderByWithAggregationInput | WeeklyAvailabilityOrderByWithAggregationInput[]
    by: WeeklyAvailabilityScalarFieldEnum[] | WeeklyAvailabilityScalarFieldEnum
    having?: WeeklyAvailabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyAvailabilityCountAggregateInputType | true
    _min?: WeeklyAvailabilityMinAggregateInputType
    _max?: WeeklyAvailabilityMaxAggregateInputType
  }

  export type WeeklyAvailabilityGroupByOutputType = {
    id: string
    mentorProfileId: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt: Date
    updatedAt: Date
    _count: WeeklyAvailabilityCountAggregateOutputType | null
    _min: WeeklyAvailabilityMinAggregateOutputType | null
    _max: WeeklyAvailabilityMaxAggregateOutputType | null
  }

  type GetWeeklyAvailabilityGroupByPayload<T extends WeeklyAvailabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyAvailabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyAvailabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyAvailabilityGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyAvailabilityGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyAvailabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    timeSlots?: boolean | WeeklyAvailability$timeSlotsArgs<ExtArgs>
    _count?: boolean | WeeklyAvailabilityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyAvailability"]>

  export type WeeklyAvailabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mentorProfileId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyAvailability"]>

  export type WeeklyAvailabilitySelectScalar = {
    id?: boolean
    mentorProfileId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeeklyAvailabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
    timeSlots?: boolean | WeeklyAvailability$timeSlotsArgs<ExtArgs>
    _count?: boolean | WeeklyAvailabilityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WeeklyAvailabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mentorProfile?: boolean | MentorProfileDefaultArgs<ExtArgs>
  }

  export type $WeeklyAvailabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklyAvailability"
    objects: {
      mentorProfile: Prisma.$MentorProfilePayload<ExtArgs>
      timeSlots: Prisma.$TimeSlotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mentorProfileId: string
      dayOfWeek: $Enums.DayOfWeek
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weeklyAvailability"]>
    composites: {}
  }

  type WeeklyAvailabilityGetPayload<S extends boolean | null | undefined | WeeklyAvailabilityDefaultArgs> = $Result.GetResult<Prisma.$WeeklyAvailabilityPayload, S>

  type WeeklyAvailabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WeeklyAvailabilityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WeeklyAvailabilityCountAggregateInputType | true
    }

  export interface WeeklyAvailabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklyAvailability'], meta: { name: 'WeeklyAvailability' } }
    /**
     * Find zero or one WeeklyAvailability that matches the filter.
     * @param {WeeklyAvailabilityFindUniqueArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeeklyAvailabilityFindUniqueArgs>(args: SelectSubset<T, WeeklyAvailabilityFindUniqueArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WeeklyAvailability that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WeeklyAvailabilityFindUniqueOrThrowArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeeklyAvailabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, WeeklyAvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WeeklyAvailability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityFindFirstArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeeklyAvailabilityFindFirstArgs>(args?: SelectSubset<T, WeeklyAvailabilityFindFirstArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WeeklyAvailability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityFindFirstOrThrowArgs} args - Arguments to find a WeeklyAvailability
     * @example
     * // Get one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeeklyAvailabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, WeeklyAvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WeeklyAvailabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklyAvailabilities
     * const weeklyAvailabilities = await prisma.weeklyAvailability.findMany()
     * 
     * // Get first 10 WeeklyAvailabilities
     * const weeklyAvailabilities = await prisma.weeklyAvailability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyAvailabilityWithIdOnly = await prisma.weeklyAvailability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeeklyAvailabilityFindManyArgs>(args?: SelectSubset<T, WeeklyAvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WeeklyAvailability.
     * @param {WeeklyAvailabilityCreateArgs} args - Arguments to create a WeeklyAvailability.
     * @example
     * // Create one WeeklyAvailability
     * const WeeklyAvailability = await prisma.weeklyAvailability.create({
     *   data: {
     *     // ... data to create a WeeklyAvailability
     *   }
     * })
     * 
     */
    create<T extends WeeklyAvailabilityCreateArgs>(args: SelectSubset<T, WeeklyAvailabilityCreateArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WeeklyAvailabilities.
     * @param {WeeklyAvailabilityCreateManyArgs} args - Arguments to create many WeeklyAvailabilities.
     * @example
     * // Create many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeeklyAvailabilityCreateManyArgs>(args?: SelectSubset<T, WeeklyAvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklyAvailabilities and returns the data saved in the database.
     * @param {WeeklyAvailabilityCreateManyAndReturnArgs} args - Arguments to create many WeeklyAvailabilities.
     * @example
     * // Create many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklyAvailabilities and only return the `id`
     * const weeklyAvailabilityWithIdOnly = await prisma.weeklyAvailability.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeeklyAvailabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, WeeklyAvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WeeklyAvailability.
     * @param {WeeklyAvailabilityDeleteArgs} args - Arguments to delete one WeeklyAvailability.
     * @example
     * // Delete one WeeklyAvailability
     * const WeeklyAvailability = await prisma.weeklyAvailability.delete({
     *   where: {
     *     // ... filter to delete one WeeklyAvailability
     *   }
     * })
     * 
     */
    delete<T extends WeeklyAvailabilityDeleteArgs>(args: SelectSubset<T, WeeklyAvailabilityDeleteArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WeeklyAvailability.
     * @param {WeeklyAvailabilityUpdateArgs} args - Arguments to update one WeeklyAvailability.
     * @example
     * // Update one WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeeklyAvailabilityUpdateArgs>(args: SelectSubset<T, WeeklyAvailabilityUpdateArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WeeklyAvailabilities.
     * @param {WeeklyAvailabilityDeleteManyArgs} args - Arguments to filter WeeklyAvailabilities to delete.
     * @example
     * // Delete a few WeeklyAvailabilities
     * const { count } = await prisma.weeklyAvailability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeeklyAvailabilityDeleteManyArgs>(args?: SelectSubset<T, WeeklyAvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklyAvailabilities
     * const weeklyAvailability = await prisma.weeklyAvailability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeeklyAvailabilityUpdateManyArgs>(args: SelectSubset<T, WeeklyAvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WeeklyAvailability.
     * @param {WeeklyAvailabilityUpsertArgs} args - Arguments to update or create a WeeklyAvailability.
     * @example
     * // Update or create a WeeklyAvailability
     * const weeklyAvailability = await prisma.weeklyAvailability.upsert({
     *   create: {
     *     // ... data to create a WeeklyAvailability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklyAvailability we want to update
     *   }
     * })
     */
    upsert<T extends WeeklyAvailabilityUpsertArgs>(args: SelectSubset<T, WeeklyAvailabilityUpsertArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WeeklyAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityCountArgs} args - Arguments to filter WeeklyAvailabilities to count.
     * @example
     * // Count the number of WeeklyAvailabilities
     * const count = await prisma.weeklyAvailability.count({
     *   where: {
     *     // ... the filter for the WeeklyAvailabilities we want to count
     *   }
     * })
    **/
    count<T extends WeeklyAvailabilityCountArgs>(
      args?: Subset<T, WeeklyAvailabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyAvailabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklyAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WeeklyAvailabilityAggregateArgs>(args: Subset<T, WeeklyAvailabilityAggregateArgs>): Prisma.PrismaPromise<GetWeeklyAvailabilityAggregateType<T>>

    /**
     * Group by WeeklyAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyAvailabilityGroupByArgs} args - Group by arguments.
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
      T extends WeeklyAvailabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyAvailabilityGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyAvailabilityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WeeklyAvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklyAvailability model
   */
  readonly fields: WeeklyAvailabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklyAvailability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyAvailabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mentorProfile<T extends MentorProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MentorProfileDefaultArgs<ExtArgs>>): Prisma__MentorProfileClient<$Result.GetResult<Prisma.$MentorProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    timeSlots<T extends WeeklyAvailability$timeSlotsArgs<ExtArgs> = {}>(args?: Subset<T, WeeklyAvailability$timeSlotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the WeeklyAvailability model
   */ 
  interface WeeklyAvailabilityFieldRefs {
    readonly id: FieldRef<"WeeklyAvailability", 'String'>
    readonly mentorProfileId: FieldRef<"WeeklyAvailability", 'String'>
    readonly dayOfWeek: FieldRef<"WeeklyAvailability", 'DayOfWeek'>
    readonly createdAt: FieldRef<"WeeklyAvailability", 'DateTime'>
    readonly updatedAt: FieldRef<"WeeklyAvailability", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeeklyAvailability findUnique
   */
  export type WeeklyAvailabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability findUniqueOrThrow
   */
  export type WeeklyAvailabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability findFirst
   */
  export type WeeklyAvailabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyAvailabilities.
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyAvailabilities.
     */
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability findFirstOrThrow
   */
  export type WeeklyAvailabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailability to fetch.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyAvailabilities.
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyAvailabilities.
     */
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability findMany
   */
  export type WeeklyAvailabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyAvailabilities to fetch.
     */
    where?: WeeklyAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyAvailabilities to fetch.
     */
    orderBy?: WeeklyAvailabilityOrderByWithRelationInput | WeeklyAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklyAvailabilities.
     */
    cursor?: WeeklyAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyAvailabilities.
     */
    skip?: number
    distinct?: WeeklyAvailabilityScalarFieldEnum | WeeklyAvailabilityScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability create
   */
  export type WeeklyAvailabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklyAvailability.
     */
    data: XOR<WeeklyAvailabilityCreateInput, WeeklyAvailabilityUncheckedCreateInput>
  }

  /**
   * WeeklyAvailability createMany
   */
  export type WeeklyAvailabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklyAvailabilities.
     */
    data: WeeklyAvailabilityCreateManyInput | WeeklyAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyAvailability createManyAndReturn
   */
  export type WeeklyAvailabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WeeklyAvailabilities.
     */
    data: WeeklyAvailabilityCreateManyInput | WeeklyAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyAvailability update
   */
  export type WeeklyAvailabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklyAvailability.
     */
    data: XOR<WeeklyAvailabilityUpdateInput, WeeklyAvailabilityUncheckedUpdateInput>
    /**
     * Choose, which WeeklyAvailability to update.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability updateMany
   */
  export type WeeklyAvailabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklyAvailabilities.
     */
    data: XOR<WeeklyAvailabilityUpdateManyMutationInput, WeeklyAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyAvailabilities to update
     */
    where?: WeeklyAvailabilityWhereInput
  }

  /**
   * WeeklyAvailability upsert
   */
  export type WeeklyAvailabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklyAvailability to update in case it exists.
     */
    where: WeeklyAvailabilityWhereUniqueInput
    /**
     * In case the WeeklyAvailability found by the `where` argument doesn't exist, create a new WeeklyAvailability with this data.
     */
    create: XOR<WeeklyAvailabilityCreateInput, WeeklyAvailabilityUncheckedCreateInput>
    /**
     * In case the WeeklyAvailability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyAvailabilityUpdateInput, WeeklyAvailabilityUncheckedUpdateInput>
  }

  /**
   * WeeklyAvailability delete
   */
  export type WeeklyAvailabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
    /**
     * Filter which WeeklyAvailability to delete.
     */
    where: WeeklyAvailabilityWhereUniqueInput
  }

  /**
   * WeeklyAvailability deleteMany
   */
  export type WeeklyAvailabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyAvailabilities to delete
     */
    where?: WeeklyAvailabilityWhereInput
  }

  /**
   * WeeklyAvailability.timeSlots
   */
  export type WeeklyAvailability$timeSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    where?: TimeSlotWhereInput
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    cursor?: TimeSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * WeeklyAvailability without action
   */
  export type WeeklyAvailabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyAvailability
     */
    select?: WeeklyAvailabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyAvailabilityInclude<ExtArgs> | null
  }


  /**
   * Model TimeSlot
   */

  export type AggregateTimeSlot = {
    _count: TimeSlotCountAggregateOutputType | null
    _min: TimeSlotMinAggregateOutputType | null
    _max: TimeSlotMaxAggregateOutputType | null
  }

  export type TimeSlotMinAggregateOutputType = {
    id: string | null
    weeklyAvailabilityId: string | null
    startTime: string | null
    endTime: string | null
  }

  export type TimeSlotMaxAggregateOutputType = {
    id: string | null
    weeklyAvailabilityId: string | null
    startTime: string | null
    endTime: string | null
  }

  export type TimeSlotCountAggregateOutputType = {
    id: number
    weeklyAvailabilityId: number
    startTime: number
    endTime: number
    _all: number
  }


  export type TimeSlotMinAggregateInputType = {
    id?: true
    weeklyAvailabilityId?: true
    startTime?: true
    endTime?: true
  }

  export type TimeSlotMaxAggregateInputType = {
    id?: true
    weeklyAvailabilityId?: true
    startTime?: true
    endTime?: true
  }

  export type TimeSlotCountAggregateInputType = {
    id?: true
    weeklyAvailabilityId?: true
    startTime?: true
    endTime?: true
    _all?: true
  }

  export type TimeSlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeSlot to aggregate.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeSlots
    **/
    _count?: true | TimeSlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeSlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeSlotMaxAggregateInputType
  }

  export type GetTimeSlotAggregateType<T extends TimeSlotAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeSlot[P]>
      : GetScalarType<T[P], AggregateTimeSlot[P]>
  }




  export type TimeSlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeSlotWhereInput
    orderBy?: TimeSlotOrderByWithAggregationInput | TimeSlotOrderByWithAggregationInput[]
    by: TimeSlotScalarFieldEnum[] | TimeSlotScalarFieldEnum
    having?: TimeSlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeSlotCountAggregateInputType | true
    _min?: TimeSlotMinAggregateInputType
    _max?: TimeSlotMaxAggregateInputType
  }

  export type TimeSlotGroupByOutputType = {
    id: string
    weeklyAvailabilityId: string
    startTime: string
    endTime: string
    _count: TimeSlotCountAggregateOutputType | null
    _min: TimeSlotMinAggregateOutputType | null
    _max: TimeSlotMaxAggregateOutputType | null
  }

  type GetTimeSlotGroupByPayload<T extends TimeSlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeSlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeSlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeSlotGroupByOutputType[P]>
            : GetScalarType<T[P], TimeSlotGroupByOutputType[P]>
        }
      >
    >


  export type TimeSlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weeklyAvailabilityId?: boolean
    startTime?: boolean
    endTime?: boolean
    weeklyAvailability?: boolean | WeeklyAvailabilityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weeklyAvailabilityId?: boolean
    startTime?: boolean
    endTime?: boolean
    weeklyAvailability?: boolean | WeeklyAvailabilityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectScalar = {
    id?: boolean
    weeklyAvailabilityId?: boolean
    startTime?: boolean
    endTime?: boolean
  }

  export type TimeSlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weeklyAvailability?: boolean | WeeklyAvailabilityDefaultArgs<ExtArgs>
  }
  export type TimeSlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    weeklyAvailability?: boolean | WeeklyAvailabilityDefaultArgs<ExtArgs>
  }

  export type $TimeSlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeSlot"
    objects: {
      weeklyAvailability: Prisma.$WeeklyAvailabilityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      weeklyAvailabilityId: string
      startTime: string
      endTime: string
    }, ExtArgs["result"]["timeSlot"]>
    composites: {}
  }

  type TimeSlotGetPayload<S extends boolean | null | undefined | TimeSlotDefaultArgs> = $Result.GetResult<Prisma.$TimeSlotPayload, S>

  type TimeSlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TimeSlotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TimeSlotCountAggregateInputType | true
    }

  export interface TimeSlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeSlot'], meta: { name: 'TimeSlot' } }
    /**
     * Find zero or one TimeSlot that matches the filter.
     * @param {TimeSlotFindUniqueArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeSlotFindUniqueArgs>(args: SelectSubset<T, TimeSlotFindUniqueArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TimeSlot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TimeSlotFindUniqueOrThrowArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeSlotFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TimeSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindFirstArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeSlotFindFirstArgs>(args?: SelectSubset<T, TimeSlotFindFirstArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TimeSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindFirstOrThrowArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeSlotFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TimeSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeSlots
     * const timeSlots = await prisma.timeSlot.findMany()
     * 
     * // Get first 10 TimeSlots
     * const timeSlots = await prisma.timeSlot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeSlotFindManyArgs>(args?: SelectSubset<T, TimeSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TimeSlot.
     * @param {TimeSlotCreateArgs} args - Arguments to create a TimeSlot.
     * @example
     * // Create one TimeSlot
     * const TimeSlot = await prisma.timeSlot.create({
     *   data: {
     *     // ... data to create a TimeSlot
     *   }
     * })
     * 
     */
    create<T extends TimeSlotCreateArgs>(args: SelectSubset<T, TimeSlotCreateArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TimeSlots.
     * @param {TimeSlotCreateManyArgs} args - Arguments to create many TimeSlots.
     * @example
     * // Create many TimeSlots
     * const timeSlot = await prisma.timeSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeSlotCreateManyArgs>(args?: SelectSubset<T, TimeSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeSlots and returns the data saved in the database.
     * @param {TimeSlotCreateManyAndReturnArgs} args - Arguments to create many TimeSlots.
     * @example
     * // Create many TimeSlots
     * const timeSlot = await prisma.timeSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeSlots and only return the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeSlotCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TimeSlot.
     * @param {TimeSlotDeleteArgs} args - Arguments to delete one TimeSlot.
     * @example
     * // Delete one TimeSlot
     * const TimeSlot = await prisma.timeSlot.delete({
     *   where: {
     *     // ... filter to delete one TimeSlot
     *   }
     * })
     * 
     */
    delete<T extends TimeSlotDeleteArgs>(args: SelectSubset<T, TimeSlotDeleteArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TimeSlot.
     * @param {TimeSlotUpdateArgs} args - Arguments to update one TimeSlot.
     * @example
     * // Update one TimeSlot
     * const timeSlot = await prisma.timeSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeSlotUpdateArgs>(args: SelectSubset<T, TimeSlotUpdateArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TimeSlots.
     * @param {TimeSlotDeleteManyArgs} args - Arguments to filter TimeSlots to delete.
     * @example
     * // Delete a few TimeSlots
     * const { count } = await prisma.timeSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeSlotDeleteManyArgs>(args?: SelectSubset<T, TimeSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeSlots
     * const timeSlot = await prisma.timeSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeSlotUpdateManyArgs>(args: SelectSubset<T, TimeSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TimeSlot.
     * @param {TimeSlotUpsertArgs} args - Arguments to update or create a TimeSlot.
     * @example
     * // Update or create a TimeSlot
     * const timeSlot = await prisma.timeSlot.upsert({
     *   create: {
     *     // ... data to create a TimeSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeSlot we want to update
     *   }
     * })
     */
    upsert<T extends TimeSlotUpsertArgs>(args: SelectSubset<T, TimeSlotUpsertArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TimeSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotCountArgs} args - Arguments to filter TimeSlots to count.
     * @example
     * // Count the number of TimeSlots
     * const count = await prisma.timeSlot.count({
     *   where: {
     *     // ... the filter for the TimeSlots we want to count
     *   }
     * })
    **/
    count<T extends TimeSlotCountArgs>(
      args?: Subset<T, TimeSlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeSlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TimeSlotAggregateArgs>(args: Subset<T, TimeSlotAggregateArgs>): Prisma.PrismaPromise<GetTimeSlotAggregateType<T>>

    /**
     * Group by TimeSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotGroupByArgs} args - Group by arguments.
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
      T extends TimeSlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeSlotGroupByArgs['orderBy'] }
        : { orderBy?: TimeSlotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TimeSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeSlot model
   */
  readonly fields: TimeSlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeSlot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeSlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    weeklyAvailability<T extends WeeklyAvailabilityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WeeklyAvailabilityDefaultArgs<ExtArgs>>): Prisma__WeeklyAvailabilityClient<$Result.GetResult<Prisma.$WeeklyAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TimeSlot model
   */ 
  interface TimeSlotFieldRefs {
    readonly id: FieldRef<"TimeSlot", 'String'>
    readonly weeklyAvailabilityId: FieldRef<"TimeSlot", 'String'>
    readonly startTime: FieldRef<"TimeSlot", 'String'>
    readonly endTime: FieldRef<"TimeSlot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimeSlot findUnique
   */
  export type TimeSlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot findUniqueOrThrow
   */
  export type TimeSlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot findFirst
   */
  export type TimeSlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeSlots.
     */
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot findFirstOrThrow
   */
  export type TimeSlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeSlots.
     */
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot findMany
   */
  export type TimeSlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlots to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot create
   */
  export type TimeSlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeSlot.
     */
    data: XOR<TimeSlotCreateInput, TimeSlotUncheckedCreateInput>
  }

  /**
   * TimeSlot createMany
   */
  export type TimeSlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeSlots.
     */
    data: TimeSlotCreateManyInput | TimeSlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeSlot createManyAndReturn
   */
  export type TimeSlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TimeSlots.
     */
    data: TimeSlotCreateManyInput | TimeSlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeSlot update
   */
  export type TimeSlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeSlot.
     */
    data: XOR<TimeSlotUpdateInput, TimeSlotUncheckedUpdateInput>
    /**
     * Choose, which TimeSlot to update.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot updateMany
   */
  export type TimeSlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeSlots.
     */
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyInput>
    /**
     * Filter which TimeSlots to update
     */
    where?: TimeSlotWhereInput
  }

  /**
   * TimeSlot upsert
   */
  export type TimeSlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeSlot to update in case it exists.
     */
    where: TimeSlotWhereUniqueInput
    /**
     * In case the TimeSlot found by the `where` argument doesn't exist, create a new TimeSlot with this data.
     */
    create: XOR<TimeSlotCreateInput, TimeSlotUncheckedCreateInput>
    /**
     * In case the TimeSlot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeSlotUpdateInput, TimeSlotUncheckedUpdateInput>
  }

  /**
   * TimeSlot delete
   */
  export type TimeSlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter which TimeSlot to delete.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot deleteMany
   */
  export type TimeSlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeSlots to delete
     */
    where?: TimeSlotWhereInput
  }

  /**
   * TimeSlot without action
   */
  export type TimeSlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
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
    isRoleSelected: 'isRoleSelected',
    isVerified: 'isVerified',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MenteeProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dateOfBirth: 'dateOfBirth',
    contactNumber: 'contactNumber',
    education: 'education',
    otherMbaScore: 'otherMbaScore',
    workExperience: 'workExperience',
    certifications: 'certifications',
    catHistory: 'catHistory',
    resumeUrl: 'resumeUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MenteeProfileScalarFieldEnum = (typeof MenteeProfileScalarFieldEnum)[keyof typeof MenteeProfileScalarFieldEnum]


  export const MentorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    linkedInUrl: 'linkedInUrl',
    contactNumber: 'contactNumber',
    bio: 'bio',
    expertiseTags: 'expertiseTags',
    ugCollegeProfile: 'ugCollegeProfile',
    pgProfile: 'pgProfile',
    workExperience: 'workExperience',
    certifications: 'certifications',
    profilePhotoUrl: 'profilePhotoUrl',
    collegeDocumentUrl: 'collegeDocumentUrl',
    isVerified: 'isVerified',
    approvalStatus: 'approvalStatus',
    adminReviewNotes: 'adminReviewNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorProfileScalarFieldEnum = (typeof MentorProfileScalarFieldEnum)[keyof typeof MentorProfileScalarFieldEnum]


  export const MentorServiceScalarFieldEnum: {
    id: 'id',
    mentorProfileId: 'mentorProfileId',
    serviceType: 'serviceType',
    pricePerSession: 'pricePerSession',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorServiceScalarFieldEnum = (typeof MentorServiceScalarFieldEnum)[keyof typeof MentorServiceScalarFieldEnum]


  export const WeeklyAvailabilityScalarFieldEnum: {
    id: 'id',
    mentorProfileId: 'mentorProfileId',
    dayOfWeek: 'dayOfWeek',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeeklyAvailabilityScalarFieldEnum = (typeof WeeklyAvailabilityScalarFieldEnum)[keyof typeof WeeklyAvailabilityScalarFieldEnum]


  export const TimeSlotScalarFieldEnum: {
    id: 'id',
    weeklyAvailabilityId: 'weeklyAvailabilityId',
    startTime: 'startTime',
    endTime: 'endTime'
  };

  export type TimeSlotScalarFieldEnum = (typeof TimeSlotScalarFieldEnum)[keyof typeof TimeSlotScalarFieldEnum]


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
   * Reference to a field of type 'MentorServiceType'
   */
  export type EnumMentorServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MentorServiceType'>
    


  /**
   * Reference to a field of type 'MentorServiceType[]'
   */
  export type ListEnumMentorServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MentorServiceType[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
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
    isRoleSelected?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    menteeProfile?: XOR<MenteeProfileNullableRelationFilter, MenteeProfileWhereInput> | null
    mentorProfile?: XOR<MentorProfileNullableRelationFilter, MentorProfileWhereInput> | null
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
    isRoleSelected?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    menteeProfile?: MenteeProfileOrderByWithRelationInput
    mentorProfile?: MentorProfileOrderByWithRelationInput
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
    isRoleSelected?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    menteeProfile?: XOR<MenteeProfileNullableRelationFilter, MenteeProfileWhereInput> | null
    mentorProfile?: XOR<MentorProfileNullableRelationFilter, MentorProfileWhereInput> | null
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
    isRoleSelected?: SortOrder
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
    isRoleSelected?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
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
    dateOfBirth?: DateTimeFilter<"MenteeProfile"> | Date | string
    contactNumber?: StringFilter<"MenteeProfile"> | string
    education?: JsonFilter<"MenteeProfile">
    otherMbaScore?: FloatNullableFilter<"MenteeProfile"> | number | null
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableFilter<"MenteeProfile"> | string | null
    catHistory?: JsonNullableFilter<"MenteeProfile">
    resumeUrl?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MenteeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    education?: SortOrder
    otherMbaScore?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    catHistory?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MenteeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    OR?: MenteeProfileWhereInput[]
    NOT?: MenteeProfileWhereInput | MenteeProfileWhereInput[]
    dateOfBirth?: DateTimeFilter<"MenteeProfile"> | Date | string
    contactNumber?: StringFilter<"MenteeProfile"> | string
    education?: JsonFilter<"MenteeProfile">
    otherMbaScore?: FloatNullableFilter<"MenteeProfile"> | number | null
    workExperience?: StringNullableFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableFilter<"MenteeProfile"> | string | null
    catHistory?: JsonNullableFilter<"MenteeProfile">
    resumeUrl?: StringNullableFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MenteeProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type MenteeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    education?: SortOrder
    otherMbaScore?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    catHistory?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
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
    dateOfBirth?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
    contactNumber?: StringWithAggregatesFilter<"MenteeProfile"> | string
    education?: JsonWithAggregatesFilter<"MenteeProfile">
    otherMbaScore?: FloatNullableWithAggregatesFilter<"MenteeProfile"> | number | null
    workExperience?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    certifications?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    catHistory?: JsonNullableWithAggregatesFilter<"MenteeProfile">
    resumeUrl?: StringNullableWithAggregatesFilter<"MenteeProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MenteeProfile"> | Date | string
  }

  export type MentorProfileWhereInput = {
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    id?: StringFilter<"MentorProfile"> | string
    userId?: StringFilter<"MentorProfile"> | string
    linkedInUrl?: StringNullableFilter<"MentorProfile"> | string | null
    contactNumber?: StringFilter<"MentorProfile"> | string
    bio?: StringFilter<"MentorProfile"> | string
    expertiseTags?: StringNullableListFilter<"MentorProfile">
    ugCollegeProfile?: StringNullableFilter<"MentorProfile"> | string | null
    pgProfile?: StringNullableFilter<"MentorProfile"> | string | null
    workExperience?: StringNullableFilter<"MentorProfile"> | string | null
    certifications?: StringNullableFilter<"MentorProfile"> | string | null
    profilePhotoUrl?: StringNullableFilter<"MentorProfile"> | string | null
    collegeDocumentUrl?: StringNullableFilter<"MentorProfile"> | string | null
    isVerified?: BoolFilter<"MentorProfile"> | boolean
    approvalStatus?: EnumMentorApprovalStatusFilter<"MentorProfile"> | $Enums.MentorApprovalStatus
    adminReviewNotes?: StringNullableFilter<"MentorProfile"> | string | null
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    services?: MentorServiceListRelationFilter
    availability?: WeeklyAvailabilityListRelationFilter
  }

  export type MentorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    contactNumber?: SortOrder
    bio?: SortOrder
    expertiseTags?: SortOrder
    ugCollegeProfile?: SortOrderInput | SortOrder
    pgProfile?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    collegeDocumentUrl?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    approvalStatus?: SortOrder
    adminReviewNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    services?: MentorServiceOrderByRelationAggregateInput
    availability?: WeeklyAvailabilityOrderByRelationAggregateInput
  }

  export type MentorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MentorProfileWhereInput | MentorProfileWhereInput[]
    OR?: MentorProfileWhereInput[]
    NOT?: MentorProfileWhereInput | MentorProfileWhereInput[]
    linkedInUrl?: StringNullableFilter<"MentorProfile"> | string | null
    contactNumber?: StringFilter<"MentorProfile"> | string
    bio?: StringFilter<"MentorProfile"> | string
    expertiseTags?: StringNullableListFilter<"MentorProfile">
    ugCollegeProfile?: StringNullableFilter<"MentorProfile"> | string | null
    pgProfile?: StringNullableFilter<"MentorProfile"> | string | null
    workExperience?: StringNullableFilter<"MentorProfile"> | string | null
    certifications?: StringNullableFilter<"MentorProfile"> | string | null
    profilePhotoUrl?: StringNullableFilter<"MentorProfile"> | string | null
    collegeDocumentUrl?: StringNullableFilter<"MentorProfile"> | string | null
    isVerified?: BoolFilter<"MentorProfile"> | boolean
    approvalStatus?: EnumMentorApprovalStatusFilter<"MentorProfile"> | $Enums.MentorApprovalStatus
    adminReviewNotes?: StringNullableFilter<"MentorProfile"> | string | null
    createdAt?: DateTimeFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MentorProfile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    services?: MentorServiceListRelationFilter
    availability?: WeeklyAvailabilityListRelationFilter
  }, "id" | "userId">

  export type MentorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    contactNumber?: SortOrder
    bio?: SortOrder
    expertiseTags?: SortOrder
    ugCollegeProfile?: SortOrderInput | SortOrder
    pgProfile?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    certifications?: SortOrderInput | SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    collegeDocumentUrl?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    approvalStatus?: SortOrder
    adminReviewNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorProfileCountOrderByAggregateInput
    _max?: MentorProfileMaxOrderByAggregateInput
    _min?: MentorProfileMinOrderByAggregateInput
  }

  export type MentorProfileScalarWhereWithAggregatesInput = {
    AND?: MentorProfileScalarWhereWithAggregatesInput | MentorProfileScalarWhereWithAggregatesInput[]
    OR?: MentorProfileScalarWhereWithAggregatesInput[]
    NOT?: MentorProfileScalarWhereWithAggregatesInput | MentorProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MentorProfile"> | string
    userId?: StringWithAggregatesFilter<"MentorProfile"> | string
    linkedInUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    contactNumber?: StringWithAggregatesFilter<"MentorProfile"> | string
    bio?: StringWithAggregatesFilter<"MentorProfile"> | string
    expertiseTags?: StringNullableListFilter<"MentorProfile">
    ugCollegeProfile?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    pgProfile?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    workExperience?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    certifications?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    profilePhotoUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    collegeDocumentUrl?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    isVerified?: BoolWithAggregatesFilter<"MentorProfile"> | boolean
    approvalStatus?: EnumMentorApprovalStatusWithAggregatesFilter<"MentorProfile"> | $Enums.MentorApprovalStatus
    adminReviewNotes?: StringNullableWithAggregatesFilter<"MentorProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorProfile"> | Date | string
  }

  export type MentorServiceWhereInput = {
    AND?: MentorServiceWhereInput | MentorServiceWhereInput[]
    OR?: MentorServiceWhereInput[]
    NOT?: MentorServiceWhereInput | MentorServiceWhereInput[]
    id?: StringFilter<"MentorService"> | string
    mentorProfileId?: StringFilter<"MentorService"> | string
    serviceType?: EnumMentorServiceTypeFilter<"MentorService"> | $Enums.MentorServiceType
    pricePerSession?: FloatFilter<"MentorService"> | number
    isActive?: BoolFilter<"MentorService"> | boolean
    createdAt?: DateTimeFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeFilter<"MentorService"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }

  export type MentorServiceOrderByWithRelationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceType?: SortOrder
    pricePerSession?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentorProfile?: MentorProfileOrderByWithRelationInput
  }

  export type MentorServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mentorProfileId_serviceType?: MentorServiceMentorProfileIdServiceTypeCompoundUniqueInput
    AND?: MentorServiceWhereInput | MentorServiceWhereInput[]
    OR?: MentorServiceWhereInput[]
    NOT?: MentorServiceWhereInput | MentorServiceWhereInput[]
    mentorProfileId?: StringFilter<"MentorService"> | string
    serviceType?: EnumMentorServiceTypeFilter<"MentorService"> | $Enums.MentorServiceType
    pricePerSession?: FloatFilter<"MentorService"> | number
    isActive?: BoolFilter<"MentorService"> | boolean
    createdAt?: DateTimeFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeFilter<"MentorService"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
  }, "id" | "mentorProfileId_serviceType">

  export type MentorServiceOrderByWithAggregationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceType?: SortOrder
    pricePerSession?: SortOrder
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
    serviceType?: EnumMentorServiceTypeWithAggregatesFilter<"MentorService"> | $Enums.MentorServiceType
    pricePerSession?: FloatWithAggregatesFilter<"MentorService"> | number
    isActive?: BoolWithAggregatesFilter<"MentorService"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MentorService"> | Date | string
  }

  export type WeeklyAvailabilityWhereInput = {
    AND?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    OR?: WeeklyAvailabilityWhereInput[]
    NOT?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    id?: StringFilter<"WeeklyAvailability"> | string
    mentorProfileId?: StringFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    createdAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    timeSlots?: TimeSlotListRelationFilter
  }

  export type WeeklyAvailabilityOrderByWithRelationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mentorProfile?: MentorProfileOrderByWithRelationInput
    timeSlots?: TimeSlotOrderByRelationAggregateInput
  }

  export type WeeklyAvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mentorProfileId_dayOfWeek?: WeeklyAvailabilityMentorProfileIdDayOfWeekCompoundUniqueInput
    AND?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    OR?: WeeklyAvailabilityWhereInput[]
    NOT?: WeeklyAvailabilityWhereInput | WeeklyAvailabilityWhereInput[]
    mentorProfileId?: StringFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    createdAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    mentorProfile?: XOR<MentorProfileRelationFilter, MentorProfileWhereInput>
    timeSlots?: TimeSlotListRelationFilter
  }, "id" | "mentorProfileId_dayOfWeek">

  export type WeeklyAvailabilityOrderByWithAggregationInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeeklyAvailabilityCountOrderByAggregateInput
    _max?: WeeklyAvailabilityMaxOrderByAggregateInput
    _min?: WeeklyAvailabilityMinOrderByAggregateInput
  }

  export type WeeklyAvailabilityScalarWhereWithAggregatesInput = {
    AND?: WeeklyAvailabilityScalarWhereWithAggregatesInput | WeeklyAvailabilityScalarWhereWithAggregatesInput[]
    OR?: WeeklyAvailabilityScalarWhereWithAggregatesInput[]
    NOT?: WeeklyAvailabilityScalarWhereWithAggregatesInput | WeeklyAvailabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklyAvailability"> | string
    mentorProfileId?: StringWithAggregatesFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    createdAt?: DateTimeWithAggregatesFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeeklyAvailability"> | Date | string
  }

  export type TimeSlotWhereInput = {
    AND?: TimeSlotWhereInput | TimeSlotWhereInput[]
    OR?: TimeSlotWhereInput[]
    NOT?: TimeSlotWhereInput | TimeSlotWhereInput[]
    id?: StringFilter<"TimeSlot"> | string
    weeklyAvailabilityId?: StringFilter<"TimeSlot"> | string
    startTime?: StringFilter<"TimeSlot"> | string
    endTime?: StringFilter<"TimeSlot"> | string
    weeklyAvailability?: XOR<WeeklyAvailabilityRelationFilter, WeeklyAvailabilityWhereInput>
  }

  export type TimeSlotOrderByWithRelationInput = {
    id?: SortOrder
    weeklyAvailabilityId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    weeklyAvailability?: WeeklyAvailabilityOrderByWithRelationInput
  }

  export type TimeSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeSlotWhereInput | TimeSlotWhereInput[]
    OR?: TimeSlotWhereInput[]
    NOT?: TimeSlotWhereInput | TimeSlotWhereInput[]
    weeklyAvailabilityId?: StringFilter<"TimeSlot"> | string
    startTime?: StringFilter<"TimeSlot"> | string
    endTime?: StringFilter<"TimeSlot"> | string
    weeklyAvailability?: XOR<WeeklyAvailabilityRelationFilter, WeeklyAvailabilityWhereInput>
  }, "id">

  export type TimeSlotOrderByWithAggregationInput = {
    id?: SortOrder
    weeklyAvailabilityId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    _count?: TimeSlotCountOrderByAggregateInput
    _max?: TimeSlotMaxOrderByAggregateInput
    _min?: TimeSlotMinOrderByAggregateInput
  }

  export type TimeSlotScalarWhereWithAggregatesInput = {
    AND?: TimeSlotScalarWhereWithAggregatesInput | TimeSlotScalarWhereWithAggregatesInput[]
    OR?: TimeSlotScalarWhereWithAggregatesInput[]
    NOT?: TimeSlotScalarWhereWithAggregatesInput | TimeSlotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeSlot"> | string
    weeklyAvailabilityId?: StringWithAggregatesFilter<"TimeSlot"> | string
    startTime?: StringWithAggregatesFilter<"TimeSlot"> | string
    endTime?: StringWithAggregatesFilter<"TimeSlot"> | string
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
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
    isRoleSelected?: boolean
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MenteeProfileCreateInput = {
    id?: string
    dateOfBirth: Date | string
    contactNumber: string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMenteeProfileInput
  }

  export type MenteeProfileUncheckedCreateInput = {
    id?: string
    userId: string
    dateOfBirth: Date | string
    contactNumber: string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMenteeProfileNestedInput
  }

  export type MenteeProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileCreateManyInput = {
    id?: string
    userId: string
    dateOfBirth: Date | string
    contactNumber: string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileCreateInput = {
    id?: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    services?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availability?: WeeklyAvailabilityCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availability?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    services?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availability?: WeeklyAvailabilityUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availability?: WeeklyAvailabilityUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileCreateManyInput = {
    id?: string
    userId: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceCreateInput = {
    id?: string
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutServicesInput
  }

  export type MentorServiceUncheckedCreateInput = {
    id?: string
    mentorProfileId: string
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutServicesNestedInput
  }

  export type MentorServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceCreateManyInput = {
    id?: string
    mentorProfileId: string
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityCreateInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutAvailabilityInput
    timeSlots?: TimeSlotCreateNestedManyWithoutWeeklyAvailabilityInput
  }

  export type WeeklyAvailabilityUncheckedCreateInput = {
    id?: string
    mentorProfileId: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
    timeSlots?: TimeSlotUncheckedCreateNestedManyWithoutWeeklyAvailabilityInput
  }

  export type WeeklyAvailabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutAvailabilityNestedInput
    timeSlots?: TimeSlotUpdateManyWithoutWeeklyAvailabilityNestedInput
  }

  export type WeeklyAvailabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlots?: TimeSlotUncheckedUpdateManyWithoutWeeklyAvailabilityNestedInput
  }

  export type WeeklyAvailabilityCreateManyInput = {
    id?: string
    mentorProfileId: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeSlotCreateInput = {
    id?: string
    startTime: string
    endTime: string
    weeklyAvailability: WeeklyAvailabilityCreateNestedOneWithoutTimeSlotsInput
  }

  export type TimeSlotUncheckedCreateInput = {
    id?: string
    weeklyAvailabilityId: string
    startTime: string
    endTime: string
  }

  export type TimeSlotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    weeklyAvailability?: WeeklyAvailabilityUpdateOneRequiredWithoutTimeSlotsNestedInput
  }

  export type TimeSlotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weeklyAvailabilityId?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
  }

  export type TimeSlotCreateManyInput = {
    id?: string
    weeklyAvailabilityId: string
    startTime: string
    endTime: string
  }

  export type TimeSlotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
  }

  export type TimeSlotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    weeklyAvailabilityId?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
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

  export type MenteeProfileNullableRelationFilter = {
    is?: MenteeProfileWhereInput | null
    isNot?: MenteeProfileWhereInput | null
  }

  export type MentorProfileNullableRelationFilter = {
    is?: MentorProfileWhereInput | null
    isNot?: MentorProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
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
    isRoleSelected?: SortOrder
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
    isRoleSelected?: SortOrder
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
    isRoleSelected?: SortOrder
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

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MenteeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    education?: SortOrder
    otherMbaScore?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    catHistory?: SortOrder
    resumeUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileAvgOrderByAggregateInput = {
    otherMbaScore?: SortOrder
  }

  export type MenteeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    otherMbaScore?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    resumeUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenteeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dateOfBirth?: SortOrder
    contactNumber?: SortOrder
    otherMbaScore?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    resumeUrl?: SortOrder
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumMentorApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorApprovalStatus | EnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorApprovalStatusFilter<$PrismaModel> | $Enums.MentorApprovalStatus
  }

  export type MentorServiceListRelationFilter = {
    every?: MentorServiceWhereInput
    some?: MentorServiceWhereInput
    none?: MentorServiceWhereInput
  }

  export type WeeklyAvailabilityListRelationFilter = {
    every?: WeeklyAvailabilityWhereInput
    some?: WeeklyAvailabilityWhereInput
    none?: WeeklyAvailabilityWhereInput
  }

  export type MentorServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyAvailabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MentorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    linkedInUrl?: SortOrder
    contactNumber?: SortOrder
    bio?: SortOrder
    expertiseTags?: SortOrder
    ugCollegeProfile?: SortOrder
    pgProfile?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    profilePhotoUrl?: SortOrder
    collegeDocumentUrl?: SortOrder
    isVerified?: SortOrder
    approvalStatus?: SortOrder
    adminReviewNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    linkedInUrl?: SortOrder
    contactNumber?: SortOrder
    bio?: SortOrder
    ugCollegeProfile?: SortOrder
    pgProfile?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    profilePhotoUrl?: SortOrder
    collegeDocumentUrl?: SortOrder
    isVerified?: SortOrder
    approvalStatus?: SortOrder
    adminReviewNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    linkedInUrl?: SortOrder
    contactNumber?: SortOrder
    bio?: SortOrder
    ugCollegeProfile?: SortOrder
    pgProfile?: SortOrder
    workExperience?: SortOrder
    certifications?: SortOrder
    profilePhotoUrl?: SortOrder
    collegeDocumentUrl?: SortOrder
    isVerified?: SortOrder
    approvalStatus?: SortOrder
    adminReviewNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumMentorServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorServiceType | EnumMentorServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorServiceTypeFilter<$PrismaModel> | $Enums.MentorServiceType
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

  export type MentorProfileRelationFilter = {
    is?: MentorProfileWhereInput
    isNot?: MentorProfileWhereInput
  }

  export type MentorServiceMentorProfileIdServiceTypeCompoundUniqueInput = {
    mentorProfileId: string
    serviceType: $Enums.MentorServiceType
  }

  export type MentorServiceCountOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceType?: SortOrder
    pricePerSession?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorServiceAvgOrderByAggregateInput = {
    pricePerSession?: SortOrder
  }

  export type MentorServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceType?: SortOrder
    pricePerSession?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorServiceMinOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    serviceType?: SortOrder
    pricePerSession?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorServiceSumOrderByAggregateInput = {
    pricePerSession?: SortOrder
  }

  export type EnumMentorServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorServiceType | EnumMentorServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.MentorServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMentorServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumMentorServiceTypeFilter<$PrismaModel>
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

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type TimeSlotListRelationFilter = {
    every?: TimeSlotWhereInput
    some?: TimeSlotWhereInput
    none?: TimeSlotWhereInput
  }

  export type TimeSlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyAvailabilityMentorProfileIdDayOfWeekCompoundUniqueInput = {
    mentorProfileId: string
    dayOfWeek: $Enums.DayOfWeek
  }

  export type WeeklyAvailabilityCountOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyAvailabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyAvailabilityMinOrderByAggregateInput = {
    id?: SortOrder
    mentorProfileId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type WeeklyAvailabilityRelationFilter = {
    is?: WeeklyAvailabilityWhereInput
    isNot?: WeeklyAvailabilityWhereInput
  }

  export type TimeSlotCountOrderByAggregateInput = {
    id?: SortOrder
    weeklyAvailabilityId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type TimeSlotMaxOrderByAggregateInput = {
    id?: SortOrder
    weeklyAvailabilityId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type TimeSlotMinOrderByAggregateInput = {
    id?: SortOrder
    weeklyAvailabilityId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
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

  export type WeeklyAvailabilityCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput> | WeeklyAvailabilityCreateWithoutMentorProfileInput[] | WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput | WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput[]
    createMany?: WeeklyAvailabilityCreateManyMentorProfileInputEnvelope
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
  }

  export type MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput> | MentorServiceCreateWithoutMentorProfileInput[] | MentorServiceUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: MentorServiceCreateOrConnectWithoutMentorProfileInput | MentorServiceCreateOrConnectWithoutMentorProfileInput[]
    createMany?: MentorServiceCreateManyMentorProfileInputEnvelope
    connect?: MentorServiceWhereUniqueInput | MentorServiceWhereUniqueInput[]
  }

  export type WeeklyAvailabilityUncheckedCreateNestedManyWithoutMentorProfileInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput> | WeeklyAvailabilityCreateWithoutMentorProfileInput[] | WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput | WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput[]
    createMany?: WeeklyAvailabilityCreateManyMentorProfileInputEnvelope
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
  }

  export type MentorProfileUpdateexpertiseTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumMentorApprovalStatusFieldUpdateOperationsInput = {
    set?: $Enums.MentorApprovalStatus
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

  export type WeeklyAvailabilityUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput> | WeeklyAvailabilityCreateWithoutMentorProfileInput[] | WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput | WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput[]
    upsert?: WeeklyAvailabilityUpsertWithWhereUniqueWithoutMentorProfileInput | WeeklyAvailabilityUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: WeeklyAvailabilityCreateManyMentorProfileInputEnvelope
    set?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    disconnect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    delete?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    update?: WeeklyAvailabilityUpdateWithWhereUniqueWithoutMentorProfileInput | WeeklyAvailabilityUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: WeeklyAvailabilityUpdateManyWithWhereWithoutMentorProfileInput | WeeklyAvailabilityUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
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

  export type WeeklyAvailabilityUncheckedUpdateManyWithoutMentorProfileNestedInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput> | WeeklyAvailabilityCreateWithoutMentorProfileInput[] | WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput[]
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput | WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput[]
    upsert?: WeeklyAvailabilityUpsertWithWhereUniqueWithoutMentorProfileInput | WeeklyAvailabilityUpsertWithWhereUniqueWithoutMentorProfileInput[]
    createMany?: WeeklyAvailabilityCreateManyMentorProfileInputEnvelope
    set?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    disconnect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    delete?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    connect?: WeeklyAvailabilityWhereUniqueInput | WeeklyAvailabilityWhereUniqueInput[]
    update?: WeeklyAvailabilityUpdateWithWhereUniqueWithoutMentorProfileInput | WeeklyAvailabilityUpdateWithWhereUniqueWithoutMentorProfileInput[]
    updateMany?: WeeklyAvailabilityUpdateManyWithWhereWithoutMentorProfileInput | WeeklyAvailabilityUpdateManyWithWhereWithoutMentorProfileInput[]
    deleteMany?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
  }

  export type MentorProfileCreateNestedOneWithoutServicesInput = {
    create?: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutServicesInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type EnumMentorServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.MentorServiceType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MentorProfileUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutServicesInput
    upsert?: MentorProfileUpsertWithoutServicesInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutServicesInput, MentorProfileUpdateWithoutServicesInput>, MentorProfileUncheckedUpdateWithoutServicesInput>
  }

  export type MentorProfileCreateNestedOneWithoutAvailabilityInput = {
    create?: XOR<MentorProfileCreateWithoutAvailabilityInput, MentorProfileUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutAvailabilityInput
    connect?: MentorProfileWhereUniqueInput
  }

  export type TimeSlotCreateNestedManyWithoutWeeklyAvailabilityInput = {
    create?: XOR<TimeSlotCreateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput> | TimeSlotCreateWithoutWeeklyAvailabilityInput[] | TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput | TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput[]
    createMany?: TimeSlotCreateManyWeeklyAvailabilityInputEnvelope
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
  }

  export type TimeSlotUncheckedCreateNestedManyWithoutWeeklyAvailabilityInput = {
    create?: XOR<TimeSlotCreateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput> | TimeSlotCreateWithoutWeeklyAvailabilityInput[] | TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput | TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput[]
    createMany?: TimeSlotCreateManyWeeklyAvailabilityInputEnvelope
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type MentorProfileUpdateOneRequiredWithoutAvailabilityNestedInput = {
    create?: XOR<MentorProfileCreateWithoutAvailabilityInput, MentorProfileUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: MentorProfileCreateOrConnectWithoutAvailabilityInput
    upsert?: MentorProfileUpsertWithoutAvailabilityInput
    connect?: MentorProfileWhereUniqueInput
    update?: XOR<XOR<MentorProfileUpdateToOneWithWhereWithoutAvailabilityInput, MentorProfileUpdateWithoutAvailabilityInput>, MentorProfileUncheckedUpdateWithoutAvailabilityInput>
  }

  export type TimeSlotUpdateManyWithoutWeeklyAvailabilityNestedInput = {
    create?: XOR<TimeSlotCreateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput> | TimeSlotCreateWithoutWeeklyAvailabilityInput[] | TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput | TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput[]
    upsert?: TimeSlotUpsertWithWhereUniqueWithoutWeeklyAvailabilityInput | TimeSlotUpsertWithWhereUniqueWithoutWeeklyAvailabilityInput[]
    createMany?: TimeSlotCreateManyWeeklyAvailabilityInputEnvelope
    set?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    disconnect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    delete?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    update?: TimeSlotUpdateWithWhereUniqueWithoutWeeklyAvailabilityInput | TimeSlotUpdateWithWhereUniqueWithoutWeeklyAvailabilityInput[]
    updateMany?: TimeSlotUpdateManyWithWhereWithoutWeeklyAvailabilityInput | TimeSlotUpdateManyWithWhereWithoutWeeklyAvailabilityInput[]
    deleteMany?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
  }

  export type TimeSlotUncheckedUpdateManyWithoutWeeklyAvailabilityNestedInput = {
    create?: XOR<TimeSlotCreateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput> | TimeSlotCreateWithoutWeeklyAvailabilityInput[] | TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput | TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput[]
    upsert?: TimeSlotUpsertWithWhereUniqueWithoutWeeklyAvailabilityInput | TimeSlotUpsertWithWhereUniqueWithoutWeeklyAvailabilityInput[]
    createMany?: TimeSlotCreateManyWeeklyAvailabilityInputEnvelope
    set?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    disconnect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    delete?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    update?: TimeSlotUpdateWithWhereUniqueWithoutWeeklyAvailabilityInput | TimeSlotUpdateWithWhereUniqueWithoutWeeklyAvailabilityInput[]
    updateMany?: TimeSlotUpdateManyWithWhereWithoutWeeklyAvailabilityInput | TimeSlotUpdateManyWithWhereWithoutWeeklyAvailabilityInput[]
    deleteMany?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
  }

  export type WeeklyAvailabilityCreateNestedOneWithoutTimeSlotsInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutTimeSlotsInput, WeeklyAvailabilityUncheckedCreateWithoutTimeSlotsInput>
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutTimeSlotsInput
    connect?: WeeklyAvailabilityWhereUniqueInput
  }

  export type WeeklyAvailabilityUpdateOneRequiredWithoutTimeSlotsNestedInput = {
    create?: XOR<WeeklyAvailabilityCreateWithoutTimeSlotsInput, WeeklyAvailabilityUncheckedCreateWithoutTimeSlotsInput>
    connectOrCreate?: WeeklyAvailabilityCreateOrConnectWithoutTimeSlotsInput
    upsert?: WeeklyAvailabilityUpsertWithoutTimeSlotsInput
    connect?: WeeklyAvailabilityWhereUniqueInput
    update?: XOR<XOR<WeeklyAvailabilityUpdateToOneWithWhereWithoutTimeSlotsInput, WeeklyAvailabilityUpdateWithoutTimeSlotsInput>, WeeklyAvailabilityUncheckedUpdateWithoutTimeSlotsInput>
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

  export type NestedEnumMentorApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorApprovalStatus | EnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorApprovalStatus[] | ListEnumMentorApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorApprovalStatusFilter<$PrismaModel> | $Enums.MentorApprovalStatus
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

  export type NestedEnumMentorServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorServiceType | EnumMentorServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorServiceTypeFilter<$PrismaModel> | $Enums.MentorServiceType
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

  export type NestedEnumMentorServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MentorServiceType | EnumMentorServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MentorServiceType[] | ListEnumMentorServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMentorServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.MentorServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMentorServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumMentorServiceTypeFilter<$PrismaModel>
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

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type MenteeProfileCreateWithoutUserInput = {
    id?: string
    dateOfBirth: Date | string
    contactNumber: string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileUncheckedCreateWithoutUserInput = {
    id?: string
    dateOfBirth: Date | string
    contactNumber: string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: number | null
    workExperience?: string | null
    certifications?: string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenteeProfileCreateOrConnectWithoutUserInput = {
    where: MenteeProfileWhereUniqueInput
    create: XOR<MenteeProfileCreateWithoutUserInput, MenteeProfileUncheckedCreateWithoutUserInput>
  }

  export type MentorProfileCreateWithoutUserInput = {
    id?: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: MentorServiceCreateNestedManyWithoutMentorProfileInput
    availability?: WeeklyAvailabilityCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
    availability?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutUserInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutUserInput, MentorProfileUncheckedCreateWithoutUserInput>
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
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenteeProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    otherMbaScore?: NullableFloatFieldUpdateOperationsInput | number | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    catHistory?: NullableJsonNullValueInput | InputJsonValue
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
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
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
    availability?: WeeklyAvailabilityUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
    availability?: WeeklyAvailabilityUncheckedUpdateManyWithoutMentorProfileNestedInput
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileCreateNestedOneWithoutUserInput
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    mentorProfile?: MentorProfileUncheckedCreateNestedOneWithoutUserInput
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
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUpdateOneWithoutUserNestedInput
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mentorProfile?: MentorProfileUncheckedUpdateOneWithoutUserNestedInput
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileCreateNestedOneWithoutUserInput
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
    isRoleSelected?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    menteeProfile?: MenteeProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMentorProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMentorProfileInput, UserUncheckedCreateWithoutMentorProfileInput>
  }

  export type MentorServiceCreateWithoutMentorProfileInput = {
    id?: string
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceCreateOrConnectWithoutMentorProfileInput = {
    where: MentorServiceWhereUniqueInput
    create: XOR<MentorServiceCreateWithoutMentorProfileInput, MentorServiceUncheckedCreateWithoutMentorProfileInput>
  }

  export type MentorServiceCreateManyMentorProfileInputEnvelope = {
    data: MentorServiceCreateManyMentorProfileInput | MentorServiceCreateManyMentorProfileInput[]
    skipDuplicates?: boolean
  }

  export type WeeklyAvailabilityCreateWithoutMentorProfileInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
    timeSlots?: TimeSlotCreateNestedManyWithoutWeeklyAvailabilityInput
  }

  export type WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
    timeSlots?: TimeSlotUncheckedCreateNestedManyWithoutWeeklyAvailabilityInput
  }

  export type WeeklyAvailabilityCreateOrConnectWithoutMentorProfileInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    create: XOR<WeeklyAvailabilityCreateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput>
  }

  export type WeeklyAvailabilityCreateManyMentorProfileInputEnvelope = {
    data: WeeklyAvailabilityCreateManyMentorProfileInput | WeeklyAvailabilityCreateManyMentorProfileInput[]
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUpdateOneWithoutUserNestedInput
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
    isRoleSelected?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    menteeProfile?: MenteeProfileUncheckedUpdateOneWithoutUserNestedInput
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
    serviceType?: EnumMentorServiceTypeFilter<"MentorService"> | $Enums.MentorServiceType
    pricePerSession?: FloatFilter<"MentorService"> | number
    isActive?: BoolFilter<"MentorService"> | boolean
    createdAt?: DateTimeFilter<"MentorService"> | Date | string
    updatedAt?: DateTimeFilter<"MentorService"> | Date | string
  }

  export type WeeklyAvailabilityUpsertWithWhereUniqueWithoutMentorProfileInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    update: XOR<WeeklyAvailabilityUpdateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedUpdateWithoutMentorProfileInput>
    create: XOR<WeeklyAvailabilityCreateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedCreateWithoutMentorProfileInput>
  }

  export type WeeklyAvailabilityUpdateWithWhereUniqueWithoutMentorProfileInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    data: XOR<WeeklyAvailabilityUpdateWithoutMentorProfileInput, WeeklyAvailabilityUncheckedUpdateWithoutMentorProfileInput>
  }

  export type WeeklyAvailabilityUpdateManyWithWhereWithoutMentorProfileInput = {
    where: WeeklyAvailabilityScalarWhereInput
    data: XOR<WeeklyAvailabilityUpdateManyMutationInput, WeeklyAvailabilityUncheckedUpdateManyWithoutMentorProfileInput>
  }

  export type WeeklyAvailabilityScalarWhereInput = {
    AND?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
    OR?: WeeklyAvailabilityScalarWhereInput[]
    NOT?: WeeklyAvailabilityScalarWhereInput | WeeklyAvailabilityScalarWhereInput[]
    id?: StringFilter<"WeeklyAvailability"> | string
    mentorProfileId?: StringFilter<"WeeklyAvailability"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklyAvailability"> | $Enums.DayOfWeek
    createdAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyAvailability"> | Date | string
  }

  export type MentorProfileCreateWithoutServicesInput = {
    id?: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    availability?: WeeklyAvailabilityCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutServicesInput = {
    id?: string
    userId: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    availability?: WeeklyAvailabilityUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutServicesInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutServicesInput, MentorProfileUncheckedCreateWithoutServicesInput>
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
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    availability?: WeeklyAvailabilityUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: WeeklyAvailabilityUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileCreateWithoutAvailabilityInput = {
    id?: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMentorProfileInput
    services?: MentorServiceCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileUncheckedCreateWithoutAvailabilityInput = {
    id?: string
    userId: string
    linkedInUrl?: string | null
    contactNumber: string
    bio: string
    expertiseTags?: MentorProfileCreateexpertiseTagsInput | string[]
    ugCollegeProfile?: string | null
    pgProfile?: string | null
    workExperience?: string | null
    certifications?: string | null
    profilePhotoUrl?: string | null
    collegeDocumentUrl?: string | null
    isVerified?: boolean
    approvalStatus?: $Enums.MentorApprovalStatus
    adminReviewNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: MentorServiceUncheckedCreateNestedManyWithoutMentorProfileInput
  }

  export type MentorProfileCreateOrConnectWithoutAvailabilityInput = {
    where: MentorProfileWhereUniqueInput
    create: XOR<MentorProfileCreateWithoutAvailabilityInput, MentorProfileUncheckedCreateWithoutAvailabilityInput>
  }

  export type TimeSlotCreateWithoutWeeklyAvailabilityInput = {
    id?: string
    startTime: string
    endTime: string
  }

  export type TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput = {
    id?: string
    startTime: string
    endTime: string
  }

  export type TimeSlotCreateOrConnectWithoutWeeklyAvailabilityInput = {
    where: TimeSlotWhereUniqueInput
    create: XOR<TimeSlotCreateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput>
  }

  export type TimeSlotCreateManyWeeklyAvailabilityInputEnvelope = {
    data: TimeSlotCreateManyWeeklyAvailabilityInput | TimeSlotCreateManyWeeklyAvailabilityInput[]
    skipDuplicates?: boolean
  }

  export type MentorProfileUpsertWithoutAvailabilityInput = {
    update: XOR<MentorProfileUpdateWithoutAvailabilityInput, MentorProfileUncheckedUpdateWithoutAvailabilityInput>
    create: XOR<MentorProfileCreateWithoutAvailabilityInput, MentorProfileUncheckedCreateWithoutAvailabilityInput>
    where?: MentorProfileWhereInput
  }

  export type MentorProfileUpdateToOneWithWhereWithoutAvailabilityInput = {
    where?: MentorProfileWhereInput
    data: XOR<MentorProfileUpdateWithoutAvailabilityInput, MentorProfileUncheckedUpdateWithoutAvailabilityInput>
  }

  export type MentorProfileUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMentorProfileNestedInput
    services?: MentorServiceUpdateManyWithoutMentorProfileNestedInput
  }

  export type MentorProfileUncheckedUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    contactNumber?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    expertiseTags?: MentorProfileUpdateexpertiseTagsInput | string[]
    ugCollegeProfile?: NullableStringFieldUpdateOperationsInput | string | null
    pgProfile?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    certifications?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    collegeDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    approvalStatus?: EnumMentorApprovalStatusFieldUpdateOperationsInput | $Enums.MentorApprovalStatus
    adminReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: MentorServiceUncheckedUpdateManyWithoutMentorProfileNestedInput
  }

  export type TimeSlotUpsertWithWhereUniqueWithoutWeeklyAvailabilityInput = {
    where: TimeSlotWhereUniqueInput
    update: XOR<TimeSlotUpdateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedUpdateWithoutWeeklyAvailabilityInput>
    create: XOR<TimeSlotCreateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedCreateWithoutWeeklyAvailabilityInput>
  }

  export type TimeSlotUpdateWithWhereUniqueWithoutWeeklyAvailabilityInput = {
    where: TimeSlotWhereUniqueInput
    data: XOR<TimeSlotUpdateWithoutWeeklyAvailabilityInput, TimeSlotUncheckedUpdateWithoutWeeklyAvailabilityInput>
  }

  export type TimeSlotUpdateManyWithWhereWithoutWeeklyAvailabilityInput = {
    where: TimeSlotScalarWhereInput
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyWithoutWeeklyAvailabilityInput>
  }

  export type TimeSlotScalarWhereInput = {
    AND?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
    OR?: TimeSlotScalarWhereInput[]
    NOT?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
    id?: StringFilter<"TimeSlot"> | string
    weeklyAvailabilityId?: StringFilter<"TimeSlot"> | string
    startTime?: StringFilter<"TimeSlot"> | string
    endTime?: StringFilter<"TimeSlot"> | string
  }

  export type WeeklyAvailabilityCreateWithoutTimeSlotsInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
    mentorProfile: MentorProfileCreateNestedOneWithoutAvailabilityInput
  }

  export type WeeklyAvailabilityUncheckedCreateWithoutTimeSlotsInput = {
    id?: string
    mentorProfileId: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityCreateOrConnectWithoutTimeSlotsInput = {
    where: WeeklyAvailabilityWhereUniqueInput
    create: XOR<WeeklyAvailabilityCreateWithoutTimeSlotsInput, WeeklyAvailabilityUncheckedCreateWithoutTimeSlotsInput>
  }

  export type WeeklyAvailabilityUpsertWithoutTimeSlotsInput = {
    update: XOR<WeeklyAvailabilityUpdateWithoutTimeSlotsInput, WeeklyAvailabilityUncheckedUpdateWithoutTimeSlotsInput>
    create: XOR<WeeklyAvailabilityCreateWithoutTimeSlotsInput, WeeklyAvailabilityUncheckedCreateWithoutTimeSlotsInput>
    where?: WeeklyAvailabilityWhereInput
  }

  export type WeeklyAvailabilityUpdateToOneWithWhereWithoutTimeSlotsInput = {
    where?: WeeklyAvailabilityWhereInput
    data: XOR<WeeklyAvailabilityUpdateWithoutTimeSlotsInput, WeeklyAvailabilityUncheckedUpdateWithoutTimeSlotsInput>
  }

  export type WeeklyAvailabilityUpdateWithoutTimeSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mentorProfile?: MentorProfileUpdateOneRequiredWithoutAvailabilityNestedInput
  }

  export type WeeklyAvailabilityUncheckedUpdateWithoutTimeSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    mentorProfileId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceCreateManyMentorProfileInput = {
    id?: string
    serviceType: $Enums.MentorServiceType
    pricePerSession: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyAvailabilityCreateManyMentorProfileInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorServiceUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorServiceUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceType?: EnumMentorServiceTypeFieldUpdateOperationsInput | $Enums.MentorServiceType
    pricePerSession?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyAvailabilityUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlots?: TimeSlotUpdateManyWithoutWeeklyAvailabilityNestedInput
  }

  export type WeeklyAvailabilityUncheckedUpdateWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlots?: TimeSlotUncheckedUpdateManyWithoutWeeklyAvailabilityNestedInput
  }

  export type WeeklyAvailabilityUncheckedUpdateManyWithoutMentorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeSlotCreateManyWeeklyAvailabilityInput = {
    id?: string
    startTime: string
    endTime: string
  }

  export type TimeSlotUpdateWithoutWeeklyAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
  }

  export type TimeSlotUncheckedUpdateWithoutWeeklyAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
  }

  export type TimeSlotUncheckedUpdateManyWithoutWeeklyAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MentorProfileCountOutputTypeDefaultArgs instead
     */
    export type MentorProfileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorProfileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WeeklyAvailabilityCountOutputTypeDefaultArgs instead
     */
    export type WeeklyAvailabilityCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WeeklyAvailabilityCountOutputTypeDefaultArgs<ExtArgs>
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
     * @deprecated Use MentorServiceDefaultArgs instead
     */
    export type MentorServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MentorServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WeeklyAvailabilityDefaultArgs instead
     */
    export type WeeklyAvailabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WeeklyAvailabilityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TimeSlotDefaultArgs instead
     */
    export type TimeSlotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TimeSlotDefaultArgs<ExtArgs>

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