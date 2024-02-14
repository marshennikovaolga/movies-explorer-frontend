import './Profile.css';
import ProfileInput from './ProfileInput/ProfileInput';
import useFormValidation from '../../hooks/useFormValidation';
import { emailRegex } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';

export default function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext);
    const { error: validationError, values, reset, isInputValid, isValidButton, handleChange } = useFormValidation({ name: currentUser.name || '', email: currentUser.email || '' });
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
    const [editedUserData, setEditedUserData] = useState({ name: '', email: '' });
    const [showCurrentDataError, setShowCurrentDataError] = useState(false);

    useEffect(() => {
        setEditedUserData({ name: currentUser.name || '', email: currentUser.email || '' });
    }, [currentUser]);

    useEffect(() => {
        setShowCurrentDataError(false);
    }, [isEdit]);

    function handleSubmit(evt) {
        evt.preventDefault();
        if (values.name !== editedUserData.name || values.email !== editedUserData.email) {
            updateUserProfile(values.name, values.email);
            setUpdateSuccessMessage('Данные профиля успешно обновлены');
        } else {
            setShowCurrentDataError(true);
            setTimeout(() => {
                setShowCurrentDataError(false);
            }, 3000); 
         }
         setIsEdit(false);
     }

    function handleEditProfile() {
        setIsEdit(true);
        setUpdateSuccessMessage('');
        reset();
    }

    function handleCancelEdit() {
        reset();
        setIsEdit(false);
        setUpdateSuccessMessage('');
    }

    useEffect(() => {
        if (updateSuccessMessage) {
            const timer = setTimeout(() => {
                setUpdateSuccessMessage('');
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [updateSuccessMessage]);

    return (
        <form className="profile" onSubmit={handleSubmit} onInvalid={(e) => { e.preventDefault(); }}>
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            {updateSuccessMessage && (
                <p className="profile_success">{updateSuccessMessage}</p>
            )}
            {showCurrentDataError && (
                <p className="profile_data-error">Вы ввели текущие данные</p>
            )}
            <div className='profile__name'>
                <ProfileInput
                    title="Имя"
                    placeholder="введите ваше имя"
                    name="name"
                    type="text"
                    value={isEdit ? values.name : currentUser.name}
                    isInputValid={isInputValid.name}
                    onChange={handleChange}
                    isSend={false}
                    isEdit={isEdit}
                    error={validationError.name}
                    hasError={true}
                />
            </div>
            <div className='profile__email'>
                <ProfileInput
                    title="Почта"
                    placeholder="введите ваш email"
                    name="email"
                    type="email"
                    value={isEdit ? values.email : currentUser.email}
                    isInputValid={isInputValid.email}
                    pattern={emailRegex}
                    onChange={handleChange}
                    isSend={false}
                    isEdit={isEdit}
                    error={validationError.email}
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
                        className={`profile__button ${!isValidButton ? 'profile__button_disabled' : ''}`}
                        disabled={!isValidButton}
                    >
                        Сохранить изменения
                    </button>
                </>
            ) : (
                <>
                    <button
                        className={`profile__edit ${isEdit ? 'profile__edit_disabled' : ''}`}
                        onClick={handleEditProfile}
                        disabled={isEdit || Object.values(validationError).some(error => error)}
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
        </form>
    );
}