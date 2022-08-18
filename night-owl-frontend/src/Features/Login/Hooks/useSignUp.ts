import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

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
      password: Yup.string().required('Password Required').min(8),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }), onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2))
      actions.resetForm()
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