import { Server as HTTPServer } from 'http'
import { Socket, Server } from 'socket.io'
import { authorizeUser, sessionMiddleware, wrap } from './middlewares'
import { SessionSocket } from './types'

export class SocketServer {
  public static instance: SocketServer
  public io: Server
  /** Master list of all connected users */
  public workspaces: { [user_id: string]: string }

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

  StartListeners(defaultSocket: Socket) {
    const socket = <SessionSocket>defaultSocket
    console.log(`Message received from, ${socket.user.id}, ${socket.workspace.workspace_id}`)

    socket.on('handshake', (callback: (user_id: string, users: string[]) => void) => {
      console.log(`Handshake received from, ${socket.id}`)

      /** Check if this is a reconnection */
      // const reconnected = Object.values(this.users).includes(socket.id)

      // if (reconnected) {
      //   console.log(`This user has reconnected, ${socket.id}`)
      //
      //   const user_id = this.GetUserIdFromSocketId(socket.id)
      //   const users = Object.values(this.users)
      //
      //   if (user_id) {
      //     console.log('Sending callback for reconnect...')
      //     callback(user_id, users)
      //     return
      //   }
      // }

      /** Generating new user */
      console.log(socket.id)
      // const users = Object.values(this.users)

      console.log('Sending callback for handshake')
      console.log(this.workspaces)

      /** Sending new user to all connected users */
      // this.SendMessage('user_connected', users.filter(id => id !== socket.id), users)
    })

    socket.on('disconnect', () => {
      console.log(`Disconnect received from ${socket.id}`)
    })
  }

  // GetUserIdFromSocketId(id: string) {
  //   return Object.keys(this.users).find(user_id => {
  //     return this.users[user_id] === id
  //   })
  // }

  /**
   * Send a message through a socket
   * @Param name The name of the event.
   * @Param users List of socket id's.
   * @Param payload any information needed by the user.
   */
  SendMessage(name: string, users: string[], payload?: Object) {
    console.log(`Emitting event ${name}, to`, users)

    /** Sending Information for all users */
    users.forEach(id => payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name))
  }
}
