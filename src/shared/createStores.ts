import { LayoutStore } from '../stores/LayoutStore'
import { PlantStore } from '../stores/PlantStore'

/**
 * List with all stores.
 */
export interface AppStores {
  layout: LayoutStore
  plant: PlantStore
}

/**
 * Instancia as stores do app
 */
function createStores(): AppStores {
  return {
    layout: new LayoutStore(),
    plant: new PlantStore(),
  }
}

export default createStores
