import dotenv from 'dotenv'

dotenv.config()

function getEnv(name: string): string {
  const pathVal = process.env[name]
  if (!pathVal) {
    throw new Error(`Environment variable ${name} is not set.`)
  }

  return pathVal
}

export const env = {
  PORT: Number(process.env.PORT),
  GOOGLE_APPLICATION_CREDENTIALS: getEnv('GOOGLE_APPLICATION_CREDENTIALS'),
}
