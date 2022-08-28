import { Router, Request, Response } from 'express'
import { usersRoutes, workspacesRoutes, workspaceMembersRoutes } from './api'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/workspaces', workspacesRoutes)
routes.use('/workspace/members', workspaceMembersRoutes)

routes.get('/api', (req: Request, res: Response) => {
  res.send('Hello from api')
})

export default routes