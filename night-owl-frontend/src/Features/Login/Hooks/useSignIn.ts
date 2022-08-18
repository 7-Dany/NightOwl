import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

type UseSignInReturn = {
  formik: FormikProps<{ email: string, password: string }>
  register: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type UseSignInArgs = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function useSignIn({ setLogin }: UseSignInArgs): UseSignInReturn {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().required('Email required').email(),
      password: Yup.string().required('Password required').min(8)
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2))
      actions.resetForm()
    }
  })

  function register(event: React.MouseEvent<HTMLButtonElement>) {
    setLogin(true)
  }

  return {
    formik,
    register
  }
}

export default useSignIn