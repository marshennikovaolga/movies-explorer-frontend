import React, { useEffect, useState } from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'
import {
    MAX_SCREEN_WIDTH, SMALL_SCREEN_WIDTH,
    INIT_MAX_SCREEN, INIT_MEDIUM_SCREEN, INIT_SMALL_SCREEN,
    STEP_MAX_SCREEN, STEP_SMALL_SCREEN
} from '../../utils/constants';
import lodash from 'lodash';

export default function MoviesCardList({ movies, savedMovies, onDelete, addMovie,
    isLoading, globalError, initialSearch }) {
    const { pathname } = useLocation()
    const [cardCount, setCardCount] = useState(0);
    const currentLength = movies.slice(0, cardCount)

    useEffect(() => {
        if (pathname === '/movies' || pathname === '/saved-movies') {
            const cardCounter = calculateCardCount();
            setCardCount(cardCounter.init);

            const handleResize = lodash.debounce(() => {
                const newCardCounter = calculateCardCount();
                setCardCount(newCardCounter.init);
            }, 300);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [pathname, movies, savedMovies]);

    function calculateCardCount() {
        let cardCounter = { init: INIT_MAX_SCREEN, step: STEP_MAX_SCREEN };
        if (window.innerWidth > MAX_SCREEN_WIDTH) {
            cardCounter.init = INIT_MAX_SCREEN
            cardCounter.step = STEP_MAX_SCREEN
        }
        if (window.innerWidth < MAX_SCREEN_WIDTH) {
            cardCounter.init = INIT_MEDIUM_SCREEN
            cardCounter.step = STEP_SMALL_SCREEN
        }
        if (window.innerWidth <= SMALL_SCREEN_WIDTH) {
            cardCounter.init = INIT_SMALL_SCREEN
            cardCounter.step = STEP_SMALL_SCREEN
        }
        return cardCounter
    }

    const handleShowMore = () => {
        let newCardCount = cardCount + calculateCardCount().step;
        setCardCount(newCardCount);
    };


    console.log('movies:', movies);
    console.log('savedMovies:', savedMovies);

    return (
        <section className='cardlist'>
            <ul className='cardlist__list'>
                {isLoading ? <Preloader /> :
                    (pathname === '/movies' && currentLength.length !== 0) ?
                        currentLength.map(data => {
                            return (
                                <MoviesCard
                                    key={data.id}
                                    movies={movies}
                                    savedMovies={savedMovies}
                                    addMovie={addMovie}
                                    data={data}
                                    isLiked={true}
                                />
                            )
                        }) : movies.length !== 0 && pathname === '/saved-movies' ?
                            savedMovies.length !== 0 ? savedMovies.map(data => {
                                const isLiked = movies.some(movie => movie.movieId === data.id)
                                return (
                                    <MoviesCard
                                        key={data.id}
                                        savedMovies={savedMovies}
                                        onDelete={onDelete}
                                        data={data}
                                        isLiked={isLiked}
                                    />
                                )
                            }) : (
                                <span className='cardlist__span'>
                                    Нет сохранённых фильмов
                                </span>
                            ) : globalError ?
                                <span className='cardlist__span'>
                                    Во время запроса произошла ошибка.
                                    Возможно, проблема с соединением или сервер недоступен.
                                    Подождите немного и попробуйте ещё раз
                                </span>
                                : !initialSearch ?
                                    <span className='cardlist__span' >
                                        Ничего не найдено
                                    </span>
                                    : pathname === '/movies' ?
                                        <span className='cardlist__span'>
                                            Чтобы увидеть список фильмов, выполните поиск
                                        </span> :
                                        <span className='cardlist__span'>
                                            Ничего не найдено
                                        </span>
                }
            </ul>
            {pathname === '/movies' &&
                <button type='button'
                    className={`cardlist__showmore ${cardCount >= movies.length && 'cardlist__showmore_hidden'}`}
                    onClick={handleShowMore}>Ёще</button>
            }
        </section>
    )
}