export type RegisterFormModel = {
  email: string
  name: string
  password: string
  confirme_password: string
  company_name?: string
  phone_number?: string
  company_address?: string
}

export type RegisterUserSuccess = {
  id: number
}
