import React from 'react';
import { Container } from '../components/container';
import { Button } from '../components/button';
import { Message } from '../components/message';

export function Chat() {
  const messagesArr = [
    {
      _id: '64d541f617aead6271eef6bf',
      owner: '64d52a96b1ad2511839c8186',
      date: '1691000000000',
      question: 'Write random text about USA. Length is 80 words aproximatelly',
      response: 'The United States of America, a land of diversity and boundless opport…',
    },
    {
      _id: '64d541f617aead6271eef123',
      owner: '64d52a96b1ad2511839c8123',
      date: '1691697654653',
      question: 'Write random text about USA. Length is 80 words aproximatelly 123',
      response: 'The United States of America, a land of diversity and boundless opport… 123',
    },
    {
      _id: '64d541f617aead6271eef321',
      owner: '64d52a96b1ad2511839c8321',
      date: '1691697654653',
      question: 'Write random text about USA. Length is 80 words aproximatelly 321',
      response: 'The United States of America, a land of diversity and boundless opport… 321',
    },
  ];

  return (
    <Container>
      <ul className='chat__list'>
        {messagesArr.map((message) => (
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
