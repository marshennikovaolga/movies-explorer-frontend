import './ProfileInput.css'

const ProfileInput = ({ isEdit, name, title, isInputValid, pattern, type, value, onChange, send, error, placeholder }) => {
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
                onChange={isEdit ? onChange : null}
                disabled={!isEdit}
                autoComplete='on'
            />
            <span className='profileinput__error'>
                {error}
            </span>
        </label>
    );
}

export default ProfileInput;






