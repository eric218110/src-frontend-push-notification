export const useValidator = () => {
  return {
    emailIsValid: (value: string) => {
      const regexp = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      return regexp.test(value)
    },
    passwordIsEquals: (
      password: string | undefined,
      confirmPassword: string | undefined
    ) => password?.toLowerCase() === confirmPassword?.toLowerCase(),
    passwordIsMinLenght: (value: string) => value.length <= 7
  }
}
