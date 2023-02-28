import { AppsPage } from '@presentation/pages/apps'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home'
import { LoginOrRegisterPage } from '../pages/loginOrRegister'
import { LoginOutlet } from '../pages/loginOrRegister/login'
import { RegisterOutlet } from '../pages/loginOrRegister/register'
import { PrivateRoutes } from '../pages/private'
import { SettingsPage } from '../pages/settings'

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <LoginOrRegisterPage />,
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
