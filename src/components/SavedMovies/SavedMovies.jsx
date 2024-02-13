
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';
import { useState, useCallback, useEffect } from 'react';

export default function SavedMovies({ 
  savedMovies, onDelete, 
}) {
  
  return (
    <>
      <SearchForm

      />
      <MoviesCardList
        movies={savedMovies}
        onDelete={onDelete}
        savedMovies={savedMovies}

        
      />
    </>
  );
}