import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import { createWorkspace } from '../Api/workspaces.api'
import { AuthContext } from '../../../Context/AuthContext'

type UseCreateWorkspaceArgs = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

type UseCreateWorkspaceReturn = {
  formik: FormikProps<{ name: string }>
  errorMsg: string
  closeCreateWorkspace: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useCreateWorkspace({ setShow }: UseCreateWorkspaceArgs): UseCreateWorkspaceReturn {
  const navigate = useNavigate()
  const { AuthState, AuthDispatch } = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState('')
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Workspace name is required')
    }),
    onSubmit: (values, actions) => {
      const controller = new AbortController()
      createWorkspace({
        controller,
        values: { user_id: AuthState.user.id, name: values.name, token: AuthState.user.token }
      })
        .then(data => {
          AuthDispatch({ type: 'update_workspace', payload: data })
          setErrorMsg('')
          navigate('/home')
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
        })
      actions.resetForm()
    }
  })

  function closeCreateWorkspace(event: React.MouseEvent<HTMLDivElement>) {
    /** Close create workspace model */
    setShow('')
    setErrorMsg('')
  }

  return {
    formik,
    closeCreateWorkspace,
    errorMsg
  }
}

export default useCreateWorkspace