import { TeamChannelsContainer, PrivateChannelsContainer, ChatRoomHeader, ChatRoom } from './Components'
import useWorkspaceChatMain from './Hooks/useWorkspaceChatMain'

function WorkspaceChatMain() {
  /** TODO: Making record voice button works
   *  TODO: Making send image button works
   *  TODO: Making send attachments button works
   *  TODO: Split chat into 3 categories, Projects, Teams and Private
   *  TODO: Adding options for chat to
   *  TODO: 1. show its members if its Team or Projects
   *  TODO: 2. show shared files, images, videos
   *  TODO: 3. be able to kick the user if its Team or Projects chat, or leave the chat
   *  TODO: 4. be able to delete the chat
   */
  const { activeConversation, userConversations } = useWorkspaceChatMain()
  return (
    <div className='chats-container'>
      <div className='chats'>
        <h2>Chats</h2>
        <TeamChannelsContainer />
        <PrivateChannelsContainer userConversations={userConversations} />
      </div>
      {activeConversation?.conversation_id ?
        <div className='chat-room-container'>
          <ChatRoomHeader />
          <ChatRoom />
        </div>
        :
        <div></div>
      }
    </div>
  )
}

export default WorkspaceChatMain