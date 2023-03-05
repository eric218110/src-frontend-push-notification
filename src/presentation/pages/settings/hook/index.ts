import { useContext } from 'react'
import { WebPushSettingsContext } from '../provider'

export const useWebPushSettings = () => {
  const context = useContext(WebPushSettingsContext)
  if (!context) throw new Error('Not exist WebPushSettingsContext')
  return context
}
