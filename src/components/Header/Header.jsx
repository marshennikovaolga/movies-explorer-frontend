import './Header.css'
import { useState, useEffect } from 'react'
import logo from '../../images/green-logo.svg'
import profile from '../../images/profile-button.svg'
import burger from '../../images/burger-icon.svg'
import { Link, NavLink, useMatch } from 'react-router-dom'
import BurgerMenu from '../BurgerMenu/BurgerMenu'

export default function Header({ loggedIn }) {
    const moviesMatch = useMatch('/movies');
    const savedMoviesMatch = useMatch('/saved-movies');
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleBurgerMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='header'>
            <Link to={'/'}>
                <img alt='logo icon' className='header__icon' src={logo} />
            </Link>
            {loggedIn ? (
                isMobile ? (
                    <>
                        <img
                            alt='menu'
                            className='header__burger-icon'
                            src={burger}
                            onClick={toggleBurgerMenu}
                        />
                        <div
                            className={`header__menu-overlay ${isMenuOpen ? 'header__menu-overlay_open' : ''}`}
                            onClick={toggleBurgerMenu}>
                            {isMenuOpen && (
                                <BurgerMenu
                                    isOpen={isMenuOpen}
                                    toggleBurgerMenu={toggleBurgerMenu}
                                    moviesMatch={moviesMatch}
                                    savedMoviesMatch={savedMoviesMatch}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <>
                    <nav>
                        <ul className='header__nav-movies'>
                            <li>
                                <NavLink to={'/movies'}
                                    className={`header__movies
                                     ${moviesMatch ? 'header__movies_active' : ''}`}
                                >Фильмы</NavLink>
                            </li>
                            <li>
                                <Link to={'/saved-movies'}
                                    className={`header__movies
                                    ${savedMoviesMatch ? 'header__movies_active' : ''}`}
                                >Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </nav>
                    <NavLink to={'/profile'}>
                        <img src={profile} alt='перейти в профиль' className='header__account' />
                    </NavLink>
                </>
                )
            ) : (
                <nav>
                    <ul className='header__nav'>
                        <li>
                            <Link to={'/signup'} className="header__signup">Регистрация</Link>
                        </li>
                        <li>
                            <Link to={'/signin'} className="header__signin">Войти</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}