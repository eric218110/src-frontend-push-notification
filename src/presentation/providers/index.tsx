import { Routes } from '@presentation/routes'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './auth'
import { GoogleSignProvider } from './google'
import { ThemeProvider } from './theme'

export const MainProviders = () => (
  <ThemeProvider>
    <GoogleSignProvider>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SnackbarProvider>
    </GoogleSignProvider>
  </ThemeProvider>
)
