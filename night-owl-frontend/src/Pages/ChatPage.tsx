import Chat from '../Features/Chat'
import Workspace from '../Layout/Workspace'

function ChatPage() {
  return (
    <Workspace title={'Chats'}>
      <Chat />
    </Workspace>
  )
}

export default ChatPage