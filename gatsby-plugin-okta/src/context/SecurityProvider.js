/**
 * SecurityProvider is a wrapper around Security.
 *
 * Because this is using `@okta/okta-react` package, when using SecurityProvider,
 * in order to use the context correctly, please import `useOktaAuth` in your project to get access
 * to `authState` and `authService`.
 */

import { Security as SecurityProvider } from '@okta/okta-react'
export default SecurityProvider
