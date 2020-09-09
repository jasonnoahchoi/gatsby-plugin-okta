import React from 'react'
import { NavLink, DarkModeToggle } from 'gatsby-theme-shared-ui'
import { useGatsbyAuth } from 'gatsby-plugin-okta'
import { Button, Box, Text } from '@chakra-ui/core'

const headerStyle = {
  display: 'flex',
  borderBottom: '1px solid #e7e7e7',
  justifyContent: 'space-between',
  padding: 10,
}

/**
 * Header component
 *
 * is using `useGatsbyAuth()` hook to get access to `authState` and `authService`
 *
 * @returns <header />
 */

export default function Header() {
  const { authState, authService } = useGatsbyAuth()

  const login = async () => {
    authService.login('/home')
  }
  const logout = async () => {
    // this is going to /landing which is the same route as '/'
    // so that it does not redirect automatically to the hosted okta auth
    authService.logout('/landing')
  }

  return (
    <header>
      <Box as="nav" style={headerStyle}>
        <NavLink to="/">
          {' '}
          <Text fontWeight="bold">Okta Hosted Login</Text>
        </NavLink>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <Button
          marginTop={2}
          onClick={authState.isAuthenticated ? logout : login}
        >
          {authState.isAuthenticated ? 'Logout' : 'Login'}
        </Button>
        <DarkModeToggle />
      </Box>
    </header>
  )
}
