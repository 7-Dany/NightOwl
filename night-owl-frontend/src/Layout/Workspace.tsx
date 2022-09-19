import {
  SearchIcon,
  PlusIcon,
  NotificationIcon,
  PersonImage,
  HomeIcon,
  FourCircles,
  ProjectsIcon,
  CalenderIcon,
  DiscussionIcon, TodoIcon, ChatIcon, MembersIcon, SettingsIcon, Logout
} from '../Assets'
import { NavLink } from 'react-router-dom'
import React from 'react'
import useLogout from '../Hooks/useLogout'

type WorkspaceProps = {
  children: React.ReactNode
  title: string
}

function Workspace({ children, title }: WorkspaceProps) {
  const { logoutUser } = useLogout()
  return (
    <div className='App'>
      <header className='header'>
        <h2 className='header__title'>{title}</h2>
        <div className='search-area'>
          <label htmlFor='search' className='search-area__container'>
            <SearchIcon className={'search-area__icon'} />
            <input type='text' id='search' className='search-area__input' placeholder='Search...' title='Search' />
          </label>
        </div>
        <div className='personal-info'>
          <button className='personal-info__create-new'>
            <PlusIcon className={'personal-info__create-new__icon'} />
            Create New
          </button>
          <NotificationIcon className={'personal-info__notification-icon'} />
          <img src={PersonImage} alt='Person' className={'personal-info__person-img'} />
        </div>
      </header>
      <main className='main-app-container'>
        {children}
      </main>
      <div className='sidebar'>
        <div className='four-circles'>
          <FourCircles />
        </div>
        <div className='main-icons'>
          <NavLink to='/home' className='main-icons__icon-container'>
            <HomeIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/projects' className='main-icons__icon-container'>
            <ProjectsIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/events' className='main-icons__icon-container'>
            <CalenderIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/discussion' className='main-icons__icon-container'>
            <DiscussionIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/todo' className='main-icons__icon-container'>
            <TodoIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/chat' className='main-icons__icon-container'>
            <ChatIcon className={'main-icons__icon'} />
          </NavLink>
        </div>
        <div className='footer-icons'>
          <NavLink to='/members' className='footer-icons__icon-container'>
            <MembersIcon className={'footer-icons__icon'} />
          </NavLink>
          <NavLink to='/settings' className='footer-icons__icon-container'>
            <SettingsIcon className={'footer-icons__icon'} />
          </NavLink>
          <div className='footer-icons__icon-container' onClick={logoutUser}>
            <Logout className={'footer-icons__icon'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace