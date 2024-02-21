import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import moviesApi from '../../utils/MoviesApi'
import { useEffect, useState, useCallback } from 'react'
import { SHORT_MOVIE_DURATION } from "../../utils/constants"

export default function Movies({ addMovie, savedMovies }) {

  const [globalError, setGlobalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [initialSearch, setInitialSearch] = useState(true);

  const filter = useCallback((search, isChecked, movies) => {
    setSearchedMovie(search);
    localStorage.setItem('movie', JSON.stringify(search));
    localStorage.setItem('shorts', JSON.stringify(isChecked));
    localStorage.setItem('allmovies', JSON.stringify(movies)); 
    setFilteredMovies(movies.filter((movie) => {
      const searchName = typeof search === 'string' && movie.nameRU.toLowerCase().includes(search.toLowerCase());
      return isChecked ? (searchName && movie.duration <= SHORT_MOVIE_DURATION) : searchName;
    }));
  }, []);

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((res) => {
          setAllMovies(res);
          setGlobalError(false);
          setIsChecked(false);
          setInitialSearch(false);
          filter(search, isChecked, res);
        })
        .catch(err => {
          setGlobalError(true);
          console.error(`Произошла ошибка при поиске фильмов ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(search, isChecked, allMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('allmovies') && localStorage.getItem('movie') && localStorage.getItem('shorts')) {
      const movies = JSON.parse(localStorage.getItem('allmovies'));
      const search = JSON.parse(localStorage.getItem('movie'));
      const isChecked = JSON.parse(localStorage.getItem('shorts'));
      setGlobalError(false);
      setInitialSearch(false);
      setSearchedMovie(search);
      setIsChecked(isChecked);
      setAllMovies(movies);
      filter(search, isChecked, movies);
    }
  }, [filter]);

  return (
    <>
      <SearchForm
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        initialSearch={initialSearch}
        movies={allMovies}
        filter={filter}
      />
      <MoviesCardList
        movies={filteredMovies}
        initialSearch={initialSearch}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        globalError={globalError}
      />
    </>
  );
}