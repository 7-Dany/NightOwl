import React, { useContext, useState } from 'react'
import { IWorkspaceRequest } from '../../../Types'
import { FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import { WorkspacesEndpoints } from '../../../Api/workspaces.api'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const workspaceEndpoints = new WorkspacesEndpoints()

type UseJoinWorkspaceArgs = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

type UseJoinWorkspaceReturn = {
  workspaceRequest: IWorkspaceRequest
  errorMsg: string
  formik: FormikProps<{ workspaceId: string }>
  closeJoinWorkspace: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useJoinWorkspace({ setShow }: UseJoinWorkspaceArgs): UseJoinWorkspaceReturn {
  const navigate = useNavigate()
  const { AuthState, AuthDispatch } = useContext(AuthContext)
  const { workspaceRequest, user } = AuthState
  const [errorMsg, setErrorMsg] = useState('')
  const formik = useFormik({
    initialValues: { workspaceId: '' },
    validationSchema: Yup.object({
      workspaceId: Yup.string().required('Workspace id is required')
    }),
    onSubmit: (values, actions) => {
      setErrorMsg('')
      const controller = new AbortController()
      workspaceEndpoints.createWorkspaceRequest(
        controller,
        values.workspaceId,
        user.id,
        user.token
      )
        .then(data => {
          AuthDispatch({ type: 'update_workspace_request', payload: data })
          navigate('/workspace/request')
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
        })
      actions.resetForm()
    }
  })

  function closeJoinWorkspace(event: React.MouseEvent<HTMLDivElement>) {
    /** Close join workspace model */
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