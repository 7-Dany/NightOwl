import { IncomingMessage } from 'http'
import { SessionData } from 'express-session'
import { Socket } from 'socket.io'

declare module 'express-session' {
  interface SessionData {
    user?: any
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage
}