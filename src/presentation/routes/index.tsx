import { AppsPage } from '@presentation/pages/apps'
import HomePage from '@presentation/pages/home'
import { LoginOrRegisterPage } from '@presentation/pages/loginOrRegister'
import { LoginOutlet } from '@presentation/pages/loginOrRegister/login'
import { RegisterOutlet } from '@presentation/pages/loginOrRegister/register'
import { PrivateRoutes } from '@presentation/pages/private'
import { SettingsPage } from '@presentation/pages/settings'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <LoginOrRegisterPage />,
    errorElement: <Navigate to="/auth" />,
    children: [
      {
        path: '',
        element: <LoginOutlet />
      },
      {
        path: 'register',
        element: <RegisterOutlet />
      }
    ]
  },
  {
    path: '',
    element: (
      <PrivateRoutes>
        <HomePage />
      </PrivateRoutes>
    ),
    children: [
      {
        path: '',
        element: <SettingsPage />
      },
      {
        path: 'apps',
        element: <AppsPage />
      }
    ]
  }
])

export const Routes = () => <RouterProvider router={router} />
