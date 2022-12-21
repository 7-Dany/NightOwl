import { IconProps } from './Icon.types'

function PagesIcon({ className }: IconProps) {
  return (
    <svg width='20' height='22' viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path d='M5 17H12M5 13H6M5 9H8M5 1H14.5L19 5.5V18' stroke='#292524' strokeWidth='1.5' strokeLinecap='round'
            strokeLinejoin='round' />
      <path
        d='M1 19.5V5.5C1 5.10218 1.15804 4.72064 1.43934 4.43934C1.72064 4.15804 2.10218 4 2.5 4H12.252C12.4111 4.00014 12.5636 4.06345 12.676 4.176L15.824 7.324C15.88 7.3799 15.9243 7.44632 15.9545 7.51943C15.9847 7.59254 16.0002 7.6709 16 7.75V19.5C16 19.8978 15.842 20.2794 15.5607 20.5607C15.2794 20.842 14.8978 21 14.5 21H2.5C2.10218 21 1.72064 20.842 1.43934 20.5607C1.15804 20.2794 1 19.8978 1 19.5Z'
        stroke='#292524' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 4V7.4C12 7.55913 12.0632 7.71174 12.1757 7.82426C12.2883 7.93679 12.4409 8 12.6 8H16' stroke='#292524'
            strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default PagesIcon