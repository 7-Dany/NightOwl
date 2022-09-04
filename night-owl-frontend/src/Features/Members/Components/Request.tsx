import useRequest from '../Hooks/useRequest'

type RequestProps = {
  userId: string
  image: string
  name: string
  email: string
}

function Request({ userId, image, name, email }: RequestProps) {
  const { msg, requestOrder } = useRequest({ userId })
  return (
    <div className='request-container'>
      <div className='request'>
        <img src={image} alt='person' className='request__image' />
        <h3 className='request__name'>{name}</h3>
        <p className='request__email'>{email}</p>
      </div>
      <div className='request-choice'>
        {msg &&
          <p className='request-choice__text'>{msg}</p>
        }
        {!msg &&
          <button className='request-choice__accept-btn'
                  onClick={(event) => requestOrder(event, 'Accept')}
          >
            Accept
          </button>
        }
        {!msg &&
          <button className='request-choice__delete-btn'
                  onClick={(event) => requestOrder(event, 'Delete')}
          >
            Delete
          </button>
        }
      </div>
    </div>
  )
}

export default Request