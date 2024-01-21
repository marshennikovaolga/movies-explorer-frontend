import React from 'react';
import UserApi from '../../utils/ApiUser';
import ProfileInput from './ProfileInput/ProfileInput';
import useFormValidation from '../../hooks/useFormValidation';
import { emailRegex, nameRegex } from '../../utils/constants'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile({ updateUserProfile }) {

    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const {
        values,
        error,
        isInputValid,
        isValidButton,
        reset,
        changeValues,
        handleChange,
    } = useFormValidation();

    const [isEditing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditing(!isEditing);
        reset(currentUser);
    };

    const logOut = () => {
        localStorage.clear();
        navigate('/');
      };

      const saveChanges = () => {
        UserApi.setUserInfo(values.username, values.email, localStorage.jwt)
            .then((res) => {
                updateUserProfile(res);
                setEditing(false);
            })
            .catch((err) => {
                console.error(`Ошибка при сохранении изменений профиля: ${err}`);
            });
    };

    return (
        <div className="profile">
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <div className='profile__name'>
            <ProfileInput
                title="Имя"
                pattern={nameRegex}
                isInputValid={isInputValid.username}
                type="text"
                name="username"
                onChange={(e) => {
                    handleChange(e);
                    changeValues('username', e.target.value);
                }}
                isSend={false}
                value={values.username}
                error={error.username}
                hasError={true}
                disabled={!isEditing}
            />
            </div>
            <div className='profile__email'>
            <ProfileInput
                title="E-mail"
                pattern={emailRegex}
                isInputValid={isInputValid.email}
                type="email"
                name="email"
                onChange={(e) => {
                    handleChange(e);
                    changeValues('email', e.target.value);
                }}
                isSend={false}
                value={values.email}
                error={error.email}
                hasError={true}
                disabled={!isEditing}
            />
            </div>

            <button className='profile__edit' onClick={handleEditClick}>
                {isEditing ? 'Отменить редактирование' : 'Редактировать'}
            </button>
            {isEditing && (
                <button className='profile__save' onClick={saveChanges} disabled={!isValidButton}>
                    Сохранить изменения
                </button>
            )}
            <button className='profile__logout' onClick={logOut}>Выйти из аккаунта</button>

        </div>
    );
}