import parseZoomAttendance from './excelParser.ts'
import type { ProcessAttendanceProps } from '../types/attendanceProcessingTypes.ts'
import { getFirstGoogleSheetName } from '../utils/getFirstGoogleSheetName.ts'
import {
  readGoogleSpreadSheetNames,
  updateGoogleSpreadSheetAttendance,
} from './googleSheetService.ts'
// import { updateZoomAttendanceExcelFile } from "./zoomExcelFileService.ts"

const processAttendance = async ({
  fileBuffer, 
  formattedDate, 
  spreadSheetId
}: ProcessAttendanceProps) => {

  // workbook, worksheet
  const {
    attendeeSet
  } = await parseZoomAttendance(fileBuffer)

  const firstGoogleSheetName = await getFirstGoogleSheetName(spreadSheetId)
  const nameRange = firstGoogleSheetName + '!A3:A'
  const studentNames = await readGoogleSpreadSheetNames({ spreadSheetId, nameRange })
  await updateGoogleSpreadSheetAttendance({
    studentNames,
    attendeeSet,
    formattedDate,
    spreadSheetId,
    firstGoogleSheetName
  })
  // await updateZoomAttendanceExcelFile({worksheet, studentNames, attendeeSet})
}

export default processAttendance
