import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/auth.context'
import { useNavigate } from 'react-router-dom'
import { deleteWorkspaceRequest } from '../Api/workspace_requests.api'
import { AuthUser, WorkspaceRequest } from '../../../Types'

function useWorkspaceRequest() {
  const { workspaceRequest, setWorkspaceRequest, user, setUser } = useContext(AuthContext)
  const [deleteRequest, setDeleteRequest] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    if (deleteRequest) {
      deleteWorkspaceRequest({ controller, values: { id: workspaceRequest.id, token: user.token } })
        .then(data => {
          setErrorMsg('Your request got deleted')
          setWorkspaceRequest({} as WorkspaceRequest)
          setDeleteRequest(null)
          navigate('/workspace')
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
          setWorkspaceRequest({} as WorkspaceRequest)
          setDeleteRequest(null)
        })
    }
    return () => {
      controller.abort()
    }
  }, [deleteRequest])

  function confirmOption(event: React.MouseEvent<HTMLButtonElement>, order: boolean | null) {
    setDeleteRequest(order)
  }

  function closeWorkspaceRequest() {
    setWorkspaceRequest({} as WorkspaceRequest)
    setUser({} as AuthUser)
    navigate('/login')
  }

  return {
    workspaceRequest,
    deleteRequest,
    errorMsg,
    closeWorkspaceRequest,
    confirmOption
  }
}

export default useWorkspaceRequest