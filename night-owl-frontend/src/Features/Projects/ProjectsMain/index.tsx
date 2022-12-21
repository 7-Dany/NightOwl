import Project from './Components/Project'
import { useContext } from 'react'
import { ProjectContext } from '../../../Context/ProjectContext'

function WorkspaceProjectsMain() {
  const { projects, activeProject } = useContext(ProjectContext).ProjectState

  const projectsComponents = projects.map(project => {
    return <Project key={project.project_id} id={project.project_id} logo={project.logo} name={project.name}
                    summary={project.summary} />
  })

  return projects && !activeProject ? (
    <div className='workplace-projects-main-container'>
      {projectsComponents}
    </div>
  ) : <div></div>
}

export default WorkspaceProjectsMain