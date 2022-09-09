import { TeamChannelsContainer, PrivateChannelsContainer, ChatRoomHeader, ChatRoom } from './Components'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/auth.context'
import { AuthUser } from '../../Types'
import { socket } from '../../socket'
import { getAllUserConversation } from './Api/conversation_members.api'
import { Conversation } from './Types'
import { ActiveContext } from '../../Context/active.context'

function WorkspaceChatMain() {
  const { setUser, user } = useContext(AuthContext)
  const { activeConversation } = useContext(ActiveContext)
  const [userConversations, setUserConversations] = useState<Conversation[]>([])

  useEffect(() => {
    const controller = new AbortController()
    getAllUserConversation({ controller, values: { user_id: user.id, token: user.token } })
      .then(data => {
        setUserConversations(data)
      })
      .catch(error => {
        setUserConversations([])
      })
    socket.connect()
    socket.on('connect_error', () => {
      setUser({} as AuthUser)
    })
    return () => {
      socket.off('connect_error')
    }
  }, [])

  return (
    <div className='chats-container'>
      <div className='chats'>
        <h2>Chats</h2>
        <TeamChannelsContainer />
        <PrivateChannelsContainer userConversations={userConversations} />
      </div>
      {activeConversation.conversation_id ?
        <div className='chat-room-container'>
          <ChatRoomHeader />
          <ChatRoom />
        </div>
        : <div></div>
      }
    </div>
  )
}

export default WorkspaceChatMain