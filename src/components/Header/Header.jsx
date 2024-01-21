import React from 'react';
import './Header.css';
import logo from '../../images/green-logo.svg';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ name }) {
    return (
        <header className='header'>
            {name === 'projectpage' ? (
                <>
                    <img alt='logo icon' className='header__icon' src={logo} />
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
                </>
            ) : (
                <>
                    <NavLink to={'/'}>
                        <img alt='logo icon' className='header__icon' src={logo} />
                    </NavLink>
                    <nav>
                        <ul className='header__nav-movies'>
                            <li>
                                <Link to={'/movies'} className="header__movies">Фильмы</Link>
                            </li>
                            <li>
                                <Link to={'/saved-movies'} className="header__movies">Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </nav>
                    <a className="header__account" href='/profile' />
                </>
            )}
        </header>
    );
}