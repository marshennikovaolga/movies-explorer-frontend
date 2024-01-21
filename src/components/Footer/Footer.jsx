import './Footer.css'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
    // const { pathname } = useLocation()
    return (
        <footer className='footer'>
            <p className='footer__title' >Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__year">© 2024</p>
                <nav className="footer__nav">
                    <Link to={'https://practicum.yandex.ru/'} className="footer__link" target='_blank'>
                        Яндекс.Практикум
                    </Link>
                    <Link to={'https://github.com/marshennikovaolga'} className="footer__link" target='_blank'>
                        Github
                    </Link>
                </nav>
            </div>
        </footer>
    )
}