import { AttachmentIcon, SendMsgIcon } from '../Assets'
import useChatRoom from '../Hooks/useChatRoom'
import Record from './Record'
import Attachments from './Attachments'

function ChatRoom() {
  const {
    messageRef,
    message,
    sendBtn,
    setMessage,
    order,
    setOrder,
    fileBtn,
    sendFile,
    getMessages,
    sendMessage,
    handleKeyPress,
    activeFileButton,
    setSendFile
  } = useChatRoom()

  const chatMessages = getMessages()

  return (
    <div className='chat-room'>
      <div className='chat-room-body'>
        {chatMessages}
        <div ref={messageRef}></div>
      </div>
      <div className='chat-room-footer'>
        <Record setOrder={setOrder} sendBtn={sendBtn} order={order} />
        {!order &&
          <>
            <label htmlFor='msg-field' className='chat-room-footer__send-msg-label'>
              <input
                type='text'
                className='chat-room-footer__send-msg'
                id='msg-field' title='write message'
                placeholder='Send message...'
                name='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyUp={(event) => handleKeyPress(event)}
              />
            </label>
            <Attachments fileBtn={fileBtn} sendFile={sendFile} setSendFile={setSendFile} />
            <button className='chat-room-footer__attachment-icon-container' title='send attachment'
                    onClick={activeFileButton}>
              <AttachmentIcon className={'chat-room-footer__attachment-icon'} />
            </button>
            <button
              className='chat-room-footer__send-msg-btn-container'
              title='send message'
              type='submit'
              onClick={sendMessage}
              ref={sendBtn}
            >
              <SendMsgIcon className={'chat-room-footer__send-msg-btn'} />
            </button>
          </>
        }
      </div>
    </div>
  )
}

export default ChatRoom
