import React from 'react';
import { Button } from '../button';
import './styles.css';

export function Popup({ isPopupOpened, isSuccess, popupText, handleClose }) {
  return (
    <div className={`popup ${isPopupOpened ? 'popup_opened' : ''}`}>
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
