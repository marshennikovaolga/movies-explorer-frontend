import './Profile.css'
import ProfileInput from './ProfileInput/ProfileInput'
import useFormValidation from '../../hooks/useFormValidation'
import { emailRegex } from '../../utils/constants'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useState, useEffect, useContext } from 'react'

export default function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext)
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState('')
    const { values, error, reset, isInputValid, isValidButton, handleChange }
        = useFormValidation({ name: currentUser.name || '', email: currentUser.email || '' })

    const [editedUserData, setEditedUserData] = useState({ name: '', email: '' })

    useEffect(() => {
        setEditedUserData({ name: currentUser.name || '', email: currentUser.email || '' })
    }, [currentUser])

    function handleSubmit(evt) {
        evt.preventDefault();
        updateUserProfile(values.name, values.email);
        setIsEdit(false);
        setEditedUserData({ name: values.name, email: values.email });
        setUpdateSuccessMessage('Данные профиля успешно обновлены');
    }

    function handleCancelEdit() {
        reset();
        setIsEdit(false);
        setEditedUserData({ name: currentUser.name || '', email: currentUser.email || '' });
        setUpdateSuccessMessage('');
    }

    useEffect(() => {
        if (updateSuccessMessage) {
            const timer = setTimeout(() => {
                setUpdateSuccessMessage('');
            }, 60000);
            return () => clearTimeout(timer);
        }
    }, [updateSuccessMessage]);

    return (
        <form className="profile" noValidate onSubmit={handleSubmit}>
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
                    {(values.name === editedUserData.name && values.email === editedUserData.email) ? (
                        <span className="profile__error-edit">
                            Вы ввели текущие почту и имя. Для обновления профиля необходимо ввести новые данные.</span>
                    ) : (
                        <button
                            type='submit'
                            className={`profile__button
                ${!isValidButton ? 'profile__button_disabled' : ''}`}
                            disabled={!isValidButton}
                        >
                            Сохранить изменения
                        </button>
                    )}
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
    )
}


// import './Profile.css'
// import ProfileInput from './ProfileInput/ProfileInput'
// import useFormValidation from '../../hooks/useFormValidation'
// import { emailRegex } from '../../utils/constants'
// import CurrentUserContext from '../../contexts/CurrentUserContext'
// import { useState, useEffect, useContext } from 'react'

// export default function Profile({ logOut, updateUserProfile, isEdit, setIsEdit }) {
//     const currentUser = useContext(CurrentUserContext)
//     const [updateSuccessMessage, setUpdateSuccessMessage] = useState('')
//     const { values, error, isInputValid, isValidButton, handleChange, reset }
//         = useFormValidation({ name: currentUser.name || '', email: currentUser.email || '' })

//     const [editedUserData, setEditedUserData] = useState({ name: '', email: '' })

//     useEffect(() => {
//         setEditedUserData({ name: currentUser.name || '', email: currentUser.email || '' })
//     }, [currentUser])

//     function handleSubmit(evt) {
//         evt.preventDefault();
//         updateUserProfile(values.name, values.email);
//         setIsEdit(false);
//         setUpdateSuccessMessage('Данные профиля успешно обновлены')
//     }

//     function handleCancelEdit() {
//         // reset();
//         setIsEdit(false);
//     }

//     useEffect(() => {
//         if (updateSuccessMessage) {
//             const timer = setTimeout(() => {
//                 setUpdateSuccessMessage('');
//             }, 5000);
//             return () => clearTimeout(timer);
//         }
//     }, [updateSuccessMessage]);

//     return (
//         <form className="profile" onSubmit={handleSubmit}>
//             <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
//             {updateSuccessMessage && (
//                 <p className="profile_success">{updateSuccessMessage}</p>
//             )}
//             <div className='profile__name'>
//                 <ProfileInput
//                     title="Имя"
//                     placeholder="введите ваше имя"
//                     name="name"
//                     type="text"
//                     value={!isEdit ? currentUser.name : values.name || ''}
//                     isInputValid={isInputValid.name}
//                     onChange={handleChange}
//                     isSend={false}
//                     isEdit={isEdit}
//                     error={error.name}
//                     hasError={true}
//                 />
//             </div>
//             <div className='profile__email'>
//                 <ProfileInput
//                     title="Почта"
//                     placeholder="введите ваш email"
//                     name="email"
//                     type="email"
//                     value={!isEdit ? currentUser.email : values.email || ''}
//                     isInputValid={isInputValid.email}
//                     pattern={emailRegex}
//                     onChange={handleChange}
//                     isSend={false}
//                     isEdit={isEdit}
//                     error={error.email}
//                     hasError={true}
//                 />
//             </div>

//             {isEdit ? (
//                 <>
//                     <button className='profile__edit' onClick={handleCancelEdit}>
//                         Отменить редактирование
//                     </button>
//                     {(values.name === editedUserData.name && values.email === editedUserData.email) ? (
//                         <span className="profile__error-edit">
//                             Вы ввели текущие почту и имя. Для обновления профиля необходимо ввести новые данные.</span>
//                     ) : (
//                         <button
//                             type='submit'
//                             className={`profile__button
//                 ${!isValidButton ? 'profile__button_disabled' : ''}`}
//                             disabled={!isValidButton}
//                         >
//                             Сохранить изменения
//                         </button>
//                     )}
//                 </>
//             ) : (
//                 <>
//                     <button
//                         className='profile__edit'
//                         onClick={() => { setIsEdit(true) }}>
//                         Редактировать профиль
//                     </button>
//                     <button
//                         className='profile__button profile__button_logout'
//                         onClick={logOut}>
//                         Выйти из аккаунта
//                     </button>
//                 </>
//             )}
//         </form>
//     )
// }

