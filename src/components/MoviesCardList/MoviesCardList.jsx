import React, { useEffect, useState } from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'
import {
    MaxScreen, MediumScreen, SmallScreen,
    InitMoreMaxScreen, InitLessMaxScreen, InitMediumScreen,
    InitSmallScreen, StepMaxScreen, StepMediumScreen, StepSmallScreen
} from '../../utils/constants'

export default function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, globalError }) {
    const { pathname } = useLocation()
    const [cardCount, setCardCount] = useState('')
    const currentLength = movies.slice(0, cardCount)

    function calculateCardCount() {
        const cardCounter = { init: InitMoreMaxScreen, step: StepMaxScreen }
        if (window.innerWidth < MaxScreen) {
            cardCounter.init = InitLessMaxScreen
            cardCounter.step = StepMediumScreen
        }
        if (window.innerWidth < MediumScreen) {
            cardCounter.init = InitMediumScreen
            cardCounter.step = StepSmallScreen
        }
        if (window.innerWidth < SmallScreen) {
            cardCounter.init = InitSmallScreen
            cardCounter.step = StepSmallScreen
        }
        return cardCounter;
    }

    useEffect(() => {
        if (pathname === '/movies') {
            setCardCount(calculateCardCount().init)
            function calculateCardCount() {
                if (window.innerWidth >= StepMaxScreen) {
                    setCardCount(calculateCardCount().init)
                }
                if (window.innerWidth < StepMaxScreen) {
                    setCardCount(calculateCardCount().init)
                }
                if (window.innerWidth < MediumScreen) {
                    setCardCount(calculateCardCount().init)
                }
                if (window.innerWidth < SmallScreen) {
                    setCardCount(calculateCardCount().init)
                }
            }
            window.addEventListener('resize', calculateCardCount)
            return () => window.removeEventListener('resize', calculateCardCount)
        }
    }, [pathname, setCardCount, movies])


    const handleShowMore = () => {
        setCardCount(cardCount + calculateCardCount().step);
    };

    return (
        <section className='cardlist'>
            <ul className='cardlist__list'>
                {isLoading ? <Preloader /> :
                    (pathname === '/movies' && currentLength.length !== 0) ?
                        currentLength.map(data => {
                            return (
                                <MoviesCard
                                    key={data.id}
                                    savedMovies={savedMovies}
                                    addMovie={addMovie}
                                    data={data}
                                />
                            )
                        }) : movies.length !== 0 ?
                            movies.map(data => {
                                return (
                                    <MoviesCard
                                        key={data._id}
                                        onDelete={onDelete}
                                        data={data}
                                    />
                                )
                            }) : globalError ?
                                <span className='cardlist__span'>
                                    Во время запроса произошла ошибка.
                                    Возможно, проблема с соединением или сервер недоступен.
                                    Подождите немного и попробуйте ещё раз
                                </span>
                                : pathname === '/movies' ?
                                    <span className='cardlist__span'>
                                        Чтобы увидеть список фильмов выполните поиск
                                    </span> :
                                    <span className='cardlist__span'>
                                        Нет сохранённых фильмов
                                    </span>
                }
            </ul>
            {pathname === '/movies' && <button type='button' className={`cardlist__showmore ${cardCount >= movies.length && 'cardlist__showmore_hidden'}`} onClick={handleShowMore}>Ёще</button>}
        </section>
    )
}