import React from 'react'

type JoinWorkspaceProps = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

function JoinWorkspace({ setShow }: JoinWorkspaceProps) {
  return (
    <div className='join-workspace-container'>
      <h1>Hello World</h1>
    </div>
  )
}

export default JoinWorkspace