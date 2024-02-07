import './Profile.css'
import ProfileInput from './ProfileInput/ProfileInput'
import UserApi from '../../utils/MainApi'
import useFormValidation from '../../hooks/useFormValidation'
import { emailRegex } from '../../utils/constants'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useState, useContext } from 'react'

export default function Profile({ logOut, updateUserProfile }) {
    const currentUser = useContext(CurrentUserContext);
    const [isEditing, setEditing] = useState(false);
    const { values, error, isInputValid, isValidButton, handleChange, reset } = useFormValidation()

    const handleEditClick = () => {
        setEditing(!isEditing);
        reset(currentUser);
    };

    const saveChanges = () => {
        UserApi.setUserInfo(values.name, values.email, localStorage.jwt)
            .then((res) => {
                updateUserProfile(res);
                setEditing(false);
            })
            .catch((err) => {
                console.error(`Произошла ошибка при сохранении изменений профиля: ${err}`);
            });
    };

    return (
        <div className="profile">
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <div className='profile__name'>
                <ProfileInput
                    title="Имя"
                    placeholder="введите ваше имя"
                    name="name"
                    type="text"
                    value={values.name|| ''}
                    isInputValid={isInputValid.name}
                    onChange={handleChange}
                    isSend={false}
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
                    value={values.email || ''}
                    isInputValid={isInputValid.email}
                    pattern={emailRegex}
                    onChange={handleChange}
                    isSend={false}
                    error={error.email}
                    hasError={true}
                />
            </div>

            {isEditing ? (
                <>
                    <button
                        className='profile__edit'
                        onClick={handleEditClick}
                    >
                        Отменить редактирование
                    </button>
                    <button
                        className='profile__button'
                        disabled={!isValidButton}
                        onClick={saveChanges}
                    >
                        Сохранить изменения
                    </button>
                </>
            ) : (
                <>
                    <button
                        className='profile__edit'
                        onClick={handleEditClick}
                    >
                        Редактировать профиль
                    </button>
                    <button
                        className='profile__button profile__button_logout'
                        onClick={logOut}>
                        Выйти из аккаунта
                    </button>
                </>
            )}
        </div>
    );
}
