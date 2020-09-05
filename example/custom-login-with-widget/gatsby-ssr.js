import React from 'react'
import { Layout } from 'gatsby-theme-shared-ui'

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
