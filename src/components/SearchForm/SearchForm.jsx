import './SearchForm.css'
import useFormValidation from '../../hooks/useFormValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
// import { useLocation } from 'react-router-dom'

export default function SearchForm() {

  const { values, error, isValidButton, handleChange } = useFormValidation()

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form"
        >
          <input
            required
            className='search__input'
            placeholder="Фильм"
            name="search"
            type="text"
            value={values.search || ''}
            onChange={(evt) => {
              handleChange(evt)
            }}
            error={error.text}
            hasError={true}
          />
          <button
            type='submit'
            disabled={!isValidButton}
            className='search__submit'
          ></button>
        </form>
        <FilterCheckbox
        />
      </div>
    </section>
  );
}

