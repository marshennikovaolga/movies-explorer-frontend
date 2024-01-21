import './Promo.css'

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <div className='promo__buttons'>
                    <a href="#" className="promo__button">О проекте</a>
                    <a href="#" className="promo__button">Технологии</a>
                    <a href="#" className="promo__button">Студент</a>
                </div>
            </div>
        </section>
    )
}