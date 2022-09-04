import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/auth.context'
import { useNavigate } from 'react-router-dom'
import { deleteUserSession } from '../Api/users.api'
import { AuthUser, Workspace } from '../Types'

type UseLogoutReturn = {
  logoutUser: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useLogout(): UseLogoutReturn {
  const [logout, setLogout] = useState(false)
  const { user, setUser, setWorkspace } = useContext(AuthContext)
  const navigate = useNavigate()

  function logoutUser(event: React.MouseEvent<HTMLDivElement>) {
    setLogout(true)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (logout) {
      deleteUserSession({ controller, token: user.token })
        .then(data => {
          setUser({} as AuthUser)
          setWorkspace({} as Workspace)
          setLogout(false)
          navigate('/')
        })
        .catch(error => {
          setUser({} as AuthUser)
          setWorkspace({} as Workspace)
          setLogout(false)
          navigate('/')
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