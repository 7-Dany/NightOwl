import { MicIcon, SendMsgIcon, StopIcon } from '../Assets'
import useRecorder from '../Hooks/useRecorder'
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../../Context/SocketContext'

type RecordProps = {
  order: boolean
  setOrder: React.Dispatch<React.SetStateAction<boolean>>
  sendBtn: React.RefObject<HTMLButtonElement>
}

function Record({ order, setOrder, sendBtn }: RecordProps) {
  const { recorderState, cancelRecording, startRecording, saveRecording } = useRecorder()
  const { SocketDispatch } = useContext(SocketContext)
  const [confirm, setConfirm] = useState(false)

  function handleRecorder(option: string) {
    if (option === 'start') {
      setOrder(true)
      startRecording()
    } else if (option === 'stop') {
      setOrder(false)
      cancelRecording()
    } else if (option === 'send') {
      setOrder(false)
      saveRecording()
      setConfirm(true)
    }
  }

  useEffect(() => {
    if (confirm && recorderState.audio) {
      SocketDispatch({ type: 'send_message', payload: { data: recorderState.audio, type: 'voice' } })
      cancelRecording()
      setOrder(false)
      setConfirm(false)
    }
  }, [recorderState.audio, confirm])

  return (
    <>
      <button className='chat-room-footer__mic-icon-container' title='send voice'
              onClick={(event) => handleRecorder('start')}>
        <MicIcon className={'chat-room-footer__mic-icon'} />
      </button>
      {order &&
        <>
          <div className='chat-room-footer__record'>
            <div className='chat-room-footer__record-stop'
                 onClick={(event) => handleRecorder('stop')}>
              <StopIcon className={'chat-room-footer__record-stop__icon'} />
            </div>
            <div className='chat-room-footer__record-time'>
              {recorderState.recordingMinutes}:{recorderState.recordingSeconds}
            </div>
          </div>
          <button
            className='chat-room-footer__send-msg-btn-container'
            title='send message'
            type='submit'
            onClick={(event) => handleRecorder('send')}
            ref={sendBtn}
          >
            <SendMsgIcon className={'chat-room-footer__send-msg-btn'} />
          </button>
        </>
      }
    </>
  )
}

export default Record