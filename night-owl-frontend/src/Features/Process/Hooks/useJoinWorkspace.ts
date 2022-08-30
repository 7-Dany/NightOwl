import React, { useContext, useState } from 'react'
import { WorkspaceRequest } from '../../../Types'
import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import { createWorkspaceRequest } from '../Api/workspaces.api'
import { AuthContext } from '../../../Context/auth.context'
import { useNavigate } from 'react-router-dom'


type UseJoinWorkspaceArgs = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

type UseJoinWorkspaceReturn = {
  workspaceRequest: WorkspaceRequest
  errorMsg: string
  formik: FormikProps<{ workspaceId: string }>
  closeJoinWorkspace: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useJoinWorkspace({ setShow }: UseJoinWorkspaceArgs): UseJoinWorkspaceReturn {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { setWorkspaceRequest, workspaceRequest } = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState('')
  const formik = useFormik({
    initialValues: { workspaceId: '' },
    validationSchema: Yup.object({
      workspaceId: Yup.string().required('Workspace id is required')
    }),
    onSubmit: (values, actions) => {
      setErrorMsg('')
      const controller = new AbortController()
      const val = { workspace_id: values.workspaceId, user_id: user.id, token: user.token }
      createWorkspaceRequest({ controller, values: val })
        .then(data => {
          setWorkspaceRequest(data as WorkspaceRequest)
          navigate('/workspace/request')
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
        })
      actions.resetForm()
    }
  })

  function closeJoinWorkspace(event: React.MouseEvent<HTMLDivElement>) {
    setShow('')
    setErrorMsg('')
  }

  return {
    workspaceRequest,
    errorMsg,
    formik,
    closeJoinWorkspace
  }
}

export default useJoinWorkspace