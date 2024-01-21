import './MoviesCard.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function MoviesCard({ data, addMovie, onDelete, savedMovies }) {
    const { pathname } = useLocation()
    const [isSaved, setIsSaved] = useState(false)


const convertTime = (duration) => {
    const minutes = duration % 60
    const hours = Math.floor(duration / 60)
    return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
}

    useEffect(() => {
        if (pathname === '/movies')
        setIsSaved(savedMovies.some(element => data.id === element.movieId))
    }, [pathname, savedMovies, data.id, setIsSaved])


    function handleSaveClick() {
        if (savedMovies.some(element => data.id === element.movieId)) {
            setIsSaved(false)
            addMovie(data)
        } else {
            setIsSaved(true)
            addMovie(data)
        }
    }

    return (
        <li className='card'>
            <article>
                <div className='card__container'>
                <Link to={data.trailerLink} target='_blank'>
                    <img className='card__image' src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} />
                </Link>
                {pathname === '/movies' ? (
                        <button type='button' className={`card__save ${isSaved ? 'card__save_active' : ''}`} onClick={handleSaveClick}></button>
                    ) : (
                        <button type='button' className='card_delete' onClick={() => onDelete(data._id)}></button>
                    )}
                    <div className='card__text'>
                        <p className='card__subtitle'>{data.nameRU}</p>
                        <span className='card__duration'>{convertTime(data.duration)}</span>
                    </div>
                </div>
            </article>
        </li>
    )
}
