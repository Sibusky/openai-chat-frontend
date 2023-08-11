import React from 'react';
import './styles.css';

export function Header({ handleLogOut, currentUser, isLoggedIn }) {
  return (
    <header>
      <div className='header__content'>
        <h1 className='title text white'>Lowfound OpenAI API Chat</h1>
        {isLoggedIn ? (
          <div className='header__user-info'>
            <p className='text white'>Your name: {currentUser.name}</p>
            <button className='button_transparent text white' onClick={handleLogOut}>Logout</button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
