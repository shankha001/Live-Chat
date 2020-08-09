import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentChannel,
} from '../../redux/user/user.selectors';
import './style/chatbox.styles.scss';
import SendIcon from '@material-ui/icons/Send';

function Chatbox({ sendMessage, setChat, chat, currentUser, currentChannel }) {
  // console.log(currentUser);
  return (
    <React.Fragment>
      <div className="chat__container">
        <div className="chat__navbar">
          <div className="user">
            <div className="user__name">
              <span style={{ color: 'green', marginRight: ' 5px ' }}>#</span>
              {currentChannel}
            </div>
          </div>
        </div>
        <div className="chat__msg">hello</div>
        <div className="chat__input">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message"
              className="chat__input-input"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <button type="submit" className="chat__input-btn">
              <SendIcon style={{ fontSize: '35px', color: '#303f9f' }} />
            </button>
          </form>
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
