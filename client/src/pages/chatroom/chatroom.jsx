import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentChannel,
} from '../../redux/user/user.selectors';

import socketIOClient from 'socket.io-client';
import { useState } from 'react';
let socket;

function Chatroom({ currentUser, currentChannel }) {
  const SERVER = 'localhost:5000';

  // socket = socketIOClient(SERVER);
  const [chat, setChat] = useState('');
  useEffect(() => {
    socket = socketIOClient(SERVER);

    socket.on('connect', function () {
      console.log('connected');
    });

    socket.emit('login', { currentUser, currentChannel }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [SERVER, currentUser, currentChannel]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('chat message', chat);
    setChat('');
  };

  return (
    <div>
      <h1>Chatroom</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(Chatroom);
