import './MoviesCard.css';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function MoviesCard({ data, savedMovies, addMovie, onDelete }) {
    const { pathname } = useLocation();
    const [click, setClick] = useState(false);

    function setTime(duration) {
        const minutes = duration % 60;
        const hours = Math.floor(duration / 60);
        return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
    }

    useEffect(() => {
        if (pathname === '/movies')
            setClick(savedMovies.some(element => data.id === element.movieId))
    }, [savedMovies, data.id, setClick, pathname])

    function onClick() {
        if (savedMovies.some(element => data.id === element.movieId)) {
            setClick(true)
            addMovie(data)
        } else {
            setClick(false)
            addMovie(data)
        }
    }

    return (
        <article className='card'>
            <div className='card__container'>
                <div className='card__picture'>
                    <img src={pathname === '/movies' ?
                        `https://api.nomoreparties.co${data.image.url}` : data.image}
                        alt={data.name} className='card__image' />
                    {pathname === '/movies' ? (
                        <button type='button' className='card__button card__button_save'
                            onClick={() => onClick}></button>
                    ) : (
                        <button type='button' className='card__button card__button_delete'
                            onClick={() => onDelete(data._id)}></button>
                    )}
                </div>
                <div className='card__text'>
                    <p className='card__subtitle'>{data.nameRU}</p>
                    <span className='card__duration'>{data.duration}</span>
                </div>
            </div>
        </article>
    );
}