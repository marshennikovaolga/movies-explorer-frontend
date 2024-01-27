import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"

export default function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}

// import { useCallback, useState } from "react"
// import { useEffect } from "react"