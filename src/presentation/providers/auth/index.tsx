import { createContext, useCallback, useEffect, useState } from 'react'
import { LoginSuccess } from '../../../domain/models/login'

export type AuthContextType = {
  onAuth: (payload: LoginSuccess) => void
  onLogout: () => void
  auth: LoginSuccess | undefined
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const tokenKey = '@@auth-token'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<LoginSuccess | undefined>(undefined)

  useEffect(() => {
    const data = window.localStorage.getItem(tokenKey)
    if (data !== null) setAuth(JSON.parse(data))
  }, [])

  const saveAuthInStorage = (payload: LoginSuccess) => {
    localStorage.setItem(tokenKey, JSON.stringify(payload))
  }

  const onAuth = useCallback((payload: LoginSuccess) => {
    saveAuthInStorage(payload)
    setAuth(() => ({ ...payload }))
  }, [])

  const onLogout = useCallback(() => {
    localStorage.removeItem(tokenKey)
  }, [])

  const loadAuth = useCallback(() => auth, [auth])

  return (
    <AuthContext.Provider value={{ onAuth, onLogout, auth: loadAuth() }}>
      {children}
    </AuthContext.Provider>
  )
}
