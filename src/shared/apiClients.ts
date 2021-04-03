import Axios from 'axios'
import { addApiKeyToRequest } from './addTokenToRequest'

/**
 * Axios common instances
 */
export const serverClient = Axios.create({
  baseURL: window.location.origin + '/api',
})

export const weatherClient = Axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

weatherClient.interceptors.request.use(addApiKeyToRequest)
