import { IconProps } from './Icon.types'

function DiscussionIcon({ className }: IconProps) {
  return (
    <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path
        d='M14 9V0.9C14 0.661305 13.9052 0.432387 13.7364 0.263604C13.5676 0.0948211 13.3387 0 13.1 0H1.4C1.16131 0 0.932387 0.0948211 0.763604 0.263604C0.594821 0.432387 0.5 0.661305 0.5 0.9V13.5L4.1 9.9H13.1C13.3387 9.9 13.5676 9.80518 13.7364 9.6364C13.9052 9.46761 14 9.23869 14 9ZM17.6 3.6H15.8V11.7H4.1V13.5C4.1 13.7387 4.19482 13.9676 4.3636 14.1364C4.53239 14.3052 4.7613 14.4 5 14.4H14.9L18.5 18V4.5C18.5 4.2613 18.4052 4.03239 18.2364 3.8636C18.0676 3.69482 17.8387 3.6 17.6 3.6Z'
      />
    </svg>
  )
}

export default DiscussionIcon