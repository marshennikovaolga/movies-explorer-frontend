import './SearchForm.css'
import { useCallback } from 'react'
import useFormValidation from '../../hooks/useFormValidation';

export default function SearchForm() {
    const {
      values,
      isInputValid,
      isValidButton,
      reset,
      changeValues,
      handleChange,
    } = useFormValidation();
  
    const handleSubmit = useCallback(
      (evt) => {
        evt.preventDefault();

        console.log("Form values:", values);
        reset();
      },
      [values, reset]
    );
  
    return (
      <section className="search">
        <div className="search__container">
          <form noValidate className="search__form" onSubmit={handleSubmit}>
            <input
              className={`search__input ${isInputValid.search === false && "error"}`}
              placeholder="Фильм"
              required
              type="text"
              name="search"
              value={values.search || ""}
              onChange={handleChange}
            />
            <button
              type="submit"
              className={`search__submit ${!isValidButton && "disabled"}`}
              disabled={!isValidButton}
            ></button>
          </form>
        </div>
      </section>
    );
  }




  
// export default function SearchForm() {
//     return (
//         <section className='search'>
//             <div className='search__container'>
//                 <form className='search__form'>
//                     <input className='search__input'
//                     placeholder='Фильм'
//                     required
//                     type="text"
//                     name='search'
//                     />
//                      <button type='submit' className='search__submit'></button>
//                 </form>
//             </div>
//         </section>
//     )
// }