import React, { useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function SavedMovies({ savedMovies, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [initialSearch, setInitialSearch] = useState(false);

  const filterSavedMovies = useCallback((search, isChecked, movies) => {
    setSearchedMovie(search);
    setFilteredMovies(movies.filter((movie) => {
      const searchName = typeof search === 'string' && movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return isChecked ? (searchName && movie.duration <= SHORT_MOVIE_DURATION) : searchName;
    }));
  }, []);

  function searchSavedMovies(search) {
    filterSavedMovies(search, isChecked, savedMovies);
  }

  useEffect(() => {
    filterSavedMovies(searchedMovie, isChecked, savedMovies);
  }, [savedMovies, filterSavedMovies, isChecked, searchedMovie]);

  const handleSearchSaveMovies = (searchValue) => {
    searchSavedMovies(searchValue);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setInitialSearch(false);
  }, [savedMovies]);

  return (
    <>
      <SearchForm
        isChecked={isChecked}
        setIsChecked={handleCheckboxChange}
        searchSaveMovies={handleSearchSaveMovies}
        initialSearch={initialSearch}
        movies={savedMovies}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        isLoading={isLoading}
        globalError={globalError}
        initialSearch={initialSearch}
      />
    </>
  );
}

export default SavedMovies;