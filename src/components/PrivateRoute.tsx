import { useAuth0 } from '@auth0/auth0-react'
import React, { FunctionComponent } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  key: React.Key
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  key,
  exact,
  path,
  component,
}) => {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? (
    <Route key={key} exact={exact} path={path} component={component} />
  ) : (
    <Redirect key='redirect' to='/not-authenticated' />
  )
}

export default PrivateRoute
