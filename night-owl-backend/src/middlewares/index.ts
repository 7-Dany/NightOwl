import authTokenMiddleware from './auth.token.middleware'
import errorMiddleware from './error.middleware'
import pageNotFoundMiddleware from './pageNotFound.middleware'
import resetPasswordTokenMiddleware from './resetPassword.token.middleware'
import validateSignUpMiddleware from './validateSignUp.middleware'
import validateLoginMiddleware from './validateLogin.middleware'
import rateLimiterMiddleware from './rateLimiter.middleware'
import { sessionMiddleware, wrap, corsConfig, authorizeUser } from './server.middleware'

export {
  authTokenMiddleware,
  errorMiddleware,
  pageNotFoundMiddleware,
  resetPasswordTokenMiddleware,
  validateSignUpMiddleware,
  validateLoginMiddleware,
  rateLimiterMiddleware,
  sessionMiddleware,
  wrap,
  corsConfig,
  authorizeUser
}