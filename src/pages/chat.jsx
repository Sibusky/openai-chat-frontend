import React from 'react';
import { Container } from '../components/container';
import { Button } from '../components/button';
import { Message } from '../components/message';

export function Chat({ messages }) {
  return (
    <Container>
      <ul className='chat__list'>
        {messages.map((message) => (
          <Message
            key={message._id}
            date={message.date}
            question={message.question}
            response={message.response}
          />
        ))}
      </ul>
      <form>
        <input />
        <Button text='Send' type='submit' isDisabled={false} />
      </form>
    </Container>
  );
}
