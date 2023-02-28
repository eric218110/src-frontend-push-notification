/* eslint-disable prettier/prettier */
import axios from 'axios'
import { loadEnvByKey } from '../env'

export const axiosInstance = (accessToken?: string) =>
  axios.create({
    baseURL: loadEnvByKey('VITE_BASE_URL'),
    headers: accessToken ? {
      Authorization: `Bearer ${accessToken}`
    } : undefined
  })
