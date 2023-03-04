type MakeComposeProviderProps = {
  childrens: React.ElementType[]
  children: React.ReactNode
}

export const ComposeProvider = ({
  children,
  childrens: Providers
}: MakeComposeProviderProps): JSX.Element => (
  <>
    {Providers.reverse().reduce(
      (Providers, Provider) => (
        <Provider>{Providers}</Provider>
      ),
      children
    )}
  </>
)
