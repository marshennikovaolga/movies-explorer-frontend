import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Main from '../Main/Main.jsx'
import UserApi from '../../utils/ApiUser.js'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import Preloader from '../Preloader/Preloader.jsx'
import ProtectedRoute from '../ProtectedRoute.jsx'

export default function App() {
    const navigate = useNavigate();
    const [isCheckToken, setIsCheckToken] = useState(true)
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.jwt) {
            Promise.all([UserApi.getUser(localStorage.jwt)])
                .then(([userData]) => {
                    setCurrentUser(userData)
                    setLoggedIn(true)
                    setIsCheckToken(false)
                })
                .catch((err) => {
                    console.error(`Ошибка при загрузке начальных данных ${err}`)
                    setIsCheckToken(false)
                    localStorage.clear()
                })
        } else {
            setLoggedIn(false)
            setIsCheckToken(false)
            localStorage.clear()
        }
    }, [loggedIn])

    function handleLogin(email, password) {
        UserApi.login(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token)
                setCurrentUser(res.userData);
                setLoggedIn(true)
                window.scrollTo(0, 0)
            })
            .catch((err) => {
                console.error(`Ошибка авторизации ${err}`)
            })
    }

    function handleRegister(username, email, password) {
        UserApi.register(username, email, password)
            .then((res) => {
                if (res) {
                    setLoggedIn(false)
                    UserApi.login(email, password)
                        .then(res => {
                            localStorage.setItem('jwt', res.token)
                            setLoggedIn(true)
                            window.scrollTo(0, 0)
                        })
                        .catch((err) => {
                            console.error(`Пользователь с таким email уже существует. ${err}`)
                        })
                }
            })
            .catch((err) => {
                console.error(`При регистрации пользователя произошла ошибка. ${err}`)
            })
    }

    const updateUserProfile = (newUserData) => {
        setCurrentUser(newUserData);
    };

    function logOut() {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/')
    }

    return (
        <>
            {isCheckToken ? <Preloader /> :
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route path='/' element={<Main name='projectpage' />} />
                        <Route path='/signin' element={
                            <Main name='login' handleLogin={handleLogin} />
                        }></Route>
                        <Route path='/signup' element={
                            <Main name='register' handleRegister={handleRegister} />
                        }></Route>
                        <Route path='/profile' element={
                            <Main name='profile' logOut={logOut} updateUserProfile={updateUserProfile} />} />
                        <Route path='/movies' element={
                            <Main name='movies' />
                        } />
                        <Route path='/saved-movies' element={
                            <Main name='savedmovies' />
                        } />
                        <Route path='*' element={<Main name='404' />} />
                    </Routes>
                </CurrentUserContext.Provider>
            }
        </>
    );
}