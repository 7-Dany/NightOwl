import React, { useEffect, useState } from 'react'

export type Recorder = {
  recordingMinutes: number
  recordingSeconds: number
  initRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  audio: File | null
}

const initialRecorder: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null
}

function useRecorder() {
  const [recorderState, setRecorderState] = useState<Recorder>(initialRecorder)

  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recorderInterval: number | ReturnType<typeof setInterval> | null = null
    if (recorderState.initRecording) {
      recorderInterval = setInterval(() => {
        setRecorderState(prevState => {
          if (prevState.recordingMinutes === MAX_RECORDER_TIME && prevState.recordingSeconds === 0) {
            typeof recorderInterval === 'number' && clearInterval(recorderInterval)
            return prevState
          }
          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59) {
            return { ...prevState, recordingSeconds: prevState.recordingSeconds + 1 }
          } else if (prevState.recordingSeconds === 59) {
            return { ...prevState, recordingMinutes: prevState.recordingMinutes + 1, recordingSeconds: 0 }
          } else {
            return prevState
          }
        })
      }, 1000)
    } else {
      typeof recorderInterval === 'number' && clearInterval(recorderInterval)
    }

    return () => {
      typeof recorderInterval === 'number' && clearInterval(recorderInterval)
    }
  })

  useEffect(() => {
    setRecorderState(prevState => {
      if (prevState.mediaStream) {
        return { ...prevState, mediaRecorder: new MediaRecorder(prevState.mediaStream) }
      } else {
        return prevState
      }
    })
  }, [recorderState.mediaStream])

  useEffect(() => {
    const recorder = recorderState.mediaRecorder
    let chunks: Blob[] = []
    if (recorder?.state === 'inactive') {
      recorder.start()
      recorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' })
        const file = new File([blob], `voice`, { type: 'audio/mp3' })
        chunks = []
        setRecorderState(prevState => {
          if (prevState.mediaRecorder) {
            return { ...initialRecorder, audio: file }
          } else {
            return initialRecorder
          }
        })
      }
    }

    return () => {
      if (recorder) {
        recorder.stream.getAudioTracks().forEach(track => track.stop())
      }
    }
  }, [recorderState.mediaRecorder])

  async function startRecording(setRecorderState: React.Dispatch<React.SetStateAction<Recorder>>) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setRecorderState(prevState => {
        return { ...prevState, initRecording: true, mediaStream: stream }
      })
    } catch (error) {
      console.log(error)
    }
  }

  function saveRecording(recorder: any) {
    if (recorder.state !== 'inactive') {
      recorder.stop()
    }
  }

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
    cancelRecording: () => setRecorderState(initialRecorder)
  }
}

export default useRecorder