import './MoviesCard.css';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function MoviesCard({ data, savedMovies, addMovie, onDelete }) {
    const { pathname } = useLocation();
    const [isLiked, setIsLiked] = useState(false);

    // useEffect(() => {
    //     if (pathname === '/movies')
    //         setIsLiked(savedMovies.some(element => data.id === element.movieId));
    // }, [pathname, savedMovies, data.id, setIsLiked]);

    useEffect(() => {
        if (pathname === '/movies' && savedMovies) { // Добавлено условие savedMovies
            setIsLiked(savedMovies.some(element => data.id === element.movieId));
        }
    }, [pathname, savedMovies, data.id, setIsLiked]);

    function handleSave() {
        if (savedMovies.some(element => data.id === element.movieId)) {
            setIsLiked(true)
            addMovie(data)
        } else {
            setIsLiked(false)
            addMovie(data)
        }
    }

    function setTime(duration) {
        const minutes = duration % 60;
        const hours = Math.floor(duration / 60);
        return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`);
    }

    return (
        <article className='card'>
            <div className='card__container'>
                <div className='card__picture'>
                <Link to={data.trailerLink} target='_blank'>
                <img
                        src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image}
                        alt={data.name}
                        className='card__image'
                    />
                </Link>
                    {pathname === '/movies' ?
                        <button type='button'
                            className={`card__button card__button_save
                            ${isLiked ? 'card__button_save_active' : ''}`}
                            onClick={handleSave}></button>
                        :
                        <button type='button'
                            className={`card__button card__button_delete`}
                            onClick={() => onDelete(data._id)}></button>
                    }
                </div>
                <div className='card__text'>
                    <p className='card__subtitle'>{data.nameRU}</p>
                    <span className='card__duration'>{setTime(data.duration)}</span>
                </div>
            </div>
        </article>
    );
}