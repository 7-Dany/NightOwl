import { Xicon } from '../../../Assets'
import useCreateWorkspace from '../Hooks/useCreateWorkspace'
import React from 'react'

type CreateWorkspaceProps = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

function CreateWorkspace({ setShow }: CreateWorkspaceProps) {
  const { formik, closeCreateWorkspace, errorMsg } = useCreateWorkspace({ setShow })

  return (
    <div className='create-workspace-container'>
      <div className='create-workspace'>
        <div className={'create-workspace__close'} onClick={closeCreateWorkspace}>
          <Xicon className={'create-workspace__x-icon'} />
        </div>
        <h2 className='create-workspace__title'>Create Workspace</h2>
        <p className='create-workspace__error-msg'>{errorMsg}</p>
        <form className='create-workspace__form' onSubmit={formik.handleSubmit}>
          <fieldset className='create-workspace__fieldset'>
            <label htmlFor='workspace-name' className='create-workspace__label'>Workspace Name</label>
            <input type='text' id='workspace-name' name='name' className='create-workspace__input'
                   value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                   placeholder='Enter workspace name...' autoComplete='off' />
            <p className='create-workspace__field-error'>{formik.touched.name && formik.errors.name}</p>
          </fieldset>
          <button type='submit' className='create-workspace__submit-btn'>Create Workspace</button>
        </form>
      </div>
    </div>
  )
}

export default CreateWorkspace