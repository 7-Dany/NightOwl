import WorkSpaceHeader from '../Layout/WorkSpaceHeader'
import Sidebar from '../Layout/Sidebar'
import Members from '../Features/Members'

function MembersPage() {
  return (
    <div className='App'>
      <WorkSpaceHeader />
      <Sidebar />
      <Members />
    </div>
  )
}

export default MembersPage