import { Server as HTTPServer } from 'http'
import { Socket, Server } from 'socket.io'
import { authorizeUser, sessionMiddleware, wrap } from './middlewares'
import { SessionSocket } from './types'
import { MessagesModel, IMessage, IUserMessage } from './models'

const messagesModel = new MessagesModel()

export class SocketServer {
  public static instance: SocketServer
  public io: Server

  /** Master list of all connected users in workspaces */
  public workspaces: { [workspace_id: string]: string[] }

  constructor(server: HTTPServer) {
    SocketServer.instance = this
    this.workspaces = {}
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true
      }
    })

    /** Wrapping session middleware to let socket io to use cookie */
    this.io.use(wrap(sessionMiddleware))

    /** Connect only when there is user saved in session */
    this.io.use(authorizeUser)

    /** Start connecting to socket io server and start listening to event*/
    this.io.on('connect', this.StartListeners)

    console.log('Socket IO Started')
  }

  StartListeners = (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket
    const { user } = socket
    const userId = user.id
    let workspaceId: string

    /** Setting up handshake event to save workspace if not exist and save user to workspaces as active user */
    socket.on('handshake', (data: { workspaceId: string }, callback: (users: string[]) => void) => {

      /** Using user id as room to send notifications and server updates */
      socket.join(userId)

      /** Making sure workspace id is undefined to save active users for that id */
      workspaceId = data.workspaceId
      if (!workspaceId) return

      console.log(`Handshake received from workspace: ${workspaceId}, user: ${userId} }`)

      /** Check if this is a reconnection */
      const reconnected = this.workspaces[workspaceId]?.includes(userId)
      if (reconnected) {
        console.log(`This user has reconnected from workspace: ${workspaceId}, user: ${userId}`)
        const users = this.workspaces[workspaceId]
        console.log('Sending callback for reconnect...')
        callback(users)
        return
      }

      /** Generating new user */
      if (Object.keys(this.workspaces).includes(workspaceId)) {
        this.workspaces[workspaceId]?.push(userId)
        console.log(`Workspace is exist and user:${userId} got added to: ${this.workspaces[workspaceId]}`)
      } else {
        this.workspaces[workspaceId] = []
        this.workspaces[workspaceId]?.push(userId)
        console.log(`User: ${userId} got created and added to workspace: ${this.workspaces[workspaceId]}`)
      }
      callback(this.workspaces[workspaceId])


      /** Sending new user to all connected users */
      this.SendMessage(
        'user_connected',
        this.workspaces[workspaceId]?.filter(id => userId !== id),
        this.workspaces[workspaceId]
      )
    })

    /** Setting up join conversation event */
    socket.on('join_conversation', async ({ conversation_id }, callback: (messages: IUserMessage[]) => void) => {
      console.log(`User:${userId} has joined conversation: ${conversation_id}`)

      /** Join conversation and send all messages for that conversation */
      socket.join(conversation_id)
      const messages = await messagesModel.showByConversation(conversation_id)
      callback(messages)
    })

    /** Setting up save message event */
    socket.on('save_message', async (data: { newMessage: IMessage, conversation: string }, callback) => {
      console.log(`New message received from: ${userId} its data:`, data)

      /** Create new message and send it to both users the sender and receiver */
      const createdMessage = await messagesModel.create(data.newMessage)
      socket.to(data.conversation).emit('receive_message', { newMessage: createdMessage })
      callback(createdMessage)
    })

    /** After the user get disconnected he will be deleted from active users in workspace */
    socket.on('disconnect', () => {
      console.log(`Disconnect received from workspace: ${workspaceId}, user: ${userId}`)

      /** Deleting user id from workspaces and send it to all users as disconnected user*/
      this.workspaces[workspaceId] = this.workspaces[workspaceId]?.filter(id => userId !== id)
      this.SendMessage('user_disconnected', this.workspaces[workspaceId], userId)
    })
  }

  /**
   * Send a message through a socket
   * @Param name The name of the event ex handshake.
   * @Param users List of socket id's.
   * @Param payload any information needed by the user.
   */
  SendMessage = (name: string, users: string[], payload?: any) => {
    console.log(`Emitting event ${name}, to`, users)

    /** Sending Information to all users */
    users?.forEach(id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name))
  }
}
