import { useCallback, useState } from "react";

export default function useFormValidation(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState({});
    const [isInputValid, setIsInputValid] = useState({});
    const [isValidButton, setIsValidButton] = useState(false);

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        const form = evt.target.form;

        setValues((initialValues) => ({
            ...initialValues,
            [name]: value
        }));

        setError((initialError) => ({
            ...initialError,
            [name]: evt.target.validationMessage
        }));

        setIsInputValid((initialInput) => ({
            ...initialInput,
            [name]: evt.target.validity.valid
        }));

        setIsValidButton(form.checkValidity());
    }

    const reset = useCallback((data = {}) => {
        setValues(data);
        setError({});
        setIsInputValid({});
        setIsValidButton(false);
    }, []);

    return { values, error, isInputValid, isValidButton, reset, handleChange };
}
