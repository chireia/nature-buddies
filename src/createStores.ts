import { LayoutStore } from './stores/LayoutStore'

/**
 * List with all stores.
 */
export interface AppStores {
  layout: LayoutStore
}

/**
 * Instancia as stores do app
 */
function createStores(): AppStores {
  return {
    layout: new LayoutStore(),
  }
}

export default createStores
