import { LayoutStore } from '../stores/LayoutStore'
import { PlantStore } from '../stores/PlantStore'
import { WeatherStore } from '../stores/WeatherStore'

/**
 * List with all stores.
 */
export interface AppStores {
  layout: LayoutStore
  plant: PlantStore
  weather: WeatherStore
}

/**
 * Instancia as stores do app
 */
function createStores(): AppStores {
  return {
    layout: new LayoutStore(),
    plant: new PlantStore(),
    weather: new WeatherStore(),
  }
}

export default createStores
