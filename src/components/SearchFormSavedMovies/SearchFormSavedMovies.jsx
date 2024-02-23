import { useState, useEffect } from 'react';
import './SearchFormSavedMovies.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';

function SearchFormSavedMovies({
  isCheck,
  setIsCheck,
  searchSavedMovies,
  searchedSaveMovie,
  firstSearch,
  movies
}) {
  const [errorSaveMessage, setErrorSaveMessage] = useState('');
  const { values, handleChange, reset, isValidButton } = useFormValidation({
    search: ''
  });

  useEffect(() => {
    reset({ search: searchedSaveMovie });
  }, [searchedSaveMovie, reset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const searchSaveValue = values.search.trim();
    if (isValidButton) {
      searchSavedMovies(searchSaveValue);
      setErrorSaveMessage('');
    } else {
      setErrorSaveMessage('Введите ключевое слово для поиска');
    }
  }

  function toggleCheckbox() {
    setIsCheck(!isCheck);
  }

  useEffect(() => {
    reset({ search: searchedSaveMovie || '' });
  }, [searchedSaveMovie, reset]);

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
          // setIsChecked={toggleCheckbox}
          setIsChecked={setIsCheck}
          showShorts={toggleCheckbox}
          initialSearch={firstSearch}
        />
      </div>
    </section>
  );
}

export default SearchFormSavedMovies;










// import { useEffect, useState } from 'react'
// import useFormValidation from '../../hooks/useFormValidation'
// import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
// import './SearchFormSavedMovies.css'

// export default function SearchFormSavedMovies({
//   initialSearch,
//   isChecked,
//   setIsChecked,
//   searchMovies,
//   searchSavedMovies
// }) {
//   const { values, error, handleChange, reset, isValidButton } = useFormValidation({ search: '' });
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const lastSearch = localStorage.getItem('lastSavedSearch');
//     const lastCheckboxState = localStorage.getItem('lastSavedCheckboxState');
//     if (lastSearch) {
//       reset({ search: lastSearch });
//     }
//   }, [reset]);

//   function onSubmit(evt) {
//     evt.preventDefault();
//     const searchValue = values.search.trim();
//     if (isValidButton) {
//       if (searchSavedMovies) {
//         searchSavedMovies(searchValue);
//       }
//       localStorage.setItem('lastSavedSearch', searchValue);
//       localStorage.setItem('lastSavedCheckboxState', isChecked);
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Нужно ввести ключевое слово');
//       setTimeout(() => {
//         setErrorMessage('');
//       }, 1500);
//     }
//   }

//   function showShorts() {
//     const newShortsState = !isChecked;
//     setIsChecked(newShortsState);
//     localStorage.setItem('lastSavedCheckboxState', newShortsState);
//   }

//   return (
//     <section className="savesearch">
//       <div className="savesearch__container">
//         {errorMessage && <p className='savesearch__error_message'>{errorMessage}</p>}
//         <form className="savesearch__form" noValidate onSubmit={onSubmit}>
//           <input
//             required
//             className='search__input'
//             placeholder="Фильм"
//             name="search"
//             type="text"
//             value={values.search}
//             onChange={handleChange}
//             error={error.text}
//             autoComplete="off"
//           />
//           <button
//             type='submit'
//             className='savesearch__submit'
//           ></button>
//         </form>
//         <FilterCheckbox
//           isChecked={isChecked}
//           setIsChecked={setIsChecked}
//           showShorts={showShorts}
//           initialSearch={initialSearch}
//         />
//       </div>
//     </section>
//   );
// }






// import { useEffect, useState } from 'react';
// import useFormValidation from '../../hooks/useFormValidation';
// import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import './SearchFormSavedMovies.css';

// export default function SearchFormSavedMovies({
//   initialSearch,
//   isChecked,
//   setIsChecked,
//   searchSavedMovies,
// }) {
//   const { values, error, handleChange, reset, isValidButton } = useFormValidation({ search: '' });
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const lastSearch = localStorage.getItem('lastSavedSearch');
//     const lastCheckboxState = localStorage.getItem('lastSavedCheckboxState');
//     if (lastSearch) {
//       reset({ search: lastSearch });
//     }
//   }, [reset]);

//   function onSubmit(evt) {
//     evt.preventDefault();
//     const searchValue = values.search.trim();
//     if (isValidButton) {
//       if (searchSavedMovies) {
//         searchSavedMovies(searchValue);
//       }
//       localStorage.setItem('lastSavedSearch', searchValue);
//       localStorage.setItem('lastSavedCheckboxState', isChecked);
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Нужно ввести ключевое слово');
//       setTimeout(() => {
//         setErrorMessage('');
//       }, 1500);
//     }
//   }

//   function showShorts() {
//     const newShortsState = !isChecked;
//     setIsChecked(newShortsState);
//     localStorage.setItem('lastSavedCheckboxState', newShortsState);
//   }

//   return (
//     <section className="savesearch">
//       <div className="savesearch__container">
//         {errorMessage && <p className='savesearch__error_message'>{errorMessage}</p>}
//         <form className="savesearch__form" noValidate onSubmit={onSubmit}>
//           <input
//             required
//             className='savesearch__input'
//             placeholder="Фильм"
//             name="search"
//             type="text"
//             value={values.search}
//             onChange={handleChange}
//             error={error.text}
//             autoComplete="off"
//           />
//           <button
//             type='submit'
//             className='savesearch__submit'
//           ></button>
//         </form>
//         <FilterCheckbox
//           isChecked={isChecked}
//           setIsChecked={setIsChecked}
//           showShorts={showShorts}
//           initialSearch={initialSearch}
//         />
//       </div>
//     </section>
//   );
// }
