import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

/**
 * OktaSignIn component
 *
 * The okta sign in widget requires that you are not using SSR at this time.
 * This is something that will be handled in a future PR hopefully.
 * It also requires that you set a config.
 *
 * @param {object} config - Required configuration object that can be found at `src/auth/config`
 * @param {string} title - Optional string that provides title for widget
 * @param {string} logo - Optional logo path
 *
 * @returns {object} widget
 */

export default function OktaSignInWidget({ config, title, logo }) {
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
        'primaryauth.title': title,
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
