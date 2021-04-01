import Axios from 'axios'
import { addTokenToRequest } from './addTokenToRequest'

/**
 * Axios common instance
 */
export const serverClient = Axios.create({
  baseURL: window.location.origin + '/api',
})

serverClient.interceptors.request.use(addTokenToRequest)
