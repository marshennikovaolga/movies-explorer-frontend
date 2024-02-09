import './MoviesCard.css';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


export default function MoviesCard({ data, savedMovies, addMovie, onDelete }) {
    const { pathname } = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(savedMovies.some(element => data.id === element.movieId));
    }, [savedMovies, data.id]);

    function setTime(duration) {
        const minutes = duration % 60;
        const hours = Math.floor(duration / 60);
        return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`);
    }

    function handleSaveOrDelete() {
        if (isSaved) {
            onDelete(data._id);
        } else {
            addMovie(data);
        }
        setIsSaved(!isSaved);
    }

    return (
        <article className='card'>
            <div className='card__container'>
                <div className='card__picture'>
                    <img 
                        src={pathname === '/movies' ?
                            `https://api.nomoreparties.co${data.image.url}` : data.image}
                        alt={data.name} 
                        className='card__image' 
                    />
                    <button 
                        type='button' 
                        className={`card__button ${pathname === '/movies' ? 'card__button_save' : 'card__button_delete'}`}
                        onClick={handleSaveOrDelete}
                    ></button>
                </div>
                <div className='card__text'>
                    <p className='card__subtitle'>{data.nameRU}</p>
                    <span className='card__duration'>{setTime(data.duration)}</span>
                </div>
            </div>
        </article>
    );
}