import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginOrRegisterPage } from '../pages/loginOrRegister'
import { LoginOutlet } from '../pages/loginOrRegister/login'
import { RegisterOutlet } from '../pages/loginOrRegister/register'

const router = createBrowserRouter([
  {
    path: '/',
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
  }
])

export const Routes = () => <RouterProvider router={router} />
