import React from 'react'
import { useGatsbyAuth } from 'gatsby-plugin-okta'

const PrivateRoute = ({ as: Component, location, ...rest }) => {
  const { authState, authService } = useGatsbyAuth()
  console.log('privateRoute', authService, authState, location, rest)
  if (
    authState &&
    !authState.isAuthenticated &&
    location.pathname !== `/implicit/callback`
  ) {
    // NOTE: this will help push Okta to the browser based login page
    authService.login('/')
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
