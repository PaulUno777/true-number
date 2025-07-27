
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
 * Model SoloGame
 * 
 */
export type SoloGame = $Result.DefaultSelection<Prisma.$SoloGamePayload>
/**
 * Model MultiplayerGame
 * 
 */
export type MultiplayerGame = $Result.DefaultSelection<Prisma.$MultiplayerGamePayload>
/**
 * Model MultiplayerParticipant
 * 
 */
export type MultiplayerParticipant = $Result.DefaultSelection<Prisma.$MultiplayerParticipantPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Recharge
 * 
 */
export type Recharge = $Result.DefaultSelection<Prisma.$RechargePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SoloGameResult: {
  EXACT_MATCH: 'EXACT_MATCH',
  HIGHER: 'HIGHER',
  LOWER: 'LOWER'
};

export type SoloGameResult = (typeof SoloGameResult)[keyof typeof SoloGameResult]


export const GameStatus: {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
  CANCELLED: 'CANCELLED'
};

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]


export const TransactionType: {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const TransactionStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]


export const PaymentMethod: {
  CREDIT_CARD: 'CREDIT_CARD',
  PAYPAL: 'PAYPAL',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CRYPTO: 'CRYPTO'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const RechargeStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type RechargeStatus = (typeof RechargeStatus)[keyof typeof RechargeStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SoloGameResult = $Enums.SoloGameResult

export const SoloGameResult: typeof $Enums.SoloGameResult

export type GameStatus = $Enums.GameStatus

export const GameStatus: typeof $Enums.GameStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type TransactionStatus = $Enums.TransactionStatus

export const TransactionStatus: typeof $Enums.TransactionStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type RechargeStatus = $Enums.RechargeStatus

export const RechargeStatus: typeof $Enums.RechargeStatus

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

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
   * `prisma.soloGame`: Exposes CRUD operations for the **SoloGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SoloGames
    * const soloGames = await prisma.soloGame.findMany()
    * ```
    */
  get soloGame(): Prisma.SoloGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.multiplayerGame`: Exposes CRUD operations for the **MultiplayerGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MultiplayerGames
    * const multiplayerGames = await prisma.multiplayerGame.findMany()
    * ```
    */
  get multiplayerGame(): Prisma.MultiplayerGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.multiplayerParticipant`: Exposes CRUD operations for the **MultiplayerParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MultiplayerParticipants
    * const multiplayerParticipants = await prisma.multiplayerParticipant.findMany()
    * ```
    */
  get multiplayerParticipant(): Prisma.MultiplayerParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recharge`: Exposes CRUD operations for the **Recharge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recharges
    * const recharges = await prisma.recharge.findMany()
    * ```
    */
  get recharge(): Prisma.RechargeDelegate<ExtArgs, ClientOptions>;
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
    SoloGame: 'SoloGame',
    MultiplayerGame: 'MultiplayerGame',
    MultiplayerParticipant: 'MultiplayerParticipant',
    Transaction: 'Transaction',
    Recharge: 'Recharge'
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
      modelProps: "user" | "soloGame" | "multiplayerGame" | "multiplayerParticipant" | "transaction" | "recharge"
      txIsolationLevel: never
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
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      SoloGame: {
        payload: Prisma.$SoloGamePayload<ExtArgs>
        fields: Prisma.SoloGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SoloGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SoloGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>
          }
          findFirst: {
            args: Prisma.SoloGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SoloGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>
          }
          findMany: {
            args: Prisma.SoloGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>[]
          }
          create: {
            args: Prisma.SoloGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>
          }
          createMany: {
            args: Prisma.SoloGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SoloGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>
          }
          update: {
            args: Prisma.SoloGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>
          }
          deleteMany: {
            args: Prisma.SoloGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SoloGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SoloGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoloGamePayload>
          }
          aggregate: {
            args: Prisma.SoloGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoloGame>
          }
          groupBy: {
            args: Prisma.SoloGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoloGameGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SoloGameFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SoloGameAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SoloGameCountArgs<ExtArgs>
            result: $Utils.Optional<SoloGameCountAggregateOutputType> | number
          }
        }
      }
      MultiplayerGame: {
        payload: Prisma.$MultiplayerGamePayload<ExtArgs>
        fields: Prisma.MultiplayerGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MultiplayerGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MultiplayerGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          findFirst: {
            args: Prisma.MultiplayerGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MultiplayerGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          findMany: {
            args: Prisma.MultiplayerGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>[]
          }
          create: {
            args: Prisma.MultiplayerGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          createMany: {
            args: Prisma.MultiplayerGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MultiplayerGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          update: {
            args: Prisma.MultiplayerGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          deleteMany: {
            args: Prisma.MultiplayerGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MultiplayerGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MultiplayerGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerGamePayload>
          }
          aggregate: {
            args: Prisma.MultiplayerGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMultiplayerGame>
          }
          groupBy: {
            args: Prisma.MultiplayerGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<MultiplayerGameGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MultiplayerGameFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MultiplayerGameAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MultiplayerGameCountArgs<ExtArgs>
            result: $Utils.Optional<MultiplayerGameCountAggregateOutputType> | number
          }
        }
      }
      MultiplayerParticipant: {
        payload: Prisma.$MultiplayerParticipantPayload<ExtArgs>
        fields: Prisma.MultiplayerParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MultiplayerParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MultiplayerParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>
          }
          findFirst: {
            args: Prisma.MultiplayerParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MultiplayerParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>
          }
          findMany: {
            args: Prisma.MultiplayerParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>[]
          }
          create: {
            args: Prisma.MultiplayerParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>
          }
          createMany: {
            args: Prisma.MultiplayerParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MultiplayerParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>
          }
          update: {
            args: Prisma.MultiplayerParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>
          }
          deleteMany: {
            args: Prisma.MultiplayerParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MultiplayerParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MultiplayerParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultiplayerParticipantPayload>
          }
          aggregate: {
            args: Prisma.MultiplayerParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMultiplayerParticipant>
          }
          groupBy: {
            args: Prisma.MultiplayerParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<MultiplayerParticipantGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MultiplayerParticipantFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MultiplayerParticipantAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MultiplayerParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<MultiplayerParticipantCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TransactionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TransactionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Recharge: {
        payload: Prisma.$RechargePayload<ExtArgs>
        fields: Prisma.RechargeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RechargeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RechargeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>
          }
          findFirst: {
            args: Prisma.RechargeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RechargeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>
          }
          findMany: {
            args: Prisma.RechargeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>[]
          }
          create: {
            args: Prisma.RechargeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>
          }
          createMany: {
            args: Prisma.RechargeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RechargeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>
          }
          update: {
            args: Prisma.RechargeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>
          }
          deleteMany: {
            args: Prisma.RechargeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RechargeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RechargeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RechargePayload>
          }
          aggregate: {
            args: Prisma.RechargeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecharge>
          }
          groupBy: {
            args: Prisma.RechargeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RechargeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.RechargeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.RechargeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.RechargeCountArgs<ExtArgs>
            result: $Utils.Optional<RechargeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
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
    soloGame?: SoloGameOmit
    multiplayerGame?: MultiplayerGameOmit
    multiplayerParticipant?: MultiplayerParticipantOmit
    transaction?: TransactionOmit
    recharge?: RechargeOmit
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
    createdGames: number
    participations: number
    soloGames: number
    transactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdGames?: boolean | UserCountOutputTypeCountCreatedGamesArgs
    participations?: boolean | UserCountOutputTypeCountParticipationsArgs
    soloGames?: boolean | UserCountOutputTypeCountSoloGamesArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
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
  export type UserCountOutputTypeCountCreatedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerGameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerParticipantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSoloGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoloGameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type MultiplayerGameCountOutputType
   */

  export type MultiplayerGameCountOutputType = {
    players: number
  }

  export type MultiplayerGameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | MultiplayerGameCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * MultiplayerGameCountOutputType without action
   */
  export type MultiplayerGameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGameCountOutputType
     */
    select?: MultiplayerGameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MultiplayerGameCountOutputType without action
   */
  export type MultiplayerGameCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerParticipantWhereInput
  }


  /**
   * Count Type TransactionCountOutputType
   */

  export type TransactionCountOutputType = {
    soloGames: number
    multiplayerParticipants: number
  }

  export type TransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    soloGames?: boolean | TransactionCountOutputTypeCountSoloGamesArgs
    multiplayerParticipants?: boolean | TransactionCountOutputTypeCountMultiplayerParticipantsArgs
  }

  // Custom InputTypes
  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionCountOutputType
     */
    select?: TransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountSoloGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoloGameWhereInput
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountMultiplayerParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerParticipantWhereInput
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
    username: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.Role | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.Role | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    phone: number
    role: number
    refreshToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    refreshToken?: true
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
    username: string
    email: string
    password: string
    phone: string
    role: $Enums.Role
    refreshToken: string | null
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
    username?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdGames?: boolean | User$createdGamesArgs<ExtArgs>
    participations?: boolean | User$participationsArgs<ExtArgs>
    soloGames?: boolean | User$soloGamesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "phone" | "role" | "refreshToken" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdGames?: boolean | User$createdGamesArgs<ExtArgs>
    participations?: boolean | User$participationsArgs<ExtArgs>
    soloGames?: boolean | User$soloGamesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdGames: Prisma.$MultiplayerGamePayload<ExtArgs>[]
      participations: Prisma.$MultiplayerParticipantPayload<ExtArgs>[]
      soloGames: Prisma.$SoloGamePayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      phone: string
      role: $Enums.Role
      refreshToken: string | null
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
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


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
    createdGames<T extends User$createdGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    participations<T extends User$participationsArgs<ExtArgs> = {}>(args?: Subset<T, User$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    soloGames<T extends User$soloGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$soloGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly refreshToken: FieldRef<"User", 'String'>
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
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.createdGames
   */
  export type User$createdGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    where?: MultiplayerGameWhereInput
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    cursor?: MultiplayerGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * User.participations
   */
  export type User$participationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    where?: MultiplayerParticipantWhereInput
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    cursor?: MultiplayerParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MultiplayerParticipantScalarFieldEnum | MultiplayerParticipantScalarFieldEnum[]
  }

  /**
   * User.soloGames
   */
  export type User$soloGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    where?: SoloGameWhereInput
    orderBy?: SoloGameOrderByWithRelationInput | SoloGameOrderByWithRelationInput[]
    cursor?: SoloGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SoloGameScalarFieldEnum | SoloGameScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
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
   * Model SoloGame
   */

  export type AggregateSoloGame = {
    _count: SoloGameCountAggregateOutputType | null
    _avg: SoloGameAvgAggregateOutputType | null
    _sum: SoloGameSumAggregateOutputType | null
    _min: SoloGameMinAggregateOutputType | null
    _max: SoloGameMaxAggregateOutputType | null
  }

  export type SoloGameAvgAggregateOutputType = {
    bet: number | null
    chosenNumber: number | null
    generatedNumber: number | null
    balanceChange: number | null
    multiplier: number | null
  }

  export type SoloGameSumAggregateOutputType = {
    bet: number | null
    chosenNumber: number | null
    generatedNumber: number | null
    balanceChange: number | null
    multiplier: number | null
  }

  export type SoloGameMinAggregateOutputType = {
    id: string | null
    userId: string | null
    bet: number | null
    chosenNumber: number | null
    generatedNumber: number | null
    result: $Enums.SoloGameResult | null
    balanceChange: number | null
    multiplier: number | null
    playedAt: Date | null
    transactionId: string | null
  }

  export type SoloGameMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    bet: number | null
    chosenNumber: number | null
    generatedNumber: number | null
    result: $Enums.SoloGameResult | null
    balanceChange: number | null
    multiplier: number | null
    playedAt: Date | null
    transactionId: string | null
  }

  export type SoloGameCountAggregateOutputType = {
    id: number
    userId: number
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: number
    balanceChange: number
    multiplier: number
    playedAt: number
    transactionId: number
    _all: number
  }


  export type SoloGameAvgAggregateInputType = {
    bet?: true
    chosenNumber?: true
    generatedNumber?: true
    balanceChange?: true
    multiplier?: true
  }

  export type SoloGameSumAggregateInputType = {
    bet?: true
    chosenNumber?: true
    generatedNumber?: true
    balanceChange?: true
    multiplier?: true
  }

  export type SoloGameMinAggregateInputType = {
    id?: true
    userId?: true
    bet?: true
    chosenNumber?: true
    generatedNumber?: true
    result?: true
    balanceChange?: true
    multiplier?: true
    playedAt?: true
    transactionId?: true
  }

  export type SoloGameMaxAggregateInputType = {
    id?: true
    userId?: true
    bet?: true
    chosenNumber?: true
    generatedNumber?: true
    result?: true
    balanceChange?: true
    multiplier?: true
    playedAt?: true
    transactionId?: true
  }

  export type SoloGameCountAggregateInputType = {
    id?: true
    userId?: true
    bet?: true
    chosenNumber?: true
    generatedNumber?: true
    result?: true
    balanceChange?: true
    multiplier?: true
    playedAt?: true
    transactionId?: true
    _all?: true
  }

  export type SoloGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoloGame to aggregate.
     */
    where?: SoloGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoloGames to fetch.
     */
    orderBy?: SoloGameOrderByWithRelationInput | SoloGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SoloGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoloGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoloGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SoloGames
    **/
    _count?: true | SoloGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SoloGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SoloGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoloGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoloGameMaxAggregateInputType
  }

  export type GetSoloGameAggregateType<T extends SoloGameAggregateArgs> = {
        [P in keyof T & keyof AggregateSoloGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoloGame[P]>
      : GetScalarType<T[P], AggregateSoloGame[P]>
  }




  export type SoloGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoloGameWhereInput
    orderBy?: SoloGameOrderByWithAggregationInput | SoloGameOrderByWithAggregationInput[]
    by: SoloGameScalarFieldEnum[] | SoloGameScalarFieldEnum
    having?: SoloGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoloGameCountAggregateInputType | true
    _avg?: SoloGameAvgAggregateInputType
    _sum?: SoloGameSumAggregateInputType
    _min?: SoloGameMinAggregateInputType
    _max?: SoloGameMaxAggregateInputType
  }

  export type SoloGameGroupByOutputType = {
    id: string
    userId: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt: Date
    transactionId: string | null
    _count: SoloGameCountAggregateOutputType | null
    _avg: SoloGameAvgAggregateOutputType | null
    _sum: SoloGameSumAggregateOutputType | null
    _min: SoloGameMinAggregateOutputType | null
    _max: SoloGameMaxAggregateOutputType | null
  }

  type GetSoloGameGroupByPayload<T extends SoloGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoloGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoloGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoloGameGroupByOutputType[P]>
            : GetScalarType<T[P], SoloGameGroupByOutputType[P]>
        }
      >
    >


  export type SoloGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    bet?: boolean
    chosenNumber?: boolean
    generatedNumber?: boolean
    result?: boolean
    balanceChange?: boolean
    multiplier?: boolean
    playedAt?: boolean
    transactionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transaction?: boolean | SoloGame$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["soloGame"]>



  export type SoloGameSelectScalar = {
    id?: boolean
    userId?: boolean
    bet?: boolean
    chosenNumber?: boolean
    generatedNumber?: boolean
    result?: boolean
    balanceChange?: boolean
    multiplier?: boolean
    playedAt?: boolean
    transactionId?: boolean
  }

  export type SoloGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "bet" | "chosenNumber" | "generatedNumber" | "result" | "balanceChange" | "multiplier" | "playedAt" | "transactionId", ExtArgs["result"]["soloGame"]>
  export type SoloGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transaction?: boolean | SoloGame$transactionArgs<ExtArgs>
  }

  export type $SoloGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SoloGame"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      bet: number
      chosenNumber: number
      generatedNumber: number
      result: $Enums.SoloGameResult
      balanceChange: number
      multiplier: number
      playedAt: Date
      transactionId: string | null
    }, ExtArgs["result"]["soloGame"]>
    composites: {}
  }

  type SoloGameGetPayload<S extends boolean | null | undefined | SoloGameDefaultArgs> = $Result.GetResult<Prisma.$SoloGamePayload, S>

  type SoloGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SoloGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoloGameCountAggregateInputType | true
    }

  export interface SoloGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SoloGame'], meta: { name: 'SoloGame' } }
    /**
     * Find zero or one SoloGame that matches the filter.
     * @param {SoloGameFindUniqueArgs} args - Arguments to find a SoloGame
     * @example
     * // Get one SoloGame
     * const soloGame = await prisma.soloGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoloGameFindUniqueArgs>(args: SelectSubset<T, SoloGameFindUniqueArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SoloGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoloGameFindUniqueOrThrowArgs} args - Arguments to find a SoloGame
     * @example
     * // Get one SoloGame
     * const soloGame = await prisma.soloGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoloGameFindUniqueOrThrowArgs>(args: SelectSubset<T, SoloGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoloGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameFindFirstArgs} args - Arguments to find a SoloGame
     * @example
     * // Get one SoloGame
     * const soloGame = await prisma.soloGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoloGameFindFirstArgs>(args?: SelectSubset<T, SoloGameFindFirstArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoloGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameFindFirstOrThrowArgs} args - Arguments to find a SoloGame
     * @example
     * // Get one SoloGame
     * const soloGame = await prisma.soloGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoloGameFindFirstOrThrowArgs>(args?: SelectSubset<T, SoloGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SoloGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SoloGames
     * const soloGames = await prisma.soloGame.findMany()
     * 
     * // Get first 10 SoloGames
     * const soloGames = await prisma.soloGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const soloGameWithIdOnly = await prisma.soloGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SoloGameFindManyArgs>(args?: SelectSubset<T, SoloGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SoloGame.
     * @param {SoloGameCreateArgs} args - Arguments to create a SoloGame.
     * @example
     * // Create one SoloGame
     * const SoloGame = await prisma.soloGame.create({
     *   data: {
     *     // ... data to create a SoloGame
     *   }
     * })
     * 
     */
    create<T extends SoloGameCreateArgs>(args: SelectSubset<T, SoloGameCreateArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SoloGames.
     * @param {SoloGameCreateManyArgs} args - Arguments to create many SoloGames.
     * @example
     * // Create many SoloGames
     * const soloGame = await prisma.soloGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SoloGameCreateManyArgs>(args?: SelectSubset<T, SoloGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SoloGame.
     * @param {SoloGameDeleteArgs} args - Arguments to delete one SoloGame.
     * @example
     * // Delete one SoloGame
     * const SoloGame = await prisma.soloGame.delete({
     *   where: {
     *     // ... filter to delete one SoloGame
     *   }
     * })
     * 
     */
    delete<T extends SoloGameDeleteArgs>(args: SelectSubset<T, SoloGameDeleteArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SoloGame.
     * @param {SoloGameUpdateArgs} args - Arguments to update one SoloGame.
     * @example
     * // Update one SoloGame
     * const soloGame = await prisma.soloGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SoloGameUpdateArgs>(args: SelectSubset<T, SoloGameUpdateArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SoloGames.
     * @param {SoloGameDeleteManyArgs} args - Arguments to filter SoloGames to delete.
     * @example
     * // Delete a few SoloGames
     * const { count } = await prisma.soloGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SoloGameDeleteManyArgs>(args?: SelectSubset<T, SoloGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoloGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SoloGames
     * const soloGame = await prisma.soloGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SoloGameUpdateManyArgs>(args: SelectSubset<T, SoloGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SoloGame.
     * @param {SoloGameUpsertArgs} args - Arguments to update or create a SoloGame.
     * @example
     * // Update or create a SoloGame
     * const soloGame = await prisma.soloGame.upsert({
     *   create: {
     *     // ... data to create a SoloGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SoloGame we want to update
     *   }
     * })
     */
    upsert<T extends SoloGameUpsertArgs>(args: SelectSubset<T, SoloGameUpsertArgs<ExtArgs>>): Prisma__SoloGameClient<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SoloGames that matches the filter.
     * @param {SoloGameFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const soloGame = await prisma.soloGame.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SoloGameFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SoloGame.
     * @param {SoloGameAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const soloGame = await prisma.soloGame.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SoloGameAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SoloGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameCountArgs} args - Arguments to filter SoloGames to count.
     * @example
     * // Count the number of SoloGames
     * const count = await prisma.soloGame.count({
     *   where: {
     *     // ... the filter for the SoloGames we want to count
     *   }
     * })
    **/
    count<T extends SoloGameCountArgs>(
      args?: Subset<T, SoloGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoloGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SoloGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SoloGameAggregateArgs>(args: Subset<T, SoloGameAggregateArgs>): Prisma.PrismaPromise<GetSoloGameAggregateType<T>>

    /**
     * Group by SoloGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoloGameGroupByArgs} args - Group by arguments.
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
      T extends SoloGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SoloGameGroupByArgs['orderBy'] }
        : { orderBy?: SoloGameGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SoloGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoloGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SoloGame model
   */
  readonly fields: SoloGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SoloGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SoloGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends SoloGame$transactionArgs<ExtArgs> = {}>(args?: Subset<T, SoloGame$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SoloGame model
   */
  interface SoloGameFieldRefs {
    readonly id: FieldRef<"SoloGame", 'String'>
    readonly userId: FieldRef<"SoloGame", 'String'>
    readonly bet: FieldRef<"SoloGame", 'Int'>
    readonly chosenNumber: FieldRef<"SoloGame", 'Int'>
    readonly generatedNumber: FieldRef<"SoloGame", 'Int'>
    readonly result: FieldRef<"SoloGame", 'SoloGameResult'>
    readonly balanceChange: FieldRef<"SoloGame", 'Int'>
    readonly multiplier: FieldRef<"SoloGame", 'Float'>
    readonly playedAt: FieldRef<"SoloGame", 'DateTime'>
    readonly transactionId: FieldRef<"SoloGame", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SoloGame findUnique
   */
  export type SoloGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * Filter, which SoloGame to fetch.
     */
    where: SoloGameWhereUniqueInput
  }

  /**
   * SoloGame findUniqueOrThrow
   */
  export type SoloGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * Filter, which SoloGame to fetch.
     */
    where: SoloGameWhereUniqueInput
  }

  /**
   * SoloGame findFirst
   */
  export type SoloGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * Filter, which SoloGame to fetch.
     */
    where?: SoloGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoloGames to fetch.
     */
    orderBy?: SoloGameOrderByWithRelationInput | SoloGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoloGames.
     */
    cursor?: SoloGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoloGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoloGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoloGames.
     */
    distinct?: SoloGameScalarFieldEnum | SoloGameScalarFieldEnum[]
  }

  /**
   * SoloGame findFirstOrThrow
   */
  export type SoloGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * Filter, which SoloGame to fetch.
     */
    where?: SoloGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoloGames to fetch.
     */
    orderBy?: SoloGameOrderByWithRelationInput | SoloGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoloGames.
     */
    cursor?: SoloGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoloGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoloGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoloGames.
     */
    distinct?: SoloGameScalarFieldEnum | SoloGameScalarFieldEnum[]
  }

  /**
   * SoloGame findMany
   */
  export type SoloGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * Filter, which SoloGames to fetch.
     */
    where?: SoloGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoloGames to fetch.
     */
    orderBy?: SoloGameOrderByWithRelationInput | SoloGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SoloGames.
     */
    cursor?: SoloGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoloGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoloGames.
     */
    skip?: number
    distinct?: SoloGameScalarFieldEnum | SoloGameScalarFieldEnum[]
  }

  /**
   * SoloGame create
   */
  export type SoloGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * The data needed to create a SoloGame.
     */
    data: XOR<SoloGameCreateInput, SoloGameUncheckedCreateInput>
  }

  /**
   * SoloGame createMany
   */
  export type SoloGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SoloGames.
     */
    data: SoloGameCreateManyInput | SoloGameCreateManyInput[]
  }

  /**
   * SoloGame update
   */
  export type SoloGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * The data needed to update a SoloGame.
     */
    data: XOR<SoloGameUpdateInput, SoloGameUncheckedUpdateInput>
    /**
     * Choose, which SoloGame to update.
     */
    where: SoloGameWhereUniqueInput
  }

  /**
   * SoloGame updateMany
   */
  export type SoloGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SoloGames.
     */
    data: XOR<SoloGameUpdateManyMutationInput, SoloGameUncheckedUpdateManyInput>
    /**
     * Filter which SoloGames to update
     */
    where?: SoloGameWhereInput
    /**
     * Limit how many SoloGames to update.
     */
    limit?: number
  }

  /**
   * SoloGame upsert
   */
  export type SoloGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * The filter to search for the SoloGame to update in case it exists.
     */
    where: SoloGameWhereUniqueInput
    /**
     * In case the SoloGame found by the `where` argument doesn't exist, create a new SoloGame with this data.
     */
    create: XOR<SoloGameCreateInput, SoloGameUncheckedCreateInput>
    /**
     * In case the SoloGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SoloGameUpdateInput, SoloGameUncheckedUpdateInput>
  }

  /**
   * SoloGame delete
   */
  export type SoloGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    /**
     * Filter which SoloGame to delete.
     */
    where: SoloGameWhereUniqueInput
  }

  /**
   * SoloGame deleteMany
   */
  export type SoloGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoloGames to delete
     */
    where?: SoloGameWhereInput
    /**
     * Limit how many SoloGames to delete.
     */
    limit?: number
  }

  /**
   * SoloGame findRaw
   */
  export type SoloGameFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SoloGame aggregateRaw
   */
  export type SoloGameAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SoloGame.transaction
   */
  export type SoloGame$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * SoloGame without action
   */
  export type SoloGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
  }


  /**
   * Model MultiplayerGame
   */

  export type AggregateMultiplayerGame = {
    _count: MultiplayerGameCountAggregateOutputType | null
    _avg: MultiplayerGameAvgAggregateOutputType | null
    _sum: MultiplayerGameSumAggregateOutputType | null
    _min: MultiplayerGameMinAggregateOutputType | null
    _max: MultiplayerGameMaxAggregateOutputType | null
  }

  export type MultiplayerGameAvgAggregateOutputType = {
    bet: number | null
    thinkingTime: number | null
  }

  export type MultiplayerGameSumAggregateOutputType = {
    bet: number | null
    thinkingTime: number | null
  }

  export type MultiplayerGameMinAggregateOutputType = {
    id: string | null
    bet: number | null
    thinkingTime: number | null
    status: $Enums.GameStatus | null
    createdBy: string | null
    winnerId: string | null
    createdAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
  }

  export type MultiplayerGameMaxAggregateOutputType = {
    id: string | null
    bet: number | null
    thinkingTime: number | null
    status: $Enums.GameStatus | null
    createdBy: string | null
    winnerId: string | null
    createdAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
  }

  export type MultiplayerGameCountAggregateOutputType = {
    id: number
    bet: number
    thinkingTime: number
    status: number
    createdBy: number
    winnerId: number
    createdAt: number
    startedAt: number
    finishedAt: number
    _all: number
  }


  export type MultiplayerGameAvgAggregateInputType = {
    bet?: true
    thinkingTime?: true
  }

  export type MultiplayerGameSumAggregateInputType = {
    bet?: true
    thinkingTime?: true
  }

  export type MultiplayerGameMinAggregateInputType = {
    id?: true
    bet?: true
    thinkingTime?: true
    status?: true
    createdBy?: true
    winnerId?: true
    createdAt?: true
    startedAt?: true
    finishedAt?: true
  }

  export type MultiplayerGameMaxAggregateInputType = {
    id?: true
    bet?: true
    thinkingTime?: true
    status?: true
    createdBy?: true
    winnerId?: true
    createdAt?: true
    startedAt?: true
    finishedAt?: true
  }

  export type MultiplayerGameCountAggregateInputType = {
    id?: true
    bet?: true
    thinkingTime?: true
    status?: true
    createdBy?: true
    winnerId?: true
    createdAt?: true
    startedAt?: true
    finishedAt?: true
    _all?: true
  }

  export type MultiplayerGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MultiplayerGame to aggregate.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MultiplayerGames
    **/
    _count?: true | MultiplayerGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MultiplayerGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MultiplayerGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MultiplayerGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MultiplayerGameMaxAggregateInputType
  }

  export type GetMultiplayerGameAggregateType<T extends MultiplayerGameAggregateArgs> = {
        [P in keyof T & keyof AggregateMultiplayerGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMultiplayerGame[P]>
      : GetScalarType<T[P], AggregateMultiplayerGame[P]>
  }




  export type MultiplayerGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerGameWhereInput
    orderBy?: MultiplayerGameOrderByWithAggregationInput | MultiplayerGameOrderByWithAggregationInput[]
    by: MultiplayerGameScalarFieldEnum[] | MultiplayerGameScalarFieldEnum
    having?: MultiplayerGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MultiplayerGameCountAggregateInputType | true
    _avg?: MultiplayerGameAvgAggregateInputType
    _sum?: MultiplayerGameSumAggregateInputType
    _min?: MultiplayerGameMinAggregateInputType
    _max?: MultiplayerGameMaxAggregateInputType
  }

  export type MultiplayerGameGroupByOutputType = {
    id: string
    bet: number
    thinkingTime: number
    status: $Enums.GameStatus
    createdBy: string
    winnerId: string | null
    createdAt: Date
    startedAt: Date | null
    finishedAt: Date | null
    _count: MultiplayerGameCountAggregateOutputType | null
    _avg: MultiplayerGameAvgAggregateOutputType | null
    _sum: MultiplayerGameSumAggregateOutputType | null
    _min: MultiplayerGameMinAggregateOutputType | null
    _max: MultiplayerGameMaxAggregateOutputType | null
  }

  type GetMultiplayerGameGroupByPayload<T extends MultiplayerGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MultiplayerGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MultiplayerGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MultiplayerGameGroupByOutputType[P]>
            : GetScalarType<T[P], MultiplayerGameGroupByOutputType[P]>
        }
      >
    >


  export type MultiplayerGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bet?: boolean
    thinkingTime?: boolean
    status?: boolean
    createdBy?: boolean
    winnerId?: boolean
    createdAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    players?: boolean | MultiplayerGame$playersArgs<ExtArgs>
    _count?: boolean | MultiplayerGameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["multiplayerGame"]>



  export type MultiplayerGameSelectScalar = {
    id?: boolean
    bet?: boolean
    thinkingTime?: boolean
    status?: boolean
    createdBy?: boolean
    winnerId?: boolean
    createdAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
  }

  export type MultiplayerGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bet" | "thinkingTime" | "status" | "createdBy" | "winnerId" | "createdAt" | "startedAt" | "finishedAt", ExtArgs["result"]["multiplayerGame"]>
  export type MultiplayerGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    players?: boolean | MultiplayerGame$playersArgs<ExtArgs>
    _count?: boolean | MultiplayerGameCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MultiplayerGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MultiplayerGame"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      players: Prisma.$MultiplayerParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bet: number
      thinkingTime: number
      status: $Enums.GameStatus
      createdBy: string
      winnerId: string | null
      createdAt: Date
      startedAt: Date | null
      finishedAt: Date | null
    }, ExtArgs["result"]["multiplayerGame"]>
    composites: {}
  }

  type MultiplayerGameGetPayload<S extends boolean | null | undefined | MultiplayerGameDefaultArgs> = $Result.GetResult<Prisma.$MultiplayerGamePayload, S>

  type MultiplayerGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MultiplayerGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MultiplayerGameCountAggregateInputType | true
    }

  export interface MultiplayerGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MultiplayerGame'], meta: { name: 'MultiplayerGame' } }
    /**
     * Find zero or one MultiplayerGame that matches the filter.
     * @param {MultiplayerGameFindUniqueArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MultiplayerGameFindUniqueArgs>(args: SelectSubset<T, MultiplayerGameFindUniqueArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MultiplayerGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MultiplayerGameFindUniqueOrThrowArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MultiplayerGameFindUniqueOrThrowArgs>(args: SelectSubset<T, MultiplayerGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MultiplayerGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameFindFirstArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MultiplayerGameFindFirstArgs>(args?: SelectSubset<T, MultiplayerGameFindFirstArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MultiplayerGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameFindFirstOrThrowArgs} args - Arguments to find a MultiplayerGame
     * @example
     * // Get one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MultiplayerGameFindFirstOrThrowArgs>(args?: SelectSubset<T, MultiplayerGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MultiplayerGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MultiplayerGames
     * const multiplayerGames = await prisma.multiplayerGame.findMany()
     * 
     * // Get first 10 MultiplayerGames
     * const multiplayerGames = await prisma.multiplayerGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const multiplayerGameWithIdOnly = await prisma.multiplayerGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MultiplayerGameFindManyArgs>(args?: SelectSubset<T, MultiplayerGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MultiplayerGame.
     * @param {MultiplayerGameCreateArgs} args - Arguments to create a MultiplayerGame.
     * @example
     * // Create one MultiplayerGame
     * const MultiplayerGame = await prisma.multiplayerGame.create({
     *   data: {
     *     // ... data to create a MultiplayerGame
     *   }
     * })
     * 
     */
    create<T extends MultiplayerGameCreateArgs>(args: SelectSubset<T, MultiplayerGameCreateArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MultiplayerGames.
     * @param {MultiplayerGameCreateManyArgs} args - Arguments to create many MultiplayerGames.
     * @example
     * // Create many MultiplayerGames
     * const multiplayerGame = await prisma.multiplayerGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MultiplayerGameCreateManyArgs>(args?: SelectSubset<T, MultiplayerGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MultiplayerGame.
     * @param {MultiplayerGameDeleteArgs} args - Arguments to delete one MultiplayerGame.
     * @example
     * // Delete one MultiplayerGame
     * const MultiplayerGame = await prisma.multiplayerGame.delete({
     *   where: {
     *     // ... filter to delete one MultiplayerGame
     *   }
     * })
     * 
     */
    delete<T extends MultiplayerGameDeleteArgs>(args: SelectSubset<T, MultiplayerGameDeleteArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MultiplayerGame.
     * @param {MultiplayerGameUpdateArgs} args - Arguments to update one MultiplayerGame.
     * @example
     * // Update one MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MultiplayerGameUpdateArgs>(args: SelectSubset<T, MultiplayerGameUpdateArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MultiplayerGames.
     * @param {MultiplayerGameDeleteManyArgs} args - Arguments to filter MultiplayerGames to delete.
     * @example
     * // Delete a few MultiplayerGames
     * const { count } = await prisma.multiplayerGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MultiplayerGameDeleteManyArgs>(args?: SelectSubset<T, MultiplayerGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MultiplayerGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MultiplayerGames
     * const multiplayerGame = await prisma.multiplayerGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MultiplayerGameUpdateManyArgs>(args: SelectSubset<T, MultiplayerGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MultiplayerGame.
     * @param {MultiplayerGameUpsertArgs} args - Arguments to update or create a MultiplayerGame.
     * @example
     * // Update or create a MultiplayerGame
     * const multiplayerGame = await prisma.multiplayerGame.upsert({
     *   create: {
     *     // ... data to create a MultiplayerGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MultiplayerGame we want to update
     *   }
     * })
     */
    upsert<T extends MultiplayerGameUpsertArgs>(args: SelectSubset<T, MultiplayerGameUpsertArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MultiplayerGames that matches the filter.
     * @param {MultiplayerGameFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const multiplayerGame = await prisma.multiplayerGame.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MultiplayerGameFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MultiplayerGame.
     * @param {MultiplayerGameAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const multiplayerGame = await prisma.multiplayerGame.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MultiplayerGameAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MultiplayerGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameCountArgs} args - Arguments to filter MultiplayerGames to count.
     * @example
     * // Count the number of MultiplayerGames
     * const count = await prisma.multiplayerGame.count({
     *   where: {
     *     // ... the filter for the MultiplayerGames we want to count
     *   }
     * })
    **/
    count<T extends MultiplayerGameCountArgs>(
      args?: Subset<T, MultiplayerGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MultiplayerGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MultiplayerGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MultiplayerGameAggregateArgs>(args: Subset<T, MultiplayerGameAggregateArgs>): Prisma.PrismaPromise<GetMultiplayerGameAggregateType<T>>

    /**
     * Group by MultiplayerGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerGameGroupByArgs} args - Group by arguments.
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
      T extends MultiplayerGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MultiplayerGameGroupByArgs['orderBy'] }
        : { orderBy?: MultiplayerGameGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MultiplayerGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMultiplayerGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MultiplayerGame model
   */
  readonly fields: MultiplayerGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MultiplayerGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MultiplayerGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    players<T extends MultiplayerGame$playersArgs<ExtArgs> = {}>(args?: Subset<T, MultiplayerGame$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MultiplayerGame model
   */
  interface MultiplayerGameFieldRefs {
    readonly id: FieldRef<"MultiplayerGame", 'String'>
    readonly bet: FieldRef<"MultiplayerGame", 'Int'>
    readonly thinkingTime: FieldRef<"MultiplayerGame", 'Int'>
    readonly status: FieldRef<"MultiplayerGame", 'GameStatus'>
    readonly createdBy: FieldRef<"MultiplayerGame", 'String'>
    readonly winnerId: FieldRef<"MultiplayerGame", 'String'>
    readonly createdAt: FieldRef<"MultiplayerGame", 'DateTime'>
    readonly startedAt: FieldRef<"MultiplayerGame", 'DateTime'>
    readonly finishedAt: FieldRef<"MultiplayerGame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MultiplayerGame findUnique
   */
  export type MultiplayerGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame findUniqueOrThrow
   */
  export type MultiplayerGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame findFirst
   */
  export type MultiplayerGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MultiplayerGames.
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MultiplayerGames.
     */
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * MultiplayerGame findFirstOrThrow
   */
  export type MultiplayerGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerGame to fetch.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MultiplayerGames.
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MultiplayerGames.
     */
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * MultiplayerGame findMany
   */
  export type MultiplayerGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerGames to fetch.
     */
    where?: MultiplayerGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerGames to fetch.
     */
    orderBy?: MultiplayerGameOrderByWithRelationInput | MultiplayerGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MultiplayerGames.
     */
    cursor?: MultiplayerGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerGames.
     */
    skip?: number
    distinct?: MultiplayerGameScalarFieldEnum | MultiplayerGameScalarFieldEnum[]
  }

  /**
   * MultiplayerGame create
   */
  export type MultiplayerGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * The data needed to create a MultiplayerGame.
     */
    data: XOR<MultiplayerGameCreateInput, MultiplayerGameUncheckedCreateInput>
  }

  /**
   * MultiplayerGame createMany
   */
  export type MultiplayerGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MultiplayerGames.
     */
    data: MultiplayerGameCreateManyInput | MultiplayerGameCreateManyInput[]
  }

  /**
   * MultiplayerGame update
   */
  export type MultiplayerGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * The data needed to update a MultiplayerGame.
     */
    data: XOR<MultiplayerGameUpdateInput, MultiplayerGameUncheckedUpdateInput>
    /**
     * Choose, which MultiplayerGame to update.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame updateMany
   */
  export type MultiplayerGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MultiplayerGames.
     */
    data: XOR<MultiplayerGameUpdateManyMutationInput, MultiplayerGameUncheckedUpdateManyInput>
    /**
     * Filter which MultiplayerGames to update
     */
    where?: MultiplayerGameWhereInput
    /**
     * Limit how many MultiplayerGames to update.
     */
    limit?: number
  }

  /**
   * MultiplayerGame upsert
   */
  export type MultiplayerGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * The filter to search for the MultiplayerGame to update in case it exists.
     */
    where: MultiplayerGameWhereUniqueInput
    /**
     * In case the MultiplayerGame found by the `where` argument doesn't exist, create a new MultiplayerGame with this data.
     */
    create: XOR<MultiplayerGameCreateInput, MultiplayerGameUncheckedCreateInput>
    /**
     * In case the MultiplayerGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MultiplayerGameUpdateInput, MultiplayerGameUncheckedUpdateInput>
  }

  /**
   * MultiplayerGame delete
   */
  export type MultiplayerGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
    /**
     * Filter which MultiplayerGame to delete.
     */
    where: MultiplayerGameWhereUniqueInput
  }

  /**
   * MultiplayerGame deleteMany
   */
  export type MultiplayerGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MultiplayerGames to delete
     */
    where?: MultiplayerGameWhereInput
    /**
     * Limit how many MultiplayerGames to delete.
     */
    limit?: number
  }

  /**
   * MultiplayerGame findRaw
   */
  export type MultiplayerGameFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MultiplayerGame aggregateRaw
   */
  export type MultiplayerGameAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MultiplayerGame.players
   */
  export type MultiplayerGame$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    where?: MultiplayerParticipantWhereInput
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    cursor?: MultiplayerParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MultiplayerParticipantScalarFieldEnum | MultiplayerParticipantScalarFieldEnum[]
  }

  /**
   * MultiplayerGame without action
   */
  export type MultiplayerGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerGame
     */
    select?: MultiplayerGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerGame
     */
    omit?: MultiplayerGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerGameInclude<ExtArgs> | null
  }


  /**
   * Model MultiplayerParticipant
   */

  export type AggregateMultiplayerParticipant = {
    _count: MultiplayerParticipantCountAggregateOutputType | null
    _avg: MultiplayerParticipantAvgAggregateOutputType | null
    _sum: MultiplayerParticipantSumAggregateOutputType | null
    _min: MultiplayerParticipantMinAggregateOutputType | null
    _max: MultiplayerParticipantMaxAggregateOutputType | null
  }

  export type MultiplayerParticipantAvgAggregateOutputType = {
    generatedNumber: number | null
    balanceChange: number | null
  }

  export type MultiplayerParticipantSumAggregateOutputType = {
    generatedNumber: number | null
    balanceChange: number | null
  }

  export type MultiplayerParticipantMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    playerId: string | null
    generatedNumber: number | null
    playedAt: Date | null
    isWinner: boolean | null
    balanceChange: number | null
    joinedAt: Date | null
    transactionId: string | null
  }

  export type MultiplayerParticipantMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    playerId: string | null
    generatedNumber: number | null
    playedAt: Date | null
    isWinner: boolean | null
    balanceChange: number | null
    joinedAt: Date | null
    transactionId: string | null
  }

  export type MultiplayerParticipantCountAggregateOutputType = {
    id: number
    gameId: number
    playerId: number
    generatedNumber: number
    playedAt: number
    isWinner: number
    balanceChange: number
    joinedAt: number
    transactionId: number
    _all: number
  }


  export type MultiplayerParticipantAvgAggregateInputType = {
    generatedNumber?: true
    balanceChange?: true
  }

  export type MultiplayerParticipantSumAggregateInputType = {
    generatedNumber?: true
    balanceChange?: true
  }

  export type MultiplayerParticipantMinAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    generatedNumber?: true
    playedAt?: true
    isWinner?: true
    balanceChange?: true
    joinedAt?: true
    transactionId?: true
  }

  export type MultiplayerParticipantMaxAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    generatedNumber?: true
    playedAt?: true
    isWinner?: true
    balanceChange?: true
    joinedAt?: true
    transactionId?: true
  }

  export type MultiplayerParticipantCountAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    generatedNumber?: true
    playedAt?: true
    isWinner?: true
    balanceChange?: true
    joinedAt?: true
    transactionId?: true
    _all?: true
  }

  export type MultiplayerParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MultiplayerParticipant to aggregate.
     */
    where?: MultiplayerParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerParticipants to fetch.
     */
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MultiplayerParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MultiplayerParticipants
    **/
    _count?: true | MultiplayerParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MultiplayerParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MultiplayerParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MultiplayerParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MultiplayerParticipantMaxAggregateInputType
  }

  export type GetMultiplayerParticipantAggregateType<T extends MultiplayerParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateMultiplayerParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMultiplayerParticipant[P]>
      : GetScalarType<T[P], AggregateMultiplayerParticipant[P]>
  }




  export type MultiplayerParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultiplayerParticipantWhereInput
    orderBy?: MultiplayerParticipantOrderByWithAggregationInput | MultiplayerParticipantOrderByWithAggregationInput[]
    by: MultiplayerParticipantScalarFieldEnum[] | MultiplayerParticipantScalarFieldEnum
    having?: MultiplayerParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MultiplayerParticipantCountAggregateInputType | true
    _avg?: MultiplayerParticipantAvgAggregateInputType
    _sum?: MultiplayerParticipantSumAggregateInputType
    _min?: MultiplayerParticipantMinAggregateInputType
    _max?: MultiplayerParticipantMaxAggregateInputType
  }

  export type MultiplayerParticipantGroupByOutputType = {
    id: string
    gameId: string
    playerId: string
    generatedNumber: number | null
    playedAt: Date | null
    isWinner: boolean
    balanceChange: number
    joinedAt: Date
    transactionId: string | null
    _count: MultiplayerParticipantCountAggregateOutputType | null
    _avg: MultiplayerParticipantAvgAggregateOutputType | null
    _sum: MultiplayerParticipantSumAggregateOutputType | null
    _min: MultiplayerParticipantMinAggregateOutputType | null
    _max: MultiplayerParticipantMaxAggregateOutputType | null
  }

  type GetMultiplayerParticipantGroupByPayload<T extends MultiplayerParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MultiplayerParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MultiplayerParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MultiplayerParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], MultiplayerParticipantGroupByOutputType[P]>
        }
      >
    >


  export type MultiplayerParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    generatedNumber?: boolean
    playedAt?: boolean
    isWinner?: boolean
    balanceChange?: boolean
    joinedAt?: boolean
    transactionId?: boolean
    game?: boolean | MultiplayerGameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
    transaction?: boolean | MultiplayerParticipant$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["multiplayerParticipant"]>



  export type MultiplayerParticipantSelectScalar = {
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    generatedNumber?: boolean
    playedAt?: boolean
    isWinner?: boolean
    balanceChange?: boolean
    joinedAt?: boolean
    transactionId?: boolean
  }

  export type MultiplayerParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "playerId" | "generatedNumber" | "playedAt" | "isWinner" | "balanceChange" | "joinedAt" | "transactionId", ExtArgs["result"]["multiplayerParticipant"]>
  export type MultiplayerParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | MultiplayerGameDefaultArgs<ExtArgs>
    player?: boolean | UserDefaultArgs<ExtArgs>
    transaction?: boolean | MultiplayerParticipant$transactionArgs<ExtArgs>
  }

  export type $MultiplayerParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MultiplayerParticipant"
    objects: {
      game: Prisma.$MultiplayerGamePayload<ExtArgs>
      player: Prisma.$UserPayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      playerId: string
      generatedNumber: number | null
      playedAt: Date | null
      isWinner: boolean
      balanceChange: number
      joinedAt: Date
      transactionId: string | null
    }, ExtArgs["result"]["multiplayerParticipant"]>
    composites: {}
  }

  type MultiplayerParticipantGetPayload<S extends boolean | null | undefined | MultiplayerParticipantDefaultArgs> = $Result.GetResult<Prisma.$MultiplayerParticipantPayload, S>

  type MultiplayerParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MultiplayerParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MultiplayerParticipantCountAggregateInputType | true
    }

  export interface MultiplayerParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MultiplayerParticipant'], meta: { name: 'MultiplayerParticipant' } }
    /**
     * Find zero or one MultiplayerParticipant that matches the filter.
     * @param {MultiplayerParticipantFindUniqueArgs} args - Arguments to find a MultiplayerParticipant
     * @example
     * // Get one MultiplayerParticipant
     * const multiplayerParticipant = await prisma.multiplayerParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MultiplayerParticipantFindUniqueArgs>(args: SelectSubset<T, MultiplayerParticipantFindUniqueArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MultiplayerParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MultiplayerParticipantFindUniqueOrThrowArgs} args - Arguments to find a MultiplayerParticipant
     * @example
     * // Get one MultiplayerParticipant
     * const multiplayerParticipant = await prisma.multiplayerParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MultiplayerParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, MultiplayerParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MultiplayerParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantFindFirstArgs} args - Arguments to find a MultiplayerParticipant
     * @example
     * // Get one MultiplayerParticipant
     * const multiplayerParticipant = await prisma.multiplayerParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MultiplayerParticipantFindFirstArgs>(args?: SelectSubset<T, MultiplayerParticipantFindFirstArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MultiplayerParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantFindFirstOrThrowArgs} args - Arguments to find a MultiplayerParticipant
     * @example
     * // Get one MultiplayerParticipant
     * const multiplayerParticipant = await prisma.multiplayerParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MultiplayerParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, MultiplayerParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MultiplayerParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MultiplayerParticipants
     * const multiplayerParticipants = await prisma.multiplayerParticipant.findMany()
     * 
     * // Get first 10 MultiplayerParticipants
     * const multiplayerParticipants = await prisma.multiplayerParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const multiplayerParticipantWithIdOnly = await prisma.multiplayerParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MultiplayerParticipantFindManyArgs>(args?: SelectSubset<T, MultiplayerParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MultiplayerParticipant.
     * @param {MultiplayerParticipantCreateArgs} args - Arguments to create a MultiplayerParticipant.
     * @example
     * // Create one MultiplayerParticipant
     * const MultiplayerParticipant = await prisma.multiplayerParticipant.create({
     *   data: {
     *     // ... data to create a MultiplayerParticipant
     *   }
     * })
     * 
     */
    create<T extends MultiplayerParticipantCreateArgs>(args: SelectSubset<T, MultiplayerParticipantCreateArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MultiplayerParticipants.
     * @param {MultiplayerParticipantCreateManyArgs} args - Arguments to create many MultiplayerParticipants.
     * @example
     * // Create many MultiplayerParticipants
     * const multiplayerParticipant = await prisma.multiplayerParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MultiplayerParticipantCreateManyArgs>(args?: SelectSubset<T, MultiplayerParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MultiplayerParticipant.
     * @param {MultiplayerParticipantDeleteArgs} args - Arguments to delete one MultiplayerParticipant.
     * @example
     * // Delete one MultiplayerParticipant
     * const MultiplayerParticipant = await prisma.multiplayerParticipant.delete({
     *   where: {
     *     // ... filter to delete one MultiplayerParticipant
     *   }
     * })
     * 
     */
    delete<T extends MultiplayerParticipantDeleteArgs>(args: SelectSubset<T, MultiplayerParticipantDeleteArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MultiplayerParticipant.
     * @param {MultiplayerParticipantUpdateArgs} args - Arguments to update one MultiplayerParticipant.
     * @example
     * // Update one MultiplayerParticipant
     * const multiplayerParticipant = await prisma.multiplayerParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MultiplayerParticipantUpdateArgs>(args: SelectSubset<T, MultiplayerParticipantUpdateArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MultiplayerParticipants.
     * @param {MultiplayerParticipantDeleteManyArgs} args - Arguments to filter MultiplayerParticipants to delete.
     * @example
     * // Delete a few MultiplayerParticipants
     * const { count } = await prisma.multiplayerParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MultiplayerParticipantDeleteManyArgs>(args?: SelectSubset<T, MultiplayerParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MultiplayerParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MultiplayerParticipants
     * const multiplayerParticipant = await prisma.multiplayerParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MultiplayerParticipantUpdateManyArgs>(args: SelectSubset<T, MultiplayerParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MultiplayerParticipant.
     * @param {MultiplayerParticipantUpsertArgs} args - Arguments to update or create a MultiplayerParticipant.
     * @example
     * // Update or create a MultiplayerParticipant
     * const multiplayerParticipant = await prisma.multiplayerParticipant.upsert({
     *   create: {
     *     // ... data to create a MultiplayerParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MultiplayerParticipant we want to update
     *   }
     * })
     */
    upsert<T extends MultiplayerParticipantUpsertArgs>(args: SelectSubset<T, MultiplayerParticipantUpsertArgs<ExtArgs>>): Prisma__MultiplayerParticipantClient<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MultiplayerParticipants that matches the filter.
     * @param {MultiplayerParticipantFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const multiplayerParticipant = await prisma.multiplayerParticipant.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MultiplayerParticipantFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MultiplayerParticipant.
     * @param {MultiplayerParticipantAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const multiplayerParticipant = await prisma.multiplayerParticipant.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MultiplayerParticipantAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MultiplayerParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantCountArgs} args - Arguments to filter MultiplayerParticipants to count.
     * @example
     * // Count the number of MultiplayerParticipants
     * const count = await prisma.multiplayerParticipant.count({
     *   where: {
     *     // ... the filter for the MultiplayerParticipants we want to count
     *   }
     * })
    **/
    count<T extends MultiplayerParticipantCountArgs>(
      args?: Subset<T, MultiplayerParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MultiplayerParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MultiplayerParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MultiplayerParticipantAggregateArgs>(args: Subset<T, MultiplayerParticipantAggregateArgs>): Prisma.PrismaPromise<GetMultiplayerParticipantAggregateType<T>>

    /**
     * Group by MultiplayerParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultiplayerParticipantGroupByArgs} args - Group by arguments.
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
      T extends MultiplayerParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MultiplayerParticipantGroupByArgs['orderBy'] }
        : { orderBy?: MultiplayerParticipantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MultiplayerParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMultiplayerParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MultiplayerParticipant model
   */
  readonly fields: MultiplayerParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MultiplayerParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MultiplayerParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends MultiplayerGameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MultiplayerGameDefaultArgs<ExtArgs>>): Prisma__MultiplayerGameClient<$Result.GetResult<Prisma.$MultiplayerGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    player<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends MultiplayerParticipant$transactionArgs<ExtArgs> = {}>(args?: Subset<T, MultiplayerParticipant$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MultiplayerParticipant model
   */
  interface MultiplayerParticipantFieldRefs {
    readonly id: FieldRef<"MultiplayerParticipant", 'String'>
    readonly gameId: FieldRef<"MultiplayerParticipant", 'String'>
    readonly playerId: FieldRef<"MultiplayerParticipant", 'String'>
    readonly generatedNumber: FieldRef<"MultiplayerParticipant", 'Int'>
    readonly playedAt: FieldRef<"MultiplayerParticipant", 'DateTime'>
    readonly isWinner: FieldRef<"MultiplayerParticipant", 'Boolean'>
    readonly balanceChange: FieldRef<"MultiplayerParticipant", 'Int'>
    readonly joinedAt: FieldRef<"MultiplayerParticipant", 'DateTime'>
    readonly transactionId: FieldRef<"MultiplayerParticipant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MultiplayerParticipant findUnique
   */
  export type MultiplayerParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerParticipant to fetch.
     */
    where: MultiplayerParticipantWhereUniqueInput
  }

  /**
   * MultiplayerParticipant findUniqueOrThrow
   */
  export type MultiplayerParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerParticipant to fetch.
     */
    where: MultiplayerParticipantWhereUniqueInput
  }

  /**
   * MultiplayerParticipant findFirst
   */
  export type MultiplayerParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerParticipant to fetch.
     */
    where?: MultiplayerParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerParticipants to fetch.
     */
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MultiplayerParticipants.
     */
    cursor?: MultiplayerParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MultiplayerParticipants.
     */
    distinct?: MultiplayerParticipantScalarFieldEnum | MultiplayerParticipantScalarFieldEnum[]
  }

  /**
   * MultiplayerParticipant findFirstOrThrow
   */
  export type MultiplayerParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerParticipant to fetch.
     */
    where?: MultiplayerParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerParticipants to fetch.
     */
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MultiplayerParticipants.
     */
    cursor?: MultiplayerParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MultiplayerParticipants.
     */
    distinct?: MultiplayerParticipantScalarFieldEnum | MultiplayerParticipantScalarFieldEnum[]
  }

  /**
   * MultiplayerParticipant findMany
   */
  export type MultiplayerParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MultiplayerParticipants to fetch.
     */
    where?: MultiplayerParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MultiplayerParticipants to fetch.
     */
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MultiplayerParticipants.
     */
    cursor?: MultiplayerParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MultiplayerParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MultiplayerParticipants.
     */
    skip?: number
    distinct?: MultiplayerParticipantScalarFieldEnum | MultiplayerParticipantScalarFieldEnum[]
  }

  /**
   * MultiplayerParticipant create
   */
  export type MultiplayerParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a MultiplayerParticipant.
     */
    data: XOR<MultiplayerParticipantCreateInput, MultiplayerParticipantUncheckedCreateInput>
  }

  /**
   * MultiplayerParticipant createMany
   */
  export type MultiplayerParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MultiplayerParticipants.
     */
    data: MultiplayerParticipantCreateManyInput | MultiplayerParticipantCreateManyInput[]
  }

  /**
   * MultiplayerParticipant update
   */
  export type MultiplayerParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a MultiplayerParticipant.
     */
    data: XOR<MultiplayerParticipantUpdateInput, MultiplayerParticipantUncheckedUpdateInput>
    /**
     * Choose, which MultiplayerParticipant to update.
     */
    where: MultiplayerParticipantWhereUniqueInput
  }

  /**
   * MultiplayerParticipant updateMany
   */
  export type MultiplayerParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MultiplayerParticipants.
     */
    data: XOR<MultiplayerParticipantUpdateManyMutationInput, MultiplayerParticipantUncheckedUpdateManyInput>
    /**
     * Filter which MultiplayerParticipants to update
     */
    where?: MultiplayerParticipantWhereInput
    /**
     * Limit how many MultiplayerParticipants to update.
     */
    limit?: number
  }

  /**
   * MultiplayerParticipant upsert
   */
  export type MultiplayerParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the MultiplayerParticipant to update in case it exists.
     */
    where: MultiplayerParticipantWhereUniqueInput
    /**
     * In case the MultiplayerParticipant found by the `where` argument doesn't exist, create a new MultiplayerParticipant with this data.
     */
    create: XOR<MultiplayerParticipantCreateInput, MultiplayerParticipantUncheckedCreateInput>
    /**
     * In case the MultiplayerParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MultiplayerParticipantUpdateInput, MultiplayerParticipantUncheckedUpdateInput>
  }

  /**
   * MultiplayerParticipant delete
   */
  export type MultiplayerParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    /**
     * Filter which MultiplayerParticipant to delete.
     */
    where: MultiplayerParticipantWhereUniqueInput
  }

  /**
   * MultiplayerParticipant deleteMany
   */
  export type MultiplayerParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MultiplayerParticipants to delete
     */
    where?: MultiplayerParticipantWhereInput
    /**
     * Limit how many MultiplayerParticipants to delete.
     */
    limit?: number
  }

  /**
   * MultiplayerParticipant findRaw
   */
  export type MultiplayerParticipantFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MultiplayerParticipant aggregateRaw
   */
  export type MultiplayerParticipantAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MultiplayerParticipant.transaction
   */
  export type MultiplayerParticipant$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * MultiplayerParticipant without action
   */
  export type MultiplayerParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.TransactionType | null
    amount: number | null
    description: string | null
    balanceAfter: number | null
    reference: string | null
    status: $Enums.TransactionStatus | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.TransactionType | null
    amount: number | null
    description: string | null
    balanceAfter: number | null
    reference: string | null
    status: $Enums.TransactionStatus | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    amount: number
    description: number
    balanceAfter: number
    reference: number
    status: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    description?: true
    balanceAfter?: true
    reference?: true
    status?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    description?: true
    balanceAfter?: true
    reference?: true
    status?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    description?: true
    balanceAfter?: true
    reference?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference: string | null
    status: $Enums.TransactionStatus
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    balanceAfter?: boolean
    reference?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    soloGames?: boolean | Transaction$soloGamesArgs<ExtArgs>
    multiplayerParticipants?: boolean | Transaction$multiplayerParticipantsArgs<ExtArgs>
    recharge?: boolean | Transaction$rechargeArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>



  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    balanceAfter?: boolean
    reference?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "amount" | "description" | "balanceAfter" | "reference" | "status" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    soloGames?: boolean | Transaction$soloGamesArgs<ExtArgs>
    multiplayerParticipants?: boolean | Transaction$multiplayerParticipantsArgs<ExtArgs>
    recharge?: boolean | Transaction$rechargeArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      soloGames: Prisma.$SoloGamePayload<ExtArgs>[]
      multiplayerParticipants: Prisma.$MultiplayerParticipantPayload<ExtArgs>[]
      recharge: Prisma.$RechargePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.TransactionType
      amount: number
      description: string
      balanceAfter: number
      reference: string | null
      status: $Enums.TransactionStatus
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * @param {TransactionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const transaction = await prisma.transaction.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TransactionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Transaction.
     * @param {TransactionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const transaction = await prisma.transaction.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TransactionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    soloGames<T extends Transaction$soloGamesArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$soloGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoloGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    multiplayerParticipants<T extends Transaction$multiplayerParticipantsArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$multiplayerParticipantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultiplayerParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recharge<T extends Transaction$rechargeArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$rechargeArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Int'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly balanceAfter: FieldRef<"Transaction", 'Int'>
    readonly reference: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'TransactionStatus'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction findRaw
   */
  export type TransactionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Transaction aggregateRaw
   */
  export type TransactionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Transaction.soloGames
   */
  export type Transaction$soloGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoloGame
     */
    select?: SoloGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoloGame
     */
    omit?: SoloGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoloGameInclude<ExtArgs> | null
    where?: SoloGameWhereInput
    orderBy?: SoloGameOrderByWithRelationInput | SoloGameOrderByWithRelationInput[]
    cursor?: SoloGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SoloGameScalarFieldEnum | SoloGameScalarFieldEnum[]
  }

  /**
   * Transaction.multiplayerParticipants
   */
  export type Transaction$multiplayerParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MultiplayerParticipant
     */
    select?: MultiplayerParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MultiplayerParticipant
     */
    omit?: MultiplayerParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultiplayerParticipantInclude<ExtArgs> | null
    where?: MultiplayerParticipantWhereInput
    orderBy?: MultiplayerParticipantOrderByWithRelationInput | MultiplayerParticipantOrderByWithRelationInput[]
    cursor?: MultiplayerParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MultiplayerParticipantScalarFieldEnum | MultiplayerParticipantScalarFieldEnum[]
  }

  /**
   * Transaction.recharge
   */
  export type Transaction$rechargeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    where?: RechargeWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Recharge
   */

  export type AggregateRecharge = {
    _count: RechargeCountAggregateOutputType | null
    _avg: RechargeAvgAggregateOutputType | null
    _sum: RechargeSumAggregateOutputType | null
    _min: RechargeMinAggregateOutputType | null
    _max: RechargeMaxAggregateOutputType | null
  }

  export type RechargeAvgAggregateOutputType = {
    amount: number | null
  }

  export type RechargeSumAggregateOutputType = {
    amount: number | null
  }

  export type RechargeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    method: $Enums.PaymentMethod | null
    status: $Enums.RechargeStatus | null
    transactionId: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type RechargeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    method: $Enums.PaymentMethod | null
    status: $Enums.RechargeStatus | null
    transactionId: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type RechargeCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    method: number
    status: number
    transactionId: number
    billingData: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type RechargeAvgAggregateInputType = {
    amount?: true
  }

  export type RechargeSumAggregateInputType = {
    amount?: true
  }

  export type RechargeMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    method?: true
    status?: true
    transactionId?: true
    createdAt?: true
    completedAt?: true
  }

  export type RechargeMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    method?: true
    status?: true
    transactionId?: true
    createdAt?: true
    completedAt?: true
  }

  export type RechargeCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    method?: true
    status?: true
    transactionId?: true
    billingData?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type RechargeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recharge to aggregate.
     */
    where?: RechargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recharges to fetch.
     */
    orderBy?: RechargeOrderByWithRelationInput | RechargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RechargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recharges
    **/
    _count?: true | RechargeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RechargeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RechargeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RechargeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RechargeMaxAggregateInputType
  }

  export type GetRechargeAggregateType<T extends RechargeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecharge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecharge[P]>
      : GetScalarType<T[P], AggregateRecharge[P]>
  }




  export type RechargeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RechargeWhereInput
    orderBy?: RechargeOrderByWithAggregationInput | RechargeOrderByWithAggregationInput[]
    by: RechargeScalarFieldEnum[] | RechargeScalarFieldEnum
    having?: RechargeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RechargeCountAggregateInputType | true
    _avg?: RechargeAvgAggregateInputType
    _sum?: RechargeSumAggregateInputType
    _min?: RechargeMinAggregateInputType
    _max?: RechargeMaxAggregateInputType
  }

  export type RechargeGroupByOutputType = {
    id: string
    userId: string
    amount: number
    method: $Enums.PaymentMethod
    status: $Enums.RechargeStatus
    transactionId: string
    billingData: JsonValue
    createdAt: Date
    completedAt: Date | null
    _count: RechargeCountAggregateOutputType | null
    _avg: RechargeAvgAggregateOutputType | null
    _sum: RechargeSumAggregateOutputType | null
    _min: RechargeMinAggregateOutputType | null
    _max: RechargeMaxAggregateOutputType | null
  }

  type GetRechargeGroupByPayload<T extends RechargeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RechargeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RechargeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RechargeGroupByOutputType[P]>
            : GetScalarType<T[P], RechargeGroupByOutputType[P]>
        }
      >
    >


  export type RechargeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    method?: boolean
    status?: boolean
    transactionId?: boolean
    billingData?: boolean
    createdAt?: boolean
    completedAt?: boolean
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recharge"]>



  export type RechargeSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    method?: boolean
    status?: boolean
    transactionId?: boolean
    billingData?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type RechargeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "method" | "status" | "transactionId" | "billingData" | "createdAt" | "completedAt", ExtArgs["result"]["recharge"]>
  export type RechargeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | TransactionDefaultArgs<ExtArgs>
  }

  export type $RechargePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recharge"
    objects: {
      transaction: Prisma.$TransactionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      method: $Enums.PaymentMethod
      status: $Enums.RechargeStatus
      transactionId: string
      billingData: Prisma.JsonValue
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["recharge"]>
    composites: {}
  }

  type RechargeGetPayload<S extends boolean | null | undefined | RechargeDefaultArgs> = $Result.GetResult<Prisma.$RechargePayload, S>

  type RechargeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RechargeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RechargeCountAggregateInputType | true
    }

  export interface RechargeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recharge'], meta: { name: 'Recharge' } }
    /**
     * Find zero or one Recharge that matches the filter.
     * @param {RechargeFindUniqueArgs} args - Arguments to find a Recharge
     * @example
     * // Get one Recharge
     * const recharge = await prisma.recharge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RechargeFindUniqueArgs>(args: SelectSubset<T, RechargeFindUniqueArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recharge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RechargeFindUniqueOrThrowArgs} args - Arguments to find a Recharge
     * @example
     * // Get one Recharge
     * const recharge = await prisma.recharge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RechargeFindUniqueOrThrowArgs>(args: SelectSubset<T, RechargeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recharge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeFindFirstArgs} args - Arguments to find a Recharge
     * @example
     * // Get one Recharge
     * const recharge = await prisma.recharge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RechargeFindFirstArgs>(args?: SelectSubset<T, RechargeFindFirstArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recharge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeFindFirstOrThrowArgs} args - Arguments to find a Recharge
     * @example
     * // Get one Recharge
     * const recharge = await prisma.recharge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RechargeFindFirstOrThrowArgs>(args?: SelectSubset<T, RechargeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recharges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recharges
     * const recharges = await prisma.recharge.findMany()
     * 
     * // Get first 10 Recharges
     * const recharges = await prisma.recharge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rechargeWithIdOnly = await prisma.recharge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RechargeFindManyArgs>(args?: SelectSubset<T, RechargeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recharge.
     * @param {RechargeCreateArgs} args - Arguments to create a Recharge.
     * @example
     * // Create one Recharge
     * const Recharge = await prisma.recharge.create({
     *   data: {
     *     // ... data to create a Recharge
     *   }
     * })
     * 
     */
    create<T extends RechargeCreateArgs>(args: SelectSubset<T, RechargeCreateArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recharges.
     * @param {RechargeCreateManyArgs} args - Arguments to create many Recharges.
     * @example
     * // Create many Recharges
     * const recharge = await prisma.recharge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RechargeCreateManyArgs>(args?: SelectSubset<T, RechargeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recharge.
     * @param {RechargeDeleteArgs} args - Arguments to delete one Recharge.
     * @example
     * // Delete one Recharge
     * const Recharge = await prisma.recharge.delete({
     *   where: {
     *     // ... filter to delete one Recharge
     *   }
     * })
     * 
     */
    delete<T extends RechargeDeleteArgs>(args: SelectSubset<T, RechargeDeleteArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recharge.
     * @param {RechargeUpdateArgs} args - Arguments to update one Recharge.
     * @example
     * // Update one Recharge
     * const recharge = await prisma.recharge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RechargeUpdateArgs>(args: SelectSubset<T, RechargeUpdateArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recharges.
     * @param {RechargeDeleteManyArgs} args - Arguments to filter Recharges to delete.
     * @example
     * // Delete a few Recharges
     * const { count } = await prisma.recharge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RechargeDeleteManyArgs>(args?: SelectSubset<T, RechargeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recharges
     * const recharge = await prisma.recharge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RechargeUpdateManyArgs>(args: SelectSubset<T, RechargeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recharge.
     * @param {RechargeUpsertArgs} args - Arguments to update or create a Recharge.
     * @example
     * // Update or create a Recharge
     * const recharge = await prisma.recharge.upsert({
     *   create: {
     *     // ... data to create a Recharge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recharge we want to update
     *   }
     * })
     */
    upsert<T extends RechargeUpsertArgs>(args: SelectSubset<T, RechargeUpsertArgs<ExtArgs>>): Prisma__RechargeClient<$Result.GetResult<Prisma.$RechargePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recharges that matches the filter.
     * @param {RechargeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const recharge = await prisma.recharge.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: RechargeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Recharge.
     * @param {RechargeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const recharge = await prisma.recharge.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: RechargeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Recharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeCountArgs} args - Arguments to filter Recharges to count.
     * @example
     * // Count the number of Recharges
     * const count = await prisma.recharge.count({
     *   where: {
     *     // ... the filter for the Recharges we want to count
     *   }
     * })
    **/
    count<T extends RechargeCountArgs>(
      args?: Subset<T, RechargeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RechargeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RechargeAggregateArgs>(args: Subset<T, RechargeAggregateArgs>): Prisma.PrismaPromise<GetRechargeAggregateType<T>>

    /**
     * Group by Recharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeGroupByArgs} args - Group by arguments.
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
      T extends RechargeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RechargeGroupByArgs['orderBy'] }
        : { orderBy?: RechargeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RechargeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRechargeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recharge model
   */
  readonly fields: RechargeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recharge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RechargeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends TransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TransactionDefaultArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Recharge model
   */
  interface RechargeFieldRefs {
    readonly id: FieldRef<"Recharge", 'String'>
    readonly userId: FieldRef<"Recharge", 'String'>
    readonly amount: FieldRef<"Recharge", 'Int'>
    readonly method: FieldRef<"Recharge", 'PaymentMethod'>
    readonly status: FieldRef<"Recharge", 'RechargeStatus'>
    readonly transactionId: FieldRef<"Recharge", 'String'>
    readonly billingData: FieldRef<"Recharge", 'Json'>
    readonly createdAt: FieldRef<"Recharge", 'DateTime'>
    readonly completedAt: FieldRef<"Recharge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recharge findUnique
   */
  export type RechargeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * Filter, which Recharge to fetch.
     */
    where: RechargeWhereUniqueInput
  }

  /**
   * Recharge findUniqueOrThrow
   */
  export type RechargeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * Filter, which Recharge to fetch.
     */
    where: RechargeWhereUniqueInput
  }

  /**
   * Recharge findFirst
   */
  export type RechargeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * Filter, which Recharge to fetch.
     */
    where?: RechargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recharges to fetch.
     */
    orderBy?: RechargeOrderByWithRelationInput | RechargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recharges.
     */
    cursor?: RechargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recharges.
     */
    distinct?: RechargeScalarFieldEnum | RechargeScalarFieldEnum[]
  }

  /**
   * Recharge findFirstOrThrow
   */
  export type RechargeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * Filter, which Recharge to fetch.
     */
    where?: RechargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recharges to fetch.
     */
    orderBy?: RechargeOrderByWithRelationInput | RechargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recharges.
     */
    cursor?: RechargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recharges.
     */
    distinct?: RechargeScalarFieldEnum | RechargeScalarFieldEnum[]
  }

  /**
   * Recharge findMany
   */
  export type RechargeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * Filter, which Recharges to fetch.
     */
    where?: RechargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recharges to fetch.
     */
    orderBy?: RechargeOrderByWithRelationInput | RechargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recharges.
     */
    cursor?: RechargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recharges.
     */
    skip?: number
    distinct?: RechargeScalarFieldEnum | RechargeScalarFieldEnum[]
  }

  /**
   * Recharge create
   */
  export type RechargeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * The data needed to create a Recharge.
     */
    data: XOR<RechargeCreateInput, RechargeUncheckedCreateInput>
  }

  /**
   * Recharge createMany
   */
  export type RechargeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recharges.
     */
    data: RechargeCreateManyInput | RechargeCreateManyInput[]
  }

  /**
   * Recharge update
   */
  export type RechargeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * The data needed to update a Recharge.
     */
    data: XOR<RechargeUpdateInput, RechargeUncheckedUpdateInput>
    /**
     * Choose, which Recharge to update.
     */
    where: RechargeWhereUniqueInput
  }

  /**
   * Recharge updateMany
   */
  export type RechargeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recharges.
     */
    data: XOR<RechargeUpdateManyMutationInput, RechargeUncheckedUpdateManyInput>
    /**
     * Filter which Recharges to update
     */
    where?: RechargeWhereInput
    /**
     * Limit how many Recharges to update.
     */
    limit?: number
  }

  /**
   * Recharge upsert
   */
  export type RechargeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * The filter to search for the Recharge to update in case it exists.
     */
    where: RechargeWhereUniqueInput
    /**
     * In case the Recharge found by the `where` argument doesn't exist, create a new Recharge with this data.
     */
    create: XOR<RechargeCreateInput, RechargeUncheckedCreateInput>
    /**
     * In case the Recharge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RechargeUpdateInput, RechargeUncheckedUpdateInput>
  }

  /**
   * Recharge delete
   */
  export type RechargeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
    /**
     * Filter which Recharge to delete.
     */
    where: RechargeWhereUniqueInput
  }

  /**
   * Recharge deleteMany
   */
  export type RechargeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recharges to delete
     */
    where?: RechargeWhereInput
    /**
     * Limit how many Recharges to delete.
     */
    limit?: number
  }

  /**
   * Recharge findRaw
   */
  export type RechargeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Recharge aggregateRaw
   */
  export type RechargeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Recharge without action
   */
  export type RechargeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recharge
     */
    select?: RechargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recharge
     */
    omit?: RechargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RechargeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    phone: 'phone',
    role: 'role',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SoloGameScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    bet: 'bet',
    chosenNumber: 'chosenNumber',
    generatedNumber: 'generatedNumber',
    result: 'result',
    balanceChange: 'balanceChange',
    multiplier: 'multiplier',
    playedAt: 'playedAt',
    transactionId: 'transactionId'
  };

  export type SoloGameScalarFieldEnum = (typeof SoloGameScalarFieldEnum)[keyof typeof SoloGameScalarFieldEnum]


  export const MultiplayerGameScalarFieldEnum: {
    id: 'id',
    bet: 'bet',
    thinkingTime: 'thinkingTime',
    status: 'status',
    createdBy: 'createdBy',
    winnerId: 'winnerId',
    createdAt: 'createdAt',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt'
  };

  export type MultiplayerGameScalarFieldEnum = (typeof MultiplayerGameScalarFieldEnum)[keyof typeof MultiplayerGameScalarFieldEnum]


  export const MultiplayerParticipantScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    playerId: 'playerId',
    generatedNumber: 'generatedNumber',
    playedAt: 'playedAt',
    isWinner: 'isWinner',
    balanceChange: 'balanceChange',
    joinedAt: 'joinedAt',
    transactionId: 'transactionId'
  };

  export type MultiplayerParticipantScalarFieldEnum = (typeof MultiplayerParticipantScalarFieldEnum)[keyof typeof MultiplayerParticipantScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    amount: 'amount',
    description: 'description',
    balanceAfter: 'balanceAfter',
    reference: 'reference',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const RechargeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    method: 'method',
    status: 'status',
    transactionId: 'transactionId',
    billingData: 'billingData',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type RechargeScalarFieldEnum = (typeof RechargeScalarFieldEnum)[keyof typeof RechargeScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SoloGameResult'
   */
  export type EnumSoloGameResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SoloGameResult'>
    


  /**
   * Reference to a field of type 'SoloGameResult[]'
   */
  export type ListEnumSoloGameResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SoloGameResult[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'GameStatus'
   */
  export type EnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus'>
    


  /**
   * Reference to a field of type 'GameStatus[]'
   */
  export type ListEnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'TransactionStatus'
   */
  export type EnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus'>
    


  /**
   * Reference to a field of type 'TransactionStatus[]'
   */
  export type ListEnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'RechargeStatus'
   */
  export type EnumRechargeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RechargeStatus'>
    


  /**
   * Reference to a field of type 'RechargeStatus[]'
   */
  export type ListEnumRechargeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RechargeStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdGames?: MultiplayerGameListRelationFilter
    participations?: MultiplayerParticipantListRelationFilter
    soloGames?: SoloGameListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdGames?: MultiplayerGameOrderByRelationAggregateInput
    participations?: MultiplayerParticipantOrderByRelationAggregateInput
    soloGames?: SoloGameOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdGames?: MultiplayerGameListRelationFilter
    participations?: MultiplayerParticipantListRelationFilter
    soloGames?: SoloGameListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
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
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SoloGameWhereInput = {
    AND?: SoloGameWhereInput | SoloGameWhereInput[]
    OR?: SoloGameWhereInput[]
    NOT?: SoloGameWhereInput | SoloGameWhereInput[]
    id?: StringFilter<"SoloGame"> | string
    userId?: StringFilter<"SoloGame"> | string
    bet?: IntFilter<"SoloGame"> | number
    chosenNumber?: IntFilter<"SoloGame"> | number
    generatedNumber?: IntFilter<"SoloGame"> | number
    result?: EnumSoloGameResultFilter<"SoloGame"> | $Enums.SoloGameResult
    balanceChange?: IntFilter<"SoloGame"> | number
    multiplier?: FloatFilter<"SoloGame"> | number
    playedAt?: DateTimeFilter<"SoloGame"> | Date | string
    transactionId?: StringNullableFilter<"SoloGame"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type SoloGameOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    result?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
    playedAt?: SortOrder
    transactionId?: SortOrder
    user?: UserOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type SoloGameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SoloGameWhereInput | SoloGameWhereInput[]
    OR?: SoloGameWhereInput[]
    NOT?: SoloGameWhereInput | SoloGameWhereInput[]
    userId?: StringFilter<"SoloGame"> | string
    bet?: IntFilter<"SoloGame"> | number
    chosenNumber?: IntFilter<"SoloGame"> | number
    generatedNumber?: IntFilter<"SoloGame"> | number
    result?: EnumSoloGameResultFilter<"SoloGame"> | $Enums.SoloGameResult
    balanceChange?: IntFilter<"SoloGame"> | number
    multiplier?: FloatFilter<"SoloGame"> | number
    playedAt?: DateTimeFilter<"SoloGame"> | Date | string
    transactionId?: StringNullableFilter<"SoloGame"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id">

  export type SoloGameOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    result?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
    playedAt?: SortOrder
    transactionId?: SortOrder
    _count?: SoloGameCountOrderByAggregateInput
    _avg?: SoloGameAvgOrderByAggregateInput
    _max?: SoloGameMaxOrderByAggregateInput
    _min?: SoloGameMinOrderByAggregateInput
    _sum?: SoloGameSumOrderByAggregateInput
  }

  export type SoloGameScalarWhereWithAggregatesInput = {
    AND?: SoloGameScalarWhereWithAggregatesInput | SoloGameScalarWhereWithAggregatesInput[]
    OR?: SoloGameScalarWhereWithAggregatesInput[]
    NOT?: SoloGameScalarWhereWithAggregatesInput | SoloGameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SoloGame"> | string
    userId?: StringWithAggregatesFilter<"SoloGame"> | string
    bet?: IntWithAggregatesFilter<"SoloGame"> | number
    chosenNumber?: IntWithAggregatesFilter<"SoloGame"> | number
    generatedNumber?: IntWithAggregatesFilter<"SoloGame"> | number
    result?: EnumSoloGameResultWithAggregatesFilter<"SoloGame"> | $Enums.SoloGameResult
    balanceChange?: IntWithAggregatesFilter<"SoloGame"> | number
    multiplier?: FloatWithAggregatesFilter<"SoloGame"> | number
    playedAt?: DateTimeWithAggregatesFilter<"SoloGame"> | Date | string
    transactionId?: StringNullableWithAggregatesFilter<"SoloGame"> | string | null
  }

  export type MultiplayerGameWhereInput = {
    AND?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    OR?: MultiplayerGameWhereInput[]
    NOT?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    id?: StringFilter<"MultiplayerGame"> | string
    bet?: IntFilter<"MultiplayerGame"> | number
    thinkingTime?: IntFilter<"MultiplayerGame"> | number
    status?: EnumGameStatusFilter<"MultiplayerGame"> | $Enums.GameStatus
    createdBy?: StringFilter<"MultiplayerGame"> | string
    winnerId?: StringNullableFilter<"MultiplayerGame"> | string | null
    createdAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
    startedAt?: DateTimeNullableFilter<"MultiplayerGame"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"MultiplayerGame"> | Date | string | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    players?: MultiplayerParticipantListRelationFilter
  }

  export type MultiplayerGameOrderByWithRelationInput = {
    id?: SortOrder
    bet?: SortOrder
    thinkingTime?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    players?: MultiplayerParticipantOrderByRelationAggregateInput
  }

  export type MultiplayerGameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    OR?: MultiplayerGameWhereInput[]
    NOT?: MultiplayerGameWhereInput | MultiplayerGameWhereInput[]
    bet?: IntFilter<"MultiplayerGame"> | number
    thinkingTime?: IntFilter<"MultiplayerGame"> | number
    status?: EnumGameStatusFilter<"MultiplayerGame"> | $Enums.GameStatus
    createdBy?: StringFilter<"MultiplayerGame"> | string
    winnerId?: StringNullableFilter<"MultiplayerGame"> | string | null
    createdAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
    startedAt?: DateTimeNullableFilter<"MultiplayerGame"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"MultiplayerGame"> | Date | string | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    players?: MultiplayerParticipantListRelationFilter
  }, "id">

  export type MultiplayerGameOrderByWithAggregationInput = {
    id?: SortOrder
    bet?: SortOrder
    thinkingTime?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    _count?: MultiplayerGameCountOrderByAggregateInput
    _avg?: MultiplayerGameAvgOrderByAggregateInput
    _max?: MultiplayerGameMaxOrderByAggregateInput
    _min?: MultiplayerGameMinOrderByAggregateInput
    _sum?: MultiplayerGameSumOrderByAggregateInput
  }

  export type MultiplayerGameScalarWhereWithAggregatesInput = {
    AND?: MultiplayerGameScalarWhereWithAggregatesInput | MultiplayerGameScalarWhereWithAggregatesInput[]
    OR?: MultiplayerGameScalarWhereWithAggregatesInput[]
    NOT?: MultiplayerGameScalarWhereWithAggregatesInput | MultiplayerGameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    bet?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    thinkingTime?: IntWithAggregatesFilter<"MultiplayerGame"> | number
    status?: EnumGameStatusWithAggregatesFilter<"MultiplayerGame"> | $Enums.GameStatus
    createdBy?: StringWithAggregatesFilter<"MultiplayerGame"> | string
    winnerId?: StringNullableWithAggregatesFilter<"MultiplayerGame"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MultiplayerGame"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"MultiplayerGame"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"MultiplayerGame"> | Date | string | null
  }

  export type MultiplayerParticipantWhereInput = {
    AND?: MultiplayerParticipantWhereInput | MultiplayerParticipantWhereInput[]
    OR?: MultiplayerParticipantWhereInput[]
    NOT?: MultiplayerParticipantWhereInput | MultiplayerParticipantWhereInput[]
    id?: StringFilter<"MultiplayerParticipant"> | string
    gameId?: StringFilter<"MultiplayerParticipant"> | string
    playerId?: StringFilter<"MultiplayerParticipant"> | string
    generatedNumber?: IntNullableFilter<"MultiplayerParticipant"> | number | null
    playedAt?: DateTimeNullableFilter<"MultiplayerParticipant"> | Date | string | null
    isWinner?: BoolFilter<"MultiplayerParticipant"> | boolean
    balanceChange?: IntFilter<"MultiplayerParticipant"> | number
    joinedAt?: DateTimeFilter<"MultiplayerParticipant"> | Date | string
    transactionId?: StringNullableFilter<"MultiplayerParticipant"> | string | null
    game?: XOR<MultiplayerGameScalarRelationFilter, MultiplayerGameWhereInput>
    player?: XOR<UserScalarRelationFilter, UserWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type MultiplayerParticipantOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    generatedNumber?: SortOrder
    playedAt?: SortOrder
    isWinner?: SortOrder
    balanceChange?: SortOrder
    joinedAt?: SortOrder
    transactionId?: SortOrder
    game?: MultiplayerGameOrderByWithRelationInput
    player?: UserOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type MultiplayerParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gameId_playerId?: MultiplayerParticipantGameIdPlayerIdCompoundUniqueInput
    AND?: MultiplayerParticipantWhereInput | MultiplayerParticipantWhereInput[]
    OR?: MultiplayerParticipantWhereInput[]
    NOT?: MultiplayerParticipantWhereInput | MultiplayerParticipantWhereInput[]
    gameId?: StringFilter<"MultiplayerParticipant"> | string
    playerId?: StringFilter<"MultiplayerParticipant"> | string
    generatedNumber?: IntNullableFilter<"MultiplayerParticipant"> | number | null
    playedAt?: DateTimeNullableFilter<"MultiplayerParticipant"> | Date | string | null
    isWinner?: BoolFilter<"MultiplayerParticipant"> | boolean
    balanceChange?: IntFilter<"MultiplayerParticipant"> | number
    joinedAt?: DateTimeFilter<"MultiplayerParticipant"> | Date | string
    transactionId?: StringNullableFilter<"MultiplayerParticipant"> | string | null
    game?: XOR<MultiplayerGameScalarRelationFilter, MultiplayerGameWhereInput>
    player?: XOR<UserScalarRelationFilter, UserWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id" | "gameId_playerId">

  export type MultiplayerParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    generatedNumber?: SortOrder
    playedAt?: SortOrder
    isWinner?: SortOrder
    balanceChange?: SortOrder
    joinedAt?: SortOrder
    transactionId?: SortOrder
    _count?: MultiplayerParticipantCountOrderByAggregateInput
    _avg?: MultiplayerParticipantAvgOrderByAggregateInput
    _max?: MultiplayerParticipantMaxOrderByAggregateInput
    _min?: MultiplayerParticipantMinOrderByAggregateInput
    _sum?: MultiplayerParticipantSumOrderByAggregateInput
  }

  export type MultiplayerParticipantScalarWhereWithAggregatesInput = {
    AND?: MultiplayerParticipantScalarWhereWithAggregatesInput | MultiplayerParticipantScalarWhereWithAggregatesInput[]
    OR?: MultiplayerParticipantScalarWhereWithAggregatesInput[]
    NOT?: MultiplayerParticipantScalarWhereWithAggregatesInput | MultiplayerParticipantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MultiplayerParticipant"> | string
    gameId?: StringWithAggregatesFilter<"MultiplayerParticipant"> | string
    playerId?: StringWithAggregatesFilter<"MultiplayerParticipant"> | string
    generatedNumber?: IntNullableWithAggregatesFilter<"MultiplayerParticipant"> | number | null
    playedAt?: DateTimeNullableWithAggregatesFilter<"MultiplayerParticipant"> | Date | string | null
    isWinner?: BoolWithAggregatesFilter<"MultiplayerParticipant"> | boolean
    balanceChange?: IntWithAggregatesFilter<"MultiplayerParticipant"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"MultiplayerParticipant"> | Date | string
    transactionId?: StringNullableWithAggregatesFilter<"MultiplayerParticipant"> | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: IntFilter<"Transaction"> | number
    description?: StringFilter<"Transaction"> | string
    balanceAfter?: IntFilter<"Transaction"> | number
    reference?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    soloGames?: SoloGameListRelationFilter
    multiplayerParticipants?: MultiplayerParticipantListRelationFilter
    recharge?: XOR<RechargeNullableScalarRelationFilter, RechargeWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    soloGames?: SoloGameOrderByRelationAggregateInput
    multiplayerParticipants?: MultiplayerParticipantOrderByRelationAggregateInput
    recharge?: RechargeOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: IntFilter<"Transaction"> | number
    description?: StringFilter<"Transaction"> | string
    balanceAfter?: IntFilter<"Transaction"> | number
    reference?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    soloGames?: SoloGameListRelationFilter
    multiplayerParticipants?: MultiplayerParticipantListRelationFilter
    recharge?: XOR<RechargeNullableScalarRelationFilter, RechargeWhereInput> | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: IntWithAggregatesFilter<"Transaction"> | number
    description?: StringWithAggregatesFilter<"Transaction"> | string
    balanceAfter?: IntWithAggregatesFilter<"Transaction"> | number
    reference?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusWithAggregatesFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type RechargeWhereInput = {
    AND?: RechargeWhereInput | RechargeWhereInput[]
    OR?: RechargeWhereInput[]
    NOT?: RechargeWhereInput | RechargeWhereInput[]
    id?: StringFilter<"Recharge"> | string
    userId?: StringFilter<"Recharge"> | string
    amount?: IntFilter<"Recharge"> | number
    method?: EnumPaymentMethodFilter<"Recharge"> | $Enums.PaymentMethod
    status?: EnumRechargeStatusFilter<"Recharge"> | $Enums.RechargeStatus
    transactionId?: StringFilter<"Recharge"> | string
    billingData?: JsonFilter<"Recharge">
    createdAt?: DateTimeFilter<"Recharge"> | Date | string
    completedAt?: DateTimeNullableFilter<"Recharge"> | Date | string | null
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
  }

  export type RechargeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    billingData?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    transaction?: TransactionOrderByWithRelationInput
  }

  export type RechargeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: RechargeWhereInput | RechargeWhereInput[]
    OR?: RechargeWhereInput[]
    NOT?: RechargeWhereInput | RechargeWhereInput[]
    userId?: StringFilter<"Recharge"> | string
    amount?: IntFilter<"Recharge"> | number
    method?: EnumPaymentMethodFilter<"Recharge"> | $Enums.PaymentMethod
    status?: EnumRechargeStatusFilter<"Recharge"> | $Enums.RechargeStatus
    billingData?: JsonFilter<"Recharge">
    createdAt?: DateTimeFilter<"Recharge"> | Date | string
    completedAt?: DateTimeNullableFilter<"Recharge"> | Date | string | null
    transaction?: XOR<TransactionScalarRelationFilter, TransactionWhereInput>
  }, "id" | "transactionId">

  export type RechargeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    billingData?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    _count?: RechargeCountOrderByAggregateInput
    _avg?: RechargeAvgOrderByAggregateInput
    _max?: RechargeMaxOrderByAggregateInput
    _min?: RechargeMinOrderByAggregateInput
    _sum?: RechargeSumOrderByAggregateInput
  }

  export type RechargeScalarWhereWithAggregatesInput = {
    AND?: RechargeScalarWhereWithAggregatesInput | RechargeScalarWhereWithAggregatesInput[]
    OR?: RechargeScalarWhereWithAggregatesInput[]
    NOT?: RechargeScalarWhereWithAggregatesInput | RechargeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recharge"> | string
    userId?: StringWithAggregatesFilter<"Recharge"> | string
    amount?: IntWithAggregatesFilter<"Recharge"> | number
    method?: EnumPaymentMethodWithAggregatesFilter<"Recharge"> | $Enums.PaymentMethod
    status?: EnumRechargeStatusWithAggregatesFilter<"Recharge"> | $Enums.RechargeStatus
    transactionId?: StringWithAggregatesFilter<"Recharge"> | string
    billingData?: JsonWithAggregatesFilter<"Recharge">
    createdAt?: DateTimeWithAggregatesFilter<"Recharge"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Recharge"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameCreateNestedManyWithoutCreatorInput
    participations?: MultiplayerParticipantCreateNestedManyWithoutPlayerInput
    soloGames?: SoloGameCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameUncheckedCreateNestedManyWithoutCreatorInput
    participations?: MultiplayerParticipantUncheckedCreateNestedManyWithoutPlayerInput
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUpdateManyWithoutCreatorNestedInput
    participations?: MultiplayerParticipantUpdateManyWithoutPlayerNestedInput
    soloGames?: SoloGameUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUncheckedUpdateManyWithoutCreatorNestedInput
    participations?: MultiplayerParticipantUncheckedUpdateManyWithoutPlayerNestedInput
    soloGames?: SoloGameUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoloGameCreateInput = {
    id?: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    user: UserCreateNestedOneWithoutSoloGamesInput
    transaction?: TransactionCreateNestedOneWithoutSoloGamesInput
  }

  export type SoloGameUncheckedCreateInput = {
    id?: string
    userId: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    transactionId?: string | null
  }

  export type SoloGameUpdateInput = {
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSoloGamesNestedInput
    transaction?: TransactionUpdateOneWithoutSoloGamesNestedInput
  }

  export type SoloGameUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SoloGameCreateManyInput = {
    id?: string
    userId: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    transactionId?: string | null
  }

  export type SoloGameUpdateManyMutationInput = {
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoloGameUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultiplayerGameCreateInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedGamesInput
    players?: MultiplayerParticipantCreateNestedManyWithoutGameInput
  }

  export type MultiplayerGameUncheckedCreateInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    createdBy: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    players?: MultiplayerParticipantUncheckedCreateNestedManyWithoutGameInput
  }

  export type MultiplayerGameUpdateInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedGamesNestedInput
    players?: MultiplayerParticipantUpdateManyWithoutGameNestedInput
  }

  export type MultiplayerGameUncheckedUpdateInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    players?: MultiplayerParticipantUncheckedUpdateManyWithoutGameNestedInput
  }

  export type MultiplayerGameCreateManyInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    createdBy: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
  }

  export type MultiplayerGameUpdateManyMutationInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MultiplayerGameUncheckedUpdateManyInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MultiplayerParticipantCreateInput = {
    id?: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    game: MultiplayerGameCreateNestedOneWithoutPlayersInput
    player: UserCreateNestedOneWithoutParticipationsInput
    transaction?: TransactionCreateNestedOneWithoutMultiplayerParticipantsInput
  }

  export type MultiplayerParticipantUncheckedCreateInput = {
    id?: string
    gameId: string
    playerId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    transactionId?: string | null
  }

  export type MultiplayerParticipantUpdateInput = {
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: MultiplayerGameUpdateOneRequiredWithoutPlayersNestedInput
    player?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    transaction?: TransactionUpdateOneWithoutMultiplayerParticipantsNestedInput
  }

  export type MultiplayerParticipantUncheckedUpdateInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultiplayerParticipantCreateManyInput = {
    id?: string
    gameId: string
    playerId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    transactionId?: string | null
  }

  export type MultiplayerParticipantUpdateManyMutationInput = {
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerParticipantUncheckedUpdateManyInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    soloGames?: SoloGameCreateNestedManyWithoutTransactionInput
    multiplayerParticipants?: MultiplayerParticipantCreateNestedManyWithoutTransactionInput
    recharge?: RechargeCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutTransactionInput
    multiplayerParticipants?: MultiplayerParticipantUncheckedCreateNestedManyWithoutTransactionInput
    recharge?: RechargeUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    soloGames?: SoloGameUpdateManyWithoutTransactionNestedInput
    multiplayerParticipants?: MultiplayerParticipantUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    soloGames?: SoloGameUncheckedUpdateManyWithoutTransactionNestedInput
    multiplayerParticipants?: MultiplayerParticipantUncheckedUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RechargeCreateInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.PaymentMethod
    status?: $Enums.RechargeStatus
    billingData: InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    transaction: TransactionCreateNestedOneWithoutRechargeInput
  }

  export type RechargeUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.PaymentMethod
    status?: $Enums.RechargeStatus
    transactionId: string
    billingData: InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type RechargeUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumRechargeStatusFieldUpdateOperationsInput | $Enums.RechargeStatus
    billingData?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transaction?: TransactionUpdateOneRequiredWithoutRechargeNestedInput
  }

  export type RechargeUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumRechargeStatusFieldUpdateOperationsInput | $Enums.RechargeStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    billingData?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RechargeCreateManyInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.PaymentMethod
    status?: $Enums.RechargeStatus
    transactionId: string
    billingData: InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type RechargeUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumRechargeStatusFieldUpdateOperationsInput | $Enums.RechargeStatus
    billingData?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RechargeUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumRechargeStatusFieldUpdateOperationsInput | $Enums.RechargeStatus
    transactionId?: StringFieldUpdateOperationsInput | string
    billingData?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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
    isSet?: boolean
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

  export type MultiplayerGameListRelationFilter = {
    every?: MultiplayerGameWhereInput
    some?: MultiplayerGameWhereInput
    none?: MultiplayerGameWhereInput
  }

  export type MultiplayerParticipantListRelationFilter = {
    every?: MultiplayerParticipantWhereInput
    some?: MultiplayerParticipantWhereInput
    none?: MultiplayerParticipantWhereInput
  }

  export type SoloGameListRelationFilter = {
    every?: SoloGameWhereInput
    some?: SoloGameWhereInput
    none?: SoloGameWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type MultiplayerGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MultiplayerParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SoloGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    refreshToken?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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
    isSet?: boolean
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

  export type EnumSoloGameResultFilter<$PrismaModel = never> = {
    equals?: $Enums.SoloGameResult | EnumSoloGameResultFieldRefInput<$PrismaModel>
    in?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    not?: NestedEnumSoloGameResultFilter<$PrismaModel> | $Enums.SoloGameResult
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TransactionNullableScalarRelationFilter = {
    is?: TransactionWhereInput | null
    isNot?: TransactionWhereInput | null
  }

  export type SoloGameCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    result?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
    playedAt?: SortOrder
    transactionId?: SortOrder
  }

  export type SoloGameAvgOrderByAggregateInput = {
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
  }

  export type SoloGameMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    result?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
    playedAt?: SortOrder
    transactionId?: SortOrder
  }

  export type SoloGameMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    result?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
    playedAt?: SortOrder
    transactionId?: SortOrder
  }

  export type SoloGameSumOrderByAggregateInput = {
    bet?: SortOrder
    chosenNumber?: SortOrder
    generatedNumber?: SortOrder
    balanceChange?: SortOrder
    multiplier?: SortOrder
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

  export type EnumSoloGameResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SoloGameResult | EnumSoloGameResultFieldRefInput<$PrismaModel>
    in?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    not?: NestedEnumSoloGameResultWithAggregatesFilter<$PrismaModel> | $Enums.SoloGameResult
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSoloGameResultFilter<$PrismaModel>
    _max?: NestedEnumSoloGameResultFilter<$PrismaModel>
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

  export type EnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
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
    isSet?: boolean
  }

  export type MultiplayerGameCountOrderByAggregateInput = {
    id?: SortOrder
    bet?: SortOrder
    thinkingTime?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type MultiplayerGameAvgOrderByAggregateInput = {
    bet?: SortOrder
    thinkingTime?: SortOrder
  }

  export type MultiplayerGameMaxOrderByAggregateInput = {
    id?: SortOrder
    bet?: SortOrder
    thinkingTime?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type MultiplayerGameMinOrderByAggregateInput = {
    id?: SortOrder
    bet?: SortOrder
    thinkingTime?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    winnerId?: SortOrder
    createdAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type MultiplayerGameSumOrderByAggregateInput = {
    bet?: SortOrder
    thinkingTime?: SortOrder
  }

  export type EnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
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
    isSet?: boolean
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
    isSet?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MultiplayerGameScalarRelationFilter = {
    is?: MultiplayerGameWhereInput
    isNot?: MultiplayerGameWhereInput
  }

  export type MultiplayerParticipantGameIdPlayerIdCompoundUniqueInput = {
    gameId: string
    playerId: string
  }

  export type MultiplayerParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    generatedNumber?: SortOrder
    playedAt?: SortOrder
    isWinner?: SortOrder
    balanceChange?: SortOrder
    joinedAt?: SortOrder
    transactionId?: SortOrder
  }

  export type MultiplayerParticipantAvgOrderByAggregateInput = {
    generatedNumber?: SortOrder
    balanceChange?: SortOrder
  }

  export type MultiplayerParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    generatedNumber?: SortOrder
    playedAt?: SortOrder
    isWinner?: SortOrder
    balanceChange?: SortOrder
    joinedAt?: SortOrder
    transactionId?: SortOrder
  }

  export type MultiplayerParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    generatedNumber?: SortOrder
    playedAt?: SortOrder
    isWinner?: SortOrder
    balanceChange?: SortOrder
    joinedAt?: SortOrder
    transactionId?: SortOrder
  }

  export type MultiplayerParticipantSumOrderByAggregateInput = {
    generatedNumber?: SortOrder
    balanceChange?: SortOrder
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
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type RechargeNullableScalarRelationFilter = {
    is?: RechargeWhereInput | null
    isNot?: RechargeWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumRechargeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RechargeStatus | EnumRechargeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRechargeStatusFilter<$PrismaModel> | $Enums.RechargeStatus
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type TransactionScalarRelationFilter = {
    is?: TransactionWhereInput
    isNot?: TransactionWhereInput
  }

  export type RechargeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    billingData?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type RechargeAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type RechargeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type RechargeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    method?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type RechargeSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumRechargeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RechargeStatus | EnumRechargeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRechargeStatusWithAggregatesFilter<$PrismaModel> | $Enums.RechargeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRechargeStatusFilter<$PrismaModel>
    _max?: NestedEnumRechargeStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type MultiplayerGameCreateNestedManyWithoutCreatorInput = {
    create?: XOR<MultiplayerGameCreateWithoutCreatorInput, MultiplayerGameUncheckedCreateWithoutCreatorInput> | MultiplayerGameCreateWithoutCreatorInput[] | MultiplayerGameUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MultiplayerGameCreateOrConnectWithoutCreatorInput | MultiplayerGameCreateOrConnectWithoutCreatorInput[]
    createMany?: MultiplayerGameCreateManyCreatorInputEnvelope
    connect?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
  }

  export type MultiplayerParticipantCreateNestedManyWithoutPlayerInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutPlayerInput, MultiplayerParticipantUncheckedCreateWithoutPlayerInput> | MultiplayerParticipantCreateWithoutPlayerInput[] | MultiplayerParticipantUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutPlayerInput | MultiplayerParticipantCreateOrConnectWithoutPlayerInput[]
    createMany?: MultiplayerParticipantCreateManyPlayerInputEnvelope
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
  }

  export type SoloGameCreateNestedManyWithoutUserInput = {
    create?: XOR<SoloGameCreateWithoutUserInput, SoloGameUncheckedCreateWithoutUserInput> | SoloGameCreateWithoutUserInput[] | SoloGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutUserInput | SoloGameCreateOrConnectWithoutUserInput[]
    createMany?: SoloGameCreateManyUserInputEnvelope
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type MultiplayerGameUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<MultiplayerGameCreateWithoutCreatorInput, MultiplayerGameUncheckedCreateWithoutCreatorInput> | MultiplayerGameCreateWithoutCreatorInput[] | MultiplayerGameUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MultiplayerGameCreateOrConnectWithoutCreatorInput | MultiplayerGameCreateOrConnectWithoutCreatorInput[]
    createMany?: MultiplayerGameCreateManyCreatorInputEnvelope
    connect?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
  }

  export type MultiplayerParticipantUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutPlayerInput, MultiplayerParticipantUncheckedCreateWithoutPlayerInput> | MultiplayerParticipantCreateWithoutPlayerInput[] | MultiplayerParticipantUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutPlayerInput | MultiplayerParticipantCreateOrConnectWithoutPlayerInput[]
    createMany?: MultiplayerParticipantCreateManyPlayerInputEnvelope
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
  }

  export type SoloGameUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SoloGameCreateWithoutUserInput, SoloGameUncheckedCreateWithoutUserInput> | SoloGameCreateWithoutUserInput[] | SoloGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutUserInput | SoloGameCreateOrConnectWithoutUserInput[]
    createMany?: SoloGameCreateManyUserInputEnvelope
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MultiplayerGameUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<MultiplayerGameCreateWithoutCreatorInput, MultiplayerGameUncheckedCreateWithoutCreatorInput> | MultiplayerGameCreateWithoutCreatorInput[] | MultiplayerGameUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MultiplayerGameCreateOrConnectWithoutCreatorInput | MultiplayerGameCreateOrConnectWithoutCreatorInput[]
    upsert?: MultiplayerGameUpsertWithWhereUniqueWithoutCreatorInput | MultiplayerGameUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: MultiplayerGameCreateManyCreatorInputEnvelope
    set?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    disconnect?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    delete?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    connect?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    update?: MultiplayerGameUpdateWithWhereUniqueWithoutCreatorInput | MultiplayerGameUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: MultiplayerGameUpdateManyWithWhereWithoutCreatorInput | MultiplayerGameUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: MultiplayerGameScalarWhereInput | MultiplayerGameScalarWhereInput[]
  }

  export type MultiplayerParticipantUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutPlayerInput, MultiplayerParticipantUncheckedCreateWithoutPlayerInput> | MultiplayerParticipantCreateWithoutPlayerInput[] | MultiplayerParticipantUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutPlayerInput | MultiplayerParticipantCreateOrConnectWithoutPlayerInput[]
    upsert?: MultiplayerParticipantUpsertWithWhereUniqueWithoutPlayerInput | MultiplayerParticipantUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: MultiplayerParticipantCreateManyPlayerInputEnvelope
    set?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    disconnect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    delete?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    update?: MultiplayerParticipantUpdateWithWhereUniqueWithoutPlayerInput | MultiplayerParticipantUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: MultiplayerParticipantUpdateManyWithWhereWithoutPlayerInput | MultiplayerParticipantUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
  }

  export type SoloGameUpdateManyWithoutUserNestedInput = {
    create?: XOR<SoloGameCreateWithoutUserInput, SoloGameUncheckedCreateWithoutUserInput> | SoloGameCreateWithoutUserInput[] | SoloGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutUserInput | SoloGameCreateOrConnectWithoutUserInput[]
    upsert?: SoloGameUpsertWithWhereUniqueWithoutUserInput | SoloGameUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SoloGameCreateManyUserInputEnvelope
    set?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    disconnect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    delete?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    update?: SoloGameUpdateWithWhereUniqueWithoutUserInput | SoloGameUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SoloGameUpdateManyWithWhereWithoutUserInput | SoloGameUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SoloGameScalarWhereInput | SoloGameScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type MultiplayerGameUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<MultiplayerGameCreateWithoutCreatorInput, MultiplayerGameUncheckedCreateWithoutCreatorInput> | MultiplayerGameCreateWithoutCreatorInput[] | MultiplayerGameUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: MultiplayerGameCreateOrConnectWithoutCreatorInput | MultiplayerGameCreateOrConnectWithoutCreatorInput[]
    upsert?: MultiplayerGameUpsertWithWhereUniqueWithoutCreatorInput | MultiplayerGameUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: MultiplayerGameCreateManyCreatorInputEnvelope
    set?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    disconnect?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    delete?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    connect?: MultiplayerGameWhereUniqueInput | MultiplayerGameWhereUniqueInput[]
    update?: MultiplayerGameUpdateWithWhereUniqueWithoutCreatorInput | MultiplayerGameUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: MultiplayerGameUpdateManyWithWhereWithoutCreatorInput | MultiplayerGameUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: MultiplayerGameScalarWhereInput | MultiplayerGameScalarWhereInput[]
  }

  export type MultiplayerParticipantUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutPlayerInput, MultiplayerParticipantUncheckedCreateWithoutPlayerInput> | MultiplayerParticipantCreateWithoutPlayerInput[] | MultiplayerParticipantUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutPlayerInput | MultiplayerParticipantCreateOrConnectWithoutPlayerInput[]
    upsert?: MultiplayerParticipantUpsertWithWhereUniqueWithoutPlayerInput | MultiplayerParticipantUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: MultiplayerParticipantCreateManyPlayerInputEnvelope
    set?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    disconnect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    delete?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    update?: MultiplayerParticipantUpdateWithWhereUniqueWithoutPlayerInput | MultiplayerParticipantUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: MultiplayerParticipantUpdateManyWithWhereWithoutPlayerInput | MultiplayerParticipantUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
  }

  export type SoloGameUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SoloGameCreateWithoutUserInput, SoloGameUncheckedCreateWithoutUserInput> | SoloGameCreateWithoutUserInput[] | SoloGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutUserInput | SoloGameCreateOrConnectWithoutUserInput[]
    upsert?: SoloGameUpsertWithWhereUniqueWithoutUserInput | SoloGameUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SoloGameCreateManyUserInputEnvelope
    set?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    disconnect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    delete?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    update?: SoloGameUpdateWithWhereUniqueWithoutUserInput | SoloGameUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SoloGameUpdateManyWithWhereWithoutUserInput | SoloGameUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SoloGameScalarWhereInput | SoloGameScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSoloGamesInput = {
    create?: XOR<UserCreateWithoutSoloGamesInput, UserUncheckedCreateWithoutSoloGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSoloGamesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutSoloGamesInput = {
    create?: XOR<TransactionCreateWithoutSoloGamesInput, TransactionUncheckedCreateWithoutSoloGamesInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutSoloGamesInput
    connect?: TransactionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSoloGameResultFieldUpdateOperationsInput = {
    set?: $Enums.SoloGameResult
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutSoloGamesNestedInput = {
    create?: XOR<UserCreateWithoutSoloGamesInput, UserUncheckedCreateWithoutSoloGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSoloGamesInput
    upsert?: UserUpsertWithoutSoloGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSoloGamesInput, UserUpdateWithoutSoloGamesInput>, UserUncheckedUpdateWithoutSoloGamesInput>
  }

  export type TransactionUpdateOneWithoutSoloGamesNestedInput = {
    create?: XOR<TransactionCreateWithoutSoloGamesInput, TransactionUncheckedCreateWithoutSoloGamesInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutSoloGamesInput
    upsert?: TransactionUpsertWithoutSoloGamesInput
    disconnect?: boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutSoloGamesInput, TransactionUpdateWithoutSoloGamesInput>, TransactionUncheckedUpdateWithoutSoloGamesInput>
  }

  export type UserCreateNestedOneWithoutCreatedGamesInput = {
    create?: XOR<UserCreateWithoutCreatedGamesInput, UserUncheckedCreateWithoutCreatedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedGamesInput
    connect?: UserWhereUniqueInput
  }

  export type MultiplayerParticipantCreateNestedManyWithoutGameInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutGameInput, MultiplayerParticipantUncheckedCreateWithoutGameInput> | MultiplayerParticipantCreateWithoutGameInput[] | MultiplayerParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutGameInput | MultiplayerParticipantCreateOrConnectWithoutGameInput[]
    createMany?: MultiplayerParticipantCreateManyGameInputEnvelope
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
  }

  export type MultiplayerParticipantUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutGameInput, MultiplayerParticipantUncheckedCreateWithoutGameInput> | MultiplayerParticipantCreateWithoutGameInput[] | MultiplayerParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutGameInput | MultiplayerParticipantCreateOrConnectWithoutGameInput[]
    createMany?: MultiplayerParticipantCreateManyGameInputEnvelope
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
  }

  export type EnumGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.GameStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutCreatedGamesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedGamesInput, UserUncheckedCreateWithoutCreatedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedGamesInput
    upsert?: UserUpsertWithoutCreatedGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedGamesInput, UserUpdateWithoutCreatedGamesInput>, UserUncheckedUpdateWithoutCreatedGamesInput>
  }

  export type MultiplayerParticipantUpdateManyWithoutGameNestedInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutGameInput, MultiplayerParticipantUncheckedCreateWithoutGameInput> | MultiplayerParticipantCreateWithoutGameInput[] | MultiplayerParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutGameInput | MultiplayerParticipantCreateOrConnectWithoutGameInput[]
    upsert?: MultiplayerParticipantUpsertWithWhereUniqueWithoutGameInput | MultiplayerParticipantUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: MultiplayerParticipantCreateManyGameInputEnvelope
    set?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    disconnect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    delete?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    update?: MultiplayerParticipantUpdateWithWhereUniqueWithoutGameInput | MultiplayerParticipantUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: MultiplayerParticipantUpdateManyWithWhereWithoutGameInput | MultiplayerParticipantUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
  }

  export type MultiplayerParticipantUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutGameInput, MultiplayerParticipantUncheckedCreateWithoutGameInput> | MultiplayerParticipantCreateWithoutGameInput[] | MultiplayerParticipantUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutGameInput | MultiplayerParticipantCreateOrConnectWithoutGameInput[]
    upsert?: MultiplayerParticipantUpsertWithWhereUniqueWithoutGameInput | MultiplayerParticipantUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: MultiplayerParticipantCreateManyGameInputEnvelope
    set?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    disconnect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    delete?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    update?: MultiplayerParticipantUpdateWithWhereUniqueWithoutGameInput | MultiplayerParticipantUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: MultiplayerParticipantUpdateManyWithWhereWithoutGameInput | MultiplayerParticipantUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
  }

  export type MultiplayerGameCreateNestedOneWithoutPlayersInput = {
    create?: XOR<MultiplayerGameCreateWithoutPlayersInput, MultiplayerGameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: MultiplayerGameCreateOrConnectWithoutPlayersInput
    connect?: MultiplayerGameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutParticipationsInput = {
    create?: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipationsInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutMultiplayerParticipantsInput = {
    create?: XOR<TransactionCreateWithoutMultiplayerParticipantsInput, TransactionUncheckedCreateWithoutMultiplayerParticipantsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutMultiplayerParticipantsInput
    connect?: TransactionWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MultiplayerGameUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<MultiplayerGameCreateWithoutPlayersInput, MultiplayerGameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: MultiplayerGameCreateOrConnectWithoutPlayersInput
    upsert?: MultiplayerGameUpsertWithoutPlayersInput
    connect?: MultiplayerGameWhereUniqueInput
    update?: XOR<XOR<MultiplayerGameUpdateToOneWithWhereWithoutPlayersInput, MultiplayerGameUpdateWithoutPlayersInput>, MultiplayerGameUncheckedUpdateWithoutPlayersInput>
  }

  export type UserUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipationsInput
    upsert?: UserUpsertWithoutParticipationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutParticipationsInput, UserUpdateWithoutParticipationsInput>, UserUncheckedUpdateWithoutParticipationsInput>
  }

  export type TransactionUpdateOneWithoutMultiplayerParticipantsNestedInput = {
    create?: XOR<TransactionCreateWithoutMultiplayerParticipantsInput, TransactionUncheckedCreateWithoutMultiplayerParticipantsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutMultiplayerParticipantsInput
    upsert?: TransactionUpsertWithoutMultiplayerParticipantsInput
    disconnect?: boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutMultiplayerParticipantsInput, TransactionUpdateWithoutMultiplayerParticipantsInput>, TransactionUncheckedUpdateWithoutMultiplayerParticipantsInput>
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type SoloGameCreateNestedManyWithoutTransactionInput = {
    create?: XOR<SoloGameCreateWithoutTransactionInput, SoloGameUncheckedCreateWithoutTransactionInput> | SoloGameCreateWithoutTransactionInput[] | SoloGameUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutTransactionInput | SoloGameCreateOrConnectWithoutTransactionInput[]
    createMany?: SoloGameCreateManyTransactionInputEnvelope
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
  }

  export type MultiplayerParticipantCreateNestedManyWithoutTransactionInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutTransactionInput, MultiplayerParticipantUncheckedCreateWithoutTransactionInput> | MultiplayerParticipantCreateWithoutTransactionInput[] | MultiplayerParticipantUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutTransactionInput | MultiplayerParticipantCreateOrConnectWithoutTransactionInput[]
    createMany?: MultiplayerParticipantCreateManyTransactionInputEnvelope
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
  }

  export type RechargeCreateNestedOneWithoutTransactionInput = {
    create?: XOR<RechargeCreateWithoutTransactionInput, RechargeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: RechargeCreateOrConnectWithoutTransactionInput
    connect?: RechargeWhereUniqueInput
  }

  export type SoloGameUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<SoloGameCreateWithoutTransactionInput, SoloGameUncheckedCreateWithoutTransactionInput> | SoloGameCreateWithoutTransactionInput[] | SoloGameUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutTransactionInput | SoloGameCreateOrConnectWithoutTransactionInput[]
    createMany?: SoloGameCreateManyTransactionInputEnvelope
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
  }

  export type MultiplayerParticipantUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutTransactionInput, MultiplayerParticipantUncheckedCreateWithoutTransactionInput> | MultiplayerParticipantCreateWithoutTransactionInput[] | MultiplayerParticipantUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutTransactionInput | MultiplayerParticipantCreateOrConnectWithoutTransactionInput[]
    createMany?: MultiplayerParticipantCreateManyTransactionInputEnvelope
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
  }

  export type RechargeUncheckedCreateNestedOneWithoutTransactionInput = {
    create?: XOR<RechargeCreateWithoutTransactionInput, RechargeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: RechargeCreateOrConnectWithoutTransactionInput
    connect?: RechargeWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type SoloGameUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<SoloGameCreateWithoutTransactionInput, SoloGameUncheckedCreateWithoutTransactionInput> | SoloGameCreateWithoutTransactionInput[] | SoloGameUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutTransactionInput | SoloGameCreateOrConnectWithoutTransactionInput[]
    upsert?: SoloGameUpsertWithWhereUniqueWithoutTransactionInput | SoloGameUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: SoloGameCreateManyTransactionInputEnvelope
    set?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    disconnect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    delete?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    update?: SoloGameUpdateWithWhereUniqueWithoutTransactionInput | SoloGameUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: SoloGameUpdateManyWithWhereWithoutTransactionInput | SoloGameUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: SoloGameScalarWhereInput | SoloGameScalarWhereInput[]
  }

  export type MultiplayerParticipantUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutTransactionInput, MultiplayerParticipantUncheckedCreateWithoutTransactionInput> | MultiplayerParticipantCreateWithoutTransactionInput[] | MultiplayerParticipantUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutTransactionInput | MultiplayerParticipantCreateOrConnectWithoutTransactionInput[]
    upsert?: MultiplayerParticipantUpsertWithWhereUniqueWithoutTransactionInput | MultiplayerParticipantUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: MultiplayerParticipantCreateManyTransactionInputEnvelope
    set?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    disconnect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    delete?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    update?: MultiplayerParticipantUpdateWithWhereUniqueWithoutTransactionInput | MultiplayerParticipantUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: MultiplayerParticipantUpdateManyWithWhereWithoutTransactionInput | MultiplayerParticipantUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
  }

  export type RechargeUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<RechargeCreateWithoutTransactionInput, RechargeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: RechargeCreateOrConnectWithoutTransactionInput
    upsert?: RechargeUpsertWithoutTransactionInput
    disconnect?: RechargeWhereInput | boolean
    delete?: RechargeWhereInput | boolean
    connect?: RechargeWhereUniqueInput
    update?: XOR<XOR<RechargeUpdateToOneWithWhereWithoutTransactionInput, RechargeUpdateWithoutTransactionInput>, RechargeUncheckedUpdateWithoutTransactionInput>
  }

  export type SoloGameUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<SoloGameCreateWithoutTransactionInput, SoloGameUncheckedCreateWithoutTransactionInput> | SoloGameCreateWithoutTransactionInput[] | SoloGameUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: SoloGameCreateOrConnectWithoutTransactionInput | SoloGameCreateOrConnectWithoutTransactionInput[]
    upsert?: SoloGameUpsertWithWhereUniqueWithoutTransactionInput | SoloGameUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: SoloGameCreateManyTransactionInputEnvelope
    set?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    disconnect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    delete?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    connect?: SoloGameWhereUniqueInput | SoloGameWhereUniqueInput[]
    update?: SoloGameUpdateWithWhereUniqueWithoutTransactionInput | SoloGameUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: SoloGameUpdateManyWithWhereWithoutTransactionInput | SoloGameUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: SoloGameScalarWhereInput | SoloGameScalarWhereInput[]
  }

  export type MultiplayerParticipantUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<MultiplayerParticipantCreateWithoutTransactionInput, MultiplayerParticipantUncheckedCreateWithoutTransactionInput> | MultiplayerParticipantCreateWithoutTransactionInput[] | MultiplayerParticipantUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: MultiplayerParticipantCreateOrConnectWithoutTransactionInput | MultiplayerParticipantCreateOrConnectWithoutTransactionInput[]
    upsert?: MultiplayerParticipantUpsertWithWhereUniqueWithoutTransactionInput | MultiplayerParticipantUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: MultiplayerParticipantCreateManyTransactionInputEnvelope
    set?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    disconnect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    delete?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    connect?: MultiplayerParticipantWhereUniqueInput | MultiplayerParticipantWhereUniqueInput[]
    update?: MultiplayerParticipantUpdateWithWhereUniqueWithoutTransactionInput | MultiplayerParticipantUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: MultiplayerParticipantUpdateManyWithWhereWithoutTransactionInput | MultiplayerParticipantUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
  }

  export type RechargeUncheckedUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<RechargeCreateWithoutTransactionInput, RechargeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: RechargeCreateOrConnectWithoutTransactionInput
    upsert?: RechargeUpsertWithoutTransactionInput
    disconnect?: RechargeWhereInput | boolean
    delete?: RechargeWhereInput | boolean
    connect?: RechargeWhereUniqueInput
    update?: XOR<XOR<RechargeUpdateToOneWithWhereWithoutTransactionInput, RechargeUpdateWithoutTransactionInput>, RechargeUncheckedUpdateWithoutTransactionInput>
  }

  export type TransactionCreateNestedOneWithoutRechargeInput = {
    create?: XOR<TransactionCreateWithoutRechargeInput, TransactionUncheckedCreateWithoutRechargeInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutRechargeInput
    connect?: TransactionWhereUniqueInput
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumRechargeStatusFieldUpdateOperationsInput = {
    set?: $Enums.RechargeStatus
  }

  export type TransactionUpdateOneRequiredWithoutRechargeNestedInput = {
    create?: XOR<TransactionCreateWithoutRechargeInput, TransactionUncheckedCreateWithoutRechargeInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutRechargeInput
    upsert?: TransactionUpsertWithoutRechargeInput
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutRechargeInput, TransactionUpdateWithoutRechargeInput>, TransactionUncheckedUpdateWithoutRechargeInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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
    isSet?: boolean
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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
    isSet?: boolean
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
    isSet?: boolean
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

  export type NestedEnumSoloGameResultFilter<$PrismaModel = never> = {
    equals?: $Enums.SoloGameResult | EnumSoloGameResultFieldRefInput<$PrismaModel>
    in?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    not?: NestedEnumSoloGameResultFilter<$PrismaModel> | $Enums.SoloGameResult
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

  export type NestedEnumSoloGameResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SoloGameResult | EnumSoloGameResultFieldRefInput<$PrismaModel>
    in?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    notIn?: $Enums.SoloGameResult[] | ListEnumSoloGameResultFieldRefInput<$PrismaModel>
    not?: NestedEnumSoloGameResultWithAggregatesFilter<$PrismaModel> | $Enums.SoloGameResult
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSoloGameResultFilter<$PrismaModel>
    _max?: NestedEnumSoloGameResultFilter<$PrismaModel>
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

  export type NestedEnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
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
    isSet?: boolean
  }

  export type NestedEnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
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
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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
    isSet?: boolean
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
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumRechargeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RechargeStatus | EnumRechargeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRechargeStatusFilter<$PrismaModel> | $Enums.RechargeStatus
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumRechargeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RechargeStatus | EnumRechargeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RechargeStatus[] | ListEnumRechargeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRechargeStatusWithAggregatesFilter<$PrismaModel> | $Enums.RechargeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRechargeStatusFilter<$PrismaModel>
    _max?: NestedEnumRechargeStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type MultiplayerGameCreateWithoutCreatorInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    players?: MultiplayerParticipantCreateNestedManyWithoutGameInput
  }

  export type MultiplayerGameUncheckedCreateWithoutCreatorInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    players?: MultiplayerParticipantUncheckedCreateNestedManyWithoutGameInput
  }

  export type MultiplayerGameCreateOrConnectWithoutCreatorInput = {
    where: MultiplayerGameWhereUniqueInput
    create: XOR<MultiplayerGameCreateWithoutCreatorInput, MultiplayerGameUncheckedCreateWithoutCreatorInput>
  }

  export type MultiplayerGameCreateManyCreatorInputEnvelope = {
    data: MultiplayerGameCreateManyCreatorInput | MultiplayerGameCreateManyCreatorInput[]
  }

  export type MultiplayerParticipantCreateWithoutPlayerInput = {
    id?: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    game: MultiplayerGameCreateNestedOneWithoutPlayersInput
    transaction?: TransactionCreateNestedOneWithoutMultiplayerParticipantsInput
  }

  export type MultiplayerParticipantUncheckedCreateWithoutPlayerInput = {
    id?: string
    gameId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    transactionId?: string | null
  }

  export type MultiplayerParticipantCreateOrConnectWithoutPlayerInput = {
    where: MultiplayerParticipantWhereUniqueInput
    create: XOR<MultiplayerParticipantCreateWithoutPlayerInput, MultiplayerParticipantUncheckedCreateWithoutPlayerInput>
  }

  export type MultiplayerParticipantCreateManyPlayerInputEnvelope = {
    data: MultiplayerParticipantCreateManyPlayerInput | MultiplayerParticipantCreateManyPlayerInput[]
  }

  export type SoloGameCreateWithoutUserInput = {
    id?: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    transaction?: TransactionCreateNestedOneWithoutSoloGamesInput
  }

  export type SoloGameUncheckedCreateWithoutUserInput = {
    id?: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    transactionId?: string | null
  }

  export type SoloGameCreateOrConnectWithoutUserInput = {
    where: SoloGameWhereUniqueInput
    create: XOR<SoloGameCreateWithoutUserInput, SoloGameUncheckedCreateWithoutUserInput>
  }

  export type SoloGameCreateManyUserInputEnvelope = {
    data: SoloGameCreateManyUserInput | SoloGameCreateManyUserInput[]
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    soloGames?: SoloGameCreateNestedManyWithoutTransactionInput
    multiplayerParticipants?: MultiplayerParticipantCreateNestedManyWithoutTransactionInput
    recharge?: RechargeCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutTransactionInput
    multiplayerParticipants?: MultiplayerParticipantUncheckedCreateNestedManyWithoutTransactionInput
    recharge?: RechargeUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
  }

  export type MultiplayerGameUpsertWithWhereUniqueWithoutCreatorInput = {
    where: MultiplayerGameWhereUniqueInput
    update: XOR<MultiplayerGameUpdateWithoutCreatorInput, MultiplayerGameUncheckedUpdateWithoutCreatorInput>
    create: XOR<MultiplayerGameCreateWithoutCreatorInput, MultiplayerGameUncheckedCreateWithoutCreatorInput>
  }

  export type MultiplayerGameUpdateWithWhereUniqueWithoutCreatorInput = {
    where: MultiplayerGameWhereUniqueInput
    data: XOR<MultiplayerGameUpdateWithoutCreatorInput, MultiplayerGameUncheckedUpdateWithoutCreatorInput>
  }

  export type MultiplayerGameUpdateManyWithWhereWithoutCreatorInput = {
    where: MultiplayerGameScalarWhereInput
    data: XOR<MultiplayerGameUpdateManyMutationInput, MultiplayerGameUncheckedUpdateManyWithoutCreatorInput>
  }

  export type MultiplayerGameScalarWhereInput = {
    AND?: MultiplayerGameScalarWhereInput | MultiplayerGameScalarWhereInput[]
    OR?: MultiplayerGameScalarWhereInput[]
    NOT?: MultiplayerGameScalarWhereInput | MultiplayerGameScalarWhereInput[]
    id?: StringFilter<"MultiplayerGame"> | string
    bet?: IntFilter<"MultiplayerGame"> | number
    thinkingTime?: IntFilter<"MultiplayerGame"> | number
    status?: EnumGameStatusFilter<"MultiplayerGame"> | $Enums.GameStatus
    createdBy?: StringFilter<"MultiplayerGame"> | string
    winnerId?: StringNullableFilter<"MultiplayerGame"> | string | null
    createdAt?: DateTimeFilter<"MultiplayerGame"> | Date | string
    startedAt?: DateTimeNullableFilter<"MultiplayerGame"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"MultiplayerGame"> | Date | string | null
  }

  export type MultiplayerParticipantUpsertWithWhereUniqueWithoutPlayerInput = {
    where: MultiplayerParticipantWhereUniqueInput
    update: XOR<MultiplayerParticipantUpdateWithoutPlayerInput, MultiplayerParticipantUncheckedUpdateWithoutPlayerInput>
    create: XOR<MultiplayerParticipantCreateWithoutPlayerInput, MultiplayerParticipantUncheckedCreateWithoutPlayerInput>
  }

  export type MultiplayerParticipantUpdateWithWhereUniqueWithoutPlayerInput = {
    where: MultiplayerParticipantWhereUniqueInput
    data: XOR<MultiplayerParticipantUpdateWithoutPlayerInput, MultiplayerParticipantUncheckedUpdateWithoutPlayerInput>
  }

  export type MultiplayerParticipantUpdateManyWithWhereWithoutPlayerInput = {
    where: MultiplayerParticipantScalarWhereInput
    data: XOR<MultiplayerParticipantUpdateManyMutationInput, MultiplayerParticipantUncheckedUpdateManyWithoutPlayerInput>
  }

  export type MultiplayerParticipantScalarWhereInput = {
    AND?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
    OR?: MultiplayerParticipantScalarWhereInput[]
    NOT?: MultiplayerParticipantScalarWhereInput | MultiplayerParticipantScalarWhereInput[]
    id?: StringFilter<"MultiplayerParticipant"> | string
    gameId?: StringFilter<"MultiplayerParticipant"> | string
    playerId?: StringFilter<"MultiplayerParticipant"> | string
    generatedNumber?: IntNullableFilter<"MultiplayerParticipant"> | number | null
    playedAt?: DateTimeNullableFilter<"MultiplayerParticipant"> | Date | string | null
    isWinner?: BoolFilter<"MultiplayerParticipant"> | boolean
    balanceChange?: IntFilter<"MultiplayerParticipant"> | number
    joinedAt?: DateTimeFilter<"MultiplayerParticipant"> | Date | string
    transactionId?: StringNullableFilter<"MultiplayerParticipant"> | string | null
  }

  export type SoloGameUpsertWithWhereUniqueWithoutUserInput = {
    where: SoloGameWhereUniqueInput
    update: XOR<SoloGameUpdateWithoutUserInput, SoloGameUncheckedUpdateWithoutUserInput>
    create: XOR<SoloGameCreateWithoutUserInput, SoloGameUncheckedCreateWithoutUserInput>
  }

  export type SoloGameUpdateWithWhereUniqueWithoutUserInput = {
    where: SoloGameWhereUniqueInput
    data: XOR<SoloGameUpdateWithoutUserInput, SoloGameUncheckedUpdateWithoutUserInput>
  }

  export type SoloGameUpdateManyWithWhereWithoutUserInput = {
    where: SoloGameScalarWhereInput
    data: XOR<SoloGameUpdateManyMutationInput, SoloGameUncheckedUpdateManyWithoutUserInput>
  }

  export type SoloGameScalarWhereInput = {
    AND?: SoloGameScalarWhereInput | SoloGameScalarWhereInput[]
    OR?: SoloGameScalarWhereInput[]
    NOT?: SoloGameScalarWhereInput | SoloGameScalarWhereInput[]
    id?: StringFilter<"SoloGame"> | string
    userId?: StringFilter<"SoloGame"> | string
    bet?: IntFilter<"SoloGame"> | number
    chosenNumber?: IntFilter<"SoloGame"> | number
    generatedNumber?: IntFilter<"SoloGame"> | number
    result?: EnumSoloGameResultFilter<"SoloGame"> | $Enums.SoloGameResult
    balanceChange?: IntFilter<"SoloGame"> | number
    multiplier?: FloatFilter<"SoloGame"> | number
    playedAt?: DateTimeFilter<"SoloGame"> | Date | string
    transactionId?: StringNullableFilter<"SoloGame"> | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: IntFilter<"Transaction"> | number
    description?: StringFilter<"Transaction"> | string
    balanceAfter?: IntFilter<"Transaction"> | number
    reference?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserCreateWithoutSoloGamesInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameCreateNestedManyWithoutCreatorInput
    participations?: MultiplayerParticipantCreateNestedManyWithoutPlayerInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSoloGamesInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameUncheckedCreateNestedManyWithoutCreatorInput
    participations?: MultiplayerParticipantUncheckedCreateNestedManyWithoutPlayerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSoloGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSoloGamesInput, UserUncheckedCreateWithoutSoloGamesInput>
  }

  export type TransactionCreateWithoutSoloGamesInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    multiplayerParticipants?: MultiplayerParticipantCreateNestedManyWithoutTransactionInput
    recharge?: RechargeCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutSoloGamesInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    multiplayerParticipants?: MultiplayerParticipantUncheckedCreateNestedManyWithoutTransactionInput
    recharge?: RechargeUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutSoloGamesInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutSoloGamesInput, TransactionUncheckedCreateWithoutSoloGamesInput>
  }

  export type UserUpsertWithoutSoloGamesInput = {
    update: XOR<UserUpdateWithoutSoloGamesInput, UserUncheckedUpdateWithoutSoloGamesInput>
    create: XOR<UserCreateWithoutSoloGamesInput, UserUncheckedCreateWithoutSoloGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSoloGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSoloGamesInput, UserUncheckedUpdateWithoutSoloGamesInput>
  }

  export type UserUpdateWithoutSoloGamesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUpdateManyWithoutCreatorNestedInput
    participations?: MultiplayerParticipantUpdateManyWithoutPlayerNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSoloGamesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUncheckedUpdateManyWithoutCreatorNestedInput
    participations?: MultiplayerParticipantUncheckedUpdateManyWithoutPlayerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithoutSoloGamesInput = {
    update: XOR<TransactionUpdateWithoutSoloGamesInput, TransactionUncheckedUpdateWithoutSoloGamesInput>
    create: XOR<TransactionCreateWithoutSoloGamesInput, TransactionUncheckedCreateWithoutSoloGamesInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutSoloGamesInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutSoloGamesInput, TransactionUncheckedUpdateWithoutSoloGamesInput>
  }

  export type TransactionUpdateWithoutSoloGamesInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    multiplayerParticipants?: MultiplayerParticipantUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutSoloGamesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    multiplayerParticipants?: MultiplayerParticipantUncheckedUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type UserCreateWithoutCreatedGamesInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: MultiplayerParticipantCreateNestedManyWithoutPlayerInput
    soloGames?: SoloGameCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedGamesInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participations?: MultiplayerParticipantUncheckedCreateNestedManyWithoutPlayerInput
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedGamesInput, UserUncheckedCreateWithoutCreatedGamesInput>
  }

  export type MultiplayerParticipantCreateWithoutGameInput = {
    id?: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    player: UserCreateNestedOneWithoutParticipationsInput
    transaction?: TransactionCreateNestedOneWithoutMultiplayerParticipantsInput
  }

  export type MultiplayerParticipantUncheckedCreateWithoutGameInput = {
    id?: string
    playerId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    transactionId?: string | null
  }

  export type MultiplayerParticipantCreateOrConnectWithoutGameInput = {
    where: MultiplayerParticipantWhereUniqueInput
    create: XOR<MultiplayerParticipantCreateWithoutGameInput, MultiplayerParticipantUncheckedCreateWithoutGameInput>
  }

  export type MultiplayerParticipantCreateManyGameInputEnvelope = {
    data: MultiplayerParticipantCreateManyGameInput | MultiplayerParticipantCreateManyGameInput[]
  }

  export type UserUpsertWithoutCreatedGamesInput = {
    update: XOR<UserUpdateWithoutCreatedGamesInput, UserUncheckedUpdateWithoutCreatedGamesInput>
    create: XOR<UserCreateWithoutCreatedGamesInput, UserUncheckedCreateWithoutCreatedGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedGamesInput, UserUncheckedUpdateWithoutCreatedGamesInput>
  }

  export type UserUpdateWithoutCreatedGamesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: MultiplayerParticipantUpdateManyWithoutPlayerNestedInput
    soloGames?: SoloGameUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedGamesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: MultiplayerParticipantUncheckedUpdateManyWithoutPlayerNestedInput
    soloGames?: SoloGameUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MultiplayerParticipantUpsertWithWhereUniqueWithoutGameInput = {
    where: MultiplayerParticipantWhereUniqueInput
    update: XOR<MultiplayerParticipantUpdateWithoutGameInput, MultiplayerParticipantUncheckedUpdateWithoutGameInput>
    create: XOR<MultiplayerParticipantCreateWithoutGameInput, MultiplayerParticipantUncheckedCreateWithoutGameInput>
  }

  export type MultiplayerParticipantUpdateWithWhereUniqueWithoutGameInput = {
    where: MultiplayerParticipantWhereUniqueInput
    data: XOR<MultiplayerParticipantUpdateWithoutGameInput, MultiplayerParticipantUncheckedUpdateWithoutGameInput>
  }

  export type MultiplayerParticipantUpdateManyWithWhereWithoutGameInput = {
    where: MultiplayerParticipantScalarWhereInput
    data: XOR<MultiplayerParticipantUpdateManyMutationInput, MultiplayerParticipantUncheckedUpdateManyWithoutGameInput>
  }

  export type MultiplayerGameCreateWithoutPlayersInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    creator: UserCreateNestedOneWithoutCreatedGamesInput
  }

  export type MultiplayerGameUncheckedCreateWithoutPlayersInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    createdBy: string
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
  }

  export type MultiplayerGameCreateOrConnectWithoutPlayersInput = {
    where: MultiplayerGameWhereUniqueInput
    create: XOR<MultiplayerGameCreateWithoutPlayersInput, MultiplayerGameUncheckedCreateWithoutPlayersInput>
  }

  export type UserCreateWithoutParticipationsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameCreateNestedManyWithoutCreatorInput
    soloGames?: SoloGameCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutParticipationsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameUncheckedCreateNestedManyWithoutCreatorInput
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutParticipationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
  }

  export type TransactionCreateWithoutMultiplayerParticipantsInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    soloGames?: SoloGameCreateNestedManyWithoutTransactionInput
    recharge?: RechargeCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutMultiplayerParticipantsInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutTransactionInput
    recharge?: RechargeUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutMultiplayerParticipantsInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutMultiplayerParticipantsInput, TransactionUncheckedCreateWithoutMultiplayerParticipantsInput>
  }

  export type MultiplayerGameUpsertWithoutPlayersInput = {
    update: XOR<MultiplayerGameUpdateWithoutPlayersInput, MultiplayerGameUncheckedUpdateWithoutPlayersInput>
    create: XOR<MultiplayerGameCreateWithoutPlayersInput, MultiplayerGameUncheckedCreateWithoutPlayersInput>
    where?: MultiplayerGameWhereInput
  }

  export type MultiplayerGameUpdateToOneWithWhereWithoutPlayersInput = {
    where?: MultiplayerGameWhereInput
    data: XOR<MultiplayerGameUpdateWithoutPlayersInput, MultiplayerGameUncheckedUpdateWithoutPlayersInput>
  }

  export type MultiplayerGameUpdateWithoutPlayersInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneRequiredWithoutCreatedGamesNestedInput
  }

  export type MultiplayerGameUncheckedUpdateWithoutPlayersInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    createdBy?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutParticipationsInput = {
    update: XOR<UserUpdateWithoutParticipationsInput, UserUncheckedUpdateWithoutParticipationsInput>
    create: XOR<UserCreateWithoutParticipationsInput, UserUncheckedCreateWithoutParticipationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutParticipationsInput, UserUncheckedUpdateWithoutParticipationsInput>
  }

  export type UserUpdateWithoutParticipationsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUpdateManyWithoutCreatorNestedInput
    soloGames?: SoloGameUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutParticipationsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUncheckedUpdateManyWithoutCreatorNestedInput
    soloGames?: SoloGameUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithoutMultiplayerParticipantsInput = {
    update: XOR<TransactionUpdateWithoutMultiplayerParticipantsInput, TransactionUncheckedUpdateWithoutMultiplayerParticipantsInput>
    create: XOR<TransactionCreateWithoutMultiplayerParticipantsInput, TransactionUncheckedCreateWithoutMultiplayerParticipantsInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutMultiplayerParticipantsInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutMultiplayerParticipantsInput, TransactionUncheckedUpdateWithoutMultiplayerParticipantsInput>
  }

  export type TransactionUpdateWithoutMultiplayerParticipantsInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    soloGames?: SoloGameUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutMultiplayerParticipantsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    soloGames?: SoloGameUncheckedUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameCreateNestedManyWithoutCreatorInput
    participations?: MultiplayerParticipantCreateNestedManyWithoutPlayerInput
    soloGames?: SoloGameCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone: string
    role?: $Enums.Role
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGames?: MultiplayerGameUncheckedCreateNestedManyWithoutCreatorInput
    participations?: MultiplayerParticipantUncheckedCreateNestedManyWithoutPlayerInput
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type SoloGameCreateWithoutTransactionInput = {
    id?: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    user: UserCreateNestedOneWithoutSoloGamesInput
  }

  export type SoloGameUncheckedCreateWithoutTransactionInput = {
    id?: string
    userId: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
  }

  export type SoloGameCreateOrConnectWithoutTransactionInput = {
    where: SoloGameWhereUniqueInput
    create: XOR<SoloGameCreateWithoutTransactionInput, SoloGameUncheckedCreateWithoutTransactionInput>
  }

  export type SoloGameCreateManyTransactionInputEnvelope = {
    data: SoloGameCreateManyTransactionInput | SoloGameCreateManyTransactionInput[]
  }

  export type MultiplayerParticipantCreateWithoutTransactionInput = {
    id?: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    game: MultiplayerGameCreateNestedOneWithoutPlayersInput
    player: UserCreateNestedOneWithoutParticipationsInput
  }

  export type MultiplayerParticipantUncheckedCreateWithoutTransactionInput = {
    id?: string
    gameId: string
    playerId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
  }

  export type MultiplayerParticipantCreateOrConnectWithoutTransactionInput = {
    where: MultiplayerParticipantWhereUniqueInput
    create: XOR<MultiplayerParticipantCreateWithoutTransactionInput, MultiplayerParticipantUncheckedCreateWithoutTransactionInput>
  }

  export type MultiplayerParticipantCreateManyTransactionInputEnvelope = {
    data: MultiplayerParticipantCreateManyTransactionInput | MultiplayerParticipantCreateManyTransactionInput[]
  }

  export type RechargeCreateWithoutTransactionInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.PaymentMethod
    status?: $Enums.RechargeStatus
    billingData: InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type RechargeUncheckedCreateWithoutTransactionInput = {
    id?: string
    userId: string
    amount: number
    method: $Enums.PaymentMethod
    status?: $Enums.RechargeStatus
    billingData: InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type RechargeCreateOrConnectWithoutTransactionInput = {
    where: RechargeWhereUniqueInput
    create: XOR<RechargeCreateWithoutTransactionInput, RechargeUncheckedCreateWithoutTransactionInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUpdateManyWithoutCreatorNestedInput
    participations?: MultiplayerParticipantUpdateManyWithoutPlayerNestedInput
    soloGames?: SoloGameUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGames?: MultiplayerGameUncheckedUpdateManyWithoutCreatorNestedInput
    participations?: MultiplayerParticipantUncheckedUpdateManyWithoutPlayerNestedInput
    soloGames?: SoloGameUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SoloGameUpsertWithWhereUniqueWithoutTransactionInput = {
    where: SoloGameWhereUniqueInput
    update: XOR<SoloGameUpdateWithoutTransactionInput, SoloGameUncheckedUpdateWithoutTransactionInput>
    create: XOR<SoloGameCreateWithoutTransactionInput, SoloGameUncheckedCreateWithoutTransactionInput>
  }

  export type SoloGameUpdateWithWhereUniqueWithoutTransactionInput = {
    where: SoloGameWhereUniqueInput
    data: XOR<SoloGameUpdateWithoutTransactionInput, SoloGameUncheckedUpdateWithoutTransactionInput>
  }

  export type SoloGameUpdateManyWithWhereWithoutTransactionInput = {
    where: SoloGameScalarWhereInput
    data: XOR<SoloGameUpdateManyMutationInput, SoloGameUncheckedUpdateManyWithoutTransactionInput>
  }

  export type MultiplayerParticipantUpsertWithWhereUniqueWithoutTransactionInput = {
    where: MultiplayerParticipantWhereUniqueInput
    update: XOR<MultiplayerParticipantUpdateWithoutTransactionInput, MultiplayerParticipantUncheckedUpdateWithoutTransactionInput>
    create: XOR<MultiplayerParticipantCreateWithoutTransactionInput, MultiplayerParticipantUncheckedCreateWithoutTransactionInput>
  }

  export type MultiplayerParticipantUpdateWithWhereUniqueWithoutTransactionInput = {
    where: MultiplayerParticipantWhereUniqueInput
    data: XOR<MultiplayerParticipantUpdateWithoutTransactionInput, MultiplayerParticipantUncheckedUpdateWithoutTransactionInput>
  }

  export type MultiplayerParticipantUpdateManyWithWhereWithoutTransactionInput = {
    where: MultiplayerParticipantScalarWhereInput
    data: XOR<MultiplayerParticipantUpdateManyMutationInput, MultiplayerParticipantUncheckedUpdateManyWithoutTransactionInput>
  }

  export type RechargeUpsertWithoutTransactionInput = {
    update: XOR<RechargeUpdateWithoutTransactionInput, RechargeUncheckedUpdateWithoutTransactionInput>
    create: XOR<RechargeCreateWithoutTransactionInput, RechargeUncheckedCreateWithoutTransactionInput>
    where?: RechargeWhereInput
  }

  export type RechargeUpdateToOneWithWhereWithoutTransactionInput = {
    where?: RechargeWhereInput
    data: XOR<RechargeUpdateWithoutTransactionInput, RechargeUncheckedUpdateWithoutTransactionInput>
  }

  export type RechargeUpdateWithoutTransactionInput = {
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumRechargeStatusFieldUpdateOperationsInput | $Enums.RechargeStatus
    billingData?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RechargeUncheckedUpdateWithoutTransactionInput = {
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    method?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumRechargeStatusFieldUpdateOperationsInput | $Enums.RechargeStatus
    billingData?: InputJsonValue | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateWithoutRechargeInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    soloGames?: SoloGameCreateNestedManyWithoutTransactionInput
    multiplayerParticipants?: MultiplayerParticipantCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutRechargeInput = {
    id?: string
    userId: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
    soloGames?: SoloGameUncheckedCreateNestedManyWithoutTransactionInput
    multiplayerParticipants?: MultiplayerParticipantUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutRechargeInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutRechargeInput, TransactionUncheckedCreateWithoutRechargeInput>
  }

  export type TransactionUpsertWithoutRechargeInput = {
    update: XOR<TransactionUpdateWithoutRechargeInput, TransactionUncheckedUpdateWithoutRechargeInput>
    create: XOR<TransactionCreateWithoutRechargeInput, TransactionUncheckedCreateWithoutRechargeInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutRechargeInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutRechargeInput, TransactionUncheckedUpdateWithoutRechargeInput>
  }

  export type TransactionUpdateWithoutRechargeInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    soloGames?: SoloGameUpdateManyWithoutTransactionNestedInput
    multiplayerParticipants?: MultiplayerParticipantUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutRechargeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    soloGames?: SoloGameUncheckedUpdateManyWithoutTransactionNestedInput
    multiplayerParticipants?: MultiplayerParticipantUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type MultiplayerGameCreateManyCreatorInput = {
    id?: string
    bet: number
    thinkingTime: number
    status?: $Enums.GameStatus
    winnerId?: string | null
    createdAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
  }

  export type MultiplayerParticipantCreateManyPlayerInput = {
    id?: string
    gameId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    transactionId?: string | null
  }

  export type SoloGameCreateManyUserInput = {
    id?: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
    transactionId?: string | null
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    description: string
    balanceAfter: number
    reference?: string | null
    status?: $Enums.TransactionStatus
    createdAt?: Date | string
  }

  export type MultiplayerGameUpdateWithoutCreatorInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    players?: MultiplayerParticipantUpdateManyWithoutGameNestedInput
  }

  export type MultiplayerGameUncheckedUpdateWithoutCreatorInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    players?: MultiplayerParticipantUncheckedUpdateManyWithoutGameNestedInput
  }

  export type MultiplayerGameUncheckedUpdateManyWithoutCreatorInput = {
    bet?: IntFieldUpdateOperationsInput | number
    thinkingTime?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MultiplayerParticipantUpdateWithoutPlayerInput = {
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: MultiplayerGameUpdateOneRequiredWithoutPlayersNestedInput
    transaction?: TransactionUpdateOneWithoutMultiplayerParticipantsNestedInput
  }

  export type MultiplayerParticipantUncheckedUpdateWithoutPlayerInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultiplayerParticipantUncheckedUpdateManyWithoutPlayerInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SoloGameUpdateWithoutUserInput = {
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: TransactionUpdateOneWithoutSoloGamesNestedInput
  }

  export type SoloGameUncheckedUpdateWithoutUserInput = {
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SoloGameUncheckedUpdateManyWithoutUserInput = {
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpdateWithoutUserInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    soloGames?: SoloGameUpdateManyWithoutTransactionNestedInput
    multiplayerParticipants?: MultiplayerParticipantUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    soloGames?: SoloGameUncheckedUpdateManyWithoutTransactionNestedInput
    multiplayerParticipants?: MultiplayerParticipantUncheckedUpdateManyWithoutTransactionNestedInput
    recharge?: RechargeUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerParticipantCreateManyGameInput = {
    id?: string
    playerId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
    transactionId?: string | null
  }

  export type MultiplayerParticipantUpdateWithoutGameInput = {
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: UserUpdateOneRequiredWithoutParticipationsNestedInput
    transaction?: TransactionUpdateOneWithoutMultiplayerParticipantsNestedInput
  }

  export type MultiplayerParticipantUncheckedUpdateWithoutGameInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultiplayerParticipantUncheckedUpdateManyWithoutGameInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SoloGameCreateManyTransactionInput = {
    id?: string
    userId: string
    bet: number
    chosenNumber: number
    generatedNumber: number
    result: $Enums.SoloGameResult
    balanceChange: number
    multiplier: number
    playedAt?: Date | string
  }

  export type MultiplayerParticipantCreateManyTransactionInput = {
    id?: string
    gameId: string
    playerId: string
    generatedNumber?: number | null
    playedAt?: Date | string | null
    isWinner?: boolean
    balanceChange?: number
    joinedAt?: Date | string
  }

  export type SoloGameUpdateWithoutTransactionInput = {
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSoloGamesNestedInput
  }

  export type SoloGameUncheckedUpdateWithoutTransactionInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoloGameUncheckedUpdateManyWithoutTransactionInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bet?: IntFieldUpdateOperationsInput | number
    chosenNumber?: IntFieldUpdateOperationsInput | number
    generatedNumber?: IntFieldUpdateOperationsInput | number
    result?: EnumSoloGameResultFieldUpdateOperationsInput | $Enums.SoloGameResult
    balanceChange?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerParticipantUpdateWithoutTransactionInput = {
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: MultiplayerGameUpdateOneRequiredWithoutPlayersNestedInput
    player?: UserUpdateOneRequiredWithoutParticipationsNestedInput
  }

  export type MultiplayerParticipantUncheckedUpdateWithoutTransactionInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultiplayerParticipantUncheckedUpdateManyWithoutTransactionInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    generatedNumber?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    balanceChange?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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