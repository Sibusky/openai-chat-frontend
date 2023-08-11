import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container } from '../components/container';
import { Spinner } from '../components/spinner';

export function Main({ isFetching, isLoggedIn }) {
  let location = useLocation();

  if (isLoggedIn) {
    return <Navigate to='/chat' state={{ from: location }} replace />;
  }

  return <Container>{isFetching ? <Spinner /> : null}</Container>;
}
