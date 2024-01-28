import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import movie1 from '../../images/33movie.svg'
import movie2 from '../../images/banksymovie.svg'
import movie3 from '../../images/germanymovie.svg'

export default function MoviesCardList() {
    const movies = [
        { title: '33 слова о дизайне', duration: '1ч 17м', image: movie1 },
        { title: 'В погоне за Бенкси', duration: '1ч 17м', image: movie2 },
        { title: 'Когда я думаю о Германии ночью', duration: '1ч 17м', image: movie3 },
        { title: '33 слова о дизайне', duration: '1ч 17м', image: movie1 },
        { title: 'В погоне за Бенкси', duration: '1ч 17м', image: movie2 },
        { title: 'Когда я думаю о Германии ночью', duration: '1ч 17м', image: movie3 }
    ];

    return (
        <section className='cardlist'>
            <ul className='cardlist__list'>
                {movies.map((movie, index) => (
                    <li key={index} className='cardlist__item'>
                        <MoviesCard movie={movie} />
                    </li>
                ))}
            </ul>
            <button type='button' className='cardlist__showmore'>
                Еще
            </button>
        </section>
    );
}
