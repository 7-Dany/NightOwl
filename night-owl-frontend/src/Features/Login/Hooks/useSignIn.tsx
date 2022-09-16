import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import { authUser } from '../Api/users.api'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IAuthUser, IWorkspace, IWorkspaceRequest } from '../../../Types'

type UseSignInReturn = {
  formik: FormikProps<{ email: string, password: string }>
  register: (event: React.MouseEvent<HTMLButtonElement>) => void
  error: string
}

type UseSignInArgs = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function useSignIn({ setLogin }: UseSignInArgs): UseSignInReturn {
  const { setUser, setWorkspace, setWorkspaceRequest } = useContext(AuthContext)
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
        /** After the user get authenticated if he has in workspace he will get redirected to it,
         *  Or if he has workspace request is going he will go to,
         *  otherwise he will be redirected to create workspace or join workspace
         */
        .then(data => {
          if (data.user.token) {
            setUser(data.user)
            if (data.workspace) {
              setWorkspace(data.workspace)
              setWorkspaceRequest({} as IWorkspaceRequest)
              navigate('/home')
            } else if (data.workspaceRequest) {
              setWorkspaceRequest(data.workspaceRequest)
              setWorkspace({} as IWorkspace)
              navigate('/workspace/request')
            } else {
              setWorkspace({} as IWorkspace)
              setWorkspaceRequest({} as IWorkspaceRequest)
              navigate('/workspace')
            }
          } else {
            setUser({} as IAuthUser)
            setWorkspace({} as IWorkspace)
            setWorkspaceRequest({} as IWorkspaceRequest)
            navigate('/login')
          }
        })
        .catch(error => {
          setError(error.response.data.message)
        })
      actions.resetForm()
    }
  })

  function register(event: React.MouseEvent<HTMLButtonElement>) {
    /** Show sign up form when register get clicked */
    setLogin(false)
  }

  return {
    formik,
    register,
    error
  }
}

export default useSignIn