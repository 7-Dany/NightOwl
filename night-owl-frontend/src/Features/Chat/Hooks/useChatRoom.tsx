import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { SocketContext } from '../../../Context/SocketContext'
import { IUserMessage, IMessage } from '../../../Types'
import Message from '../Components/Message'

type UseChatRoomReturn = {
  messageRef: React.MutableRefObject<null>
  sendBtn: React.MutableRefObject<null>
  message: string
  getMessages: () => JSX.Element[]
  sendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void
  setMessage: React.Dispatch<React.SetStateAction<string>>
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

function useChatRoom(): UseChatRoomReturn {
  const { user } = useContext(AuthContext)
  const { SocketState, SocketDispatch } = useContext(SocketContext)
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState<IMessage>({} as IMessage)
  const messageRef = useRef(null)
  const sendBtn = useRef(null)

  function scrollToBottom() {
    /** Scroll to the bottom of the chat after messages new message get added */
    // @ts-ignore
    messageRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    /** If the user pressed Enter key while writing the message it will send the new message */
    if ((event).key === 'Enter') {
      // @ts-ignore
      sendBtn.current.click()
    }
  }

  function sendMessage(event: React.MouseEvent<HTMLButtonElement>) {
    /** Reset the message and send prepare the new message to send for the server to get saved*/
    setMessage('')
    setNewMessage({
      text: message,
      created_at: `${new Date().toISOString()}`,
      conversation_id: SocketState.activeConversation.conversation_id,
      user_id: user.id,
      media_url: null
    })
  }

  useEffect(() => {
    /** Whenever messages get changed the chat room will scroll to bottom */
    scrollToBottom()
  }, [SocketState.messages])

  useEffect(() => {
    /** Send message only when there is text on it */
    if (newMessage.text) {
      /** Setting up save message event */
      SocketState?.socket?.emit('save_message', {
        newMessage,
        conversation: SocketState.activeConversation.conversation_id
      }, (newMessage: IUserMessage) => {
        scrollToBottom()
        setNewMessage({} as IMessage)
        SocketDispatch({ type: 'add_new_message', payload: newMessage })
      })
    }

    /** Receiving new message event */
    SocketState?.socket?.on('receive_message', (data) => {
      SocketDispatch({ type: 'add_new_message', payload: data.newMessage })
      scrollToBottom()
    })
    return () => {
      /** Clean up receive message event */
      SocketState?.socket?.off('receive_message')
    }
  }, [newMessage.text])

  function getMessages() {
    /** Setting up messages to show user image and username when the user itself change */
    let userId = ''
    let showImage = false
    return SocketState.messages.map((message, index) => {
      if (userId !== message.user_id) {
        userId = message.user_id
        showImage = true
      } else {
        showImage = false
      }
      return (
        <Message key={message.message_id}
                 className={message.user_id === user.id ? 'user-msg' : 'others-msg'}
                 userImage={showImage ? message.image : null}
                 userName={showImage ? message.username : null}
                 messageDate={message.created_at}
                 messageContent={message.text}
        />
      )
    })
  }

  return {
    messageRef,
    sendBtn,
    message,
    getMessages,
    sendMessage,
    setMessage,
    handleKeyPress
  }
}

export default useChatRoom