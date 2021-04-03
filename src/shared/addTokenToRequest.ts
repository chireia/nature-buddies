import { AxiosRequestConfig } from 'axios'

export function addApiKeyToRequest(config: AxiosRequestConfig) {
  const weatherApiKey = process.env.REACT_APP_WEATHER_KEY

  config.params = { ...config.params, appid: weatherApiKey }

  return config
}
