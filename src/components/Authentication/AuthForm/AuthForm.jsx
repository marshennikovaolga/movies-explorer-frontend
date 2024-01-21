import './AuthForm.css'
import InputForm from '../InputForm/InputForm'
import logo from '../../../images/green-logo.svg'
import useFormValidation from '../../../hooks/useFormValidation'
import {emailRegex, passwordRegex, nameRegex} from '../../../utils/constants'

export default function AuthForm({ type, loginLink }) {

    const {
        values: loginValues,
        error: loginError,
        isInputValid: loginIsInputValid,
        isValidButton: loginIsValidButton,
        reset: loginReset,
        changeValues: loginChangeValues,
        handleChange: loginHandleChange
    } = useFormValidation();

    const {
        values: registerValues,
        error: registerError,
        isInputValid: registerIsInputValid,
        isValidButton: registerIsValidButton,
        reset: registerReset,
        changeValues: registerChangeValues,
        handleChange: registerHandleChange
    } = useFormValidation();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log("вы авторизовались:", loginValues);
        loginReset();
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        console.log("регистрация прошла успешно:", registerValues);
        registerReset();
    };

    const submitLabel = type === 'login' ? 'Войти' : 'Зарегистрироваться';
    const submitBtn = type === 'login' ? 'Войти' : 'Зарегистрироваться';

    const handleSubmit = type === 'login' ? handleLoginSubmit : handleRegisterSubmit;

    
    return (
        <div className="authform">
            <div className="authform__logo-container">
                <img className="authform__logo" src={logo} alt="Logo"></img>
            </div>
            <form onSubmit={handleSubmit}>
                {type === 'login' ? (
                    <div>
                        <h2 className='authform__title'>Рады видеть!</h2>
                        <InputForm
                            title="Email"
                            isInputValid={loginIsInputValid.email}
                            pattern={emailRegex}
                            type="email"
                            onChange={loginHandleChange}
                            isSend={false}
                            error={loginError.email}
                            hasError={true}
                        />
                        <InputForm
                            title="Password"
                            isInputValid={loginIsInputValid.password}
                            pattern={passwordRegex}
                            type="password"
                            onChange={loginHandleChange}
                            isSend={false}
                            error={loginError.password}
                            hasError={true}
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className='authform__title'>Добро пожаловать!</h2>
                        <InputForm
                            title="Name"
                            isInputValid={registerIsInputValid.text}
                            pattern={nameRegex}
                            type="text"
                            onChange={registerHandleChange}
                            isSend={false}
                            error={registerError.text}
                            hasError={true}
                        />
                        <InputForm
                            title="Email"
                            isInputValid={registerIsInputValid.email}
                            pattern={emailRegex}
                            type="email"
                            onChange={registerHandleChange}
                            isSend={false}
                            error={registerError.email}
                            hasError={true}
                        />
                        <InputForm
                            title="Password"
                            isInputValid={registerIsInputValid.password}
                            pattern={passwordRegex}
                            type="password"
                            onChange={registerHandleChange}
                            isSend={false}
                            error={registerError.password}
                            hasError={true}
                        />
                    </div>
                )}
                <button className='authform__submit' aria-label={submitLabel} type='submit' disabled={type === 'login' ? !loginIsValidButton : !registerIsValidButton}>
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