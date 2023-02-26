import axios from 'axios'
import { loadEnvByKey } from '../env'

export const axiosInstance = () =>
  axios.create({
    baseURL: loadEnvByKey('VITE_BASE_URL')
  })
