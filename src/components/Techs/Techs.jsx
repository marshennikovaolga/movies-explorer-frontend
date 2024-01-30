import './Techs.css'
import Container from '../Container/Container'
import AboutTitle from '../AboutTitle/AboutTitle'

export default function Techs() {
    const titleTechs = 'Технологии';

    const techStack = [
        'HTML', 'CSS', 'JS', 'React',
        'Git','Express.js', 'mongoDB',
    ];

    return (
        <section className='techs' id='techs'>
            <Container>
                <AboutTitle title={titleTechs} />
                <h2 className="techs__subtitle">7 технологий</h2>
                <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    {techStack.map((tech, index) => (
                        <li key={index} className="techs__stack">{tech}</li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}