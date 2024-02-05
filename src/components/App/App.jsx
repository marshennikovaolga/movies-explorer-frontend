import React, { useState, useEffect, onMount } from 'react'
import Main from '../Main/Main.jsx'
import { useNavigate } from 'react-router-dom'
import UserApi from '../../utils/MainApi.js'
import moviesApi from '../../utils/MoviesApi.js'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import { Route, Routes } from 'react-router-dom'
import Content from '../Content.jsx'
import ProtectedRoute from '../ProtectedRoute.jsx'
import Preloader from '../Preloader/Preloader.jsx'

import Register from '../Authentication/Register.jsx'
import Login from '../Authentication/Login.jsx'

export default function App() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [isCheckToken, setIsCheckToken] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [savedMovies, setSavedMovies] = useState([])
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        if (localStorage.jwt) {
            Promise.all([UserApi.getUser(localStorage.jwt), UserApi.getMovies(localStorage.jwt)])
                .then(([userData, dataMovies]) => {
                    setLoggedIn(true)
                    setIsCheckToken(true)
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
            setCurrentUser({});
            setSavedMovies([]);
            localStorage.clear()
        }
    }, [loggedIn])

    function handleLogin(email, password) {
        UserApi.login(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                setIsCheckToken(true);
                console.log('переход на /movies');
                navigate('/movies');
                window.scrollTo(0, 0)
            })
            .catch((err) => {
                console.error(`Ошибка авторизации ${err}`)
            })
    }

    function handleRegister(name, email, password) {
        UserApi.register(name, email, password)
            .then((res) => {
                if (res && res.token) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    setIsCheckToken(true);
                    console.log('переход на /movies');
                    navigate('/movies');
                    window.scrollTo(0, 0);
                } else {
                    console.error('Ошибка в регистрации пользователя');
                }
            })
            .catch((err) => {
                console.error(`Произошла ошибка. ${err}`);
            });
    }

    function updateUserProfile(name, email) {
        UserApi.setUserInfo(name, email, localStorage.jwt)
            .then(res => {
                setCurrentUser(res)
                setIsEdit(false)
            })
            .catch((err) => {
                console.error(`Ошибка при редактировании данных пользователя ${err}`)
            })
    };

    function deleteMovie(deleteMovieId) {
        UserApi.deleteMovie(deleteMovieId, localStorage.jwt)
            .then(() => {
                setSavedMovies(savedMovies.filter(movie => { return movie._id !== deleteMovieId }))
            })
            .catch((err) => console.error(`Ошиюка при удалении фильма ${err}`))
    }

    function toggleMovie(data) {
        const isAdded = savedMovies.some(element => data.id === element.movieId)
        const seachMovie = savedMovies.filter((movie) => {
            return movie.movieId === data.id
        })
        if (isAdded) {
            deleteMovie(seachMovie[0]._id)
        } else {
            UserApi.addMovie(data, localStorage.jwt)
                .then(res => {
                    setSavedMovies([res, ...savedMovies])
                })
                .catch((err) => console.error(`Ошибка при добавлении лайка ${err}`))
        }
    }

    console.log(loggedIn, 'logged in')
    return (
        <>
            {isLoading ? <Preloader /> :
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
                        <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
                        <Route path="/profile" element={
                            <ProtectedRoute isLoggedIn={loggedIn} element={
                                <Content><Main name='profile' /></Content>} />} />
                        <Route path="/movies" element={
                            <ProtectedRoute isLoggedIn={loggedIn} element={
                                <Content><Main name='movies' /></Content>} />} />
                        <Route path="/saved-movies" element={
                            <ProtectedRoute isLoggedIn={loggedIn} element={
                                <Content><Main name='savedmovies' /></Content>} />} />
                        <Route path="/" element={<Content><Main name='projectpage' /></Content>} />
                        <Route path='*' element={<Main name='notfound' />} />
                    </Routes>
                </CurrentUserContext.Provider>
            }
        </>
    );
}
