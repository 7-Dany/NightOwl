import { Router, Request, Response } from 'express'
import { usersRoutes, workspacesRoutes, workspaceMembersRoutes, workspaceRequestsRoutes } from './api'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/workspaces', workspacesRoutes)
routes.use('/workspace/members', workspaceMembersRoutes)
routes.use('/workspace/requests', workspaceRequestsRoutes)

routes.get('/api', (req: Request, res: Response) => {
  res.send('Hello from api')
})

export default routes