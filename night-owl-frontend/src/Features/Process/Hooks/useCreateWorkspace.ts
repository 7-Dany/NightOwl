import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import { createWorkspace } from '../Api/workspaces.api'
import { AuthContext } from '../../../Context/auth.context'

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
  const { user, setWorkspace } = useContext(AuthContext)
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
        values: { user_id: user.id, name: values.name, token: user.token }
      })
        .then(data => {
          setWorkspace(data)
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