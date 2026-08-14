import type { ProcessAttendanceProps } from '../types/attendanceProcessingTypes.ts'
import { getFirstGoogleSheetName } from '../utils/getFirstGoogleSheetName.ts'
import {
  readGoogleSpreadSheetNames,
  updateGoogleSpreadSheetAttendance,
} from './googleSheetService.ts'

const processAttendance = async ({
  classDate,
  spreadSheetId,
  attendeeSet,
}: ProcessAttendanceProps) => {
  const firstGoogleSheetName = await getFirstGoogleSheetName(spreadSheetId)
  const nameRange = firstGoogleSheetName + '!A3:A'
  const studentNames = await readGoogleSpreadSheetNames({ spreadSheetId, nameRange })
  await updateGoogleSpreadSheetAttendance({
    classDate,
    spreadSheetId,
    attendeeSet,
    studentNames,
    firstGoogleSheetName,
  })
}

export default processAttendance
