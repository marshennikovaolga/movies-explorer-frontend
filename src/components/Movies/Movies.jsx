import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import moviesApi from '../../utils/MoviesApi'
import { useEffect, useState, useCallback } from 'react'

export default function Movies({ addMovie, savedMovies }) {

  const [globalError, setGlobalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
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
      return isChecked ? (searchName && movie.duration <= 40) : searchName;
    }));
  }, []);


  useEffect(() => {
    const storedMovies = localStorage.getItem('allmovies');
    const storedSearch = localStorage.getItem('movie');
    const storedShorts = localStorage.getItem('shorts');

    if (storedMovies && storedSearch && storedShorts) {
        const movies = JSON.parse(storedMovies);
        const search = JSON.parse(storedSearch);
        const isChecked = JSON.parse(storedShorts);

        setGlobalError(false);
        setInitialSearch(false);
        setSearchedMovie(search);
        setIsChecked(isChecked);
        setAllMovies(movies);
        filter(search, isChecked, movies);
    }
}, [filter, isChecked, searchedMovie]);


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
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies);
      const search = JSON.parse(localStorage.movie);
      const isChecked = JSON.parse(localStorage.shorts);
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
        setSearchedMovie={setSearchedMovie}
        initialSearch={initialSearch}
        movies={allMovies}
        filter={filter}
        searchedMovies={searchMovies}
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
