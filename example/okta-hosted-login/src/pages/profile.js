import React, { useState, useEffect } from 'react'
import { Icon, Text, Box } from '@chakra-ui/core'
import { useGatsbyAuth } from 'gatsby-plugin-okta'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  ExternalLink,
} from 'gatsby-theme-shared-ui'

const Profile = () => {
  const { authState, authService } = useGatsbyAuth()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null)
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, authService]) // Update if authState changes

  if (!userInfo) {
    return (
      <Box>
        <Text as="p">
          {authState.isAuthenticated
            ? 'Fetching user profile...'
            : 'You are not logged in yet, so you do not have access to see this...'}
        </Text>
      </Box>
    )
  }

  return (
    <>
      <Box m="2em">
        <Icon name="view" /> My User Profile (ID Token Claims){' '}
        <Text>
          Below is the information from your ID token which was obtained during
          the &nbsp;
          <ExternalLink href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
            PKCE Flow
          </ExternalLink>{' '}
          and is now stored in local storage.
        </Text>
        <Text>
          This route is protected with the <code>&lt;PrivateRoute&gt;</code>{' '}
          component, which will ensure that this page cannot be accessed until
          you have authenticated.
        </Text>
      </Box>
      <Table>
        <TableHead>
          <TableRow bg="white">
            <TableHeader>
              <Text fontWeight="bold" fontSize="md">
                Claim
              </Text>
            </TableHeader>
            <TableHeader>
              <Text fontWeight="bold" fontSize="md">
                Value
              </Text>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(userInfo).map((entry, i) => {
            const key = entry[0]
            const value = entry[1]
            const claimId = `claim-${key}`
            return (
              <TableRow key={key} bg={i % 2 === 0 ? 'white' : 'gray.700'}>
                <TableCell>
                  <Text
                    fontSize="sm"
                    color={i % 2 === 0 ? 'gray.700' : 'white'}
                  >
                    {key}
                  </Text>
                </TableCell>
                <TableCell id={claimId}>
                  <Text
                    fontSize="sm"
                    color={i % 2 === 0 ? 'gray.700' : 'white'}
                  >
                    {value}
                  </Text>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default Profile
