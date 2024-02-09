import React, { useState, useEffect } from 'react'
import Main from '../Main/Main.jsx'
import { Navigate, useNavigate } from 'react-router-dom'
import UserApi from '../../utils/MainApi.js'
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
            Promise.all([UserApi.getUser(localStorage.jwt),
            UserApi.getMovies(localStorage.jwt)])
                .then(([userData, dataMovies]) => {
                    setLoggedIn(true)
                    setIsCheckToken(false)
                    setCurrentUser(userData)
                    setIsLoading(false)
                    if (Array.isArray(dataMovies)) {
                        setSavedMovies(dataMovies.reverse())
                    } else {
                        setSavedMovies([])
                    }
                })
                .catch((err) => {
                    console.error(`Ошибка при загрузке начальных данных ${err}`)
                    setIsCheckToken(false)
                    // setCurrentUser({});
                    localStorage.clear()
                })
        } else {
            setLoggedIn(false)
            setIsCheckToken(false)
            localStorage.clear()
        }
    }, [])

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

    function handleLogin(email, password) {
        UserApi.login(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                console.log('Токен после входа:', res.token);
                setLoggedIn(true);
                console.log('переход на /movies');
                navigate('/movies');
                window.scrollTo(0, 0)
            })
            .catch((err) => {
                console.error(`Ошибка авторизации ${err}`)
            })
    }

    function handleRegister(name, email, password) {
        console.log("данные для регистрации:", { name, email, password });
        UserApi.register(name, email, password)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                    console.log('переход на /movies');
                    navigate('/movies');
                    window.scrollTo(0, 0);
                }
            })
            .catch((error) => {
                console.error("Произошла ошибка при регистрации пользователя:", error);
            });
    }

    function updateUserProfile(name, email) {
        UserApi.setUserInfo(name, email, localStorage.jwt)
            .then(res => {
                setCurrentUser(res)
                localStorage.setItem('currentUser', JSON.stringify(res));
                setIsEdit(false)
            })
            .catch((err) => {
                console.error(`Ошибка при редактировании данных пользователя ${err}`)
            })
    };

    const logOut = () => {
        localStorage.clear();
        setCurrentUser({});
        setLoggedIn(false);
        setSavedMovies({});
        navigate('/');
    };
    
    console.log(loggedIn, 'logged in')

    return (
        <>
            {isCheckToken ? <Preloader /> :
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route path="/signin" element={
                            loggedIn ? <Navigate to='/movies' replace /> : <Login handleLogin={handleLogin} />} />
                        <Route path="/signup" element={
                            loggedIn ? <Navigate to='/movies' replace /> : <Register handleRegister={handleRegister} />} />

                        <Route path="/profile" element={
                            <ProtectedRoute loggedIn={loggedIn} element={
                                <Content><Main name='profile'
                                    logOut={logOut}
                                    updateUserProfile={updateUserProfile}
                                    setIsEdit={setIsEdit}
                                    isEdit={isEdit}
                                /></Content>} />} />

                        <Route path="/movies" element={
                            <ProtectedRoute loggedIn={loggedIn} element={
                                <Content>
                                    <Main name='movies'
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                </Content>} />} />

                        <Route path="/saved-movies" element={
                            <ProtectedRoute loggedIn={loggedIn} element={
                                <Content><Main name='savedmovies' /></Content>} />} />

                        <Route path="/" element={<Content><Main name='projectpage' /></Content>} />
                        <Route path='*' element={<Main name='notfound' />} />
                    </Routes>
                </CurrentUserContext.Provider>
            }
        </>
    )
}
