import React from 'react'
import { useOktaAuth } from 'gatsby-plugin-okta'
import { Button, Box, Text } from '@chakra-ui/core'
import { NavLink, DarkModeToggle } from 'gatsby-theme-shared-ui'
import { navigate } from 'gatsby'
import siteConfig from '../../../site-config'

const headerStyle = {
  display: 'flex',
  borderBottom: '1px solid #e7e7e7',
  justifyContent: 'space-between',
  padding: 10,
}

export default function Header() {
  const { authState, authService } = useOktaAuth()

  const login = async () => {
    navigate('/login')
  }
  const logout = async () => {
    authService.logout('/')
  }

  return (
    <header>
      <Box as="nav" style={headerStyle}>
        <NavLink to="/">
          {' '}
          <Text fontWeight="bold">{siteConfig.siteTitle}</Text>
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
