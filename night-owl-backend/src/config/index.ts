import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_TEST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  AUTH_TOKEN_SECRET,
  RESET_PASSWORD_TOKEN_SECRET,
  COOKIE_SECRET
} = process.env

export default {
  port: parseInt(PORT as string, 10),
  env: ENV,
  postgres_host: POSTGRES_HOST,
  postgres_port: parseInt(POSTGRES_PORT as string, 10),
  postgres_database: POSTGRES_DATABASE,
  postgres_database_test: POSTGRES_DATABASE_TEST,
  postgres_username: POSTGRES_USERNAME,
  postgres_password: POSTGRES_PASSWORD,
  pepper: BCRYPT_PASSWORD,
  salt: parseInt(SALT_ROUNDS as string, 10),
  token: AUTH_TOKEN_SECRET,
  resetToken: RESET_PASSWORD_TOKEN_SECRET,
  cookieSecret: COOKIE_SECRET
}