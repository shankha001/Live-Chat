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
import UserInfo from '../../components/userinfo/userinfo';

let socket;

function Chatroom({ currentUser, currentChannel }) {
  const SERVER = 'localhost:5000';

  // socket = socketIOClient(SERVER);
  const [users, setUsers] = useState('');

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

    socket.on('channelUsers', ({ users }) => {
      setUsers(users);
      // console.log(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // console.log(socket);
    if (chat) {
      socket.emit('chat message', chat);
    }
    setChat('');
  };

  return (
    <div className="chatroom__page">
      <div className="chatroom__container">
        <div className="chatroom__info">
          <UserInfo usersonline={users} />
        </div>
        <div className="chatroom__chatbox">
          <Chatbox
            sendMessage={sendMessage}
            setChat={setChat}
            chat={chat}
            chats={chats}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
});

export default connect(mapStateToProps)(Chatroom);
