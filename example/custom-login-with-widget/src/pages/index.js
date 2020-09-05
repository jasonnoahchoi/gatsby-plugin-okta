import React from 'react'
import { Router } from '@reach/router'
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
      <Home path="home" title="Home" />
      <Profile path="profile" title="Profile" />
      <NotFoundPage default title="Not Found" />
    </Router>
  )
}
