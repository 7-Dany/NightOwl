import { Request, Response, NextFunction } from 'express'
import { redisClient } from './server.middleware'

const rateLimiter = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const ip = request.ip
  const res = await redisClient.multi().incr(ip).expire(ip, 60).exec()
  if (res) {
    if (res[0][1] as number > 10) {
      response.json({ status: 'Failed', message: 'Slow down, please wait 1 minute then try again' })
    } else {
      next()
    }
  }
}
export default rateLimiter