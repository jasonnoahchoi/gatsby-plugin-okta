import React from 'react'
import { Link as ChakraLink, Icon } from '@chakra-ui/core'
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
