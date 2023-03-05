import { Button as ButtonMUI, CircularProgress } from '@mui/material'
import { ButtonTypeMap } from '@mui/material/Button'
import { OverrideProps } from '@mui/material/OverridableComponent'

type ButtonMUIProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>

type ButtonProps = ButtonMUIProps & {
  isLoading?: boolean
}

export const Button = (props: ButtonProps) => {
  const { isLoading, children, ...rest } = props

  return (
    <ButtonMUI variant="contained" {...rest}>
      {children}
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px'
          }}
        />
      )}
    </ButtonMUI>
  )
}
