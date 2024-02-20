import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import ProfileInput from './ProfileInput/ProfileInput';
import useProfileValidation from '../../hooks/useProfileValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { emailRegex } from '../../utils/constants';

function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext);
    const { error: validationError, values, reset, isInputValid, isValidButton, handleChange } =
        useProfileValidation({ name: currentUser.name || '', email: currentUser.email || '' });
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
    const [initialValues, setInitialValues] = useState({ name: currentUser.name || '', email: currentUser.email || '' });
    const [isNameChanged, setIsNameChanged] = useState(false);
    const [isEmailChanged, setIsEmailChanged] = useState(false);

    useEffect(() => {
        setIsNameChanged(values.name !== initialValues.name);
        setIsEmailChanged(values.email !== initialValues.email);
    }, [values, initialValues]);

    useEffect(() => {
        if (isEdit) {
            setInitialValues({ name: currentUser.name, email: currentUser.email });
        }
    }, [isEdit, currentUser]);

    function handleEditProfile() {
        reset();
        setIsEdit(true);
        setUpdateSuccessMessage('');
    }

    function handleCancelEdit() {
        reset(initialValues);
        setIsEdit(false);
        setUpdateSuccessMessage('Редактирование отменено');
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isEdit) {
            if (isNameChanged || isEmailChanged) {
                updateUserProfile(values.name, values.email);
                setUpdateSuccessMessage('Данные профиля успешно обновлены');
            } else {
                return;
            }
            setIsEdit(false);
        }
    }

    useEffect(() => {
        if (updateSuccessMessage) {
            const timer = setTimeout(() => {
                setUpdateSuccessMessage('');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [updateSuccessMessage, setUpdateSuccessMessage]);


    return (
        <form className="profile" onSubmit={handleSubmit} onInvalid={(e) => { e.preventDefault(); }}>
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            {updateSuccessMessage && (
                <p className="profile_success">{updateSuccessMessage}</p>
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
                    send={false}
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
                    send={false}
                    isEdit={isEdit}
                    error={validationError.email}
                    hasError={true}
                />
            </div>

            {isEdit ? (
                <>
                    {!isNameChanged && !isEmailChanged && (
                        <p className="profile_data-error">сейчас в данных профиля нет изменений</p>
                    )}
                    <button className='profile__edit' onClick={handleCancelEdit}>
                        Отменить редактирование
                    </button>
                    <button
                        type='submit'
                        className={`profile__button ${(!isValidButton || (!isNameChanged && !isEmailChanged)) ? 'profile__button_disabled' : ''}`}
                        disabled={!isValidButton || (!isNameChanged && !isEmailChanged)}
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

export default Profile;
