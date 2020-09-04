import useSecurity from './useSecurity'
import config from '../auth/config'

/**
 * useGatsbyAuth does not require the use of `<SecurityProvider {...config} />`
 * because useSecurity already has already created and using the context.
 *
 * @returns {Object} containing {
 *  authState,
 *  authService,
 *  loading,
 *  error
 * }
 */

export default function useGatsbyAuth() {
  const { loading, error, result } = useSecurity(config)
  const { authState, authService } = result

  return { loading, error, authState, authService }
}
