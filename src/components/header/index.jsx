import React from 'react';
import './styles.css';

export function Header({ handleLogOut, currentUser, isLoggedIn }) {
  return (
    <header>
      <h1>Lowfound OpenAI API Chat</h1>
      {isLoggedIn ? (
        <div>
          <p>{currentUser.name}</p>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : null}
    </header>
  );
}
