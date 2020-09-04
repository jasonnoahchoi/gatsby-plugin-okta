import React from 'react'
import { useGatsbyAuth } from 'gatsby-plugin-okta'

/**
 * PrivateRoute component
 *
 * convenient wrapper that checks if a user is authenticated, if not it redirects
 * the user to the okta hosted login page. If the user is authenticated, it shows them
 * the page that is requested.
 * @param {string} [as] - Component to pass in
 * @param {ReactElement} [location] - location element
 * @param {object} [rest] - Optional additional props
 *
 * @returns <div /> || null
 */

export default function PrivateRoute({ as: Component, location, ...rest }) {
  const { authState, authService } = useGatsbyAuth()

  if (authState && (authState.isAuthenticated || authState.isPending)) {
    return <Component {...rest} />
  } else {
    // this redirects an unauthenticated user to login, and once authenticated
    // will redirect back to the path of "/"
    authService.login('/')
    return null
  }
}
