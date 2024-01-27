import './ProfileInput.css'

export default function ProfileInput({ name, title, isInputValid, pattern, type, value, onChange, isSend, error, placeholder }) {

    const inputClassName = `profileinput__field ${isInputValid === undefined || isInputValid ? '' : 'profileinput_invalid'}`;

    return (
        <label className="profileinput__label">
            <span className='profileinput__placeholder'>{title}</span>
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
            <span className='profileinput__error'>
                {error}
            </span>
        </label>
    )
}