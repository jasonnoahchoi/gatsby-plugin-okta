import React, { useEffect } from 'react'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

/**
 * OktaSignIn component
 *
 *
 * It also requires that you set a config.
 *
 * @param {object} config - Required configuration object that can be found at `src/auth/config`
 * @param {string} title - Optional string that provides title for widget
 * @param {string} logo - Optional logo path
 *
 * @returns {object} <div />
 */

export default function OktaSignInWidget({ config, title, logo }) {
  useEffect(() => {
    let widget
    const { pkce, issuer, clientId, redirectUri, scopes, domain } = config
    // https://github.com/gatsbyjs/gatsby/issues/309
    import('@okta/okta-signin-widget')
      .then((oktaSignIn) => {
        const OktaSignIn = oktaSignIn.default
        function createWidget() {
          widget = new OktaSignIn({
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
        }
        createWidget()
      })
      .catch((e) => console.warn(e))
    return () => {
      if (widget) {
        widget.remove()
      }
    }
  }, [config, title, logo])

  return <div id="sign-in-widget" />
}
