import React, { useState } from 'react'
import CreateWorkspace from './Components/CreateWorkspace'
import JoinWorkspace from './Components/JoinWorkspace'
import { createImage, joinImage } from './Assets'

function WorkspaceProcessMain() {
  const [choice, setChoice] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [show, setShow] = useState('')

  function choose(event: React.MouseEvent<HTMLDivElement>, choice: string) {
    setChoice(choice)
    setErrorMsg('')
  }

  function submitChoice() {
    if (choice === 'create') {
      setShow('create')
    } else if (choice === 'join') {
      setShow('join')
    } else {
      setErrorMsg('Please choose option')
    }
  }

  return (
    <div className='workspace-container'>
      <div className='main-workspace'>
        <h1 className='main-workspace__title'>Select option</h1>
        <p className='main-workspace__error-msg'>{errorMsg}</p>
        <div className='workspace'>
          <div className={choice === 'create' ? 'workspace__choice active' : 'workspace__choice'}
               onClick={(event) => choose(event, 'create')}>
            <img src={createImage} alt='2 persons hold puzzle' />
            <h2>Create New Workspace</h2>
            <div className='workspace__active-circle'></div>
          </div>
          <div className={choice === 'join' ? 'workspace__choice active' : 'workspace__choice'}
               onClick={(event) => choose(event, 'join')}>
            <img src={joinImage} alt='3 persons hold puzzle' />
            <h2>Join Workspace</h2>
            <div className='workspace__active-circle'></div>
          </div>
        </div>
        <button onClick={submitChoice} className='main-workspace__submit-btn'>Continue</button>
      </div>
      {show === 'create' && <CreateWorkspace setShow={setShow} />}
      {show === 'join' && <JoinWorkspace setShow={setShow} />}
    </div>
  )
}

export default WorkspaceProcessMain
