import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentChannel,
} from '../../redux/user/user.selectors';

import socketIOClient from 'socket.io-client';

function Chatroom({ currentUser, currentChannel }) {
  const SERVER = 'localhost:5000';
  useEffect(() => {
    const socket = socketIOClient('localhost:5000');
    socket.on('connect', function () {
      console.log('connected');
    });
    socket.emit('login', { currentUser, currentChannel });
  }, [SERVER, currentUser, currentChannel]);
  return (
    <div>
      <h1>Chatroom</h1>
      {currentUser}
      {currentChannel}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(Chatroom);
