import moviesApi from '../../utils/MoviesApi'
import{ useState, useEffect } from 'react'
import { SHORT_MOVIE_DURATION } from '../../utils/constants'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ onDelete, savedMovies }) => {
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

  const filter = (search, isChecked, movies) => {
    setSearchedMovie(search);
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase());
        return isChecked ? (searchName && movie.duration <= SHORT_MOVIE_DURATION) : searchName;
      })
    );
  };

  const searchMovies = (search) => {
    filter(search, isChecked, savedMovies);
    setInitialSearch(false);
  };

  const savedShorts = () => {
    setIsChecked(!isChecked);
    filter(searchedMovie, !isChecked, savedMovies);
  };

  return (
    <>
      <SearchForm
        isChecked={isChecked} 
        setIsChecked={savedShorts}
        // setIsChecked={setIsChecked}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        initialSearch={initialSearch}
        movies={savedMovies}
        filter={filter}
      />
      <MoviesCardList
        movies={savedMovies}
        initialSearch={initialSearch}
        savedMovies={savedMovies}
        onDelete={onDelete}
        isLoading={isLoading}
        globalError={globalError}
      />
    </>
  );
};

export default SavedMovies;


