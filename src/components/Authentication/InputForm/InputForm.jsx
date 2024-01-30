import './InputForm.css'

export default function InputForm({ name, title, isInputValid, pattern, type, value, onChange, isSend, error, placeholder }) {

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
                disabled={isSend}
                autoComplete='on'
            />
                <span className='input__error' style={{ marginBottom: '10px' }}>
                    {error}
                </span>
        </label>
    )
}