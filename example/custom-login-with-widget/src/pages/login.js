import React from 'react'
import { config, OktaSignInWidget } from 'gatsby-plugin-okta'
import { Box } from '@chakra-ui/core'

const logo = 'https://www.gatsbyjs.com/Gatsby-Monogram.svg'

export default function Login() {
  return (
    <Box>
      <OktaSignInWidget config={config} logo={logo} title="Login" />
    </Box>
  )
}
