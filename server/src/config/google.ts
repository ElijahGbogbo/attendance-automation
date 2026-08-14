import { GoogleAuth } from 'google-auth-library'
import { env } from '../config/env.ts'

const auth = new GoogleAuth({
  keyFile: env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

export default auth
