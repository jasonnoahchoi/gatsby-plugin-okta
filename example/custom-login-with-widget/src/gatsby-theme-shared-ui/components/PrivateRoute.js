import React from 'react'
import { useOktaAuth } from 'gatsby-plugin-okta'

export default function PrivateRoute({ as: Component, location, ...rest }) {
  const { authState, authService } = useOktaAuth()
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
