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

const options: Record<string, () => JSX.Element> = {
  Configuração: () => <SettingsIcon />,
  Starred: () => <InboxIcon />,
  'Send email': () => <InboxIcon />,
  Drafts: () => <InboxIcon />
}

export const DrawerHomeComponent = () => {
  return (
    <div>
      <Toolbar>
        <Typography color="GrayText">Sistema de Notificações</Typography>
      </Toolbar>
      <Divider />
      <List>
        {Object.entries(options).map(([key, Icon]) => (
          <ListItem key={key} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
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
