import './Portfolio.css';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';

export default function Portfolio() {
    const projects = [
        { url: 'https://portfolio-marshennikovaolgas-projects.vercel.app/', title: 'cv' },
        { url: 'https://github.com/marshennikovaolga/todo-list', title: 'todo сайт' },
        { url: 'https://github.com/marshennikovaolga/react-mesto-api-full-gha', title: 'галерея с аутентификацией' }
    ]
    return (
        <section className='portfolio'>
            <Container>
                <h2 className='portfolio__title'>Портфолио</h2>
                <nav className="portfolio__nav">
                    <ul className='portfolio__list'>
                        {projects.map((project, index) => (
                            <li key={index} className='portfolio__element'>
                                <Link to={project.url} target='_blank' className='portfolio__link'>
                                    <p className='portfolio__subtitle'>{project.title}</p>
                                    <button type='button' className='portfolio__btn'></button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </section>
    );
}