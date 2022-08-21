import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import { authUser } from '../Api/users.api'
import { AuthContext } from '../../../Context/auth.context'
import { useNavigate } from 'react-router-dom'

type UseSignInReturn = {
  formik: FormikProps<{ email: string, password: string }>
  register: (event: React.MouseEvent<HTMLButtonElement>) => void
  error: string
}

type UseSignInArgs = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function useSignIn({ setLogin }: UseSignInArgs): UseSignInReturn {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().required('Email required').email(),
      password: Yup.string().required('Password required').min(8, 'Password is too short')
    }),
    onSubmit: (values, actions) => {
      setError('')
      const controller = new AbortController()
      authUser({ controller, user: values })
        .then(data => {
          setUser(data)
          navigate('/home')
        })
        .catch(error => {
          setError(error.response.data.message)
        })
      actions.resetForm()
      controller.abort()
    }
  })

  function register(event: React.MouseEvent<HTMLButtonElement>) {
    setLogin(true)
  }

  return {
    formik,
    register,
    error
  }
}

export default useSignIn