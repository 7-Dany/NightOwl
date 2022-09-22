import React, { useState } from 'react'
import { saveAs } from 'file-saver'

type MessageProps = {
  className: string
  userImage: string | null
  userName: string | null
  messageDate: string | null
  messageContent: string
  messageType: string
  media: string | null
}

function Message(
  {
    className,
    userImage,
    userName,
    messageDate,
    messageContent,
    messageType,
    media
  }: MessageProps) {
  const [showDate, setShowDate] = useState(false)

  function handleShowDate() {
    setShowDate(prevShowDate => !prevShowDate)
  }

  function saveFile() {
    saveAs(media as string)
  }

  return (
    <div className={`${className} message-container`}>
      <div className='message-container__person-info'>
        {userImage &&
          <img src={userImage} alt='Person' />
        }
        {userName &&
          <p className='person-msg-info'>{userName}</p>
        }
      </div>
      {showDate &&
        <span className='message-container__message-date'>{messageDate}</span>
      }
      <div className={messageType === 'image' ? 'message image' : 'message'} onClick={handleShowDate}>
        {messageType === 'text' &&
          <p className='message__content'>
            {messageContent}
          </p>
        }
        {messageType === 'voice' &&
          <audio src={media as string} className='message__audio' controls></audio>
        }
        {messageType === 'image' &&
          <a href={media as string} target='_blank'>
            <img src={media as string} alt='' className='message__image' />
          </a>
        }
      </div>
    </div>
  )
}

export default Message