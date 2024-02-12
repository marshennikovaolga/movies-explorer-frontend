import './Profile.css'
import ProfileInput from './ProfileInput/ProfileInput'
import useFormValidation from '../../hooks/useFormValidation'
import { emailRegex } from '../../utils/constants'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useContext } from 'react'


export default function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, error, isInputValid, isValidButton, handleChange, reset } = useFormValidation()

    function handleSubmit(evt) {
        evt.preventDefault();
        updateUserProfile(values.name, values.email);
        setIsEdit(false);
    }

    function handleCancelEdit() {
        reset();
        setIsEdit(false);
    }

    return (
        <form className="profile" onSubmit={handleSubmit}>
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <div className='profile__name'>
                <ProfileInput
                    title="Имя"
                    placeholder="введите ваше имя"
                    name="name"
                    type="text"
                    value={!isEdit ? currentUser.name : values.name || ''}
                    isInputValid={isInputValid.name}
                    onChange={handleChange}
                    isSend={false}
                    isEdit={isEdit}
                    error={error.name}
                    hasError={true}
                />
            </div>
            <div className='profile__email'>
                <ProfileInput
                    title="Почта"
                    placeholder="введите ваш email"
                    name="email"
                    type="email"
                    value={!isEdit ? currentUser.email : values.email || ''}
                    isInputValid={isInputValid.email}
                    pattern={emailRegex}
                    onChange={handleChange}
                    isSend={false}
                    isEdit={isEdit}
                    error={error.email}
                    hasError={true}
                />
            </div>

            {isEdit ? (
                <>
                    <button className='profile__edit' onClick={handleCancelEdit}>
                        Отменить редактирование
                    </button>
                    <button
                        type='submit'
                        className={`profile__button
                        ${(values.name === currentUser.name && values.email === currentUser.email) || !isValidButton ? 'profile__button_disabled' : ''}`}
                        disabled={!isValidButton}
                    >
                        Сохранить изменения
                    </button>
                </>
            ) : (
                <>
                    <button
                        className='profile__edit'
                        onClick={() => { setIsEdit(true) }}>
                        Редактировать профиль
                    </button>
                    <button
                        className='profile__button profile__button_logout'
                        onClick={logOut}>
                        Выйти из аккаунта
                    </button>
                </>
            )}
        </form>
    );
}