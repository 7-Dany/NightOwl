import { IconProps } from '../../../../Assets/images/Icon.types'

function SendMsgIcon({ className }: IconProps) {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path d='M0 18L18 9L0 0V7L12.8571 9L0 11V18Z' />
    </svg>
  )
}

export default SendMsgIcon