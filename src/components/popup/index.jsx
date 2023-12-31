import React from 'react';
import { Button } from '../button';
import './styles.css';

export function Popup({ isPopupOpened, isSuccess, popupText, handleClose }) {
  return (
    <div
      className={`popup ${isPopupOpened ? 'popup_opened' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <form
        className='popup-container'
        onSubmit={(e) => {
          e.preventDefault();
          handleClose();
        }}
      >
        <h4>{popupText}</h4>
        <span>{isSuccess ? '🟢' : '🔴'}</span>
        <Button text='Ok' type='submit' isDisabled={false} />
      </form>
    </div>
  );
}
