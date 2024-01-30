import React, { useState, useEffect } from 'react'
import Main from '../Main/Main.jsx'
import { useNavigate } from 'react-router-dom'
import UserApi from '../../utils/MainApi.js'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import { Route, Routes } from 'react-router-dom'
import Content from '../Content.jsx'

export default function App() {
    const navigate = useNavigate();
    const [isCheckToken, setIsCheckToken] = useState(true)
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

    const [savedMovies, setSavedMovies] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (localStorage.jwt) {
            Promise.all([UserApi.getUser(localStorage.jwt)])
                .then(([userData, dataMovies]) => {
                    setLoggedIn(true)
                    setIsCheckToken(false)
                    setCurrentUser(userData)
                    setSavedMovies(dataMovies.reverse())
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
                console.log('переход на /movies')
                navigate('/movies')
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
                            console.log('переход на /movies')
                            navigate('/movies')
                            window.scrollTo(0, 0)
                        })
                        .catch((err) => {
                            console.error(`При регистрации пользователя произошла ошибка. ${err}`)
                        })
                }
            })
            .catch((err) => {
                console.error(`Произошла ошибка. ${err}`)
            })
    }

    function updateUserProfile(username, email) {
        UserApi.setUserInfo(username, email, localStorage.jwt)
            .then(res => {
                setCurrentUser(res)
                setIsEdit(false)
            })
            .catch((err) => {
                console.error(`Ошибка при редактировании данных пользователя ${err}`)
            })
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/signin"
                    element={<Main name='login' handleLogin={handleLogin} />} />
                <Route path="/signup"
                    element={<Main name='register' handleRegister={handleRegister} />} />
                <Route path="/profile"
                    element={<Content><Main name='profile' /></Content>} />
                <Route path="/movies"
                    element={<Content><Main name='movies' /></Content>} />
                <Route path="/saved-movies"
                    element={<Content><Main name='savedmovies' /></Content>} />
                <Route path="/"
                    element={<Content><Main name='projectpage' /></Content>} />
                <Route path='*'
                    element={<Main name='notfound' />} />
            </Routes>
        </CurrentUserContext.Provider>
    );
}