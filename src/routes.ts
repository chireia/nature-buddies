import { FunctionComponent, lazy } from 'react'

export enum AccessPolice {
  Guest,
  Auth,
}

export interface AppRouteProps {
  path: string
  component: FunctionComponent
  exact?: boolean
  accessPolice?: AccessPolice
}

export const routes: AppRouteProps[] = [
  {
    path: '/',
    exact: true,
    accessPolice: AccessPolice.Auth,
    component: lazy(() => import('./views/dashboard/Dashboard')),
  },
  {
    path: '/my-plants',
    accessPolice: AccessPolice.Auth,
    component: lazy(() => import('./views/my-plants/MyPlantsIndex')),
  },
  {
    path: '/login',
    accessPolice: AccessPolice.Guest,
    component: lazy(() => import('./views/login/Login')),
  },
  {
    path: '/not-authenticated',
    accessPolice: AccessPolice.Guest,
    component: lazy(() => import('./views/not-authenticated/NotAuthenticated')),
  },
  {
    path: '*',
    accessPolice: AccessPolice.Guest,
    component: lazy(() => import('./views/not-found/NotFound')),
  },
]
