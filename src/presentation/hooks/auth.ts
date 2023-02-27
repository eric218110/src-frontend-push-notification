import { useContext } from 'react'
import { AuthContext } from '../providers/auth'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Context AuthContext not found')
  return context
}
