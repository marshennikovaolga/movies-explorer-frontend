import './Techs.css'
import Container from '../Container/Container'
import AboutTitle from '../AboutTitle/AboutTitle'

export default function Techs() {
    const titleTechs = 'Технологии';

    return (
        <section className='techs'>
            <Container>
                <AboutTitle title={titleTechs} />
                <h2 className="techs__subtitle">7 технологий</h2>
                <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__stack">HTML</li>
                    <li className="techs__stack">CSS</li>
                    <li className="techs__stack">JS</li>
                    <li className="techs__stack">React</li>
                    <li className="techs__stack">Git</li>
                    <li className="techs__stack">Express.js</li>
                    <li className="techs__stack">mongoDB</li>
                </ul>
            </Container>
        </section>
    )
}