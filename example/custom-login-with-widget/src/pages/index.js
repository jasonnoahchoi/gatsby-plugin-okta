import React from 'react'
import { Router } from '@reach/router'
import { PrivateRoute } from 'gatsby-theme-shared-ui'
import NotFoundPage from './404'
import Landing from './landing'
import Home from './home'
import Profile from './profile'
import Login from './login'

export default function App() {
  return (
    <Router>
      <Landing path="/" title="Landing" />
      <Login path="login" title="Login" />
      <PrivateRoute as={Home} path="home" title="Home" />
      <PrivateRoute as={Profile} path="profile" title="Profile" />
      <NotFoundPage default title="Not Found" />
    </Router>
  )
}
