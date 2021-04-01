import { useContext, createContext } from 'react'
import createStores, { AppStores } from '../shared/createStores'

export const appStores = createStores()
const storesContext = createContext<AppStores>(appStores)

/**
 * Retorna uma store global.
 */
export function useStore<T extends keyof AppStores>(
  storeName: T
): AppStores[T] {
  const storesHooks = useContext<AppStores>(storesContext)
  return storesHooks[storeName]
}
