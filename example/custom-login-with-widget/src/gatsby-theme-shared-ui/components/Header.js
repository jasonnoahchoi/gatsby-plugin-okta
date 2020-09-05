import React from 'react'
import { useOktaAuth } from 'gatsby-plugin-okta'
import { Button, Box, Text, useColorMode } from '@chakra-ui/core'
import { NavLink } from 'gatsby-theme-shared-ui'
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
  const { colorMode, toggleColorMode } = useColorMode()

  const login = async () => {
    navigate('/login')
  }
  const logout = async () => {
    authService.logout('/')
  }

  return (
    <header>
      <Box as="nav" style={headerStyle}>
        <Text fontWeight="bold" paddingTop="10px">
          {siteConfig.siteTitle}
        </Text>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/landing">Landing</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Button onClick={authState.isAuthenticated ? logout : login}>
          {authState.isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </Box>
    </header>
  )
}
