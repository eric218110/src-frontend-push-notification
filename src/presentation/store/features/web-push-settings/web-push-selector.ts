import { useSelector } from 'react-redux'
import { RootState } from '../../reducer/index'
import { NAME } from './web-push-slice'

export const useWebPushSettingsWithApplication = () =>
  useSelector((state: RootState) => state[NAME])
