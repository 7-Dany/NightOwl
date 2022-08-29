import React, { useContext, useState } from 'react'
import { Xicon } from '../../../Assets'
import { AuthContext } from '../../../Context/auth.context'
import { useFormik } from 'formik'
import * as Yup from 'yup'

type JoinWorkspaceProps = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

function JoinWorkspace({ setShow }: JoinWorkspaceProps) {
  const { user } = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState('')
  const formik = useFormik({
    initialValues: { workspaceId: '' },
    validationSchema: Yup.object({
      workspaceId: Yup.string().required('Workspace id is required')
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2))
      actions.resetForm()
    }
  })

  function closeJoinWorkspace(event: React.MouseEvent<HTMLDivElement>) {
    setShow('')
    setErrorMsg('')
  }

  return (
    <div className='join-workspace-container'>
      <div className='join-workspace'>
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
      </div>
    </div>
  )
}

export default JoinWorkspace