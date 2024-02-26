import { useEffect, useState } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useLocation } from 'react-router-dom'
import './SearchForm.css'

export default function SearchForm({
  initialSearch,
  isChecked,
  setIsChecked,
  searchMovies,
  searchSaveMovies
}) {

  const location = useLocation();
  const { values, error, handleChange, reset } = useFormValidation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const lastSearch = localStorage.getItem(`${location.pathname}-lastsearch`);
    const lastCheckboxState = localStorage.getItem(`${location.pathname}-lastCheckboxState`);
    if (lastSearch) {
      reset({ search: lastSearch, lastCheckboxState });
    }
  }, [location.pathname, reset]);

  function onSubmit(event) {
    event.preventDefault();
    const searchValue = values.search.trim();
    if (searchValue !== '') {
      if (searchMovies) {
        searchMovies(searchValue);
      } else if (searchSaveMovies) {
        searchSaveMovies(searchValue);
      }
      localStorage.setItem(`${location.pathname}-lastsearch`, searchValue);
      localStorage.setItem(`${location.pathname}-lastCheckboxState`, isChecked);
      setErrorMessage('');
    } else {
      setErrorMessage('Нужно ввести ключевое слово');
      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
    }
  }

  function showShorts() {
    const newShortsState = !isChecked;
    setIsChecked(newShortsState);
    localStorage.setItem(`${location.pathname}-lastCheckboxState`, newShortsState);
  }

  return (
    <section className="search">
      <div className="search__container">
        {errorMessage && <p className='search__error_message'>{errorMessage}</p>}
        <form className="search__form" noValidate onSubmit={onSubmit}>
          <input
            required
            className='search__input'
            placeholder="Фильм"
            name="search"
            type="text"
            value={values.search || ''}
            onChange={handleChange}
            error={error.text}
            autoComplete="off"
          />
          <button
            type='submit'
            className='search__submit'
          ></button>
        </form>
        <FilterCheckbox
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          showShorts={showShorts}
          initialSearch={initialSearch}
        />
      </div>
    </section>
  );
}