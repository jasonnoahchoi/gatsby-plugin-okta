/**
 * useSecurity is basically a copy of <Security /> from @okta/okta-react
 * except instead of being the provider that wraps around all components,
 * instead it provides access to the context as a hook.
 */

import { useState, useEffect, useMemo, createContext, useContext } from 'react'
import { AuthService } from '@okta/okta-react'

export default function useSecurity(props) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const initialAuthService = useMemo(() => {
    // don't keep spawning new service instances if this component rerenders
    return props.authService || new AuthService(props)
  }, [props])

  const [authService] = useState(initialAuthService)
  const [authState, setAuthState] = useState(authService.getAuthState())

  useEffect(() => {
    async function fetchData() {
      try {
        const unsub = authService.on('authStateChange', () => {
          setAuthState(authService.getAuthState())
        })

        if (!authService._oktaAuth.token.isLoginRedirect()) {
          setLoading(false)

          // Trigger an initial change event to make sure authState is latest when not in loginRedirect state
          authService.updateAuthState()
        }
        return unsub
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }
    fetchData()
  }, [authService])

  const newContext = createContext({ authService, authState })
  const result = useContext(newContext)

  return {
    loading,
    error,
    result,
  }
}
