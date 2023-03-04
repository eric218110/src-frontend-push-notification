import { Provider } from 'react-redux'
import { store } from './reducer'

export const StoreProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => <Provider store={store}>{children}</Provider>
