import React from 'react';
import { Container } from '../components/container';
import { Form } from '../components/form';

export function Start() {
  return (
    <Container>
      <Form buttonText='Login' buttonType='submit' className='login' />
      <p>or sign up if you don’t have an account yet</p>
      <Form buttonText='Sign up' buttonType='submit' className='singup' />
    </Container>
  );
}
