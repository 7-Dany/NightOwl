import { Router } from 'express'
import {
  authenticateUser,
  changePassword,
  checkEmailExistence, createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  updateUser
} from '../../controllers/users.controller'
import {
  authTokenMiddleware,
  validateSignUpMiddleware,
  validateLoginMiddleware,
  resetPasswordTokenMiddleware
} from '../../middlewares'


const usersRoutes = Router()

usersRoutes.route('/')
  .get(authTokenMiddleware, getAllUsers)
  .post(validateSignUpMiddleware, createUser)
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
  .post(validateLoginMiddleware, authenticateUser)

export default usersRoutes