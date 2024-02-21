import { useState, useEffect } from 'react';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/MoviesApi';

export default function SavedMovies({ onDelete, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [globalError, setGlobalError] = useState(false);
  const [initialSearch, setInitialSearch] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        setFilteredMovies(res);
        setGlobalError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при получении сохраненных фильмов:', error);
        setGlobalError(true);
        setIsLoading(false);
      });
  }, []);


  const filterMovies = (search, isChecked) => {
    const filtered = savedMovies.filter(movie => {
      const matchedSearch = movie.nameRU.toLowerCase().includes(search.toLowerCase());
      const matchedDuration = isChecked ? movie.duration <= SHORT_MOVIE_DURATION : true;
      return matchedSearch && matchedDuration;
    });
    setFilteredMovies(filtered);
  };

  const searchMovies = (search) => {
    setSearchedMovie(search);
    filterMovies(search, isChecked);
    setInitialSearch(false);
  };

  const toggleShorts = () => {
    setIsChecked(!isChecked);
    filterMovies(searchedMovie, !isChecked);
  };

  return (
    <>
      <SearchForm
        isChecked={isChecked}
        setIsChecked={toggleShorts}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        initialSearch={initialSearch}
        movies={savedMovies}
        filter={filterMovies}
      />
      <MoviesCardList
        movies={filteredMovies}
        initialSearch={initialSearch}
        savedMovies={savedMovies}
        onDelete={onDelete}
        isLoading={isLoading}
        globalError={globalError}
      />
    </>
  );
};