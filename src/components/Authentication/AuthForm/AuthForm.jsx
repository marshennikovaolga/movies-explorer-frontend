import './AuthForm.css'
import InputForm from '../InputForm/InputForm'
import logo from '../../../images/green-logo.svg'
import useFormValidation from '../../../hooks/useFormValidation'
import {emailRegex, passwordRegex, nameRegex} from '../../../utils/constants'
import { NavLink } from 'react-router-dom'

export default function AuthForm({ type, loginLink }) {

    const { values, error, isInputValid, isValidButton, handleChange } = useFormValidation()
    const submitLabel = type === 'login' ? 'Войти' : 'Зарегистрироваться';
    const submitBtn = type === 'login' ? 'Войти' : 'Зарегистрироваться';

    return (
        <div className="authform">
            <div className="authform__logo-container">
            <NavLink to={'/'}>
                        <img alt='logo icon' className='header__icon' src={logo} />
                    </NavLink>
            </div>
            <form >
                {type === 'login' ? (
                    <div>
                        <h2 className='authform__title'>Рады видеть!</h2>
                        <InputForm
                            title="Почта"
                            name="email"
                            value={values.email}
                            isInputValid={isInputValid.email}
                            pattern={emailRegex}
                            type="email"
                            onChange={(evt) => {
                                handleChange(evt)
                              }}
                            isSend={false}
                            error={error.email}
                            hasError={true}
                        />
                        <InputForm
                            title="Пароль"
                            name="password"
                            value={values.password}
                            isInputValid={isInputValid.password}
                            pattern={passwordRegex}
                            type="password"
                            onChange={(evt) => {
                                handleChange(evt)
                              }}
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
                            name="username"
                            value={values.username}
                            isInputValid={isInputValid.text}
                            pattern={nameRegex}
                            type="text"
                            onChange={(evt) => {
                                handleChange(evt)
                              }}
                            isSend={false}
                            error={error.username}
                            hasError={true}
                        />
                        <InputForm
                            title="Почта"
                            name="email"
                            value={values.email}
                            isInputValid={isInputValid.email}
                            pattern={emailRegex}
                            type="email"
                            onChange={(evt) => {
                                handleChange(evt)
                              }}
                            isSend={false}
                            error={error.email}
                            hasError={true}
                        />
                        <InputForm
                            title="Пароль"
                            name="password"
                            value={values.password}
                            isInputValid={isInputValid.password}
                            pattern={passwordRegex}
                            type="password"
                            onChange={(evt) => {
                                handleChange(evt)
                              }}
                            isSend={false}
                            error={error.password}
                            hasError={true}
                        />
                    </div>
                )}
                <button
                className='authform__submit'
                aria-label={submitLabel}
                type='submit'
                disabled={!isValidButton}
                >
                    {submitBtn}
                </button>
            </form>
            <p className='authform__link'>
                {type === 'login' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                <span className='authform__span'>{loginLink}</span>
            </p>
        </div>
    );
}