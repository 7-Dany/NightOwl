import {
  SearchIcon,
  PlusIcon,
  NotificationIcon,
  PersonImage,
  HomeIcon,
  FourCircles,
  ProjectsIcon,
  CalenderIcon,
  DiscussionIcon,
  TodoIcon,
  ChatIcon,
  MembersIcon,
  SettingsIcon,
  Logout
} from '../Assets'
import { NavLink } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import useLogout from '../Hooks/useLogout'
import { AuthContext } from '../Context/AuthContext'

type WorkspaceProps = {
  children: React.ReactNode
  title: string
}

function Workspace({ children, title }: WorkspaceProps) {
  const { activeProject } = useContext(AuthContext).AuthState
  const { logoutUser } = useLogout()
  const [createProject, setCreateProject] = useState(false)
  console.log(activeProject)
  return (
    <div className='App'>
      <header className={activeProject ? 'header-container active' : 'header-container'}>
        <div className='header'>
          {activeProject &&
            <img src={activeProject?.image} alt='' className='header__project-logo' />
          }
          <h2 className='header__title'>{activeProject ? activeProject.title : title}</h2>
          <div className='search-area'>
            <label htmlFor='search' className='search-area__container'>
              <SearchIcon className={'search-area__icon'} />
              <input type='text' id='search' className='search-area__input' placeholder='Search...' title='Search' />
            </label>
          </div>
          <div className='personal-info'>
            <button className='personal-info__create-new'
                    onClick={(event) => setCreateProject(prevState => !prevState)}>
              <PlusIcon className={'personal-info__create-new__icon'} />
              New Project
            </button>
            <NotificationIcon className={'personal-info__notification-icon'} />
            <img src={PersonImage} alt='Person' className={'personal-info__person-img'} />
          </div>
        </div>
        {activeProject &&
          <nav className='navbar'>
            <NavLink to='/project/overview' className='navbar__project-link'>
              Overview
            </NavLink>
            <NavLink to='/project/pages' className='navbar__project-link'>
              Pages
            </NavLink>
            <NavLink to='/project/discussions' className='navbar__project-link'>
              Discussions
            </NavLink>
            <NavLink to='/project/tasks' className='navbar__project-link'>
              Tasks
            </NavLink>
            <NavLink to='/project/planner' className='navbar__project-link'>
              Planner
            </NavLink>
            <NavLink to='/project/files' className='navbar__project-link'>
              Files
            </NavLink>
            <NavLink to='/project/members' className='navbar__project-link'>
              Members
            </NavLink>
          </nav>
        }
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