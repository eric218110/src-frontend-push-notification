import { showAllApplication } from '@services/http/application/show'
import { createNewApplication } from './http/application/create/index'
import { listApplicationByIdService } from './http/application/list/byId/index'
import { authByLoginAndPassword } from './http/auth'
import { registerNewUser } from './http/register/'
import { signSocialWithGoogle } from './http/social/google/'
import { activeWebPushSettings } from './http/webPushSettings/active/index'
import { addWebPushSettingsInApplication } from './http/webPushSettings/create'
import { listWebPushSettingsInApplicationById } from './http/webPushSettings/list'

export const useServices = () => ({
  authByLoginAndPassword,
  registerNewUser,
  signSocialWithGoogle,
  createNewApplication,
  addWebPushSettingsInApplication,
  listWebPushSettingsInApplicationById,
  activeWebPushSettings,
  listApplicationByIdService,
  showAllApplication
})
