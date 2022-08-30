import WorkSpaceHeader from '../Layout/WorkSpaceHeader'
import WorkspaceSidebar from '../Layout/WorkspaceSidebar'
import WorkspaceMembersMain from '../Features/Members'

function MembersPage() {
  return (
    <div className='App'>
      <WorkSpaceHeader />
      <WorkspaceSidebar />
      <WorkspaceMembersMain />
    </div>
  )
}

export default MembersPage