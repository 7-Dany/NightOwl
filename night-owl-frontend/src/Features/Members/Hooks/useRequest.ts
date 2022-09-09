import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/auth.context'
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
  const { workspace, user } = useContext(AuthContext)
  const [order, setOrder] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    if (order === 'Accept') {
      createWorkspaceMember({
        controller,
        values: { userId: userId, token: user.token, workspaceId: workspace.workspace_id, role: 'Member' }
      })
        .then(data => {
          setMsg('Request got Accepted')
        })
    } else if (order === 'Delete') {
      deleteWorkspaceRequest({
        controller,
        values: { userId: userId, token: user.token }
      })
        .then(data => {
          setMsg('Request got Deleted')
        })
    }
    return () => {
      controller.abort()
    }
  }, [order])

  function requestOrder(event: React.MouseEvent<HTMLButtonElement>, order: string): void {
    setOrder(order)
  }

  return {
    msg,
    requestOrder
  }
}

export default useRequest