import './AboutMe.css'
import '../Container/Container'
import AboutTitle from '../AboutTitle/AboutTitle'
import Container from '../Container/Container'
import { Link } from 'react-router-dom'
import profilepic from '../../images/profilepic.jpg'

export default function AboutMe() {
    const titleStudent = 'Студент';

    return (
        <section className='aboutme' id='about-me'>
            <Container>
                <AboutTitle title={titleStudent} />
                <div className="aboutme__container">
                    <div className="aboutme__description">
                        <h3 className="aboutme__name">Оля</h3>
                        <p className="aboutme__job">react developer, 23</p>
                        <p className="aboutme__text">Привет, я фронтенд-разработчик на реакте. В данный момент расширяю свой стек изучая GraphQl и React Native. Сейчас нахожусь в Санкт-Петербурге, но готова рассмотреть вакансии с возможностью релокации. В дальнейшем заинтересована создавать маркетплейсы, мобильные приложения и мессенджеры 🌸</p>
                        <p className="aboutme__github"><Link className="aboutme__github_link" to={'https://github.com/marshennikovaolga'} target='_blank'>Github</Link></p>
                    </div>
                    <img src={profilepic} alt="#" className="aboutme__pic" />
                </div>
            </Container>
        </section>
    )
}