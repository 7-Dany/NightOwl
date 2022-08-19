import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import errorMiddleware from './middlewares/error.middleware'
import pageNotFoundMiddleware from './middlewares/pageNotFound.middleware'

const PORT = config.port || 4000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

app.use(errorMiddleware)
app.use(pageNotFoundMiddleware)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at http://localhost:${PORT}`)
})

export default app