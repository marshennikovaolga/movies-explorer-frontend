import { useState, useEffect } from 'react'
import './SearchFormSavedMovies.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import useFormValidation from '../../hooks/useFormValidation'

export default function SearchFormSavedMovies({
  isCheck,
  setIsCheck,
  searchSavedMovies,
  firstSearch
}) {

  const [errorSaveMessage, setErrorSaveMessage] = useState('');
  const { values, handleChange, reset, isValidButton } = useFormValidation({
    search: ''
  });

  useEffect(() => {
    const lastSaveSearch = localStorage.getItem('lastSaveSearch');
    const lastSaveCheckboxState = localStorage.getItem('lastSaveCheckboxState');
    if (lastSaveSearch && lastSaveCheckboxState) {
      reset({ search: lastSaveSearch });
      setIsCheck(lastSaveCheckboxState === 'true');
    }
  }, [reset, setIsCheck]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const searchSaveValue = values.search.trim();
    if (isValidButton) {
      searchSavedMovies(searchSaveValue, isCheck);
      localStorage.setItem('lastSaveSearch', searchSaveValue);
      localStorage.setItem('lastSaveCheckboxState', isCheck);
      setErrorSaveMessage('');
    } else {
      setErrorSaveMessage('Нужно ввести ключевое слово');
    }
  }

  function toggleCheckbox() {
    const newSaveShortsState = !isCheck;
    setIsCheck(newSaveShortsState);
    localStorage.setItem('lastSaveCheckboxState', newSaveShortsState);
  }

  return (
    <section className="savesearch">
      <div className="savesearch__container">
        {errorSaveMessage && (
          <p className="savesearch__error_message">{errorSaveMessage}</p>
        )}
        <form className="savesearch__form" noValidate onSubmit={handleSubmit}>
          <input
            required
            className="savesearch__input"
            placeholder="Фильм"
            name="search"
            type="text"
            value={values.search}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="submit" className="savesearch__submit"></button>
        </form>
        <FilterCheckbox
          isChecked={isCheck}
          showShorts={toggleCheckbox}
          setIsChecked={setIsCheck}
          initialSearch={firstSearch}
        />
      </div>
    </section>
  );
}