import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { deleteUserSession } from '../Api/users.api'
import { IAuthUser, IWorkspace } from '../Types'
import { SocketContext } from '../Context/SocketContext'

type UseLogoutReturn = {
  logoutUser: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useLogout(): UseLogoutReturn {
  const [logout, setLogout] = useState(false)
  const { user, setUser, setWorkspace } = useContext(AuthContext)
  const { SocketState } = useContext(SocketContext)
  const navigate = useNavigate()

  function logoutUser(event: React.MouseEvent<HTMLDivElement>) {
    setLogout(true)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (logout) {
      deleteUserSession({ controller, token: user.token })
        .then(data => {
          setUser({} as IAuthUser)
          setWorkspace({} as IWorkspace)
          setLogout(false)
          navigate('/')
          SocketState.socket?.disconnect()
        })
        .catch(error => {
          setUser({} as IAuthUser)
          setWorkspace({} as IWorkspace)
          setLogout(false)
          navigate('/')
          SocketState.socket?.disconnect()
        })
    }
    return () => {
      controller.abort()
    }
  }, [logout])

  return {
    logoutUser
  }
}

export default useLogout