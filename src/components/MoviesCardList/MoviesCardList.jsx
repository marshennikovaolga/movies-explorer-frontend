import './MoviesCardList.css'
import { useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'
import lodash from 'lodash'
import {
    MAX_SCREEN_WIDTH, SMALL_SCREEN_WIDTH,
    INIT_MAX_SCREEN, INIT_MEDIUM_SCREEN, INIT_SMALL_SCREEN,
    STEP_MAX_SCREEN, STEP_SMALL_SCREEN
} from '../../utils/constants'

export default function MoviesCardList({ movies, savedMovies, onDelete, addMovie,
    isLoading, globalError, initialSearch }) {
    const { pathname } = useLocation()
    const [cardCount, setCardCount] = useState(0);

    const currentLength = movies ? movies.slice(0, cardCount) : [];

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

    return (
        <section className='cardlist'>
            <ul className='cardlist__list'>
                {isLoading ? (
                    <Preloader />
                ) : (
                    (globalError) ? (
                        <span className='cardlist__span'>
                            Во время запроса произошла ошибка.
                            Возможно, проблема с соединением или сервер недоступен.
                            Подождите немного и попробуйте ещё раз
                        </span>
                    ) : (
                        (pathname === '/movies' && initialSearch) ? (
                            <span className='cardlist__span'>
                                Чтобы увидеть список фильмов, выполните поиск
                            </span>
                        ) : (
                            (pathname === '/saved-movies' && initialSearch) ? (
                                <span className='cardlist__span'>
                                    Нет сохранённых фильмов
                                </span>
                            ) : (
                                (pathname === '/movies' && currentLength.length === 0) || (pathname === '/saved-movies' && currentLength.length === 0) ? (
                                    <span className='cardlist__span'>
                                        Ничего не найдено
                                    </span>
                                ) : (
                                    currentLength.map(data => (
                                        <MoviesCard
                                            key={pathname === '/movies' ? data.id : data._id}
                                            movies={movies}
                                            savedMovies={savedMovies}
                                            addMovie={addMovie}
                                            onDelete={onDelete}
                                            data={data}
                                        />
                                    ))
                                )
                            )
                        )
                    )
                )}
            </ul>
            {pathname === '/movies' &&
                <button type='button'
                    className={`cardlist__showmore ${cardCount >= movies.length && 'cardlist__showmore_hidden'}`}
                    onClick={handleShowMore}>Ёще</button>
            }
        </section>
    )
}