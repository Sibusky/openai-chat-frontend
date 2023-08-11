import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/header';

export function Layout({ handleLogOut, currentUser, isLoggedIn }) {
  return (
    <div className='layout'>
      <Header handleLogOut={handleLogOut} currentUser={currentUser} isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
}
