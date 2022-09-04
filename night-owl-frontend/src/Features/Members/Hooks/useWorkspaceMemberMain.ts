import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/auth.context'
import { WorkspaceMember, WorkspaceRequest } from '../Types'
import { getMembersAndRequests } from '../Api/workspace.api'
import { Workspace } from '../../../Types'

type UseWorkspaceMemberMainReturn = {
  show: string
  copiedMsg: string
  members: WorkspaceMember[]
  requests: WorkspaceRequest[]
  workspace: Workspace
  showRequestsOrMembers: (event: React.MouseEvent<HTMLDivElement>, show: string) => void
  copyText: (event: React.MouseEvent<HTMLDivElement>) => void
}

function useWorkspaceMemberMain(): UseWorkspaceMemberMainReturn {
  const { workspace, user } = useContext(AuthContext)
  const [copiedMsg, setCopiedMsg] = useState('workspace-id__hidden-msg')
  const [members, setMembers] = useState<WorkspaceMember[]>([])
  const [requests, setRequests] = useState<WorkspaceRequest[]>([])
  const [show, setShow] = useState('main')

  function copyText(event: React.MouseEvent<HTMLDivElement>): void {
    navigator.clipboard.writeText(workspace.workspace_id)
      .then(data => {
        setCopiedMsg('workspace-id__active-msg')
        setTimeout(() => {
          setCopiedMsg('workspace-id__hidden-msg')
        }, 1000)
      })
  }

  function showRequestsOrMembers(event: React.MouseEvent<HTMLDivElement>, show: string): void {
    setShow(show)
  }

  useEffect(() => {
    const controller = new AbortController()
    getMembersAndRequests({
      controller,
      values: { workspace_id: workspace.workspace_id, token: user.token }
    })
      .then(data => {
        if (data) {
          setRequests(data.requests)
          setMembers(data.members)
        } else {
          setRequests([])
          setMembers([])
        }
      })
      .catch(error => {
        setRequests([])
        setMembers([])
      })
    return () => {
      controller.abort()
    }
  }, [show])

  return {
    show,
    copiedMsg,
    members,
    requests,
    workspace,
    showRequestsOrMembers,
    copyText
  }
}

export default useWorkspaceMemberMain