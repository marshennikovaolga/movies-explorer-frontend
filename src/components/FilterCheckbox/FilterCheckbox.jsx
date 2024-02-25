import './FilterCheckbox.css'
import checkbox from '../../images/shorts-inactive.svg'
import activecheckbox from '../../images/shorts-active.svg'

export default function FilterCheckbox({ isChecked, setIsChecked, initialSearch }) {

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={`checkbox ${initialSearch && 'checkbox_disabled'}`}>
      <input 
        type='checkbox'
        onChange={handleChange}
        className='checkbox__search'
        disabled={initialSearch}
        checked={isChecked || false} 
        // checked={isChecked}
      />
      <img
        alt='поиск короткометражек'
        src={isChecked ? activecheckbox : checkbox}
        className={`checkbox__image ${isChecked ? 'checkbox__image_active' : ''}`}
      />
      <p className='checkbox__title'>Короткометражки</p>
    </label>
  );
}
