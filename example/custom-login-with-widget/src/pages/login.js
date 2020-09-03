import React, { useEffect } from 'react'
import OktaSignIn from '@okta/okta-signin-widget'
import { config } from 'gatsby-plugin-okta'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

export default function Login() {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: '/react.svg',
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

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err
      }
    )
  }, [])

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  )
}
