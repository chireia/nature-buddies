import { message } from 'antd'
import { action, makeObservable, observable } from 'mobx'
import {
  WeatherInfo,
  WeatherRequestOptions,
  WeatherUnit,
} from '../interfaces/weather'
import { fetchWeather } from '../shared/serverApi/weatherApi'

export class WeatherStore {
  @observable isLoadingWeather = false
  @observable selectedUnit?: WeatherUnit = 'imperial'
  @observable locationPermissionStatus?: PermissionState
  @observable geoLocationPosition? = {} as GeolocationPosition
  @observable weatherInfo? = {} as WeatherInfo

  constructor() {
    makeObservable(this)
  }

  @action.bound
  setSelectedUnit(unit: WeatherUnit) {
    this.selectedUnit = unit
  }

  @action.bound
  async getLocationPermission() {
    const status = await navigator.permissions.query({ name: 'geolocation' })
    this.setPermissionStatus(status.state)
  }

  @action.bound
  setPermissionStatus(status: PermissionState) {
    this.locationPermissionStatus = status
    if (status === 'granted') this.setGeoLocation()
  }

  @action.bound
  setGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      location => {
        this.geoLocationPosition = location
        this.locationPermissionStatus = 'granted'
      },
      () => {
        this.geoLocationPosition = {} as GeolocationPosition
        this.locationPermissionStatus = 'denied'
        message.error('Your location is blocked by your browser')
      }
    )
  }

  @action.bound
  async loadWeather(options: WeatherRequestOptions) {
    try {
      this.isLoadingWeather = true
      await this.getLocationPermission()
      if (!this.geoLocationPosition?.coords) return
      const { latitude, longitude } = this.geoLocationPosition?.coords
      const lat = latitude.toFixed(2)
      const lon = longitude.toFixed(2)
      const weatherInfo = await fetchWeather({ lat, lon, ...options })

      this.weatherInfo = weatherInfo
    } finally {
      this.isLoadingWeather = false
    }
  }
}
