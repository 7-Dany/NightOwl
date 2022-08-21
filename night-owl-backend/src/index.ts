import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'
import session, { Session } from 'express-session'
import { Server, Socket } from 'socket.io'
import routes from './routes'
import errorMiddleware from './middlewares/error.middleware'
import pageNotFoundMiddleware from './middlewares/pageNotFound.middleware'

// Listening to default port
const PORT = config.port || 4000
// create an instance server
const app: Application = express()
declare module 'express-session' {
  interface Session {
    user?: any
  }
}
// create a socket io instance
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})
// HTTP request logger middleware
app.use(morgan('short'))
// Adding secure headers to express app
app.use(helmet())
// open cors for frontend site
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
// Parse any json data
app.use(express.json())
// Adding cookie to save user credentials
app.use(session({
  secret: config.cookieSecret as string,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: config.env === 'production ' ? true : 'auto',
    httpOnly: true,
    sameSite: config.env === 'production' ? 'none' : 'lax'
  }
}))
// Using all api routes
app.use('/api', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
io.on('connect', (socket: Socket) => {
})

// Using error middleware to send status and message in json data
app.use(errorMiddleware)
// Using page not found middleware to send 404 if in case the route not exist
app.use(pageNotFoundMiddleware)

// start express server
server.listen(PORT, () => {
  console.log(`Server is starting at http://localhost:${PORT}`)
})

export default app