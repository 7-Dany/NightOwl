import axios from 'axios'
import config from '../../../Config'
import { IAuthUser, IWorkspaceUser } from '../../../Types'

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

export async function authUser(
  {
    controller,
    user
  }: AuthUserArgs): Promise<IWorkspaceUser> {
  /** To authenticate user and check if he has workspace or workspace request or not*/
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/users/auth`, { ...user }, config)
  return response.data.data
}

export async function createUser(
  {
    controller,
    user
  }: NewUserArgs): Promise<IAuthUser> {
  /** To create new user */
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.post(`${url}/users`, { ...user }, config)
  return response.data.data
}