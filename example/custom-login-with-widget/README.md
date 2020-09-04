# Gatsby + Okta Custom Login with Widget

A usage of
[gatsby-plugin-okta](https://github.com/jasonnoahchoi/gatsby-plugin-okta)
that does nothing but use the theme. As a result you will see `Error: Missing resources for /` when navigating to `http://localhost:8000`. To get
rid of that, create a page in `src/pages/index.js`.


## Getting Started

```sh
cp .env.development.example .env.development
```

Fill in your information from the Okta admin dashboard. Steps can be found here:

[Create Okta Application](https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/)

Instead of `http://localhost:8080` as written in the directions, use `http://localhost:8000` since this is what gatsby typically runs on. Same goes for the `http://localhost:xxxx/implicit/callback`.

## How to Use

- Create a free [Okta Developer Edition organization](https://developer.okta.com/signup)
- Create an [Okta application](https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/)

```shell
$ cp .env.development.example .env.development
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

```js
// in your project's gatsby-config
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
      },
    },
  ],
```

## Project Layout
```text
.
├── custom-login-with-widget
│   ├── README.md
│   ├── .env.development.example
│   ├── gatsby-browser.js
│   ├── gatsby-config.js
│   ├── package.json
│   └── src
│       ├── gatsby-theme-shared-ui
│           ├── components
│               ├── Header.js
│               ├── layout.js
│               ├── PrivateRoute.js
│       ├── pages
│           ├── 404.js
│           ├── home.js
│           ├── index.js
│           ├── landing.js
│           ├── login.js
│           ├── profile.js
```

## Details

Custom Login Widget is very similiar to the documentation steps for the Single Page App: 

https://developer.okta.com/code/react/okta_react_sign-in_widget/#add-an-openid-connect-client-in-okta

It uses React's Context which provides a way to share values across Parent-Child components without having to explicitly pass a prop through every level of the tree. 

Instead of using `<Security />` we are calling it `<SecurityProvider />` to accurately label what it does for us.

In this particular example app, we are using `@reach/router` for routing instead of typical Okta routing provided by `react-router-dom`. 


Please take note of [layout.js](src/gatsby-theme-shared-ui/components/layout.js) and [gatsby-browser.js](src/../gatsby-browser.js). This project wraps each component in the `<SecurityProvider>` so that `useOktaAuth()` will have access to the context of `authResult` and `authService`. 

Note: It's also possible to have the `<SecurityProvider />` be a parent to `<Router />` in `index.js` but I chose not to do this to not have to prop drill into the `Header.js` which also requires access to the context.

