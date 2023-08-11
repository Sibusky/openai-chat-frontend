import React from 'react';
import './styles.css';

export function Header({ handleLogOut, currentUser, isLoggedIn }) {
  return (
    <header>
      <div className='header__content'>
        <h1 className='title text white'>Lowfound OpenAI API Chat</h1>
        {isLoggedIn ? (
          <button className='button_transparent text white' onClick={handleLogOut}>
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
}
