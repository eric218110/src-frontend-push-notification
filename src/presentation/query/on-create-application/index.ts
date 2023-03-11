import {
  CreateApplicationForm,
  OnSuccessCreateApp
} from '@domain/models/application'
import { useServices } from '@services/index'
import { normalizeHttpError } from '@services/util/normalize-error'
import { useMutation, useQueryClient } from 'react-query'
import { useKey } from '../keys'

export const useQueryOnCreateApplication = (
  onSuccess?: (data: OnSuccessCreateApp) => void
) => {
  const { createNewApplication } = useServices()
  const client = useQueryClient()
  const key = useKey('listApplicationsPaginate')

  const { mutate, data, isLoading, error } = useMutation(
    (body: CreateApplicationForm) => createNewApplication(body),
    {
      onSuccess: (data, variables) => {
        client.invalidateQueries(key)
        onSuccess && onSuccess({ ...data, ...variables })
      }
    }
  )

  return {
    data,
    isLoading,
    mutate,
    error: normalizeHttpError(error)
  }
}
