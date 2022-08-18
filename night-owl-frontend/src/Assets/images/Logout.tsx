import { IconProps } from './Icon.types'

function Logout({ className }: IconProps) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path fillRule='evenodd' clipRule='evenodd' d='M2 13H14V11H2V13Z' />
      <path fillRule='evenodd' clipRule='evenodd'
            d='M4.79283 7.79297L1.29283 11.293C0.902307 11.6835 0.902307 12.3167 1.29283 12.7072L4.79283 16.2072L6.20704 14.793L3.41415 12.0001L6.20704 9.20719L4.79283 7.79297Z'
      />
      <path fillRule='evenodd' clipRule='evenodd'
            d='M14.5954 5.5C12.1159 5.5 9.95745 6.93099 8.89246 9.03855L7.10742 8.13653C8.49483 5.39092 11.3226 3.5 14.5954 3.5C19.2491 3.5 22.9999 7.31769 22.9999 12C22.9999 16.6823 19.2491 20.5 14.5954 20.5C11.3226 20.5 8.49483 18.6091 7.10742 15.8635L8.89246 14.9615C9.95745 17.069 12.1159 18.5 14.5954 18.5C18.1205 18.5 20.9999 15.602 20.9999 12C20.9999 8.39803 18.1205 5.5 14.5954 5.5Z'
      />
    </svg>
  )
}

export default Logout