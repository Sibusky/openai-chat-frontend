import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container } from '../components/container';
import { Form } from '../components/form';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

export function Start({ handleLogin, handleRegister, isFetching, isLoggedIn }) {
  const { values, handleChange, resetForm } = useFormWithValidation();

  let location = useLocation();

  if (isLoggedIn) {
    return <Navigate to='/chat' state={{ from: location }} replace />;
  }

  return (
    <Container>
      <Form
        handleSubmit={(e) => {
          e.preventDefault();
          handleLogin({
            name: values.loginName,
            password: values.loginPassword,
          });
          resetForm();
        }}
        name={values.loginName}
        password={values.loginPassword}
        handleChange={handleChange}
        isFetching={isFetching}
        buttonText='Login'
        buttonType='submit'
        className='login'
      />
      <p>or sign up if you don’t have an account yet</p>
      <Form
        handleSubmit={(e) => {
          e.preventDefault();
          handleRegister({
            name: values.signupName,
            password: values.signupPassword,
          });
          resetForm();
        }}
        name={values.signupName}
        password={values.signupPassword}
        handleChange={handleChange}
        isFetching={isFetching}
        buttonText='Sign up'
        buttonType='submit'
        className='signup'
      />
    </Container>
  );
}
