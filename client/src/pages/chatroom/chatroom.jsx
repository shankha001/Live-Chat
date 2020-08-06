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
  const [message, setMessage] = useState('');
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

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('chat message', message, () => setMessage(''));
    }
  };

  return (
    <div>
      <h1>Chatroom</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
