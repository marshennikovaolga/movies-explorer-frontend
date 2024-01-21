import './AboutProject.css'
import Container from '../Container/Container'
import AboutTitle from '../AboutTitle/AboutTitle'

export default function AboutProject() {
    const titleProject = 'О проекте';

    return (
        <section className="about">
            <Container>
                <AboutTitle title={titleProject} />
                <div className="about__info">
                    <h2 className="about__column-title">Дипломный проект включал 5 этапов</h2>
                    <h2 className="about__column-title">На выполнение диплома ушло 5 недель</h2>
                    <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
                <div className="about__timeline">
                    <p className="about__duration about__duration_backend">1 неделя</p>
                    <p className="about__duration">4 недели</p>
                    <span className="about__label">Back-end</span>
                    <span className="about__label">Front-end</span>
                </div>
            </Container>
        </section>
    )
}