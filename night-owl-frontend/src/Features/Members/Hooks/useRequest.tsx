import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { createWorkspaceMember } from '../Api/workspace_members.api'
import { deleteWorkspaceRequest } from '../Api/workspace_requests.api'

type UseRequestArgs = {
  userId: string
}

type UseRequestReturn = {
  msg: string
  requestOrder: (event: React.MouseEvent<HTMLButtonElement>, order: string) => void
}

function useRequest({ userId }: UseRequestArgs): UseRequestReturn {
  const { workspace, user } = useContext(AuthContext).AuthState
  const [order, setOrder] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    if (order === 'Accept') {
      /** If the admin accepted workspace request it will get accepted then it will get deleted from the requests,
       *  then he will be workspace member,
       *  after the user refresh the page he will get redirected to his workspace,
       *  if the request got deleted by the sender it will show to the admin when he accepts or delete it.
       */
      createWorkspaceMember({
        controller,
        values: { userId: userId, token: user.token, workspaceId: workspace.workspace_id, role: 'Member' }
      })
        .then(data => {
          if (data) {
            setMsg('Request got Accepted')
          }
        })
        .catch(error => {
          if (error.response?.status === 409) {
            setMsg('Request got deleted by the sender')
          }
        })
    } else if (order === 'Delete') {
      deleteWorkspaceRequest({
        controller,
        values: { userId: userId, token: user.token }
      })
        .then(data => {
          if (data) {
            setMsg('Request got Deleted')
          }
        })
        .catch(error => {
          if (error.response?.status === 409) {
            setMsg('Request got deleted by the sender')
          }
        })
    }
    return () => {
      controller.abort()
    }
  }, [order])

  function requestOrder(event: React.MouseEvent<HTMLButtonElement>, order: string): void {
    /** Change order to be Accept or Delete to accept or delete requests */
    setOrder(order)
  }

  return {
    msg,
    requestOrder
  }
}

export default useRequest