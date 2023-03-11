import { ListWebPushSettings } from '@domain/models/settings/webpush'
import { api } from '@services/util/api'

export const listWebPushSettingsInApplicationById = async (
  applicationId: number
) => {
  const { data } = await api.get<ListWebPushSettings>(
    `apps/${applicationId}/webpushes/settings`
  )
  return data
}
