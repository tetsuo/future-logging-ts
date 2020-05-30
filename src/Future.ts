import { Predicate } from 'fp-ts/lib/function'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Contravariant2 } from 'fp-ts/lib/Contravariant'
import { pipeable } from 'fp-ts/lib/pipeable'
import { future, Future } from 'fp-ts-fluture/lib/Future'
import { getLoggerM } from 'logging-ts'

const T = getLoggerM(future)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    LoggerFuture: LoggerFuture<E, A>
  }
}

export const URI = 'LoggerFuture'

export type URI = typeof URI

export interface LoggerFuture<E, A> {
  (a: A): Future<E, void>
}

export const filter: <E, A>(
  logger: LoggerFuture<E, A>,
  predicate: Predicate<A>
) => LoggerFuture<E, A> = T.filter

export const getMonoid: <E, A>() => Monoid<LoggerFuture<E, A>> = T.getMonoid

export const loggerFuture: Contravariant2<URI> = {
  URI,
  contramap: T.contramap
}

const { contramap } = pipeable(loggerFuture)

export { contramap }
