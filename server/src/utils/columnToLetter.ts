export function columnToLetter(column: number): string {
  if (column < 0) {
    throw new Error('Column index must be zero or greater')
  }

  let letter = ''

  while (column >= 0) {
    letter = String.fromCharCode((column % 26) + 65) + letter
    column = Math.floor(column / 26) - 1
  }
  return letter
}
