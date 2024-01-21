import React from 'react';
import './ProfileInput.css';
export default function ProfileInput({
    title,
    type,
    name,
    onChange,
    isSend,
    error,
    hasError,
    value,
    pattern,
    isInputValid,
    disabled,
}) {
    const inputClassName = `profileinput__field ${
        isInputValid === undefined || isInputValid ? '' : 'profileinput_invalid'
    }`;

    return (
        <label className="profileinput__label">
            <span className='profileinput__placeholder'>{title}</span>
            <input
                required
                className={inputClassName}
                pattern={pattern instanceof RegExp ? pattern.source : pattern}
                autoComplete="on"
                type={type}
                name={name}
                onChange={onChange}
                disabled={disabled || isSend}
                value={value}
            />
            {hasError && !isInputValid && (
                <span className="profileinput__error" style={{ marginBottom: '10px' }}>
                    {error}
                </span>
            )}
        </label>
    );
}