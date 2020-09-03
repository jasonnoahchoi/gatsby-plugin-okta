import React from 'react'
import { useGatsbyAuth } from 'gatsby-plugin-okta'
import { Button, Box, Text } from '@chakra-ui/core'
import { NavLink } from 'gatsby-theme-shared-ui'
import { navigate } from 'gatsby'
import siteConfig from '../../../site-config'

const headerStyle = {
  display: 'flex',
  backgroundColor: '#fff',
  borderBottom: '1px solid #e7e7e7',
  justifyContent: 'space-between',
  padding: 10,
}

export default function Header() {
  const { authState, authService } = useGatsbyAuth()

  const login = async () => {
    navigate('/login')
  }
  const logout = async () => {
    authService.logout('/')
  }

  return (
    <header>
      <Box style={headerStyle}>
        <Text fontWeight="bold" paddingTop="10px">
          {siteConfig.siteTitle}
        </Text>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/landing">Landing</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <Button onClick={authState.isAuthenticated ? logout : login}>
          {authState.isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </Box>
    </header>
  )
}
