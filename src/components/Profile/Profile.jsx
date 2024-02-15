import './Profile.css';
import ProfileInput from './ProfileInput/ProfileInput';
import useFormValidation from '../../hooks/useFormValidation';
import { emailRegex } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';

function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext);
    const { error: validationError, values, reset, isInputValid, isValidButton, handleChange }
    = useFormValidation({ name: currentUser.name || '', email: currentUser.email || '' });
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
    const [initialValues, setInitialValues] = useState({ name: currentUser.name || '', email: currentUser.email || '' });
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [showCurrentDataError, setShowCurrentDataError] = useState(false);

    useEffect(() => {
        setIsDataChanged(values.name !== initialValues.name || values.email !== initialValues.email);
    }, [values, initialValues]);

    useEffect(() => {
        if (isEdit) {
            setInitialValues({ name: currentUser.name, email: currentUser.email  });
        }
    }, [isEdit, currentUser]);

    function handleEditProfile() {
        reset();
        setIsEdit(true);
    }

    function handleCancelEdit() {
        reset();
        setIsEdit(false);
        setUpdateSuccessMessage('Редактирование отменено');
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isEdit) {
            if (values.name !== initialValues.name || values.email !== initialValues.email) {
                updateUserProfile(values.name, values.email);
                setUpdateSuccessMessage('Данные профиля успешно обновлены');
            } else {
                setUpdateSuccessMessage('Редактирование отменено');
                setShowCurrentDataError(true);
            }
            setIsEdit(false);
        }
    }

    useEffect(() => {
        if (updateSuccessMessage) {
            const timer = setTimeout(() => {
                setUpdateSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [updateSuccessMessage]);

    useEffect(() => {
        if (showCurrentDataError) {
            const timer = setTimeout(() => {
                setShowCurrentDataError(false);
            }, 2000);
    
            return () => clearTimeout(timer);
        }
    }, [showCurrentDataError]);

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

export default Profile;