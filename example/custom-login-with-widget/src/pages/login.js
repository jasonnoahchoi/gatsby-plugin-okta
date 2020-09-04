import React, { useEffect } from 'react'

import { config } from 'gatsby-plugin-okta'

import OktaSignInWidget from '../components/OktaSignInWidget'

export default function Login() {
  useEffect(() => {
    const widget = OktaSignInWidget(config)
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
