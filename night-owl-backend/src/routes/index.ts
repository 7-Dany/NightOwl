import { Router, Request, Response } from 'express'
import {
  usersRoutes,
  workspacesRoutes,
  workspaceMembersRoutes,
  workspaceRequestsRoutes,
  workspaceProjectsRoutes,
  conversationMembersRoutes,
  conversationsRoutes,
  projectsRoutes,
  projectMembersRoutes
} from './api'

const routes = Router()

routes.use('/api', usersRoutes)
routes.use('/api', workspacesRoutes)
routes.use('/api', workspaceMembersRoutes)
routes.use('/api', workspaceRequestsRoutes)
routes.use('/api', workspaceProjectsRoutes)
routes.use('/api', conversationsRoutes)
routes.use('/api', conversationMembersRoutes)
routes.use('/api', projectsRoutes)
routes.use('/api', projectMembersRoutes)

routes.get('/api', (req: Request, res: Response) => {
  res.send('Hello from api')
})

export default routes