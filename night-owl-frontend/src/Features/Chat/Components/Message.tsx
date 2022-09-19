import { useState } from 'react'

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
      <div className='message' onClick={handleShowDate}>
        {messageType === 'text' &&
          <p className='message__content'>
            {messageContent}
          </p>
        }
        {messageType === 'voice' &&
          <audio src={media as string} controls></audio>
        }
      </div>
    </div>
  )
}

export default Message