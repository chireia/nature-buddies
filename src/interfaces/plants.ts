export interface Plant {
  id: string
  name: string
  type: string
  dataPoints: PlantDataPoint[]
}

export interface PlantFormData {
  id?: string
  name: string
  type: string
}

export interface PlantDataPoint {
  id: string
  date: string
  soilMoisture?: number
  soilTemperatureF?: number
  soilTemperatureC?: number
  airTemperatureF?: number
  airTemperatureC?: number
}

export interface PlantDataPointFormData {
  id?: string
  plantId: string
  date: string
  soilMoisture?: number
  soilTemperatureF?: number
  soilTemperatureC?: number
  airTemperatureF?: number
  airTemperatureC?: number
}
