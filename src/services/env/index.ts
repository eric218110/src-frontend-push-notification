type KeyTypes =
  | 'VITE_BASE_URL'
  | 'VITE_API_KEY_GOOGLE_SIGN'
  | 'VITE_GOOGLE_API_PROFILE'

export const loadEnvByKey = (key: KeyTypes) => {
  return import.meta.env[key] || ''
}
