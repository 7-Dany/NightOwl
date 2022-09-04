import React, { useState } from 'react'

type UseWorkspaceProcessMainReturn = {
  errorMsg: string
  show: string
  choice: string | null
  submitChoice: (event: React.MouseEvent<HTMLButtonElement>) => void
  choose: (event: React.MouseEvent<HTMLDivElement>, choice: string) => void
  setShow: React.Dispatch<React.SetStateAction<string>>
}

function useWorkspaceProcessMain(): UseWorkspaceProcessMainReturn {
  const [choice, setChoice] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [show, setShow] = useState('')

  function choose(event: React.MouseEvent<HTMLDivElement>, choice: string) {
    setChoice(choice)
    setErrorMsg('')
  }

  function submitChoice(event: React.MouseEvent<HTMLButtonElement>) {
    if (choice === 'create') {
      setShow('create')
    } else if (choice === 'join') {
      setShow('join')
    } else {
      setErrorMsg('Please choose option')
    }
  }

  return {
    errorMsg,
    show,
    choice,
    submitChoice,
    choose,
    setShow
  }
}

export default useWorkspaceProcessMain