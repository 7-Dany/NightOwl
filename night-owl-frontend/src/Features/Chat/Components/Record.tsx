import { MicIcon, SendMsgIcon, StopIcon } from '../Assets'
import useRecorder from '../Hooks/useRecorder'
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../../Context/SocketContext'

type RecordProps = {
  order: boolean
  setOrder: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  sendBtn: React.MutableRefObject<null>
}

function Record({ order, setOrder, message, sendBtn }: RecordProps) {
  const { recorderState, cancelRecording, startRecording, saveRecording } = useRecorder()
  const { SocketDispatch } = useContext(SocketContext)
  const [confirm, setConfirm] = useState(false)

  function startRecord() {
    setOrder(true)
    startRecording()
  }

  function stopRecord() {
    setOrder(false)
    cancelRecording()
  }

  function sendRecord() {
    setOrder(false)
    saveRecording()
    setConfirm(true)
  }

  useEffect(() => {
    if (confirm && recorderState.audio) {
      SocketDispatch({ type: 'send_message', payload: { data: recorderState.audio, type: 'voice' } })
      cancelRecording()
      setOrder(false)
    } else if (message.length > 0) {
      cancelRecording()
      setConfirm(false)
    }
  }, [recorderState.audio, message, confirm])

  return (
    <>
      <button className='chat-room-footer__mic-icon-container' title='send voice' onClick={startRecord}>
        <MicIcon className={'chat-room-footer__mic-icon'} />
      </button>
      {order &&
        <>
          <div className='chat-room-footer__record'>
            <div className='chat-room-footer__record-stop' onClick={stopRecord}>
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
            onClick={sendRecord}
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