import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Xicon } from '../../../../Assets'
import { useNavigate } from 'react-router-dom'
import { ProjectContext } from '../../../../Context/ProjectContext'
import { ProjectsEndpoints } from '../../../../Api/projects.api'

const projectsEndpoints = new ProjectsEndpoints()

type UpdateProjectProps = {
  id: string
  logo: string
  name: string
  summary: string
  token: string
  setShowProjectSettings: React.Dispatch<React.SetStateAction<boolean>>
}

function UpdateProject({ id, logo, name, summary, token, setShowProjectSettings }: UpdateProjectProps) {
  const { ProjectDispatch } = useContext(ProjectContext)
  const navigate = useNavigate()
  const fileInput = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [previewImage, setPreviewImage] = useState(logo)
  const initialValues = {
    id,
    name,
    summary,
    logo: null
  }

  useEffect(() => {
    let url = logo
    if (selectedFile) {
      url = URL.createObjectURL(selectedFile)
      setPreviewImage(url)
    }
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  return (
    <Formik initialValues={initialValues} onSubmit={(values, actions) => {
      const controller = new AbortController()
      projectsEndpoints.updateProject(
        controller,
        { ...values },
        token)
        .then(data => {
          console.log(data)
          ProjectDispatch({ type: 'replace_project', payload: data })
          setShowProjectSettings(false)
          navigate('/projects')
        })
      actions.resetForm()
    }}>{(props) => {
      return (
        <Form className='update-project'>
          <h2 className='update-project__title'>Change project info</h2>
          <div className='update-project__close' role={'button'}
               onClick={(event) => {
                 setShowProjectSettings(false)
               }}>
            <Xicon className={'update-project__close-icon'} />
          </div>
          <fieldset className='update-project__logo-fieldset'>
            <label htmlFor='file'>
              <img src={previewImage} alt='' className='update-project__logo' />
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
                 className='update-project__choose-logo'>
              Change logo
            </div>
          </fieldset>
          <fieldset className='update-project__fieldset'>
            <label htmlFor='project-name' className='update-project__label'>Name</label>
            <Field name='name' id='project-name' className='update-project__input'
                   placeholder='Enter Project Name...' />
          </fieldset>
          <fieldset className='update-project__fieldset'>
            <label htmlFor='summary' className='update-project__label'>Summary</label>
            <Field as='textarea' rows='5' cols='30' name='summary' id='summary' className='update-project__textarea'
                   placeholder='Enter Project Summary'
            />
          </fieldset>
          <button className='update-project__submit' type='submit'>
            Update project
          </button>
        </Form>
      )
    }}
    </Formik>
  )
}

export default UpdateProject