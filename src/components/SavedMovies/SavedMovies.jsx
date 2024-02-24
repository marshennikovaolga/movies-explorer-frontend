import React, { useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFormSavedMovies from '../SearchFormSavedMovies/SearchFormSavedMovies';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

export default function SavedMovies({ onDelete, savedMovies }) {
  const [searchedSaveMovie, setSearchedSaveMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [firstSearch, setFirstSearch] = useState(true);
  const [globalError, setGlobalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filterSavedMovies = useCallback((search, isChecked, movies) => {
    setSearchedSaveMovie(search);
    setIsCheck(isChecked);
    if (movies) {
      const filteredMovies = savedMovies.filter(movie => {
        const searchName =
          typeof search === 'string' &&
          movie.nameRU.toLowerCase().includes(search.toLowerCase());
        const durationCheck = !isChecked || movie.duration <= SHORT_MOVIE_DURATION;
        return searchName && durationCheck;
      });
      setFilteredSavedMovies(filteredMovies);
      setGlobalError(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    filterSavedMovies(searchedSaveMovie, isCheck, savedMovies);
  }, [searchedSaveMovie, isCheck, savedMovies, filterSavedMovies]);

  return (
    <>
      <SearchFormSavedMovies
        savedMovies={filteredSavedMovies}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        searchSavedMovies={filterSavedMovies}
        searchedSaveMovie={searchedSaveMovie}
        firstSearch={firstSearch}
      />
      <MoviesCardList
        movies={filteredSavedMovies} // - фильмы в результате поиска
        onDelete={onDelete}
        savedMovies={savedMovies}
        initialSearch={firstSearch}
        globalError={globalError}
        isLoading={isLoading}
      />
    </>
  );
}
