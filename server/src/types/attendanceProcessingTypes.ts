import * as XLSX from 'xlsx'
import type { Request, Response, NextFunction } from 'express'

interface ProcessAttendanceProps {
  // worksheet: XLSX.WorkSheet
  fileBuffer: Buffer
  formattedDate: string
  spreadSheetId: string
  // attendeeSet: Set<string>
}

interface ParsedZoomAttendanceProps {
  // workbook: XLSX.WorkBook
  // worksheet: XLSX.WorkSheet
  attendeeSet: Set<string>
}

interface ReadSpreadSheetProcessingProps {
  spreadSheetId: string
  nameRange: string
}

interface UpdateSpreadSheetAttendanceProps {
  studentNames: string[][]
  attendeeSet: Set<string>
  formattedDate: string
  spreadSheetId: string
  firstGoogleSheetName: string
}

interface UpdateZoomAttendanceProps {
  worksheet: XLSX.WorkSheet
  studentNames: string[][]
  attendeeSet: Set<string>
}

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>

export type {
  AsyncHandler,
  ProcessAttendanceProps,
  ParsedZoomAttendanceProps,
  ReadSpreadSheetProcessingProps,
  UpdateSpreadSheetAttendanceProps, 
  UpdateZoomAttendanceProps
}
