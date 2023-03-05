import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
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
  },
  'Send email': {
    path: 'email',
    icon: <InboxIcon />
  },
  Drafts: {
    path: 'draft',
    icon: <InboxIcon />
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
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
