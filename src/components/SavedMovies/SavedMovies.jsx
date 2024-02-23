import React, { useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFormSavedMovies from '../SearchFormSavedMovies/SearchFormSavedMovies';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

export default function SavedMovies({ onDelete, savedMovies, movies }) {
  const [searchedSaveMovie, setSearchedSaveMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [firstSearch, setFirstSearch] = useState(true);

  const filterSavedMovies = useCallback((search, isChecked, movies) => {
    setSearchedSaveMovie(search);
    setIsCheck(isChecked);
    if (movies) {
      setFilteredSavedMovies(
        movies.filter((movie) => {
          const searchName = typeof search === 'string' && movie.nameRU.toLowerCase().includes(search.toLowerCase());
          const durationCheck = !isChecked || movie.duration <= SHORT_MOVIE_DURATION;
          return searchName && durationCheck;
        })
      );
    }
  }, []);

  useEffect(() => {
    filterSavedMovies(searchedSaveMovie, isCheck, savedMovies);
  }, [savedMovies, searchedSaveMovie, isCheck, filterSavedMovies]);

  return (
    <>
      <SearchFormSavedMovies
        savedMovies={filteredSavedMovies}
        movies={movies}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        searchSavedMovies={filterSavedMovies}
        searchedSaveMovie={searchedSaveMovie}
        firstSearch={firstSearch}
      />
      <MoviesCardList
        movies={filteredSavedMovies}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
    </>
  );
}

//         // savedMovies={savedMovies}
//         // movies={filteredSavedMovies}












// import { useEffect, useState } from 'react';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import SearchFormSavedMovies from '../SearchFormSavedMovies/SearchFormSavedMovies';
// import { SHORT_MOVIE_DURATION } from '../../utils/constants';

// function SavedMovies({ onDelete, savedMovies }) {
//   const [globError, setGlobError] = useState(false);
//   const [isSavedLoading, setIsSavedLoading] = useState(false);
//   const [searchedSaveMovie, setSearchedSaveMovie] = useState('');
//   const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
//   const [isCheck, setIsCheck] = useState(false);
//   const [firstSearch, setFirstSearch] = useState(true);

//   const searchSavedMovies = () => {
//     const filteredSavedMovies = savedMovies.filter(movie => {
//       const matchesSearch = movie.nameRU.toLowerCase().includes(searchedSaveMovie.toLowerCase());
//       return matchesSearch;
//     });
//     setFilteredSavedMovies(filteredSavedMovies);
//   };

//   useEffect(() => {
//     setIsSavedLoading(true);
//     setFilteredSavedMovies(savedMovies);
//     setIsSavedLoading(false);
//   }, [savedMovies]);

//   const toggleShorts = () => {
//     setIsCheck(!isCheck);
//     const filteredSavedMovies = savedMovies.filter(movie => {
//       const matchesSearch = movie.nameRU.toLowerCase().includes(searchedSaveMovie.toLowerCase());
//       const matchesDuration = !isCheck ? true : movie.duration <= SHORT_MOVIE_DURATION;
//       return matchesSearch && matchesDuration;
//     });
//     setFilteredSavedMovies(filteredSavedMovies);
//   };

//   return (
//     <>
//       <SearchFormSavedMovies
//         isCheck={isCheck}
//         setIsCheck={toggleShorts}
//         searchSavedMovies={searchSavedMovies}
//         searchedSaveMovie={searchedSaveMovie}
//         firstSearch={firstSearch}
//       />
//       <MoviesCardList
//         movies={filteredSavedMovies}
//         firstSearch={firstSearch}
//         onDelete={onDelete}
//         savedMovies={savedMovies}
//         isLoading={isSavedLoading}
//         globalError={globError}
//       />
//     </>
//   );
// };

// export default SavedMovies;
