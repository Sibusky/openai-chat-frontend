import React from 'react';
import './styles.css';
import { format, isToday, isYesterday, toDate } from 'date-fns';

export function Message({ id, date, question, response, deleteMessage }) {
  function getDate(timestamp) {
    const date = toDate(+timestamp);
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'dd.MM.yyyy');
  }

  function getTime(timestamp) {
    const time = toDate(+timestamp);
    return format(time, 'HH:mm');
  }

  return (
    <li className='message'>
      <ul>
        <li>
          <p className='text gray'>
            {getDate(date)} {getTime(date)}
          </p>
        </li>
        <li>
          <p className='text blue'>You asked:</p>
          <p className='text'>{question}</p>
        </li>
        <li>
          <p className='text blue'>GPT responded:</p>
          <p className='text'>{response}</p>
        </li>
        <li>
          <button className='button_transparent text red' onClick={() => deleteMessage(id)}>
            Delete
          </button>
        </li>
      </ul>
    </li>
  );
}
