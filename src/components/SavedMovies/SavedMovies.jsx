import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';
import { useState, useCallback, useEffect } from 'react';

export default function SavedMovies({
  savedMovies, onDelete, isChecked, setIsChecked
}) {
  const [searchedMovies, setSearchedMovies] = useState(savedMovies);

  const searchMovies = useCallback((searchQuery) => {
    const filteredMovies = savedMovies.filter(savedMovie => {
      const searchName = typeof savedMovie.title === 'string' && savedMovie.title.toLowerCase().includes(savedMovies.title.toLowerCase());
      return searchName;
    });

    setSearchedMovies(filteredMovies);
  }, [savedMovies]);


  useEffect(() => {
    setSearchedMovies(savedMovies);
  }, [savedMovies]);

  return (
    <>
      <SearchForm
        searchMovies={searchMovies}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        movies={savedMovies}
      />
      <MoviesCardList
        movies={searchedMovies}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
    </>
  );
}