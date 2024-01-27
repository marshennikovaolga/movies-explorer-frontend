import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    const isMobile = window.innerWidth < 525;

    return (
        <footer className='footer'>
            <p className='footer__title' >Учебный проект Яндекс.Практикум х BeatFilm.</p>
            {isMobile ? (
                <div className="footer__container">
                    <nav className="footer__nav">
                        <Link to={'https://practicum.yandex.ru/'} className="footer__link" target='_blank'>
                            Яндекс.Практикум
                        </Link>
                        <Link to={'https://github.com/marshennikovaolga'} className="footer__link" target='_blank'>
                            Github
                        </Link>
                    </nav>
                    <p className="footer__year">© 2024</p>
                </div>
            ) : (
                <div className="footer__container">
                    <p className="footer__year">© 2024</p>
                    <nav className="footer__nav">
                        <div className="footer__link">
                            <Link to={'https://practicum.yandex.ru/'} target='_blank'>Яндекс.Практикум</Link>
                        </div>
                        <div className="footer__link">
                            <Link to={'https://github.com/marshennikovaolga'} target='_blank'>Github</Link>
                        </div>
                    </nav>
                </div>
            )}
        </footer>
    )
}