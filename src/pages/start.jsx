import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container } from '../components/container';
import { Form } from '../components/form';
import { Spinner } from '../components/spinner';
import image from '../images/image.png';

export function Start({ handleLogin, handleRegister, isFetching, isLoggedIn }) {
  let location = useLocation();

  if (isLoggedIn) {
    return <Navigate to='/chat' state={{ from: location }} replace />;
  }

  return (
    <Container isExpanded={false}>
      {isFetching ? <Spinner /> : null}
      <img src={image} alt='Boy and girl' />
      <Form
        handleFunction={handleLogin}
        isFetching={isFetching}
        buttonText='Login'
        buttonType='submit'
        className='login'
      />
      <p className='text'>or sign up if you don’t have an account yet</p>
      <Form
        handleFunction={handleRegister}
        isFetching={isFetching}
        buttonText='Sign up'
        buttonType='submit'
        className='signup'
      />
    </Container>
  );
}
