import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AccessPolice, AppRouteProps, routes } from '../Routes'
import PrivateRoute from './PrivateRoute'

const SwitchRoutes: FunctionComponent<{ routeProps: AppRouteProps[] }> = ({
  routeProps,
}) => {
  return (
    <Switch>
      {routeProps.map(({ exact, path, component, accessPolice }, i) => {
        if (accessPolice === AccessPolice.Auth)
          return (
            <PrivateRoute
              key={i}
              exact={exact}
              path={path}
              component={component}
            />
          )

        return <Route key={i} exact={exact} path={path} component={component} />
      })}
    </Switch>
  )
}

export const Routes = () => <SwitchRoutes routeProps={routes} />

// <Redirect key='redirect' to='/not-authenticated' />
