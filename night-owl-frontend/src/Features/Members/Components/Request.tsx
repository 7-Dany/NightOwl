type RequestProps = {
  image: string
  name: string
  email: string
}

function Request({ image, name, email }: RequestProps) {
  return (
    <div className='request'>
      <img src={image} alt='person' className='request__image' />
      <h3 className='request__name'>{name}</h3>
      <p className='request__email'>{email}</p>
      <button className='request__accept-btn'>Accept</button>
      <button className='request__delete-btn'>Delete</button>
    </div>
  )
}

export default Request