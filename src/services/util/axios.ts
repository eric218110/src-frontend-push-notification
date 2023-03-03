/* eslint-disable prettier/prettier */
import axios from 'axios'
import { loadEnvByKey } from '../env'

export const axiosInstance = () =>
  axios.create({
    baseURL: loadEnvByKey('VITE_BASE_URL'),
    headers: { ...loadAuthorizationInStorage() }
  })

const loadAuthorizationInStorage = () => {
  const storagedToken = window.localStorage.getItem('@@auth-token')
  if (storagedToken !== null) {
    const { token = '' } = JSON.parse(storagedToken)
    return {
      Authorization: `Bearer ${token}`
    }
  }
  return undefined
}