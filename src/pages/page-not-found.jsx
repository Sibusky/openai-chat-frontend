import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/container';

export function PageNotFound() {
  let navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Container>
      <h2 className='text title'>404</h2>
      <p className='text'>Page is not found</p>
      <button className='button_transparent text blue' onClick={goBack}>
        Go back
      </button>
    </Container>
  );
}
