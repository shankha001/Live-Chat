import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './style/userinfo.styles.scss';

function UserInfo({ currentUser, usersonline }) {
  return (
    <div className="userinfo__container">
      <h4>Your Name :</h4>
      <p> {currentUser}</p>
      <h4>Users :</h4>
      {usersonline
        ? usersonline.map((user, idx) => (
            <p key={idx} style={{ marginBottom: '10px' }}>
              {user.name}
            </p>
          ))
        : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInfo);
