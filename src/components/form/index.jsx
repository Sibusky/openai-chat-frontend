import React, { useCallback, useState } from 'react';
import { Button } from '../button';
import { auth } from '../../utils/auth';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export function Form({ className, buttonText, buttonType }) {
  const [values, errors, isValid, handleChange, resetForm] = useFormWithValidation();
  const [isFetching, setIsFetching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '' });

  function handleLogOut() {
    // localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({
      _id: '',
      name: '',
    });
  }

  const handleCheckToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getCurrentUser(jwt)
        .then((res) => {
          const { _id, name } = res;
          setIsLoggedIn(true);
          setCurrentUser({ _id, name });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          if (err === 401) {
            handleLogOut();
          }
        });
    } else {
      handleLogOut();
    }
  }, []);

  function handleLogin({ name, password }) {
    setIsFetching(true);
    auth
      .authorize(name, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleCheckToken();
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        setIsFetching(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <ul>
          <li>
            <input
              readOnly={isFetching && true}
              id={`${className}-name`}
              type='text'
              required
              minLength='2'
              maxLength='30'
              placeholder='Username'
              name='name'
              onChange={handleChange}
              value={values.name ?? ''}
            />
          </li>
          <li>
            <input
              readOnly={isFetching && true}
              id={`${className}-password`}
              type='password'
              required
              minLength='8'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={values.password ?? ''}
            />
          </li>
        </ul>
      </fieldset>
      <Button text={buttonText} type={buttonType} isDisabled={!isValid} />
    </form>
  );
}
