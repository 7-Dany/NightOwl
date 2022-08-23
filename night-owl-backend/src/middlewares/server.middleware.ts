import session from 'express-session'
import config from '../config'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import { Socket } from 'socket.io'
import { SessionSocket } from '../index'
import { unauthorizedError } from './auth.token.middleware'

export const redisClient = new Redis()
const RedisStore = connectRedis(session)

export const sessionMiddleware = session({
  secret: config.cookieSecret as string,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  // store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: config.env === 'production ' ? true : 'auto',
    httpOnly: true,
    sameSite: config.env === 'production' ? 'none' : 'lax'
  }
})
export const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
}
export const authorizeUser = (defaultSocket: Socket, next: any) => {
  const socket = <SessionSocket>defaultSocket
  if (!socket.request.session || !socket.request.session.user) {
    unauthorizedError(next)
  } else {
    next()
  }
}
export const wrap = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {}, next)
