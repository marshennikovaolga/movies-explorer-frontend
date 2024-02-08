import './Profile.css'
import ProfileInput from './ProfileInput/ProfileInput'
import useFormValidation from '../../hooks/useFormValidation'
import { emailRegex } from '../../utils/constants'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useState, useContext, useEffect } from 'react'


export default function Profile({ logOut, updateUserProfile }) {
    const currentUser = useContext(CurrentUserContext);
    const [isEditing, setEditing] = useState(false);
    const { values, error, isInputValid, isValidButton, handleChange, reset } = useFormValidation()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setName(currentUser.name || '');
        setEmail(currentUser.email || '');
    }, [currentUser]);

    const handleEditClick = () => {
        setEditing(!isEditing);
        reset(currentUser);
    };

    const saveChanges = () => {
        updateUserProfile(values.name, values.email);
        setEditing(false);
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
                    value={values.name || ''}
                    isInputValid={isInputValid.name}
                    onChange={(e) => {
                        handleChange(e);
                        setName(e.target.value);
                    }}
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
                    onChange={(e) => {
                        handleChange(e);
                        setEmail(e.target.value);
                    }}
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
