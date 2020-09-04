import React from 'react'
import { Link as ChakraLink, Box, Button } from '@chakra-ui/core'
import { Link as GatsbyLink, navigate } from 'gatsby'

/**
 * Link component
 *
 * Wrapper around GatsbyLink with chakra-ui styling. For internal links only.
 *
 * @param {string} [to] - Required internal path
 * @param {ReactElement} [children] - Optional React children
 * @param {object} [props] - Optional additional props
 *
 * @returns <a />
 */

export function Link({ to, children }, props) {
  return (
    <ChakraLink as={GatsbyLink} color="blue.500" to={to} {...props}>
      {children}
    </ChakraLink>
  )
}

/**
 * ExternalLink component
 *
 * wrapper around `<a />` tag which allows for links outside of your application.
 *
 * @param {string} [href] - Required external url path
 * @param {ReactElement} [children] - Optional React children
 *
 * @returns <a />
 */

export function ExternalLink({ href, children }) {
  return (
    <ChakraLink href={href} color="gray.500" isExternal>
      {children}
    </ChakraLink>
  )
}

/**
 * NavLink component
 *
 * styled wrapper around header nav links.
 *
 * @param {string} [to] - Required internal path
 * @param {ReactElement} [children] - Optional React children
 *
 * @returns <a />
 */

export function NavLink({ to, children }) {
  return (
    <Box as="h3" paddingTop="10px">
      <GatsbyLink to={to}>{children}</GatsbyLink>
    </Box>
  )
}
