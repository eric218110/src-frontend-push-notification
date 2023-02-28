import { createNewApplication } from './http/application/create/index'
import { authByLoginAndPassword } from './http/auth'
import { registerNewUser } from './http/register/'
import { signSocialWithGoogle } from './http/social/google/'

export const useServices = () => ({
  authByLoginAndPassword,
  registerNewUser,
  signSocialWithGoogle,
  createNewApplication
})
