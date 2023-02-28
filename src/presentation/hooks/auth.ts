import { AuthContext } from '@presentation/providers/auth'
import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Context AuthContext not found')
  return context
}
