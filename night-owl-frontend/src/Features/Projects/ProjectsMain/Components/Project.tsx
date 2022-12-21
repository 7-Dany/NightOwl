import {
  DiscussionIcon,
  FilesIcon,
  MembersIcon,
  PlannerIcon,
  TodoIcon,
  PagesIcon,
  SettingsIcon, DotsIcons
} from '../../../../Assets'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import UpdateProject from './UpdateProject'
import { ProjectContext } from '../../../../Context/ProjectContext'

type ProjectProps = {
  id: string
  logo: string
  name: string
  summary: string
}

function Project({ id, logo, name, summary }: ProjectProps) {
  const { ProjectDispatch } = useContext(ProjectContext)
  const { AuthState } = useContext(AuthContext)
  const [showProjectSettings, setShowProjectSettings] = useState(false)
  const navigate = useNavigate()

  function handleClick(event: React.MouseEvent, order: string) {
    ProjectDispatch({ type: 'update_active_project', payload: { id, logo, summary, name } })
    order ? navigate(`/projects/${id}/${order}`) : navigate(`/projects`)
  }

  return (
    <>
      <div className='workspace-project'>
        <div className='workspace-project__settings' role='button'
             title={'Change project info'}
             onClick={(event) => setShowProjectSettings(true)}
        >
          <DotsIcons className={'workspace-project__settings-icon'} />
        </div>
        <div className='workspace-project__info'
             onClick={(event) => handleClick(event, 'overview')}
        >
          <img src={logo} alt='project logo' className='workspace-project__logo' />
          <h2 className='workspace-project__title'>{name}</h2>
          <p className='workspace-project__summary'>
            {summary}
          </p>
        </div>
        <div className='workspace-project__icons-container'>
          <button className='workspace-project__icon-btn' title='Pages'
                  onClick={(event) => handleClick(event, 'pages')}
          >
            <PagesIcon className={'workspace-project__icon'} />
          </button>
          <button className='workspace-project__icon-btn' title='Discussions'
                  onClick={(event) => handleClick(event, 'discussions')}
          >
            <DiscussionIcon className={'workspace-project__icon'} />
          </button>
          <button className='workspace-project__icon-btn' title='Tasks'
                  onClick={(event) => handleClick(event, 'tasks')}
          >
            <TodoIcon className={'workspace-project__icon'} />
          </button>
          <button className='workspace-project__icon-btn' title='Weekly Planner'
                  onClick={(event) => handleClick(event, 'planner')}
          >
            <PlannerIcon className={'workspace-project__icon'} />
          </button>
          <button className='workspace-project__icon-btn' title='Files'
                  onClick={(event) => handleClick(event, 'files')}
          >
            <FilesIcon className={'workspace-project__icon'} />
          </button>
          <button className='workspace-project__icon-btn' title='Members'
                  onClick={(event) => handleClick(event, 'members')}
          >
            <MembersIcon className={'workspace-project__icon'} />
          </button>
        </div>
      </div>
      {showProjectSettings &&
        <div className='update-project-container'>
          <UpdateProject id={id}
                         logo={logo}
                         name={name}
                         summary={summary}
                         token={AuthState.user.token}
                         setShowProjectSettings={setShowProjectSettings}
          />
        </div>
      }
    </>
  )
}

export default Project