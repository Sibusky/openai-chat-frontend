import React from 'react';
import { Container } from '../components/container';
import { Button } from '../components/button';
import { Message } from '../components/message';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

export function Chat({ messages, sendRequest, isFetching, deleteMessage }) {
  const { values, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    sendRequest(values);
    resetForm();
  }

  return (
    <Container>
      <ul className='chat__list'>
        {messages.map((message) => (
          <Message
            key={message._id}
            id={message._id}
            date={message.date}
            question={message.question}
            response={message.response}
            deleteMessage={deleteMessage}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
            readOnly={isFetching && true}
          id='request-input'
          type='textarea'
          required
          minLength='3'
          placeholder='Type your message here...'
          name='requestInput'
          onChange={handleChange}
          value={values.requestInput ?? ''}
        />
        <Button text='Send' type='submit' isDisabled={!isValid} />
      </form>
    </Container>
  );
}
