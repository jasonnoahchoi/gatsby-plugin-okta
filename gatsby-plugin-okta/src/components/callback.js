/*
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useEffect } from 'react'
import useGatsbyAuth from '../hooks/useGatsbyAuth'

/**
 * OktaError component
 *
 * @param {Object} [error] - Error passed in to display to user
 *
 * @returns {ReactElement} <p />
 */

const OktaError = ({ error }) => {
  if (error.name && error.message) {
    return (
      <p>
        {error.name}: {error.message}
      </p>
    )
  }
  return <p>Error: {error.toString()}</p>
}

/**
 * LoginCallback component
 *
 * Copy of LoginCallback in `@okta/okta-react` that uses useGatsbyAuth()
 * The reason we have used it here is because we want to set our Gatsby page of `implicit/callback`
 * with this particular component as the page which is set up in the `gatsby-node` file.
 *
 * If you want to use your own component as the callback page, please look into gatsby theme shadowing.
 *
 *
 * @param {ReactComponent} [errorComponent] - Optional top-level Component to show error
 *
 * @returns {ReactElement} <div>
 */

export default function LoginCallback({ errorComponent }) {
  const { authService, authState } = useGatsbyAuth()

  const authStateReady = !authState.isPending

  let ErrorReporter = errorComponent || OktaError

  useEffect(() => {
    authService.handleAuthentication()
  }, [authService])

  if (authStateReady && authState.error) {
    return <ErrorReporter error={authState.error} />
  }
  return null
}
