import imageOverlay from '@assets/overlay-2.jpg'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import './style.css'

export const LoginOrRegisterPage = (): JSX.Element => (
  <Container
    maxWidth="lg"
    className="root-wrapper"
    style={{
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${imageOverlay})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}
    fixed
  >
    <Outlet />
  </Container>
)
