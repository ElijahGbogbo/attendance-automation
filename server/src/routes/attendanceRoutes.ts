import express from 'express'
import markAttendance from '../controllers/attendanceController.ts'
import upload from '../middleware/uploadMiddleware.ts'

const attendanceRoutes = express.Router()

attendanceRoutes.post('/attendance/mark', upload.single('zoomField'), markAttendance)

export default attendanceRoutes
