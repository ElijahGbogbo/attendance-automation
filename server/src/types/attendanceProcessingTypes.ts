import * as XLSX from "xlsx";
import type { Request, Response, NextFunction, RequestHandler } from "express";

interface ProcessAttendanceProps {
    classDate: string;
    spreadSheetId: string;
    attendeeSet: Set<string>
}

interface ParsedZoomAttendanceProps {
    workbook: XLSX.WorkBook;
    worksheet: XLSX.WorkSheet;
    attendeeSet: Set<string>;
}

interface ReadSpreadSheetProcessingProps {
    spreadSheetId: string;
    nameRange: string;
}

interface UpdateSpreadSheetAttendanceProps {
    studentNames: string[][]; 
    attendeeSet: Set<string>; 
    classDate: string;
    spreadSheetId: string;
    firstGoogleSheetName: string;
}

type AsyncHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction) => Promise<unknown>

export type {AsyncHandler, 
             ProcessAttendanceProps, 
             ParsedZoomAttendanceProps, 
             ReadSpreadSheetProcessingProps, 
             UpdateSpreadSheetAttendanceProps};
