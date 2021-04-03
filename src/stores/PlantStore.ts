import { message } from 'antd'
import { action, makeObservable, observable } from 'mobx'
import moment from 'moment'
import {
  Plant,
  PlantDataPointFormData,
  PlantFormData,
} from '../interfaces/plant'
import {
  deletePlant,
  deletePlantDataPoint,
  fetchPlant,
  fetchPlants,
  postPlant,
  postPlantDataPoint,
} from '../shared/serverApi/plantApi'

export class PlantStore {
  @observable isLoadingPlant = false
  @observable isAddingPlant = false
  @observable isRemovingPlant = false
  @observable isAddingDataPoint = false
  @observable isRemovingDataPoint = false
  @observable plants: Plant[] = []
  @observable plant = {} as Plant

  constructor() {
    makeObservable(this)
  }

  @action.bound
  async loadPlants() {
    try {
      this.isLoadingPlant = true
      const plants = await fetchPlants()

      this.plants = plants || []
    } finally {
      this.isLoadingPlant = false
    }
  }

  @action.bound
  async loadPlant(plantId: string) {
    try {
      this.isLoadingPlant = true
      const plant = await fetchPlant(plantId)

      this.plant = plant
    } finally {
      this.isLoadingPlant = false
    }
  }

  @action.bound
  async removePlant(plantId: string) {
    try {
      this.isRemovingPlant = true
      await deletePlant(plantId)
    } finally {
      this.isRemovingPlant = false
    }
  }

  @action.bound
  async addPlant(plantData: PlantFormData) {
    try {
      this.isAddingPlant = true
      const plant = await postPlant(plantData)
      message.success(`Success: ${plant.name} added!`)

      return plant
    } finally {
      this.isAddingPlant = false
    }
  }

  @action.bound
  async addDataPoint(dataPointData: PlantDataPointFormData) {
    try {
      this.isAddingDataPoint = true
      const dataPoint = await postPlantDataPoint(dataPointData)

      message.success(`Success: ${moment(dataPoint.date).format('L')} saved!`)
      return dataPoint
    } finally {
      this.isAddingDataPoint = false
    }
  }

  @action.bound
  async removePlantDataPoint(dataPointId: string) {
    try {
      this.isRemovingDataPoint = true
      const dataPoint = await deletePlantDataPoint(dataPointId)

      return dataPoint
    } finally {
      this.isRemovingDataPoint = false
    }
  }
}
