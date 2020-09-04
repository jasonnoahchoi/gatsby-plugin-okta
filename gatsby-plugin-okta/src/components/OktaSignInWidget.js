import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

export default function OktaSignInWidget({ config, logo }) {
  const { pkce, issuer, clientId, redirectUri, scopes, domain } = config
  const widget = new OktaSignIn({
    /**
     * Note: when using the Sign-In Widget for an OIDC flow, it still
     * needs to be configured with the base URL for your Okta Org. Here
     * we derive it from the given issuer for convenience.
     */
    baseUrl: domain || issuer.split('/oauth2')[0],
    clientId,
    redirectUri,
    logo,
    i18n: {
      en: {
        'primaryauth.title': 'Sign in with Custom Widget',
      },
    },
    authParams: {
      pkce,
      issuer,
      display: 'page',
      responseMode: pkce ? 'query' : 'fragment',
      scopes,
    },
  })
  return widget
}
