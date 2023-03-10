import { HttpResponse } from '@domain/models/http/index'
import { LoginSuccess } from '@domain/models/login/index'
import { SocialGoogleResponse } from '@domain/models/social/google'
import { loadEnvByKey } from '@services/env/'
import { authByLoginAndPassword } from '@services/http/auth'
import { registerNewUser } from '@services/http/register'
import axios, { AxiosError } from 'axios'

export const signSocialWithGoogle = async (
  tokenGoogle: string
): Promise<HttpResponse<LoginSuccess>> => {
  try {
    const url = `${loadEnvByKey('VITE_GOOGLE_API_PROFILE')}${tokenGoogle}`
    const { data } = await axios.get<SocialGoogleResponse>(url, {
      headers: {
        Authorization: `Bearer ${tokenGoogle}`,
        Accept: 'application/json'
      }
    })

    const { error, data: authUser } = await authByLoginAndPassword({
      login: data.email,
      password: data.email
    })

    if (authUser) {
      return { data: authUser }
    }

    if (error) {
      const createUser = await registerNewUser({
        name: data.name,
        email: data.email,
        password: data.email,
        confirme_password: ''
      })

      if (createUser.data) {
        return authByLoginAndPassword({
          login: data.email,
          password: data.email
        })
      }
    }
    return {
      error: {
        message: 'Email cadastrado com usuário e senha anteriormente'
      }
    }
  } catch (err: unknown) {
    const error = err as unknown as AxiosError
    return {
      error: {
        message: error.message
      }
    }
  }
}
