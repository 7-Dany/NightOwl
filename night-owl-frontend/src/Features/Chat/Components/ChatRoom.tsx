import { AttachmentIcon, MicIcon, SendImageIcon, SendMsgIcon } from '../Assets'
import useChatRoom from '../Hooks/useChatRoom'

function ChatRoom() {
  const {
    messageRef,
    message,
    sendBtn,
    getMessages,
    sendMessage,
    setMessage,
    handleKeyPress,
    sendRecord
  } = useChatRoom()

  const chatMessages = getMessages()

  return (
    <div className='chat-room'>
      <div className='chat-room-body'>
        {chatMessages}
        <div ref={messageRef}></div>
      </div>
      <div className='chat-room-footer'>
        <button className='chat-room-footer__mic-icon-container' title='send voice' onClick={sendRecord}>
          <MicIcon className={'chat-room-footer__mic-icon'} />
        </button>
        <button className='chat-room-footer__image-icon-container' title='send image'>
          <SendImageIcon className={'chat-room-footer__image-icon'} />
        </button>
        <button className='chat-room-footer__attachment-icon-container' title='send attachment'>
          <AttachmentIcon className={'chat-room-footer__attachment-icon'} />
        </button>
        <label htmlFor='msg-field'>
          <input
            type='text'
            className='chat-room-footer__send-msg'
            id='msg-field' title='write message'
            placeholder='write something...'
            name='message'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyUp={(event) => handleKeyPress(event)}
          />
        </label>
        <button
          className='chat-room-footer__send-msg-btn-container'
          title='send message'
          type='submit'
          onClick={sendMessage}
          ref={sendBtn}
        >
          <SendMsgIcon className={'chat-room-footer__send-msg-btn'} />
        </button>
      </div>
    </div>
  )
}

export default ChatRoom
