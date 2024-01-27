import React from 'react'
import Notfound from '../NotFound/NotFound.jsx'
import Login from '../Authentication/Login.jsx'
import Register from '../Authentication/Register.jsx'
import Promo from '../Promo/Promo.jsx'
import AboutProject from '../AboutProject/AboutProject.jsx'
import Techs from '../Techs/Techs.jsx'
import AboutMe from '../AboutMe/AboutMe.jsx'
import Portfolio from '../Portfolio/Portfolio.jsx'
import Footer from '../Footer/Footer.jsx'
import Movies from '../Movies/Movies.jsx'
import SavedMovies from '../SavedMovies/SavedMovies.jsx'
import Header from '../Header/Header.jsx'
import Profile from '../Profile/Profile.jsx'

export default function Main({ name }) {
    return (
        <main>
            {{
                login:
                    <Login
                    // handleLogin={handleLogin}
                    />,
                register:
                    <Register
                    //  handleRegister={handleRegister}
                    />,
                profile:
                    <>
                        <Header name='universal' />
                        <Profile />
                    </>,
                projectpage:
                    <>
                        <Header name='projectpage' />
                        <Promo />
                        <AboutProject />
                        <Techs />
                        <AboutMe />
                        <Portfolio />
                        <Footer />
                    </>,
                movies:
                    <>
                        <Header name='universal' />
                        <Movies />
                        <Footer />
                    </>,
                savedmovies:
                    <>
                        <Header name='universal' />
                        <SavedMovies />
                        <Footer />
                    </>,
                404:
                    <Notfound />
            }[name]}
        </main>
    )
}