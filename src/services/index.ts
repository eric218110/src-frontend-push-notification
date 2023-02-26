import { authByLoginAndPassword } from './http/auth'
import { registerNewUser } from './http/register/index'

export const useServices = () => ({
  authByLoginAndPassword,
  registerNewUser
})
