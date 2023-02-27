export type LoginFormModel = {
  login: string
  password: string
}

export type LoginSuccess = {
  token: string
  user: {
    name: string
    email: string
    id: number
  }
}
