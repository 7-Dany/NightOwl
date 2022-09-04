import { Router } from 'express'
import {
  authenticateUser,
  updatePassword,
  checkEmailExistence,
  createUser,
  deleteUserSession,
  deleteUser,
  updateForgottenPassword,
  getAllUsers,
  getUser,
  updateUser,
  userSession
} from '../../controllers/users.controller'
import {
  authTokenMiddleware,
  validateSignUpMiddleware,
  validateLoginMiddleware,
  resetPasswordTokenMiddleware,
  rateLimiterMiddleware
} from '../../middlewares'


const usersRoutes = Router()

usersRoutes.route('/users')
  .get(authTokenMiddleware, getAllUsers)
  .post(rateLimiterMiddleware, validateSignUpMiddleware, createUser)
  .patch(authTokenMiddleware, updatePassword)
  .delete(authTokenMiddleware, deleteUser)

usersRoutes.route('/users/:id')
  .get(authTokenMiddleware, getUser)
  .put(authTokenMiddleware, updateUser)

usersRoutes.route('/users/check')
  .post(checkEmailExistence)

usersRoutes.route('/users/reset')
  .patch(resetPasswordTokenMiddleware, updateForgottenPassword)

usersRoutes.route('/users/auth')
  .post(rateLimiterMiddleware, validateLoginMiddleware, authenticateUser)

usersRoutes.route('/users/auth/session')
  .get(userSession)

usersRoutes.route('/users/auth/logout')
  .get(authTokenMiddleware, deleteUserSession)

export default usersRoutes