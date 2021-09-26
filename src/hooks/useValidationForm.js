import { useState } from 'react';

export function useValidationForm() {
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function handleErrors(e) {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setValues({ ...values, [name]: value });
    setIsValid(e.target.closest('form').checkValidity());
    if (name === 'email') {
      if (
        !value.match(
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
        )
      ) {
        setIsValid(false);
      }
    }
  }

  return { values, setValues, errors, isValid, handleErrors };
}
