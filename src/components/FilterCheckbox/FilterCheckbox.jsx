import './FilterCheckbox.css'
import { useState } from 'react';

export default function FilterCheckbox({ disabled, toggleButton }) {

  const [isActive, setIsActive] = useState(false);

  function toggleButton() {
    setIsActive(!isActive);
  };

  return (
    <label className='checkbox'>
      <button
        className={`checkbox__button ${isActive ? 'checkbox__button_active' : ''}`}
        onClick={toggleButton}
        disabled={disabled}>
      </button>
      <p className='checkbox__title'>Короткометражки</p>
    </label>
  )
}
