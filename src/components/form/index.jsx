import React, { useCallback, useState } from 'react';
import { Button } from '../button';
import { auth } from '../../utils/auth';

export function Form({ className, buttonText, buttonType }) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [getCurrentUser, setCurrentUser] = useState({ _id: '', name: '' });

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

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
    handleLogin({ name, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <ul>
          <li>
            <input
              // readOnly={isFetching && true}
              id={`${className}-name`}
              type='text'
              required
              minLength='2'
              maxLength='30'
              placeholder='Username'
              onChange={handleNameChange}
              value={name ?? ''}
            />
          </li>
          <li>
            <input
              // readOnly={isFetching && true}
              id={`${className}-password`}
              type='password'
              required
              minLength='8'
              placeholder='Password'
              onChange={handlePasswordChange}
              value={password ?? ''}
            />
          </li>
        </ul>
      </fieldset>
      <Button text={buttonText} type={buttonType} />
    </form>
  );
}
