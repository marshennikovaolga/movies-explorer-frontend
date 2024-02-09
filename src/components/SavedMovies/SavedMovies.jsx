import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect, useCallback } from "react";

export default function SavedMovies({savedMovie, onDelete}) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovie)
  const [isChecked, setIsChecked] = useState(false)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [firstSearch, setFirstSearch] = useState(true)

  const filter = useCallback((search, isChecked, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isChecked ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

function searchMovies(search) {
  setFirstSearch(false)
  filter(search, isChecked, savedMovie)
}

useEffect(() => {
  if (savedMovie.length === 0) {
    setFirstSearch(true)
  } else {
    setFirstSearch(false)
  }
  filter(searchedMovie, isChecked, savedMovie)
}, [filter, savedMovie, isChecked, searchedMovie])

  return (
    <>
      <SearchForm
        isChecked={isChecked}
        searchMovies={searchMovies}
        setSearchedMovie={setSearchedMovie}
        movies={savedMovie}
        filter={filter}
        setIsChecked={setIsChecked}
         />
      <MoviesCardList
      firstSearch={firstSearch}
      movies={filteredMovies}
      onDelete={onDelete}
      />
    </>
  )
}