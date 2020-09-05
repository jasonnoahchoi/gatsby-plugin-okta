require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteMetadata = require('./site-config')

module.exports = {
  plugins: [
    'gatsby-theme-shared-ui',
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
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
