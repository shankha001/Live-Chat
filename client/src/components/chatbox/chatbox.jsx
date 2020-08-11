import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentChannel,
} from '../../redux/user/user.selectors';
import './style/chatbox.styles.scss';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chatbox({
  sendMessage,
  setChat,
  chat,
  currentUser,
  currentChannel,
  chats,
}) {
  const messagesEndRef = useRef(null);

  return (
    <React.Fragment>
      <div className="chat__container">
        <div className="chat__navbar">
          <div className="user">
            <Tooltip title="Channel">
              <div className="user__channel" id="yourDivID">
                <span
                  style={{
                    marginRight: ' 5px ',
                  }}
                >
                  #
                </span>
                {currentChannel}
              </div>
            </Tooltip>
          </div>
        </div>

        <ScrollToBottom className="chat__msg">
          {chats.map((chat, idx) =>
            chat.user !== currentUser ? (
              <div key={idx} className="chat__msg-receiver">
                <div className="chat__msg-receiver-inner">
                  <p
                    style={{
                      color: '#132079',
                      marginBottom: '5px',
                      textTransform: 'capitalize',
                      fontWeight: '600',
                      textAlign: 'left',
                    }}
                  >
                    {chat.user === 'admin' ? `👮🏻 ${chat.user}` : chat.user}
                  </p>
                  <p>{chat.msg}</p>
                </div>
              </div>
            ) : (
              <div className="chat__msg-sender">
                <div className="chat__msg-sender-inner">
                  <p
                    style={{
                      color: '#132079',
                      marginBottom: '5px',
                      fontWeight: '600',
                      textAlign: 'left',
                    }}
                  ></p>
                  <p>{chat.msg}</p>
                </div>
              </div>
            )
          )}
        </ScrollToBottom>

        <div className="chat__input">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message"
              className="chat__input-input"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <Tooltip title="Send">
              <button type="submit" className="chat__input-btn">
                <SendIcon style={{ fontSize: '35px', color: '#303f9f' }} />
              </button>
            </Tooltip>
          </form>
          <div ref={messagesEndRef} />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
});
export default connect(mapStateToProps)(Chatbox);
