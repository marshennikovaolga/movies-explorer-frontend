import './SearchForm.css'
import useFormValidation from '../../hooks/useFormValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function SearchForm(
  { movies, filter, initialSearch, isChecked, setIsChecked, searchMovies, savedMovies }) {

  const { pathname } = useLocation();
  const { values, error, handleChange, reset } = useFormValidation()
  const [errorMessage, setErrorMessage] = useState('')
  const [inputEmpty, setInputEmpty] = useState(true);

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
      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
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