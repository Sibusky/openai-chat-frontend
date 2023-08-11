import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './pages/layout';
import { Main } from './pages/main';
import { Start } from './pages/start';
import { Chat } from './pages/chat';
import { PageNotFound } from './pages/page-not-found';
import { auth } from './utils/auth';
import { messagesApi } from './utils/api';
import { RequireAuth } from './utils/RequireAuth';

import './App.css';

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '' });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      messagesApi
        .getAllMessages()
        .then((messages) => setMessages(messages.reverse()))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({
      _id: '',
      name: '',
    });
  }

  const handleCheckToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getCurrentUser(jwt)
        .then((res) => {
          const { _id, name } = res;
          setIsLoggedIn(true);
          setCurrentUser({ _id, name });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          if (err === 401) {
            handleLogOut();
          }
        });
    } else {
      handleLogOut();
    }
  }, []);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  function handleLogin({ name, password }) {
    setIsFetching(true);
    auth
      .authorize(name, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleCheckToken();
        }
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        setIsFetching(false);
      });
  }

  function handleRegister({ name, password }) {
    setIsFetching(true);
    auth
      .register(name, password)
      .then(() => {
        handleLogin({ name, password });
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsFetching(false);
      });
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/'>
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route
              path='start'
              element={
                <Start handleLogin={handleLogin} handleRegister={handleRegister} isFetching={isFetching} />
              }
            />
            <Route
              path='chat'
              element={
                <RequireAuth isLoggedIn={isLoggedIn}>
                  <Chat messages={messages}/>
                </RequireAuth>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
