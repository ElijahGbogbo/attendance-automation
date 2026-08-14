import { CustomAPIError } from '../errors/customErrorHandler.ts'

export function assertsDefined<T>(
  argValue: T,
  errorMessage: string,
  statusCode = 400,
): asserts argValue is NonNullable<T> {
  if (argValue === null || argValue === undefined) {
    throw new CustomAPIError(errorMessage, statusCode)
  }
}
