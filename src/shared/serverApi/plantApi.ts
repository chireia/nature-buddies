import {
  Plant,
  PlantDataPoint,
  PlantDataPointFormData,
  PlantFormData,
} from '../../interfaces/plant'
import { serverClient } from '../apiClients'

export async function fetchPlants() {
  try {
    const response = await serverClient.get<Plant[]>('plant')

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function fetchPlant(plantId: string) {
  try {
    const response = await serverClient.get<Plant>('plant/' + plantId)

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function deletePlant(plantId: string) {
  try {
    const response = await serverClient.delete<null>('plant/' + plantId)

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function postPlant(plantData: PlantFormData) {
  try {
    const response = await serverClient.post<Plant>('plant', plantData)

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function postPlantDataPoint(
  dataPointData: PlantDataPointFormData
) {
  try {
    const response = await serverClient.post<PlantDataPoint>(
      'dataPoint',
      dataPointData
    )

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function deletePlantDataPoint(dataPointId: string) {
  try {
    const response = await serverClient.delete<null>('dataPoint/' + dataPointId)

    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
