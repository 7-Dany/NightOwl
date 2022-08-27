import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import { createUser } from '../Api/users.api'
import { AuthContext, AuthUser } from '../../../Context/auth.context'
import { useNavigate } from 'react-router-dom'

type UseSignUpReturn = {
  formik: FormikProps<{ username: string, email: string, password: string, confirmPassword: string }>
  login: (event: React.MouseEvent<HTMLButtonElement>) => void
  error: string
}

type UseSignUpArgs = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function useSignUp({ setLogin }: UseSignUpArgs): UseSignUpReturn {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username Required').min(5),
      email: Yup.string().required('Email Required').email(),
      password: Yup.string().required('Password Required').min(8, 'Password is too short'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }), onSubmit: (values, actions) => {
      const controller = new AbortController()
      const { username, email, password } = values
      const user = { username, email, image: 'not exist', password }
      actions.resetForm()
      setError('')
      createUser({ controller, user })
        .then(data => {
          if (data.token) {
            setUser(data)
            navigate('/workspace')
          } else {
            setUser({} as AuthUser)
            navigate('/login')
          }
        })
        .catch(error => {
          setError(error.response.data.message)
        })
      controller.abort()
    }
  })

  function login(event: React.MouseEvent<HTMLButtonElement>) {
    setLogin(false)
  }

  return {
    formik,
    login,
    error
  }
}

export default useSignUp