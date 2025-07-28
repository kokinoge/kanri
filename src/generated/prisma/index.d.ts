
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
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model Budget
 * 
 */
export type Budget = $Result.DefaultSelection<Prisma.$BudgetPayload>
/**
 * Model Result
 * 
 */
export type Result = $Result.DefaultSelection<Prisma.$ResultPayload>
/**
 * Model Master
 * 
 */
export type Master = $Result.DefaultSelection<Prisma.$MasterPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model BudgetTeam
 * 
 */
export type BudgetTeam = $Result.DefaultSelection<Prisma.$BudgetTeamPayload>
/**
 * Model CampaignTeam
 * 
 */
export type CampaignTeam = $Result.DefaultSelection<Prisma.$CampaignTeamPayload>
/**
 * Model CampaignKpi
 * 
 */
export type CampaignKpi = $Result.DefaultSelection<Prisma.$CampaignKpiPayload>

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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.result`: Exposes CRUD operations for the **Result** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Results
    * const results = await prisma.result.findMany()
    * ```
    */
  get result(): Prisma.ResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.master`: Exposes CRUD operations for the **Master** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Masters
    * const masters = await prisma.master.findMany()
    * ```
    */
  get master(): Prisma.MasterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budgetTeam`: Exposes CRUD operations for the **BudgetTeam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BudgetTeams
    * const budgetTeams = await prisma.budgetTeam.findMany()
    * ```
    */
  get budgetTeam(): Prisma.BudgetTeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignTeam`: Exposes CRUD operations for the **CampaignTeam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignTeams
    * const campaignTeams = await prisma.campaignTeam.findMany()
    * ```
    */
  get campaignTeam(): Prisma.CampaignTeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaignKpi`: Exposes CRUD operations for the **CampaignKpi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampaignKpis
    * const campaignKpis = await prisma.campaignKpi.findMany()
    * ```
    */
  get campaignKpi(): Prisma.CampaignKpiDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Client: 'Client',
    Campaign: 'Campaign',
    Budget: 'Budget',
    Result: 'Result',
    Master: 'Master',
    Team: 'Team',
    BudgetTeam: 'BudgetTeam',
    CampaignTeam: 'CampaignTeam',
    CampaignKpi: 'CampaignKpi'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "client" | "campaign" | "budget" | "result" | "master" | "team" | "budgetTeam" | "campaignTeam" | "campaignKpi"
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      Budget: {
        payload: Prisma.$BudgetPayload<ExtArgs>
        fields: Prisma.BudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findFirst: {
            args: Prisma.BudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findMany: {
            args: Prisma.BudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          create: {
            args: Prisma.BudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          createMany: {
            args: Prisma.BudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          delete: {
            args: Prisma.BudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          update: {
            args: Prisma.BudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          deleteMany: {
            args: Prisma.BudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BudgetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          upsert: {
            args: Prisma.BudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          aggregate: {
            args: Prisma.BudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudget>
          }
          groupBy: {
            args: Prisma.BudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetCountAggregateOutputType> | number
          }
        }
      }
      Result: {
        payload: Prisma.$ResultPayload<ExtArgs>
        fields: Prisma.ResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          findFirst: {
            args: Prisma.ResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          findMany: {
            args: Prisma.ResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>[]
          }
          create: {
            args: Prisma.ResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          createMany: {
            args: Prisma.ResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>[]
          }
          delete: {
            args: Prisma.ResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          update: {
            args: Prisma.ResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          deleteMany: {
            args: Prisma.ResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>[]
          }
          upsert: {
            args: Prisma.ResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          aggregate: {
            args: Prisma.ResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResult>
          }
          groupBy: {
            args: Prisma.ResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResultCountArgs<ExtArgs>
            result: $Utils.Optional<ResultCountAggregateOutputType> | number
          }
        }
      }
      Master: {
        payload: Prisma.$MasterPayload<ExtArgs>
        fields: Prisma.MasterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          findFirst: {
            args: Prisma.MasterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          findMany: {
            args: Prisma.MasterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>[]
          }
          create: {
            args: Prisma.MasterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          createMany: {
            args: Prisma.MasterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>[]
          }
          delete: {
            args: Prisma.MasterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          update: {
            args: Prisma.MasterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          deleteMany: {
            args: Prisma.MasterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MasterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>[]
          }
          upsert: {
            args: Prisma.MasterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterPayload>
          }
          aggregate: {
            args: Prisma.MasterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaster>
          }
          groupBy: {
            args: Prisma.MasterGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterCountArgs<ExtArgs>
            result: $Utils.Optional<MasterCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      BudgetTeam: {
        payload: Prisma.$BudgetTeamPayload<ExtArgs>
        fields: Prisma.BudgetTeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetTeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetTeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>
          }
          findFirst: {
            args: Prisma.BudgetTeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetTeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>
          }
          findMany: {
            args: Prisma.BudgetTeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>[]
          }
          create: {
            args: Prisma.BudgetTeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>
          }
          createMany: {
            args: Prisma.BudgetTeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetTeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>[]
          }
          delete: {
            args: Prisma.BudgetTeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>
          }
          update: {
            args: Prisma.BudgetTeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>
          }
          deleteMany: {
            args: Prisma.BudgetTeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetTeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BudgetTeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>[]
          }
          upsert: {
            args: Prisma.BudgetTeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetTeamPayload>
          }
          aggregate: {
            args: Prisma.BudgetTeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudgetTeam>
          }
          groupBy: {
            args: Prisma.BudgetTeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetTeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetTeamCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetTeamCountAggregateOutputType> | number
          }
        }
      }
      CampaignTeam: {
        payload: Prisma.$CampaignTeamPayload<ExtArgs>
        fields: Prisma.CampaignTeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignTeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignTeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>
          }
          findFirst: {
            args: Prisma.CampaignTeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignTeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>
          }
          findMany: {
            args: Prisma.CampaignTeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>[]
          }
          create: {
            args: Prisma.CampaignTeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>
          }
          createMany: {
            args: Prisma.CampaignTeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignTeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>[]
          }
          delete: {
            args: Prisma.CampaignTeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>
          }
          update: {
            args: Prisma.CampaignTeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>
          }
          deleteMany: {
            args: Prisma.CampaignTeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignTeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignTeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>[]
          }
          upsert: {
            args: Prisma.CampaignTeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignTeamPayload>
          }
          aggregate: {
            args: Prisma.CampaignTeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignTeam>
          }
          groupBy: {
            args: Prisma.CampaignTeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignTeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignTeamCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignTeamCountAggregateOutputType> | number
          }
        }
      }
      CampaignKpi: {
        payload: Prisma.$CampaignKpiPayload<ExtArgs>
        fields: Prisma.CampaignKpiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignKpiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignKpiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>
          }
          findFirst: {
            args: Prisma.CampaignKpiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignKpiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>
          }
          findMany: {
            args: Prisma.CampaignKpiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>[]
          }
          create: {
            args: Prisma.CampaignKpiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>
          }
          createMany: {
            args: Prisma.CampaignKpiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignKpiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>[]
          }
          delete: {
            args: Prisma.CampaignKpiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>
          }
          update: {
            args: Prisma.CampaignKpiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>
          }
          deleteMany: {
            args: Prisma.CampaignKpiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignKpiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignKpiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>[]
          }
          upsert: {
            args: Prisma.CampaignKpiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignKpiPayload>
          }
          aggregate: {
            args: Prisma.CampaignKpiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaignKpi>
          }
          groupBy: {
            args: Prisma.CampaignKpiGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignKpiGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignKpiCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignKpiCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    client?: ClientOmit
    campaign?: CampaignOmit
    budget?: BudgetOmit
    result?: ResultOmit
    master?: MasterOmit
    team?: TeamOmit
    budgetTeam?: BudgetTeamOmit
    campaignTeam?: CampaignTeamOmit
    campaignKpi?: CampaignKpiOmit
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
    | 'updateManyAndReturn'
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
    accounts: number
    managedClients: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    managedClients?: boolean | UserCountOutputTypeCountManagedClientsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
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
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountManagedClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    campaigns: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | ClientCountOutputTypeCountCampaignsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
  }


  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    budgets: number
    campaignKpis: number
    campaignTeams: number
    results: number
  }

  export type CampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | CampaignCountOutputTypeCountBudgetsArgs
    campaignKpis?: boolean | CampaignCountOutputTypeCountCampaignKpisArgs
    campaignTeams?: boolean | CampaignCountOutputTypeCountCampaignTeamsArgs
    results?: boolean | CampaignCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountCampaignKpisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignKpiWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountCampaignTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignTeamWhereInput
  }

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
  }


  /**
   * Count Type BudgetCountOutputType
   */

  export type BudgetCountOutputType = {
    budgetTeams: number
  }

  export type BudgetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgetTeams?: boolean | BudgetCountOutputTypeCountBudgetTeamsArgs
  }

  // Custom InputTypes
  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCountOutputType
     */
    select?: BudgetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeCountBudgetTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetTeamWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    budgetTeams: number
    campaignTeams: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgetTeams?: boolean | TeamCountOutputTypeCountBudgetTeamsArgs
    campaignTeams?: boolean | TeamCountOutputTypeCountCampaignTeamsArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountBudgetTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetTeamWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountCampaignTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignTeamWhereInput
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
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    role: string | null
    department: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    role: string | null
    department: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    role: number
    department: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    role?: true
    department?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    role?: true
    department?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    role?: true
    department?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
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
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    password: string | null
    role: string
    department: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
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
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    managedClients?: boolean | User$managedClientsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "password" | "role" | "department" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    managedClients?: boolean | User$managedClientsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      managedClients: Prisma.$ClientPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image: string | null
      password: string | null
      role: string
      department: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    managedClients<T extends User$managedClientsArgs<ExtArgs> = {}>(args?: Subset<T, User$managedClientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.managedClients
   */
  export type User$managedClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    managerId: string | null
    agency: string | null
    salesChannel: string | null
    salesDepartment: string | null
    businessDivision: string | null
    priority: string | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    managerId: string | null
    agency: string | null
    salesChannel: string | null
    salesDepartment: string | null
    businessDivision: string | null
    priority: string | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    managerId: number
    agency: number
    salesChannel: number
    salesDepartment: number
    businessDivision: number
    priority: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    managerId?: true
    agency?: true
    salesChannel?: true
    salesDepartment?: true
    businessDivision?: true
    priority?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    managerId?: true
    agency?: true
    salesChannel?: true
    salesDepartment?: true
    businessDivision?: true
    priority?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    managerId?: true
    agency?: true
    salesChannel?: true
    salesDepartment?: true
    businessDivision?: true
    priority?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    managerId: string | null
    agency: string | null
    salesChannel: string | null
    salesDepartment: string
    businessDivision: string
    priority: string | null
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    managerId?: boolean
    agency?: boolean
    salesChannel?: boolean
    salesDepartment?: boolean
    businessDivision?: boolean
    priority?: boolean
    campaigns?: boolean | Client$campaignsArgs<ExtArgs>
    manager?: boolean | Client$managerArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    managerId?: boolean
    agency?: boolean
    salesChannel?: boolean
    salesDepartment?: boolean
    businessDivision?: boolean
    priority?: boolean
    manager?: boolean | Client$managerArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    managerId?: boolean
    agency?: boolean
    salesChannel?: boolean
    salesDepartment?: boolean
    businessDivision?: boolean
    priority?: boolean
    manager?: boolean | Client$managerArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    managerId?: boolean
    agency?: boolean
    salesChannel?: boolean
    salesDepartment?: boolean
    businessDivision?: boolean
    priority?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "managerId" | "agency" | "salesChannel" | "salesDepartment" | "businessDivision" | "priority", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | Client$campaignsArgs<ExtArgs>
    manager?: boolean | Client$managerArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | Client$managerArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | Client$managerArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      campaigns: Prisma.$CampaignPayload<ExtArgs>[]
      manager: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      managerId: string | null
      agency: string | null
      salesChannel: string | null
      salesDepartment: string
      businessDivision: string
      priority: string | null
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
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
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaigns<T extends Client$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, Client$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    manager<T extends Client$managerArgs<ExtArgs> = {}>(args?: Subset<T, Client$managerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
    readonly managerId: FieldRef<"Client", 'String'>
    readonly agency: FieldRef<"Client", 'String'>
    readonly salesChannel: FieldRef<"Client", 'String'>
    readonly salesDepartment: FieldRef<"Client", 'String'>
    readonly businessDivision: FieldRef<"Client", 'String'>
    readonly priority: FieldRef<"Client", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.campaigns
   */
  export type Client$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    cursor?: CampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Client.manager
   */
  export type Client$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignAvgAggregateOutputType = {
    totalBudget: Decimal | null
    startYear: number | null
    startMonth: number | null
    endYear: number | null
    endMonth: number | null
  }

  export type CampaignSumAggregateOutputType = {
    totalBudget: Decimal | null
    startYear: number | null
    startMonth: number | null
    endYear: number | null
    endMonth: number | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    name: string | null
    purpose: string | null
    totalBudget: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    startYear: number | null
    startMonth: number | null
    endYear: number | null
    endMonth: number | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    name: string | null
    purpose: string | null
    totalBudget: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    startYear: number | null
    startMonth: number | null
    endYear: number | null
    endMonth: number | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    clientId: number
    name: number
    purpose: number
    totalBudget: number
    createdAt: number
    updatedAt: number
    startYear: number
    startMonth: number
    endYear: number
    endMonth: number
    _all: number
  }


  export type CampaignAvgAggregateInputType = {
    totalBudget?: true
    startYear?: true
    startMonth?: true
    endYear?: true
    endMonth?: true
  }

  export type CampaignSumAggregateInputType = {
    totalBudget?: true
    startYear?: true
    startMonth?: true
    endYear?: true
    endMonth?: true
  }

  export type CampaignMinAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    purpose?: true
    totalBudget?: true
    createdAt?: true
    updatedAt?: true
    startYear?: true
    startMonth?: true
    endYear?: true
    endMonth?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    purpose?: true
    totalBudget?: true
    createdAt?: true
    updatedAt?: true
    startYear?: true
    startMonth?: true
    endYear?: true
    endMonth?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    purpose?: true
    totalBudget?: true
    createdAt?: true
    updatedAt?: true
    startYear?: true
    startMonth?: true
    endYear?: true
    endMonth?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _avg?: CampaignAvgAggregateInputType
    _sum?: CampaignSumAggregateInputType
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    clientId: string
    name: string
    purpose: string | null
    totalBudget: Decimal
    createdAt: Date
    updatedAt: Date
    startYear: number
    startMonth: number
    endYear: number | null
    endMonth: number | null
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    purpose?: boolean
    totalBudget?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startYear?: boolean
    startMonth?: boolean
    endYear?: boolean
    endMonth?: boolean
    budgets?: boolean | Campaign$budgetsArgs<ExtArgs>
    campaignKpis?: boolean | Campaign$campaignKpisArgs<ExtArgs>
    campaignTeams?: boolean | Campaign$campaignTeamsArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    results?: boolean | Campaign$resultsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    purpose?: boolean
    totalBudget?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startYear?: boolean
    startMonth?: boolean
    endYear?: boolean
    endMonth?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    purpose?: boolean
    totalBudget?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startYear?: boolean
    startMonth?: boolean
    endYear?: boolean
    endMonth?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    clientId?: boolean
    name?: boolean
    purpose?: boolean
    totalBudget?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startYear?: boolean
    startMonth?: boolean
    endYear?: boolean
    endMonth?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "name" | "purpose" | "totalBudget" | "createdAt" | "updatedAt" | "startYear" | "startMonth" | "endYear" | "endMonth", ExtArgs["result"]["campaign"]>
  export type CampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | Campaign$budgetsArgs<ExtArgs>
    campaignKpis?: boolean | Campaign$campaignKpisArgs<ExtArgs>
    campaignTeams?: boolean | Campaign$campaignTeamsArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    results?: boolean | Campaign$resultsArgs<ExtArgs>
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type CampaignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      campaignKpis: Prisma.$CampaignKpiPayload<ExtArgs>[]
      campaignTeams: Prisma.$CampaignTeamPayload<ExtArgs>[]
      client: Prisma.$ClientPayload<ExtArgs>
      results: Prisma.$ResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      name: string
      purpose: string | null
      totalBudget: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
      startYear: number
      startMonth: number
      endYear: number | null
      endMonth: number | null
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
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
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgets<T extends Campaign$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaignKpis<T extends Campaign$campaignKpisArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$campaignKpisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaignTeams<T extends Campaign$campaignTeamsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$campaignTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    results<T extends Campaign$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Campaign$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly clientId: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly purpose: FieldRef<"Campaign", 'String'>
    readonly totalBudget: FieldRef<"Campaign", 'Decimal'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
    readonly startYear: FieldRef<"Campaign", 'Int'>
    readonly startMonth: FieldRef<"Campaign", 'Int'>
    readonly endYear: FieldRef<"Campaign", 'Int'>
    readonly endMonth: FieldRef<"Campaign", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign.budgets
   */
  export type Campaign$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Campaign.campaignKpis
   */
  export type Campaign$campaignKpisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    where?: CampaignKpiWhereInput
    orderBy?: CampaignKpiOrderByWithRelationInput | CampaignKpiOrderByWithRelationInput[]
    cursor?: CampaignKpiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignKpiScalarFieldEnum | CampaignKpiScalarFieldEnum[]
  }

  /**
   * Campaign.campaignTeams
   */
  export type Campaign$campaignTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    where?: CampaignTeamWhereInput
    orderBy?: CampaignTeamOrderByWithRelationInput | CampaignTeamOrderByWithRelationInput[]
    cursor?: CampaignTeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignTeamScalarFieldEnum | CampaignTeamScalarFieldEnum[]
  }

  /**
   * Campaign.results
   */
  export type Campaign$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    cursor?: ResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null
  }


  /**
   * Model Budget
   */

  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetAvgAggregateOutputType = {
    year: number | null
    month: number | null
    amount: Decimal | null
    targetValue: Decimal | null
  }

  export type BudgetSumAggregateOutputType = {
    year: number | null
    month: number | null
    amount: Decimal | null
    targetValue: Decimal | null
  }

  export type BudgetMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    year: number | null
    month: number | null
    platform: string | null
    operationType: string | null
    amount: Decimal | null
    targetKpi: string | null
    targetValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    budgetType: string | null
  }

  export type BudgetMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    year: number | null
    month: number | null
    platform: string | null
    operationType: string | null
    amount: Decimal | null
    targetKpi: string | null
    targetValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    budgetType: string | null
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    campaignId: number
    year: number
    month: number
    platform: number
    operationType: number
    amount: number
    targetKpi: number
    targetValue: number
    createdAt: number
    updatedAt: number
    budgetType: number
    _all: number
  }


  export type BudgetAvgAggregateInputType = {
    year?: true
    month?: true
    amount?: true
    targetValue?: true
  }

  export type BudgetSumAggregateInputType = {
    year?: true
    month?: true
    amount?: true
    targetValue?: true
  }

  export type BudgetMinAggregateInputType = {
    id?: true
    campaignId?: true
    year?: true
    month?: true
    platform?: true
    operationType?: true
    amount?: true
    targetKpi?: true
    targetValue?: true
    createdAt?: true
    updatedAt?: true
    budgetType?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    campaignId?: true
    year?: true
    month?: true
    platform?: true
    operationType?: true
    amount?: true
    targetKpi?: true
    targetValue?: true
    createdAt?: true
    updatedAt?: true
    budgetType?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    campaignId?: true
    year?: true
    month?: true
    platform?: true
    operationType?: true
    amount?: true
    targetKpi?: true
    targetValue?: true
    createdAt?: true
    updatedAt?: true
    budgetType?: true
    _all?: true
  }

  export type BudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budget to aggregate.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }




  export type BudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithAggregationInput | BudgetOrderByWithAggregationInput[]
    by: BudgetScalarFieldEnum[] | BudgetScalarFieldEnum
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _avg?: BudgetAvgAggregateInputType
    _sum?: BudgetSumAggregateInputType
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }

  export type BudgetGroupByOutputType = {
    id: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal
    targetKpi: string | null
    targetValue: Decimal | null
    createdAt: Date
    updatedAt: Date
    budgetType: string
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        }
      >
    >


  export type BudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    amount?: boolean
    targetKpi?: boolean
    targetValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
    budgetTeams?: boolean | Budget$budgetTeamsArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    amount?: boolean
    targetKpi?: boolean
    targetValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    amount?: boolean
    targetKpi?: boolean
    targetValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectScalar = {
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    amount?: boolean
    targetKpi?: boolean
    targetValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
  }

  export type BudgetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "year" | "month" | "platform" | "operationType" | "amount" | "targetKpi" | "targetValue" | "createdAt" | "updatedAt" | "budgetType", ExtArgs["result"]["budget"]>
  export type BudgetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgetTeams?: boolean | Budget$budgetTeamsArgs<ExtArgs>
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BudgetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type BudgetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $BudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Budget"
    objects: {
      budgetTeams: Prisma.$BudgetTeamPayload<ExtArgs>[]
      campaign: Prisma.$CampaignPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      year: number
      month: number
      platform: string
      operationType: string
      amount: Prisma.Decimal
      targetKpi: string | null
      targetValue: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
      budgetType: string
    }, ExtArgs["result"]["budget"]>
    composites: {}
  }

  type BudgetGetPayload<S extends boolean | null | undefined | BudgetDefaultArgs> = $Result.GetResult<Prisma.$BudgetPayload, S>

  type BudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BudgetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetCountAggregateInputType | true
    }

  export interface BudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Budget'], meta: { name: 'Budget' } }
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetFindUniqueArgs>(args: SelectSubset<T, BudgetFindUniqueArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Budget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetFindFirstArgs>(args?: SelectSubset<T, BudgetFindFirstArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetFindManyArgs>(args?: SelectSubset<T, BudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
     */
    create<T extends BudgetCreateArgs>(args: SelectSubset<T, BudgetCreateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Budgets.
     * @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetCreateManyArgs>(args?: SelectSubset<T, BudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Budgets and returns the data saved in the database.
     * @param {BudgetCreateManyAndReturnArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
     */
    delete<T extends BudgetDeleteArgs>(args: SelectSubset<T, BudgetDeleteArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetUpdateArgs>(args: SelectSubset<T, BudgetUpdateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetDeleteManyArgs>(args?: SelectSubset<T, BudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetUpdateManyArgs>(args: SelectSubset<T, BudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets and returns the data updated in the database.
     * @param {BudgetUpdateManyAndReturnArgs} args - Arguments to update many Budgets.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BudgetUpdateManyAndReturnArgs>(args: SelectSubset<T, BudgetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
     */
    upsert<T extends BudgetUpsertArgs>(args: SelectSubset<T, BudgetUpsertArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): Prisma.PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
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
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Budget model
   */
  readonly fields: BudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgetTeams<T extends Budget$budgetTeamsArgs<ExtArgs> = {}>(args?: Subset<T, Budget$budgetTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Budget model
   */
  interface BudgetFieldRefs {
    readonly id: FieldRef<"Budget", 'String'>
    readonly campaignId: FieldRef<"Budget", 'String'>
    readonly year: FieldRef<"Budget", 'Int'>
    readonly month: FieldRef<"Budget", 'Int'>
    readonly platform: FieldRef<"Budget", 'String'>
    readonly operationType: FieldRef<"Budget", 'String'>
    readonly amount: FieldRef<"Budget", 'Decimal'>
    readonly targetKpi: FieldRef<"Budget", 'String'>
    readonly targetValue: FieldRef<"Budget", 'Decimal'>
    readonly createdAt: FieldRef<"Budget", 'DateTime'>
    readonly updatedAt: FieldRef<"Budget", 'DateTime'>
    readonly budgetType: FieldRef<"Budget", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budgets to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget create
   */
  export type BudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to create a Budget.
     */
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }

  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Budget createManyAndReturn
   */
  export type BudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Budget update
   */
  export type BudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to update a Budget.
     */
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to update.
     */
    limit?: number
  }

  /**
   * Budget updateManyAndReturn
   */
  export type BudgetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The filter to search for the Budget to update in case it exists.
     */
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     */
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }

  /**
   * Budget delete
   */
  export type BudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter which Budget to delete.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budgets to delete
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to delete.
     */
    limit?: number
  }

  /**
   * Budget.budgetTeams
   */
  export type Budget$budgetTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    where?: BudgetTeamWhereInput
    orderBy?: BudgetTeamOrderByWithRelationInput | BudgetTeamOrderByWithRelationInput[]
    cursor?: BudgetTeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetTeamScalarFieldEnum | BudgetTeamScalarFieldEnum[]
  }

  /**
   * Budget without action
   */
  export type BudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
  }


  /**
   * Model Result
   */

  export type AggregateResult = {
    _count: ResultCountAggregateOutputType | null
    _avg: ResultAvgAggregateOutputType | null
    _sum: ResultSumAggregateOutputType | null
    _min: ResultMinAggregateOutputType | null
    _max: ResultMaxAggregateOutputType | null
  }

  export type ResultAvgAggregateOutputType = {
    year: number | null
    month: number | null
    actualSpend: Decimal | null
    actualResult: Decimal | null
  }

  export type ResultSumAggregateOutputType = {
    year: number | null
    month: number | null
    actualSpend: Decimal | null
    actualResult: Decimal | null
  }

  export type ResultMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    year: number | null
    month: number | null
    platform: string | null
    operationType: string | null
    actualSpend: Decimal | null
    actualResult: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    budgetType: string | null
  }

  export type ResultMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    year: number | null
    month: number | null
    platform: string | null
    operationType: string | null
    actualSpend: Decimal | null
    actualResult: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
    budgetType: string | null
  }

  export type ResultCountAggregateOutputType = {
    id: number
    campaignId: number
    year: number
    month: number
    platform: number
    operationType: number
    actualSpend: number
    actualResult: number
    createdAt: number
    updatedAt: number
    budgetType: number
    _all: number
  }


  export type ResultAvgAggregateInputType = {
    year?: true
    month?: true
    actualSpend?: true
    actualResult?: true
  }

  export type ResultSumAggregateInputType = {
    year?: true
    month?: true
    actualSpend?: true
    actualResult?: true
  }

  export type ResultMinAggregateInputType = {
    id?: true
    campaignId?: true
    year?: true
    month?: true
    platform?: true
    operationType?: true
    actualSpend?: true
    actualResult?: true
    createdAt?: true
    updatedAt?: true
    budgetType?: true
  }

  export type ResultMaxAggregateInputType = {
    id?: true
    campaignId?: true
    year?: true
    month?: true
    platform?: true
    operationType?: true
    actualSpend?: true
    actualResult?: true
    createdAt?: true
    updatedAt?: true
    budgetType?: true
  }

  export type ResultCountAggregateInputType = {
    id?: true
    campaignId?: true
    year?: true
    month?: true
    platform?: true
    operationType?: true
    actualSpend?: true
    actualResult?: true
    createdAt?: true
    updatedAt?: true
    budgetType?: true
    _all?: true
  }

  export type ResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Result to aggregate.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Results
    **/
    _count?: true | ResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResultMaxAggregateInputType
  }

  export type GetResultAggregateType<T extends ResultAggregateArgs> = {
        [P in keyof T & keyof AggregateResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResult[P]>
      : GetScalarType<T[P], AggregateResult[P]>
  }




  export type ResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithAggregationInput | ResultOrderByWithAggregationInput[]
    by: ResultScalarFieldEnum[] | ResultScalarFieldEnum
    having?: ResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResultCountAggregateInputType | true
    _avg?: ResultAvgAggregateInputType
    _sum?: ResultSumAggregateInputType
    _min?: ResultMinAggregateInputType
    _max?: ResultMaxAggregateInputType
  }

  export type ResultGroupByOutputType = {
    id: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal
    actualResult: Decimal
    createdAt: Date
    updatedAt: Date
    budgetType: string
    _count: ResultCountAggregateOutputType | null
    _avg: ResultAvgAggregateOutputType | null
    _sum: ResultSumAggregateOutputType | null
    _min: ResultMinAggregateOutputType | null
    _max: ResultMaxAggregateOutputType | null
  }

  type GetResultGroupByPayload<T extends ResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResultGroupByOutputType[P]>
            : GetScalarType<T[P], ResultGroupByOutputType[P]>
        }
      >
    >


  export type ResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    actualSpend?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["result"]>

  export type ResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    actualSpend?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["result"]>

  export type ResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    actualSpend?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["result"]>

  export type ResultSelectScalar = {
    id?: boolean
    campaignId?: boolean
    year?: boolean
    month?: boolean
    platform?: boolean
    operationType?: boolean
    actualSpend?: boolean
    actualResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetType?: boolean
  }

  export type ResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "year" | "month" | "platform" | "operationType" | "actualSpend" | "actualResult" | "createdAt" | "updatedAt" | "budgetType", ExtArgs["result"]["result"]>
  export type ResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type ResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type ResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $ResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Result"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      year: number
      month: number
      platform: string
      operationType: string
      actualSpend: Prisma.Decimal
      actualResult: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
      budgetType: string
    }, ExtArgs["result"]["result"]>
    composites: {}
  }

  type ResultGetPayload<S extends boolean | null | undefined | ResultDefaultArgs> = $Result.GetResult<Prisma.$ResultPayload, S>

  type ResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResultCountAggregateInputType | true
    }

  export interface ResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Result'], meta: { name: 'Result' } }
    /**
     * Find zero or one Result that matches the filter.
     * @param {ResultFindUniqueArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResultFindUniqueArgs>(args: SelectSubset<T, ResultFindUniqueArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Result that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResultFindUniqueOrThrowArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Result that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindFirstArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResultFindFirstArgs>(args?: SelectSubset<T, ResultFindFirstArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Result that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindFirstOrThrowArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Results that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Results
     * const results = await prisma.result.findMany()
     * 
     * // Get first 10 Results
     * const results = await prisma.result.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resultWithIdOnly = await prisma.result.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResultFindManyArgs>(args?: SelectSubset<T, ResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Result.
     * @param {ResultCreateArgs} args - Arguments to create a Result.
     * @example
     * // Create one Result
     * const Result = await prisma.result.create({
     *   data: {
     *     // ... data to create a Result
     *   }
     * })
     * 
     */
    create<T extends ResultCreateArgs>(args: SelectSubset<T, ResultCreateArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Results.
     * @param {ResultCreateManyArgs} args - Arguments to create many Results.
     * @example
     * // Create many Results
     * const result = await prisma.result.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResultCreateManyArgs>(args?: SelectSubset<T, ResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Results and returns the data saved in the database.
     * @param {ResultCreateManyAndReturnArgs} args - Arguments to create many Results.
     * @example
     * // Create many Results
     * const result = await prisma.result.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Results and only return the `id`
     * const resultWithIdOnly = await prisma.result.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Result.
     * @param {ResultDeleteArgs} args - Arguments to delete one Result.
     * @example
     * // Delete one Result
     * const Result = await prisma.result.delete({
     *   where: {
     *     // ... filter to delete one Result
     *   }
     * })
     * 
     */
    delete<T extends ResultDeleteArgs>(args: SelectSubset<T, ResultDeleteArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Result.
     * @param {ResultUpdateArgs} args - Arguments to update one Result.
     * @example
     * // Update one Result
     * const result = await prisma.result.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResultUpdateArgs>(args: SelectSubset<T, ResultUpdateArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Results.
     * @param {ResultDeleteManyArgs} args - Arguments to filter Results to delete.
     * @example
     * // Delete a few Results
     * const { count } = await prisma.result.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResultDeleteManyArgs>(args?: SelectSubset<T, ResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Results
     * const result = await prisma.result.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResultUpdateManyArgs>(args: SelectSubset<T, ResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Results and returns the data updated in the database.
     * @param {ResultUpdateManyAndReturnArgs} args - Arguments to update many Results.
     * @example
     * // Update many Results
     * const result = await prisma.result.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Results and only return the `id`
     * const resultWithIdOnly = await prisma.result.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResultUpdateManyAndReturnArgs>(args: SelectSubset<T, ResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Result.
     * @param {ResultUpsertArgs} args - Arguments to update or create a Result.
     * @example
     * // Update or create a Result
     * const result = await prisma.result.upsert({
     *   create: {
     *     // ... data to create a Result
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Result we want to update
     *   }
     * })
     */
    upsert<T extends ResultUpsertArgs>(args: SelectSubset<T, ResultUpsertArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultCountArgs} args - Arguments to filter Results to count.
     * @example
     * // Count the number of Results
     * const count = await prisma.result.count({
     *   where: {
     *     // ... the filter for the Results we want to count
     *   }
     * })
    **/
    count<T extends ResultCountArgs>(
      args?: Subset<T, ResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Result.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResultAggregateArgs>(args: Subset<T, ResultAggregateArgs>): Prisma.PrismaPromise<GetResultAggregateType<T>>

    /**
     * Group by Result.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultGroupByArgs} args - Group by arguments.
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
      T extends ResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResultGroupByArgs['orderBy'] }
        : { orderBy?: ResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Result model
   */
  readonly fields: ResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Result.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Result model
   */
  interface ResultFieldRefs {
    readonly id: FieldRef<"Result", 'String'>
    readonly campaignId: FieldRef<"Result", 'String'>
    readonly year: FieldRef<"Result", 'Int'>
    readonly month: FieldRef<"Result", 'Int'>
    readonly platform: FieldRef<"Result", 'String'>
    readonly operationType: FieldRef<"Result", 'String'>
    readonly actualSpend: FieldRef<"Result", 'Decimal'>
    readonly actualResult: FieldRef<"Result", 'Decimal'>
    readonly createdAt: FieldRef<"Result", 'DateTime'>
    readonly updatedAt: FieldRef<"Result", 'DateTime'>
    readonly budgetType: FieldRef<"Result", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Result findUnique
   */
  export type ResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result findUniqueOrThrow
   */
  export type ResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result findFirst
   */
  export type ResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result findFirstOrThrow
   */
  export type ResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result findMany
   */
  export type ResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Results to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result create
   */
  export type ResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The data needed to create a Result.
     */
    data: XOR<ResultCreateInput, ResultUncheckedCreateInput>
  }

  /**
   * Result createMany
   */
  export type ResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Results.
     */
    data: ResultCreateManyInput | ResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Result createManyAndReturn
   */
  export type ResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * The data used to create many Results.
     */
    data: ResultCreateManyInput | ResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Result update
   */
  export type ResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The data needed to update a Result.
     */
    data: XOR<ResultUpdateInput, ResultUncheckedUpdateInput>
    /**
     * Choose, which Result to update.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result updateMany
   */
  export type ResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Results.
     */
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyInput>
    /**
     * Filter which Results to update
     */
    where?: ResultWhereInput
    /**
     * Limit how many Results to update.
     */
    limit?: number
  }

  /**
   * Result updateManyAndReturn
   */
  export type ResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * The data used to update Results.
     */
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyInput>
    /**
     * Filter which Results to update
     */
    where?: ResultWhereInput
    /**
     * Limit how many Results to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Result upsert
   */
  export type ResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The filter to search for the Result to update in case it exists.
     */
    where: ResultWhereUniqueInput
    /**
     * In case the Result found by the `where` argument doesn't exist, create a new Result with this data.
     */
    create: XOR<ResultCreateInput, ResultUncheckedCreateInput>
    /**
     * In case the Result was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResultUpdateInput, ResultUncheckedUpdateInput>
  }

  /**
   * Result delete
   */
  export type ResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter which Result to delete.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result deleteMany
   */
  export type ResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Results to delete
     */
    where?: ResultWhereInput
    /**
     * Limit how many Results to delete.
     */
    limit?: number
  }

  /**
   * Result without action
   */
  export type ResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
  }


  /**
   * Model Master
   */

  export type AggregateMaster = {
    _count: MasterCountAggregateOutputType | null
    _avg: MasterAvgAggregateOutputType | null
    _sum: MasterSumAggregateOutputType | null
    _min: MasterMinAggregateOutputType | null
    _max: MasterMaxAggregateOutputType | null
  }

  export type MasterAvgAggregateOutputType = {
    order: number | null
  }

  export type MasterSumAggregateOutputType = {
    order: number | null
  }

  export type MasterMinAggregateOutputType = {
    id: string | null
    category: string | null
    value: string | null
    order: number | null
  }

  export type MasterMaxAggregateOutputType = {
    id: string | null
    category: string | null
    value: string | null
    order: number | null
  }

  export type MasterCountAggregateOutputType = {
    id: number
    category: number
    value: number
    order: number
    _all: number
  }


  export type MasterAvgAggregateInputType = {
    order?: true
  }

  export type MasterSumAggregateInputType = {
    order?: true
  }

  export type MasterMinAggregateInputType = {
    id?: true
    category?: true
    value?: true
    order?: true
  }

  export type MasterMaxAggregateInputType = {
    id?: true
    category?: true
    value?: true
    order?: true
  }

  export type MasterCountAggregateInputType = {
    id?: true
    category?: true
    value?: true
    order?: true
    _all?: true
  }

  export type MasterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Master to aggregate.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Masters
    **/
    _count?: true | MasterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MasterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MasterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterMaxAggregateInputType
  }

  export type GetMasterAggregateType<T extends MasterAggregateArgs> = {
        [P in keyof T & keyof AggregateMaster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaster[P]>
      : GetScalarType<T[P], AggregateMaster[P]>
  }




  export type MasterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterWhereInput
    orderBy?: MasterOrderByWithAggregationInput | MasterOrderByWithAggregationInput[]
    by: MasterScalarFieldEnum[] | MasterScalarFieldEnum
    having?: MasterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterCountAggregateInputType | true
    _avg?: MasterAvgAggregateInputType
    _sum?: MasterSumAggregateInputType
    _min?: MasterMinAggregateInputType
    _max?: MasterMaxAggregateInputType
  }

  export type MasterGroupByOutputType = {
    id: string
    category: string
    value: string
    order: number
    _count: MasterCountAggregateOutputType | null
    _avg: MasterAvgAggregateOutputType | null
    _sum: MasterSumAggregateOutputType | null
    _min: MasterMinAggregateOutputType | null
    _max: MasterMaxAggregateOutputType | null
  }

  type GetMasterGroupByPayload<T extends MasterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterGroupByOutputType[P]>
            : GetScalarType<T[P], MasterGroupByOutputType[P]>
        }
      >
    >


  export type MasterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    value?: boolean
    order?: boolean
  }, ExtArgs["result"]["master"]>

  export type MasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    value?: boolean
    order?: boolean
  }, ExtArgs["result"]["master"]>

  export type MasterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    value?: boolean
    order?: boolean
  }, ExtArgs["result"]["master"]>

  export type MasterSelectScalar = {
    id?: boolean
    category?: boolean
    value?: boolean
    order?: boolean
  }

  export type MasterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "value" | "order", ExtArgs["result"]["master"]>

  export type $MasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Master"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      value: string
      order: number
    }, ExtArgs["result"]["master"]>
    composites: {}
  }

  type MasterGetPayload<S extends boolean | null | undefined | MasterDefaultArgs> = $Result.GetResult<Prisma.$MasterPayload, S>

  type MasterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MasterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MasterCountAggregateInputType | true
    }

  export interface MasterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Master'], meta: { name: 'Master' } }
    /**
     * Find zero or one Master that matches the filter.
     * @param {MasterFindUniqueArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterFindUniqueArgs>(args: SelectSubset<T, MasterFindUniqueArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Master that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasterFindUniqueOrThrowArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFindFirstArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterFindFirstArgs>(args?: SelectSubset<T, MasterFindFirstArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFindFirstOrThrowArgs} args - Arguments to find a Master
     * @example
     * // Get one Master
     * const master = await prisma.master.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Masters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Masters
     * const masters = await prisma.master.findMany()
     * 
     * // Get first 10 Masters
     * const masters = await prisma.master.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterWithIdOnly = await prisma.master.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterFindManyArgs>(args?: SelectSubset<T, MasterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Master.
     * @param {MasterCreateArgs} args - Arguments to create a Master.
     * @example
     * // Create one Master
     * const Master = await prisma.master.create({
     *   data: {
     *     // ... data to create a Master
     *   }
     * })
     * 
     */
    create<T extends MasterCreateArgs>(args: SelectSubset<T, MasterCreateArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Masters.
     * @param {MasterCreateManyArgs} args - Arguments to create many Masters.
     * @example
     * // Create many Masters
     * const master = await prisma.master.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterCreateManyArgs>(args?: SelectSubset<T, MasterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Masters and returns the data saved in the database.
     * @param {MasterCreateManyAndReturnArgs} args - Arguments to create many Masters.
     * @example
     * // Create many Masters
     * const master = await prisma.master.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Masters and only return the `id`
     * const masterWithIdOnly = await prisma.master.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Master.
     * @param {MasterDeleteArgs} args - Arguments to delete one Master.
     * @example
     * // Delete one Master
     * const Master = await prisma.master.delete({
     *   where: {
     *     // ... filter to delete one Master
     *   }
     * })
     * 
     */
    delete<T extends MasterDeleteArgs>(args: SelectSubset<T, MasterDeleteArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Master.
     * @param {MasterUpdateArgs} args - Arguments to update one Master.
     * @example
     * // Update one Master
     * const master = await prisma.master.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterUpdateArgs>(args: SelectSubset<T, MasterUpdateArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Masters.
     * @param {MasterDeleteManyArgs} args - Arguments to filter Masters to delete.
     * @example
     * // Delete a few Masters
     * const { count } = await prisma.master.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterDeleteManyArgs>(args?: SelectSubset<T, MasterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Masters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Masters
     * const master = await prisma.master.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterUpdateManyArgs>(args: SelectSubset<T, MasterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Masters and returns the data updated in the database.
     * @param {MasterUpdateManyAndReturnArgs} args - Arguments to update many Masters.
     * @example
     * // Update many Masters
     * const master = await prisma.master.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Masters and only return the `id`
     * const masterWithIdOnly = await prisma.master.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MasterUpdateManyAndReturnArgs>(args: SelectSubset<T, MasterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Master.
     * @param {MasterUpsertArgs} args - Arguments to update or create a Master.
     * @example
     * // Update or create a Master
     * const master = await prisma.master.upsert({
     *   create: {
     *     // ... data to create a Master
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Master we want to update
     *   }
     * })
     */
    upsert<T extends MasterUpsertArgs>(args: SelectSubset<T, MasterUpsertArgs<ExtArgs>>): Prisma__MasterClient<$Result.GetResult<Prisma.$MasterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Masters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterCountArgs} args - Arguments to filter Masters to count.
     * @example
     * // Count the number of Masters
     * const count = await prisma.master.count({
     *   where: {
     *     // ... the filter for the Masters we want to count
     *   }
     * })
    **/
    count<T extends MasterCountArgs>(
      args?: Subset<T, MasterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Master.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MasterAggregateArgs>(args: Subset<T, MasterAggregateArgs>): Prisma.PrismaPromise<GetMasterAggregateType<T>>

    /**
     * Group by Master.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterGroupByArgs} args - Group by arguments.
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
      T extends MasterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterGroupByArgs['orderBy'] }
        : { orderBy?: MasterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MasterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Master model
   */
  readonly fields: MasterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Master.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Master model
   */
  interface MasterFieldRefs {
    readonly id: FieldRef<"Master", 'String'>
    readonly category: FieldRef<"Master", 'String'>
    readonly value: FieldRef<"Master", 'String'>
    readonly order: FieldRef<"Master", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Master findUnique
   */
  export type MasterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master findUniqueOrThrow
   */
  export type MasterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master findFirst
   */
  export type MasterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Masters.
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Masters.
     */
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * Master findFirstOrThrow
   */
  export type MasterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Filter, which Master to fetch.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Masters.
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Masters.
     */
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * Master findMany
   */
  export type MasterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Filter, which Masters to fetch.
     */
    where?: MasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Masters to fetch.
     */
    orderBy?: MasterOrderByWithRelationInput | MasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Masters.
     */
    cursor?: MasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Masters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Masters.
     */
    skip?: number
    distinct?: MasterScalarFieldEnum | MasterScalarFieldEnum[]
  }

  /**
   * Master create
   */
  export type MasterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The data needed to create a Master.
     */
    data: XOR<MasterCreateInput, MasterUncheckedCreateInput>
  }

  /**
   * Master createMany
   */
  export type MasterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Masters.
     */
    data: MasterCreateManyInput | MasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Master createManyAndReturn
   */
  export type MasterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The data used to create many Masters.
     */
    data: MasterCreateManyInput | MasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Master update
   */
  export type MasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The data needed to update a Master.
     */
    data: XOR<MasterUpdateInput, MasterUncheckedUpdateInput>
    /**
     * Choose, which Master to update.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master updateMany
   */
  export type MasterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Masters.
     */
    data: XOR<MasterUpdateManyMutationInput, MasterUncheckedUpdateManyInput>
    /**
     * Filter which Masters to update
     */
    where?: MasterWhereInput
    /**
     * Limit how many Masters to update.
     */
    limit?: number
  }

  /**
   * Master updateManyAndReturn
   */
  export type MasterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The data used to update Masters.
     */
    data: XOR<MasterUpdateManyMutationInput, MasterUncheckedUpdateManyInput>
    /**
     * Filter which Masters to update
     */
    where?: MasterWhereInput
    /**
     * Limit how many Masters to update.
     */
    limit?: number
  }

  /**
   * Master upsert
   */
  export type MasterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * The filter to search for the Master to update in case it exists.
     */
    where: MasterWhereUniqueInput
    /**
     * In case the Master found by the `where` argument doesn't exist, create a new Master with this data.
     */
    create: XOR<MasterCreateInput, MasterUncheckedCreateInput>
    /**
     * In case the Master was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterUpdateInput, MasterUncheckedUpdateInput>
  }

  /**
   * Master delete
   */
  export type MasterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
    /**
     * Filter which Master to delete.
     */
    where: MasterWhereUniqueInput
  }

  /**
   * Master deleteMany
   */
  export type MasterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Masters to delete
     */
    where?: MasterWhereInput
    /**
     * Limit how many Masters to delete.
     */
    limit?: number
  }

  /**
   * Master without action
   */
  export type MasterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Master
     */
    select?: MasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Master
     */
    omit?: MasterOmit<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    description: number
    color: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    name: string
    description: string | null
    color: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    budgetTeams?: boolean | Team$budgetTeamsArgs<ExtArgs>
    campaignTeams?: boolean | Team$campaignTeamsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "color" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgetTeams?: boolean | Team$budgetTeamsArgs<ExtArgs>
    campaignTeams?: boolean | Team$campaignTeamsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      budgetTeams: Prisma.$BudgetTeamPayload<ExtArgs>[]
      campaignTeams: Prisma.$CampaignTeamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      color: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
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
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgetTeams<T extends Team$budgetTeamsArgs<ExtArgs> = {}>(args?: Subset<T, Team$budgetTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    campaignTeams<T extends Team$campaignTeamsArgs<ExtArgs> = {}>(args?: Subset<T, Team$campaignTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly description: FieldRef<"Team", 'String'>
    readonly color: FieldRef<"Team", 'String'>
    readonly isActive: FieldRef<"Team", 'Boolean'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.budgetTeams
   */
  export type Team$budgetTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    where?: BudgetTeamWhereInput
    orderBy?: BudgetTeamOrderByWithRelationInput | BudgetTeamOrderByWithRelationInput[]
    cursor?: BudgetTeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetTeamScalarFieldEnum | BudgetTeamScalarFieldEnum[]
  }

  /**
   * Team.campaignTeams
   */
  export type Team$campaignTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    where?: CampaignTeamWhereInput
    orderBy?: CampaignTeamOrderByWithRelationInput | CampaignTeamOrderByWithRelationInput[]
    cursor?: CampaignTeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampaignTeamScalarFieldEnum | CampaignTeamScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model BudgetTeam
   */

  export type AggregateBudgetTeam = {
    _count: BudgetTeamCountAggregateOutputType | null
    _avg: BudgetTeamAvgAggregateOutputType | null
    _sum: BudgetTeamSumAggregateOutputType | null
    _min: BudgetTeamMinAggregateOutputType | null
    _max: BudgetTeamMaxAggregateOutputType | null
  }

  export type BudgetTeamAvgAggregateOutputType = {
    allocation: Decimal | null
  }

  export type BudgetTeamSumAggregateOutputType = {
    allocation: Decimal | null
  }

  export type BudgetTeamMinAggregateOutputType = {
    id: string | null
    budgetId: string | null
    teamId: string | null
    allocation: Decimal | null
    createdAt: Date | null
  }

  export type BudgetTeamMaxAggregateOutputType = {
    id: string | null
    budgetId: string | null
    teamId: string | null
    allocation: Decimal | null
    createdAt: Date | null
  }

  export type BudgetTeamCountAggregateOutputType = {
    id: number
    budgetId: number
    teamId: number
    allocation: number
    createdAt: number
    _all: number
  }


  export type BudgetTeamAvgAggregateInputType = {
    allocation?: true
  }

  export type BudgetTeamSumAggregateInputType = {
    allocation?: true
  }

  export type BudgetTeamMinAggregateInputType = {
    id?: true
    budgetId?: true
    teamId?: true
    allocation?: true
    createdAt?: true
  }

  export type BudgetTeamMaxAggregateInputType = {
    id?: true
    budgetId?: true
    teamId?: true
    allocation?: true
    createdAt?: true
  }

  export type BudgetTeamCountAggregateInputType = {
    id?: true
    budgetId?: true
    teamId?: true
    allocation?: true
    createdAt?: true
    _all?: true
  }

  export type BudgetTeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetTeam to aggregate.
     */
    where?: BudgetTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetTeams to fetch.
     */
    orderBy?: BudgetTeamOrderByWithRelationInput | BudgetTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BudgetTeams
    **/
    _count?: true | BudgetTeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetTeamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetTeamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetTeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetTeamMaxAggregateInputType
  }

  export type GetBudgetTeamAggregateType<T extends BudgetTeamAggregateArgs> = {
        [P in keyof T & keyof AggregateBudgetTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudgetTeam[P]>
      : GetScalarType<T[P], AggregateBudgetTeam[P]>
  }




  export type BudgetTeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetTeamWhereInput
    orderBy?: BudgetTeamOrderByWithAggregationInput | BudgetTeamOrderByWithAggregationInput[]
    by: BudgetTeamScalarFieldEnum[] | BudgetTeamScalarFieldEnum
    having?: BudgetTeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetTeamCountAggregateInputType | true
    _avg?: BudgetTeamAvgAggregateInputType
    _sum?: BudgetTeamSumAggregateInputType
    _min?: BudgetTeamMinAggregateInputType
    _max?: BudgetTeamMaxAggregateInputType
  }

  export type BudgetTeamGroupByOutputType = {
    id: string
    budgetId: string
    teamId: string
    allocation: Decimal
    createdAt: Date
    _count: BudgetTeamCountAggregateOutputType | null
    _avg: BudgetTeamAvgAggregateOutputType | null
    _sum: BudgetTeamSumAggregateOutputType | null
    _min: BudgetTeamMinAggregateOutputType | null
    _max: BudgetTeamMaxAggregateOutputType | null
  }

  type GetBudgetTeamGroupByPayload<T extends BudgetTeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetTeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetTeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetTeamGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetTeamGroupByOutputType[P]>
        }
      >
    >


  export type BudgetTeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    budgetId?: boolean
    teamId?: boolean
    allocation?: boolean
    createdAt?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetTeam"]>

  export type BudgetTeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    budgetId?: boolean
    teamId?: boolean
    allocation?: boolean
    createdAt?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetTeam"]>

  export type BudgetTeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    budgetId?: boolean
    teamId?: boolean
    allocation?: boolean
    createdAt?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetTeam"]>

  export type BudgetTeamSelectScalar = {
    id?: boolean
    budgetId?: boolean
    teamId?: boolean
    allocation?: boolean
    createdAt?: boolean
  }

  export type BudgetTeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "budgetId" | "teamId" | "allocation" | "createdAt", ExtArgs["result"]["budgetTeam"]>
  export type BudgetTeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type BudgetTeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type BudgetTeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $BudgetTeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BudgetTeam"
    objects: {
      budget: Prisma.$BudgetPayload<ExtArgs>
      team: Prisma.$TeamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      budgetId: string
      teamId: string
      allocation: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["budgetTeam"]>
    composites: {}
  }

  type BudgetTeamGetPayload<S extends boolean | null | undefined | BudgetTeamDefaultArgs> = $Result.GetResult<Prisma.$BudgetTeamPayload, S>

  type BudgetTeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BudgetTeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetTeamCountAggregateInputType | true
    }

  export interface BudgetTeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BudgetTeam'], meta: { name: 'BudgetTeam' } }
    /**
     * Find zero or one BudgetTeam that matches the filter.
     * @param {BudgetTeamFindUniqueArgs} args - Arguments to find a BudgetTeam
     * @example
     * // Get one BudgetTeam
     * const budgetTeam = await prisma.budgetTeam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetTeamFindUniqueArgs>(args: SelectSubset<T, BudgetTeamFindUniqueArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BudgetTeam that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetTeamFindUniqueOrThrowArgs} args - Arguments to find a BudgetTeam
     * @example
     * // Get one BudgetTeam
     * const budgetTeam = await prisma.budgetTeam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetTeamFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetTeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BudgetTeam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamFindFirstArgs} args - Arguments to find a BudgetTeam
     * @example
     * // Get one BudgetTeam
     * const budgetTeam = await prisma.budgetTeam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetTeamFindFirstArgs>(args?: SelectSubset<T, BudgetTeamFindFirstArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BudgetTeam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamFindFirstOrThrowArgs} args - Arguments to find a BudgetTeam
     * @example
     * // Get one BudgetTeam
     * const budgetTeam = await prisma.budgetTeam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetTeamFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetTeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BudgetTeams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BudgetTeams
     * const budgetTeams = await prisma.budgetTeam.findMany()
     * 
     * // Get first 10 BudgetTeams
     * const budgetTeams = await prisma.budgetTeam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetTeamWithIdOnly = await prisma.budgetTeam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetTeamFindManyArgs>(args?: SelectSubset<T, BudgetTeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BudgetTeam.
     * @param {BudgetTeamCreateArgs} args - Arguments to create a BudgetTeam.
     * @example
     * // Create one BudgetTeam
     * const BudgetTeam = await prisma.budgetTeam.create({
     *   data: {
     *     // ... data to create a BudgetTeam
     *   }
     * })
     * 
     */
    create<T extends BudgetTeamCreateArgs>(args: SelectSubset<T, BudgetTeamCreateArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BudgetTeams.
     * @param {BudgetTeamCreateManyArgs} args - Arguments to create many BudgetTeams.
     * @example
     * // Create many BudgetTeams
     * const budgetTeam = await prisma.budgetTeam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetTeamCreateManyArgs>(args?: SelectSubset<T, BudgetTeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BudgetTeams and returns the data saved in the database.
     * @param {BudgetTeamCreateManyAndReturnArgs} args - Arguments to create many BudgetTeams.
     * @example
     * // Create many BudgetTeams
     * const budgetTeam = await prisma.budgetTeam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BudgetTeams and only return the `id`
     * const budgetTeamWithIdOnly = await prisma.budgetTeam.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetTeamCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetTeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BudgetTeam.
     * @param {BudgetTeamDeleteArgs} args - Arguments to delete one BudgetTeam.
     * @example
     * // Delete one BudgetTeam
     * const BudgetTeam = await prisma.budgetTeam.delete({
     *   where: {
     *     // ... filter to delete one BudgetTeam
     *   }
     * })
     * 
     */
    delete<T extends BudgetTeamDeleteArgs>(args: SelectSubset<T, BudgetTeamDeleteArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BudgetTeam.
     * @param {BudgetTeamUpdateArgs} args - Arguments to update one BudgetTeam.
     * @example
     * // Update one BudgetTeam
     * const budgetTeam = await prisma.budgetTeam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetTeamUpdateArgs>(args: SelectSubset<T, BudgetTeamUpdateArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BudgetTeams.
     * @param {BudgetTeamDeleteManyArgs} args - Arguments to filter BudgetTeams to delete.
     * @example
     * // Delete a few BudgetTeams
     * const { count } = await prisma.budgetTeam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetTeamDeleteManyArgs>(args?: SelectSubset<T, BudgetTeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BudgetTeams
     * const budgetTeam = await prisma.budgetTeam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetTeamUpdateManyArgs>(args: SelectSubset<T, BudgetTeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetTeams and returns the data updated in the database.
     * @param {BudgetTeamUpdateManyAndReturnArgs} args - Arguments to update many BudgetTeams.
     * @example
     * // Update many BudgetTeams
     * const budgetTeam = await prisma.budgetTeam.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BudgetTeams and only return the `id`
     * const budgetTeamWithIdOnly = await prisma.budgetTeam.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BudgetTeamUpdateManyAndReturnArgs>(args: SelectSubset<T, BudgetTeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BudgetTeam.
     * @param {BudgetTeamUpsertArgs} args - Arguments to update or create a BudgetTeam.
     * @example
     * // Update or create a BudgetTeam
     * const budgetTeam = await prisma.budgetTeam.upsert({
     *   create: {
     *     // ... data to create a BudgetTeam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BudgetTeam we want to update
     *   }
     * })
     */
    upsert<T extends BudgetTeamUpsertArgs>(args: SelectSubset<T, BudgetTeamUpsertArgs<ExtArgs>>): Prisma__BudgetTeamClient<$Result.GetResult<Prisma.$BudgetTeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BudgetTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamCountArgs} args - Arguments to filter BudgetTeams to count.
     * @example
     * // Count the number of BudgetTeams
     * const count = await prisma.budgetTeam.count({
     *   where: {
     *     // ... the filter for the BudgetTeams we want to count
     *   }
     * })
    **/
    count<T extends BudgetTeamCountArgs>(
      args?: Subset<T, BudgetTeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetTeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BudgetTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BudgetTeamAggregateArgs>(args: Subset<T, BudgetTeamAggregateArgs>): Prisma.PrismaPromise<GetBudgetTeamAggregateType<T>>

    /**
     * Group by BudgetTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetTeamGroupByArgs} args - Group by arguments.
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
      T extends BudgetTeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetTeamGroupByArgs['orderBy'] }
        : { orderBy?: BudgetTeamGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BudgetTeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BudgetTeam model
   */
  readonly fields: BudgetTeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BudgetTeam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetTeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budget<T extends BudgetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BudgetDefaultArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BudgetTeam model
   */
  interface BudgetTeamFieldRefs {
    readonly id: FieldRef<"BudgetTeam", 'String'>
    readonly budgetId: FieldRef<"BudgetTeam", 'String'>
    readonly teamId: FieldRef<"BudgetTeam", 'String'>
    readonly allocation: FieldRef<"BudgetTeam", 'Decimal'>
    readonly createdAt: FieldRef<"BudgetTeam", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BudgetTeam findUnique
   */
  export type BudgetTeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * Filter, which BudgetTeam to fetch.
     */
    where: BudgetTeamWhereUniqueInput
  }

  /**
   * BudgetTeam findUniqueOrThrow
   */
  export type BudgetTeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * Filter, which BudgetTeam to fetch.
     */
    where: BudgetTeamWhereUniqueInput
  }

  /**
   * BudgetTeam findFirst
   */
  export type BudgetTeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * Filter, which BudgetTeam to fetch.
     */
    where?: BudgetTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetTeams to fetch.
     */
    orderBy?: BudgetTeamOrderByWithRelationInput | BudgetTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetTeams.
     */
    cursor?: BudgetTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetTeams.
     */
    distinct?: BudgetTeamScalarFieldEnum | BudgetTeamScalarFieldEnum[]
  }

  /**
   * BudgetTeam findFirstOrThrow
   */
  export type BudgetTeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * Filter, which BudgetTeam to fetch.
     */
    where?: BudgetTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetTeams to fetch.
     */
    orderBy?: BudgetTeamOrderByWithRelationInput | BudgetTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetTeams.
     */
    cursor?: BudgetTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetTeams.
     */
    distinct?: BudgetTeamScalarFieldEnum | BudgetTeamScalarFieldEnum[]
  }

  /**
   * BudgetTeam findMany
   */
  export type BudgetTeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * Filter, which BudgetTeams to fetch.
     */
    where?: BudgetTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetTeams to fetch.
     */
    orderBy?: BudgetTeamOrderByWithRelationInput | BudgetTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BudgetTeams.
     */
    cursor?: BudgetTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetTeams.
     */
    skip?: number
    distinct?: BudgetTeamScalarFieldEnum | BudgetTeamScalarFieldEnum[]
  }

  /**
   * BudgetTeam create
   */
  export type BudgetTeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * The data needed to create a BudgetTeam.
     */
    data: XOR<BudgetTeamCreateInput, BudgetTeamUncheckedCreateInput>
  }

  /**
   * BudgetTeam createMany
   */
  export type BudgetTeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BudgetTeams.
     */
    data: BudgetTeamCreateManyInput | BudgetTeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BudgetTeam createManyAndReturn
   */
  export type BudgetTeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * The data used to create many BudgetTeams.
     */
    data: BudgetTeamCreateManyInput | BudgetTeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetTeam update
   */
  export type BudgetTeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * The data needed to update a BudgetTeam.
     */
    data: XOR<BudgetTeamUpdateInput, BudgetTeamUncheckedUpdateInput>
    /**
     * Choose, which BudgetTeam to update.
     */
    where: BudgetTeamWhereUniqueInput
  }

  /**
   * BudgetTeam updateMany
   */
  export type BudgetTeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BudgetTeams.
     */
    data: XOR<BudgetTeamUpdateManyMutationInput, BudgetTeamUncheckedUpdateManyInput>
    /**
     * Filter which BudgetTeams to update
     */
    where?: BudgetTeamWhereInput
    /**
     * Limit how many BudgetTeams to update.
     */
    limit?: number
  }

  /**
   * BudgetTeam updateManyAndReturn
   */
  export type BudgetTeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * The data used to update BudgetTeams.
     */
    data: XOR<BudgetTeamUpdateManyMutationInput, BudgetTeamUncheckedUpdateManyInput>
    /**
     * Filter which BudgetTeams to update
     */
    where?: BudgetTeamWhereInput
    /**
     * Limit how many BudgetTeams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetTeam upsert
   */
  export type BudgetTeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * The filter to search for the BudgetTeam to update in case it exists.
     */
    where: BudgetTeamWhereUniqueInput
    /**
     * In case the BudgetTeam found by the `where` argument doesn't exist, create a new BudgetTeam with this data.
     */
    create: XOR<BudgetTeamCreateInput, BudgetTeamUncheckedCreateInput>
    /**
     * In case the BudgetTeam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetTeamUpdateInput, BudgetTeamUncheckedUpdateInput>
  }

  /**
   * BudgetTeam delete
   */
  export type BudgetTeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
    /**
     * Filter which BudgetTeam to delete.
     */
    where: BudgetTeamWhereUniqueInput
  }

  /**
   * BudgetTeam deleteMany
   */
  export type BudgetTeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetTeams to delete
     */
    where?: BudgetTeamWhereInput
    /**
     * Limit how many BudgetTeams to delete.
     */
    limit?: number
  }

  /**
   * BudgetTeam without action
   */
  export type BudgetTeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetTeam
     */
    select?: BudgetTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetTeam
     */
    omit?: BudgetTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetTeamInclude<ExtArgs> | null
  }


  /**
   * Model CampaignTeam
   */

  export type AggregateCampaignTeam = {
    _count: CampaignTeamCountAggregateOutputType | null
    _min: CampaignTeamMinAggregateOutputType | null
    _max: CampaignTeamMaxAggregateOutputType | null
  }

  export type CampaignTeamMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    teamId: string | null
    role: string | null
    isLead: boolean | null
    createdAt: Date | null
  }

  export type CampaignTeamMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    teamId: string | null
    role: string | null
    isLead: boolean | null
    createdAt: Date | null
  }

  export type CampaignTeamCountAggregateOutputType = {
    id: number
    campaignId: number
    teamId: number
    role: number
    isLead: number
    createdAt: number
    _all: number
  }


  export type CampaignTeamMinAggregateInputType = {
    id?: true
    campaignId?: true
    teamId?: true
    role?: true
    isLead?: true
    createdAt?: true
  }

  export type CampaignTeamMaxAggregateInputType = {
    id?: true
    campaignId?: true
    teamId?: true
    role?: true
    isLead?: true
    createdAt?: true
  }

  export type CampaignTeamCountAggregateInputType = {
    id?: true
    campaignId?: true
    teamId?: true
    role?: true
    isLead?: true
    createdAt?: true
    _all?: true
  }

  export type CampaignTeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignTeam to aggregate.
     */
    where?: CampaignTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignTeams to fetch.
     */
    orderBy?: CampaignTeamOrderByWithRelationInput | CampaignTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignTeams
    **/
    _count?: true | CampaignTeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignTeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignTeamMaxAggregateInputType
  }

  export type GetCampaignTeamAggregateType<T extends CampaignTeamAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignTeam[P]>
      : GetScalarType<T[P], AggregateCampaignTeam[P]>
  }




  export type CampaignTeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignTeamWhereInput
    orderBy?: CampaignTeamOrderByWithAggregationInput | CampaignTeamOrderByWithAggregationInput[]
    by: CampaignTeamScalarFieldEnum[] | CampaignTeamScalarFieldEnum
    having?: CampaignTeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignTeamCountAggregateInputType | true
    _min?: CampaignTeamMinAggregateInputType
    _max?: CampaignTeamMaxAggregateInputType
  }

  export type CampaignTeamGroupByOutputType = {
    id: string
    campaignId: string
    teamId: string
    role: string | null
    isLead: boolean
    createdAt: Date
    _count: CampaignTeamCountAggregateOutputType | null
    _min: CampaignTeamMinAggregateOutputType | null
    _max: CampaignTeamMaxAggregateOutputType | null
  }

  type GetCampaignTeamGroupByPayload<T extends CampaignTeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignTeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignTeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignTeamGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignTeamGroupByOutputType[P]>
        }
      >
    >


  export type CampaignTeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    teamId?: boolean
    role?: boolean
    isLead?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignTeam"]>

  export type CampaignTeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    teamId?: boolean
    role?: boolean
    isLead?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignTeam"]>

  export type CampaignTeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    teamId?: boolean
    role?: boolean
    isLead?: boolean
    createdAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignTeam"]>

  export type CampaignTeamSelectScalar = {
    id?: boolean
    campaignId?: boolean
    teamId?: boolean
    role?: boolean
    isLead?: boolean
    createdAt?: boolean
  }

  export type CampaignTeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "teamId" | "role" | "isLead" | "createdAt", ExtArgs["result"]["campaignTeam"]>
  export type CampaignTeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type CampaignTeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type CampaignTeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $CampaignTeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignTeam"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
      team: Prisma.$TeamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      teamId: string
      role: string | null
      isLead: boolean
      createdAt: Date
    }, ExtArgs["result"]["campaignTeam"]>
    composites: {}
  }

  type CampaignTeamGetPayload<S extends boolean | null | undefined | CampaignTeamDefaultArgs> = $Result.GetResult<Prisma.$CampaignTeamPayload, S>

  type CampaignTeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignTeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignTeamCountAggregateInputType | true
    }

  export interface CampaignTeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignTeam'], meta: { name: 'CampaignTeam' } }
    /**
     * Find zero or one CampaignTeam that matches the filter.
     * @param {CampaignTeamFindUniqueArgs} args - Arguments to find a CampaignTeam
     * @example
     * // Get one CampaignTeam
     * const campaignTeam = await prisma.campaignTeam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignTeamFindUniqueArgs>(args: SelectSubset<T, CampaignTeamFindUniqueArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignTeam that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignTeamFindUniqueOrThrowArgs} args - Arguments to find a CampaignTeam
     * @example
     * // Get one CampaignTeam
     * const campaignTeam = await prisma.campaignTeam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignTeamFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignTeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignTeam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamFindFirstArgs} args - Arguments to find a CampaignTeam
     * @example
     * // Get one CampaignTeam
     * const campaignTeam = await prisma.campaignTeam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignTeamFindFirstArgs>(args?: SelectSubset<T, CampaignTeamFindFirstArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignTeam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamFindFirstOrThrowArgs} args - Arguments to find a CampaignTeam
     * @example
     * // Get one CampaignTeam
     * const campaignTeam = await prisma.campaignTeam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignTeamFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignTeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignTeams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignTeams
     * const campaignTeams = await prisma.campaignTeam.findMany()
     * 
     * // Get first 10 CampaignTeams
     * const campaignTeams = await prisma.campaignTeam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignTeamWithIdOnly = await prisma.campaignTeam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignTeamFindManyArgs>(args?: SelectSubset<T, CampaignTeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignTeam.
     * @param {CampaignTeamCreateArgs} args - Arguments to create a CampaignTeam.
     * @example
     * // Create one CampaignTeam
     * const CampaignTeam = await prisma.campaignTeam.create({
     *   data: {
     *     // ... data to create a CampaignTeam
     *   }
     * })
     * 
     */
    create<T extends CampaignTeamCreateArgs>(args: SelectSubset<T, CampaignTeamCreateArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignTeams.
     * @param {CampaignTeamCreateManyArgs} args - Arguments to create many CampaignTeams.
     * @example
     * // Create many CampaignTeams
     * const campaignTeam = await prisma.campaignTeam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignTeamCreateManyArgs>(args?: SelectSubset<T, CampaignTeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignTeams and returns the data saved in the database.
     * @param {CampaignTeamCreateManyAndReturnArgs} args - Arguments to create many CampaignTeams.
     * @example
     * // Create many CampaignTeams
     * const campaignTeam = await prisma.campaignTeam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignTeams and only return the `id`
     * const campaignTeamWithIdOnly = await prisma.campaignTeam.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignTeamCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignTeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignTeam.
     * @param {CampaignTeamDeleteArgs} args - Arguments to delete one CampaignTeam.
     * @example
     * // Delete one CampaignTeam
     * const CampaignTeam = await prisma.campaignTeam.delete({
     *   where: {
     *     // ... filter to delete one CampaignTeam
     *   }
     * })
     * 
     */
    delete<T extends CampaignTeamDeleteArgs>(args: SelectSubset<T, CampaignTeamDeleteArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignTeam.
     * @param {CampaignTeamUpdateArgs} args - Arguments to update one CampaignTeam.
     * @example
     * // Update one CampaignTeam
     * const campaignTeam = await prisma.campaignTeam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignTeamUpdateArgs>(args: SelectSubset<T, CampaignTeamUpdateArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignTeams.
     * @param {CampaignTeamDeleteManyArgs} args - Arguments to filter CampaignTeams to delete.
     * @example
     * // Delete a few CampaignTeams
     * const { count } = await prisma.campaignTeam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignTeamDeleteManyArgs>(args?: SelectSubset<T, CampaignTeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignTeams
     * const campaignTeam = await prisma.campaignTeam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignTeamUpdateManyArgs>(args: SelectSubset<T, CampaignTeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignTeams and returns the data updated in the database.
     * @param {CampaignTeamUpdateManyAndReturnArgs} args - Arguments to update many CampaignTeams.
     * @example
     * // Update many CampaignTeams
     * const campaignTeam = await prisma.campaignTeam.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignTeams and only return the `id`
     * const campaignTeamWithIdOnly = await prisma.campaignTeam.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignTeamUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignTeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignTeam.
     * @param {CampaignTeamUpsertArgs} args - Arguments to update or create a CampaignTeam.
     * @example
     * // Update or create a CampaignTeam
     * const campaignTeam = await prisma.campaignTeam.upsert({
     *   create: {
     *     // ... data to create a CampaignTeam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignTeam we want to update
     *   }
     * })
     */
    upsert<T extends CampaignTeamUpsertArgs>(args: SelectSubset<T, CampaignTeamUpsertArgs<ExtArgs>>): Prisma__CampaignTeamClient<$Result.GetResult<Prisma.$CampaignTeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignTeams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamCountArgs} args - Arguments to filter CampaignTeams to count.
     * @example
     * // Count the number of CampaignTeams
     * const count = await prisma.campaignTeam.count({
     *   where: {
     *     // ... the filter for the CampaignTeams we want to count
     *   }
     * })
    **/
    count<T extends CampaignTeamCountArgs>(
      args?: Subset<T, CampaignTeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignTeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignTeamAggregateArgs>(args: Subset<T, CampaignTeamAggregateArgs>): Prisma.PrismaPromise<GetCampaignTeamAggregateType<T>>

    /**
     * Group by CampaignTeam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignTeamGroupByArgs} args - Group by arguments.
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
      T extends CampaignTeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignTeamGroupByArgs['orderBy'] }
        : { orderBy?: CampaignTeamGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignTeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignTeam model
   */
  readonly fields: CampaignTeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignTeam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignTeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CampaignTeam model
   */
  interface CampaignTeamFieldRefs {
    readonly id: FieldRef<"CampaignTeam", 'String'>
    readonly campaignId: FieldRef<"CampaignTeam", 'String'>
    readonly teamId: FieldRef<"CampaignTeam", 'String'>
    readonly role: FieldRef<"CampaignTeam", 'String'>
    readonly isLead: FieldRef<"CampaignTeam", 'Boolean'>
    readonly createdAt: FieldRef<"CampaignTeam", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignTeam findUnique
   */
  export type CampaignTeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * Filter, which CampaignTeam to fetch.
     */
    where: CampaignTeamWhereUniqueInput
  }

  /**
   * CampaignTeam findUniqueOrThrow
   */
  export type CampaignTeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * Filter, which CampaignTeam to fetch.
     */
    where: CampaignTeamWhereUniqueInput
  }

  /**
   * CampaignTeam findFirst
   */
  export type CampaignTeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * Filter, which CampaignTeam to fetch.
     */
    where?: CampaignTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignTeams to fetch.
     */
    orderBy?: CampaignTeamOrderByWithRelationInput | CampaignTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignTeams.
     */
    cursor?: CampaignTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignTeams.
     */
    distinct?: CampaignTeamScalarFieldEnum | CampaignTeamScalarFieldEnum[]
  }

  /**
   * CampaignTeam findFirstOrThrow
   */
  export type CampaignTeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * Filter, which CampaignTeam to fetch.
     */
    where?: CampaignTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignTeams to fetch.
     */
    orderBy?: CampaignTeamOrderByWithRelationInput | CampaignTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignTeams.
     */
    cursor?: CampaignTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignTeams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignTeams.
     */
    distinct?: CampaignTeamScalarFieldEnum | CampaignTeamScalarFieldEnum[]
  }

  /**
   * CampaignTeam findMany
   */
  export type CampaignTeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * Filter, which CampaignTeams to fetch.
     */
    where?: CampaignTeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignTeams to fetch.
     */
    orderBy?: CampaignTeamOrderByWithRelationInput | CampaignTeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignTeams.
     */
    cursor?: CampaignTeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignTeams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignTeams.
     */
    skip?: number
    distinct?: CampaignTeamScalarFieldEnum | CampaignTeamScalarFieldEnum[]
  }

  /**
   * CampaignTeam create
   */
  export type CampaignTeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignTeam.
     */
    data: XOR<CampaignTeamCreateInput, CampaignTeamUncheckedCreateInput>
  }

  /**
   * CampaignTeam createMany
   */
  export type CampaignTeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignTeams.
     */
    data: CampaignTeamCreateManyInput | CampaignTeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampaignTeam createManyAndReturn
   */
  export type CampaignTeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignTeams.
     */
    data: CampaignTeamCreateManyInput | CampaignTeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignTeam update
   */
  export type CampaignTeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignTeam.
     */
    data: XOR<CampaignTeamUpdateInput, CampaignTeamUncheckedUpdateInput>
    /**
     * Choose, which CampaignTeam to update.
     */
    where: CampaignTeamWhereUniqueInput
  }

  /**
   * CampaignTeam updateMany
   */
  export type CampaignTeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignTeams.
     */
    data: XOR<CampaignTeamUpdateManyMutationInput, CampaignTeamUncheckedUpdateManyInput>
    /**
     * Filter which CampaignTeams to update
     */
    where?: CampaignTeamWhereInput
    /**
     * Limit how many CampaignTeams to update.
     */
    limit?: number
  }

  /**
   * CampaignTeam updateManyAndReturn
   */
  export type CampaignTeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * The data used to update CampaignTeams.
     */
    data: XOR<CampaignTeamUpdateManyMutationInput, CampaignTeamUncheckedUpdateManyInput>
    /**
     * Filter which CampaignTeams to update
     */
    where?: CampaignTeamWhereInput
    /**
     * Limit how many CampaignTeams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignTeam upsert
   */
  export type CampaignTeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignTeam to update in case it exists.
     */
    where: CampaignTeamWhereUniqueInput
    /**
     * In case the CampaignTeam found by the `where` argument doesn't exist, create a new CampaignTeam with this data.
     */
    create: XOR<CampaignTeamCreateInput, CampaignTeamUncheckedCreateInput>
    /**
     * In case the CampaignTeam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignTeamUpdateInput, CampaignTeamUncheckedUpdateInput>
  }

  /**
   * CampaignTeam delete
   */
  export type CampaignTeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
    /**
     * Filter which CampaignTeam to delete.
     */
    where: CampaignTeamWhereUniqueInput
  }

  /**
   * CampaignTeam deleteMany
   */
  export type CampaignTeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignTeams to delete
     */
    where?: CampaignTeamWhereInput
    /**
     * Limit how many CampaignTeams to delete.
     */
    limit?: number
  }

  /**
   * CampaignTeam without action
   */
  export type CampaignTeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignTeam
     */
    select?: CampaignTeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignTeam
     */
    omit?: CampaignTeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignTeamInclude<ExtArgs> | null
  }


  /**
   * Model CampaignKpi
   */

  export type AggregateCampaignKpi = {
    _count: CampaignKpiCountAggregateOutputType | null
    _avg: CampaignKpiAvgAggregateOutputType | null
    _sum: CampaignKpiSumAggregateOutputType | null
    _min: CampaignKpiMinAggregateOutputType | null
    _max: CampaignKpiMaxAggregateOutputType | null
  }

  export type CampaignKpiAvgAggregateOutputType = {
    targetValue: Decimal | null
    actualValue: Decimal | null
    priority: number | null
  }

  export type CampaignKpiSumAggregateOutputType = {
    targetValue: Decimal | null
    actualValue: Decimal | null
    priority: number | null
  }

  export type CampaignKpiMinAggregateOutputType = {
    id: string | null
    campaignId: string | null
    kpiType: string | null
    targetValue: Decimal | null
    actualValue: Decimal | null
    unit: string | null
    description: string | null
    priority: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignKpiMaxAggregateOutputType = {
    id: string | null
    campaignId: string | null
    kpiType: string | null
    targetValue: Decimal | null
    actualValue: Decimal | null
    unit: string | null
    description: string | null
    priority: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignKpiCountAggregateOutputType = {
    id: number
    campaignId: number
    kpiType: number
    targetValue: number
    actualValue: number
    unit: number
    description: number
    priority: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignKpiAvgAggregateInputType = {
    targetValue?: true
    actualValue?: true
    priority?: true
  }

  export type CampaignKpiSumAggregateInputType = {
    targetValue?: true
    actualValue?: true
    priority?: true
  }

  export type CampaignKpiMinAggregateInputType = {
    id?: true
    campaignId?: true
    kpiType?: true
    targetValue?: true
    actualValue?: true
    unit?: true
    description?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignKpiMaxAggregateInputType = {
    id?: true
    campaignId?: true
    kpiType?: true
    targetValue?: true
    actualValue?: true
    unit?: true
    description?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignKpiCountAggregateInputType = {
    id?: true
    campaignId?: true
    kpiType?: true
    targetValue?: true
    actualValue?: true
    unit?: true
    description?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignKpiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignKpi to aggregate.
     */
    where?: CampaignKpiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignKpis to fetch.
     */
    orderBy?: CampaignKpiOrderByWithRelationInput | CampaignKpiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignKpiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignKpis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignKpis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampaignKpis
    **/
    _count?: true | CampaignKpiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignKpiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignKpiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignKpiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignKpiMaxAggregateInputType
  }

  export type GetCampaignKpiAggregateType<T extends CampaignKpiAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaignKpi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaignKpi[P]>
      : GetScalarType<T[P], AggregateCampaignKpi[P]>
  }




  export type CampaignKpiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignKpiWhereInput
    orderBy?: CampaignKpiOrderByWithAggregationInput | CampaignKpiOrderByWithAggregationInput[]
    by: CampaignKpiScalarFieldEnum[] | CampaignKpiScalarFieldEnum
    having?: CampaignKpiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignKpiCountAggregateInputType | true
    _avg?: CampaignKpiAvgAggregateInputType
    _sum?: CampaignKpiSumAggregateInputType
    _min?: CampaignKpiMinAggregateInputType
    _max?: CampaignKpiMaxAggregateInputType
  }

  export type CampaignKpiGroupByOutputType = {
    id: string
    campaignId: string
    kpiType: string
    targetValue: Decimal
    actualValue: Decimal | null
    unit: string
    description: string | null
    priority: number
    createdAt: Date
    updatedAt: Date
    _count: CampaignKpiCountAggregateOutputType | null
    _avg: CampaignKpiAvgAggregateOutputType | null
    _sum: CampaignKpiSumAggregateOutputType | null
    _min: CampaignKpiMinAggregateOutputType | null
    _max: CampaignKpiMaxAggregateOutputType | null
  }

  type GetCampaignKpiGroupByPayload<T extends CampaignKpiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignKpiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignKpiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignKpiGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignKpiGroupByOutputType[P]>
        }
      >
    >


  export type CampaignKpiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    kpiType?: boolean
    targetValue?: boolean
    actualValue?: boolean
    unit?: boolean
    description?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignKpi"]>

  export type CampaignKpiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    kpiType?: boolean
    targetValue?: boolean
    actualValue?: boolean
    unit?: boolean
    description?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignKpi"]>

  export type CampaignKpiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    kpiType?: boolean
    targetValue?: boolean
    actualValue?: boolean
    unit?: boolean
    description?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["campaignKpi"]>

  export type CampaignKpiSelectScalar = {
    id?: boolean
    campaignId?: boolean
    kpiType?: boolean
    targetValue?: boolean
    actualValue?: boolean
    unit?: boolean
    description?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignKpiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "kpiType" | "targetValue" | "actualValue" | "unit" | "description" | "priority" | "createdAt" | "updatedAt", ExtArgs["result"]["campaignKpi"]>
  export type CampaignKpiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type CampaignKpiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }
  export type CampaignKpiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>
  }

  export type $CampaignKpiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampaignKpi"
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      campaignId: string
      kpiType: string
      targetValue: Prisma.Decimal
      actualValue: Prisma.Decimal | null
      unit: string
      description: string | null
      priority: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaignKpi"]>
    composites: {}
  }

  type CampaignKpiGetPayload<S extends boolean | null | undefined | CampaignKpiDefaultArgs> = $Result.GetResult<Prisma.$CampaignKpiPayload, S>

  type CampaignKpiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignKpiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignKpiCountAggregateInputType | true
    }

  export interface CampaignKpiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampaignKpi'], meta: { name: 'CampaignKpi' } }
    /**
     * Find zero or one CampaignKpi that matches the filter.
     * @param {CampaignKpiFindUniqueArgs} args - Arguments to find a CampaignKpi
     * @example
     * // Get one CampaignKpi
     * const campaignKpi = await prisma.campaignKpi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignKpiFindUniqueArgs>(args: SelectSubset<T, CampaignKpiFindUniqueArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampaignKpi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignKpiFindUniqueOrThrowArgs} args - Arguments to find a CampaignKpi
     * @example
     * // Get one CampaignKpi
     * const campaignKpi = await prisma.campaignKpi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignKpiFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignKpiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignKpi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiFindFirstArgs} args - Arguments to find a CampaignKpi
     * @example
     * // Get one CampaignKpi
     * const campaignKpi = await prisma.campaignKpi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignKpiFindFirstArgs>(args?: SelectSubset<T, CampaignKpiFindFirstArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampaignKpi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiFindFirstOrThrowArgs} args - Arguments to find a CampaignKpi
     * @example
     * // Get one CampaignKpi
     * const campaignKpi = await prisma.campaignKpi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignKpiFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignKpiFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampaignKpis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampaignKpis
     * const campaignKpis = await prisma.campaignKpi.findMany()
     * 
     * // Get first 10 CampaignKpis
     * const campaignKpis = await prisma.campaignKpi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignKpiWithIdOnly = await prisma.campaignKpi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignKpiFindManyArgs>(args?: SelectSubset<T, CampaignKpiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampaignKpi.
     * @param {CampaignKpiCreateArgs} args - Arguments to create a CampaignKpi.
     * @example
     * // Create one CampaignKpi
     * const CampaignKpi = await prisma.campaignKpi.create({
     *   data: {
     *     // ... data to create a CampaignKpi
     *   }
     * })
     * 
     */
    create<T extends CampaignKpiCreateArgs>(args: SelectSubset<T, CampaignKpiCreateArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampaignKpis.
     * @param {CampaignKpiCreateManyArgs} args - Arguments to create many CampaignKpis.
     * @example
     * // Create many CampaignKpis
     * const campaignKpi = await prisma.campaignKpi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignKpiCreateManyArgs>(args?: SelectSubset<T, CampaignKpiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampaignKpis and returns the data saved in the database.
     * @param {CampaignKpiCreateManyAndReturnArgs} args - Arguments to create many CampaignKpis.
     * @example
     * // Create many CampaignKpis
     * const campaignKpi = await prisma.campaignKpi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampaignKpis and only return the `id`
     * const campaignKpiWithIdOnly = await prisma.campaignKpi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignKpiCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignKpiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampaignKpi.
     * @param {CampaignKpiDeleteArgs} args - Arguments to delete one CampaignKpi.
     * @example
     * // Delete one CampaignKpi
     * const CampaignKpi = await prisma.campaignKpi.delete({
     *   where: {
     *     // ... filter to delete one CampaignKpi
     *   }
     * })
     * 
     */
    delete<T extends CampaignKpiDeleteArgs>(args: SelectSubset<T, CampaignKpiDeleteArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampaignKpi.
     * @param {CampaignKpiUpdateArgs} args - Arguments to update one CampaignKpi.
     * @example
     * // Update one CampaignKpi
     * const campaignKpi = await prisma.campaignKpi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignKpiUpdateArgs>(args: SelectSubset<T, CampaignKpiUpdateArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampaignKpis.
     * @param {CampaignKpiDeleteManyArgs} args - Arguments to filter CampaignKpis to delete.
     * @example
     * // Delete a few CampaignKpis
     * const { count } = await prisma.campaignKpi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignKpiDeleteManyArgs>(args?: SelectSubset<T, CampaignKpiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignKpis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampaignKpis
     * const campaignKpi = await prisma.campaignKpi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignKpiUpdateManyArgs>(args: SelectSubset<T, CampaignKpiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampaignKpis and returns the data updated in the database.
     * @param {CampaignKpiUpdateManyAndReturnArgs} args - Arguments to update many CampaignKpis.
     * @example
     * // Update many CampaignKpis
     * const campaignKpi = await prisma.campaignKpi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampaignKpis and only return the `id`
     * const campaignKpiWithIdOnly = await prisma.campaignKpi.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignKpiUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignKpiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampaignKpi.
     * @param {CampaignKpiUpsertArgs} args - Arguments to update or create a CampaignKpi.
     * @example
     * // Update or create a CampaignKpi
     * const campaignKpi = await prisma.campaignKpi.upsert({
     *   create: {
     *     // ... data to create a CampaignKpi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampaignKpi we want to update
     *   }
     * })
     */
    upsert<T extends CampaignKpiUpsertArgs>(args: SelectSubset<T, CampaignKpiUpsertArgs<ExtArgs>>): Prisma__CampaignKpiClient<$Result.GetResult<Prisma.$CampaignKpiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampaignKpis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiCountArgs} args - Arguments to filter CampaignKpis to count.
     * @example
     * // Count the number of CampaignKpis
     * const count = await prisma.campaignKpi.count({
     *   where: {
     *     // ... the filter for the CampaignKpis we want to count
     *   }
     * })
    **/
    count<T extends CampaignKpiCountArgs>(
      args?: Subset<T, CampaignKpiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignKpiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampaignKpi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CampaignKpiAggregateArgs>(args: Subset<T, CampaignKpiAggregateArgs>): Prisma.PrismaPromise<GetCampaignKpiAggregateType<T>>

    /**
     * Group by CampaignKpi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignKpiGroupByArgs} args - Group by arguments.
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
      T extends CampaignKpiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignKpiGroupByArgs['orderBy'] }
        : { orderBy?: CampaignKpiGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CampaignKpiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignKpiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampaignKpi model
   */
  readonly fields: CampaignKpiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampaignKpi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignKpiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CampaignDefaultArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CampaignKpi model
   */
  interface CampaignKpiFieldRefs {
    readonly id: FieldRef<"CampaignKpi", 'String'>
    readonly campaignId: FieldRef<"CampaignKpi", 'String'>
    readonly kpiType: FieldRef<"CampaignKpi", 'String'>
    readonly targetValue: FieldRef<"CampaignKpi", 'Decimal'>
    readonly actualValue: FieldRef<"CampaignKpi", 'Decimal'>
    readonly unit: FieldRef<"CampaignKpi", 'String'>
    readonly description: FieldRef<"CampaignKpi", 'String'>
    readonly priority: FieldRef<"CampaignKpi", 'Int'>
    readonly createdAt: FieldRef<"CampaignKpi", 'DateTime'>
    readonly updatedAt: FieldRef<"CampaignKpi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampaignKpi findUnique
   */
  export type CampaignKpiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * Filter, which CampaignKpi to fetch.
     */
    where: CampaignKpiWhereUniqueInput
  }

  /**
   * CampaignKpi findUniqueOrThrow
   */
  export type CampaignKpiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * Filter, which CampaignKpi to fetch.
     */
    where: CampaignKpiWhereUniqueInput
  }

  /**
   * CampaignKpi findFirst
   */
  export type CampaignKpiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * Filter, which CampaignKpi to fetch.
     */
    where?: CampaignKpiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignKpis to fetch.
     */
    orderBy?: CampaignKpiOrderByWithRelationInput | CampaignKpiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignKpis.
     */
    cursor?: CampaignKpiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignKpis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignKpis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignKpis.
     */
    distinct?: CampaignKpiScalarFieldEnum | CampaignKpiScalarFieldEnum[]
  }

  /**
   * CampaignKpi findFirstOrThrow
   */
  export type CampaignKpiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * Filter, which CampaignKpi to fetch.
     */
    where?: CampaignKpiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignKpis to fetch.
     */
    orderBy?: CampaignKpiOrderByWithRelationInput | CampaignKpiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampaignKpis.
     */
    cursor?: CampaignKpiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignKpis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignKpis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampaignKpis.
     */
    distinct?: CampaignKpiScalarFieldEnum | CampaignKpiScalarFieldEnum[]
  }

  /**
   * CampaignKpi findMany
   */
  export type CampaignKpiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * Filter, which CampaignKpis to fetch.
     */
    where?: CampaignKpiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampaignKpis to fetch.
     */
    orderBy?: CampaignKpiOrderByWithRelationInput | CampaignKpiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampaignKpis.
     */
    cursor?: CampaignKpiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampaignKpis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampaignKpis.
     */
    skip?: number
    distinct?: CampaignKpiScalarFieldEnum | CampaignKpiScalarFieldEnum[]
  }

  /**
   * CampaignKpi create
   */
  export type CampaignKpiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * The data needed to create a CampaignKpi.
     */
    data: XOR<CampaignKpiCreateInput, CampaignKpiUncheckedCreateInput>
  }

  /**
   * CampaignKpi createMany
   */
  export type CampaignKpiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampaignKpis.
     */
    data: CampaignKpiCreateManyInput | CampaignKpiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampaignKpi createManyAndReturn
   */
  export type CampaignKpiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * The data used to create many CampaignKpis.
     */
    data: CampaignKpiCreateManyInput | CampaignKpiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignKpi update
   */
  export type CampaignKpiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * The data needed to update a CampaignKpi.
     */
    data: XOR<CampaignKpiUpdateInput, CampaignKpiUncheckedUpdateInput>
    /**
     * Choose, which CampaignKpi to update.
     */
    where: CampaignKpiWhereUniqueInput
  }

  /**
   * CampaignKpi updateMany
   */
  export type CampaignKpiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampaignKpis.
     */
    data: XOR<CampaignKpiUpdateManyMutationInput, CampaignKpiUncheckedUpdateManyInput>
    /**
     * Filter which CampaignKpis to update
     */
    where?: CampaignKpiWhereInput
    /**
     * Limit how many CampaignKpis to update.
     */
    limit?: number
  }

  /**
   * CampaignKpi updateManyAndReturn
   */
  export type CampaignKpiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * The data used to update CampaignKpis.
     */
    data: XOR<CampaignKpiUpdateManyMutationInput, CampaignKpiUncheckedUpdateManyInput>
    /**
     * Filter which CampaignKpis to update
     */
    where?: CampaignKpiWhereInput
    /**
     * Limit how many CampaignKpis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampaignKpi upsert
   */
  export type CampaignKpiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * The filter to search for the CampaignKpi to update in case it exists.
     */
    where: CampaignKpiWhereUniqueInput
    /**
     * In case the CampaignKpi found by the `where` argument doesn't exist, create a new CampaignKpi with this data.
     */
    create: XOR<CampaignKpiCreateInput, CampaignKpiUncheckedCreateInput>
    /**
     * In case the CampaignKpi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignKpiUpdateInput, CampaignKpiUncheckedUpdateInput>
  }

  /**
   * CampaignKpi delete
   */
  export type CampaignKpiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
    /**
     * Filter which CampaignKpi to delete.
     */
    where: CampaignKpiWhereUniqueInput
  }

  /**
   * CampaignKpi deleteMany
   */
  export type CampaignKpiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampaignKpis to delete
     */
    where?: CampaignKpiWhereInput
    /**
     * Limit how many CampaignKpis to delete.
     */
    limit?: number
  }

  /**
   * CampaignKpi without action
   */
  export type CampaignKpiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampaignKpi
     */
    select?: CampaignKpiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampaignKpi
     */
    omit?: CampaignKpiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignKpiInclude<ExtArgs> | null
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
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    role: 'role',
    department: 'department',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    managerId: 'managerId',
    agency: 'agency',
    salesChannel: 'salesChannel',
    salesDepartment: 'salesDepartment',
    businessDivision: 'businessDivision',
    priority: 'priority'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    name: 'name',
    purpose: 'purpose',
    totalBudget: 'totalBudget',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    startYear: 'startYear',
    startMonth: 'startMonth',
    endYear: 'endYear',
    endMonth: 'endMonth'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const BudgetScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    year: 'year',
    month: 'month',
    platform: 'platform',
    operationType: 'operationType',
    amount: 'amount',
    targetKpi: 'targetKpi',
    targetValue: 'targetValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    budgetType: 'budgetType'
  };

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const ResultScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    year: 'year',
    month: 'month',
    platform: 'platform',
    operationType: 'operationType',
    actualSpend: 'actualSpend',
    actualResult: 'actualResult',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    budgetType: 'budgetType'
  };

  export type ResultScalarFieldEnum = (typeof ResultScalarFieldEnum)[keyof typeof ResultScalarFieldEnum]


  export const MasterScalarFieldEnum: {
    id: 'id',
    category: 'category',
    value: 'value',
    order: 'order'
  };

  export type MasterScalarFieldEnum = (typeof MasterScalarFieldEnum)[keyof typeof MasterScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    color: 'color',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const BudgetTeamScalarFieldEnum: {
    id: 'id',
    budgetId: 'budgetId',
    teamId: 'teamId',
    allocation: 'allocation',
    createdAt: 'createdAt'
  };

  export type BudgetTeamScalarFieldEnum = (typeof BudgetTeamScalarFieldEnum)[keyof typeof BudgetTeamScalarFieldEnum]


  export const CampaignTeamScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    teamId: 'teamId',
    role: 'role',
    isLead: 'isLead',
    createdAt: 'createdAt'
  };

  export type CampaignTeamScalarFieldEnum = (typeof CampaignTeamScalarFieldEnum)[keyof typeof CampaignTeamScalarFieldEnum]


  export const CampaignKpiScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    kpiType: 'kpiType',
    targetValue: 'targetValue',
    actualValue: 'actualValue',
    unit: 'unit',
    description: 'description',
    priority: 'priority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignKpiScalarFieldEnum = (typeof CampaignKpiScalarFieldEnum)[keyof typeof CampaignKpiScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    department?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    managedClients?: ClientListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    department?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    managedClients?: ClientOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    department?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    managedClients?: ClientListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    department?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    managerId?: StringNullableFilter<"Client"> | string | null
    agency?: StringNullableFilter<"Client"> | string | null
    salesChannel?: StringNullableFilter<"Client"> | string | null
    salesDepartment?: StringFilter<"Client"> | string
    businessDivision?: StringFilter<"Client"> | string
    priority?: StringNullableFilter<"Client"> | string | null
    campaigns?: CampaignListRelationFilter
    manager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    managerId?: SortOrderInput | SortOrder
    agency?: SortOrderInput | SortOrder
    salesChannel?: SortOrderInput | SortOrder
    salesDepartment?: SortOrder
    businessDivision?: SortOrder
    priority?: SortOrderInput | SortOrder
    campaigns?: CampaignOrderByRelationAggregateInput
    manager?: UserOrderByWithRelationInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    managerId?: StringNullableFilter<"Client"> | string | null
    agency?: StringNullableFilter<"Client"> | string | null
    salesChannel?: StringNullableFilter<"Client"> | string | null
    salesDepartment?: StringFilter<"Client"> | string
    businessDivision?: StringFilter<"Client"> | string
    priority?: StringNullableFilter<"Client"> | string | null
    campaigns?: CampaignListRelationFilter
    manager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    managerId?: SortOrderInput | SortOrder
    agency?: SortOrderInput | SortOrder
    salesChannel?: SortOrderInput | SortOrder
    salesDepartment?: SortOrder
    businessDivision?: SortOrder
    priority?: SortOrderInput | SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    managerId?: StringNullableWithAggregatesFilter<"Client"> | string | null
    agency?: StringNullableWithAggregatesFilter<"Client"> | string | null
    salesChannel?: StringNullableWithAggregatesFilter<"Client"> | string | null
    salesDepartment?: StringWithAggregatesFilter<"Client"> | string
    businessDivision?: StringWithAggregatesFilter<"Client"> | string
    priority?: StringNullableWithAggregatesFilter<"Client"> | string | null
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    clientId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    purpose?: StringNullableFilter<"Campaign"> | string | null
    totalBudget?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    startYear?: IntFilter<"Campaign"> | number
    startMonth?: IntFilter<"Campaign"> | number
    endYear?: IntNullableFilter<"Campaign"> | number | null
    endMonth?: IntNullableFilter<"Campaign"> | number | null
    budgets?: BudgetListRelationFilter
    campaignKpis?: CampaignKpiListRelationFilter
    campaignTeams?: CampaignTeamListRelationFilter
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    results?: ResultListRelationFilter
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    purpose?: SortOrderInput | SortOrder
    totalBudget?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrderInput | SortOrder
    endMonth?: SortOrderInput | SortOrder
    budgets?: BudgetOrderByRelationAggregateInput
    campaignKpis?: CampaignKpiOrderByRelationAggregateInput
    campaignTeams?: CampaignTeamOrderByRelationAggregateInput
    client?: ClientOrderByWithRelationInput
    results?: ResultOrderByRelationAggregateInput
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    clientId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    purpose?: StringNullableFilter<"Campaign"> | string | null
    totalBudget?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    startYear?: IntFilter<"Campaign"> | number
    startMonth?: IntFilter<"Campaign"> | number
    endYear?: IntNullableFilter<"Campaign"> | number | null
    endMonth?: IntNullableFilter<"Campaign"> | number | null
    budgets?: BudgetListRelationFilter
    campaignKpis?: CampaignKpiListRelationFilter
    campaignTeams?: CampaignTeamListRelationFilter
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    results?: ResultListRelationFilter
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    purpose?: SortOrderInput | SortOrder
    totalBudget?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrderInput | SortOrder
    endMonth?: SortOrderInput | SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _avg?: CampaignAvgOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
    _sum?: CampaignSumOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    clientId?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    purpose?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    totalBudget?: DecimalWithAggregatesFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    startYear?: IntWithAggregatesFilter<"Campaign"> | number
    startMonth?: IntWithAggregatesFilter<"Campaign"> | number
    endYear?: IntNullableWithAggregatesFilter<"Campaign"> | number | null
    endMonth?: IntNullableWithAggregatesFilter<"Campaign"> | number | null
  }

  export type BudgetWhereInput = {
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    id?: StringFilter<"Budget"> | string
    campaignId?: StringFilter<"Budget"> | string
    year?: IntFilter<"Budget"> | number
    month?: IntFilter<"Budget"> | number
    platform?: StringFilter<"Budget"> | string
    operationType?: StringFilter<"Budget"> | string
    amount?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    targetKpi?: StringNullableFilter<"Budget"> | string | null
    targetValue?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    budgetType?: StringFilter<"Budget"> | string
    budgetTeams?: BudgetTeamListRelationFilter
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    amount?: SortOrder
    targetKpi?: SortOrderInput | SortOrder
    targetValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
    budgetTeams?: BudgetTeamOrderByRelationAggregateInput
    campaign?: CampaignOrderByWithRelationInput
  }

  export type BudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    campaignId?: StringFilter<"Budget"> | string
    year?: IntFilter<"Budget"> | number
    month?: IntFilter<"Budget"> | number
    platform?: StringFilter<"Budget"> | string
    operationType?: StringFilter<"Budget"> | string
    amount?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    targetKpi?: StringNullableFilter<"Budget"> | string | null
    targetValue?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    budgetType?: StringFilter<"Budget"> | string
    budgetTeams?: BudgetTeamListRelationFilter
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }, "id">

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    amount?: SortOrder
    targetKpi?: SortOrderInput | SortOrder
    targetValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _avg?: BudgetAvgOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
    _sum?: BudgetSumOrderByAggregateInput
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    OR?: BudgetScalarWhereWithAggregatesInput[]
    NOT?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Budget"> | string
    campaignId?: StringWithAggregatesFilter<"Budget"> | string
    year?: IntWithAggregatesFilter<"Budget"> | number
    month?: IntWithAggregatesFilter<"Budget"> | number
    platform?: StringWithAggregatesFilter<"Budget"> | string
    operationType?: StringWithAggregatesFilter<"Budget"> | string
    amount?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    targetKpi?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    targetValue?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    budgetType?: StringWithAggregatesFilter<"Budget"> | string
  }

  export type ResultWhereInput = {
    AND?: ResultWhereInput | ResultWhereInput[]
    OR?: ResultWhereInput[]
    NOT?: ResultWhereInput | ResultWhereInput[]
    id?: StringFilter<"Result"> | string
    campaignId?: StringFilter<"Result"> | string
    year?: IntFilter<"Result"> | number
    month?: IntFilter<"Result"> | number
    platform?: StringFilter<"Result"> | string
    operationType?: StringFilter<"Result"> | string
    actualSpend?: DecimalFilter<"Result"> | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFilter<"Result"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Result"> | Date | string
    updatedAt?: DateTimeFilter<"Result"> | Date | string
    budgetType?: StringFilter<"Result"> | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }

  export type ResultOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
  }

  export type ResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResultWhereInput | ResultWhereInput[]
    OR?: ResultWhereInput[]
    NOT?: ResultWhereInput | ResultWhereInput[]
    campaignId?: StringFilter<"Result"> | string
    year?: IntFilter<"Result"> | number
    month?: IntFilter<"Result"> | number
    platform?: StringFilter<"Result"> | string
    operationType?: StringFilter<"Result"> | string
    actualSpend?: DecimalFilter<"Result"> | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFilter<"Result"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Result"> | Date | string
    updatedAt?: DateTimeFilter<"Result"> | Date | string
    budgetType?: StringFilter<"Result"> | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }, "id">

  export type ResultOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
    _count?: ResultCountOrderByAggregateInput
    _avg?: ResultAvgOrderByAggregateInput
    _max?: ResultMaxOrderByAggregateInput
    _min?: ResultMinOrderByAggregateInput
    _sum?: ResultSumOrderByAggregateInput
  }

  export type ResultScalarWhereWithAggregatesInput = {
    AND?: ResultScalarWhereWithAggregatesInput | ResultScalarWhereWithAggregatesInput[]
    OR?: ResultScalarWhereWithAggregatesInput[]
    NOT?: ResultScalarWhereWithAggregatesInput | ResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Result"> | string
    campaignId?: StringWithAggregatesFilter<"Result"> | string
    year?: IntWithAggregatesFilter<"Result"> | number
    month?: IntWithAggregatesFilter<"Result"> | number
    platform?: StringWithAggregatesFilter<"Result"> | string
    operationType?: StringWithAggregatesFilter<"Result"> | string
    actualSpend?: DecimalWithAggregatesFilter<"Result"> | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalWithAggregatesFilter<"Result"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Result"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Result"> | Date | string
    budgetType?: StringWithAggregatesFilter<"Result"> | string
  }

  export type MasterWhereInput = {
    AND?: MasterWhereInput | MasterWhereInput[]
    OR?: MasterWhereInput[]
    NOT?: MasterWhereInput | MasterWhereInput[]
    id?: StringFilter<"Master"> | string
    category?: StringFilter<"Master"> | string
    value?: StringFilter<"Master"> | string
    order?: IntFilter<"Master"> | number
  }

  export type MasterOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
    order?: SortOrder
  }

  export type MasterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MasterWhereInput | MasterWhereInput[]
    OR?: MasterWhereInput[]
    NOT?: MasterWhereInput | MasterWhereInput[]
    category?: StringFilter<"Master"> | string
    value?: StringFilter<"Master"> | string
    order?: IntFilter<"Master"> | number
  }, "id">

  export type MasterOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
    order?: SortOrder
    _count?: MasterCountOrderByAggregateInput
    _avg?: MasterAvgOrderByAggregateInput
    _max?: MasterMaxOrderByAggregateInput
    _min?: MasterMinOrderByAggregateInput
    _sum?: MasterSumOrderByAggregateInput
  }

  export type MasterScalarWhereWithAggregatesInput = {
    AND?: MasterScalarWhereWithAggregatesInput | MasterScalarWhereWithAggregatesInput[]
    OR?: MasterScalarWhereWithAggregatesInput[]
    NOT?: MasterScalarWhereWithAggregatesInput | MasterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Master"> | string
    category?: StringWithAggregatesFilter<"Master"> | string
    value?: StringWithAggregatesFilter<"Master"> | string
    order?: IntWithAggregatesFilter<"Master"> | number
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    description?: StringNullableFilter<"Team"> | string | null
    color?: StringNullableFilter<"Team"> | string | null
    isActive?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    budgetTeams?: BudgetTeamListRelationFilter
    campaignTeams?: CampaignTeamListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetTeams?: BudgetTeamOrderByRelationAggregateInput
    campaignTeams?: CampaignTeamOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    description?: StringNullableFilter<"Team"> | string | null
    color?: StringNullableFilter<"Team"> | string | null
    isActive?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    budgetTeams?: BudgetTeamListRelationFilter
    campaignTeams?: CampaignTeamListRelationFilter
  }, "id" | "name">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    description?: StringNullableWithAggregatesFilter<"Team"> | string | null
    color?: StringNullableWithAggregatesFilter<"Team"> | string | null
    isActive?: BoolWithAggregatesFilter<"Team"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type BudgetTeamWhereInput = {
    AND?: BudgetTeamWhereInput | BudgetTeamWhereInput[]
    OR?: BudgetTeamWhereInput[]
    NOT?: BudgetTeamWhereInput | BudgetTeamWhereInput[]
    id?: StringFilter<"BudgetTeam"> | string
    budgetId?: StringFilter<"BudgetTeam"> | string
    teamId?: StringFilter<"BudgetTeam"> | string
    allocation?: DecimalFilter<"BudgetTeam"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"BudgetTeam"> | Date | string
    budget?: XOR<BudgetScalarRelationFilter, BudgetWhereInput>
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }

  export type BudgetTeamOrderByWithRelationInput = {
    id?: SortOrder
    budgetId?: SortOrder
    teamId?: SortOrder
    allocation?: SortOrder
    createdAt?: SortOrder
    budget?: BudgetOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
  }

  export type BudgetTeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    budgetId_teamId?: BudgetTeamBudgetIdTeamIdCompoundUniqueInput
    AND?: BudgetTeamWhereInput | BudgetTeamWhereInput[]
    OR?: BudgetTeamWhereInput[]
    NOT?: BudgetTeamWhereInput | BudgetTeamWhereInput[]
    budgetId?: StringFilter<"BudgetTeam"> | string
    teamId?: StringFilter<"BudgetTeam"> | string
    allocation?: DecimalFilter<"BudgetTeam"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"BudgetTeam"> | Date | string
    budget?: XOR<BudgetScalarRelationFilter, BudgetWhereInput>
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }, "id" | "budgetId_teamId">

  export type BudgetTeamOrderByWithAggregationInput = {
    id?: SortOrder
    budgetId?: SortOrder
    teamId?: SortOrder
    allocation?: SortOrder
    createdAt?: SortOrder
    _count?: BudgetTeamCountOrderByAggregateInput
    _avg?: BudgetTeamAvgOrderByAggregateInput
    _max?: BudgetTeamMaxOrderByAggregateInput
    _min?: BudgetTeamMinOrderByAggregateInput
    _sum?: BudgetTeamSumOrderByAggregateInput
  }

  export type BudgetTeamScalarWhereWithAggregatesInput = {
    AND?: BudgetTeamScalarWhereWithAggregatesInput | BudgetTeamScalarWhereWithAggregatesInput[]
    OR?: BudgetTeamScalarWhereWithAggregatesInput[]
    NOT?: BudgetTeamScalarWhereWithAggregatesInput | BudgetTeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BudgetTeam"> | string
    budgetId?: StringWithAggregatesFilter<"BudgetTeam"> | string
    teamId?: StringWithAggregatesFilter<"BudgetTeam"> | string
    allocation?: DecimalWithAggregatesFilter<"BudgetTeam"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"BudgetTeam"> | Date | string
  }

  export type CampaignTeamWhereInput = {
    AND?: CampaignTeamWhereInput | CampaignTeamWhereInput[]
    OR?: CampaignTeamWhereInput[]
    NOT?: CampaignTeamWhereInput | CampaignTeamWhereInput[]
    id?: StringFilter<"CampaignTeam"> | string
    campaignId?: StringFilter<"CampaignTeam"> | string
    teamId?: StringFilter<"CampaignTeam"> | string
    role?: StringNullableFilter<"CampaignTeam"> | string | null
    isLead?: BoolFilter<"CampaignTeam"> | boolean
    createdAt?: DateTimeFilter<"CampaignTeam"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }

  export type CampaignTeamOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    teamId?: SortOrder
    role?: SortOrderInput | SortOrder
    isLead?: SortOrder
    createdAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
  }

  export type CampaignTeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    campaignId_teamId?: CampaignTeamCampaignIdTeamIdCompoundUniqueInput
    AND?: CampaignTeamWhereInput | CampaignTeamWhereInput[]
    OR?: CampaignTeamWhereInput[]
    NOT?: CampaignTeamWhereInput | CampaignTeamWhereInput[]
    campaignId?: StringFilter<"CampaignTeam"> | string
    teamId?: StringFilter<"CampaignTeam"> | string
    role?: StringNullableFilter<"CampaignTeam"> | string | null
    isLead?: BoolFilter<"CampaignTeam"> | boolean
    createdAt?: DateTimeFilter<"CampaignTeam"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }, "id" | "campaignId_teamId">

  export type CampaignTeamOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    teamId?: SortOrder
    role?: SortOrderInput | SortOrder
    isLead?: SortOrder
    createdAt?: SortOrder
    _count?: CampaignTeamCountOrderByAggregateInput
    _max?: CampaignTeamMaxOrderByAggregateInput
    _min?: CampaignTeamMinOrderByAggregateInput
  }

  export type CampaignTeamScalarWhereWithAggregatesInput = {
    AND?: CampaignTeamScalarWhereWithAggregatesInput | CampaignTeamScalarWhereWithAggregatesInput[]
    OR?: CampaignTeamScalarWhereWithAggregatesInput[]
    NOT?: CampaignTeamScalarWhereWithAggregatesInput | CampaignTeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignTeam"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignTeam"> | string
    teamId?: StringWithAggregatesFilter<"CampaignTeam"> | string
    role?: StringNullableWithAggregatesFilter<"CampaignTeam"> | string | null
    isLead?: BoolWithAggregatesFilter<"CampaignTeam"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CampaignTeam"> | Date | string
  }

  export type CampaignKpiWhereInput = {
    AND?: CampaignKpiWhereInput | CampaignKpiWhereInput[]
    OR?: CampaignKpiWhereInput[]
    NOT?: CampaignKpiWhereInput | CampaignKpiWhereInput[]
    id?: StringFilter<"CampaignKpi"> | string
    campaignId?: StringFilter<"CampaignKpi"> | string
    kpiType?: StringFilter<"CampaignKpi"> | string
    targetValue?: DecimalFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string
    actualValue?: DecimalNullableFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string | null
    unit?: StringFilter<"CampaignKpi"> | string
    description?: StringNullableFilter<"CampaignKpi"> | string | null
    priority?: IntFilter<"CampaignKpi"> | number
    createdAt?: DateTimeFilter<"CampaignKpi"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignKpi"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }

  export type CampaignKpiOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    kpiType?: SortOrder
    targetValue?: SortOrder
    actualValue?: SortOrderInput | SortOrder
    unit?: SortOrder
    description?: SortOrderInput | SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaign?: CampaignOrderByWithRelationInput
  }

  export type CampaignKpiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignKpiWhereInput | CampaignKpiWhereInput[]
    OR?: CampaignKpiWhereInput[]
    NOT?: CampaignKpiWhereInput | CampaignKpiWhereInput[]
    campaignId?: StringFilter<"CampaignKpi"> | string
    kpiType?: StringFilter<"CampaignKpi"> | string
    targetValue?: DecimalFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string
    actualValue?: DecimalNullableFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string | null
    unit?: StringFilter<"CampaignKpi"> | string
    description?: StringNullableFilter<"CampaignKpi"> | string | null
    priority?: IntFilter<"CampaignKpi"> | number
    createdAt?: DateTimeFilter<"CampaignKpi"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignKpi"> | Date | string
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>
  }, "id">

  export type CampaignKpiOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    kpiType?: SortOrder
    targetValue?: SortOrder
    actualValue?: SortOrderInput | SortOrder
    unit?: SortOrder
    description?: SortOrderInput | SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignKpiCountOrderByAggregateInput
    _avg?: CampaignKpiAvgOrderByAggregateInput
    _max?: CampaignKpiMaxOrderByAggregateInput
    _min?: CampaignKpiMinOrderByAggregateInput
    _sum?: CampaignKpiSumOrderByAggregateInput
  }

  export type CampaignKpiScalarWhereWithAggregatesInput = {
    AND?: CampaignKpiScalarWhereWithAggregatesInput | CampaignKpiScalarWhereWithAggregatesInput[]
    OR?: CampaignKpiScalarWhereWithAggregatesInput[]
    NOT?: CampaignKpiScalarWhereWithAggregatesInput | CampaignKpiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CampaignKpi"> | string
    campaignId?: StringWithAggregatesFilter<"CampaignKpi"> | string
    kpiType?: StringWithAggregatesFilter<"CampaignKpi"> | string
    targetValue?: DecimalWithAggregatesFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string
    actualValue?: DecimalNullableWithAggregatesFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string | null
    unit?: StringWithAggregatesFilter<"CampaignKpi"> | string
    description?: StringNullableWithAggregatesFilter<"CampaignKpi"> | string | null
    priority?: IntWithAggregatesFilter<"CampaignKpi"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CampaignKpi"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CampaignKpi"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    managedClients?: ClientCreateNestedManyWithoutManagerInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    managedClients?: ClientUncheckedCreateNestedManyWithoutManagerInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    managedClients?: ClientUpdateManyWithoutManagerNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    managedClients?: ClientUncheckedUpdateManyWithoutManagerNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
    campaigns?: CampaignCreateNestedManyWithoutClientInput
    manager?: UserCreateNestedOneWithoutManagedClientsInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    managerId?: string | null
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    campaigns?: CampaignUpdateManyWithoutClientNestedInput
    manager?: UserUpdateOneWithoutManagedClientsNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    campaigns?: CampaignUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    managerId?: string | null
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamCreateNestedManyWithoutCampaignInput
    client: ClientCreateNestedOneWithoutCampaignsInput
    results?: ResultCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    clientId: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiUncheckedCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutCampaignInput
    results?: ResultUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUpdateManyWithoutCampaignNestedInput
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput
    results?: ResultUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUncheckedUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUncheckedUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutCampaignNestedInput
    results?: ResultUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateManyInput = {
    id?: string
    clientId: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BudgetCreateInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
    budgetTeams?: BudgetTeamCreateNestedManyWithoutBudgetInput
    campaign: CampaignCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateInput = {
    id?: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
    budgetTeams?: BudgetTeamUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
    budgetTeams?: BudgetTeamUpdateManyWithoutBudgetNestedInput
    campaign?: CampaignUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
    budgetTeams?: BudgetTeamUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetCreateManyInput = {
    id?: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type BudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type ResultCreateInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal | DecimalJsLike | number | string
    actualResult: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
    campaign: CampaignCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateInput = {
    id?: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal | DecimalJsLike | number | string
    actualResult: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type ResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
    campaign?: CampaignUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type ResultCreateManyInput = {
    id?: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal | DecimalJsLike | number | string
    actualResult: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type ResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type ResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type MasterCreateInput = {
    id?: string
    category: string
    value: string
    order?: number
  }

  export type MasterUncheckedCreateInput = {
    id?: string
    category: string
    value: string
    order?: number
  }

  export type MasterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MasterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MasterCreateManyInput = {
    id?: string
    category: string
    value: string
    order?: number
  }

  export type MasterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MasterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetTeams?: BudgetTeamCreateNestedManyWithoutTeamInput
    campaignTeams?: CampaignTeamCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetTeams?: BudgetTeamUncheckedCreateNestedManyWithoutTeamInput
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetTeams?: BudgetTeamUpdateManyWithoutTeamNestedInput
    campaignTeams?: CampaignTeamUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetTeams?: BudgetTeamUncheckedUpdateManyWithoutTeamNestedInput
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetTeamCreateInput = {
    id?: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    budget: BudgetCreateNestedOneWithoutBudgetTeamsInput
    team: TeamCreateNestedOneWithoutBudgetTeamsInput
  }

  export type BudgetTeamUncheckedCreateInput = {
    id?: string
    budgetId: string
    teamId: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type BudgetTeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: BudgetUpdateOneRequiredWithoutBudgetTeamsNestedInput
    team?: TeamUpdateOneRequiredWithoutBudgetTeamsNestedInput
  }

  export type BudgetTeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetTeamCreateManyInput = {
    id?: string
    budgetId: string
    teamId: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type BudgetTeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetTeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamCreateInput = {
    id?: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutCampaignTeamsInput
    team: TeamCreateNestedOneWithoutCampaignTeamsInput
  }

  export type CampaignTeamUncheckedCreateInput = {
    id?: string
    campaignId: string
    teamId: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
  }

  export type CampaignTeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutCampaignTeamsNestedInput
    team?: TeamUpdateOneRequiredWithoutCampaignTeamsNestedInput
  }

  export type CampaignTeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamCreateManyInput = {
    id?: string
    campaignId: string
    teamId: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
  }

  export type CampaignTeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignKpiCreateInput = {
    id?: string
    kpiType: string
    targetValue: Decimal | DecimalJsLike | number | string
    actualValue?: Decimal | DecimalJsLike | number | string | null
    unit: string
    description?: string | null
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutCampaignKpisInput
  }

  export type CampaignKpiUncheckedCreateInput = {
    id?: string
    campaignId: string
    kpiType: string
    targetValue: Decimal | DecimalJsLike | number | string
    actualValue?: Decimal | DecimalJsLike | number | string | null
    unit: string
    description?: string | null
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignKpiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutCampaignKpisNestedInput
  }

  export type CampaignKpiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignKpiCreateManyInput = {
    id?: string
    campaignId: string
    kpiType: string
    targetValue: Decimal | DecimalJsLike | number | string
    actualValue?: Decimal | DecimalJsLike | number | string | null
    unit: string
    description?: string | null
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignKpiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignKpiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput
    some?: CampaignWhereInput
    none?: CampaignWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    managerId?: SortOrder
    agency?: SortOrder
    salesChannel?: SortOrder
    salesDepartment?: SortOrder
    businessDivision?: SortOrder
    priority?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    managerId?: SortOrder
    agency?: SortOrder
    salesChannel?: SortOrder
    salesDepartment?: SortOrder
    businessDivision?: SortOrder
    priority?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    managerId?: SortOrder
    agency?: SortOrder
    salesChannel?: SortOrder
    salesDepartment?: SortOrder
    businessDivision?: SortOrder
    priority?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type CampaignKpiListRelationFilter = {
    every?: CampaignKpiWhereInput
    some?: CampaignKpiWhereInput
    none?: CampaignKpiWhereInput
  }

  export type CampaignTeamListRelationFilter = {
    every?: CampaignTeamWhereInput
    some?: CampaignTeamWhereInput
    none?: CampaignTeamWhereInput
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ResultListRelationFilter = {
    every?: ResultWhereInput
    some?: ResultWhereInput
    none?: ResultWhereInput
  }

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignKpiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignTeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    totalBudget?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrder
    endMonth?: SortOrder
  }

  export type CampaignAvgOrderByAggregateInput = {
    totalBudget?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrder
    endMonth?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    totalBudget?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrder
    endMonth?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    totalBudget?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrder
    endMonth?: SortOrder
  }

  export type CampaignSumOrderByAggregateInput = {
    totalBudget?: SortOrder
    startYear?: SortOrder
    startMonth?: SortOrder
    endYear?: SortOrder
    endMonth?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BudgetTeamListRelationFilter = {
    every?: BudgetTeamWhereInput
    some?: BudgetTeamWhereInput
    none?: BudgetTeamWhereInput
  }

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput
    isNot?: CampaignWhereInput
  }

  export type BudgetTeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    amount?: SortOrder
    targetKpi?: SortOrder
    targetValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
  }

  export type BudgetAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    amount?: SortOrder
    targetValue?: SortOrder
  }

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    amount?: SortOrder
    targetKpi?: SortOrder
    targetValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
  }

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    amount?: SortOrder
    targetKpi?: SortOrder
    targetValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
  }

  export type BudgetSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    amount?: SortOrder
    targetValue?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type ResultCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
  }

  export type ResultAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
  }

  export type ResultMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
  }

  export type ResultMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    platform?: SortOrder
    operationType?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    budgetType?: SortOrder
  }

  export type ResultSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    actualSpend?: SortOrder
    actualResult?: SortOrder
  }

  export type MasterCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
    order?: SortOrder
  }

  export type MasterAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MasterMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
    order?: SortOrder
  }

  export type MasterMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
    order?: SortOrder
  }

  export type MasterSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetScalarRelationFilter = {
    is?: BudgetWhereInput
    isNot?: BudgetWhereInput
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type BudgetTeamBudgetIdTeamIdCompoundUniqueInput = {
    budgetId: string
    teamId: string
  }

  export type BudgetTeamCountOrderByAggregateInput = {
    id?: SortOrder
    budgetId?: SortOrder
    teamId?: SortOrder
    allocation?: SortOrder
    createdAt?: SortOrder
  }

  export type BudgetTeamAvgOrderByAggregateInput = {
    allocation?: SortOrder
  }

  export type BudgetTeamMaxOrderByAggregateInput = {
    id?: SortOrder
    budgetId?: SortOrder
    teamId?: SortOrder
    allocation?: SortOrder
    createdAt?: SortOrder
  }

  export type BudgetTeamMinOrderByAggregateInput = {
    id?: SortOrder
    budgetId?: SortOrder
    teamId?: SortOrder
    allocation?: SortOrder
    createdAt?: SortOrder
  }

  export type BudgetTeamSumOrderByAggregateInput = {
    allocation?: SortOrder
  }

  export type CampaignTeamCampaignIdTeamIdCompoundUniqueInput = {
    campaignId: string
    teamId: string
  }

  export type CampaignTeamCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    isLead?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignTeamMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    isLead?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignTeamMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    isLead?: SortOrder
    createdAt?: SortOrder
  }

  export type CampaignKpiCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    kpiType?: SortOrder
    targetValue?: SortOrder
    actualValue?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignKpiAvgOrderByAggregateInput = {
    targetValue?: SortOrder
    actualValue?: SortOrder
    priority?: SortOrder
  }

  export type CampaignKpiMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    kpiType?: SortOrder
    targetValue?: SortOrder
    actualValue?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignKpiMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    kpiType?: SortOrder
    targetValue?: SortOrder
    actualValue?: SortOrder
    unit?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignKpiSumOrderByAggregateInput = {
    targetValue?: SortOrder
    actualValue?: SortOrder
    priority?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ClientCreateNestedManyWithoutManagerInput = {
    create?: XOR<ClientCreateWithoutManagerInput, ClientUncheckedCreateWithoutManagerInput> | ClientCreateWithoutManagerInput[] | ClientUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutManagerInput | ClientCreateOrConnectWithoutManagerInput[]
    createMany?: ClientCreateManyManagerInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<ClientCreateWithoutManagerInput, ClientUncheckedCreateWithoutManagerInput> | ClientCreateWithoutManagerInput[] | ClientUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutManagerInput | ClientCreateOrConnectWithoutManagerInput[]
    createMany?: ClientCreateManyManagerInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ClientUpdateManyWithoutManagerNestedInput = {
    create?: XOR<ClientCreateWithoutManagerInput, ClientUncheckedCreateWithoutManagerInput> | ClientCreateWithoutManagerInput[] | ClientUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutManagerInput | ClientCreateOrConnectWithoutManagerInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutManagerInput | ClientUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: ClientCreateManyManagerInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutManagerInput | ClientUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutManagerInput | ClientUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<ClientCreateWithoutManagerInput, ClientUncheckedCreateWithoutManagerInput> | ClientCreateWithoutManagerInput[] | ClientUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutManagerInput | ClientCreateOrConnectWithoutManagerInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutManagerInput | ClientUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: ClientCreateManyManagerInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutManagerInput | ClientUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutManagerInput | ClientUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type CampaignCreateNestedManyWithoutClientInput = {
    create?: XOR<CampaignCreateWithoutClientInput, CampaignUncheckedCreateWithoutClientInput> | CampaignCreateWithoutClientInput[] | CampaignUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClientInput | CampaignCreateOrConnectWithoutClientInput[]
    createMany?: CampaignCreateManyClientInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutManagedClientsInput = {
    create?: XOR<UserCreateWithoutManagedClientsInput, UserUncheckedCreateWithoutManagedClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutManagedClientsInput
    connect?: UserWhereUniqueInput
  }

  export type CampaignUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<CampaignCreateWithoutClientInput, CampaignUncheckedCreateWithoutClientInput> | CampaignCreateWithoutClientInput[] | CampaignUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClientInput | CampaignCreateOrConnectWithoutClientInput[]
    createMany?: CampaignCreateManyClientInputEnvelope
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
  }

  export type CampaignUpdateManyWithoutClientNestedInput = {
    create?: XOR<CampaignCreateWithoutClientInput, CampaignUncheckedCreateWithoutClientInput> | CampaignCreateWithoutClientInput[] | CampaignUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClientInput | CampaignCreateOrConnectWithoutClientInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutClientInput | CampaignUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: CampaignCreateManyClientInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutClientInput | CampaignUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutClientInput | CampaignUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type UserUpdateOneWithoutManagedClientsNestedInput = {
    create?: XOR<UserCreateWithoutManagedClientsInput, UserUncheckedCreateWithoutManagedClientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutManagedClientsInput
    upsert?: UserUpsertWithoutManagedClientsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutManagedClientsInput, UserUpdateWithoutManagedClientsInput>, UserUncheckedUpdateWithoutManagedClientsInput>
  }

  export type CampaignUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<CampaignCreateWithoutClientInput, CampaignUncheckedCreateWithoutClientInput> | CampaignCreateWithoutClientInput[] | CampaignUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CampaignCreateOrConnectWithoutClientInput | CampaignCreateOrConnectWithoutClientInput[]
    upsert?: CampaignUpsertWithWhereUniqueWithoutClientInput | CampaignUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: CampaignCreateManyClientInputEnvelope
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[]
    update?: CampaignUpdateWithWhereUniqueWithoutClientInput | CampaignUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: CampaignUpdateManyWithWhereWithoutClientInput | CampaignUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
  }

  export type BudgetCreateNestedManyWithoutCampaignInput = {
    create?: XOR<BudgetCreateWithoutCampaignInput, BudgetUncheckedCreateWithoutCampaignInput> | BudgetCreateWithoutCampaignInput[] | BudgetUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutCampaignInput | BudgetCreateOrConnectWithoutCampaignInput[]
    createMany?: BudgetCreateManyCampaignInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type CampaignKpiCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignKpiCreateWithoutCampaignInput, CampaignKpiUncheckedCreateWithoutCampaignInput> | CampaignKpiCreateWithoutCampaignInput[] | CampaignKpiUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignKpiCreateOrConnectWithoutCampaignInput | CampaignKpiCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignKpiCreateManyCampaignInputEnvelope
    connect?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
  }

  export type CampaignTeamCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignTeamCreateWithoutCampaignInput, CampaignTeamUncheckedCreateWithoutCampaignInput> | CampaignTeamCreateWithoutCampaignInput[] | CampaignTeamUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutCampaignInput | CampaignTeamCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignTeamCreateManyCampaignInputEnvelope
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
  }

  export type ClientCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<ClientCreateWithoutCampaignsInput, ClientUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutCampaignsInput
    connect?: ClientWhereUniqueInput
  }

  export type ResultCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ResultCreateWithoutCampaignInput, ResultUncheckedCreateWithoutCampaignInput> | ResultCreateWithoutCampaignInput[] | ResultUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutCampaignInput | ResultCreateOrConnectWithoutCampaignInput[]
    createMany?: ResultCreateManyCampaignInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type BudgetUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<BudgetCreateWithoutCampaignInput, BudgetUncheckedCreateWithoutCampaignInput> | BudgetCreateWithoutCampaignInput[] | BudgetUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutCampaignInput | BudgetCreateOrConnectWithoutCampaignInput[]
    createMany?: BudgetCreateManyCampaignInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type CampaignKpiUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignKpiCreateWithoutCampaignInput, CampaignKpiUncheckedCreateWithoutCampaignInput> | CampaignKpiCreateWithoutCampaignInput[] | CampaignKpiUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignKpiCreateOrConnectWithoutCampaignInput | CampaignKpiCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignKpiCreateManyCampaignInputEnvelope
    connect?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
  }

  export type CampaignTeamUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<CampaignTeamCreateWithoutCampaignInput, CampaignTeamUncheckedCreateWithoutCampaignInput> | CampaignTeamCreateWithoutCampaignInput[] | CampaignTeamUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutCampaignInput | CampaignTeamCreateOrConnectWithoutCampaignInput[]
    createMany?: CampaignTeamCreateManyCampaignInputEnvelope
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
  }

  export type ResultUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<ResultCreateWithoutCampaignInput, ResultUncheckedCreateWithoutCampaignInput> | ResultCreateWithoutCampaignInput[] | ResultUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutCampaignInput | ResultCreateOrConnectWithoutCampaignInput[]
    createMany?: ResultCreateManyCampaignInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BudgetUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<BudgetCreateWithoutCampaignInput, BudgetUncheckedCreateWithoutCampaignInput> | BudgetCreateWithoutCampaignInput[] | BudgetUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutCampaignInput | BudgetCreateOrConnectWithoutCampaignInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutCampaignInput | BudgetUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: BudgetCreateManyCampaignInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutCampaignInput | BudgetUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutCampaignInput | BudgetUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type CampaignKpiUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignKpiCreateWithoutCampaignInput, CampaignKpiUncheckedCreateWithoutCampaignInput> | CampaignKpiCreateWithoutCampaignInput[] | CampaignKpiUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignKpiCreateOrConnectWithoutCampaignInput | CampaignKpiCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignKpiUpsertWithWhereUniqueWithoutCampaignInput | CampaignKpiUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignKpiCreateManyCampaignInputEnvelope
    set?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    disconnect?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    delete?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    connect?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    update?: CampaignKpiUpdateWithWhereUniqueWithoutCampaignInput | CampaignKpiUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignKpiUpdateManyWithWhereWithoutCampaignInput | CampaignKpiUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignKpiScalarWhereInput | CampaignKpiScalarWhereInput[]
  }

  export type CampaignTeamUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignTeamCreateWithoutCampaignInput, CampaignTeamUncheckedCreateWithoutCampaignInput> | CampaignTeamCreateWithoutCampaignInput[] | CampaignTeamUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutCampaignInput | CampaignTeamCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignTeamUpsertWithWhereUniqueWithoutCampaignInput | CampaignTeamUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignTeamCreateManyCampaignInputEnvelope
    set?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    disconnect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    delete?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    update?: CampaignTeamUpdateWithWhereUniqueWithoutCampaignInput | CampaignTeamUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignTeamUpdateManyWithWhereWithoutCampaignInput | CampaignTeamUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignTeamScalarWhereInput | CampaignTeamScalarWhereInput[]
  }

  export type ClientUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<ClientCreateWithoutCampaignsInput, ClientUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutCampaignsInput
    upsert?: ClientUpsertWithoutCampaignsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutCampaignsInput, ClientUpdateWithoutCampaignsInput>, ClientUncheckedUpdateWithoutCampaignsInput>
  }

  export type ResultUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<ResultCreateWithoutCampaignInput, ResultUncheckedCreateWithoutCampaignInput> | ResultCreateWithoutCampaignInput[] | ResultUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutCampaignInput | ResultCreateOrConnectWithoutCampaignInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutCampaignInput | ResultUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: ResultCreateManyCampaignInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutCampaignInput | ResultUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutCampaignInput | ResultUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type BudgetUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<BudgetCreateWithoutCampaignInput, BudgetUncheckedCreateWithoutCampaignInput> | BudgetCreateWithoutCampaignInput[] | BudgetUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutCampaignInput | BudgetCreateOrConnectWithoutCampaignInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutCampaignInput | BudgetUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: BudgetCreateManyCampaignInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutCampaignInput | BudgetUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutCampaignInput | BudgetUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type CampaignKpiUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignKpiCreateWithoutCampaignInput, CampaignKpiUncheckedCreateWithoutCampaignInput> | CampaignKpiCreateWithoutCampaignInput[] | CampaignKpiUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignKpiCreateOrConnectWithoutCampaignInput | CampaignKpiCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignKpiUpsertWithWhereUniqueWithoutCampaignInput | CampaignKpiUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignKpiCreateManyCampaignInputEnvelope
    set?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    disconnect?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    delete?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    connect?: CampaignKpiWhereUniqueInput | CampaignKpiWhereUniqueInput[]
    update?: CampaignKpiUpdateWithWhereUniqueWithoutCampaignInput | CampaignKpiUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignKpiUpdateManyWithWhereWithoutCampaignInput | CampaignKpiUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignKpiScalarWhereInput | CampaignKpiScalarWhereInput[]
  }

  export type CampaignTeamUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<CampaignTeamCreateWithoutCampaignInput, CampaignTeamUncheckedCreateWithoutCampaignInput> | CampaignTeamCreateWithoutCampaignInput[] | CampaignTeamUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutCampaignInput | CampaignTeamCreateOrConnectWithoutCampaignInput[]
    upsert?: CampaignTeamUpsertWithWhereUniqueWithoutCampaignInput | CampaignTeamUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: CampaignTeamCreateManyCampaignInputEnvelope
    set?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    disconnect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    delete?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    update?: CampaignTeamUpdateWithWhereUniqueWithoutCampaignInput | CampaignTeamUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: CampaignTeamUpdateManyWithWhereWithoutCampaignInput | CampaignTeamUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: CampaignTeamScalarWhereInput | CampaignTeamScalarWhereInput[]
  }

  export type ResultUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<ResultCreateWithoutCampaignInput, ResultUncheckedCreateWithoutCampaignInput> | ResultCreateWithoutCampaignInput[] | ResultUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutCampaignInput | ResultCreateOrConnectWithoutCampaignInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutCampaignInput | ResultUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: ResultCreateManyCampaignInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutCampaignInput | ResultUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutCampaignInput | ResultUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type BudgetTeamCreateNestedManyWithoutBudgetInput = {
    create?: XOR<BudgetTeamCreateWithoutBudgetInput, BudgetTeamUncheckedCreateWithoutBudgetInput> | BudgetTeamCreateWithoutBudgetInput[] | BudgetTeamUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutBudgetInput | BudgetTeamCreateOrConnectWithoutBudgetInput[]
    createMany?: BudgetTeamCreateManyBudgetInputEnvelope
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
  }

  export type CampaignCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<CampaignCreateWithoutBudgetsInput, CampaignUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutBudgetsInput
    connect?: CampaignWhereUniqueInput
  }

  export type BudgetTeamUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<BudgetTeamCreateWithoutBudgetInput, BudgetTeamUncheckedCreateWithoutBudgetInput> | BudgetTeamCreateWithoutBudgetInput[] | BudgetTeamUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutBudgetInput | BudgetTeamCreateOrConnectWithoutBudgetInput[]
    createMany?: BudgetTeamCreateManyBudgetInputEnvelope
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BudgetTeamUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<BudgetTeamCreateWithoutBudgetInput, BudgetTeamUncheckedCreateWithoutBudgetInput> | BudgetTeamCreateWithoutBudgetInput[] | BudgetTeamUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutBudgetInput | BudgetTeamCreateOrConnectWithoutBudgetInput[]
    upsert?: BudgetTeamUpsertWithWhereUniqueWithoutBudgetInput | BudgetTeamUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: BudgetTeamCreateManyBudgetInputEnvelope
    set?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    disconnect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    delete?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    update?: BudgetTeamUpdateWithWhereUniqueWithoutBudgetInput | BudgetTeamUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: BudgetTeamUpdateManyWithWhereWithoutBudgetInput | BudgetTeamUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: BudgetTeamScalarWhereInput | BudgetTeamScalarWhereInput[]
  }

  export type CampaignUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<CampaignCreateWithoutBudgetsInput, CampaignUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutBudgetsInput
    upsert?: CampaignUpsertWithoutBudgetsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutBudgetsInput, CampaignUpdateWithoutBudgetsInput>, CampaignUncheckedUpdateWithoutBudgetsInput>
  }

  export type BudgetTeamUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<BudgetTeamCreateWithoutBudgetInput, BudgetTeamUncheckedCreateWithoutBudgetInput> | BudgetTeamCreateWithoutBudgetInput[] | BudgetTeamUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutBudgetInput | BudgetTeamCreateOrConnectWithoutBudgetInput[]
    upsert?: BudgetTeamUpsertWithWhereUniqueWithoutBudgetInput | BudgetTeamUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: BudgetTeamCreateManyBudgetInputEnvelope
    set?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    disconnect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    delete?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    update?: BudgetTeamUpdateWithWhereUniqueWithoutBudgetInput | BudgetTeamUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: BudgetTeamUpdateManyWithWhereWithoutBudgetInput | BudgetTeamUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: BudgetTeamScalarWhereInput | BudgetTeamScalarWhereInput[]
  }

  export type CampaignCreateNestedOneWithoutResultsInput = {
    create?: XOR<CampaignCreateWithoutResultsInput, CampaignUncheckedCreateWithoutResultsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutResultsInput
    connect?: CampaignWhereUniqueInput
  }

  export type CampaignUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<CampaignCreateWithoutResultsInput, CampaignUncheckedCreateWithoutResultsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutResultsInput
    upsert?: CampaignUpsertWithoutResultsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutResultsInput, CampaignUpdateWithoutResultsInput>, CampaignUncheckedUpdateWithoutResultsInput>
  }

  export type BudgetTeamCreateNestedManyWithoutTeamInput = {
    create?: XOR<BudgetTeamCreateWithoutTeamInput, BudgetTeamUncheckedCreateWithoutTeamInput> | BudgetTeamCreateWithoutTeamInput[] | BudgetTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutTeamInput | BudgetTeamCreateOrConnectWithoutTeamInput[]
    createMany?: BudgetTeamCreateManyTeamInputEnvelope
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
  }

  export type CampaignTeamCreateNestedManyWithoutTeamInput = {
    create?: XOR<CampaignTeamCreateWithoutTeamInput, CampaignTeamUncheckedCreateWithoutTeamInput> | CampaignTeamCreateWithoutTeamInput[] | CampaignTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutTeamInput | CampaignTeamCreateOrConnectWithoutTeamInput[]
    createMany?: CampaignTeamCreateManyTeamInputEnvelope
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
  }

  export type BudgetTeamUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<BudgetTeamCreateWithoutTeamInput, BudgetTeamUncheckedCreateWithoutTeamInput> | BudgetTeamCreateWithoutTeamInput[] | BudgetTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutTeamInput | BudgetTeamCreateOrConnectWithoutTeamInput[]
    createMany?: BudgetTeamCreateManyTeamInputEnvelope
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
  }

  export type CampaignTeamUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<CampaignTeamCreateWithoutTeamInput, CampaignTeamUncheckedCreateWithoutTeamInput> | CampaignTeamCreateWithoutTeamInput[] | CampaignTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutTeamInput | CampaignTeamCreateOrConnectWithoutTeamInput[]
    createMany?: CampaignTeamCreateManyTeamInputEnvelope
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
  }

  export type BudgetTeamUpdateManyWithoutTeamNestedInput = {
    create?: XOR<BudgetTeamCreateWithoutTeamInput, BudgetTeamUncheckedCreateWithoutTeamInput> | BudgetTeamCreateWithoutTeamInput[] | BudgetTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutTeamInput | BudgetTeamCreateOrConnectWithoutTeamInput[]
    upsert?: BudgetTeamUpsertWithWhereUniqueWithoutTeamInput | BudgetTeamUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: BudgetTeamCreateManyTeamInputEnvelope
    set?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    disconnect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    delete?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    update?: BudgetTeamUpdateWithWhereUniqueWithoutTeamInput | BudgetTeamUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: BudgetTeamUpdateManyWithWhereWithoutTeamInput | BudgetTeamUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: BudgetTeamScalarWhereInput | BudgetTeamScalarWhereInput[]
  }

  export type CampaignTeamUpdateManyWithoutTeamNestedInput = {
    create?: XOR<CampaignTeamCreateWithoutTeamInput, CampaignTeamUncheckedCreateWithoutTeamInput> | CampaignTeamCreateWithoutTeamInput[] | CampaignTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutTeamInput | CampaignTeamCreateOrConnectWithoutTeamInput[]
    upsert?: CampaignTeamUpsertWithWhereUniqueWithoutTeamInput | CampaignTeamUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: CampaignTeamCreateManyTeamInputEnvelope
    set?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    disconnect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    delete?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    update?: CampaignTeamUpdateWithWhereUniqueWithoutTeamInput | CampaignTeamUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: CampaignTeamUpdateManyWithWhereWithoutTeamInput | CampaignTeamUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: CampaignTeamScalarWhereInput | CampaignTeamScalarWhereInput[]
  }

  export type BudgetTeamUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<BudgetTeamCreateWithoutTeamInput, BudgetTeamUncheckedCreateWithoutTeamInput> | BudgetTeamCreateWithoutTeamInput[] | BudgetTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetTeamCreateOrConnectWithoutTeamInput | BudgetTeamCreateOrConnectWithoutTeamInput[]
    upsert?: BudgetTeamUpsertWithWhereUniqueWithoutTeamInput | BudgetTeamUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: BudgetTeamCreateManyTeamInputEnvelope
    set?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    disconnect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    delete?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    connect?: BudgetTeamWhereUniqueInput | BudgetTeamWhereUniqueInput[]
    update?: BudgetTeamUpdateWithWhereUniqueWithoutTeamInput | BudgetTeamUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: BudgetTeamUpdateManyWithWhereWithoutTeamInput | BudgetTeamUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: BudgetTeamScalarWhereInput | BudgetTeamScalarWhereInput[]
  }

  export type CampaignTeamUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<CampaignTeamCreateWithoutTeamInput, CampaignTeamUncheckedCreateWithoutTeamInput> | CampaignTeamCreateWithoutTeamInput[] | CampaignTeamUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: CampaignTeamCreateOrConnectWithoutTeamInput | CampaignTeamCreateOrConnectWithoutTeamInput[]
    upsert?: CampaignTeamUpsertWithWhereUniqueWithoutTeamInput | CampaignTeamUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: CampaignTeamCreateManyTeamInputEnvelope
    set?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    disconnect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    delete?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    connect?: CampaignTeamWhereUniqueInput | CampaignTeamWhereUniqueInput[]
    update?: CampaignTeamUpdateWithWhereUniqueWithoutTeamInput | CampaignTeamUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: CampaignTeamUpdateManyWithWhereWithoutTeamInput | CampaignTeamUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: CampaignTeamScalarWhereInput | CampaignTeamScalarWhereInput[]
  }

  export type BudgetCreateNestedOneWithoutBudgetTeamsInput = {
    create?: XOR<BudgetCreateWithoutBudgetTeamsInput, BudgetUncheckedCreateWithoutBudgetTeamsInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutBudgetTeamsInput
    connect?: BudgetWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutBudgetTeamsInput = {
    create?: XOR<TeamCreateWithoutBudgetTeamsInput, TeamUncheckedCreateWithoutBudgetTeamsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutBudgetTeamsInput
    connect?: TeamWhereUniqueInput
  }

  export type BudgetUpdateOneRequiredWithoutBudgetTeamsNestedInput = {
    create?: XOR<BudgetCreateWithoutBudgetTeamsInput, BudgetUncheckedCreateWithoutBudgetTeamsInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutBudgetTeamsInput
    upsert?: BudgetUpsertWithoutBudgetTeamsInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<XOR<BudgetUpdateToOneWithWhereWithoutBudgetTeamsInput, BudgetUpdateWithoutBudgetTeamsInput>, BudgetUncheckedUpdateWithoutBudgetTeamsInput>
  }

  export type TeamUpdateOneRequiredWithoutBudgetTeamsNestedInput = {
    create?: XOR<TeamCreateWithoutBudgetTeamsInput, TeamUncheckedCreateWithoutBudgetTeamsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutBudgetTeamsInput
    upsert?: TeamUpsertWithoutBudgetTeamsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutBudgetTeamsInput, TeamUpdateWithoutBudgetTeamsInput>, TeamUncheckedUpdateWithoutBudgetTeamsInput>
  }

  export type CampaignCreateNestedOneWithoutCampaignTeamsInput = {
    create?: XOR<CampaignCreateWithoutCampaignTeamsInput, CampaignUncheckedCreateWithoutCampaignTeamsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCampaignTeamsInput
    connect?: CampaignWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutCampaignTeamsInput = {
    create?: XOR<TeamCreateWithoutCampaignTeamsInput, TeamUncheckedCreateWithoutCampaignTeamsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutCampaignTeamsInput
    connect?: TeamWhereUniqueInput
  }

  export type CampaignUpdateOneRequiredWithoutCampaignTeamsNestedInput = {
    create?: XOR<CampaignCreateWithoutCampaignTeamsInput, CampaignUncheckedCreateWithoutCampaignTeamsInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCampaignTeamsInput
    upsert?: CampaignUpsertWithoutCampaignTeamsInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutCampaignTeamsInput, CampaignUpdateWithoutCampaignTeamsInput>, CampaignUncheckedUpdateWithoutCampaignTeamsInput>
  }

  export type TeamUpdateOneRequiredWithoutCampaignTeamsNestedInput = {
    create?: XOR<TeamCreateWithoutCampaignTeamsInput, TeamUncheckedCreateWithoutCampaignTeamsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutCampaignTeamsInput
    upsert?: TeamUpsertWithoutCampaignTeamsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutCampaignTeamsInput, TeamUpdateWithoutCampaignTeamsInput>, TeamUncheckedUpdateWithoutCampaignTeamsInput>
  }

  export type CampaignCreateNestedOneWithoutCampaignKpisInput = {
    create?: XOR<CampaignCreateWithoutCampaignKpisInput, CampaignUncheckedCreateWithoutCampaignKpisInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCampaignKpisInput
    connect?: CampaignWhereUniqueInput
  }

  export type CampaignUpdateOneRequiredWithoutCampaignKpisNestedInput = {
    create?: XOR<CampaignCreateWithoutCampaignKpisInput, CampaignUncheckedCreateWithoutCampaignKpisInput>
    connectOrCreate?: CampaignCreateOrConnectWithoutCampaignKpisInput
    upsert?: CampaignUpsertWithoutCampaignKpisInput
    connect?: CampaignWhereUniqueInput
    update?: XOR<XOR<CampaignUpdateToOneWithWhereWithoutCampaignKpisInput, CampaignUpdateWithoutCampaignKpisInput>, CampaignUncheckedUpdateWithoutCampaignKpisInput>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutManagerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
    campaigns?: CampaignCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutManagerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutManagerInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutManagerInput, ClientUncheckedCreateWithoutManagerInput>
  }

  export type ClientCreateManyManagerInputEnvelope = {
    data: ClientCreateManyManagerInput | ClientCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type ClientUpsertWithWhereUniqueWithoutManagerInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutManagerInput, ClientUncheckedUpdateWithoutManagerInput>
    create: XOR<ClientCreateWithoutManagerInput, ClientUncheckedCreateWithoutManagerInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutManagerInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutManagerInput, ClientUncheckedUpdateWithoutManagerInput>
  }

  export type ClientUpdateManyWithWhereWithoutManagerInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutManagerInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    managerId?: StringNullableFilter<"Client"> | string | null
    agency?: StringNullableFilter<"Client"> | string | null
    salesChannel?: StringNullableFilter<"Client"> | string | null
    salesDepartment?: StringFilter<"Client"> | string
    businessDivision?: StringFilter<"Client"> | string
    priority?: StringNullableFilter<"Client"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    managedClients?: ClientCreateNestedManyWithoutManagerInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    managedClients?: ClientUncheckedCreateNestedManyWithoutManagerInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managedClients?: ClientUpdateManyWithoutManagerNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managedClients?: ClientUncheckedUpdateManyWithoutManagerNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    managedClients?: ClientCreateNestedManyWithoutManagerInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    managedClients?: ClientUncheckedCreateNestedManyWithoutManagerInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    managedClients?: ClientUpdateManyWithoutManagerNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    managedClients?: ClientUncheckedUpdateManyWithoutManagerNestedInput
  }

  export type CampaignCreateWithoutClientInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamCreateNestedManyWithoutCampaignInput
    results?: ResultCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutClientInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiUncheckedCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutCampaignInput
    results?: ResultUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutClientInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutClientInput, CampaignUncheckedCreateWithoutClientInput>
  }

  export type CampaignCreateManyClientInputEnvelope = {
    data: CampaignCreateManyClientInput | CampaignCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutManagedClientsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutManagedClientsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    role?: string
    department?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutManagedClientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManagedClientsInput, UserUncheckedCreateWithoutManagedClientsInput>
  }

  export type CampaignUpsertWithWhereUniqueWithoutClientInput = {
    where: CampaignWhereUniqueInput
    update: XOR<CampaignUpdateWithoutClientInput, CampaignUncheckedUpdateWithoutClientInput>
    create: XOR<CampaignCreateWithoutClientInput, CampaignUncheckedCreateWithoutClientInput>
  }

  export type CampaignUpdateWithWhereUniqueWithoutClientInput = {
    where: CampaignWhereUniqueInput
    data: XOR<CampaignUpdateWithoutClientInput, CampaignUncheckedUpdateWithoutClientInput>
  }

  export type CampaignUpdateManyWithWhereWithoutClientInput = {
    where: CampaignScalarWhereInput
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyWithoutClientInput>
  }

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    OR?: CampaignScalarWhereInput[]
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[]
    id?: StringFilter<"Campaign"> | string
    clientId?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    purpose?: StringNullableFilter<"Campaign"> | string | null
    totalBudget?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
    startYear?: IntFilter<"Campaign"> | number
    startMonth?: IntFilter<"Campaign"> | number
    endYear?: IntNullableFilter<"Campaign"> | number | null
    endMonth?: IntNullableFilter<"Campaign"> | number | null
  }

  export type UserUpsertWithoutManagedClientsInput = {
    update: XOR<UserUpdateWithoutManagedClientsInput, UserUncheckedUpdateWithoutManagedClientsInput>
    create: XOR<UserCreateWithoutManagedClientsInput, UserUncheckedCreateWithoutManagedClientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutManagedClientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutManagedClientsInput, UserUncheckedUpdateWithoutManagedClientsInput>
  }

  export type UserUpdateWithoutManagedClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutManagedClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BudgetCreateWithoutCampaignInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
    budgetTeams?: BudgetTeamCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateWithoutCampaignInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
    budgetTeams?: BudgetTeamUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutCampaignInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutCampaignInput, BudgetUncheckedCreateWithoutCampaignInput>
  }

  export type BudgetCreateManyCampaignInputEnvelope = {
    data: BudgetCreateManyCampaignInput | BudgetCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type CampaignKpiCreateWithoutCampaignInput = {
    id?: string
    kpiType: string
    targetValue: Decimal | DecimalJsLike | number | string
    actualValue?: Decimal | DecimalJsLike | number | string | null
    unit: string
    description?: string | null
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignKpiUncheckedCreateWithoutCampaignInput = {
    id?: string
    kpiType: string
    targetValue: Decimal | DecimalJsLike | number | string
    actualValue?: Decimal | DecimalJsLike | number | string | null
    unit: string
    description?: string | null
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignKpiCreateOrConnectWithoutCampaignInput = {
    where: CampaignKpiWhereUniqueInput
    create: XOR<CampaignKpiCreateWithoutCampaignInput, CampaignKpiUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignKpiCreateManyCampaignInputEnvelope = {
    data: CampaignKpiCreateManyCampaignInput | CampaignKpiCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type CampaignTeamCreateWithoutCampaignInput = {
    id?: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
    team: TeamCreateNestedOneWithoutCampaignTeamsInput
  }

  export type CampaignTeamUncheckedCreateWithoutCampaignInput = {
    id?: string
    teamId: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
  }

  export type CampaignTeamCreateOrConnectWithoutCampaignInput = {
    where: CampaignTeamWhereUniqueInput
    create: XOR<CampaignTeamCreateWithoutCampaignInput, CampaignTeamUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignTeamCreateManyCampaignInputEnvelope = {
    data: CampaignTeamCreateManyCampaignInput | CampaignTeamCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutCampaignsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
    manager?: UserCreateNestedOneWithoutManagedClientsInput
  }

  export type ClientUncheckedCreateWithoutCampaignsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    managerId?: string | null
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
  }

  export type ClientCreateOrConnectWithoutCampaignsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutCampaignsInput, ClientUncheckedCreateWithoutCampaignsInput>
  }

  export type ResultCreateWithoutCampaignInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal | DecimalJsLike | number | string
    actualResult: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type ResultUncheckedCreateWithoutCampaignInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal | DecimalJsLike | number | string
    actualResult: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type ResultCreateOrConnectWithoutCampaignInput = {
    where: ResultWhereUniqueInput
    create: XOR<ResultCreateWithoutCampaignInput, ResultUncheckedCreateWithoutCampaignInput>
  }

  export type ResultCreateManyCampaignInputEnvelope = {
    data: ResultCreateManyCampaignInput | ResultCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type BudgetUpsertWithWhereUniqueWithoutCampaignInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutCampaignInput, BudgetUncheckedUpdateWithoutCampaignInput>
    create: XOR<BudgetCreateWithoutCampaignInput, BudgetUncheckedCreateWithoutCampaignInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutCampaignInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutCampaignInput, BudgetUncheckedUpdateWithoutCampaignInput>
  }

  export type BudgetUpdateManyWithWhereWithoutCampaignInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutCampaignInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    OR?: BudgetScalarWhereInput[]
    NOT?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    id?: StringFilter<"Budget"> | string
    campaignId?: StringFilter<"Budget"> | string
    year?: IntFilter<"Budget"> | number
    month?: IntFilter<"Budget"> | number
    platform?: StringFilter<"Budget"> | string
    operationType?: StringFilter<"Budget"> | string
    amount?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    targetKpi?: StringNullableFilter<"Budget"> | string | null
    targetValue?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    budgetType?: StringFilter<"Budget"> | string
  }

  export type CampaignKpiUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignKpiWhereUniqueInput
    update: XOR<CampaignKpiUpdateWithoutCampaignInput, CampaignKpiUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignKpiCreateWithoutCampaignInput, CampaignKpiUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignKpiUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignKpiWhereUniqueInput
    data: XOR<CampaignKpiUpdateWithoutCampaignInput, CampaignKpiUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignKpiUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignKpiScalarWhereInput
    data: XOR<CampaignKpiUpdateManyMutationInput, CampaignKpiUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignKpiScalarWhereInput = {
    AND?: CampaignKpiScalarWhereInput | CampaignKpiScalarWhereInput[]
    OR?: CampaignKpiScalarWhereInput[]
    NOT?: CampaignKpiScalarWhereInput | CampaignKpiScalarWhereInput[]
    id?: StringFilter<"CampaignKpi"> | string
    campaignId?: StringFilter<"CampaignKpi"> | string
    kpiType?: StringFilter<"CampaignKpi"> | string
    targetValue?: DecimalFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string
    actualValue?: DecimalNullableFilter<"CampaignKpi"> | Decimal | DecimalJsLike | number | string | null
    unit?: StringFilter<"CampaignKpi"> | string
    description?: StringNullableFilter<"CampaignKpi"> | string | null
    priority?: IntFilter<"CampaignKpi"> | number
    createdAt?: DateTimeFilter<"CampaignKpi"> | Date | string
    updatedAt?: DateTimeFilter<"CampaignKpi"> | Date | string
  }

  export type CampaignTeamUpsertWithWhereUniqueWithoutCampaignInput = {
    where: CampaignTeamWhereUniqueInput
    update: XOR<CampaignTeamUpdateWithoutCampaignInput, CampaignTeamUncheckedUpdateWithoutCampaignInput>
    create: XOR<CampaignTeamCreateWithoutCampaignInput, CampaignTeamUncheckedCreateWithoutCampaignInput>
  }

  export type CampaignTeamUpdateWithWhereUniqueWithoutCampaignInput = {
    where: CampaignTeamWhereUniqueInput
    data: XOR<CampaignTeamUpdateWithoutCampaignInput, CampaignTeamUncheckedUpdateWithoutCampaignInput>
  }

  export type CampaignTeamUpdateManyWithWhereWithoutCampaignInput = {
    where: CampaignTeamScalarWhereInput
    data: XOR<CampaignTeamUpdateManyMutationInput, CampaignTeamUncheckedUpdateManyWithoutCampaignInput>
  }

  export type CampaignTeamScalarWhereInput = {
    AND?: CampaignTeamScalarWhereInput | CampaignTeamScalarWhereInput[]
    OR?: CampaignTeamScalarWhereInput[]
    NOT?: CampaignTeamScalarWhereInput | CampaignTeamScalarWhereInput[]
    id?: StringFilter<"CampaignTeam"> | string
    campaignId?: StringFilter<"CampaignTeam"> | string
    teamId?: StringFilter<"CampaignTeam"> | string
    role?: StringNullableFilter<"CampaignTeam"> | string | null
    isLead?: BoolFilter<"CampaignTeam"> | boolean
    createdAt?: DateTimeFilter<"CampaignTeam"> | Date | string
  }

  export type ClientUpsertWithoutCampaignsInput = {
    update: XOR<ClientUpdateWithoutCampaignsInput, ClientUncheckedUpdateWithoutCampaignsInput>
    create: XOR<ClientCreateWithoutCampaignsInput, ClientUncheckedCreateWithoutCampaignsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutCampaignsInput, ClientUncheckedUpdateWithoutCampaignsInput>
  }

  export type ClientUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: UserUpdateOneWithoutManagedClientsNestedInput
  }

  export type ClientUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResultUpsertWithWhereUniqueWithoutCampaignInput = {
    where: ResultWhereUniqueInput
    update: XOR<ResultUpdateWithoutCampaignInput, ResultUncheckedUpdateWithoutCampaignInput>
    create: XOR<ResultCreateWithoutCampaignInput, ResultUncheckedCreateWithoutCampaignInput>
  }

  export type ResultUpdateWithWhereUniqueWithoutCampaignInput = {
    where: ResultWhereUniqueInput
    data: XOR<ResultUpdateWithoutCampaignInput, ResultUncheckedUpdateWithoutCampaignInput>
  }

  export type ResultUpdateManyWithWhereWithoutCampaignInput = {
    where: ResultScalarWhereInput
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyWithoutCampaignInput>
  }

  export type ResultScalarWhereInput = {
    AND?: ResultScalarWhereInput | ResultScalarWhereInput[]
    OR?: ResultScalarWhereInput[]
    NOT?: ResultScalarWhereInput | ResultScalarWhereInput[]
    id?: StringFilter<"Result"> | string
    campaignId?: StringFilter<"Result"> | string
    year?: IntFilter<"Result"> | number
    month?: IntFilter<"Result"> | number
    platform?: StringFilter<"Result"> | string
    operationType?: StringFilter<"Result"> | string
    actualSpend?: DecimalFilter<"Result"> | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFilter<"Result"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Result"> | Date | string
    updatedAt?: DateTimeFilter<"Result"> | Date | string
    budgetType?: StringFilter<"Result"> | string
  }

  export type BudgetTeamCreateWithoutBudgetInput = {
    id?: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    team: TeamCreateNestedOneWithoutBudgetTeamsInput
  }

  export type BudgetTeamUncheckedCreateWithoutBudgetInput = {
    id?: string
    teamId: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type BudgetTeamCreateOrConnectWithoutBudgetInput = {
    where: BudgetTeamWhereUniqueInput
    create: XOR<BudgetTeamCreateWithoutBudgetInput, BudgetTeamUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetTeamCreateManyBudgetInputEnvelope = {
    data: BudgetTeamCreateManyBudgetInput | BudgetTeamCreateManyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type CampaignCreateWithoutBudgetsInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    campaignKpis?: CampaignKpiCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamCreateNestedManyWithoutCampaignInput
    client: ClientCreateNestedOneWithoutCampaignsInput
    results?: ResultCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutBudgetsInput = {
    id?: string
    clientId: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    campaignKpis?: CampaignKpiUncheckedCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutCampaignInput
    results?: ResultUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutBudgetsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutBudgetsInput, CampaignUncheckedCreateWithoutBudgetsInput>
  }

  export type BudgetTeamUpsertWithWhereUniqueWithoutBudgetInput = {
    where: BudgetTeamWhereUniqueInput
    update: XOR<BudgetTeamUpdateWithoutBudgetInput, BudgetTeamUncheckedUpdateWithoutBudgetInput>
    create: XOR<BudgetTeamCreateWithoutBudgetInput, BudgetTeamUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetTeamUpdateWithWhereUniqueWithoutBudgetInput = {
    where: BudgetTeamWhereUniqueInput
    data: XOR<BudgetTeamUpdateWithoutBudgetInput, BudgetTeamUncheckedUpdateWithoutBudgetInput>
  }

  export type BudgetTeamUpdateManyWithWhereWithoutBudgetInput = {
    where: BudgetTeamScalarWhereInput
    data: XOR<BudgetTeamUpdateManyMutationInput, BudgetTeamUncheckedUpdateManyWithoutBudgetInput>
  }

  export type BudgetTeamScalarWhereInput = {
    AND?: BudgetTeamScalarWhereInput | BudgetTeamScalarWhereInput[]
    OR?: BudgetTeamScalarWhereInput[]
    NOT?: BudgetTeamScalarWhereInput | BudgetTeamScalarWhereInput[]
    id?: StringFilter<"BudgetTeam"> | string
    budgetId?: StringFilter<"BudgetTeam"> | string
    teamId?: StringFilter<"BudgetTeam"> | string
    allocation?: DecimalFilter<"BudgetTeam"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"BudgetTeam"> | Date | string
  }

  export type CampaignUpsertWithoutBudgetsInput = {
    update: XOR<CampaignUpdateWithoutBudgetsInput, CampaignUncheckedUpdateWithoutBudgetsInput>
    create: XOR<CampaignCreateWithoutBudgetsInput, CampaignUncheckedCreateWithoutBudgetsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutBudgetsInput, CampaignUncheckedUpdateWithoutBudgetsInput>
  }

  export type CampaignUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    campaignKpis?: CampaignKpiUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUpdateManyWithoutCampaignNestedInput
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput
    results?: ResultUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    campaignKpis?: CampaignKpiUncheckedUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutCampaignNestedInput
    results?: ResultUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignCreateWithoutResultsInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamCreateNestedManyWithoutCampaignInput
    client: ClientCreateNestedOneWithoutCampaignsInput
  }

  export type CampaignUncheckedCreateWithoutResultsInput = {
    id?: string
    clientId: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiUncheckedCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutResultsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutResultsInput, CampaignUncheckedCreateWithoutResultsInput>
  }

  export type CampaignUpsertWithoutResultsInput = {
    update: XOR<CampaignUpdateWithoutResultsInput, CampaignUncheckedUpdateWithoutResultsInput>
    create: XOR<CampaignCreateWithoutResultsInput, CampaignUncheckedCreateWithoutResultsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutResultsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutResultsInput, CampaignUncheckedUpdateWithoutResultsInput>
  }

  export type CampaignUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUpdateManyWithoutCampaignNestedInput
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput
  }

  export type CampaignUncheckedUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUncheckedUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUncheckedUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type BudgetTeamCreateWithoutTeamInput = {
    id?: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    budget: BudgetCreateNestedOneWithoutBudgetTeamsInput
  }

  export type BudgetTeamUncheckedCreateWithoutTeamInput = {
    id?: string
    budgetId: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type BudgetTeamCreateOrConnectWithoutTeamInput = {
    where: BudgetTeamWhereUniqueInput
    create: XOR<BudgetTeamCreateWithoutTeamInput, BudgetTeamUncheckedCreateWithoutTeamInput>
  }

  export type BudgetTeamCreateManyTeamInputEnvelope = {
    data: BudgetTeamCreateManyTeamInput | BudgetTeamCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type CampaignTeamCreateWithoutTeamInput = {
    id?: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
    campaign: CampaignCreateNestedOneWithoutCampaignTeamsInput
  }

  export type CampaignTeamUncheckedCreateWithoutTeamInput = {
    id?: string
    campaignId: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
  }

  export type CampaignTeamCreateOrConnectWithoutTeamInput = {
    where: CampaignTeamWhereUniqueInput
    create: XOR<CampaignTeamCreateWithoutTeamInput, CampaignTeamUncheckedCreateWithoutTeamInput>
  }

  export type CampaignTeamCreateManyTeamInputEnvelope = {
    data: CampaignTeamCreateManyTeamInput | CampaignTeamCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type BudgetTeamUpsertWithWhereUniqueWithoutTeamInput = {
    where: BudgetTeamWhereUniqueInput
    update: XOR<BudgetTeamUpdateWithoutTeamInput, BudgetTeamUncheckedUpdateWithoutTeamInput>
    create: XOR<BudgetTeamCreateWithoutTeamInput, BudgetTeamUncheckedCreateWithoutTeamInput>
  }

  export type BudgetTeamUpdateWithWhereUniqueWithoutTeamInput = {
    where: BudgetTeamWhereUniqueInput
    data: XOR<BudgetTeamUpdateWithoutTeamInput, BudgetTeamUncheckedUpdateWithoutTeamInput>
  }

  export type BudgetTeamUpdateManyWithWhereWithoutTeamInput = {
    where: BudgetTeamScalarWhereInput
    data: XOR<BudgetTeamUpdateManyMutationInput, BudgetTeamUncheckedUpdateManyWithoutTeamInput>
  }

  export type CampaignTeamUpsertWithWhereUniqueWithoutTeamInput = {
    where: CampaignTeamWhereUniqueInput
    update: XOR<CampaignTeamUpdateWithoutTeamInput, CampaignTeamUncheckedUpdateWithoutTeamInput>
    create: XOR<CampaignTeamCreateWithoutTeamInput, CampaignTeamUncheckedCreateWithoutTeamInput>
  }

  export type CampaignTeamUpdateWithWhereUniqueWithoutTeamInput = {
    where: CampaignTeamWhereUniqueInput
    data: XOR<CampaignTeamUpdateWithoutTeamInput, CampaignTeamUncheckedUpdateWithoutTeamInput>
  }

  export type CampaignTeamUpdateManyWithWhereWithoutTeamInput = {
    where: CampaignTeamScalarWhereInput
    data: XOR<CampaignTeamUpdateManyMutationInput, CampaignTeamUncheckedUpdateManyWithoutTeamInput>
  }

  export type BudgetCreateWithoutBudgetTeamsInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
    campaign: CampaignCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutBudgetTeamsInput = {
    id?: string
    campaignId: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type BudgetCreateOrConnectWithoutBudgetTeamsInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutBudgetTeamsInput, BudgetUncheckedCreateWithoutBudgetTeamsInput>
  }

  export type TeamCreateWithoutBudgetTeamsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignTeams?: CampaignTeamCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutBudgetTeamsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutBudgetTeamsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutBudgetTeamsInput, TeamUncheckedCreateWithoutBudgetTeamsInput>
  }

  export type BudgetUpsertWithoutBudgetTeamsInput = {
    update: XOR<BudgetUpdateWithoutBudgetTeamsInput, BudgetUncheckedUpdateWithoutBudgetTeamsInput>
    create: XOR<BudgetCreateWithoutBudgetTeamsInput, BudgetUncheckedCreateWithoutBudgetTeamsInput>
    where?: BudgetWhereInput
  }

  export type BudgetUpdateToOneWithWhereWithoutBudgetTeamsInput = {
    where?: BudgetWhereInput
    data: XOR<BudgetUpdateWithoutBudgetTeamsInput, BudgetUncheckedUpdateWithoutBudgetTeamsInput>
  }

  export type BudgetUpdateWithoutBudgetTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
    campaign?: CampaignUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutBudgetTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUpsertWithoutBudgetTeamsInput = {
    update: XOR<TeamUpdateWithoutBudgetTeamsInput, TeamUncheckedUpdateWithoutBudgetTeamsInput>
    create: XOR<TeamCreateWithoutBudgetTeamsInput, TeamUncheckedCreateWithoutBudgetTeamsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutBudgetTeamsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutBudgetTeamsInput, TeamUncheckedUpdateWithoutBudgetTeamsInput>
  }

  export type TeamUpdateWithoutBudgetTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignTeams?: CampaignTeamUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutBudgetTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type CampaignCreateWithoutCampaignTeamsInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiCreateNestedManyWithoutCampaignInput
    client: ClientCreateNestedOneWithoutCampaignsInput
    results?: ResultCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutCampaignTeamsInput = {
    id?: string
    clientId: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutCampaignInput
    campaignKpis?: CampaignKpiUncheckedCreateNestedManyWithoutCampaignInput
    results?: ResultUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutCampaignTeamsInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutCampaignTeamsInput, CampaignUncheckedCreateWithoutCampaignTeamsInput>
  }

  export type TeamCreateWithoutCampaignTeamsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetTeams?: BudgetTeamCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutCampaignTeamsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetTeams?: BudgetTeamUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutCampaignTeamsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutCampaignTeamsInput, TeamUncheckedCreateWithoutCampaignTeamsInput>
  }

  export type CampaignUpsertWithoutCampaignTeamsInput = {
    update: XOR<CampaignUpdateWithoutCampaignTeamsInput, CampaignUncheckedUpdateWithoutCampaignTeamsInput>
    create: XOR<CampaignCreateWithoutCampaignTeamsInput, CampaignUncheckedCreateWithoutCampaignTeamsInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutCampaignTeamsInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutCampaignTeamsInput, CampaignUncheckedUpdateWithoutCampaignTeamsInput>
  }

  export type CampaignUpdateWithoutCampaignTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUpdateManyWithoutCampaignNestedInput
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput
    results?: ResultUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutCampaignTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUncheckedUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUncheckedUpdateManyWithoutCampaignNestedInput
    results?: ResultUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type TeamUpsertWithoutCampaignTeamsInput = {
    update: XOR<TeamUpdateWithoutCampaignTeamsInput, TeamUncheckedUpdateWithoutCampaignTeamsInput>
    create: XOR<TeamCreateWithoutCampaignTeamsInput, TeamUncheckedCreateWithoutCampaignTeamsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutCampaignTeamsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutCampaignTeamsInput, TeamUncheckedUpdateWithoutCampaignTeamsInput>
  }

  export type TeamUpdateWithoutCampaignTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetTeams?: BudgetTeamUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutCampaignTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetTeams?: BudgetTeamUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type CampaignCreateWithoutCampaignKpisInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamCreateNestedManyWithoutCampaignInput
    client: ClientCreateNestedOneWithoutCampaignsInput
    results?: ResultCreateNestedManyWithoutCampaignInput
  }

  export type CampaignUncheckedCreateWithoutCampaignKpisInput = {
    id?: string
    clientId: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutCampaignInput
    campaignTeams?: CampaignTeamUncheckedCreateNestedManyWithoutCampaignInput
    results?: ResultUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type CampaignCreateOrConnectWithoutCampaignKpisInput = {
    where: CampaignWhereUniqueInput
    create: XOR<CampaignCreateWithoutCampaignKpisInput, CampaignUncheckedCreateWithoutCampaignKpisInput>
  }

  export type CampaignUpsertWithoutCampaignKpisInput = {
    update: XOR<CampaignUpdateWithoutCampaignKpisInput, CampaignUncheckedUpdateWithoutCampaignKpisInput>
    create: XOR<CampaignCreateWithoutCampaignKpisInput, CampaignUncheckedCreateWithoutCampaignKpisInput>
    where?: CampaignWhereInput
  }

  export type CampaignUpdateToOneWithWhereWithoutCampaignKpisInput = {
    where?: CampaignWhereInput
    data: XOR<CampaignUpdateWithoutCampaignKpisInput, CampaignUncheckedUpdateWithoutCampaignKpisInput>
  }

  export type CampaignUpdateWithoutCampaignKpisInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUpdateManyWithoutCampaignNestedInput
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput
    results?: ResultUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutCampaignKpisInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUncheckedUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutCampaignNestedInput
    results?: ResultUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type ClientCreateManyManagerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    agency?: string | null
    salesChannel?: string | null
    salesDepartment: string
    businessDivision: string
    priority?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClientUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    campaigns?: CampaignUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    campaigns?: CampaignUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agency?: NullableStringFieldUpdateOperationsInput | string | null
    salesChannel?: NullableStringFieldUpdateOperationsInput | string | null
    salesDepartment?: StringFieldUpdateOperationsInput | string
    businessDivision?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateManyClientInput = {
    id?: string
    name: string
    purpose?: string | null
    totalBudget: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    startYear: number
    startMonth: number
    endYear?: number | null
    endMonth?: number | null
  }

  export type CampaignUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUpdateManyWithoutCampaignNestedInput
    results?: ResultUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
    budgets?: BudgetUncheckedUpdateManyWithoutCampaignNestedInput
    campaignKpis?: CampaignKpiUncheckedUpdateManyWithoutCampaignNestedInput
    campaignTeams?: CampaignTeamUncheckedUpdateManyWithoutCampaignNestedInput
    results?: ResultUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type CampaignUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    totalBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startYear?: IntFieldUpdateOperationsInput | number
    startMonth?: IntFieldUpdateOperationsInput | number
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    endMonth?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BudgetCreateManyCampaignInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    amount: Decimal | DecimalJsLike | number | string
    targetKpi?: string | null
    targetValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type CampaignKpiCreateManyCampaignInput = {
    id?: string
    kpiType: string
    targetValue: Decimal | DecimalJsLike | number | string
    actualValue?: Decimal | DecimalJsLike | number | string | null
    unit: string
    description?: string | null
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignTeamCreateManyCampaignInput = {
    id?: string
    teamId: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
  }

  export type ResultCreateManyCampaignInput = {
    id?: string
    year: number
    month: number
    platform: string
    operationType: string
    actualSpend: Decimal | DecimalJsLike | number | string
    actualResult: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    budgetType: string
  }

  export type BudgetUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
    budgetTeams?: BudgetTeamUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
    budgetTeams?: BudgetTeamUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    targetKpi?: NullableStringFieldUpdateOperationsInput | string | null
    targetValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type CampaignKpiUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignKpiUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignKpiUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    kpiType?: StringFieldUpdateOperationsInput | string
    targetValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutCampaignTeamsNestedInput
  }

  export type CampaignTeamUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type ResultUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type ResultUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    operationType?: StringFieldUpdateOperationsInput | string
    actualSpend?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualResult?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budgetType?: StringFieldUpdateOperationsInput | string
  }

  export type BudgetTeamCreateManyBudgetInput = {
    id?: string
    teamId: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type BudgetTeamUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutBudgetTeamsNestedInput
  }

  export type BudgetTeamUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetTeamUncheckedUpdateManyWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetTeamCreateManyTeamInput = {
    id?: string
    budgetId: string
    allocation: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type CampaignTeamCreateManyTeamInput = {
    id?: string
    campaignId: string
    role?: string | null
    isLead?: boolean
    createdAt?: Date | string
  }

  export type BudgetTeamUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: BudgetUpdateOneRequiredWithoutBudgetTeamsNestedInput
  }

  export type BudgetTeamUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetTeamUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    allocation?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaign?: CampaignUpdateOneRequiredWithoutCampaignTeamsNestedInput
  }

  export type CampaignTeamUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignTeamUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    campaignId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isLead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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