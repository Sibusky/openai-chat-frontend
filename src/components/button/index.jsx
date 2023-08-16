import React from 'react';
import './styles.css';

export function Button({ text, type, isDisabled }) {
  return (
    <button
      className={isDisabled ? 'button_disabled button_filled' : 'button_filled'}
      type={type}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
