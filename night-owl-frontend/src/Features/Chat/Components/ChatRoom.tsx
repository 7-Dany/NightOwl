import Message from './Message'
import { SendMsgIcon, AttachmentIcon, SendImageIcon, MicIcon } from '../Assets'

function ChatRoom() {
  return (
    <div className='chat-room'>
      <div className='chat-room-body'>
        <Message className={'user-msg'} userName={'Ali Ahmed'} userImage={'./images/person.svg'}
                 messageDate={'4:45pm'}
                 messageContent={'Hello How are You?'} />
        <Message className={'others-msg'} userName={'Ali Ahmed'} userImage={'./images/person.svg'}
                 messageDate={'4:45pm'}
                 messageContent={'Hello How are You?'} />
        <Message className={'user-msg'} userName={'Ali Ahmed'} userImage={'./images/person.svg'}
                 messageDate={'4:45pm'}
                 messageContent={'Hello How are You?'} />
        <Message className={'others-msg'} userName={'Ali Ahmed'} userImage={'./images/person.svg'}
                 messageDate={'4:45pm'}
                 messageContent={'Hello How are You?'} />
      </div>
      <div className='chat-room-footer'>
        <div className='chat-room-footer__mic-icon-container' role='button' title='send voice'>
          <MicIcon className={'chat-room-footer__mic-icon'} />
        </div>
        <div className='chat-room-footer__image-icon-container' role='button' title='send image'>
          <SendImageIcon className={'chat-room-footer__image-icon'} />
        </div>
        <div className='chat-room-footer__attachment-icon-container' role='button' title='send attachment'>
          <AttachmentIcon className={'chat-room-footer__attachment-icon'} />
        </div>
        <div className='chat-room-footer__send-msg-btn-container' role='button' title='send message'>
          <SendMsgIcon className={'chat-room-footer__send-msg-btn'} />
        </div>
        <label htmlFor='msg-field'>
          <input type='text' className='chat-room-footer__send-msg' id='msg-field' title='write message'
                 placeholder='write something...' />
        </label>
      </div>
    </div>
  )
}

export default ChatRoom