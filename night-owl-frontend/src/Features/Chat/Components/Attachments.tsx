import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../../Context/SocketContext'
import { Xicon } from '../../../Assets'

type AttachmentsProps = {
  fileBtn: React.RefObject<HTMLInputElement>
  sendFile: boolean
  setSendFile: React.Dispatch<React.SetStateAction<boolean>>
}

function Attachments({ fileBtn, sendFile, setSendFile }: AttachmentsProps) {
  const { SocketDispatch } = useContext(SocketContext)
  const [file, setFile] = useState<{ selectedFile: null | File }>({ selectedFile: null })
  const [preview, setPreview] = useState('')

  function handleFileChanges(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files ? event.target.files[0] : '')
    setFile(prevFile => {
      if (event.target.files) {
        return { selectedFile: event.target.files[0] }
      } else {
        return { selectedFile: null }
      }
    })
  }

  function resetImage() {
    setFile({ selectedFile: null })
    setPreview('')
  }

  useEffect(() => {
    if (sendFile && file.selectedFile) {
      let fileType = file.selectedFile.type
      let validFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
      if (validFileTypes.includes(fileType)) {
        SocketDispatch({
          type: 'send_message',
          payload: { data: { file: file.selectedFile, fileType: fileType }, type: 'file' }
        })
        setSendFile(false)
        setFile({ selectedFile: null })
        setPreview('')
      } else {
        setSendFile(false)
        setFile({ selectedFile: null })
        setPreview('')
      }
    } else {
      setSendFile(false)
      setPreview('')
    }
    let objectUrl = ''
    if (file.selectedFile) {
      objectUrl = URL.createObjectURL(file.selectedFile as Blob)
      setPreview(objectUrl)
    }

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [sendFile, file.selectedFile])

  return (
    <>
      <label htmlFor='file'>
        <input type='file' id='file' hidden ref={fileBtn} onChange={handleFileChanges} />
      </label>
      {preview &&
        <div className='chat-room-footer__image-preview'>
          <img src={preview} alt='' />
          <button className={'chat-room-footer__image-preview__button'} onClick={resetImage}>
            <Xicon className={'chat-room-footer__image-preview__icon'} />
          </button>
        </div>
      }
    </>
  )
}

export default Attachments