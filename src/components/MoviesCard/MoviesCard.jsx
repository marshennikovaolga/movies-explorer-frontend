import './MoviesCard.css';
import { useLocation } from 'react-router-dom'

export default function MoviesCard({ movie }) {
    const { pathname } = useLocation();

    return (
        <article className='card'>
            <div className='card__container'>
                <div className='card__picture'>
                    <img className='card__image' alt='movie cover' src={movie.image} />
                    {pathname === '/movies' ? (
                        <button type='button' className='card__button card__button_save'></button>
                    ) : (
                        <button type='button' className='card__button card__button_delete'></button>
                    )}
                </div>
                <div className='card__text'>
                    <p className='card__subtitle'>{movie.title}</p>
                    <span className='card__duration'>{movie.duration}</span>
                </div>
            </div>
        </article>
    );
}