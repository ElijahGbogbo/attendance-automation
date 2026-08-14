import * as XLSX from "xlsx";
import type { ReadSpreadSheetProcessingProps, 
              UpdateSpreadSheetAttendanceProps } from "../types/attendanceProcessingTypes.ts";
import { sheets } from "../config/sheets.ts";
import { columnToLetter } from "../utils/columnToLetter.ts";
import { createCustomError } from "../errors/customErrorHandler.ts";

async function readGoogleSpreadSheetNames({
    spreadSheetId, nameRange
}: ReadSpreadSheetProcessingProps): Promise<string[][]> {
    const readOptions = {
        spreadsheetId: spreadSheetId, 
        range: nameRange
    }
    const nameColumn = await sheets.spreadsheets.values.get(readOptions)
    return nameColumn.data.values ?? [];
}

async function updateGoogleSpreadSheetAttendance(
    {studentNames, 
     attendeeSet, 
     classDate, 
     spreadSheetId, 
     firstGoogleSheetName}: UpdateSpreadSheetAttendanceProps) {
        const attendanceStatus = studentNames.map((row) => {
            const nameVal = row[0]?.toLowerCase().trim().replace(/\s+/g, " ") ?? "";
            if (nameVal === "") {
                return [""]
            }
            const sampleArray = nameVal.split(" ")

            for (let index = 2; index <= 20; index++) {
                const teamNum = sampleArray[0] + " " + String(index);
                if (teamNum === nameVal) {
                    return [sampleArray[0]?.toUpperCase() + " " + String(index)]
                } else {
                    break
                }
            }

            if (attendeeSet.has(nameVal)) {
                return ["Present"]
            }

            let trueCount = 0;
            for (const attendee of attendeeSet) {
                const referenceArray = attendee.split(" ")
                for (const sampleUnit of sampleArray) {
                    const boolArray = referenceArray.map((elem) => {
                        return elem === sampleUnit
                    })
                    if (boolArray.length === 0) {
                        continue;
                    }
                    trueCount++
                }
                if (trueCount >= 2) {
                    break;
                } else {
                    continue;
                }
            }
            const statusVal = trueCount >= 2 ? ["Present"] : ["Absent"]
            return statusVal;
        })
        
        const headerResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadSheetId, 
            range: `${firstGoogleSheetName}!2:2`
        })
        const headers = headerResponse.data.values?.[0] ?? []
        const columnIndex = headers.findIndex((headR) => {
            return headR === classDate;
        })
        if (columnIndex === -1) {
            throw createCustomError(`Date ${classDate} not found in header row`, 400);
        }

        const columnLetter = columnToLetter(columnIndex)
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadSheetId, 
            range: `${firstGoogleSheetName}!${columnLetter}3:${columnLetter}`, 
            valueInputOption: 'RAW', 
            requestBody: {
                "values": attendanceStatus
            },
        })
}

export {
    readGoogleSpreadSheetNames, 
    updateGoogleSpreadSheetAttendance
};
