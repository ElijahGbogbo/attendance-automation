import extractSpreadSheetId from '../utils/spreadSheetIdExtractor.ts'
import processAttendance from '../services/attendanceService.ts'
import { assertsDefined } from '../utils/nonNullValidator.ts'
import { asyncWrapper } from '../middleware/asyncWrapper.ts'
import { formatDate } from '../utils/formatDate.ts'

const markAttendance = asyncWrapper(async (req, res) => {
  const fileBuffer = req.file?.buffer
  assertsDefined(fileBuffer, 'No file uploaded. Please upload a valid Excel file.')
  const { classDate, sheetUrl } = req.body

  const formattedDate = formatDate(classDate)

  const spreadSheetId = extractSpreadSheetId(sheetUrl)

  await processAttendance({
    fileBuffer,
    formattedDate,
    spreadSheetId,
  })
  res.status(201).json({ success: true, msg: 'Attendance Marked Successfully!' })
})

export default markAttendance
