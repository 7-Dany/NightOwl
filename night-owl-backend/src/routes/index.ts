import { Router, Request, Response } from 'express'
import { usersRoutes, workspacesRoutes, workspaceMembersRoutes, workspaceRequestsRoutes } from './api'

const routes = Router()

routes.use('/api', usersRoutes)
routes.use('/api', workspacesRoutes)
routes.use('/api', workspaceMembersRoutes)
routes.use('/api', workspaceRequestsRoutes)

routes.get('/api', (req: Request, res: Response) => {
  res.send('Hello from api')
})

export default routes