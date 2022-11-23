import { errorHandler } from './common/errors/error-handler'
import { heroesInsert } from './factory'

export const heroesInsertHandler = errorHandler(
  heroesInsert.main.bind(heroesInsert),
)
