import './AuthForm.css'
import InputForm from '../InputForm/InputForm'
import logo from '../../../images/green-logo.svg'
import useFormValidation from '../../../hooks/useFormValidation'
import { emailRegex } from '../../../utils/constants'
import { NavLink } from 'react-router-dom'

export default function AuthForm({ type, loginLink, onSubmit }) {

    const { values, error, isInputValid, isValidButton, handleChange } = useFormValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
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
                            isSend={false}
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
                            isSend={false}
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
                            isSend={false}
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
                            isSend={false}
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
                            isSend={false}
                            error={error.password}
                            hasError={true}
                        />
                    </div>
                )}
                <button
                    type='submit'
                    className='authform__submit'
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