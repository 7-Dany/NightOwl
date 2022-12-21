import Workspace from '../Layout/Workspace'
import MyTasks from '../Features/MyTasks'

function MyTasksPage() {
  return (
    <Workspace title={'My Tasks'}>
      <MyTasks />
    </Workspace>
  )
}

export default MyTasksPage