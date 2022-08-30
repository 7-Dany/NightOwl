import { socket } from '../../../socket'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../../Context/auth.context'
import { AuthUser } from '../../../Types'

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