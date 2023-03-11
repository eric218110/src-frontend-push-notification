/* eslint-disable prettier/prettier */
import axios from 'axios'
import { loadEnvByKey } from '../env'


export const api = axios.create({
  baseURL: loadEnvByKey('VITE_BASE_URL'),

})

api.interceptors.request.use((config) => {
  const storagedToken = window.localStorage.getItem('@@auth-token')

  if (storagedToken) {
    const { token = '' } = JSON.parse(storagedToken)
    config.headers.Authorization = storagedToken ? `Bearer ${token}` : undefined
  }

  return { ...config }
})

api.interceptors.response.use(r => r,
  error => {
    const access_token = localStorage.getItem("@@auth-token");
    if (error.response.status === 401 && access_token) {
      window.location.href = '/auth'
    }
    return Promise.reject(error);
  }
);