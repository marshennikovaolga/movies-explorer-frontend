
import React, { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchFormSavedMovies.css';
import useFormValidation from '../../hooks/useFormValidation';


export default function SearchFormSavedMovies({
  firstSearch,
  isCheck,
  setIsCheck,
  searchSavedMovies,
}) {
  
  const [errorSaveMessage, setErrorSaveMessage] = useState('');
  const { values, error, handleChange, reset, isValidButton } = useFormValidation({ search: '' });

  useEffect(() => {
    const lastSaveSearch = localStorage.getItem('lastSaveSearch');
    const lastCheckboxSaveState = localStorage.getItem('lastCheckboxSaveState');
    if (lastSaveSearch && lastCheckboxSaveState ) {
      reset({ search: lastSaveSearch, lastCheckboxSaveState });
    }
  }, [reset]);

  function onSubmit(evt) {
    evt.preventDefault();
    const searchSaveValue = values.search.trim();
    if (isValidButton) {
      searchSavedMovies(searchSaveValue)
      localStorage.setItem('lastSaveSearch', searchSaveValue)
      localStorage.setItem('lastCheckboxSaveState', isCheck)
      setErrorSaveMessage('');
    } else {
      setErrorSaveMessage('Нужно ввести ключевое слово');
      setTimeout(() => {
        setErrorSaveMessage('');
      }, 1500);
    }
  }

  function showSavedShorts() {
    const newSaveShortsState = !isCheck;
    setIsCheck(newSaveShortsState);
    localStorage.setItem('lastCheckboxSaveState', newSaveShortsState);
  };

  return (
    <section className="savesearch">
      <div className="savesearch__container">
        {errorSaveMessage && <p className='savesearch__error_message'>{errorSaveMessage}</p>}
        <form className="savesearch__form" noValidate onSubmit={onSubmit}>
          <input
            required
            className='savesearch__input'
            placeholder="Фильм"
            name="search"
            type="text"
            value={values.search}
            onChange={handleChange}
            autoComplete="off"
          />
          <button
            type='submit'
            className='savesearch__submit'
          ></button>
        </form>
        <FilterCheckbox
          isChecked={isCheck}
          setIsChecked={showSavedShorts}
          showShorts={showSavedShorts}
          initialSearch={firstSearch}
        />
      </div>
    </section>
  );
}







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
