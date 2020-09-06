# Gatsby Theme Okta Example

An example showing the use of PKCE authentication with an Okta hosted login redirect.

## Getting Started

```sh
cp .env.development.example .env.development
```

Fill in your information from the Okta admin dashboard. Steps can be found here:

[Create Okta Application](https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/)

Instead of `http://localhost:8080` as written in the directions, use `http://localhost:8000` since this is what gatsby typically runs on. Same goes for the `http://localhost:xxxx/implicit/callback`.

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


## How to Run

Once the above has all been filled in:

```sh
// from the root of the project
$ yarn workspace okta-hosted-login develop
```

## Project Layout
```text
.
├── okta-hosted-login
│   ├── README.md
│   ├── .env.development.example
│   ├── gatsby-browser.js
│   ├── gatsby-config.js
│   ├── package.json
│   └── src
│       ├── pages
│           ├── 404.js
│           ├── home.js
│           ├── index.js
│           ├── landing.js
│           ├── profile.js
```

## Details

Okta Hosted Login is very similiar to the documentation steps for the Single Page App: 

https://developer.okta.com/docs/guides/implement-auth-code-pkce/overview/

It shows you how you can use the hook of `useGatsbyAuth()` in order to get access to the context without having to wrap everything in a `Context.Provider`.

In this particular example app, we are using `@reach/router` for routing instead of typical Okta routing provided by `react-router-dom`. This allows us the use of a `PrivateRoute` component which will protect application routes from unauthenticated users.

If the user is unauthenticated, it redirects to the okta hosted url for your application. Once authenticated, it redirects back to the specified `redirectUri` (in our case, http://localhost:8000/implicit/callback) and will redirect back to the page path you place into `authService.login()`.
