import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Chat from './pages/chatroom/chatroom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
}

export default App;
