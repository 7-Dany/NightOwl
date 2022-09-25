import { DiscussionIcon, FilesIcon, MembersIcon, PlannerIcon, TodoIcon } from '../../../Assets'
import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'

type ProjectProps = {
  id: string
  image: string
  title: string
  summary: string
}

function Project({ id, image, title, summary }: ProjectProps) {
  const { AuthDispatch } = useContext(AuthContext)

  function handleClick() {
    AuthDispatch({ type: 'update_active_project', payload: { id, image, summary, title } })
  }

  return (
    <div className='workspace-project' onClick={handleClick}>
      <img src={image} alt='project logo' className='workspace-project__logo' />
      <h2 className='workspace-project__title'>{title}</h2>
      <p className='workspace-project__summary'>
        {summary}
      </p>
      <div className='workspace-project__icons-container'>
        <button className='workspace-project__icon-btn' title='Discussions'>
          <DiscussionIcon className={'workspace-project__icon'} />
        </button>
        <button className='workspace-project__icon-btn' title='Tasks'>
          <TodoIcon className={'workspace-project__icon'} />
        </button>
        <button className='workspace-project__icon-btn' title='Weekly Planner'>
          <PlannerIcon className={'workspace-project__icon'} />
        </button>
        <button className='workspace-project__icon-btn' title='Files'>
          <FilesIcon className={'workspace-project__icon'} />
        </button>
        <button className='workspace-project__icon-btn' title='Members'>
          <MembersIcon className={'workspace-project__icon'} />
        </button>
      </div>
    </div>
  )
}

export default Project