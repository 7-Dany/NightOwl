import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../../Context/SocketContext'

type UsePrivateChannelArgs = {
  conversation_id: string
  user_id: string
  image: string
  name: string
  username: string
  type: string
  created_at: string
}

type UsePrivateChannelReturn = {
  active: string
  getTime: (created_at: string) => Date
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

function usePrivateChannel(
  {
    conversation_id,
    user_id,
    image,
    name,
    username,
    type
  }: UsePrivateChannelArgs): UsePrivateChannelReturn {
  const { SocketDispatch, SocketState } = useContext(SocketContext)
  const [active, setActive] = useState('private-channel__not-active')

  function getTime(created_at: string) {
    /** Get time without offset */
    let date = new Date(created_at)
    const timestamp = date.getTime()
    const offset = date.getTimezoneOffset() * 60 * 1000
    return new Date(timestamp - offset)
  }

  function handleOnClick(event: React.MouseEvent<HTMLDivElement>) {
    /** When conversation got clicked it will update the active conversation  */
    SocketDispatch({
      type: 'update_active_conversation',
      payload: { conversation_id, user_id, image, name, username, type }
    })
  }

  useEffect(() => {
    /** Whenever user get disconnect or connect it will update its state */
    if (SocketState.users?.includes(user_id)) {
      setActive('private-channel__active')
    } else {
      setActive('private-channel__not-active')
    }
  }, [SocketState.users?.length])

  return {
    active,
    handleOnClick,
    getTime
  }
}

export default usePrivateChannel