import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList(
    { globalError, movies, onDelete, addMovie, savedMovies, isLoading }) {

    const { pathname } = useLocation()
    const [cardCount, setCardCount] = useState(calculateCardCount())
    const [showMoreButton, setShowMoreButton] = useState(true)

    function calculateCardCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 800) {
            return 4;
        } else if (screenWidth >= 525) {
            return 4;
        } else {
            return 5;
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setCardCount(calculateCardCount());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (movies.length <= cardCount) {
            setShowMoreButton(false);
        } else {
            setShowMoreButton(true);
        }
    }, [movies, cardCount]);

    const handleShowMore = () => {
        setCardCount(prevCount => prevCount + 4);
    };

    return (
        <section className='cardlist'>
            {isLoading ? (
                <Preloader />
            ) : globalError ? (
                <p className="cardlist__global-error">
                    Во время запроса произошла ошибка.
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз
                </p>
            ) : movies.length === 0 ? (
                <p className="cardlist__notfound">Ничего не найдено</p>
            ) : (
                <>
                    <ul className='cardlist__list'>
                        {movies.slice(0, cardCount).map(movie => (
                            <li key={movie._id} className='cardlist__item'>
                                <MoviesCard
                                    data={movie}
                                    savedMovies={savedMovies}
                                    addMovie={addMovie}
                                    onDelete={onDelete}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleShowMore} type='button' className='cardlist__showmore'>Ещё</button>
                </>
            )}
        </section>
    )
}
