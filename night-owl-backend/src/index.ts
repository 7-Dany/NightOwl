import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'
import { Server, Socket } from 'socket.io'
import routes from './routes'
import errorMiddleware from './middlewares/error.middleware'
import pageNotFoundMiddleware from './middlewares/pageNotFound.middleware'

const PORT = config.port || 4000
// create an instance server
const app: Application = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})
// HTTP request logger middleware
app.use(morgan('short'))
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use('/api', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
io.on('connect', (socket: Socket) => {
})
app.use(errorMiddleware)
app.use(pageNotFoundMiddleware)

// start express server
server.listen(PORT, () => {
  console.log(`Server is starting at http://localhost:${PORT}`)
})

export default app