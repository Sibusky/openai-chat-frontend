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
    <li>
      <p>
        {getDate(date)} {getTime(date)}
      </p>
      <p>You asked:</p>
      <p>{question}</p>
      <p>GPT responded:</p>
      <p>{response}</p>
      <button onClick={() => deleteMessage(id)}>Delete</button>
    </li>
  );
}
