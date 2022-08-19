import { Request, Response, NextFunction } from 'express'

const pageNotFoundMiddleware = (request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({ message: 'Page not found' })
}
export default pageNotFoundMiddleware