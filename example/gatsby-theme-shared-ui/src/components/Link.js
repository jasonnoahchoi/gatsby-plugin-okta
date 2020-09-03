import React from 'react'
import { Link as ChakraLink, Icon, Box } from '@chakra-ui/core'
import { Link as GatsbyLink } from 'gatsby'

export function Link({ to, children }, props) {
  return (
    <ChakraLink as={GatsbyLink} color="blue.500" to={to} {...props}>
      {children}
    </ChakraLink>
  )
}

export function ExternalLink({ href, children }) {
  return (
    <ChakraLink href={href} color="gray.500" isExternal>
      {children} <Icon name="external-link" mx="2px" paddingBottom="3px" />
    </ChakraLink>
  )
}

export function NavLink({ to, children }, props) {
  return (
    <Box as="h3" paddingTop="10px">
      <ChakraLink as={GatsbyLink} to={to} {...props}>
        {children}
      </ChakraLink>
    </Box>
  )
}
