import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { SocketContext } from '../../../Context/SocketContext'
import { IPrivateConversation } from '../../../Types'
import { ConversationsEndpoints } from '../../../Api/conversations.api'

const conversationsEndpoints = new ConversationsEndpoints()

function useWorkspaceChatMain() {
  const { user } = useContext(AuthContext).AuthState
  const { SocketState, SocketDispatch } = useContext(SocketContext)
  const { activeConversation } = SocketState
  const [userConversations, setUserConversations] = useState<IPrivateConversation[]>([])

  useEffect(() => {
    const controller = new AbortController()
    conversationsEndpoints.getUserConversations(
      controller,
      user.id,
      user.token
    )
      .then(data => {
        setUserConversations(data)
        if (data && !activeConversation?.conversation_id) {
          SocketDispatch({ type: 'update_active_conversation', payload: data[0] })
        }
      })
      .catch(error => {
        setUserConversations([])
      })

    return () => {
      controller.abort()
    }
  }, [])
  return {
    activeConversation,
    userConversations
  }
}

export default useWorkspaceChatMain