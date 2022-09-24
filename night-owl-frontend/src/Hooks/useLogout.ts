import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { deleteUserSession } from '../Api/users.api'
import { SocketContext } from '../Context/SocketContext'

type UseLogoutReturn = {
  logoutUser: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useLogout(): UseLogoutReturn {
  const [logout, setLogout] = useState(false)
  const { AuthState, AuthDispatch } = useContext(AuthContext)
  const { SocketState } = useContext(SocketContext)
  const navigate = useNavigate()

  function logoutUser(event: React.MouseEvent<HTMLDivElement>) {
    setLogout(true)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (logout) {
      deleteUserSession({ controller, token: AuthState.user.token })
        .then(data => {
          AuthDispatch({ type: 'reset_all' })
          setLogout(false)
          navigate('/')
          SocketState.socket?.disconnect()
        })
        .catch(error => {
          AuthDispatch({ type: 'reset_all' })
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