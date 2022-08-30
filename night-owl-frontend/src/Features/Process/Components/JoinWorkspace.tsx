import React from 'react'
import { Xicon } from '../../../Assets'
import useJoinWorkspace from '../Hooks/useJoinWorkspace'

type JoinWorkspaceProps = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

function JoinWorkspace({ setShow }: JoinWorkspaceProps) {
  const {
    workspaceRequest,
    closeJoinWorkspace,
    formik,
    errorMsg
  } = useJoinWorkspace({
    setShow
  })

  return (
    <div className='join-workspace-container'>
      {!workspaceRequest.state && <div className='join-workspace'>
        <div className={'join-workspace__close'} onClick={closeJoinWorkspace}>
          <Xicon className={'join-workspace__x-icon'} />
        </div>
        <h2 className='join-workspace__title'>Join Workspace</h2>
        <p className='join-workspace__error-msg'>{errorMsg}</p>
        <form className='join-workspace__form' onSubmit={formik.handleSubmit}>
          <fieldset className='join-workspace__fieldset'>
            <label htmlFor='workspace-id' className='join-workspace__label'>Workspace id</label>
            <input type='text' id='workspace-id' name='workspaceId' className='join-workspace__input'
                   value={formik.values.workspaceId} onChange={formik.handleChange} onBlur={formik.handleBlur}
                   placeholder='Write workspace id...' autoComplete='off' />
            <p className='join-workspace__field-error'>{formik.touched.workspaceId && formik.errors.workspaceId}</p>
          </fieldset>
          <button type='submit' className='join-workspace__submit-btn'>Join Workspace</button>
        </form>
      </div>}
    </div>
  )
}

export default JoinWorkspace