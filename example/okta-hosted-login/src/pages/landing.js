import React, { useState } from 'react'
import { Box, Text, Button } from '@chakra-ui/core'
import { useGatsbyAuth } from 'gatsby-plugin-okta'
import { TextArea } from 'gatsby-theme-shared-ui'

const Landing = () => {
  const { authState } = useGatsbyAuth()
  const [showTokens, setShowTokens] = useState(false)

  const isAuthenticated = authState && authState.isAuthenticated
  return (
    <Box>
      <p>
        I am on the landing page and I am currently{' '}
        <Text as="mark">{isAuthenticated ? 'logged in' : 'not logged in'}</Text>
      </p>

      <Text margin="2em 0">
        Once you login, you will be able to see a toggle to show your{' '}
        <code>accessToken</code> and <code>idToken</code>. Please make you sign
        into a dev test account only.
      </Text>
      {isAuthenticated && (
        <>
          <Button
            primary
            margin="1em 0"
            onClick={() => setShowTokens(!showTokens)}
          >
            {showTokens ? 'Hide Tokens' : 'Show Tokens'}
          </Button>
          {showTokens && (
            <Box margin="1em auto">
              <TextArea name="accessToken" padding="6em">
                {authState.accessToken}
              </TextArea>
              <TextArea name="idToken" padding="8em">
                {authState.idToken}
              </TextArea>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Landing
