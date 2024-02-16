import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from '../SearchForm/SearchForm'
import { useState, useCallback, useEffect } from 'react'
import moviesApi from "../../utils/MoviesApi";

export default function SavedMovies({ savedMovies, onDelete }) {
  const [searchedMovies, setSearchedMovies] = useState(savedMovies);
  const [isChecked, setIsChecked] = useState(false);

  const filter = useCallback((search, isChecked, movies) => {
    setSearchedMovies(movies.filter((movie) => {
      const searchName = typeof movie.title === 'string' && movie.title.toLowerCase().includes(search.toLowerCase());
      return isChecked ? (searchName && movie.duration <= 40) : searchName;
    }));
  }, []);

  const searchMovies = useCallback((searchQuery) => {
    filter(searchQuery, isChecked,  savedMovies);
  }, [filter, isChecked, savedMovies]);


  useEffect(() => {
    setSearchedMovies(savedMovies);
  }, [savedMovies]);

  return (
    <>
      <SearchForm
        searchMovies={searchMovies}
        movies={savedMovies}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        filter={filter}
        searchedMovies={savedMovies}
      />
      <MoviesCardList
        movies={searchedMovies}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
    </>
  );
}
