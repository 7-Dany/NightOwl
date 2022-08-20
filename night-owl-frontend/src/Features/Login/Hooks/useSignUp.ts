import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'

type UseSignUpReturn = {
  formik: FormikProps<{ username: string, email: string, password: string, confirmPassword: string }>
  login: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type UseSignUpArgs = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function useSignUp({ setLogin }: UseSignUpArgs): UseSignUpReturn {
  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username Required').min(5),
      email: Yup.string().required('Email Required').email(),
      password: Yup.string().required('Password Required').min(8, 'Password is too short'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }), onSubmit: (values, actions) => {
      const val = { ...values }
      const config = { headers: { 'Content-Type': 'application/json' } }
      actions.resetForm()
      axios.post('http://localhost:4000/users', { content: val }, config)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  function login(event: React.MouseEvent<HTMLButtonElement>) {
    setLogin(false)
  }

  return {
    formik,
    login
  }
}

export default useSignUp