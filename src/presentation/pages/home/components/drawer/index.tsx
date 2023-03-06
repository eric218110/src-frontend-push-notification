import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const options: Record<
  string,
  {
    path: string
    icon: JSX.Element
  }
> = {
  Configuração: {
    path: '',
    icon: <SettingsIcon />
  },
  'Meus apps': {
    path: 'apps',
    icon: <AppSettingsAltIcon />
  }
}

export const DrawerHomeComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeItem, setActiveItem] = useState(location.pathname.split('/')[1])

  const handlerOnPressItem = (path: string) => {
    navigate(path)
    setActiveItem(path)
  }

  const isActive = (path: string) =>
    path.toLowerCase() === activeItem.toLowerCase()

  return (
    <div>
      <Toolbar title="teste">
        <Typography color="GrayText">Sistema de Notificações</Typography>
      </Toolbar>
      <Divider />
      <List>
        {Object.entries(options).map(([key, { icon, path }]) => (
          <ListItem
            disablePadding
            key={key}
            onClick={() => {
              handlerOnPressItem(path)
            }}
          >
            <ListItemButton selected={isActive(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )
}
