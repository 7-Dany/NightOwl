import Project from './Components/Project'
import data from './data.json'

function WorkspaceProjectsMain() {
  const projects = data.data.map(project => {
    return (
      <Project key={project.id} id={project.id} image={project.image} title={project.title} summary={project.summary} />
    )
  })
  return (
    <div className='workplace-projects-main-container'>
      {projects}
    </div>
  )
}

export default WorkspaceProjectsMain