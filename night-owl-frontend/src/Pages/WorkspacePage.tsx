import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function WorkspacePage() {
  const navigate = useNavigate()
  const [choice, setChoice] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  function choose(event: React.MouseEvent<HTMLDivElement>, choice: string) {
    setChoice(choice)
    setErrorMsg('')
  }

  function submitChoice() {
    if (choice === 'create') {
      navigate('create')
    } else if (choice === 'join') {
      navigate('join')
    } else {
      setErrorMsg('Please choose option')
    }
  }

  return (
    <div className='workspace-container'>
      <h1 className='workspace-title'>Select option</h1>
      <p className='workspace-error-msg'>{errorMsg}</p>
      <div className='workspace'>
        <div className={choice === 'create' ? 'workspace__choice active' : 'workspace__choice'}
             onClick={(event) => choose(event, 'create')}>
          <h2>Create New Workspace</h2>
          <div
            className={choice === 'create' ? 'workspace__active-circle active' : 'workspace__active-circle'}></div>
        </div>
        <div className={choice === 'join' ? 'workspace__choice active' : 'workspace__choice'}
             onClick={(event) => choose(event, 'join')}>
          <h2>Join Workspace</h2>
          <div
            className='workspace__active-circle'>
          </div>
        </div>
      </div>
      <button onClick={submitChoice} className='workspace-submit-btn'>Continue</button>
    </div>
  )
}

export default WorkspacePage