import { Router, Request, Response } from 'express'
import { usersRoutes } from './api'

const routes = Router()

routes.use('/users', usersRoutes)

routes.get('/api', (req: Request, res: Response) => {
  res.send('Hello from api')
})

export default routes