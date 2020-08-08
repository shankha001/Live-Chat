import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentChannel,
} from '../../redux/user/user.selectors';

import socketIOClient from 'socket.io-client';
import { useState } from 'react';
import Chatbox from '../../components/chatbox/chatbox';
import './style/chatroom.styles.scss';

let socket;

function Chatroom({ currentUser, currentChannel }) {
  const SERVER = 'localhost:5000';

  // socket = socketIOClient(SERVER);
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket = socketIOClient(SERVER);

    socket.on('connect', function () {
      console.log('connected');
    });

    socket.emit('login', { currentUser, currentChannel }, (error) => {
      if (error) {
        // alert(error);
      }
    });
  }, [SERVER, currentUser, currentChannel]);

  useEffect(() => {
    socket.on('message', (chat) => {
      setChats((chats) => [...chats, chat]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // console.log(socket);
    socket.emit('chat message', chat);
    setChat('');
  };

  return (
    <React.Fragment>
      <div className="chatbox__container">
        {console.log(chats)}
        <Chatbox sendMessage={sendMessage} setChat={setChat} chat={chat} />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(Chatroom);
