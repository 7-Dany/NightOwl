import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../../../Context/SocketContext'
import { ConversationsEndpoints } from '../../../Api/conversations.api'

const conversationsEndpoints = new ConversationsEndpoints()

type UseMemberArgs = {
  userId: string
  memberId: string
  token: string
}

type UseMemberReturn = {
  openChat: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useMember({ userId, memberId, token }: UseMemberArgs): UseMemberReturn {
  const { SocketDispatch } = useContext(SocketContext)
  const [newChat, setNewChat] = useState(false)
  const navigate = useNavigate()

  function openChat(event: React.MouseEvent<HTMLDivElement>) {
    /** When chat icon get clicked on members' page it will open the conversation*/
    setNewChat(true)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (newChat) {
      conversationsEndpoints.createPrivateConversation(
        controller,
        userId,
        memberId,
        token
      )
        .then(data => {
          setNewChat(false)
          SocketDispatch({ type: 'update_active_conversation', payload: data })
          navigate('/chats')
        })
        .catch(error => {
          setNewChat(false)
        })
    }
    return () => {
      controller.abort()
    }
  }, [newChat])

  return {
    openChat
  }
}

export default useMember