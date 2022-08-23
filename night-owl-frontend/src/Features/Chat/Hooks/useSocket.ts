import { socket } from '../../../socket'
import { useContext, useEffect } from 'react'
import { AuthContext, AuthUser } from '../../../Context/auth.context'

function useSocket() {
  const { setUser } = useContext(AuthContext)
  useEffect(() => {
    socket.connect()
    socket.on('connect_error', () => {
      setUser({} as AuthUser)
    })
    return () => {
      socket.off('connect_error')
    }
  }, [setUser])
}

export default useSocket