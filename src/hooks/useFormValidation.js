import { useCallback, useState } from "react"

export default function useFormValidation() {

    const [ values, setValues ] = useState({})
    const [ error, setError ] = useState({})
    const [ isInputValid, setIsInputValid ] = useState({})
    const [ isValidButton, setIsValidButton ] = useState(false)

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

    function reset( data = {}) {
        setValues(data)
        setError({})
        setIsInputValid({})
        setIsValidButton(false)
    }

    const changeValues = useCallback((name, value) => {
        setValues((initialValues) => {
            return { ...initialValues, [name]: value }
        })
    }, [])

    return { values, error, isInputValid, isValidButton, reset, changeValues, handleChange }
}