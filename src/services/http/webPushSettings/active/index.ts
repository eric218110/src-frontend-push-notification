import { UpdateStatusWebPushSettings } from '@domain/models/settings/webpush'
import { api } from '@services/util/api'

export const activeWebPushSettings = async (
  appId: number
): Promise<UpdateStatusWebPushSettings> => {
  const { data } = await api.put<UpdateStatusWebPushSettings>(
    `apps/${appId}/webpushes/settings`
  )
  return data
}
