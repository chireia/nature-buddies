export interface WeatherRequestOptions {
  units?: WeatherUnit
}

export interface WeatherRequestParams extends WeatherRequestOptions {
  lat: string
  lon: string
}

export interface WeatherInfo {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: MainWeatherStatus
      description: string
      icon: string
    }
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: 1
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type WeatherUnit = 'imperial' | 'metric'

type MainWeatherStatus =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado'
  | 'Clear'
  | 'Clouds'
