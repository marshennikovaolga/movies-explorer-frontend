import './InputForm.css'

export default function InputForm({ title, isInputValid, pattern, type, onChange, isSend, error, hasError}) {

    const inputClassName = `input__field ${isInputValid === undefined || isInputValid ? '' : 'input__field_invalid'}`;


    function getErrorText(type, error) {
        switch (type) {
            case 'email':
                return 'Введите корректный адрес электронной почты';
            case 'text':
                return 'Введите корректное имя';
            case 'password':
                return 'Введите корректный пароль';
        }
    }

    return (
        <label className='input__label'>
            <span className='input__title'>{title}</span>
            <input
                required
                className={inputClassName}
                pattern={pattern instanceof RegExp ? pattern.source : pattern}
                autoComplete='on'
                type={type}
                onChange={onChange}
                disabled={isSend}
            />
             {hasError && !isInputValid &&  (
                <span className='input__error' style={{ marginBottom: '10px' }}>
                    {getErrorText(type, error)}
                </span>
            )}
        </label>
    )
}
