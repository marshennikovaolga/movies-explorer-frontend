import './Footer.css'

export default function Footer() {
    const isMobile = window.innerWidth < 525;

    return (
            <footer className='footer'>
                <p className='footer__title' >Учебный проект Яндекс.Практикум х BeatFilm.</p>
                {isMobile ? (
                    <div className="footer__container">
                        <nav className="footer__nav">
                            <a href={'https://practicum.yandex.ru/'} rel="noreferrer" className="footer__link footer__link_yandex" target='_blank'>
                                Яндекс.Практикум
                            </a>
                            <a href={'https://github.com/marshennikovaolga'} rel="noreferrer" className="footer__link" target='_blank'>
                                Github
                            </a>
                        </nav>
                        <p className="footer__year">© 2024</p>
                    </div>
                ) : (
                    <div className="footer__container">
                        <p className="footer__year">© 2024</p>
                        <nav className="footer__nav">
                            <div className="footer__link footer__link_yandex">
                                <a href={'https://practicum.yandex.ru/'} rel="noreferrer" target='_blank'>Яндекс.Практикум</a>
                            </div>
                            <div className="footer__link">
                                <a href={'https://github.com/marshennikovaolga'} rel="noreferrer" target='_blank'>Github</a>
                            </div>
                        </nav>
                    </div>
                )}
            </footer>
    )
}