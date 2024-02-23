import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchFormSavedMovies from '../SearchFormSavedMovies/SearchFormSavedMovies';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function SavedMovies({ onDelete, savedMovies }) {
  const [globError, setGlobError] = useState(false);
  const [isSavedLoading, setIsSavedLoading] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
  const [isCheck, setIsCheck] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  useEffect(() => {
    setIsSavedLoading(true);
    setFilteredSavedMovies(savedMovies);
    setIsSavedLoading(false);
  }, [savedMovies]);

  const searchSavedMovies = () => {
    const filteredSavedMovies = savedMovies.filter(movie => {
      const matchesSearch = movie.nameRU.toLowerCase().includes(searchedMovie.toLowerCase());
      return matchesSearch;
    });
    setFilteredSavedMovies(filteredSavedMovies);
  };

  const toggleShorts = () => {
    setIsCheck(!isCheck);
    const filteredSavedMovies = savedMovies.filter(movie => {
      const matchesSearch = movie.nameRU.toLowerCase().includes(searchedMovie.toLowerCase());
      const matchesDuration = !isCheck ? true : movie.duration <= SHORT_MOVIE_DURATION;
      return matchesSearch && matchesDuration;
    });
    setFilteredSavedMovies(filteredSavedMovies);
  };

  return (
    <>
      <SearchFormSavedMovies
        isChecked={isCheck}
        setIsCheck={toggleShorts}
        searchSavedMovies={searchSavedMovies}
        searchedMovie={searchedMovie}
        firstSearch={firstSearch}
        savedMovies={savedMovies}
      />
      <MoviesCardList
        movies={filteredSavedMovies}
        firstSearch={firstSearch}
        onDelete={onDelete}
        savedMovies={savedMovies}
        isLoading={isSavedLoading}
        globalError={globError}
      />
    </>
  );
};

export default SavedMovies;







// этот код работает как /movies

// import { useEffect, useState, useCallback } from 'react';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import SearchFormSavedMovies from '../SearchFormSavedMovies/SearchFormSavedMovies';
// import { SHORT_MOVIE_DURATION } from '../../utils/constants';
// import moviesApi from '../../utils/MoviesApi';

// function SavedMovies({ onDelete, savedMovies }) {
//   const [globError, setGlobError] = useState(false);
//   const [isSavedLoading, setIsSavedLoading] = useState(false);
//   const [searchedSaveMovie, setSearchedSaveMovie] = useState('');
//   const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
//   const [isCheck, setIsCheck] = useState(false);
//   const [firstSearch, setFirstSearch] = useState(true);
//   const [allSaved, setAllSaved] = useState([]);

//   const SavedFilter = useCallback((search, isCheck, savedMovies) => {
//     setSearchedSaveMovie(search);
//     localStorage.setItem('savedmovie', JSON.stringify(search));
//     localStorage.setItem('savedshorts', JSON.stringify(isCheck));
//     localStorage.setItem('allsavedmovies', JSON.stringify(savedMovies)); 
//     setFilteredSavedMovies(savedMovies.filter((savedmovie) => {
//       const searchName = typeof search === 'string' && savedmovie.nameRU.toLowerCase().includes(search.toLowerCase());
//       return isCheck ? (searchName && savedmovie.duration <= SHORT_MOVIE_DURATION) : searchName;
//     }));
//   }, []);

//   function searchSavedMovies(search) {
//     if (allSaved.length === 0) {
//       setIsSavedLoading(true);
//       moviesApi.getMovies()
//         .then((res) => {
//           setAllSaved(res);
//           setGlobError(false);
//           setIsCheck(false);
//           setFirstSearch(false);
//           SavedFilter(search, isCheck, res);
//         })
//         .catch(err => {
//           setGlobError(true);
//           console.error(`Произошла ошибка при поиске сохраненных фильмов ${err}`);
//         })
//         .finally(() => setIsSavedLoading(false));
//     } else {
//       SavedFilter(search, isCheck, allSaved);
//     }
//   }

//   useEffect(() => {
//     if (localStorage.getItem('allsavedmovies') && localStorage.getItem('savedmovie') && localStorage.getItem('savedshorts')) {
//       const allsavedmovies = JSON.parse(localStorage.getItem('allsavedmovies'));
//       const search = JSON.parse(localStorage.getItem('savedmovie'));
//       const isCheck = JSON.parse(localStorage.getItem('savedshorts'));
//       setGlobError(false);
//       setFirstSearch(false);
//       setSearchedSaveMovie(search);
//       setIsCheck(isCheck);
//       setAllSaved(allsavedmovies);
//       SavedFilter(search, isCheck, allsavedmovies);
//     }
//   }, [SavedFilter]);

//   return (
//     <>
//       <SearchFormSavedMovies
//         isChecked={isCheck}
//         setIsCheck={setIsCheck}
//         searchSavedMovies={searchSavedMovies}
//         searchedMovie={searchedSaveMovie}
//         firstSearch={firstSearch}
//         savedMovies={savedMovies}
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

























// import { useEffect, useState } from 'react';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import SearchFormSavedMovies from '../SearchFormSavedMovies/SearchFormSavedMovies';
// import { SHORT_MOVIE_DURATION } from '../../utils/constants';

// export default function SavedMovies({ onDelete, savedMovies }) {
//   const [globalError, setGlobalError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchedMovie, setSearchedMovie] = useState('');
//   const [filteredMovies, setFilteredMovies] = useState(savedMovies);
//   const [isChecked, setIsChecked] = useState(false);
//   const [initialSearch, setInitialSearch] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     setFilteredMovies(savedMovies);
//     setIsLoading(false);
//   }, [savedMovies]);

//   const searchSavedMovies = () => {
//     const filteredMovies = savedMovies.filter(movie => {
//       const matchesSearch = movie.nameRU.toLowerCase().includes(searchedMovie.toLowerCase());
//       return matchesSearch;
//     });
//     setFilteredMovies(filteredMovies);
//   };

//   const toggleShorts = () => {
//     setIsChecked(!isChecked);
//     const filteredMovies = savedMovies.filter(movie => {
//       const matchesSearch = movie.nameRU.toLowerCase().includes(searchedMovie.toLowerCase());
//       const matchesDuration = !isChecked ? true : movie.duration <= SHORT_MOVIE_DURATION;
//       return matchesSearch && matchesDuration;
//     });
//     setFilteredMovies(filteredMovies);
//   };

//   return (
//     <>
//       <SearchFormSavedMovies
//         isChecked={isChecked}
//         setIsChecked={toggleShorts}
//         searchSavedMovies={searchSavedMovies}
//         searchedMovie={searchedMovie}
//         initialSearch={initialSearch}
//         savedMovies={savedMovies}
//       />
//       <MoviesCardList
//         movies={filteredMovies}
//         initialSearch={initialSearch}
//         onDelete={onDelete}
//         savedMovies={savedMovies}
//         isLoading={isLoading}
//         globalError={globalError}
//       />
//     </>
//   );
// };
