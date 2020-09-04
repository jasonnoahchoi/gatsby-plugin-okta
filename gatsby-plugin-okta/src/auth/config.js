const config = {
  domain: process.env.OKTA_DOMAIN,
  issuer: process.env.OKTA_ISSUER,
  clientId: process.env.OKTA_CLIENT_ID,
  redirectUri: process.env.OKTA_REDIRECT_URI,
  scopes: process.env.OKTA_SCOPES || ['openid', 'email', 'profile'],
  responseType: process.env.OKTA_RESPONSE_TYPE || ['token', 'id_token'],
  pkce: process.env.OKTA_PKCE || true,
  disableHttpsCheck: process.env.OKTA_DISABLE_HTTPS_CHECK || false,
  authParams: {
    // for okta-sign-in-widget
    display: 'page',
    responseType: process.env.OKTA_RESPONSE_TYPE || ['token', 'id_token'],
    pkce: process.env.OKTA_PKCE || true,
    responseMode: process.env.OKTA_PKCE || true ? 'query' : 'fragment',
  },
}

export default config
