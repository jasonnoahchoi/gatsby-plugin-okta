require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteMetadata = require('./site-config')

module.exports = {
  plugins: [
    'gatsby-theme-shared-ui',
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
  siteMetadata: {
    title: siteMetadata.siteTitle,
    source: siteMetadata.sourceUrl,
  },
}
