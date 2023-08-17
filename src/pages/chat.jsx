import React from 'react';
import { Container } from '../components/container';
import { Button } from '../components/button';
import { Message } from '../components/message';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { Spinner } from '../components/spinner';

export function Chat({ messages, sendRequest, isFetching, deleteMessage }) {
  const { values, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    sendRequest(values);
    resetForm();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  return (
    <Container>
      {isFetching ? <Spinner /> : null}
      <div className='chat-container'>
        {messages.length ? (
          <ul className='chat-list'>
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
        ) : (
          <p className='empty-text text'>Your chat is empty. Send your first message to start a chat.</p>
        )}
      </div>

      <form className='request-form' onSubmit={handleSubmit}>
        <textarea
          className='request-input'
          readOnly={isFetching && true}
          id='request-input'
          type='textarea'
          required
          minLength='3'
          placeholder='Type your message here...'
          name='requestInput'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={values.requestInput ?? ''}
        />
        <Button text='Send' type='submit' isDisabled={!isValid} />
      </form>
    </Container>
  );
}
