import React from 'react'
import './Main.css'
import Notfound from '../NotFound/NotFound.jsx'
import Login from '../Authentication/Login.jsx'
import Register from '../Authentication/Register.jsx'
import Promo from '../Promo/Promo.jsx'
import AboutProject from '../AboutProject/AboutProject.jsx'
import Techs from '../Techs/Techs.jsx'
import AboutMe from '../AboutMe/AboutMe.jsx'
import Portfolio from '../Portfolio/Portfolio.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx'

import Profile from '../Profile/Profile.jsx'

export default function Main({ name, handleLogin, handleRegister }) {

    return (
        <main>
            {{
                login:
                    <Login handleLogin={handleLogin} />,
                register:
                    <Register handleRegister={handleRegister} />,
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
                        <SearchForm />
                    </>,
                savedmovies:
                    <>
                        <Header name='universal' />
                    </>,
                404:
                    <Notfound />
            }[name]}
        </main>
    )
}