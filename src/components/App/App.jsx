import React, { useState, useEffect } from 'react'
import UserApi from '../../utils/MainApi.js'
import { Route, Routes } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'
import ProtectedRoute from '../ProtectedRoute.jsx'
import Main from '../Main/Main.jsx'
import Content from '../Content.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import Register from '../Authentication/Register.jsx'
import Login from '../Authentication/Login.jsx'
import Profile from '../Profile/Profile.jsx'
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'

export default function App() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [isCheckToken, setIsCheckToken] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [savedMovies, setSavedMovies] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    console.log(loggedIn, 'really logged in')

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        console.log(jwt, 'jwt')
        if (jwt) {
            setLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        if (localStorage.jwt) {
            UserApi.getUser(localStorage.jwt)
                .then(userData => {
                    setLoggedIn(true);
                    setIsCheckToken(false);
                    setCurrentUser(userData);
                })
                .catch(err => {
                    console.error(`Ошибка при загрузке начальных данных ${err}`);
                    setIsCheckToken(false);
                    localStorage.clear();
                });
        } else {
            setLoggedIn(false);
            setIsCheckToken(false);
            localStorage.clear();
        }
    }, [loggedIn]);

    useEffect(() => {
        if (localStorage.jwt) {
            UserApi.getMovies(localStorage.jwt)
                .then(dataMovies => {
                    setSavedMovies(dataMovies.reverse())
                })
                .catch(err => {
                    console.error(`Ошибка при загрузке фильмов ${err}`);
                });
        } else {
            setLoggedIn(false);
            setIsCheckToken(false);
            localStorage.clear();
        }
    }, [loggedIn]);

    function handleLogin(email, password) {
        UserApi.login(email, password)
            .then(token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                    console.log('Токен после входа:', token);
                    setLoggedIn(true);
                    console.log('переход на /movies');
                    navigate('/movies');
                    window.scrollTo(0, 0);
                } else {
                    console.error('Ошибка проверки токена');
                }
            })
            .catch((err) => {
                console.error(`Ошибка авторизации ${err}`);
            })
    }

    function handleRegister(name, email, password) {
        console.log("данные для регистрации:", { name, email, password });
        UserApi.register(name, email, password)
            .then(() => {
                setLoggedIn(true);
                handleLogin(email, password)
            })
            .catch((err) => {
                console.error(`Ошибка при регистации ${err}`)
            })
    }

    function updateUserProfile(name, email) {
        UserApi.setUserInfo(name, email, localStorage.jwt)
            .then(res => {
                setCurrentUser(res)
                setIsEdit(false)
                console.log('Обновленный currentUser:', res);
            })
            .catch((err) => {
                console.error(`Ошибка при редактировании данных пользователя ${err}`)
            })
    };

    const logOut = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate('/');
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
        const searchMovie = savedMovies.filter((movie) => {
            return movie.movieId === data.id
        })
        if (isAdded) {
            deleteMovie(searchMovie[0]._id)
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
            {isCheckToken ? <Preloader /> :
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route path="/signin" element={
                            loggedIn ? <Navigate to='/movies' replace /> :
                                <Login handleLogin={handleLogin} />} />
                        <Route path="/signup" element={
                            loggedIn ? <Navigate to='/movies' replace /> :
                                <Register handleRegister={handleRegister} />} />


                        <Route path="/profile" element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Content loggedIn={loggedIn} hasFooter={false}>
                                    <Profile
                                        logOut={logOut}
                                        updateUserProfile={updateUserProfile}
                                        setIsEdit={setIsEdit}
                                        isEdit={isEdit}
                                    />
                                </Content>
                            </ProtectedRoute>
                        } />

                        <Route path="/movies" element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Content loggedIn={loggedIn}>
                                    <Movies
                                        savedMovies={savedMovies}
                                        addMovie={toggleMovie}
                                        loggedIn={loggedIn}
                                    />
                                </Content>
                            </ProtectedRoute>} />

                        <Route path="/saved-movies" element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Content loggedIn={loggedIn}>
                                    <SavedMovies
                                        savedMovies={savedMovies}
                                        loggedIn={loggedIn}
                                        onDelete={deleteMovie} />
                                </Content>
                            </ProtectedRoute>}
                        />

                        <Route path="/" element={
                            <Content loggedIn={loggedIn} logOut={logOut} >
                                <Main name='projectpage' />
                            </Content>} />
                        <Route path='*' element={<Main name='notfound' />} />
                    </Routes>
                </CurrentUserContext.Provider>
            }
        </>
    )
}
