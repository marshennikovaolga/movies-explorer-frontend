import './SearchForm.css'
import useFormValidation from '../../hooks/useFormValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function SearchForm(
  { movies, filter, initialSearch, savedMovies, isChecked, setIsChecked, searchMovies }) {

  const { pathname } = useLocation();
  const { values, error, handleChange, reset } = useFormValidation()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const storedSearchData = JSON.parse(localStorage.getItem('searchData'));
    if (storedSearchData) {
      reset({ search: storedSearchData.search });
      setIsChecked(storedSearchData.isChecked);
    } else {
      reset({ search: initialSearch });
      setIsChecked(false);
    }
  }, [reset, initialSearch, setIsChecked]);
  
  function onSubmit(evt) {
    evt.preventDefault();
    const searchValue = evt.target.search.value.trim();
    if (searchValue !== '') {
      searchMovies(searchValue);
      localStorage.setItem('searchData', JSON.stringify({ search: searchValue, isChecked }));
      setErrorMessage('');
    } else {
      setErrorMessage('Нужно ввести ключевое слово');
    }
  }

  function showShorts() {
    if (isChecked) {
      setIsChecked(false)
      filter(values.search, false, movies)
    } else {
      setIsChecked(true)
      filter(values.search, true, movies)
    }
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
            disabled={savedMovies && savedMovies.length === 0}
          />
          <button
            type='submit'
            className={`search__submit ${savedMovies ? (pathname === '/saved-movies' && savedMovies.length === 0) && 'search__submit_disabled' : ''}`}
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