import axios from 'axios'
import config from '../Config'

const { url } = config

type GetUserArgs = {
  controller: AbortController
}

export async function getUser({ controller }: GetUserArgs) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    signal: controller.signal
  }
  const response = await axios.get(`${url}/users/auth/session`, config)
  return response.data.data
}