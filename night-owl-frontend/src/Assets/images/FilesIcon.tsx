import { IconProps } from './Icon.types'

function FilesIcon({ className }: IconProps) {
  return (
    <svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'
         className={className}>
      <path
        d='M9 7V1.5L14.5 7M2 0C0.89 0 0 0.89 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6L10 0H2Z'
      />
    </svg>
  )
}

export default FilesIcon