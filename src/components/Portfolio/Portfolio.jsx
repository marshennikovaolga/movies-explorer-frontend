import './Portfolio.css'
import { Link } from 'react-router-dom'
import Container from '../Container/Container'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <Container>
                <h2 className='portfolio__title'>Портфолио</h2>
                <nav className="portfolio__nav">
                    <ul className='portfolio__list'>
                        <li className='portfolio__element'>
                            <Link to={'https://portfolio-marshennikovaolgas-projects.vercel.app/'}
                            target='_blank' className='portfolio__link'>
                                <p className='portfolio__subtitle'>cv</p>
                                <button type='button' className='portfolio__btn'></button>
                            </Link>
                        </li>
                        <li className='portfolio__element'>
                            <Link to={'https://github.com/marshennikovaolga/todo-list'}
                            target='_blank' className='portfolio__link'>
                                <p className='portfolio__subtitle'>todo сайт</p>
                                <button type='button' className='portfolio__btn'></button>
                            </Link>
                        </li>
                        <li className='portfolio__element'>
                            <Link to={'https://github.com/marshennikovaolga/react-mesto-api-full-gha'}
                            target='_blank' className='portfolio__link'>
                                <p className='portfolio__subtitle'>галерея с аутентификацией</p>
                                <button type='button' className='portfolio__btn'></button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </section>
    )
}