import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home'
import { LoginOrRegisterPage } from '../pages/loginOrRegister'
import { LoginOutlet } from '../pages/loginOrRegister/login'
import { RegisterOutlet } from '../pages/loginOrRegister/register'
import { PrivateRoutes } from '../pages/private'

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
    )
  }
])

export const Routes = () => <RouterProvider router={router} />
