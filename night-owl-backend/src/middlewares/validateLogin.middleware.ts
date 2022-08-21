import * as Yup from 'yup'
import { Request, Response, NextFunction } from 'express'

const loginSchema = Yup.object({
  email: Yup.string().required('Email required').email(),
  password: Yup.string().required('Password required').min(8, 'Password is too short')
})

const validateLoginForm = (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body.content
  const user = { email, password }
  loginSchema.validate(user)
    .then(valid => {
      if (valid) {
        next()
      }
    })
    .catch(error => {
      response.status(422).json({ status: 'Failed', message: error.message })
    })
}

export default validateLoginForm