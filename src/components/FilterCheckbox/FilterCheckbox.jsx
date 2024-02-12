import './FilterCheckbox.css'
import checkbox from '../../images/shorts-inactive.svg'
import activecheckbox from '../../images/shorts-active.svg'

export default function FilterCheckbox({ isChecked, showShorts, initialSearch }) {
  return (
    <label
      className={`checkbox ${initialSearch && 'checkbox_disabled'}`}>
      <input type='checkbox'
      onChange={() => showShorts()}
      className='checkbox__search'
        disabled={initialSearch}
       />
       <img
        alt='поиск короткометражек'
        src={isChecked ? activecheckbox : checkbox}
        className={`checkbox__image ${isChecked ? 'checkbox__image_active' : ''}`}
      />
      <p className='checkbox__title'>Короткометражки</p>
    </label>
  )
}
