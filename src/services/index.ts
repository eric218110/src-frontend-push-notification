import { createNewApplication } from './http/application/create/index'
import { authByLoginAndPassword } from './http/auth'
import { registerNewUser } from './http/register/'
import { signSocialWithGoogle } from './http/social/google/'
import { addWebPushSettingsInApplication } from './http/webPushSettings/create'
import { listWebPushSettingsInApplicationById } from './http/webPushSettings/list'

export const useServices = () => ({
  authByLoginAndPassword,
  registerNewUser,
  signSocialWithGoogle,
  createNewApplication,
  addWebPushSettingsInApplication,
  listWebPushSettingsInApplicationById
})
