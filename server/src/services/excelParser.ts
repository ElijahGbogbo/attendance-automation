import * as XLSX from "xlsx";
import { assertsDefined } from "../utils/nonNullValidator.ts";
import type { ParsedZoomAttendanceProps } from "../types/attendanceProcessingTypes.ts";

const parseZoomAttendance = async(fileBuffer: Buffer): Promise<ParsedZoomAttendanceProps> => {
    const workbook = XLSX.read(fileBuffer, {type: "buffer"});
    const firstSheetName = workbook.SheetNames[0];
    assertsDefined(firstSheetName, "The uploaded Excel file doesn't contain any sheets.");
    const worksheet = workbook.Sheets[firstSheetName];
    assertsDefined(worksheet, "Unable to access the first worksheet."); 
    
    const attendeeSet = new Set<string>();
    const rows = XLSX.utils.sheet_to_json<string[]>(
        worksheet, 
        {header: 1}
    )
    for (const row of rows.slice(4)) {
        const studentName = row[0]
        const normalizedName = studentName?.toLowerCase().trim().replace(/\s+/g, " ")
        assertsDefined(normalizedName, "Student name is missing in the Excel file.");
        attendeeSet.add(normalizedName)
    }
    return {
        workbook, 
        worksheet, 
        attendeeSet
    }
}

export default parseZoomAttendance;
