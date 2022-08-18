import { IconProps } from './Icon.types'

function ChatIcon({ className }: IconProps) {
  return (
    <svg width='21' height='19' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path
        d='M10.5563 0.628418C16.0563 0.628418 20.5563 4.20842 20.5563 8.62842C20.5563 13.0484 16.0563 16.6284 10.5563 16.6284C9.31627 16.6284 8.12627 16.4484 7.02627 16.1284C4.10627 18.6284 0.556274 18.6284 0.556274 18.6284C2.88627 16.2984 3.25627 14.7284 3.30627 14.1284C1.60627 12.6984 0.556274 10.7584 0.556274 8.62842C0.556274 4.20842 5.05627 0.628418 10.5563 0.628418Z'
      />
    </svg>
  )
}

export default ChatIcon