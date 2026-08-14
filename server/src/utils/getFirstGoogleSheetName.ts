import { sheets } from "../config/sheets.ts";
import { assertsDefined } from "../utils/nonNullValidator.ts"

export async function getFirstGoogleSheetName(id: string): Promise<string> {
    const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: id
    })
    const firstGoogleSheetName = spreadsheet.data.sheets?.[0]?.properties?.title;
    assertsDefined(firstGoogleSheetName, "The Google Spreadsheet does not contain any sheets.");
    return firstGoogleSheetName;
}
