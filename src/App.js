import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './pages/layout';
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
      setIsFetching(true);
      messagesApi
        .getAllMessages()
        .then((messages) => {
          setMessages(messages);
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
    }
  }, [isLoggedIn]);

  function sendRequest(request) {
    setIsFetching(true);
    messagesApi
      .postMessage(request.requestInput)
      .then((message) => {
        setIsFetching(false);
        setMessages([...messages, message]);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err);
      });
  }

  function deleteMessage(id) {
    setIsFetching(true);
    messagesApi
      .deleteMessage(id)
      .then(() => {
        setMessages((state) => state.filter((message) => message._id !== id));
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(false);
      });
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({
      _id: '',
      name: '',
    });
    setMessages([]);
  }

  const handleCheckToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      setIsFetching(true);
      let jwt = localStorage.getItem('jwt');
      auth
        .getCurrentUser(jwt)
        .then((res) => {
          const { _id, name } = res;
          setIsLoggedIn(true);
          setCurrentUser({ _id, name });
          setIsFetching(false);
        })
        .catch((err) => {
          console.log(`Check token error: ${err}`);
          if (err === 401) {
            handleLogOut();
            setIsFetching(false);
          }
          setIsFetching(false);
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
        console.log(`Login error: ${err}`);
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
        console.log(`Registration error: ${err}`);
        setIsFetching(false);
      });
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/'>
          <Route
            element={<Layout handleLogOut={handleLogOut} currentUser={currentUser} isLoggedIn={isLoggedIn} />}
          >
            <Route
              index
              element={
                <Start
                  handleLogin={handleLogin}
                  handleRegister={handleRegister}
                  isFetching={isFetching}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='chat'
              element={
                <RequireAuth isLoggedIn={isLoggedIn}>
                  <Chat
                    messages={messages}
                    sendRequest={sendRequest}
                    isFetching={isFetching}
                    deleteMessage={deleteMessage}
                  />
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
