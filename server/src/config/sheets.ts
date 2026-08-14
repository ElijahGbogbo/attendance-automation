import { google } from 'googleapis'
import auth from './google.ts'

export const sheets = google.sheets({
  version: 'v4',
  auth,
})
