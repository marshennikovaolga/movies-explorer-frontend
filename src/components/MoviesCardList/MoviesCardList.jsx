import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {

    return (
        <section className='cardlist'>
            <ul className='cardlist__list'>
                <MoviesCard
                />
            </ul>
            <button type='button' className='cardlist__showmore'>Ёще</button>
        </section>
    )
}