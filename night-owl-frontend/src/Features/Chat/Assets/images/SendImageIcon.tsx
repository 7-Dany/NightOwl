import { IconProps } from '../../../../Assets/images/Icon.types'

function SendImageIcon({ className }: IconProps) {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path
        d='M6.375 10.125L8.25 12.375L10.875 9L14.25 13.5H3.75L6.375 10.125ZM15.75 14.25V3.75C15.75 2.9175 15.075 2.25 14.25 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25Z'
      />
    </svg>
  )
}

export default SendImageIcon