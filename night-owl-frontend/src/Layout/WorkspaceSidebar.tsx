import {
  ProjectsIcon,
  MembersIcon,
  HomeIcon,
  SettingsIcon,
  FourCircles,
  CalenderIcon,
  DiscussionIcon,
  TodoIcon,
  ChatIcon,
  Logout
} from '../Assets'
import { NavLink, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/auth.context'
import { deleteUserSession } from '../Api/users.api'
import { AuthUser, Workspace } from '../Types'

function WorkspaceSidebar() {
  const [logout, setLogout] = useState(false)
  const { user, setUser, setWorkspace } = useContext(AuthContext)
  const navigate = useNavigate()

  function logoutUser(event: React.MouseEvent<HTMLDivElement>) {
    setLogout(true)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (logout) {
      deleteUserSession({ controller, token: user.token })
        .then(data => {
          setUser({} as AuthUser)
          setWorkspace({} as Workspace)
          setLogout(false)
          navigate('/')
        })
        .catch(error => {
          setUser({} as AuthUser)
          setWorkspace({} as Workspace)
          setLogout(false)
          navigate('/')
        })
    }
    return () => {
      controller.abort()
    }
  }, [logout])

  return (
    <div className='sidebar'>
      <div className='four-circles'>
        <FourCircles />
      </div>
      <div className='main-icons'>
        <NavLink to='/home' className='main-icons__icon-container' title='Home'>
          <HomeIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/projects' className='main-icons__icon-container' title='Projects'>
          <ProjectsIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/events' className='main-icons__icon-container' title='Calender'>
          <CalenderIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/discussion' className='main-icons__icon-container' title='Discussion'>
          <DiscussionIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/todo' className='main-icons__icon-container' title='Todo list'>
          <TodoIcon className={'main-icons__icon'} />
        </NavLink>
        <NavLink to='/chat' className='main-icons__icon-container' title='Chat'>
          <ChatIcon className={'main-icons__icon'} />
        </NavLink>
      </div>
      <div className='footer-icons'>
        <NavLink to='/members' className='footer-icons__icon-container' title='Team members'>
          <MembersIcon className={'footer-icons__icon'} />
        </NavLink>
        <NavLink to='/settings' className='footer-icons__icon-container' title='Settings'>
          <SettingsIcon className={'footer-icons__icon'} />
        </NavLink>
        <div className='footer-icons__icon-container' title='Logout' onClick={logoutUser}>
          <Logout className={'footer-icons__icon'} />
        </div>
      </div>
    </div>
  )
}

export default WorkspaceSidebar