import parseZoomAttendance from '../services/excelParser.ts'
import extractSpreadSheetId from '../utils/spreadSheetIdExtractor.ts'
import processAttendance from '../services/attendanceService.ts'
import { assertsDefined } from '../utils/nonNullValidator.ts'
import { asyncWrapper } from '../middleware/asyncWrapper.ts'

const markAttendance = asyncWrapper(async (req, res) => {
  const fileBuffer = req.file?.buffer
  assertsDefined(fileBuffer, 'No file uploaded. Please upload a valid Excel file.')
  const { classDate, sheetUrl } = req.body

  const spreadSheetId = extractSpreadSheetId(sheetUrl)

  // workbook, worksheet
  const { attendeeSet } = await parseZoomAttendance(fileBuffer)

  await processAttendance({
    classDate,
    spreadSheetId,
    attendeeSet,
  })
  res.status(201).json({ success: true, msg: 'Attendance Marked Successfully!' })
})

export default markAttendance
