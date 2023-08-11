import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './pages/layout';
import { Main } from './pages/main';
import { Start } from './pages/start';
import { Chat } from './pages/chat';
import { PageNotFound } from './pages/page-not-found';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/'>
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='start' element={<Start />} />
            <Route path='chat' element={<Chat />} />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
