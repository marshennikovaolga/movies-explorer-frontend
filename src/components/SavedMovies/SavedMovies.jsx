// import MoviesCardList from "../MoviesCardList/MoviesCardList"
// import SearchForm from '../SearchForm/SearchForm'
// import { useState, useCallback, useEffect } from 'react'
// import { SHORT_MOVIE_DURATION } from "../../utils/constants"
// import moviesApi from '../../utils/MoviesApi'

// export default function SavedMovies({ savedMovies, onDelete, movies }) {
//   const [globalError, setGlobalError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [searchedMovie, setSearchedMovie] = useState('');
//   const [isChecked, setIsChecked] = useState(false);
//   const [initialSearch, setInitialSearch] = useState(true);

//   const filter = useCallback((search, isChecked, movies) => {
//     setSearchedMovie(search);
//     setFilteredMovies(movies.filter((movie) => {
//       const searchName = typeof search === 'string' && movie.nameRU.toLowerCase().includes(search.toLowerCase());
//       return isChecked ? searchName && movie.duration <= SHORT_MOVIE_DURATION : searchName;
//     }));
//   }, []);

//   function searchMovies(search) {
//     filter(search, isChecked, savedMovies);
//   }

//   function searchMovies(search) {
//     if (savedMovies.length === 0) {
//       setIsLoading(true);
//       moviesApi.getMovies()
//         .then((res) => {
//           setFilteredMovies(res);
//           setGlobalError(false);
//           setIsChecked(false);
//           setInitialSearch(false);
//           filter(search, isChecked, res);
//         })
//         .catch(err => {
//           setGlobalError(true);
//           console.error(`Произошла ошибка при поиске фильмов ${err}`);
//         })
//         .finally(() => setIsLoading(false));
//     } else {
//       filter(search, isChecked, filteredMovies);
//     }
//   }

//   return (
//     <>
//       <SearchForm
//         isChecked={isChecked}
//         setIsChecked={setIsChecked}
//         searchMovies={searchMovies}
//         searchedMovie={searchedMovie}
//         initialSearch={initialSearch}
//         savedMovies={savedMovies}
//         filter={filter}
//         movies={filteredMovies}
//       />
//       <MoviesCardList
//         movies={filteredMovies}
//         savedMovies={savedMovies}
//         initialSearch={initialSearch}
//         onDelete={onDelete}
//         isLoading={isLoading}
//       />
//     </>
//   );
// }


import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from '../SearchForm/SearchForm'
import { useState, useCallback, useEffect } from 'react'
import { SHORT_MOVIE_DURATION } from "../../utils/constants"

export default function SavedMovies({ savedMovies, onDelete }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [initialSearch, setInitialSearch] = useState(true)

  const filter = useCallback((search, isChecked, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = typeof movie.title === 'string' && movie.title.toLowerCase().includes(search.toLowerCase());
      return isChecked ? (searchName && movie.duration <= SHORT_MOVIE_DURATION) : searchName;
    }));
  }, []);

  function searchMovies(search) {
    setInitialSearch(false)
    filter(search, isChecked, savedMovies)
  }

  useEffect(() => {
    setSearchedMovie(savedMovies);
  }, [savedMovies]);


  return (
    <>
      <SearchForm
        searchMovies={searchMovies}
        movies={savedMovies}
        savedMovies={savedMovies}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        filter={filter}
        initialSearch={initialSearch}
        searchedMovie={searchedMovie}
      />
      <MoviesCardList
        movies={savedMovies}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
    </>
  );
}