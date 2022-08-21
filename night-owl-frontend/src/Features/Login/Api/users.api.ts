import axios from 'axios'
import config from '../../../Config'
import { AuthUser } from '../../../Context/auth.context'

const { url } = config

type AuthUserArgs = {
  controller: AbortController
  user: {
    email: string
    password: string
  }
}
type NewUserArgs = {
  controller: AbortController
  user: {
    username: string
    email: string
    image: string
    password: string
  }
}

export async function authUser({ controller, user }: AuthUserArgs): Promise<AuthUser> {
  const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  const response = await axios.post(`${url}/users/auth`, {
    cancelToken: controller.signal,
    content: user
  }, config)
  return response.data.data
}

export async function createUser({ controller, user }: NewUserArgs): Promise<AuthUser> {
  const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
  const response = await axios.post(`${url}/users`, {
    cancelToken: controller.signal,
    content: user
  }, config)
  return response.data.data
}