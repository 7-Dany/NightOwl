import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { deleteWorkspaceRequest } from '../Api/workspace_requests.api'

function useWorkspaceRequest() {
  const { AuthState, AuthDispatch } = useContext(AuthContext)
  const { user, workspaceRequest } = AuthState
  const [deleteRequest, setDeleteRequest] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    if (deleteRequest) {
      /** It will delete the request after the user confirm it */
      deleteWorkspaceRequest({
        controller,
        values: { userId: user.id, token: user.token }
      })
        .then(data => {
          setErrorMsg('Your request got deleted')
          AuthDispatch({ type: 'reset_workspace_and_request' })
          setDeleteRequest(null)
          navigate('/workspace')
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
          AuthDispatch({ type: 'reset_workspace_and_request' })
          setDeleteRequest(null)
        })
    }
    return () => {
      controller.abort()
    }
  }, [deleteRequest])

  function confirmOption(event: React.MouseEvent<HTMLButtonElement>, order: boolean | null) {
    /** If order is null it will show delete request
     *  if order is false it will show cancel or confirm delete request button
     *  if the user confirmed, it will get deleted,
     *  if the user canceled it, order will be null again
     */
    setDeleteRequest(order)
  }

  function closeWorkspaceRequest() {
    /** Close workspace request model and redirect to login page */
    AuthDispatch({ type: 'reset_all' })
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