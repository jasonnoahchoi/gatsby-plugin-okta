const path = require('path')

const checkRequiredCreds = (creds) => {
  Object.entries(creds).map(([key, value]) => {
    if (!value) {
      throw new Error(`Required option "${key}" not specified`)
    }
  })
}

exports.onCreateWebpackConfig = ({ plugins, actions }, options) => {
  const {
    clientId,
    issuer,
    redirectUri,
    scopes,
    pkce,
    disableHttpsCheck,
  } = options
  checkRequiredCreds({ issuer, clientId, redirectUri })

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env': {
          OKTA_ISSUER: JSON.stringify(issuer),
          OKTA_CLIENT_ID: JSON.stringify(clientId),
          OKTA_REDIRECT_URI: JSON.stringify(redirectUri),
          OKTA_SCOPES: JSON.stringify(scopes),
          OKTA_PKCE: JSON.stringify(pkce),
          OKTA_DISABLE_HTTPS_CHECK: JSON.stringify(disableHttpsCheck),
        },
      }),
    ],
  })
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = ({ actions }, options) => {
  const { createPage } = actions
  const { callbackPath } = options
  createPage({
    path: callbackPath || '/implicit/callback',
    component: path.resolve(`${__dirname}/src/components/callback.js`),
  })
}
