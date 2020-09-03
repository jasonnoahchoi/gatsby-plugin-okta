require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
      },
    },
  ],
  siteMetadata: {
    title: 'Demo 1',
    source:
      'https://github.com/jasonnoahchoi/gatsby-plugin-okta/tree/master/example',
  },
}
