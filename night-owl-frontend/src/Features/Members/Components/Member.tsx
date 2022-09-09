import { ChatIcon, DotsIcons } from '../../../Assets'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/auth.context'
import { useNavigate } from 'react-router-dom'
import { createPrivateChat } from '../Api/conversations.api'
import { ActiveContext } from '../../../Context/active.context'

type MemberProps = {
  memberId: string
  image: string
  name: string
  email: string
  projects: number
  role: string
  timezone: string
}

function Member({ memberId, image, name, projects, timezone, email, role }: MemberProps) {
  const { user } = useContext(AuthContext)
  const { setActiveConversation } = useContext(ActiveContext)
  const [newChat, setNewChat] = useState(false)
  const navigate = useNavigate()

  function openChat(event: React.MouseEvent<HTMLDivElement>) {
    setNewChat(true)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (newChat) {
      createPrivateChat({
        controller,
        values: { user_id: user.id, member_id: memberId, token: user.token }
      })
        .then(data => {
          setNewChat(false)
          setActiveConversation(data)
          navigate('/chat')
        })
        .catch(error => {
          setNewChat(false)
        })
    }
    return () => {
      controller.abort()
    }
  }, [newChat])

  return (
    <div className='member'>
      <img src={image} alt='person' className='member__image' />
      <h3 className='member__name'>{name}</h3>
      <p className='member__email'>{email}</p>
      <p className='member__projects'>{projects}</p>
      <p className='member__role'>{role}</p>
      <p className='member__timezone'>{timezone}</p>
      {user.email !== email ?
        <div className='member__option-container' onClick={openChat}>
          <ChatIcon className={'member__chat'} />
        </div> :
        <p className='member__active'>You</p>
      }
    </div>
  )
}

export default Member