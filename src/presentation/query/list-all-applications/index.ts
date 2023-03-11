import { useServices } from '@services/index'
import { useQuery } from 'react-query'
import { useKey } from '../keys'

export const useQueryListAllApplications = (take: number, skip: number) => {
  const { showAllApplication } = useServices()
  const key = useKey('listApplicationsPaginate')

  const { data, isLoading } = useQuery(
    [key, take, skip],
    () => showAllApplication(take, skip),
    { refetchOnWindowFocus: false, staleTime: 5000 * 50 }
  )

  return {
    data,
    isLoading
  }
}
