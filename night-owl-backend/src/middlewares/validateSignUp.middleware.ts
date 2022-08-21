import * as Yup from 'yup'
import { Request, Response, NextFunction } from 'express'

const signUpSchema = Yup.object({
  username: Yup.string().required('Username Required').min(5),
  email: Yup.string().required('Email Required').email(),
  password: Yup.string().required('Password Required').min(8, 'Password is too short')
})

const validateSignUp = (request: Request, response: Response, next: NextFunction) => {
  const { username, email, password } = request.body.content
  const user = { username, email, password }
  signUpSchema.validate(user)
    .then(valid => {
      if (valid) {
        next()
      }
    })
    .catch(error => {
      response.status(422).json({ status: 'Failed', message: error.message })
    })
}
export default validateSignUp