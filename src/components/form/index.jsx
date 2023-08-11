import React from 'react';
import { Button } from '../button';

export function Form({
  handleSubmit,
  name,
  password,
  handleChange,
  isFetching,
  isValid,
  className,
  buttonText,
  buttonType,
}) {
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
              value={name ?? ''}
            />
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
              value={password ?? ''}
            />
          </li>
        </ul>
      </fieldset>
      <Button text={buttonText} type={buttonType} isDisabled={!isValid} />
    </form>
  );
}
