import { Router } from 'express'
import {
  authenticateUser,
  changePassword,
  checkEmailExistence, createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  updateUser, userSession
} from '../../controllers/users.controller'
import {
  authTokenMiddleware,
  validateSignUpMiddleware,
  validateLoginMiddleware,
  resetPasswordTokenMiddleware,
  rateLimiterMiddleware
} from '../../middlewares'


const usersRoutes = Router()

usersRoutes.route('/')
  .get(authTokenMiddleware, getAllUsers)
  .post(rateLimiterMiddleware, validateSignUpMiddleware, createUser)
  .patch(authTokenMiddleware, changePassword)
  .delete(authTokenMiddleware, deleteUser)

usersRoutes.route('/:id')
  .get(authTokenMiddleware, getUser)
  .put(authTokenMiddleware, updateUser)

usersRoutes.route('/check')
  .post(checkEmailExistence)

usersRoutes.route('/reset')
  .patch(resetPasswordTokenMiddleware, forgotPassword)

usersRoutes.route('/auth')
  .post(rateLimiterMiddleware, validateLoginMiddleware, authenticateUser)

usersRoutes.route('/auth/session').get(userSession)

export default usersRoutes