import { NotificationIcon, PersonImage, PlusIcon, SearchIcon } from '../Assets'

function WorkSpaceHeader() {
  return (
    <div className='header'>
      <div className='search-area'>
        <label htmlFor='search' className='search-area__container'>
          <SearchIcon className={'search-area__icon'} />
          <input type='text' id='search' className='search-area__input' placeholder='Search...' title='Search' />
        </label>
      </div>
      <div className='personal-info'>
        <button className='personal-info__create-new'>
          <PlusIcon className={'personal-info__create-new__icon'} />
          Create New
        </button>
        <NotificationIcon className={'personal-info__notification-icon'} />
        <img src={PersonImage} alt='Person' className={'personal-info__person-img'} />
      </div>
    </div>
  )
}

export default WorkSpaceHeader