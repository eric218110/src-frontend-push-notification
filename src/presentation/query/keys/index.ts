type KeyType =
  | 'listApplicationByIdService'
  | 'listWebPushSettingsInApplicationById'
  | 'activeWebPushSettings'

const queryKeys: Record<KeyType, KeyType> = {
  listApplicationByIdService: 'listApplicationByIdService',
  listWebPushSettingsInApplicationById: 'listWebPushSettingsInApplicationById',
  activeWebPushSettings: 'activeWebPushSettings'
}

export const useKey = (index: KeyType) => queryKeys[index] as typeof index
