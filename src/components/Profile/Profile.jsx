import './Profile.css'
import ProfileInput from './ProfileInput/ProfileInput'
import useFormValidation from '../../hooks/useFormValidation'
import { emailRegex } from '../../utils/constants'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useState, useContext, useEffect } from 'react'


export default function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, error, isInputValid, isValidButton, handleChange, reset } = useFormValidation()

    useEffect(() => {
        reset({ name: currentUser.name, email: currentUser.email })
    }, [reset, isEdit, currentUser])

    function handleEditClick(evt) {
        evt.preventDefault();
        updateUserProfile(values.name, values.email);
        setIsEdit(false);
    }


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
                    value={values.email || ''}
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
                    <button className='profile__edit' onClick={() => setIsEdit(false)}>
                        Отменить редактирование
                    </button>
                    <button
                        className={`profile__button
                        ${(values.name === currentUser.name && values.email === currentUser.email) || !isValidButton ? 'profile__button_disabled' : ''}`}
                        disabled={!isValidButton}
                        onClick={handleEditClick}
                    >
                        Сохранить изменения
                    </button>
                </>
            ) : (
                <>
                    <button
                        className='profile__edit'
                        onClick={() => { setIsEdit(true)}}>
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
