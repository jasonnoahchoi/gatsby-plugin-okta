import React from 'react'
import { Box, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
} from '@chakra-ui/core'
import { ExternalLink } from 'gatsby-theme-shared-ui'

import Header from './Header'

const SiteInfo = styled.div({
  textAlign: 'center',
  fontSize: 16,
  margin: '1rem auto',
})

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  breakpoints: ['30em', '48em', '62em', '80em'],
  fonts: {
    heading: 'Noto Sans, sans-serif',
    body: 'system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  colors: {
    ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
}

export default function Layout({ children }) {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.800' }
  const color = { light: 'gray.800', dark: 'white' }
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ColorModeProvider>
        <Header />
        <Box
          minH="90%"
          margin="1em"
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          {children}
        </Box>
        <Box
          as="footer"
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          borderTop="1px solid black"
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          height={60}
        >
          <SiteInfo>
            &copy; {new Date().getFullYear()}, Built by Jason Noah Choi on
            {` `}{' '}
            <ExternalLink href="https://www.gatsbyjs.org">Gatsby</ExternalLink>
          </SiteInfo>
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  )
}
