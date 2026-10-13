
export function assertsDefined<T>(
  argValue: T,
  errorMessage: string
): asserts argValue is NonNullable<T> {
  if (argValue === null || argValue === undefined) {
    throw new Error(errorMessage);
  }
}
