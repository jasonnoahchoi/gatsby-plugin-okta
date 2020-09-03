import React from 'react'
import { Router } from '@reach/router'

import NotFoundPage from './404'
import Landing from './landing'
import Home from './home'
import Profile from './profile'
import { PrivateRoute } from 'gatsby-theme-shared-ui'

export default function App() {
  return (
    <Router>
      <Landing path="/" title="Landing" />
      <PrivateRoute as={Home} path="home" title="Home" />
      <PrivateRoute as={Profile} path="profile" title="Profile" />
      <NotFoundPage default title="Not Found" />
    </Router>
  )
}
