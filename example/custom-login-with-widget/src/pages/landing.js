import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import { useGatsbyAuth } from 'gatsby-plugin-okta'

const Landing = () => {
  const { authState } = useGatsbyAuth()
  const isAuthenticated = authState && authState.isAuthenticated
  return (
    <Box>
      <Text>{`I am on the landing page and I am currently `}</Text>
      <Text fontWeight="bold">
        {isAuthenticated ? 'logged in' : 'not logged in'}
      </Text>
    </Box>
  )
}

export default Landing
