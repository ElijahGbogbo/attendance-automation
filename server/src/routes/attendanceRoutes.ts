import express from 'express'
import markAttendance from '../controllers/attendanceController.ts'
import upload from '../middleware/uploadMiddleware.ts'

const attendanceRoutes = express.Router()

attendanceRoutes.post('/attendance/mark', upload.single('zoomFile'), markAttendance)

export default attendanceRoutes
