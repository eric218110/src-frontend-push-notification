type KeyTypes = 'VITE_BASE_URL'

export const loadEnvByKey = (key: KeyTypes) => {
  return import.meta.env[key] || ''
}
