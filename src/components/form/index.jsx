import React from 'react';
import { Button } from '../button';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export function Form({ handleFunction, isFetching, className, buttonText, buttonType }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleFunction({ name: values[`${className}Name`], password: values[`${className}Password`] });
    resetForm();
  }

  return (
    <form id={`${className}-form`} onSubmit={handleSubmit}>
      <fieldset>
        <ul>
          <li>
            <input
              className='text-input'
              readOnly={isFetching && true}
              id={`${className}-name`}
              type='text'
              required
              minLength='2'
              maxLength='30'
              placeholder='Username'
              name={`${className}Name`}
              onChange={handleChange}
              value={values[`${className}Name`] ?? ''}
            />
            <span>{errors[`${className}Name`]}</span>
          </li>
          <li>
            <input
              className='text-input'
              readOnly={isFetching && true}
              id={`${className}-password`}
              type='password'
              required
              minLength='8'
              placeholder='Password'
              name={`${className}Password`}
              onChange={handleChange}
              value={values[`${className}Password`] ?? ''}
            />
            <span>{errors[`${className}Password`]}</span>
          </li>
        </ul>
      </fieldset>
      <Button text={buttonText} type={buttonType} isDisabled={!isValid} />
    </form>
  );
}
