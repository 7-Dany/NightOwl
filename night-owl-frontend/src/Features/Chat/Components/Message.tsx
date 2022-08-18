type MessageProps = {
  className: string
  userImage: string
  userName: string
  messageDate: string
  messageContent: string
}

function Message({ className, userImage, userName, messageDate, messageContent }: MessageProps) {
  return (
    <div className={className}>
      <img src={userImage} alt='Person' />
      <p className='person-msg-info'>{userName} <span>{messageDate}</span></p>
      <div className='message'>
        <p>
          {messageContent}
        </p>
      </div>
    </div>
  )
}

export default Message