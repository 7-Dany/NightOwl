import { Formik, Form, Field } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import { AuthContext } from '../Context/AuthContext'
import { WorkspacesEndpoints } from '../Api/workspaces.api'
import { useNavigate } from 'react-router-dom'
import { ProjectContext } from '../Context/ProjectContext'
import { ProjectsEndpoints } from '../Api/projects.api'
import newProject from './NewProject'

const projectsEndpoints = new ProjectsEndpoints()
const workspacesEndpoints = new WorkspacesEndpoints()

type Option = {
  value: string
  label: string
  image: string
}

interface FormValues {
  logo: File | null
  name: string
  summary: string
  admin: string
  adminTitle: string
}

type NewProjectProps = {
  setCreateProject: React.Dispatch<React.SetStateAction<boolean>>
}

function NewProject({ setCreateProject }: NewProjectProps) {
  const navigate = useNavigate()
  const { user, workspace } = useContext(AuthContext).AuthState
  const { ProjectDispatch } = useContext(ProjectContext)
  const fileInput = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [options, setOptions] = useState<Option[]>([])
  const [previewImage, setPreviewImage] = useState('./images/person.svg')
  const initialValues: FormValues = {
    logo: null,
    name: '',
    summary: '',
    admin: '',
    adminTitle: ''
  }

  useEffect(() => {
    const controller = new AbortController()
    workspacesEndpoints.getWorkspaceMembers(
      controller,
      workspace.workspace_id,
      user.token
    )
      .then(data => {
        setOptions(prevState => {
          return data.map(member => {
            return { value: member.user_id, label: member.username, image: member.image }
          })
        })
      })
      .catch(error => {
        setOptions([])
      })
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    let url = './image/person.svg'
    if (selectedFile) {
      url = URL.createObjectURL(selectedFile)
      setPreviewImage(url)
    }
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  return (
    <Formik initialValues={initialValues} onSubmit={(values: FormValues, actions) => {
      const controller = new AbortController()
      projectsEndpoints.createProject(
        controller,
        { ...values, workspace_id: workspace.workspace_id },
        user.token
      )
        .then(data => {
          ProjectDispatch({ type: 'update_active_project', payload: data })
          ProjectDispatch({ type: 'add_project', payload: data })
          navigate('/projects')
          setCreateProject(false)
        })
      actions.resetForm()
      setPreviewImage('./images/person.svg')
    }}>{(props) => {
      return (
        <Form className='new-project__form' encType='multipart/form-data'>
          <fieldset className='new-project__logo-fieldset'>
            <label htmlFor='file'>
              <img src={previewImage} alt='' className='new-project__logo' />
            </label>
            <input type='file'
                   hidden={true}
                   accept='image/*'
                   ref={fileInput}
                   id='file'
                   onChange={event => {
                     props.setFieldValue('logo', event.target.files ? event.target.files[0] : null)
                     setSelectedFile(event.target.files ? event.target.files[0] : null)
                     event.target.value = ''
                   }}
            />
            <div role='button'
                 onClick={(event) => fileInput.current?.click()}
                 className='new-project__choose-logo'>
              Choose logo
            </div>
          </fieldset>
          <fieldset className='new-project__fieldset'>
            <label htmlFor='project-name' className='new-project__label'>Name</label>
            <Field name='name' id='project-name' className='new-project__input' placeholder='Enter Project Name...' />
          </fieldset>
          <fieldset className='new-project__fieldset'>
            <label htmlFor='summary' className='new-project__label'>Summary</label>
            <Field as='textarea' rows='5' cols='30' name='summary' id='summary' className='new-project__textarea'
                   placeholder='Enter Project Summary'
            />
          </fieldset>
          <fieldset className='new-project__fieldset'>
            <label htmlFor='admin' className='new-project__label'>Admin</label>
            <Select className='new-project__select' classNamePrefix='new-project__select'
                    options={options} placeholder='Select Admin'
                    onChange={(option: Option | null, actionMeta: ActionMeta<Option>) => {
                      props.setFieldValue('admin', option?.value)
                    }}
                    formatOptionLabel={member => (
                      <div className='new-project__select-option'>
                        <img src={member.image} alt='' />
                        <span>{member.label}</span>
                      </div>
                    )}
            />
          </fieldset>
          <fieldset className='new-project__fieldset'>
            <label htmlFor='admin-title' className='new-project__label'>Admin title</label>
            <Field name='adminTitle' id='admin-title' className='new-project__input'
                   placeholder='Title, eg: Product manager'
            />
          </fieldset>
          <button className='new-project__submit' type='submit'>
            Create new project
          </button>
        </Form>
      )
    }}
    </Formik>
  )
}

export default NewProject
