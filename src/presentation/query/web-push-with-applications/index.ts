import { useServices } from '@services/index'
import { useQuery } from 'react-query'
import { useKey } from './../keys/index'

export const useQueryWebPushWithApplication = (applicationId: number) => {
  const { listWebPushSettingsInApplicationById, listApplicationByIdService } =
    useServices()

  const keyApp = useKey('listApplicationByIdService')
  const keyWebPush = useKey('listWebPushSettingsInApplicationById')

  const { data: webPushSettings } = useQuery(
    keyApp,
    () => listWebPushSettingsInApplicationById(applicationId),
    { refetchOnWindowFocus: false }
  )

  const { data: appInformations, isFetching } = useQuery(
    keyWebPush,
    () => listApplicationByIdService(applicationId),
    { refetchOnWindowFocus: false }
  )

  return {
    appInformations,
    webPushSettings,
    isLoading: isFetching
  }
}
