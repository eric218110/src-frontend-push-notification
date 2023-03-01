type InputProps = {
  placeholder: string
  label: string
  type?: React.HTMLInputTypeAttribute
  focus?: boolean
}

const urlInformation: Record<string, InputProps> = {
  name: {
    placeholder: 'Nome do site que irá enviar a notificação',
    label: 'Site',
    focus: true
  },
  address: {
    placeholder: 'Url do site que',
    label: 'Url',
    type: 'url'
  },
  url_icon: {
    placeholder: 'Imagem do ícone do site',
    label: 'Url Icon'
  }
}

const permission: Record<string, InputProps> = {
  message_text_allow_notification: {
    placeholder: 'Texto da mensagem de permissão',
    label: 'Texto Mensagem',
    type: 'url'
  },
  allow_button_text: {
    placeholder: 'Texto do botão Permitir',
    label: 'Texto permitir'
  },
  deny_button_text: {
    placeholder: 'Texto do botão Negar',
    label: 'Texto Negar'
  }
}

export const inputs = {
  urlInformation,
  permission
}
