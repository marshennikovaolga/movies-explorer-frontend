import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import useFormValidation from '../../hooks/useFormValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

export default function SearchForm({
  movies,
  filter,
  initialSearch,
  isChecked,
  setIsChecked,
  searchMovies,
  searchedMovie,
  savedMovies
}) {
  const { pathname } = useLocation()
  const { values, error, handleChange, reset } = useFormValidation()
  const [errorMessage, setErrorMessage] = useState('')
  const [inputEmpty, setInputEmpty] = useState(true)
  const [searchResults, setSearchResults] = useState([])

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

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovies.length === 0)) {
      reset({ search: '' });
    } else {
      reset({ search: searchedMovie });
    }
  }, [searchedMovie, reset, pathname, savedMovies]);

  function onSubmit(evt) {
    evt.preventDefault();
    const searchValue = evt.target.search.value.trim();
    if (searchValue !== '') {
      searchMovies(searchValue);
      const results = searchMovies(searchValue);
      setSearchResults(results);
      localStorage.setItem('searchResults', JSON.stringify(results));
      localStorage.setItem('searchData', JSON.stringify({ search: searchValue, isChecked }));
      setErrorMessage('');
    } else {
      setErrorMessage('Нужно ввести ключевое слово');
      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
    }
  }

  function showShorts() {
    if (isChecked) {
      setIsChecked(false);
      filter(values.search, false, movies);
    } else {
      setIsChecked(true);
      filter(values.search, true, movies);
    }
  }

  function handleInputChange(event) {
    const inputValue = event.target.value;
    setInputEmpty(inputValue === '');
    handleChange(event);
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
            onChange={handleInputChange}
            error={error.text}
            autoComplete="off"
          />
          <button
            type='submit'
            className={`search__submit ${inputEmpty ? 'search__submit_inactive' : ''}`}
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
