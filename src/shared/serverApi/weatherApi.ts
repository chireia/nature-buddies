import { WeatherInfo, WeatherRequestParams } from '../../interfaces/weather'
import { weatherClient } from '../apiClients'

export async function fetchWeather(params: WeatherRequestParams) {
  try {
    const response = await weatherClient.get<WeatherInfo>('weather', {
      params,
    })

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
