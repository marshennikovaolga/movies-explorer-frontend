import { useCallback, useState } from "react";

export default function useProfileValidation(initialValues = {}, isEdit) {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState({});
    const [isInputValid, setIsInputValid] = useState({});
    const [isValidButton, setIsValidButton] = useState(false);

    function handleChange(evt) {

        const name = evt.target.name;
        const value = evt.target.value;
        const form = evt.target.form;

        setValues((currentValues) => ({
            ...currentValues,
            [name]: value
        }));

        setError((currentError) => ({
            ...currentError,
            [name]: evt.target.validationMessage
        }));

        setIsInputValid((currentInput) => ({
            ...currentInput,
            [name]: evt.target.validity.valid
        }));

        setIsValidButton(form.checkValidity());
    }

    const reset = useCallback((data = {}) => {
        setValues((currentValues) => ({
            ...currentValues,
            ...data
        }));
        setError({});
        setIsInputValid({});
        setIsValidButton(false);
    }, []);

    return { values, error, isInputValid, isValidButton, reset, handleChange }
}