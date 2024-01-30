import './BurgerMenu.css'
import { NavLink } from 'react-router-dom'
import close_burger from '../../images/close-burger-icon.svg'
import profile from '../../images/profile-button.svg'

function BurgerMenu({ isOpen, toggleBurgerMenu, moviesMatch, savedMoviesMatch }) {
    return (
        <div className={`burger ${isOpen ? 'burger_open' : ''}`}>
            <img
                alt='close'
                src={close_burger}
                className='burger__close'
                onClick={toggleBurgerMenu}
            />
            <ul className='burger__nav'>
                <li>
                    <NavLink to='/' className='burger__movies'>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/movies'
                        className={`burger__movies ${moviesMatch ? 'burger__movies_active' : ''}`}>
                        Фильмы
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/saved-movies'
                        className={`burger__movies ${savedMoviesMatch ? 'burger__movies_active' : ''}`}>
                        Сохранённые фильмы
                    </NavLink>
                </li>
            </ul>
            <NavLink to='/profile'>
                <img src={profile} alt='перейти в профиль' className='burger__account' />
            </NavLink>
        </div>
    );
}

export default BurgerMenu;
