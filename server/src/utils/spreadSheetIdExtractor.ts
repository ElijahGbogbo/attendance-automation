import { assertsDefined } from './nonNullValidator.ts'

function extractSpreadSheetId(sheetUrl: string): string {
  const matchId = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  assertsDefined(matchId, 'Invalid Google Sheet URL.')
  const matchedSheetId = matchId[1]
  assertsDefined(matchedSheetId, 'Unable to extract the spreadsheet ID from the provided URL.')
  return matchedSheetId
}

export default extractSpreadSheetId
