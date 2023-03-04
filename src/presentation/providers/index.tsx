import { Routes } from '@presentation/routes'
import { StoreProvider } from '@presentation/store'
import { AuthProvider } from './auth'
import { ComposeProvider } from './compose'
import { GoogleSignProvider } from './google'
import { SnackBarProvider } from './snackbar'
import { ThemeProvider } from './theme'

export const MainProviders = () => (
  <ComposeProvider
    childrens={[
      AuthProvider,
      SnackBarProvider,
      GoogleSignProvider,
      ThemeProvider,
      StoreProvider
    ]}
  >
    <Routes />
  </ComposeProvider>
)
