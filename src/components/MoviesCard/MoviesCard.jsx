import './MoviesCard.css'
import { useLocation } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'

export default function MoviesCard() {
    const { pathname } = useLocation()
    // const [isSaved, setIsSaved] = useState(false)
    return (
        <li className='card'>
            <article>
                <div className='card__container'>
                    <div className='card__picture'>
                        <img className='card__image' />
                        {pathname === '/movies' ? (
                            <button type='button' className='card__button card__button_save'></button>
                        ) : (
                            <button type='button' className='card__button card__button_delete'></button>
                        )}
                    </div>
                    <div className='card__text'>
                        <p className='card__subtitle'>33 слова о дизайне</p>
                        <span className='card__duration'>1ч 17м</span>
                    </div>
                </div>
            </article>
        </li>
    )
}