import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../../Context/auth.context'
import { createWorkspace } from '../Api/workspaces.api'
import { WorkspaceContext } from '../../../Context/workspace.context'
import { useNavigate } from 'react-router-dom'
import { Xicon } from '../../../Assets'

type CreateWorkspaceProps = {
  setShow: React.Dispatch<React.SetStateAction<string>>
}

function CreateWorkspace({ setShow }: CreateWorkspaceProps) {
  const { user } = useContext(AuthContext)
  const { setWorkspace } = useContext(WorkspaceContext)
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Workspace name is required')
    }),
    onSubmit: (values, actions) => {
      const controller = new AbortController()
      createWorkspace({ controller, values: { user_id: user.id, name: values.name, token: user.token } })
        .then(data => {
          setWorkspace(data)
          setErrorMsg('')
          navigate('/home')
        })
        .catch(error => {
          setErrorMsg(error.response.data.message)
        })
      actions.resetForm()
    }
  })

  function closeCreateWorkspace(event: React.MouseEvent<HTMLDivElement>) {
    setShow('')
    setErrorMsg('')
  }

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