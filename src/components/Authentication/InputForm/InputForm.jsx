import './InputForm.css'
import SendContext from '../../../contexts/SendContext'
import { useContext } from 'react'

export default function InputForm({ name, title, isInputValid, pattern, type,
    value, onChange, error, placeholder, minLength, maxLength }) {

    const send = useContext(SendContext);
    const inputClassName = `input__field ${isInputValid === undefined || isInputValid ? '' : 'input__field_invalid'}`;

    return (
        <label className='input__label'>
            <span className='input__title'>{title}</span>
            <input
                required
                className={inputClassName}
                name={name}
                type={type}
                value={value || ''}
                pattern={pattern instanceof RegExp ? pattern.source : pattern}
                placeholder={placeholder}
                onChange={onChange}
                disabled={send}
                minLength={minLength}
                maxLength={maxLength}
            />
            <span className='input__error' style={{ marginBottom: '10px' }}>
                {error}
            </span>
        </label>
    )
}