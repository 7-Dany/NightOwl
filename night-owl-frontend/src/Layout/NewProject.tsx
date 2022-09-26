import { Formik, Form, Field } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Select, { ActionMeta } from 'react-select'

type Option = {
  value: string
  label: string
  image: string
}

interface FormValues {
  file: File | null
  name: string
  summary: string
  admin: string
  adminTitle: string
}

function NewProject() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [options, setOptions] = useState<Option[]>([
    { value: '2', label: 'A1', image: './image/person.svg' },
    { value: '3', label: 'B1', image: './image/person.svg' },
    { value: '4', label: 'C1', image: './image/person.svg' },
  ])
  const [previewImage, setPreviewImage] = useState('./image/person.svg')
  const initialValues: FormValues = {
    file: null,
    name: '',
    summary: '',
    admin: '',
    adminTitle: '',
  }

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
      console.log(values)
      actions.resetForm()
      setPreviewImage('./image/person.svg')
    }}>{(props) => {
      return (
        <Form className='new-project__form'>
          <fieldset className='new-project__logo-fieldset'>
            <label htmlFor='file'>
              <img src={previewImage} alt='' className='new-project__logo' />
            </label>
            <input type='file'
                   hidden={true}
                   ref={fileInput}
                   onChange={event => {
                     props.setFieldValue('file', event.target.files ? event.target.files[0] : null)
                     setSelectedFile(event.target.files ? event.target.files[0] : null)
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