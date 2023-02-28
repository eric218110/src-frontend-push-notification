import { GoogleOAuthProvider } from '@react-oauth/google'
import { loadEnvByKey } from '@services/env'

export const GoogleSignProvider = ({ children }: { children: JSX.Element }) => {
  const clientId = loadEnvByKey('VITE_API_KEY_GOOGLE_SIGN')
  return (
    <GoogleOAuthProvider clientId={clientId}>{children} </GoogleOAuthProvider>
  )
}
