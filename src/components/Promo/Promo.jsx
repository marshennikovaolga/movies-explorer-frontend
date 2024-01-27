import './Promo.css'

export default function Promo() {

    const scrollToSection = (sectionId) => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section className="page__promo">
            <div className="promo__container">
                <h1 className="promo__title">
                    Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <div className='promo__buttons'>
                    <button
                        className='promo__button'
                        onClick={() => scrollToSection('about-project')}
                    >О проекте</button>
                    <button
                        className="promo__button"
                        onClick={() => scrollToSection('techs')}
                    >Технологии</button>
                    <button
                        className="promo__button"
                        onClick={() => scrollToSection('about-me')}
                    >Студент</button>
                </div>
            </div>
        </section>
    )
}