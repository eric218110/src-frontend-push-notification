import { useServices } from '@services/index'
import { useMutation, useQueryClient } from 'react-query'
import { useKey } from './../keys/index'

export const useMutationActiveWebPushApplication = () => {
  const { activeWebPushSettings } = useServices()

  const keyApp = useKey('listApplicationByIdService')
  const keyWebPush = useKey('listWebPushSettingsInApplicationById')

  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation(
    (appId: number) => activeWebPushSettings(appId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keyApp)
        queryClient.invalidateQueries(keyWebPush)
      }
    }
  )

  return {
    mutate,
    isLoading
  }
}
