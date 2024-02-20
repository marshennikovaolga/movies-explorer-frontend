import './AuthForm.css'
import InputForm from '../InputForm/InputForm'
import logo from '../../../images/green-logo.svg'
import useFormValidation from '../../../hooks/useFormValidation'
import { emailRegex } from '../../../utils/constants'
import { Link, NavLink } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import ErrorContext from '../../../contexts/ErrorContext'
import SendContext from '../../../contexts/SendContext'

export default function AuthForm({ type, onSubmit }) {
    const send = useContext(SendContext);
    const { error: contextError } = useContext(ErrorContext)
    const { values, error, isInputValid, isValidButton, handleChange } = useFormValidation()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const loginLink = type === 'login' ? <Link to='/signup'>Регистрация</Link> : <Link to='/signin'>Войти</Link>
    const [errorVisible, setErrorVisible] = useState(false);

    useEffect(() => {
        if (contextError && formSubmitted) {
            setErrorVisible(true);
            const timer = setTimeout(() => {
                setErrorVisible(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [contextError, formSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
        setFormSubmitted(true);
    };

    return (
        <div className="authform">
            <div className="authform__logo-container">
                <NavLink to={'/'}>
                    <img alt='logo icon' className='header__icon' src={logo} />
                </NavLink>
            </div>
            <form onSubmit={handleSubmit}>
                {type === 'login' ? (
                    <div>
                        <h2 className='authform__title'>Рады видеть!</h2>
                        <InputForm
                            title="Почта"
                            placeholder="введите email"
                            name="email"
                            value={values.email || ''}
                            isInputValid={isInputValid.email}
                            pattern={emailRegex}
                            type="email"
                            onChange={handleChange}
                            send={send}
                            error={error.email}
                            hasError={true}
                        />
                        <InputForm
                            title="Пароль"
                            placeholder="введите пароль"
                            name="password"
                            value={values.password || ''}
                            isInputValid={isInputValid.password}
                            type="password"
                            onChange={handleChange}
                            sens={send}
                            error={error.password}
                            hasError={true}
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className='authform__title'>Добро пожаловать!</h2>
                        <InputForm
                            title="Имя"
                            type="text"
                            placeholder="введите ваше имя"
                            name="name"
                            value={values.name || ''}
                            isInputValid={isInputValid.name}
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            sens={send}
                            error={error.name}
                            hasError={true}
                        />
                        <InputForm
                            title="Почта"
                            placeholder="введите почту"
                            name="email"
                            value={values.email || ''}
                            isInputValid={isInputValid.email}
                            pattern={emailRegex}
                            type="email"
                            onChange={handleChange}
                            sens={send}
                            error={error.email}
                            hasError={true}
                        />
                        <InputForm
                            title="Пароль"
                            placeholder="введите пароль"
                            name="password"
                            value={values.password || ''}
                            isInputValid={isInputValid.password}
                            type="password"
                            onChange={handleChange}
                            sens={send}
                            error={error.password}
                            hasError={true}
                        />
                    </div>
                )}
                {(formSubmitted && contextError) && (
                <p className='authform__error'>{contextError}</p>
            )}
                <button
                    type='submit'
                    className={`authform__submit ${!isValidButton ? 'authform__submit_disabled' : ''}`}
                    aria-label={type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    disabled={!isValidButton}
                >
                    {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
            <p className='authform__link'>
                {type === 'login' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                <span className='authform__span'>{loginLink}</span>
            </p>
        </div>
    );
}