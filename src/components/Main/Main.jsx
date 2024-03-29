import React from 'react'
import Notfound from '../NotFound/NotFound.jsx'
import Promo from '../Promo/Promo.jsx'
import AboutProject from '../AboutProject/AboutProject.jsx'
import Techs from '../Techs/Techs.jsx'
import AboutMe from '../AboutMe/AboutMe.jsx'
import Portfolio from '../Portfolio/Portfolio.jsx'
import './Main.css'

export default function Main({ name }) {
    return (
        <main>
            {{
                notfound: <Notfound />,
                projectpage:
                    <>
                        <Promo />
                        <AboutProject />
                        <Techs />
                        <AboutMe />
                        <Portfolio />
                    </>
            }[name]}
        </main>
    )
}