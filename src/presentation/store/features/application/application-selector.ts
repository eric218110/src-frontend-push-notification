import { useSelector } from 'react-redux'
import { RootState } from '../../reducer/index'
import { NAME } from './application-slice'

export const useApplicationSelectorAll = () =>
  useSelector((state: RootState) => state[NAME].applications)

export const useApplicationSelectorLastItem = () =>
  useSelector((state: RootState) => state[NAME].applications.slice(-1)[0])

export const useFetchAllApplications = () =>
  useSelector((state: RootState) => {
    const { isLoading, error, showAllApplication } = state[NAME]
    return {
      isLoading,
      error,
      showAllApplication
    }
  })
