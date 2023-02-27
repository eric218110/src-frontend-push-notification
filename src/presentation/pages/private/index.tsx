import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const data = window.localStorage.getItem('@@auth-token')

  if (data !== null && JSON.parse(data).token !== '') {
    return children
  }

  const location = useLocation()
  return <Navigate to="/auth" state={{ from: location }} replace />
}
