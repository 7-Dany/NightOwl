import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'
import routes from './routes'
import {
  sessionMiddleware,
  errorMiddleware,
  pageNotFoundMiddleware,
  corsConfig
} from './middlewares'
import { SocketServer } from './socket'


// Listening to default port
const PORT = config.port || 4000
// create an express app instance
const app: Application = express()
// create a http server instance
const server = http.createServer(app)
// create a socket io server instance
new SocketServer(server)

// HTTP request logger middleware
app.use(morgan('short'))
// Adding secure headers to express app
app.use(helmet())
// open cors for frontend site
app.use(cors(corsConfig))
// Parse any json data
app.use(express.json())
// Adding cookie to save user credentials
app.use(sessionMiddleware)
// Using all api routes
app.use('/', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
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