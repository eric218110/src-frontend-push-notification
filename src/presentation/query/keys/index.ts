type KeyType =
  | 'listApplicationByIdService'
  | 'listWebPushSettingsInApplicationById'
  | 'activeWebPushSettings'
  | 'listApplicationsPaginate'

const queryKeys: Record<KeyType, KeyType> = {
  listApplicationByIdService: 'listApplicationByIdService',
  listWebPushSettingsInApplicationById: 'listWebPushSettingsInApplicationById',
  activeWebPushSettings: 'activeWebPushSettings',
  listApplicationsPaginate: 'listApplicationsPaginate'
}

export const useKey = (index: KeyType) => queryKeys[index] as typeof index
