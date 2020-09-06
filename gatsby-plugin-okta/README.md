# gatsby-plugin-okta

A starter for Gatsby Okta authentication plugin for easy access to Okta authentication in your Gatsby app.

The plugin generates a config for you based on your `.env` variables. Just plug it into
 `gatsby-config.js` and it will instantiate an `OktaAuth` for you. 

 <p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" align="center" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" height="60" />
  </a>
  <img alt="ei-heart" align="center" src="https://raw.githubusercontent.com/evil-icons/evil-icons/master/assets/icons/ei-unlock.svg" height="80" />
  <a href="https://www.okta.com">
    <img alt="Okta" align="center" src="https://www.okta.com/themes/custom/okta_www_theme/images/logo.svg" height="60" />
  </a>
<p>

## How it works
![](https://i.imgur.com/ds7tJ3A.gif)

## Table of Contents
- [gatsby-plugin-okta](#gatsby-plugin-okta)
  - [How it works](#how-it-works)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [Install](#install)
    - [NPM](#npm)
    - [Yarn](#yarn)
    - [Start a new Gatsby Project](#start-a-new-gatsby-project)
  - [How to Use](#how-to-use)
    - [Setup](#setup)
  - [Details](#details)
  - [Implementation](#implementation)
    - [Context.Provider + useOktaAuth hook combo](#contextprovider--useoktaauth-hook-combo)
    - [Understanding SecurityProvider](#understanding-securityprovider)
    - [useGatsbyAuth hook only](#usegatsbyauth-hook-only)
    - [useOktaAuth and useGatsbyAuth Deep Dive](#useoktaauth-and-usegatsbyauth-deep-dive)
    - [`authState`](#authstate)
    - [`authService`](#authservice)
    - [Setup Okta Widget](#setup-okta-widget)
    - [`Okta Signin Widget` props](#okta-signin-widget-props)
  - [Issues](#issues)

## Quick Start

```shell
mkdir my-site
cd my-site
yarn init
# install gatsby-plugin-okta and it's dependencies
yarn add gatsby react react-dom gatsby-plugin-okta
```

## Install

### NPM

```sh
$ npm install --save gatsby-plugin-okta
```

### Yarn
```sh
$ yarn add gatsby-plugin-okta
```

### Start a new Gatsby Project

In your preferred directory...

```sh
$ gatsby new gatsby-plugin-okta https://github.com/jasonnoahchoi/gatsby-plugin-okta
$ cd gatsby-plugin-okta
```


Then add the plugin to your `gatsby-config.js`.

## How to Use
### Setup
- Create a free [Okta Developer Edition organization](https://developer.okta.com/signup)
- Create an [Okta application](https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/)

```shell
$ cp .env.development.example .env.development
```

```js
// in your project's gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-okta',
      options: {
        domain: process.env.OKTA_DOMAIN,
        issuer: process.env.OKTA_ISSUER,
        clientId: process.env.OKTA_CLIENT_ID,
        redirectUri: process.env.OKTA_REDIRECT_URI,
        pkce: process.env.OKTA_PKCE,
        scopes: process.env.OKTA_SCOPES
      },
    },
  ],
```

These values are required:
  - `OKTA_ISSUER`, `OKTA_CLIENT_ID`, `OKTA_REDIRECT_URI`
  
These are optional and have the following defaults:
```js
// NOTE: `scopes`, `responseType` are of type [String] and not String. This was a huge hiccup for me.
{ 
  scopes: process.env.OKTA_SCOPES || ['openid', 'email', 'profile'],
  responseType: process.env.OKTA_RESPONSE_TYPE || ['token', 'id_token'],
  pkce: process.env.OKTA_PKCE || true,
  disableHttpsCheck: process.env.OKTA_DISABLE_HTTPS_CHECK || false
}
```

## Details

There are many ways to authenticate using Okta. This project shows you two ways that are similiar to the officially supported examples shown in [okta/samples-js-react](https://github.com/okta/samples-js-react).

The main difference is that this project uses Gatsby and we are taking advantage of the more modern `@reach/router` instead of using `react-router-dom`. 

## Implementation

### Context.Provider + useOktaAuth hook combo
If you want to use `SecurityProvider`. Make sure to wrap each page in a layout container so that each one of the components will have access to the authentication context.

```js
// layout.js

import React from 'react'
import { SecurityProvider } from 'gatsby-plugin-okta'

export default function Layout({ children }) {
  return (
    <SecurityProvider {...config}>
      <div>
        {children}
      </div>
    </Security>
```

In your component, destructure from `useOktaAuth()` in order to use the context.

```js
// Home.js

import React from 'react'
import { useOktaAuth } from 'gatsby-plugin-okta'

export default function Home() {
  const { authState, authService } = useOktaAuth()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null)
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, authService]) // Update if authState changes

  return (
    <div />
  )
}
```

### Understanding SecurityProvider
Learn more by visiting: https://github.com/okta/okta-oidc-js/blob/master/packages/okta-react/README.md#security

### useGatsbyAuth hook only
If you do not require the use of `SecurityProvider` and would like to have access to the context whenever your component requires it. 
Make sure to wrap private components in a `PrivateRoute.js` wrapper.

```js
// PrivateRoute.js

import React from 'react'
import { useGatsbyAuth } from 'gatsby-plugin-okta'

export default function PrivateRoute({ as: Component, location, ...rest }) {
  const { authState, authService } = useGatsbyAuth()

  if (authState && (authState.isAuthenticated || authState.isPending)) {
    return <Component {...rest} />
  } else {
    // this redirects an unauthenticated user to login, and once authenticated
    // will redirect back to the path of "/"
    authService.login('/')
    return null
  }
}
```

Setup your router and wrap the pages you want to protect in `<PrivateRoute>`. 

In this example, we will make just our root route of `Landing` as a private route. Because of `authService.login('/')`, it will redirect a user to the hosted okta page anytime the user visits the root domain.

All pages, `<Landing>`, `<Home>` and `<Profile>` do have logic inside that handles the `authState.isAuthenticated` boolean and shows different data.

```js
// in pages/index.js

import React from 'react'
import { Router } from '@reach/router'
import { PrivateRoute } from 'src/components/PrivateRoute'
import NotFoundPage from './404'
import Landing from './landing'
import Home from './home'
import Profile from './profile'

export default function App() {
  return (
    <Router>
      <PrivateRoute as={Landing} path="/" />
      <Home path="home" />
      <Profile path="profile" />
      <NotFoundPage default title="Not Found" />
    </Router>
  )
}
```

To have access to the react context once authenticated, make sure to import `useGatsbyAuth` from the plugin.
```js
import React, { useState, useEffect } from 'react'
import { useGatsbyAuth } from 'gatsby-plugin-okta'

export default function Home() {
  const { authState, authService } = useGatsbyAuth()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null)
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, authService]) // Update if authState changes

  return (
    <div />
  )
}
```

### useOktaAuth and useGatsbyAuth Deep Dive
Please check out official documentation found here:
https://github.com/okta/okta-oidc-js/blob/master/packages/okta-react/README.md#useoktaauth

### `authState`
Components get this object as a passed prop using the `useOktaAuth` or `useGatsbyAuth` React Hook.  
The `authState` object provides synchronous access to the following properties:
- `.isPending`
- `.isAuthenticated` 
- `.idToken`
- `.accessToken` 
- `.error`

To learn more about these, please go to the official documentation found at: 
https://github.com/okta/okta-oidc-js/blob/master/packages/okta-react/README.md#authstate


### `authService`
Components can get this object as a passed prop using the `useOktaAuth` or `useGatsbyAuth` React Hook.
The `authService` object provides methods for managing tokens and auth state. 

- `authService.getAuthState()`
- `authService.getUser()`
- `authService.getIdToken()`
- `authService.getAccessToken()`
- `authService.login(fromUri, additionalParams)`
- `authService.logout(uri)`
- `authService.redirect(additionalParams)`
- `authService.handleAuthentication()`
- `authService.setFromUri(uri)`
- `authService.getFromUri()`
- `authService.getTokenManager()`
- `authService.updateAuthState()`
- `authService.on(eventName, callback)`
- `authService.clearAuthState()`

To learn more about these functions, please to over to the official documentation: 
https://github.com/okta/okta-oidc-js/blob/master/packages/okta-react/README.md#authservice

### Setup Okta Widget
This does not require you to have to npm install the okta widget yourself because the plugin provides you with this dependency.

It does require you to have to set up a auth or login route in order to take advantage of the widget.

```js
// pages/login.js

import React, { useState, useEffect } from 'react'
import { OktaSignInWidget, config } from 'gatsby-plugin-okta'

const logo = 'https://www.gatsbyjs.com/Gatsby-Monogram.svg'
const title = "Acme Company Login"
const widget = OktaSignInWidget({ config, logo, title })

export default function Login() {
  const [renderWidget, setRenderWidget] = useState(false)
  useEffect(() => {
    if (!renderWidget) {
      widget.renderEl(
        { el: '#sign-in-widget' },
        () => {
          /**
           * In this flow, the success handler will not be called beacuse we redirect
           * to the Okta org for the authentication workflow.
           * but otherwise you can do something like `success(res)` and handle it appropriately
           */
        },
        (err) => {
          throw err
        }
      )
      setRenderWidget(true)
    }
  }, [renderWidget])

  useEffect(() => {
    return () => {
      if (renderWidget) {
        widget.remove()
        setRenderWidget(false)
      }
    }
  }, [renderWidget])

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  )
}
```

### `Okta Signin Widget` props

| Name     | Type     | Description                                                                                                                            |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `config` | `object` | Data object that is configured via your local `gatsby-config` file. Can be passed in by importing `config` from `'gatsby-plugin-okta'` |
| `title`  | `string` | The title that a user will see on the sign in widget                                                                                   |
| `logo`   | `string` | URL or local path to an svg that allows rendering of a logo                                                                            |

## Issues
This project is WIP and is just quickly put together so we can see an example of @reach/router usage.
There are lots of areas we have yet to touch with this particular project and it can be vastly larger
with much more customization that can be configured.

This is an open source plugin, so all PRs are welcome! Please feel free to fork it over and submit them
whenever you have some feature suggestions or bugfixes.

- Please submit tickets to https://github.com/jasonnoahchoi/gatsby-plugin-okta/issues