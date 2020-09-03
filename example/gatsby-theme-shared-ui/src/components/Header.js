import React from 'react'
import { Link } from '@reach/router'
import { useGatsbyAuth } from 'gatsby-plugin-okta'
import { Button, Box } from '@chakra-ui/core'

const headerStyle = {
  display: 'flex',
  backgroundColor: '#fff',
  borderBottom: '1px solid #e7e7e7',
  justifyContent: 'space-between',
  padding: 10,
}

const linkStyle = {
  color: '#242424',
  textDecoration: 'underline',
}

export default function Header() {
  const { authState, authService } = useGatsbyAuth()

  const login = async () => {
    authService.login('/home')
  }
  const logout = async () => {
    authService.logout('/')
  }

  return (
    <header>
      <Box style={headerStyle}>
        <h3>
          <Link style={linkStyle} to="/home">
            HOME
          </Link>
        </h3>
        <Link to="landing">Landing</Link>
        <Link to="profile">Profile</Link>
        <Button onClick={authState.isAuthenticated ? logout : login}>
          {authState.isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </Box>
    </header>
  )
}
