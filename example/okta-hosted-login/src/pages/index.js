import React from 'react'
import { Router } from '@reach/router'
import { PrivateRoute } from 'gatsby-theme-shared-ui'
import NotFoundPage from './404'
import Landing from './landing'
import Home from './home'
import Profile from './profile'

export default function App() {
  return (
    <Router>
      <PrivateRoute as={Landing} path="/" />
      <Profile path="/profile" />
      <Home path="/home" />
      <NotFoundPage default title="Not Found" />
    </Router>
  )
}
