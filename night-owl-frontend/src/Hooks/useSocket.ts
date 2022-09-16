import { useEffect, useRef } from 'react'
import io, { ManagerOptions, SocketOptions, Socket } from 'socket.io-client'

export function useSocket(
  uri: string,
  options?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket {
  const { current: socket } = useRef(io(uri, options))
  useEffect(() => {
    return () => {
      if (socket) socket.close()
    }
  }, [socket])

  return socket
}