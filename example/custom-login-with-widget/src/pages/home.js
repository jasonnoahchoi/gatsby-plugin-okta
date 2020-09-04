import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { useOktaAuth } from 'gatsby-plugin-okta'
import { Button, Box, Text } from '@chakra-ui/core'
import { Link, ExternalLink } from 'gatsby-theme-shared-ui'

export default function Home() {
  const { authState, authService } = useOktaAuth()
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

  const resourceServerExamples = [
    {
      label: 'Node/Express Resource Server Example',
      url:
        'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    },
    {
      label: 'Java/Spring MVC Resource Server Example',
      url:
        'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
    },
  ]

  const login = async () => {
    navigate('/login')
  }

  if (authState.isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Text as="h1">Okta Login Widget</Text>
      <Box>
        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <div>
            <p>Welcome back, {userInfo.name}!</p>
            <p>
              You have successfully authenticated against your Okta org, and
              have been redirected back to this application. You now have an ID
              token and access token in local storage. Visit the{' '}
              <Link to="/profile">My Profile</Link> page to take a look inside
              the ID token.
            </p>
            <h3>Next Steps</h3>
            <p>
              Currently this application is a stand-alone front end application.
              At this point you can use the access token to authenticate
              yourself against resource servers that you control.
            </p>
            <p>
              This sample is designed to work with one of our resource server
              examples. To see access token authentication in action, please
              download one of these resource server examples:
            </p>
            <ul>
              {resourceServerExamples.map((example) => (
                <li key={example.url}>
                  <ExternalLink href={example.url}>
                    {example.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!authState.isAuthenticated && (
          <div>
            <p>
              If you&lsquo;re viewing this page then you have successfully
              started this React application.
            </p>
            <p>
              <span>This example shows you how to use the </span>
              <ExternalLink href="https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react">
                Okta React Library
              </ExternalLink>
              <span> to add the </span>
              <ExternalLink href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
                PKCE Flow
              </ExternalLink>
              <span> to your application.</span>
            </p>
            <p>
              When you click the `login` button below, you will be redirected to
              the login page at your <Text as="mark">/login</Text> route. After
              you authenticate, you will be returned to this application with an
              ID token and access token. These tokens will be stored in local
              storage and can be retrieved at a later time.
            </p>
            <Button id="login-button" primary onClick={login}>
              Login
            </Button>
          </div>
        )}
      </Box>
    </>
  )
}
