import './AboutProject.css'
import Container from '../Container/Container'
import AboutTitle from '../AboutTitle/AboutTitle'
import { useState, useEffect } from 'react';

export default function AboutProject() {
    const titleProject = 'О проекте';

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 525);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const projectDescriptionTitle = "Дипломный проект включал 5 этапов";
    const projectDescriptionText = "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.";
    const projectDurationTitle = "На выполнение диплома ушло 5 недель";
    const projectDurationText = "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.";

    return (
        <section className="about" id='about-project'>
            <Container>
                <AboutTitle title={titleProject} />
                <div className={isMobile ? "about__info-mobile" : "about__info"}>
                    {isMobile ? (
                        <>
                            <div>
                                <h2 className="about__column-title">{projectDescriptionTitle}</h2>
                                <p className="about__text">{projectDescriptionText}</p>
                            </div>
                            <div>
                                <h2 className="about__column-title">{projectDurationTitle}</h2>
                                <p className="about__text">{projectDurationText}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="about__column-title">{projectDescriptionTitle}</h2>
                            <h2 className="about__column-title">{projectDurationTitle}</h2>
                            <p className="about__text">{projectDescriptionText}</p>
                            <p className="about__text">{projectDurationText}</p>
                        </>
                    )}
                </div>
                <div className="about__timeline">
                    <p className="about__duration about__duration_backend">1 неделя</p>
                    <p className="about__duration">4 недели</p>
                    <span className="about__label">Back-end</span>
                    <span className="about__label">Front-end</span>
                </div>
            </Container>
        </section>
    );
}