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
  Logout,
  Xicon
} from '../Assets'
import { NavLink, useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import useLogout from '../Hooks/useLogout'
import NewProject from './NewProject'
import { ProjectContext } from '../Context/ProjectContext'

type WorkspaceProps = {
  children: React.ReactNode
  title: string
}

function Workspace({ children, title }: WorkspaceProps) {
  const { ProjectState, ProjectDispatch } = useContext(ProjectContext)
  const { activeProject, projects } = ProjectState
  const { logoutUser } = useLogout()
  const [createProject, setCreateProject] = useState(false)
  const params = useParams()

  useEffect(() => {
    if (projects.length && params.id) {
      ProjectDispatch({ type: 'reload_active_project', payload: params.id })
    }
  }, [params.id, projects.length])

  function resetActiveProject() {
    ProjectDispatch({ type: 'reset_active_project' })
  }

  return (
    <div className='App'>
      <header className={activeProject ? 'header-container active' : 'header-container'}>
        <div className='header'>
          {activeProject &&
            <img src={activeProject?.logo} alt='' className='header__project-logo' />
          }
          <h2 className='header__title'>{activeProject ? activeProject.name : title}</h2>
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
            <NavLink to={`/projects/${activeProject.id}/overview`} className='navbar__project-link'>
              Overview
            </NavLink>
            <NavLink to={`/projects/${activeProject.id}/pages`} className='navbar__project-link'>
              Pages
            </NavLink>
            <NavLink to={`/projects/${activeProject.id}/discussions`} className='navbar__project-link'>
              Discussions
            </NavLink>
            <NavLink to={`/projects/${activeProject.id}/tasks`} className='navbar__project-link'>
              Tasks
            </NavLink>
            <NavLink to={`/projects/${activeProject.id}/planner`} className='navbar__project-link'>
              Planner
            </NavLink>
            <NavLink to={`/projects/${activeProject.id}/files`} className='navbar__project-link'>
              Files
            </NavLink>
            <NavLink to={`/projects/${activeProject.id}/members`} className='navbar__project-link'>
              Members
            </NavLink>
          </nav>
        }
      </header>
      <main className='main-app-container'>
        {createProject &&
          <div className='new-project-container'>
            <div className='new-project'>
              <div className='new-project__close' role='button'
                   onClick={(event) => setCreateProject(false)}>
                <Xicon className={'new-project__close-icon'} />
              </div>
              <NewProject setCreateProject={setCreateProject} />
            </div>
          </div>
        }
        {children}
      </main>
      <div className='sidebar'>
        <div className='four-circles'>
          <FourCircles />
        </div>
        <div className='main-icons' onClick={resetActiveProject}>
          <NavLink to='/home' className='main-icons__icon-container'>
            <HomeIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/projects' className='main-icons__icon-container'>
            <ProjectsIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/calender' className='main-icons__icon-container'>
            <CalenderIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/discussions' className='main-icons__icon-container'>
            <DiscussionIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/tasks' className='main-icons__icon-container'>
            <TodoIcon className={'main-icons__icon'} />
          </NavLink>
          <NavLink to='/chats' className='main-icons__icon-container'>
            <ChatIcon className={'main-icons__icon'} />
          </NavLink>
        </div>
        <div className='footer-icons' onClick={resetActiveProject}>
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