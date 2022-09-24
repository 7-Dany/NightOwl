import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { SocketContext } from '../../../Context/SocketContext'
import Message from '../Components/Message'

type UseChatRoomReturn = {
  messageRef: React.RefObject<HTMLDivElement>
  sendBtn: React.RefObject<HTMLButtonElement>
  fileBtn: React.RefObject<HTMLInputElement>
  message: string
  order: boolean
  sendFile: boolean
  getMessages: () => JSX.Element[]
  setOrder: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSendFile: React.Dispatch<React.SetStateAction<boolean>>
  sendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  activeFileButton: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function useChatRoom(): UseChatRoomReturn {
  const { user } = useContext(AuthContext).AuthState
  const { SocketState, SocketDispatch } = useContext(SocketContext)
  const [message, setMessage] = useState('')
  const [order, setOrder] = useState(false)
  const [sendFile, setSendFile] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)
  const sendBtn = useRef<HTMLButtonElement>(null)
  const fileBtn = useRef<HTMLInputElement>(null)

  function scrollToBottom() {
    /** Scroll to the bottom of the chat after messages new message get added */
    messageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    /** If the user pressed Enter key while writing the message it will send the new message */
    if ((event).key === 'Enter') {
      sendBtn.current?.click()
    }
  }

  function sendMessage(event: React.MouseEvent<HTMLButtonElement>) {
    /** Reset the message and send prepare the new message to send for the server to get saved */
    setMessage('')
    setSendFile(true)
    if (message.length > 0) {
      SocketDispatch({ type: 'send_message', payload: { data: message, type: 'text' } })
    }
  }

  function activeFileButton(event: React.MouseEvent<HTMLButtonElement>) {
    /** Click input file when the attachment get clicked */
    fileBtn.current?.click()
  }

  useEffect(() => {
    /** Whenever messages get changed the chat room will scroll to bottom */
    scrollToBottom()
  }, [SocketState.messages])

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
                 messageType={message.message_type}
                 media={message.media_url}
        />
      )
    })
  }

  return {
    messageRef,
    sendBtn,
    message,
    order,
    fileBtn,
    sendFile,
    setSendFile,
    getMessages,
    sendMessage,
    setMessage,
    handleKeyPress,
    setOrder,
    activeFileButton
  }
}

export default useChatRoom